/**
 * 关卡地图组件
 * 可视化展示所有关卡和世界进度
 */
class LevelMap {
    constructor() {
        this.modal = null;
        this.currentWorld = 1;
        this.worlds = [
            { id: 1, name: '糖果乐园', icon: '🍬', theme: 'candy', levels: [1, 2, 3, 4, 5], color: '#FF6B9D' },
            { id: 2, name: '太空探险', icon: '🚀', theme: 'space', levels: [6, 7, 8, 9, 10], color: '#7B68EE' },
            { id: 3, name: '海底世界', icon: '🐠', theme: 'ocean', levels: [11, 12, 13, 14, 15], color: '#006B8F' },
            { id: 4, name: '森林奇遇', icon: '🌲', theme: 'forest', levels: [16, 17, 18, 19, 20], color: '#2E8B57' },
            { id: 5, name: '霓虹都市', icon: '🌃', theme: 'neon', levels: [21, 22, 23, 24, 25], color: '#FF00FF' },
            { id: 6, name: '水墨中国', icon: '🎋', theme: 'ink', levels: [26, 27, 28, 29, 30], color: '#8B4513' }
        ];
    }

    /**
     * 初始化地图
     */
    init() {
        this.createModal();
        this.bindEvents();
    }

    /**
     * 创建地图弹窗
     */
    createModal() {
        // 创建弹窗元素
        const modal = document.createElement('div');
        modal.className = 'modal level-map-modal';
        modal.id = 'level-map-modal';

        modal.innerHTML = `
            <div class="modal-content level-map-content">
                <div class="modal-header">
                    <h3>🗺️ 冒险地图</h3>
                    <button class="btn-close" id="btn-close-map">×</button>
                </div>
                <div class="level-map-body">
                    <div class="worlds-nav">
                        ${this.worlds.map(world => `
                            <div class="world-tab ${world.id === 1 ? 'active' : ''}" data-world="${world.id}" style="--world-color: ${world.color}">
                                <span class="world-icon">${world.icon}</span>
                                <span class="world-name">${world.name}</span>
                                <div class="world-progress">
                                    <div class="world-progress-fill" id="world-progress-${world.id}"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="worlds-container">
                        ${this.worlds.map(world => this.createWorldSection(world)).join('')}
                    </div>
                </div>
                <div class="level-map-footer">
                    <div class="total-progress">
                        <span>总进度</span>
                        <div class="progress-bar">
                            <div class="progress-fill" id="total-map-progress"></div>
                        </div>
                        <span id="total-stars-display">0 / 90 ⭐</span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.modal = modal;

        // 绑定关闭事件
        document.getElementById('btn-close-map').addEventListener('click', () => {
            this.hide();
        });

        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hide();
            }
        });

        // 绑定世界切换
        modal.querySelectorAll('.world-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const worldId = parseInt(tab.dataset.world);
                this.switchWorld(worldId);
            });
        });

        // 绑定关卡点击
        modal.querySelectorAll('.level-node').forEach(node => {
            node.addEventListener('click', () => {
                const levelNum = parseInt(node.dataset.level);
                if (LevelManager.isLevelUnlocked(levelNum)) {
                    this.hide();
                    if (window.game) {
                        window.game.loadLevel(levelNum);
                    }
                } else {
                    // 播放锁定音效
                    if (window.audioManager) window.audioManager.play('fail');
                }
            });
        });
    }

    /**
     * 创建世界区块
     * @param {Object} world 世界数据
     */
    createWorldSection(world) {
        return `
            <div class="world-section ${world.id === 1 ? 'active' : ''}" data-world="${world.id}">
                <div class="world-header" style="background: ${world.color}20; border-color: ${world.color}">
                    <span class="world-big-icon">${world.icon}</span>
                    <div class="world-info">
                        <h4>${world.name}</h4>
                        <p id="world-stars-${world.id}">0 / 15 ⭐</p>
                    </div>
                </div>
                <div class="levels-path">
                    ${world.levels.map((levelNum, index) => {
                        // 创建关卡节点位置（蜿蜒路径）
                        const position = this.getLevelPosition(index);
                        return `
                            <div class="level-node ${LevelManager.isLevelUnlocked(levelNum) ? 'unlocked' : 'locked'}"
                                 data-level="${levelNum}"
                                 style="left: ${position.x}%; top: ${position.y}%">
                                <div class="level-dot" style="--dot-color: ${world.color}">
                                    ${LevelManager.isLevelUnlocked(levelNum) ? levelNum : '🔒'}
                                </div>
                                <div class="level-stars" id="level-stars-${levelNum}">
                                    ${this.renderLevelStars(levelNum)}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * 获取关卡在路径上的位置
     * @param {number} index 关卡索引(0-4)
     */
    getLevelPosition(index) {
        // 创建一个蜿蜒的路径
        const positions = [
            { x: 10, y: 80 },   // 起点
            { x: 35, y: 50 },   // 稍微上升
            { x: 60, y: 70 },   // 下降
            { x: 85, y: 40 },   // 再上升
            { x: 50, y: 20 }    // 终点（高处）
        ];
        return positions[index] || { x: 50, y: 50 };
    }

    /**
     * 渲染关卡星星
     * @param {number} levelNum 关卡号
     */
    renderLevelStars(levelNum) {
        const stars = LevelManager.stars[levelNum] || 0;
        return '⭐'.repeat(stars) + '⚫'.repeat(3 - stars);
    }

    /**
     * 切换世界
     * @param {number} worldId 世界ID
     */
    switchWorld(worldId) {
        this.currentWorld = worldId;

        // 更新标签
        this.modal.querySelectorAll('.world-tab').forEach(tab => {
            tab.classList.toggle('active', parseInt(tab.dataset.world) === worldId);
        });

        // 更新内容
        this.modal.querySelectorAll('.world-section').forEach(section => {
            section.classList.toggle('active', parseInt(section.dataset.world) === worldId);
        });
    }

    /**
     * 更新进度显示
     */
    updateProgress() {
        // 更新每个世界的进度
        this.worlds.forEach(world => {
            const worldStars = world.levels.reduce((sum, level) => {
                return sum + (LevelManager.stars[level] || 0);
            }, 0);

            // 更新世界星星显示
            const starsEl = document.getElementById(`world-stars-${world.id}`);
            if (starsEl) {
                starsEl.textContent = `${worldStars} / 15 ⭐`;
            }

            // 更新世界进度条
            const progressEl = document.getElementById(`world-progress-${world.id}`);
            if (progressEl) {
                progressEl.style.width = `${(worldStars / 15) * 100}%`;
            }

            // 更新每个关卡的星星
            world.levels.forEach(levelNum => {
                const levelStarsEl = document.getElementById(`level-stars-${levelNum}`);
                if (levelStarsEl) {
                    levelStarsEl.innerHTML = this.renderLevelStars(levelNum);
                }

                // 更新节点状态
                const node = this.modal.querySelector(`.level-node[data-level="${levelNum}"]`);
                if (node) {
                    const isUnlocked = LevelManager.isLevelUnlocked(levelNum);
                    node.classList.toggle('unlocked', isUnlocked);
                    node.classList.toggle('locked', !isUnlocked);

                    const dot = node.querySelector('.level-dot');
                    if (dot) {
                        dot.innerHTML = isUnlocked ? levelNum : '🔒';
                    }
                }
            });
        });

        // 更新总进度
        const totalStars = LevelManager.getTotalStars();
        const totalProgressEl = document.getElementById('total-map-progress');
        const totalStarsEl = document.getElementById('total-stars-display');

        if (totalProgressEl) {
            totalProgressEl.style.width = `${(totalStars / 90) * 100}%`;
        }
        if (totalStarsEl) {
            totalStarsEl.textContent = `${totalStars} / 90 ⭐`;
        }
    }

    /**
     * 显示地图
     */
    show() {
        if (!this.modal) {
            this.init();
        }
        this.updateProgress();
        this.modal.classList.add('active');

        // 切换到当前关卡所在的世界
        const currentLevel = window.game?.currentLevel || 1;
        const world = this.worlds.find(w => w.levels.includes(currentLevel));
        if (world) {
            this.switchWorld(world.id);
        }
    }

    /**
     * 隐藏地图
     */
    hide() {
        if (this.modal) {
            this.modal.classList.remove('active');
        }
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 可以从外部调用 show/hide
    }
}

// 全局暴露
window.LevelMap = LevelMap;
