/**
 * 关卡编辑器组件
 * 允许玩家创建自定义关卡
 */
class LevelEditor {
    constructor() {
        this.modal = null;
        this.canvas = null;
        this.ctx = null;
        this.gridSize = 8;
        this.cellSize = 50;
        this.map = [];
        this.items = [];
        this.startPos = { x: 0, y: 0 };
        this.goalPos = { x: 7, y: 7 };
        this.currentTool = 'path'; // path, obstacle, start, goal, collectable
        this.isDrawing = false;
        this.customLevels = [];
    }

    /**
     * 初始化编辑器
     */
    init() {
        this.loadCustomLevels();
        this.createModal();
        this.bindEvents();
    }

    /**
     * 加载自定义关卡
     */
    loadCustomLevels() {
        this.customLevels = Utils.load('custom_levels', []);
    }

    /**
     * 保存自定义关卡
     */
    saveCustomLevel(levelData) {
        this.customLevels.push(levelData);
        Utils.save('custom_levels', this.customLevels);
    }

    /**
     * 创建编辑器弹窗
     */
    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal level-editor-modal';
        modal.id = 'level-editor-modal';

        modal.innerHTML = `
            <div class="modal-content level-editor-content">
                <div class="modal-header">
                    <h3>🎨 创意模式 - 创建你的关卡</h3>
                    <button class="btn-close" id="btn-close-editor">×</button>
                </div>
                <div class="level-editor-body">
                    <div class="editor-toolbar">
                        <div class="tool-group">
                            <span class="tool-label">画笔工具</span>
                            <div class="tools">
                                <button class="tool-btn active" data-tool="path" title="路径">
                                    <span class="tool-icon">🟫</span>
                                    <span>路径</span>
                                </button>
                                <button class="tool-btn" data-tool="obstacle" title="障碍物">
                                    <span class="tool-icon">🌲</span>
                                    <span>障碍</span>
                                </button>
                                <button class="tool-btn" data-tool="start" title="起点">
                                    <span class="tool-icon">🚩</span>
                                    <span>起点</span>
                                </button>
                                <button class="tool-btn" data-tool="goal" title="终点">
                                    <span class="tool-icon">🏁</span>
                                    <span>终点</span>
                                </button>
                                <button class="tool-btn" data-tool="collectable" title="收集物">
                                    <span class="tool-icon">⭐</span>
                                    <span>收集</span>
                                </button>
                                <button class="tool-btn" data-tool="eraser" title="橡皮擦">
                                    <span class="tool-icon">🧹</span>
                                    <span>擦除</span>
                                </button>
                            </div>
                        </div>
                        <div class="tool-group">
                            <span class="tool-label">网格大小</span>
                            <div class="size-selector">
                                <button class="size-btn" data-size="6">6×6</button>
                                <button class="size-btn active" data-size="8">8×8</button>
                                <button class="size-btn" data-size="10">10×10</button>
                            </div>
                        </div>
                    </div>
                    <div class="editor-canvas-container">
                        <canvas id="editor-canvas" width="400" height="400"></canvas>
                        <div class="canvas-hint">点击或拖拽来绘制关卡</div>
                    </div>
                    <div class="editor-actions">
                        <button class="btn btn-secondary" id="btn-clear-map">
                            🗑️ 清空
                        </button>
                        <button class="btn btn-secondary" id="btn-test-level">
                            ▶️ 试玩
                        </button>
                        <button class="btn btn-primary" id="btn-save-level">
                            💾 保存
                        </button>
                    </div>
                </div>
                <div class="editor-sidebar">
                    <div class="saved-levels">
                        <h4>📁 我的关卡</h4>
                        <div class="levels-list" id="saved-levels-list">
                            <!-- 动态生成 -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.modal = modal;

        // 初始化画布
        this.canvas = document.getElementById('editor-canvas');
        this.ctx = this.canvas.getContext('2d');

        // 初始化地图
        this.resetMap();

        // 绑定事件
        this.bindEditorEvents();

        // 渲染已保存的关卡
        this.renderSavedLevels();
    }

    /**
     * 重置地图
     */
    resetMap() {
        this.map = Array(this.gridSize).fill(null).map(() =>
            Array(this.gridSize).fill('path')
        );
        this.items = [];
        this.startPos = { x: 0, y: 0 };
        this.goalPos = { x: this.gridSize - 1, y: this.gridSize - 1 };
        this.map[0][0] = 'start';
        this.map[this.gridSize - 1][this.gridSize - 1] = 'goal';
        this.render();
    }

    /**
     * 绑定编辑器事件
     */
    bindEditorEvents() {
        // 关闭按钮
        document.getElementById('btn-close-editor').addEventListener('click', () => {
            this.hide();
        });

        // 点击背景关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });

        // 工具选择
        this.modal.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.modal.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTool = btn.dataset.tool;
            });
        });

        // 网格大小选择
        this.modal.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.modal.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.gridSize = parseInt(btn.dataset.size);
                this.resizeCanvas();
                this.resetMap();
            });
        });

        // 画布绘制
        this.canvas.addEventListener('mousedown', (e) => {
            this.isDrawing = true;
            this.handleDraw(e);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isDrawing) {
                this.handleDraw(e);
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isDrawing = false;
        });

        // 触摸支持
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.isDrawing = true;
            this.handleDraw(e.touches[0]);
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.isDrawing) {
                this.handleDraw(e.touches[0]);
            }
        });

        this.canvas.addEventListener('touchend', () => {
            this.isDrawing = false;
        });

        // 清空按钮
        document.getElementById('btn-clear-map').addEventListener('click', () => {
            if (confirm('确定要清空地图吗？')) {
                this.resetMap();
            }
        });

        // 试玩按钮
        document.getElementById('btn-test-level').addEventListener('click', () => {
            this.testLevel();
        });

        // 保存按钮
        document.getElementById('btn-save-level').addEventListener('click', () => {
            this.saveLevel();
        });
    }

    /**
     * 调整画布大小
     */
    resizeCanvas() {
        const maxSize = Math.min(400, window.innerWidth - 40);
        this.cellSize = Math.floor(maxSize / this.gridSize);
        this.canvas.width = this.cellSize * this.gridSize;
        this.canvas.height = this.cellSize * this.gridSize;
        this.canvas.style.width = this.canvas.width + 'px';
        this.canvas.style.height = this.canvas.height + 'px';
    }

    /**
     * 处理绘制
     */
    handleDraw(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gridX = Math.floor(x / this.cellSize);
        const gridY = Math.floor(y / this.cellSize);

        if (gridX < 0 || gridX >= this.gridSize || gridY < 0 || gridY >= this.gridSize) {
            return;
        }

        switch (this.currentTool) {
            case 'path':
                this.map[gridY][gridX] = 'path';
                break;
            case 'obstacle':
                this.map[gridY][gridX] = 'obstacle';
                break;
            case 'start':
                // 清除旧的起点
                this.map[this.startPos.y][this.startPos.x] = 'path';
                this.startPos = { x: gridX, y: gridY };
                this.map[gridY][gridX] = 'start';
                break;
            case 'goal':
                // 清除旧的终点
                this.map[this.goalPos.y][this.goalPos.x] = 'path';
                this.goalPos = { x: gridX, y: gridY };
                this.map[gridY][gridX] = 'goal';
                break;
            case 'collectable':
                // 切换收集物
                const existingIndex = this.items.findIndex(i => i.x === gridX && i.y === gridY);
                if (existingIndex >= 0) {
                    this.items.splice(existingIndex, 1);
                } else {
                    this.items.push({ x: gridX, y: gridY, type: 'star', collected: false });
                }
                break;
            case 'eraser':
                this.map[gridY][gridX] = 'path';
                const itemIndex = this.items.findIndex(i => i.x === gridX && i.y === gridY);
                if (itemIndex >= 0) {
                    this.items.splice(itemIndex, 1);
                }
                break;
        }

        this.render();
    }

    /**
     * 渲染编辑器画布
     */
    render() {
        const theme = themeManager.getCurrent();

        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制网格
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const px = x * this.cellSize;
                const py = y * this.cellSize;

                // 绘制背景
                this.ctx.fillStyle = theme.colors.grid;
                this.ctx.fillRect(px, py, this.cellSize, this.cellSize);

                // 绘制内容
                const cellType = this.map[y][x];
                if (cellType && cellType !== 'path') {
                    theme.drawCell(this.ctx, px, py, this.cellSize, cellType, theme);
                }
            }
        }

        // 绘制收集物
        this.items.forEach(item => {
            const px = item.x * this.cellSize;
            const py = item.y * this.cellSize;
            theme.drawCell(this.ctx, px, py, this.cellSize, 'collectable', theme);
        });

        // 绘制网格线
        this.ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= this.gridSize; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.cellSize, 0);
            this.ctx.lineTo(i * this.cellSize, this.canvas.height);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.cellSize);
            this.ctx.lineTo(this.canvas.width, i * this.cellSize);
            this.ctx.stroke();
        }
    }

    /**
     * 试玩关卡
     */
    testLevel() {
        const levelData = {
            id: 'custom_test',
            name: '自定义关卡',
            description: '测试自定义关卡',
            width: this.gridSize,
            height: this.gridSize,
            start: this.startPos,
            goal: this.goalPos,
            map: this.map,
            items: [...this.items],
            hint: '这是你创建的关卡！',
            maxBlocks: 50,
            targetBlocks: 30
        };

        // 保存当前关卡
        const previousLevel = window.game.currentLevel;

        // 加载自定义关卡
        window.game.stage.init(levelData);
        window.game.codeArea.clear();

        // 显示提示
        alert('开始试玩你的关卡！完成后来保存它吧~');

        // 关闭编辑器
        this.hide();
    }

    /**
     * 保存关卡
     */
    saveLevel() {
        // 检查是否有起点和终点
        if (!this.startPos || !this.goalPos) {
            alert('请设置起点和终点！');
            return;
        }

        // 检查起点终点是否可达（简单检查）
        if (this.map[this.startPos.y][this.startPos.x] === 'obstacle' ||
            this.map[this.goalPos.y][this.goalPos.x] === 'obstacle') {
            alert('起点或终点不能是障碍物！');
            return;
        }

        const levelName = prompt('给你的关卡起个名字吧：', `我的关卡 ${this.customLevels.length + 1}`);
        if (!levelName) return;

        const levelData = {
            id: Date.now(),
            name: levelName,
            createdAt: new Date().toISOString(),
            gridSize: this.gridSize,
            start: this.startPos,
            goal: this.goalPos,
            map: JSON.parse(JSON.stringify(this.map)),
            items: JSON.parse(JSON.stringify(this.items))
        };

        this.saveCustomLevel(levelData);
        this.renderSavedLevels();

        // 播放成功音效
        if (window.audioManager) window.audioManager.play('win');

        alert('关卡保存成功！你可以在"我的关卡"中找到它。');
    }

    /**
     * 渲染已保存的关卡列表
     */
    renderSavedLevels() {
        const container = document.getElementById('saved-levels-list');
        if (!container) return;

        if (this.customLevels.length === 0) {
            container.innerHTML = '<div class="empty-levels">还没有保存的关卡</div>';
            return;
        }

        container.innerHTML = this.customLevels.map((level, index) => `
            <div class="saved-level-item" data-index="${index}">
                <div class="level-info">
                    <span class="level-name">${level.name}</span>
                    <span class="level-size">${level.gridSize}×${level.gridSize}</span>
                </div>
                <div class="level-actions">
                    <button class="btn-play-saved" data-index="${index}" title="玩">▶️</button>
                    <button class="btn-load-saved" data-index="${index}" title="编辑">✏️</button>
                    <button class="btn-delete-saved" data-index="${index}" title="删除">🗑️</button>
                </div>
            </div>
        `).join('');

        // 绑定按钮事件
        container.querySelectorAll('.btn-play-saved').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playSavedLevel(parseInt(btn.dataset.index));
            });
        });

        container.querySelectorAll('.btn-load-saved').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.loadSavedLevel(parseInt(btn.dataset.index));
            });
        });

        container.querySelectorAll('.btn-delete-saved').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteSavedLevel(parseInt(btn.dataset.index));
            });
        });
    }

    /**
     * 玩已保存的关卡
     */
    playSavedLevel(index) {
        const level = this.customLevels[index];
        if (!level) return;

        const levelData = {
            id: 'custom_' + level.id,
            name: level.name,
            description: '自定义关卡',
            width: level.gridSize,
            height: level.gridSize,
            start: level.start,
            goal: level.goal,
            map: level.map,
            items: level.items,
            hint: '来自创意模式的关卡！',
            maxBlocks: 50,
            targetBlocks: 30,
            isCustom: true
        };

        window.game.stage.init(levelData);
        window.game.codeArea.clear();
        this.hide();
    }

    /**
     * 加载已保存的关卡到编辑器
     */
    loadSavedLevel(index) {
        const level = this.customLevels[index];
        if (!level) return;

        this.gridSize = level.gridSize;
        this.map = JSON.parse(JSON.stringify(level.map));
        this.items = JSON.parse(JSON.stringify(level.items));
        this.startPos = level.start;
        this.goalPos = level.goal;

        this.resizeCanvas();
        this.render();

        // 更新大小按钮
        this.modal.querySelectorAll('.size-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.size) === this.gridSize);
        });
    }

    /**
     * 删除已保存的关卡
     */
    deleteSavedLevel(index) {
        if (!confirm('确定要删除这个关卡吗？')) return;

        this.customLevels.splice(index, 1);
        Utils.save('custom_levels', this.customLevels);
        this.renderSavedLevels();
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 可以从外部调用
    }

    /**
     * 显示编辑器
     */
    show() {
        if (!this.modal) {
            this.init();
        }
        this.resizeCanvas();
        this.render();
        this.renderSavedLevels();
        this.modal.classList.add('active');
    }

    /**
     * 隐藏编辑器
     */
    hide() {
        if (this.modal) {
            this.modal.classList.remove('active');
        }
    }
}

// 全局暴露
window.LevelEditor = LevelEditor;
