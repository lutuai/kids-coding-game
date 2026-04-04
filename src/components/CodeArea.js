/**
 * 编程区组件
 * 管理用户拖拽的指令序列
 */
class CodeArea {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.codeBlocks = [];
        this.history = [];
        this.maxHistory = 10;
        this.runningIndex = -1;
    }

    /**
     * 初始化编程区
     */
    init() {
        this.bindEvents();
        this.render();
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        if (!this.container) return;

        // 拖拽进入
        this.container.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            this.container.classList.add('drag-over');
        });

        // 拖拽离开
        this.container.addEventListener('dragleave', () => {
            this.container.classList.remove('drag-over');
        });

        // 放置
        this.container.addEventListener('drop', (e) => {
            e.preventDefault();
            this.container.classList.remove('drag-over');

            try {
                const blockData = JSON.parse(e.dataTransfer.getData('application/json'));
                this.addBlock(blockData);
            } catch (err) {
                console.error('无法解析拖拽数据:', err);
            }
        });

        // 监听积木点击事件（来自BlockPanel）
        window.addEventListener('blockclick', (e) => {
            this.addBlock(e.detail.block);
        });

        // 清空按钮
        const clearBtn = document.getElementById('btn-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clear());
        }

        // 撤销按钮
        const undoBtn = document.getElementById('btn-undo');
        if (undoBtn) {
            undoBtn.addEventListener('click', () => this.undo());
        }
    }

    /**
     * 添加积木到编程区
     * @param {Object} block 积木数据
     */
    addBlock(block) {
        this.saveHistory();

        const codeBlock = {
            id: Utils.uuid(),
            blockId: block.id,
            name: block.name,
            icon: block.icon,
            type: block.type,
            class: block.class,
            params: block.params || null,
            condition: block.condition || null
        };

        this.codeBlocks.push(codeBlock);
        this.render();

        // 播放添加音效
        if (window.audioManager) window.audioManager.play('add');
    }

    /**
     * 移除积木
     * @param {string} blockId 积木ID
     */
    removeBlock(blockId) {
        this.saveHistory();
        this.codeBlocks = this.codeBlocks.filter(b => b.id !== blockId);
        this.render();

        // 播放移除音效
        if (window.audioManager) window.audioManager.play('remove');
    }

    /**
     * 清空编程区
     */
    clear() {
        if (this.codeBlocks.length === 0) return;

        this.saveHistory();
        this.codeBlocks = [];
        this.runningIndex = -1;
        this.render();
    }

    /**
     * 撤销
     */
    undo() {
        if (this.history.length === 0) return;

        const previousState = this.history.pop();
        this.codeBlocks = JSON.parse(previousState);
        this.render();
    }

    /**
     * 保存历史
     */
    saveHistory() {
        this.history.push(JSON.stringify(this.codeBlocks));
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
    }

    /**
     * 渲染编程区
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = '';

        if (this.codeBlocks.length === 0) {
            const placeholder = Utils.createElement('div', {
                className: 'code-placeholder',
                text: '拖拽积木到这里~'
            });
            this.container.appendChild(placeholder);
            return;
        }

        this.codeBlocks.forEach((block, index) => {
            const el = this.createCodeBlockElement(block, index);
            this.container.appendChild(el);
        });
    }

    /**
     * 创建代码积木元素
     * @param {Object} block 代码块数据
     * @param {number} index 索引
     */
    createCodeBlockElement(block, index) {
        const el = Utils.createElement('div', {
            className: `code-block ${block.class} ${index === this.runningIndex ? 'running' : ''}`,
            'data-block-id': block.id
        });

        const icon = Utils.createElement('span', {
            text: block.icon
        });

        const name = Utils.createElement('span', {
            text: block.name
        });

        const removeBtn = Utils.createElement('button', {
            className: 'remove-btn',
            text: '×',
            onClick: () => this.removeBlock(block.id)
        });

        el.appendChild(icon);
        el.appendChild(name);
        el.appendChild(removeBtn);

        return el;
    }

    /**
     * 设置当前执行的积木高亮
     * @param {number} index 索引
     */
    setRunningIndex(index) {
        this.runningIndex = index;
        this.render();

        // 滚动到可视区域
        if (index >= 0) {
            const blocks = this.container.querySelectorAll('.code-block');
            if (blocks[index]) {
                blocks[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    /**
     * 获取代码序列
     */
    getCode() {
        return [...this.codeBlocks];
    }

    /**
     * 检查是否有代码
     */
    hasCode() {
        return this.codeBlocks.length > 0;
    }

    /**
     * 重置运行状态
     */
    reset() {
        this.runningIndex = -1;
        this.render();
    }

    /**
     * 获取代码长度
     */
    getLength() {
        return this.codeBlocks.length;
    }
}

// 全局暴露
window.CodeArea = CodeArea;
