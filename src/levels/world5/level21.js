/**
 * 霓虹都市 - 关卡数据（第21-25关）
 * 教学重点：变量概念（简化版）
 */
const World5Levels = {
    // 第21关：计数器（变量概念入门）
    21: {
        id: 21,
        name: '计数器',
        description: '学习使用可变数字',
        width: 7,
        height: 5,
        start: { x: 0, y: 2 },
        goal: { x: 6, y: 2 },
        map: [
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle'],
            ['obstacle', 'path', 'path', 'path', 'path', 'path', 'obstacle'],
            ['start', 'path', 'path', 'path', 'path', 'path', 'goal'],
            ['obstacle', 'path', 'path', 'path', 'path', 'path', 'obstacle'],
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle']
        ],
        items: [
            { x: 1, y: 2, type: 'diamond', collected: false },
            { x: 2, y: 2, type: 'diamond', collected: false },
            { x: 3, y: 2, type: 'diamond', collected: false },
            { x: 4, y: 2, type: 'diamond', collected: false },
            { x: 5, y: 2, type: 'diamond', collected: false }
        ],
        hint: '用"重复N次"，N可以改成任意数字',
        maxBlocks: 6,
        targetBlocks: 2,
        requiredBlocks: ['repeatN'],
        variableBlocks: true
    },

    // 第22关：最优路径（步数限制）
    22: {
        id: 22,
        name: '最优路径',
        description: '找到最短路线，节省积木',
        width: 6,
        height: 6,
        start: { x: 0, y: 0 },
        goal: { x: 5, y: 5 },
        map: [
            ['start', 'path', 'path', 'path', 'obstacle', 'path'],
            ['obstacle', 'obstacle', 'path', 'obstacle', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path', 'obstacle'],
            ['path', 'obstacle', 'obstacle', 'obstacle', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'obstacle', 'path'],
            ['obstacle', 'path', 'obstacle', 'path', 'path', 'goal']
        ],
        items: [
            { x: 2, y: 0, type: 'diamond', collected: false },
            { x: 4, y: 1, type: 'diamond', collected: false },
            { x: 0, y: 2, type: 'diamond', collected: false },
            { x: 4, y: 3, type: 'diamond', collected: false },
            { x: 2, y: 4, type: 'diamond', collected: false }
        ],
        hint: '计算最少需要多少步，用"重复N次"',
        maxBlocks: 10,
        targetBlocks: 6
    },

    // 第23关：颜色判断
    23: {
        id: 23,
        name: '霓虹灯',
        description: '根据颜色做出选择',
        width: 5,
        height: 6,
        start: { x: 2, y: 5 },
        goal: { x: 2, y: 0 },
        map: [
            ['obstacle', 'obstacle', 'goal', 'obstacle', 'obstacle'],
            ['obstacle', 'path', 'path', 'path', 'obstacle'],
            ['path', 'path', 'obstacle', 'path', 'path'],
            ['obstacle', 'path', 'path', 'path', 'obstacle'],
            ['obstacle', 'path', 'obstacle', 'path', 'obstacle'],
            ['obstacle', 'path', 'start', 'path', 'obstacle']
        ],
        coloredTiles: [
            { x: 1, y: 1, color: 'pink' },
            { x: 3, y: 1, color: 'cyan' },
            { x: 0, y: 2, color: 'pink' },
            { x: 4, y: 2, color: 'cyan' },
            { x: 1, y: 3, color: 'cyan' },
            { x: 3, y: 3, color: 'pink' }
        ],
        items: [
            { x: 1, y: 1, type: 'diamond', collected: false },
            { x: 3, y: 1, type: 'diamond', collected: false },
            { x: 0, y: 2, type: 'diamond', collected: false },
            { x: 4, y: 2, type: 'diamond', collected: false }
        ],
        hint: '如果脚下是粉色就走左边，青色就走右边',
        maxBlocks: 15,
        targetBlocks: 10,
        requiredBlocks: ['if_color']
    },

    // 第24关：动态计数
    24: {
        id: 24,
        name: '动态计数',
        description: '根据收集数量调整策略',
        width: 7,
        height: 6,
        start: { x: 0, y: 2 },
        goal: { x: 6, y: 2 },
        map: [
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle'],
            ['path', 'path', 'path', 'path', 'path', 'path', 'path'],
            ['start', 'path', 'path', 'path', 'path', 'path', 'goal'],
            ['path', 'path', 'path', 'path', 'path', 'path', 'path'],
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle'],
            ['obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle', 'obstacle']
        ],
        items: [
            { x: 1, y: 1, type: 'diamond', collected: false },
            { x: 2, y: 1, type: 'diamond', collected: false },
            { x: 3, y: 1, type: 'diamond', collected: false },
            { x: 4, y: 1, type: 'diamond', collected: false },
            { x: 5, y: 1, type: 'diamond', collected: false },
            { x: 1, y: 3, type: 'diamond', collected: false },
            { x: 2, y: 3, type: 'diamond', collected: false },
            { x: 3, y: 3, type: 'diamond', collected: false },
            { x: 4, y: 3, type: 'diamond', collected: false },
            { x: 5, y: 3, type: 'diamond', collected: false }
        ],
        hint: '收集上面5个，再收集下面5个，用"重复5次"',
        maxBlocks: 12,
        targetBlocks: 8
    },

    // 第25关：城市交通规划（综合挑战）
    25: {
        id: 25,
        name: '城市交通规划',
        description: '规划最优路线，通过所有站点',
        width: 8,
        height: 8,
        start: { x: 0, y: 0 },
        goal: { x: 7, y: 7 },
        map: [
            ['start', 'path', 'path', 'path', 'path', 'path', 'path', 'path'],
            ['path', 'obstacle', 'obstacle', 'path', 'obstacle', 'obstacle', 'obstacle', 'path'],
            ['path', 'obstacle', 'path', 'path', 'path', 'path', 'obstacle', 'path'],
            ['path', 'path', 'path', 'obstacle', 'obstacle', 'path', 'path', 'path'],
            ['path', 'obstacle', 'path', 'path', 'path', 'path', 'obstacle', 'path'],
            ['path', 'obstacle', 'obstacle', 'path', 'obstacle', 'obstacle', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'obstacle', 'path', 'path', 'path'],
            ['path', 'obstacle', 'obstacle', 'path', 'path', 'path', 'obstacle', 'goal']
        ],
        items: [
            { x: 2, y: 0, type: 'diamond', collected: false },
            { x: 5, y: 0, type: 'diamond', collected: false },
            { x: 0, y: 3, type: 'diamond', collected: false },
            { x: 3, y: 2, type: 'diamond', collected: false },
            { x: 6, y: 3, type: 'diamond', collected: false },
            { x: 2, y: 4, type: 'diamond', collected: false },
            { x: 5, y: 4, type: 'diamond', collected: false },
            { x: 0, y: 6, type: 'diamond', collected: false },
            { x: 4, y: 6, type: 'diamond', collected: false },
            { x: 7, y: 5, type: 'diamond', collected: false }
        ],
        hint: '循环+条件+函数=编程大师！优化你的代码',
        maxBlocks: 25,
        targetBlocks: 18
    }
};

window.World5Levels = World5Levels;
