/**
 * 角色系统组件
 * 管理角色的渲染、动画和状态
 */
class CharacterSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.currentCharacter = Characters.getCurrent();
        this.position = { x: 0, y: 0 };
        this.direction = 0; // 0:右, 90:下, 180:左, 270:上
        this.isMoving = false;
        this.animationFrame = null;
        this.animations = new Map();
    }

    /**
     * 设置当前角色
     * @param {string} characterId 角色ID
     */
    setCharacter(characterId) {
        const char = Characters.getById(characterId);
        if (char) {
            this.currentCharacter = char;
            Characters.setCurrent(characterId);
            this.render();
        }
    }

    /**
     * 设置位置
     * @param {number} gridX 网格X坐标
     * @param {number} gridY 网格Y坐标
     * @param {number} cellSize 单元格大小
     */
    setPosition(gridX, gridY, cellSize) {
        this.position = {
            x: gridX * cellSize,
            y: gridY * cellSize,
            gridX,
            gridY
        };
        this.cellSize = cellSize;
    }

    /**
     * 设置方向
     * @param {number} direction 角度 (0, 90, 180, 270)
     */
    setDirection(direction) {
        this.direction = direction % 360;
    }

    /**
     * 旋转到指定方向（动画）
     * @param {number} targetDirection 目标方向
     * @param {number} duration 动画时长(ms)
     */
    async rotateTo(targetDirection, duration = 300) {
        return new Promise(resolve => {
            const startDirection = this.direction;
            const startTime = performance.now();

            // 选择最短旋转路径
            let diff = targetDirection - startDirection;
            while (diff > 180) diff -= 360;
            while (diff < -180) diff += 360;

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // 缓动函数
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                this.direction = startDirection + diff * easeProgress;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    this.direction = targetDirection;
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    /**
     * 移动到指定网格位置（动画）
     * @param {number} targetGridX 目标X
     * @param {number} targetGridY 目标Y
     * @param {number} duration 动画时长(ms)
     */
    async moveTo(targetGridX, targetGridY, duration = 500) {
        return new Promise(resolve => {
            this.isMoving = true;
            const startX = this.position.x;
            const startY = this.position.y;
            const targetX = targetGridX * this.cellSize;
            const targetY = targetGridY * this.cellSize;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // 缓动函数
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                this.position.x = startX + (targetX - startX) * easeProgress;
                this.position.y = startY + (targetY - startY) * easeProgress;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    this.position.x = targetX;
                    this.position.y = targetY;
                    this.position.gridX = targetGridX;
                    this.position.gridY = targetGridY;
                    this.isMoving = false;
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    /**
     * 跳跃动画
     * @param {number} duration 动画时长(ms)
     */
    async jump(duration = 400) {
        return new Promise(resolve => {
            const startY = this.position.y;
            const startTime = performance.now();
            const jumpHeight = this.cellSize * 0.5;

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // 抛物线跳跃
                const jumpProgress = Math.sin(progress * Math.PI);
                this.jumpOffset = -jumpHeight * jumpProgress;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    this.jumpOffset = 0;
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    /**
     * 播放胜利动画
     */
    async playWinAnimation() {
        return new Promise(resolve => {
            let frame = 0;
            const animate = () => {
                frame++;
                this.bounceOffset = Math.sin(frame * 0.3) * 5;

                if (frame < 60) {
                    requestAnimationFrame(animate);
                } else {
                    this.bounceOffset = 0;
                    resolve();
                }
            };
            requestAnimationFrame(animate);
        });
    }

    /**
     * 播放失败动画
     */
    async playFailAnimation() {
        return new Promise(resolve => {
            let frame = 0;
            const animate = () => {
                frame++;
                this.shakeOffset = Math.sin(frame * 0.5) * 3;

                if (frame < 30) {
                    requestAnimationFrame(animate);
                } else {
                    this.shakeOffset = 0;
                    resolve();
                }
            };
            requestAnimationFrame(animate);
        });
    }

    /**
     * 渲染角色
     */
    render() {
        const theme = themeManager.getCurrent();
        if (!theme || !this.currentCharacter) return;

        const x = this.position.x + (this.shakeOffset || 0);
        const y = this.position.y + (this.jumpOffset || 0) + (this.bounceOffset || 0);

        theme.drawCharacter(
            this.ctx,
            x,
            y,
            this.cellSize,
            this.currentCharacter,
            this.direction
        );
    }

    /**
     * 渲染角色选择面板
     * @param {number} currentLevel 当前关卡
     */
    renderCharacterSelector(currentLevel = 1) {
        const grid = document.getElementById('character-grid');
        if (!grid) return;

        grid.innerHTML = '';

        Characters.list.forEach(char => {
            const isUnlocked = char.unlockLevel <= currentLevel;
            const isSelected = char.id === this.currentCharacter.id;

            const item = Utils.createElement('div', {
                className: `character-item ${isSelected ? 'selected' : ''} ${isUnlocked ? '' : 'locked'}`,
                onClick: () => {
                    if (isUnlocked) {
                        this.setCharacter(char.id);
                        this.renderCharacterSelector(currentLevel);
                    }
                }
            });

            const avatar = Utils.createElement('div', {
                className: 'character-avatar',
                text: isUnlocked ? char.avatar : '🔒'
            });

            const name = Utils.createElement('div', {
                className: 'character-name',
                text: char.name
            });

            if (!isUnlocked) {
                const unlockInfo = Utils.createElement('div', {
                    style: { fontSize: '12px', color: '#999', marginTop: '4px' },
                    text: `${char.unlockLevel}关解锁`
                });
                item.appendChild(avatar);
                item.appendChild(name);
                item.appendChild(unlockInfo);
            } else {
                item.appendChild(avatar);
                item.appendChild(name);
            }

            grid.appendChild(item);
        });
    }

    /**
     * 绑定角色选择事件
     */
    bindEvents() {
        const charModal = document.getElementById('character-modal');
        const closeBtn = document.getElementById('btn-close-character');

        if (closeBtn && charModal) {
            closeBtn.addEventListener('click', () => {
                charModal.classList.remove('active');
            });

            charModal.addEventListener('click', (e) => {
                if (e.target === charModal) {
                    charModal.classList.remove('active');
                }
            });
        }
    }
}

// 全局暴露
window.CharacterSystem = CharacterSystem;
