/**
 * 指令积木面板
 * 显示可用的编程指令块
 */
class BlockPanel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.blocks = [];
        this.currentLevel = 1;
        this.maxUnlockedBlock = 5; // 根据关卡解锁
    }

    /**
     * 初始化积木面板
     * @param {number} level 当前关卡
     */
    init(level = 1) {
        this.currentLevel = level;
        this.updateUnlockedBlocks();
        this.render();
    }

    /**
     * 根据关卡更新解锁的指令
     */
    updateUnlockedBlocks() {
        // 基础指令（所有关卡都有）- 使用绝对方向
        this.blocks = [
            { id: 'up', name: '向上', icon: '⬆️', type: 'action', class: 'block-up', level: 1 },
            { id: 'down', name: '向下', icon: '⬇️', type: 'action', class: 'block-down', level: 1 },
            { id: 'left', name: '向左', icon: '⬅️', type: 'action', class: 'block-left', level: 1 },
            { id: 'right', name: '向右', icon: '➡️', type: 'action', class: 'block-right', level: 1 },
        ];

        // 第2关解锁跳跃
        if (this.currentLevel >= 2) {
            this.blocks.push({ id: 'jump', name: '跳跃', icon: '⤴️', type: 'action', class: 'block-jump', level: 2 });
        }

        // 第6关解锁循环
        if (this.currentLevel >= 6) {
            this.blocks.push({ id: 'repeat2', name: '重复2次', icon: '🔁', type: 'control', class: 'block-repeat', level: 6, params: { count: 2 } });
            this.blocks.push({ id: 'repeat3', name: '重复3次', icon: '🔁', type: 'control', class: 'block-repeat', level: 6, params: { count: 3 } });
            this.blocks.push({ id: 'repeat4', name: '重复4次', icon: '🔁', type: 'control', class: 'block-repeat', level: 6, params: { count: 4 } });
        }

        // 第11关解锁条件
        if (this.currentLevel >= 11) {
            this.blocks.push({ id: 'if_wall', name: '如果前面有墙', icon: '🤔', type: 'control', class: 'block-if', level: 11, condition: 'wall' });
            this.blocks.push({ id: 'if_path', name: '如果前面有路', icon: '🤔', type: 'control', class: 'block-if', level: 11, condition: 'path' });
        }

        // 第16关解锁函数（预定义的函数积木）
        if (this.currentLevel >= 16) {
            // 获取当前关卡定义的可用函数
            const levelData = LevelManager.getLevel(this.currentLevel);
            const availableFunctions = levelData?.availableFunctions || [];

            if (availableFunctions.includes('bridge')) {
                this.blocks.push({
                    id: 'func_bridge',
                    name: '过桥',
                    icon: '🌉',
                    type: 'function',
                    class: 'block-function',
                    level: 16,
                    definition: ['right', 'down', 'left', 'up']
                });
            }

            if (availableFunctions.includes('around_tree')) {
                this.blocks.push({
                    id: 'func_around_tree',
                    name: '绕树',
                    icon: '🌲',
                    type: 'function',
                    class: 'block-function',
                    level: 18,
                    definition: ['right', 'down', 'left', 'down', 'right']
                });
            }
        }

        // 第21关解锁变量循环（可编辑次数）
        if (this.currentLevel >= 21) {
            this.blocks.push({
                id: 'repeatN',
                name: '重复___次',
                icon: '🔁',
                type: 'control',
                class: 'block-repeat',
                level: 21,
                editable: true,
                defaultValue: 3,
                params: { count: 3 }
            });
        }
    }

    /**
     * 渲染积木面板
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = '';

        // 按类型分组
        const actions = this.blocks.filter(b => b.type === 'action');
        const controls = this.blocks.filter(b => b.type === 'control');
        const functions = this.blocks.filter(b => b.type === 'function');

        // 渲染动作指令
        if (actions.length > 0) {
            const actionGroup = Utils.createElement('div', {
                className: 'block-group',
                style: { marginBottom: '16px' }
            });

            actions.forEach(block => {
                const blockEl = this.createBlockElement(block);
                actionGroup.appendChild(blockEl);
            });

            this.container.appendChild(actionGroup);
        }

        // 渲染控制指令
        if (controls.length > 0) {
            const controlGroup = Utils.createElement('div', {
                className: 'block-group',
                style: { marginBottom: '16px' }
            });

            controls.forEach(block => {
                const blockEl = this.createBlockElement(block);
                controlGroup.appendChild(blockEl);
            });

            this.container.appendChild(controlGroup);
        }

        // 渲染函数指令
        if (functions.length > 0) {
            const functionGroup = Utils.createElement('div', {
                className: 'block-group'
            });

            // 添加函数标签
            const functionLabel = Utils.createElement('div', {
                style: { fontSize: '12px', color: '#666', marginBottom: '8px', paddingLeft: '4px' },
                text: '📦 我的函数'
            });
            functionGroup.appendChild(functionLabel);

            functions.forEach(block => {
                const blockEl = this.createBlockElement(block);
                functionGroup.appendChild(blockEl);
            });

            this.container.appendChild(functionGroup);
        }
    }

    /**
     * 创建积木元素
     * @param {Object} block 积木数据
     */
    createBlockElement(block) {
        const el = Utils.createElement('div', {
            className: `block ${block.class}`,
            draggable: true,
            'data-block-id': block.id,
            'data-block-type': block.type
        });

        const icon = Utils.createElement('span', {
            className: 'block-icon',
            text: block.icon
        });

        const name = Utils.createElement('span', {
            text: block.name
        });

        el.appendChild(icon);
        el.appendChild(name);

        // 拖拽事件
        el.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('application/json', JSON.stringify(block));
            e.dataTransfer.effectAllowed = 'copy';
            el.style.opacity = '0.5';
        });

        el.addEventListener('dragend', () => {
            el.style.opacity = '1';
        });

        // 点击添加（移动端友好）
        el.addEventListener('click', () => {
            // 播放点击音效
            if (window.audioManager) window.audioManager.play('click');
            window.dispatchEvent(new CustomEvent('blockclick', {
                detail: { block }
            }));
        });

        return el;
    }

    /**
     * 获取积木定义
     * @param {string} blockId 积木ID
     */
    getBlock(blockId) {
        return this.blocks.find(b => b.id === blockId);
    }

    /**
     * 更新当前关卡
     * @param {number} level 关卡号
     */
    setLevel(level) {
        this.currentLevel = level;
        this.updateUnlockedBlocks();
        this.render();
    }
}

// 全局暴露
window.BlockPanel = BlockPanel;
