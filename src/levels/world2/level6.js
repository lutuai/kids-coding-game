/**
 * 太空探险 - 关卡数据（第6-10关）
 * 教学重点：循环概念
 */
const World2Levels = {
    // 第6关：初次循环（绕轨道一圈）
    6: {
        id: 6,
        name: '绕轨道一圈',
        description: '用重复指令让小丸子绕正方形轨道',
        width: 5,
        height: 5,
        start: { x: 1, y: 1 },
        goal: { x: 1, y: 1 },  // 回到起点
        map: [
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle'],
            ['obstacle', 'start', 'path', 'path', 'obstacle'],
            ['obstacle', 'path', 'obstacle', 'path', 'obstacle'],
            ['obstacle', 'path', 'path', 'path', 'obstacle'],
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle']
        ],
        items: [
            { x: 3, y: 1, type: 'star', collected: false },
            { x: 3, y: 3, type: 'star', collected: false },
            { x: 1, y: 3, type: 'star', collected: false }
        ],
        hint: '用"重复4次"：(向右 + 向下)',
        maxBlocks: 6,
        targetBlocks: 2,  // 重复4次(前进+右转) = 2个积木
        requiredBlocks: ['repeat4'],
        unlocksCharacter: 'rabbit'  // 解锁兔子
    },

    // 第7关：收集星星（直线重复）
    7: {
        id: 7,
        name: '收集星星',
        description: '重复前进，收集所有星星',
        width: 6,
        height: 5,
        start: { x: 0, y: 2 },
        goal: { x: 5, y: 2 },
        map: [
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle'],
            ['obstacle', 'path', 'path', 'path', 'path', 'obstacle'],
            ['start', 'path', 'path', 'path', 'path', 'goal'],
            ['obstacle', 'path', 'path', 'path', 'path', 'obstacle'],
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle']
        ],
        items: [
            { x: 1, y: 2, type: 'star', collected: false },
            { x: 2, y: 2, type: 'star', collected: false },
            { x: 3, y: 2, type: 'star', collected: false },
            { x: 4, y: 2, type: 'star', collected: false }
        ],
        hint: '用"重复4次"+"向右"',
        maxBlocks: 5,
        targetBlocks: 2,
        requiredBlocks: ['repeat4']
    },

    // 第8关：之字形前进
    8: {
        id: 8,
        name: '之字形前进',
        description: '走之字形路线收集星星',
        width: 5,
        height: 5,
        start: { x: 0, y: 0 },
        goal: { x: 4, y: 4 },
        map: [
            ['start', 'path', 'obstacle', 'path', 'obstacle'],
            ['obstacle', 'path', 'obstacle', 'path', 'obstacle'],
            ['obstacle', 'path', 'path', 'path', 'path'],
            ['obstacle', 'path', 'obstacle', 'obstacle', 'path'],
            ['obstacle', 'path', 'path', 'path', 'goal']
        ],
        items: [
            { x: 1, y: 0, type: 'star', collected: false },
            { x: 3, y: 1, type: 'star', collected: false },
            { x: 1, y: 2, type: 'star', collected: false },
            { x: 4, y: 2, type: 'star', collected: false },
            { x: 1, y: 4, type: 'star', collected: false }
        ],
        hint: '重复：(向右+向下+向左+向上)',
        maxBlocks: 10,
        targetBlocks: 3,
        requiredBlocks: ['repeat2']
    },

    // 第9关：方形螺旋
    9: {
        id: 9,
        name: '方形螺旋',
        description: '从外圈走到中心',
        width: 5,
        height: 5,
        start: { x: 0, y: 0 },
        goal: { x: 2, y: 2 },
        map: [
            ['start', 'path', 'path', 'path', 'path'],
            ['path', 'obstacle', 'obstacle', 'obstacle', 'path'],
            ['path', 'obstacle', 'goal', 'obstacle', 'path'],
            ['path', 'obstacle', 'obstacle', 'obstacle', 'path'],
            ['path', 'path', 'path', 'path', 'path']
        ],
        items: [
            { x: 3, y: 0, type: 'star', collected: false },
            { x: 4, y: 3, type: 'star', collected: false },
            { x: 1, y: 4, type: 'star', collected: false }
        ],
        hint: '从外圈向内圈走，每圈边长变短',
        maxBlocks: 12,
        targetBlocks: 8
    },

    // 第10关：星际穿越（综合挑战）
    10: {
        id: 10,
        name: '星际穿越',
        description: '综合运用循环和转向',
        width: 6,
        height: 6,
        start: { x: 0, y: 0 },
        goal: { x: 5, y: 5 },
        map: [
            ['start', 'path', 'path', 'obstacle', 'path', 'path'],
            ['path', 'obstacle', 'path', 'obstacle', 'path', 'obstacle'],
            ['path', 'path', 'path', 'path', 'path', 'path'],
            ['obstacle', 'path', 'obstacle', 'path', 'obstacle', 'path'],
            ['path', 'path', 'obstacle', 'path', 'path', 'path'],
            ['obstacle', 'path', 'path', 'path', 'obstacle', 'goal']
        ],
        items: [
            { x: 2, y: 0, type: 'star', collected: false },
            { x: 0, y: 2, type: 'star', collected: false },
            { x: 5, y: 2, type: 'star', collected: false },
            { x: 2, y: 4, type: 'star', collected: false },
            { x: 3, y: 5, type: 'star', collected: false }
        ],
        hint: '找到最短路径，善用循环',
        maxBlocks: 15,
        targetBlocks: 10,
        unlocksCharacter: 'panda'  // 解锁熊猫
    }
};

window.World2Levels = World2Levels;
