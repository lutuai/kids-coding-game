/**
 * 水墨中国风 - 关卡数据（第26-30关）
 * 教学重点：综合挑战（推箱子、双角色、有限指令）
 */
const World6Levels = {
    // 第26关：过河拆桥
    26: {
        id: 26,
        name: '过河拆桥',
        description: '推动方块搭建道路',
        width: 6,
        height: 6,
        start: { x: 0, y: 0 },
        goal: { x: 5, y: 5 },
        map: [
            ['start', 'path', 'path', 'water', 'path', 'path'],
            ['obstacle', 'obstacle', 'path', 'water', 'path', 'obstacle'],
            ['path', 'path', 'path', 'water', 'path', 'path'],
            ['water', 'water', 'water', 'water', 'water', 'water'],
            ['path', 'path', 'path', 'water', 'path', 'path'],
            ['obstacle', 'path', 'path', 'water', 'path', 'goal']
        ],
        pushableBlocks: [
            { x: 2, y: 0, id: 'bridge1' },
            { x: 2, y: 2, id: 'bridge2' }
        ],
        items: [
            { x: 1, y: 2, type: 'lantern', collected: false },
            { x: 4, y: 2, type: 'lantern', collected: false },
            { x: 1, y: 4, type: 'lantern', collected: false },
            { x: 4, y: 4, type: 'lantern', collected: false }
        ],
        hint: '推动方块到水面上，搭桥过河',
        maxBlocks: 20,
        targetBlocks: 15
    },

    // 第27关：推箱子
    27: {
        id: 27,
        name: '推箱子',
        description: '经典推箱子游戏',
        width: 6,
        height: 6,
        start: { x: 0, y: 2 },
        goal: { x: 5, y: 2 },
        map: [
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle'],
            ['obstacle', 'path', 'path', 'path', 'path', 'obstacle'],
            ['start', 'path', 'path', 'path', 'path', 'goal'],
            ['obstacle', 'path', 'path', 'path', 'path', 'obstacle'],
            ['obstacle', 'path', 'path', 'path', 'path', 'obstacle'],
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle']
        ],
        pushableBlocks: [
            { x: 2, y: 2, targetX: 4, targetY: 2, id: 'box1' },
            { x: 1, y: 3, targetX: 3, targetY: 3, id: 'box2' }
        ],
        items: [
            { x: 2, y: 1, type: 'lantern', collected: false },
            { x: 4, y: 1, type: 'lantern', collected: false },
            { x: 3, y: 3, type: 'lantern', collected: false }
        ],
        hint: '把箱子推到目标位置（闪烁处）',
        maxBlocks: 25,
        targetBlocks: 18
    },

    // 第28关：双人协作（高级）
    28: {
        id: 28,
        name: '双人协作',
        description: '控制两个角色一起完成任务',
        width: 8,
        height: 6,
        start: { x: 0, y: 2 },
        goal: { x: 7, y: 2 },
        start2: { x: 0, y: 3 },
        goal2: { x: 7, y: 3 },
        dualCharacter: true,
        map: [
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle'],
            ['obstacle', 'path', 'path', 'obstacle', 'obstacle', 'path', 'path', 'obstacle'],
            ['start', 'path', 'path', 'path', 'path', 'path', 'path', 'goal'],
            ['start2', 'path', 'path', 'path', 'path', 'path', 'path', 'goal2'],
            ['obstacle', 'path', 'path', 'obstacle', 'obstacle', 'path', 'path', 'obstacle'],
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle']
        ],
        items: [
            { x: 2, y: 1, type: 'lantern', collected: false },
            { x: 5, y: 1, type: 'lantern', collected: false },
            { x: 3, y: 2, type: 'lantern', collected: false },
            { x: 4, y: 3, type: 'lantern', collected: false },
            { x: 2, y: 4, type: 'lantern', collected: false },
            { x: 5, y: 4, type: 'lantern', collected: false }
        ],
        hint: '同时控制两个角色，他们需要同时到达终点',
        maxBlocks: 20,
        targetBlocks: 15
    },

    // 第29关：有限指令挑战
    29: {
        id: 29,
        name: '有限指令挑战',
        description: '用最少的指令完成复杂任务',
        width: 7,
        height: 7,
        start: { x: 0, y: 3 },
        goal: { x: 6, y: 3 },
        map: [
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle'],
            ['obstacle', 'path', 'path', 'path', 'path', 'path', 'obstacle'],
            ['path', 'path', 'obstacle', 'path', 'obstacle', 'path', 'path'],
            ['start', 'path', 'obstacle', 'path', 'obstacle', 'path', 'goal'],
            ['path', 'path', 'obstacle', 'path', 'obstacle', 'path', 'path'],
            ['obstacle', 'path', 'path', 'path', 'path', 'path', 'obstacle'],
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle']
        ],
        items: [
            { x: 1, y: 1, type: 'lantern', collected: false },
            { x: 3, y: 1, type: 'lantern', collected: false },
            { x: 5, y: 1, type: 'lantern', collected: false },
            { x: 0, y: 2, type: 'lantern', collected: false },
            { x: 6, y: 2, type: 'lantern', collected: false },
            { x: 0, y: 4, type: 'lantern', collected: false },
            { x: 6, y: 4, type: 'lantern', collected: false },
            { x: 1, y: 5, type: 'lantern', collected: false },
            { x: 3, y: 5, type: 'lantern', collected: false },
            { x: 5, y: 5, type: 'lantern', collected: false }
        ],
        hint: '只能使用10个积木！善用函数和循环',
        maxBlocks: 10,
        targetBlocks: 8,
        strictLimit: true  // 严格限制，超量无法运行
    },

    // 第30关：终极迷宫（大师关）
    30: {
        id: 30,
        name: '终极迷宫',
        description: '通关证明你是编程大师！',
        width: 10,
        height: 10,
        start: { x: 0, y: 0 },
        goal: { x: 9, y: 9 },
        map: [
            ['start', 'path', 'path', 'obstacle', 'path', 'path', 'path', 'obstacle', 'path', 'path'],
            ['obstacle', 'obstacle', 'path', 'obstacle', 'path', 'obstacle', 'path', 'obstacle', 'path', 'obstacle'],
            ['path', 'path', 'path', 'path', 'path', 'obstacle', 'path', 'path', 'path', 'path'],
            ['path', 'obstacle', 'obstacle', 'obstacle', 'path', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'path'],
            ['path', 'path', 'path', 'obstacle', 'path', 'path', 'path', 'obstacle', 'path', 'path'],
            ['obstacle', 'obstacle', 'path', 'obstacle', 'obstacle', 'obstacle', 'path', 'obstacle', 'obstacle', 'path'],
            ['path', 'path', 'path', 'path', 'path', 'obstacle', 'path', 'path', 'path', 'path'],
            ['path', 'obstacle', 'obstacle', 'obstacle', 'path', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'path'],
            ['path', 'path', 'path', 'obstacle', 'path', 'path', 'path', 'obstacle', 'path', 'path'],
            ['obstacle', 'obstacle', 'path', 'path', 'path', 'obstacle', 'path', 'path', 'path', 'goal']
        ],
        items: [
            { x: 2, y: 0, type: 'lantern', collected: false },
            { x: 6, y: 0, type: 'lantern', collected: false },
            { x: 8, y: 0, type: 'lantern', collected: false },
            { x: 0, y: 2, type: 'lantern', collected: false },
            { x: 4, y: 2, type: 'lantern', collected: false },
            { x: 9, y: 2, type: 'lantern', collected: false },
            { x: 2, y: 4, type: 'lantern', collected: false },
            { x: 7, y: 4, type: 'lantern', collected: false },
            { x: 0, y: 6, type: 'lantern', collected: false },
            { x: 5, y: 6, type: 'lantern', collected: false },
            { x: 9, y: 6, type: 'lantern', collected: false },
            { x: 2, y: 8, type: 'lantern', collected: false },
            { x: 6, y: 8, type: 'lantern', collected: false },
            { x: 8, y: 8, type: 'lantern', collected: false }
        ],
        hint: '综合运用所有知识：循环、条件、函数、优化！',
        maxBlocks: 30,
        targetBlocks: 22,
        finalLevel: true  // 标记为最终关
    }
};

window.World6Levels = World6Levels;
