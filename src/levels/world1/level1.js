/**
 * 糖果乐园 - 关卡数据
 */
const World1Levels = {
    // 第1关：回家的路（教学：前进）
    1: {
        id: 1,
        name: '回家的路',
        description: '让小丸子走回家吧！',
        width: 5,
        height: 5,
        start: { x: 0, y: 2 },
        goal: { x: 4, y: 2 },
        map: [
            ['path', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path'],
            ['start', 'path', 'path', 'path', 'goal'],
            ['path', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path']
        ],
        items: [],
        hint: '点击"向右"积木4次',
        maxBlocks: 5,
        targetBlocks: 3
    },

    // 第2关：小转弯（教学：左转/右转）
    2: {
        id: 2,
        name: '小转弯',
        description: '需要转弯才能到家哦',
        width: 5,
        height: 5,
        start: { x: 0, y: 0 },
        goal: { x: 4, y: 4 },
        map: [
            ['start', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'goal']
        ],
        items: [],
        hint: '向右走，再向下走，再向右走',
        maxBlocks: 8,
        targetBlocks: 6
    },

    // 第3关：绕过障碍
    3: {
        id: 3,
        name: '绕过障碍',
        description: '小心不要撞到巧克力墙',
        width: 5,
        height: 5,
        start: { x: 0, y: 2 },
        goal: { x: 4, y: 2 },
        map: [
            ['path', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'obstacle', 'path', 'path'],
            ['start', 'path', 'obstacle', 'path', 'goal'],
            ['path', 'path', 'obstacle', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path']
        ],
        items: [],
        hint: '从上面或下面绕过去',
        maxBlocks: 10,
        targetBlocks: 8
    },

    // 第4关：收集糖果
    4: {
        id: 4,
        name: '收集糖果',
        description: '收集所有糖果再回家',
        width: 5,
        height: 5,
        start: { x: 0, y: 2 },
        goal: { x: 4, y: 2 },
        map: [
            ['path', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path'],
            ['start', 'path', 'path', 'path', 'goal'],
            ['path', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path']
        ],
        items: [
            { x: 2, y: 1, type: 'candy', collected: false },
            { x: 2, y: 3, type: 'candy', collected: false }
        ],
        hint: '记得收集路上的糖果',
        maxBlocks: 12,
        targetBlocks: 10
    },

    // 第5关：跳跃练习
    5: {
        id: 5,
        name: '跳跃练习',
        description: '用跳跃跳过小水坑',
        width: 5,
        height: 5,
        start: { x: 0, y: 2 },
        goal: { x: 4, y: 2 },
        map: [
            ['path', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path'],
            ['start', 'path', 'obstacle', 'path', 'goal'],
            ['path', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path']
        ],
        items: [],
        hint: '使用"跳跃"跳过障碍',
        maxBlocks: 5,
        targetBlocks: 4
    }
};

// 关卡管理器
const LevelManager = {
    currentLevel: 1,
    completedLevels: [],
    stars: {},

    init() {
        this.currentLevel = Utils.load('current_level', 1);
        this.completedLevels = Utils.load('completed_levels', []);
        this.stars = Utils.load('level_stars', {});
    },

    getLevel(levelNum) {
        // 从World1查找
        if (World1Levels[levelNum]) {
            return World1Levels[levelNum];
        }
        // 从World2查找
        if (typeof World2Levels !== 'undefined' && World2Levels[levelNum]) {
            return World2Levels[levelNum];
        }
        // 从World3查找
        if (typeof World3Levels !== 'undefined' && World3Levels[levelNum]) {
            return World3Levels[levelNum];
        }
        // 从World4查找
        if (typeof World4Levels !== 'undefined' && World4Levels[levelNum]) {
            return World4Levels[levelNum];
        }
        // 从World5查找
        if (typeof World5Levels !== 'undefined' && World5Levels[levelNum]) {
            return World5Levels[levelNum];
        }
        // 从World6查找
        if (typeof World6Levels !== 'undefined' && World6Levels[levelNum]) {
            return World6Levels[levelNum];
        }
        return null;
    },

    setCurrentLevel(levelNum) {
        this.currentLevel = levelNum;
        Utils.save('current_level', levelNum);
    },

    completeLevel(levelNum, starCount) {
        if (!this.completedLevels.includes(levelNum)) {
            this.completedLevels.push(levelNum);
        }
        this.stars[levelNum] = Math.max(this.stars[levelNum] || 0, starCount);

        Utils.save('completed_levels', this.completedLevels);
        Utils.save('level_stars', this.stars);
    },

    isLevelUnlocked(levelNum) {
        if (levelNum === 1) return true;
        // 关卡解锁条件：前一关已完成，或者本关已完成（可以重玩）
        return this.completedLevels.includes(levelNum - 1) ||
               this.completedLevels.includes(levelNum);
    },

    getTotalStars() {
        return Object.values(this.stars).reduce((a, b) => a + b, 0);
    }
};

window.World1Levels = World1Levels;
window.LevelManager = LevelManager;
