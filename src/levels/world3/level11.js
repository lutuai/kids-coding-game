/**
 * 海底世界 - 关卡数据（第11-15关）
 * 教学重点：条件判断
 */
const World3Levels = {
    // 第11关：初次判断（如果前面有墙）
    11: {
        id: 11,
        name: '智能避障',
        description: '使用条件判断自动避开障碍物',
        width: 6,
        height: 5,
        start: { x: 0, y: 2 },
        goal: { x: 5, y: 2 },
        map: [
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle'],
            ['obstacle', 'path', 'path', 'path', 'path', 'obstacle'],
            ['start', 'path', 'obstacle', 'path', 'path', 'goal'],
            ['obstacle', 'path', 'path', 'path', 'path', 'obstacle'],
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle']
        ],
        items: [
            { x: 1, y: 2, type: 'pearl', collected: false },
            { x: 3, y: 1, type: 'pearl', collected: false }
        ],
        hint: '如果前面有墙就向左，否则向右',
        maxBlocks: 8,
        targetBlocks: 4,
        requiredBlocks: ['if_wall'],
        unlocksCharacter: 'dino'
    },

    // 第12关：寻找出口
    12: {
        id: 12,
        name: '寻找出口',
        description: '在迷宫中找到正确的路',
        width: 5,
        height: 7,
        start: { x: 2, y: 6 },
        goal: { x: 2, y: 0 },
        map: [
            ['obstacle', 'obstacle', 'goal', 'obstacle', 'obstacle'],
            ['obstacle', 'path', 'path', 'path', 'obstacle'],
            ['obstacle', 'path', 'obstacle', 'path', 'obstacle'],
            ['obstacle', 'path', 'obstacle', 'path', 'obstacle'],
            ['obstacle', 'path', 'obstacle', 'path', 'obstacle'],
            ['obstacle', 'path', 'path', 'path', 'obstacle'],
            ['obstacle', 'obstacle', 'start', 'obstacle', 'obstacle']
        ],
        items: [
            { x: 3, y: 1, type: 'pearl', collected: false },
            { x: 1, y: 3, type: 'pearl', collected: false },
            { x: 3, y: 5, type: 'pearl', collected: false }
        ],
        hint: '使用"如果前面有路就向右"',
        maxBlocks: 10,
        targetBlocks: 6,
        requiredBlocks: ['if_path']
    },

    // 第13关：复杂迷宫
    13: {
        id: 13,
        name: '复杂迷宫',
        description: '结合循环和条件判断',
        width: 7,
        height: 7,
        start: { x: 0, y: 0 },
        goal: { x: 6, y: 6 },
        map: [
            ['start', 'path', 'path', 'obstacle', 'path', 'path', 'path'],
            ['obstacle', 'obstacle', 'path', 'obstacle', 'path', 'obstacle', 'path'],
            ['path', 'path', 'path', 'path', 'path', 'obstacle', 'path'],
            ['path', 'obstacle', 'obstacle', 'obstacle', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'obstacle', 'obstacle', 'obstacle', 'path'],
            ['obstacle', 'obstacle', 'path', 'path', 'path', 'obstacle', 'path'],
            ['path', 'path', 'path', 'obstacle', 'path', 'path', 'goal']
        ],
        items: [
            { x: 2, y: 2, type: 'pearl', collected: false },
            { x: 4, y: 2, type: 'pearl', collected: false },
            { x: 4, y: 4, type: 'pearl', collected: false }
        ],
        hint: '重复：(如果前面有路就向右，否则向下)',
        maxBlocks: 12,
        targetBlocks: 8
    },

    // 第14关：左右逢源
    14: {
        id: 14,
        name: '左右逢源',
        description: '根据环境选择左转或右转',
        width: 6,
        height: 5,
        start: { x: 0, y: 2 },
        goal: { x: 5, y: 2 },
        map: [
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle'],
            ['obstacle', 'path', 'path', 'path', 'path', 'obstacle'],
            ['start', 'path', 'obstacle', 'obstacle', 'path', 'goal'],
            ['obstacle', 'path', 'path', 'path', 'path', 'obstacle'],
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle']
        ],
        items: [
            { x: 1, y: 1, type: 'pearl', collected: false },
            { x: 4, y: 1, type: 'pearl', collected: false },
            { x: 1, y: 3, type: 'pearl', collected: false },
            { x: 4, y: 3, type: 'pearl', collected: false }
        ],
        hint: '需要两个如果判断：如果有墙就向上，如果有墙就向下',
        maxBlocks: 15,
        targetBlocks: 10
    },

    // 第15关：海底大冒险（综合挑战）
    15: {
        id: 15,
        name: '海底大冒险',
        description: '综合运用所有学到的知识',
        width: 8,
        height: 8,
        start: { x: 0, y: 0 },
        goal: { x: 7, y: 7 },
        map: [
            ['start', 'path', 'path', 'obstacle', 'path', 'path', 'path', 'path'],
            ['obstacle', 'obstacle', 'path', 'obstacle', 'path', 'obstacle', 'obstacle', 'path'],
            ['path', 'path', 'path', 'path', 'path', 'path', 'obstacle', 'path'],
            ['path', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'path', 'obstacle', 'path'],
            ['path', 'path', 'path', 'obstacle', 'path', 'path', 'obstacle', 'path'],
            ['obstacle', 'obstacle', 'path', 'path', 'path', 'obstacle', 'path', 'path'],
            ['path', 'obstacle', 'obstacle', 'obstacle', 'path', 'obstacle', 'obstacle', 'path'],
            ['path', 'path', 'path', 'path', 'path', 'path', 'path', 'goal']
        ],
        items: [
            { x: 2, y: 2, type: 'pearl', collected: false },
            { x: 5, y: 2, type: 'pearl', collected: false },
            { x: 4, y: 4, type: 'pearl', collected: false },
            { x: 2, y: 6, type: 'pearl', collected: false },
            { x: 6, y: 6, type: 'pearl', collected: false }
        ],
        hint: '循环 + 条件判断 = 强大的程序！',
        maxBlocks: 20,
        targetBlocks: 15,
        unlocksCharacter: 'astronaut'
    }
};

window.World3Levels = World3Levels;
