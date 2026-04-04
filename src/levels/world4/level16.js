/**
 * 森林奇遇 - 关卡数据（第16-20关）
 * 教学重点：函数/子程序概念
 */
const World4Levels = {
    // 第16关：制作函数（制作"过桥"积木）
    16: {
        id: 16,
        name: '制作函数',
        description: '学习创建可重复使用的指令组合',
        width: 6,
        height: 6,
        start: { x: 0, y: 0 },
        goal: { x: 5, y: 5 },
        map: [
            ['start', 'path', 'obstacle', 'path', 'path', 'path'],
            ['obstacle', 'path', 'obstacle', 'path', 'obstacle', 'path'],
            ['path', 'path', 'path', 'path', 'path', 'path'],
            ['path', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'path'],
            ['path', 'path', 'path', 'path', 'path', 'path'],
            ['obstacle', 'path', 'obstacle', 'path', 'obstacle', 'goal']
        ],
        items: [
            { x: 3, y: 0, type: 'mushroom', collected: false },
            { x: 1, y: 2, type: 'mushroom', collected: false },
            { x: 5, y: 2, type: 'mushroom', collected: false },
            { x: 1, y: 4, type: 'mushroom', collected: false }
        ],
        hint: '定义"过桥"函数：向右+向下+向左+向上',
        maxBlocks: 12,
        targetBlocks: 8,
        requiredBlocks: ['function'],
        availableFunctions: ['bridge'],
        unlocksCharacter: null
    },

    // 第17关：多次调用
    17: {
        id: 17,
        name: '多次调用',
        description: '重复使用你创建的函数',
        width: 7,
        height: 7,
        start: { x: 0, y: 3 },
        goal: { x: 6, y: 3 },
        map: [
            ['obstacle', 'path', 'path', 'path', 'path', 'path', 'obstacle'],
            ['path', 'path', 'obstacle', 'obstacle', 'obstacle', 'path', 'path'],
            ['path', 'obstacle', 'path', 'path', 'path', 'obstacle', 'path'],
            ['start', 'path', 'path', 'obstacle', 'path', 'path', 'goal'],
            ['path', 'obstacle', 'path', 'path', 'path', 'obstacle', 'path'],
            ['path', 'path', 'obstacle', 'obstacle', 'obstacle', 'path', 'path'],
            ['obstacle', 'path', 'path', 'path', 'path', 'path', 'obstacle']
        ],
        items: [
            { x: 2, y: 0, type: 'mushroom', collected: false },
            { x: 4, y: 0, type: 'mushroom', collected: false },
            { x: 0, y: 2, type: 'mushroom', collected: false },
            { x: 6, y: 4, type: 'mushroom', collected: false },
            { x: 2, y: 6, type: 'mushroom', collected: false },
            { x: 4, y: 6, type: 'mushroom', collected: false }
        ],
        hint: '多次调用"过桥"函数，少写代码多办事',
        maxBlocks: 15,
        targetBlocks: 10,
        requiredBlocks: ['function'],
        availableFunctions: ['bridge']
    },

    // 第18关：制作新函数
    18: {
        id: 18,
        name: '制作新函数',
        description: '为不同场景创建不同的函数',
        width: 6,
        height: 6,
        start: { x: 0, y: 5 },
        goal: { x: 5, y: 0 },
        map: [
            ['path', 'path', 'path', 'path', 'path', 'goal'],
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'path', 'obstacle'],
            ['path', 'path', 'path', 'path', 'path', 'path'],
            ['obstacle', 'path', 'obstacle', 'obstacle', 'obstacle', 'obstacle'],
            ['path', 'path', 'path', 'path', 'path', 'path'],
            ['start', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle']
        ],
        items: [
            { x: 0, y: 2, type: 'mushroom', collected: false },
            { x: 2, y: 2, type: 'mushroom', collected: false },
            { x: 4, y: 2, type: 'mushroom', collected: false },
            { x: 1, y: 4, type: 'mushroom', collected: false },
            { x: 3, y: 4, type: 'mushroom', collected: false },
            { x: 5, y: 4, type: 'mushroom', collected: false }
        ],
        hint: '定义"绕树"函数：向右+向下+向左+向下+向右',
        maxBlocks: 18,
        targetBlocks: 12,
        requiredBlocks: ['function'],
        availableFunctions: ['bridge', 'around_tree']
    },

    // 第19关：函数嵌套
    19: {
        id: 19,
        name: '函数嵌套',
        description: '在函数中调用其他函数',
        width: 8,
        height: 7,
        start: { x: 0, y: 3 },
        goal: { x: 7, y: 3 },
        map: [
            ['path', 'path', 'path', 'path', 'path', 'path', 'path', 'path'],
            ['obstacle', 'obstacle', 'path', 'obstacle', 'obstacle', 'path', 'obstacle', 'obstacle'],
            ['path', 'path', 'path', 'path', 'path', 'path', 'path', 'path'],
            ['start', 'path', 'obstacle', 'path', 'path', 'obstacle', 'path', 'goal'],
            ['path', 'path', 'path', 'path', 'path', 'path', 'path', 'path'],
            ['obstacle', 'obstacle', 'path', 'obstacle', 'obstacle', 'path', 'obstacle', 'obstacle'],
            ['path', 'path', 'path', 'path', 'path', 'path', 'path', 'path']
        ],
        items: [
            { x: 1, y: 0, type: 'mushroom', collected: false },
            { x: 3, y: 0, type: 'mushroom', collected: false },
            { x: 5, y: 0, type: 'mushroom', collected: false },
            { x: 0, y: 2, type: 'mushroom', collected: false },
            { x: 2, y: 2, type: 'mushroom', collected: false },
            { x: 4, y: 2, type: 'mushroom', collected: false },
            { x: 6, y: 2, type: 'mushroom', collected: false },
            { x: 1, y: 4, type: 'mushroom', collected: false },
            { x: 3, y: 4, type: 'mushroom', collected: false },
            { x: 5, y: 4, type: 'mushroom', collected: false }
        ],
        hint: '组合使用多个函数，像搭积木一样',
        maxBlocks: 20,
        targetBlocks: 14
    },

    // 第20关：森林大救援（综合挑战）
    20: {
        id: 20,
        name: '森林大救援',
        description: '运用所有技巧完成最终挑战',
        width: 9,
        height: 9,
        start: { x: 0, y: 4 },
        goal: { x: 8, y: 4 },
        map: [
            ['path', 'path', 'path', 'obstacle', 'path', 'obstacle', 'path', 'path', 'path'],
            ['path', 'obstacle', 'path', 'path', 'path', 'path', 'path', 'obstacle', 'path'],
            ['path', 'path', 'obstacle', 'path', 'obstacle', 'path', 'obstacle', 'path', 'path'],
            ['obstacle', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'obstacle'],
            ['start', 'path', 'obstacle', 'path', 'obstacle', 'path', 'obstacle', 'path', 'goal'],
            ['obstacle', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'obstacle'],
            ['path', 'path', 'obstacle', 'path', 'obstacle', 'path', 'obstacle', 'path', 'path'],
            ['path', 'obstacle', 'path', 'path', 'path', 'path', 'path', 'obstacle', 'path'],
            ['path', 'path', 'path', 'obstacle', 'path', 'obstacle', 'path', 'path', 'path']
        ],
        items: [
            { x: 2, y: 0, type: 'mushroom', collected: false },
            { x: 6, y: 0, type: 'mushroom', collected: false },
            { x: 0, y: 2, type: 'mushroom', collected: false },
            { x: 4, y: 2, type: 'mushroom', collected: false },
            { x: 8, y: 2, type: 'mushroom', collected: false },
            { x: 2, y: 4, type: 'mushroom', collected: false },
            { x: 6, y: 4, type: 'mushroom', collected: false },
            { x: 0, y: 6, type: 'mushroom', collected: false },
            { x: 4, y: 6, type: 'mushroom', collected: false },
            { x: 8, y: 6, type: 'mushroom', collected: false },
            { x: 2, y: 8, type: 'mushroom', collected: false },
            { x: 6, y: 8, type: 'mushroom', collected: false }
        ],
        hint: '循环+条件+函数=编程大师！',
        maxBlocks: 25,
        targetBlocks: 18,
        unlocksCharacter: 'dragon'  // 解锁隐藏角色金龙
    }
};

window.World4Levels = World4Levels;
