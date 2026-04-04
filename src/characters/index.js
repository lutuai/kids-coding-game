/**
 * 角色系统配置
 */
const Characters = {
    // 所有可用角色
    list: [
        {
            id: 'cat',
            name: '橘猫小丸子',
            icon: '🐱',
            avatar: '🐱',
            color: '#FF8C42',
            description: '圆脸橘猫，头顶有小呆毛',
            animation: '尾巴摇摆',
            unlockLevel: 0, // 0表示初始解锁
            specialAbility: null
        },
        {
            id: 'dog',
            name: '柯基阿丸',
            icon: '🐶',
            avatar: '🐶',
            color: '#D2691E',
            description: '小短腿柯基，屁股一扭一扭',
            animation: '耳朵飞起',
            unlockLevel: 0,
            specialAbility: null
        },
        {
            id: 'robot',
            name: '机器人小白',
            icon: '🤖',
            avatar: '🤖',
            color: '#4ECDC4',
            description: '方块身体，LED表情屏',
            animation: '眼睛闪烁',
            unlockLevel: 0,
            specialAbility: 'neon_glow'
        },
        {
            id: 'rabbit',
            name: '兔子丸丸',
            icon: '🐰',
            avatar: '🐰',
            color: '#FFB6C1',
            description: '长耳朵，三瓣嘴',
            animation: '蹦蹦跳跳',
            unlockLevel: 5,
            specialAbility: 'double_jump'
        },
        {
            id: 'panda',
            name: '熊猫滚滚',
            icon: '🐼',
            avatar: '🐼',
            color: '#333333',
            description: '黑白圆滚滚',
            animation: '翻跟头',
            unlockLevel: 10,
            specialAbility: 'roll'
        },
        {
            id: 'dino',
            name: '恐龙小宝',
            icon: '🦖',
            avatar: '🦖',
            color: '#7CB342',
            description: '绿色小恐龙',
            animation: '吼叫摆尾',
            unlockLevel: 15,
            specialAbility: 'roar'
        },
        {
            id: 'astronaut',
            name: '宇航员',
            icon: '👨‍🚀',
            avatar: '👨‍🚀',
            color: '#E0E0E0',
            description: '太空服宝宝',
            animation: '失重漂浮',
            unlockLevel: 20,
            specialAbility: 'space_walk'
        },
        {
            id: 'dragon',
            name: '金龙小丸',
            icon: '🐲',
            avatar: '🐲',
            color: '#FFD700',
            description: '传说中的金色小龙',
            animation: '翅膀扇动',
            unlockLevel: 30, // 通关后解锁
            specialAbility: 'fly'
        }
    ],

    // 获取角色
    getById(id) {
        return this.list.find(c => c.id === id);
    },

    // 获取已解锁的角色
    getUnlocked(maxLevel = 30) {
        return this.list.filter(c => c.unlockLevel <= maxLevel);
    },

    // 检查是否解锁
    isUnlocked(characterId, currentLevel) {
        const char = this.getById(characterId);
        return char && char.unlockLevel <= currentLevel;
    },

    // 获取默认角色
    getDefault() {
        return this.list[0];
    },

    // 获取当前选中的角色（从存储读取）
    getCurrent() {
        const savedId = Utils.load('selected_character', 'cat');
        return this.getById(savedId) || this.getDefault();
    },

    // 保存选中的角色
    setCurrent(characterId) {
        Utils.save('selected_character', characterId);
    },

    // 获取解锁进度
    getUnlockProgress(currentLevel) {
        const nextUnlock = this.list.find(c => c.unlockLevel > currentLevel);
        return {
            unlocked: this.getUnlocked(currentLevel).length,
            total: this.list.length,
            nextUnlock: nextUnlock,
            progress: (this.getUnlocked(currentLevel).length / this.list.length) * 100
        };
    }
};

// 全局暴露
window.Characters = Characters;
