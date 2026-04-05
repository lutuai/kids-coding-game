/**
 * 游戏舞台组件
 * 负责渲染游戏地图、角色和动画
 */
class Stage {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = 60;
        this.gridWidth = 6;
        this.gridHeight = 6;
        this.map = [];
        this.items = []; // 地图上的物品（收集物等）
        this.characterSystem = null;
        this.animationId = null;
        this.isRunning = false;
    }

    /**
     * 初始化舞台
     * @param {Object} levelData 关卡数据
     */
    init(levelData) {
        this.gridWidth = levelData.width || 6;
        this.gridHeight = levelData.height || 6;
        this.map = levelData.map || [];
        this.items = levelData.items ? [...levelData.items] : [];
        this.startPos = levelData.start || { x: 0, y: 0 };
        this.goalPos = levelData.goal || { x: 5, y: 5 };

        // 调整画布大小
        this.resize();

        // 初始化角色系统
        if (!this.characterSystem) {
            this.characterSystem = new CharacterSystem(this.canvas);
        }
        this.characterSystem.setPosition(this.startPos.x, this.startPos.y, this.cellSize);
        this.characterSystem.setDirection(0);

        // 开始渲染循环
        this.startRenderLoop();

        return this;
    }

    /**
     * 调整画布大小
     */
    resize() {
        const container = this.canvas.parentElement;
        let availableWidth;

        if (container) {
            availableWidth = container.clientWidth - 16; // 减去padding
        } else {
            availableWidth = window.innerWidth - 32;
        }

        // 移动端进一步减小
        const isMobile = window.innerWidth <= 480;
        const maxSize = isMobile
            ? Math.min(300, availableWidth)
            : Math.min(400, availableWidth);

        this.cellSize = Math.floor(maxSize / Math.max(this.gridWidth, this.gridHeight));
        // 确保最小单元格尺寸（移动端）
        if (isMobile && this.cellSize < 40) {
            this.cellSize = 40;
        }

        const width = this.cellSize * this.gridWidth;
        const height = this.cellSize * this.gridHeight;

        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
    }

    /**
     * 开始渲染循环
     */
    startRenderLoop() {
        if (this.animationId) return;

        const render = () => {
            this.render();
            this.animationId = requestAnimationFrame(render);
        };

        render();
    }

    /**
     * 停止渲染循环
     */
    stopRenderLoop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /**
     * 渲染整个舞台
     */
    render() {
        const theme = themeManager.getCurrent();
        if (!theme) return;

        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 渲染地图
        this.renderMap(theme);

        // 渲染物品
        this.renderItems(theme);

        // 渲染角色
        if (this.characterSystem) {
            this.characterSystem.render();
        }
    }

    /**
     * 渲染地图
     * @param {Object} theme 当前主题
     */
    renderMap(theme) {
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const cellType = this.getCellType(x, y);
                const px = x * this.cellSize;
                const py = y * this.cellSize;

                theme.drawCell(this.ctx, px, py, this.cellSize, cellType, theme);
            }
        }
    }

    /**
     * 获取指定位置的单元格类型
     * @param {number} x 网格X
     * @param {number} y 网格Y
     */
    getCellType(x, y) {
        // 检查是否是起点
        if (x === this.startPos.x && y === this.startPos.y) {
            return 'start';
        }

        // 检查是否是终点
        if (x === this.goalPos.x && y === this.goalPos.y) {
            return 'goal';
        }

        // 检查地图数据
        if (this.map[y] && this.map[y][x]) {
            return this.map[y][x];
        }

        return 'path';
    }

    /**
     * 渲染物品
     * @param {Object} theme 当前主题
     */
    renderItems(theme) {
        this.items.forEach(item => {
            if (item.collected) return;

            const px = item.x * this.cellSize;
            const py = item.y * this.cellSize;

            // 绘制收集物
            theme.drawCell(this.ctx, px, py, this.cellSize, 'collectable', theme);
        });
    }

    /**
     * 检查是否可以移动到指定位置
     * @param {number} x 目标X
     * @param {number} y 目标Y
     */
    canMoveTo(x, y) {
        // 检查边界
        if (x < 0 || x >= this.gridWidth || y < 0 || y >= this.gridHeight) {
            return false;
        }

        // 检查障碍物
        const cellType = this.getCellType(x, y);
        return cellType !== 'obstacle';
    }

    /**
     * 检查是否到达终点
     * @param {number} x 当前X
     * @param {number} y 当前Y
     */
    isAtGoal(x, y) {
        return x === this.goalPos.x && y === this.goalPos.y;
    }

    /**
     * 检查并收集物品
     * @param {number} x 当前X
     * @param {number} y 当前Y
     */
    collectItem(x, y) {
        const item = this.items.find(i => i.x === x && i.y === y && !i.collected);
        if (item) {
            item.collected = true;
            return item;
        }
        return null;
    }

    /**
     * 获取当前关卡的收集进度
     */
    getCollectionProgress() {
        const total = this.items.length;
        const collected = this.items.filter(i => i.collected).length;
        return { total, collected };
    }

    /**
     * 重置关卡
     */
    reset() {
        // 重置物品
        this.items.forEach(item => {
            item.collected = false;
        });

        // 重置角色位置
        if (this.characterSystem) {
            this.characterSystem.setPosition(this.startPos.x, this.startPos.y, this.cellSize);
            this.characterSystem.setDirection(0);
        }
    }

    /**
     * 播放胜利特效
     */
    async playWinEffect() {
        const theme = themeManager.getCurrent();

        // 播放角色胜利动画
        if (this.characterSystem) {
            await this.characterSystem.playWinAnimation();
        }

        // 播放粒子效果
        const rect = this.canvas.getBoundingClientRect();
        Utils.createParticles(
            rect.left + this.goalPos.x * this.cellSize + this.cellSize / 2,
            rect.top + this.goalPos.y * this.cellSize + this.cellSize / 2,
            '⭐',
            20
        );
    }

    /**
     * 播放失败特效
     */
    async playFailEffect() {
        if (this.characterSystem) {
            await this.characterSystem.playFailAnimation();
        }
    }

    /**
     * 绑定拖放事件（用于直接拖拽执行）
     * @param {Function} onDropCallback 拖放回调函数
     */
    bindDragDrop(onDropCallback) {
        // 阻止默认拖放行为
        this.canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            this.canvas.style.transform = 'scale(1.02)';
            this.canvas.style.boxShadow = '0 0 20px var(--primary)';
        });

        this.canvas.addEventListener('dragleave', () => {
            this.canvas.style.transform = 'scale(1)';
            this.canvas.style.boxShadow = 'none';
        });

        this.canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            this.canvas.style.transform = 'scale(1)';
            this.canvas.style.boxShadow = 'none';

            try {
                const data = e.dataTransfer.getData('application/json');
                if (data) {
                    const block = JSON.parse(data);
                    // 只处理动作类积木
                    if (block.type === 'action' || block.id === 'jump') {
                        if (onDropCallback) {
                            onDropCallback(block);
                        }
                    }
                }
            } catch (err) {
                console.error('拖放处理失败:', err);
            }
        });

        // 触摸支持
        this.canvas.addEventListener('touchstart', (e) => {
            // 触摸开始时不阻止，让系统处理可能的拖放
        }, { passive: true });
    }

    /**
     * 显示拖放提示
     */
    showDropHint() {
        const hint = document.createElement('div');
        hint.className = 'drop-hint';
        hint.textContent = '拖拽箭头到这里试试！';
        hint.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255,255,255,0.9);
            padding: 12px 20px;
            border-radius: 20px;
            font-size: 14px;
            color: var(--primary);
            pointer-events: none;
            animation: fadeInOut 3s ease forwards;
            z-index: 10;
        `;

        const container = this.canvas.parentElement;
        if (container) {
            container.style.position = 'relative';
            container.appendChild(hint);

            setTimeout(() => hint.remove(), 3000);
        }
    }

    /**
     * 销毁舞台
     */
    destroy() {
        this.stopRenderLoop();
        this.characterSystem = null;
    }
}

// 全局暴露
window.Stage = Stage;
