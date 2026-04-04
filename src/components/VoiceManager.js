/**
 * 语音引导管理器
 * 使用 Web Speech API 提供语音提示
 */
class VoiceManager {
    constructor() {
        this.enabled = true;
        this.volume = 1.0;
        this.rate = 0.9;  // 语速稍慢，适合儿童
        this.pitch = 1.1; // 音调稍高，更亲切
        this.voice = null;
        this.synthesis = window.speechSynthesis;
        this.initialized = false;
        this.speaking = false;

        // 语音提示内容库
        this.messages = {
            // 关卡开始提示
            levelStart: {
                1: '欢迎来到小丸子的编程冒险！拖动前进积木，让小丸子走回家吧！',
                2: '这次需要转弯哦！试试左转和右转积木。',
                3: '小心障碍物！试着绕过去。',
                4: '收集所有糖果再回家！',
                5: '遇到水坑不要怕，用跳跃积木跳过去！',
                6: '新技能解锁！用重复积木，让小丸子绕轨道一圈。',
                7: '重复前进，收集所有星星！',
                8: '试试用循环走之字形路线。',
                9: '从外圈走到中心，像蜗牛壳一样。',
                10: '综合运用循环和转向，完成星际穿越！',
                11: '新技能解锁！用条件判断，如果前面有墙就转弯。',
                12: '在迷宫中寻找出口，善用条件判断。',
                13: '把循环和条件结合起来使用。',
                14: '根据情况选择左转或右转。',
                15: '海底大冒险！综合运用所有知识。',
                16: '新技能解锁！学习创建函数，把常用指令组合起来。',
                17: '多次调用函数，少写代码多办事。',
                18: '为不同场景创建不同的函数。',
                19: '像搭积木一样，组合多个函数。',
                20: '森林大救援！你是编程大师了吗？',
                21: '新技能解锁！数字可以改，试试重复几次。',
                22: '找到最短路线，节省积木。',
                23: '根据颜色做出选择，粉色走左边，青色走右边。',
                24: '数一数需要收集多少物品。',
                25: '规划最优路线，通过所有站点。',
                26: '推动方块搭桥过河！',
                27: '经典推箱子，把箱子推到目标位置。',
                28: '同时控制两个角色，他们需要一起到达终点。',
                29: '只能使用十个积木！考验你优化代码的能力。',
                30: '终极挑战！综合运用所有知识，证明你是编程大师！'
            },

            // 通用提示
            hints: {
                noBlocks: '先添加一些指令积木吧！',
                tryAgain: '没关系，再试一次！',
                almostThere: '快到了，加油！',
                useLoop: '试试用循环积木，可以少写很多代码哦！',
                useFunction: '创建函数可以让代码更简洁！',
                collectAll: '记得收集所有物品！',
                notGoal: '小丸子还没到家呢，再试试看！'
            },

            // 成功提示
            success: [
                '太棒了！',
                '你真聪明！',
                '做得好！',
                '完美！',
                '继续加油！',
                '太厉害了！',
                '你是编程小天才！'
            ],

            // 鼓励提示
            encouragement: [
                '没关系，再试一次！',
                '失败是成功之母！',
                '想一想，问题出在哪里？',
                '换个思路试试看！',
                '小丸子相信你！'
            ],

            // 角色解锁
            unlock: '恭喜解锁新角色！快去试试吧！',

            // 收集物品
            collect: '叮！收集成功！',

            // 操作提示
            addBlock: '添加了新积木！',
            removeBlock: '移除了积木。',
            run: '开始运行程序！',
            reset: '重置关卡，再试一次！'
        };
    }

    /**
     * 初始化语音系统
     */
    init() {
        if (!this.synthesis) {
            console.warn('浏览器不支持语音合成');
            return false;
        }

        // 从本地存储读取设置
        this.enabled = Utils.load('voice_enabled', true);
        this.volume = Utils.load('voice_volume', 1.0);

        // 选择合适的中文语音
        this.selectVoice();

        this.initialized = true;
        console.log('语音管理器初始化完成');
        return true;
    }

    /**
     * 选择中文语音
     */
    selectVoice() {
        const voices = this.synthesis.getVoices();

        // 优先选择中文语音
        const chineseVoice = voices.find(v =>
            v.lang.includes('zh') || v.lang.includes('cmn')
        );

        // 如果没有中文，选择默认语音
        this.voice = chineseVoice || voices[0];

        console.log('选择语音:', this.voice?.name || '默认');
    }

    /**
     * 播放语音
     * @param {string} text 要播放的文本
     * @param {Object} options 选项
     */
    speak(text, options = {}) {
        if (!this.enabled || !this.synthesis || !text) return;

        // 如果正在说话，可以选择打断或排队
        if (this.speaking && options.interrupt) {
            this.synthesis.cancel();
        } else if (this.speaking) {
            // 已经在说话，忽略新请求（简单处理）
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.voice;
        utterance.volume = options.volume || this.volume;
        utterance.rate = options.rate || this.rate;
        utterance.pitch = options.pitch || this.pitch;

        utterance.onstart = () => {
            this.speaking = true;
        };

        utterance.onend = () => {
            this.speaking = false;
        };

        utterance.onerror = (e) => {
            console.warn('语音播放错误:', e);
            this.speaking = false;
        };

        this.synthesis.speak(utterance);
    }

    /**
     * 关卡开始提示
     * @param {number} levelNum 关卡号
     */
    levelStart(levelNum) {
        const message = this.messages.levelStart[levelNum];
        if (message) {
            // 延迟一点播放，让用户看到界面
            setTimeout(() => {
                this.speak(message, { rate: 0.85 });
            }, 500);
        }
    }

    /**
     * 随机成功提示
     */
    success() {
        const messages = this.messages.success;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.speak(randomMessage, { pitch: 1.2, rate: 1.0 });
    }

    /**
     * 随机鼓励提示
     */
    encourage() {
        const messages = this.messages.encouragement;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.speak(randomMessage, { pitch: 1.0, rate: 0.9 });
    }

    /**
     * 通用提示
     * @param {string} key 提示键名
     */
    hint(key) {
        const message = this.messages.hints[key];
        if (message) {
            this.speak(message);
        }
    }

    /**
     * 角色解锁提示
     */
    unlock() {
        this.speak(this.messages.unlock, { pitch: 1.3, rate: 1.0 });
    }

    /**
     * 收集物品提示
     */
    collect() {
        // 收集音效已经很明显，语音可以简短
        if (Math.random() > 0.7) { // 30% 概率播放
            this.speak('收集成功！', { volume: 0.6 });
        }
    }

    /**
     * 操作提示
     * @param {string} action 操作类型
     */
    action(action) {
        const message = this.messages[action];
        if (message && typeof message === 'string') {
            this.speak(message, { volume: 0.5 });
        }
    }

    /**
     * 朗读任意文本
     * @param {string} text 文本
     */
    say(text) {
        this.speak(text);
    }

    /**
     * 设置语音开关
     * @param {boolean} enabled 是否开启
     */
    setEnabled(enabled) {
        this.enabled = enabled;
        Utils.save('voice_enabled', enabled);

        if (!enabled) {
            this.synthesis.cancel();
        }
    }

    /**
     * 切换语音开关
     */
    toggle() {
        this.setEnabled(!this.enabled);
        return this.enabled;
    }

    /**
     * 设置音量
     * @param {number} volume 音量 (0-1)
     */
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        Utils.save('voice_volume', this.volume);
    }

    /**
     * 停止播放
     */
    stop() {
        if (this.synthesis) {
            this.synthesis.cancel();
            this.speaking = false;
        }
    }

    /**
     * 暂停播放
     */
    pause() {
        if (this.synthesis) {
            this.synthesis.pause();
        }
    }

    /**
     * 恢复播放
     */
    resume() {
        if (this.synthesis) {
            this.synthesis.resume();
        }
    }
}

// 全局语音管理器实例
window.VoiceManager = VoiceManager;
window.voiceManager = new VoiceManager();
