/**
 * 音效管理器
 * 管理游戏中的所有音效和背景音乐
 */
class AudioManager {
    constructor() {
        this.enabled = true;
        this.volume = 0.5;
        this.audioContext = null;
        this.sounds = new Map();
        this.initialized = false;
    }

    /**
     * 初始化音频系统
     */
    init() {
        // 从本地存储读取设置
        this.enabled = Utils.load('audio_enabled', true);
        this.volume = Utils.load('audio_volume', 0.5);

        // 尝试创建 AudioContext（需要用户交互后才能使用）
        this.tryInitAudioContext();

        // 绑定设置按钮
        this.bindSettings();

        this.initialized = true;
        console.log('音效管理器初始化完成');
    }

    /**
     * 尝试初始化 AudioContext
     */
    tryInitAudioContext() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioContext = new AudioContext();
            }
        } catch (e) {
            console.warn('Web Audio API 不支持:', e);
        }
    }

    /**
     * 播放音效
     * @param {string} soundType 音效类型
     * @param {Object} options 选项
     */
    async play(soundType, options = {}) {
        if (!this.enabled) return;

        // 如果 AudioContext 未初始化，尝试初始化
        if (this.audioContext && this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
            } catch (e) {
                console.warn('无法恢复 AudioContext:', e);
            }
        }

        // 使用 Web Audio API 生成音效
        if (this.audioContext) {
            this.generateSound(soundType, options);
        }
    }

    /**
     * 使用 Web Audio API 生成音效
     * @param {string} soundType 音效类型
     * @param {Object} options 选项
     */
    generateSound(soundType, options = {}) {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        const now = this.audioContext.currentTime;

        switch (soundType) {
            case 'click':
                // 点击音效 - 短促的高频音
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(800, now);
                oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.1);
                gainNode.gain.setValueAtTime(this.volume * 0.3, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                oscillator.start(now);
                oscillator.stop(now + 0.1);
                break;

            case 'add':
                // 添加积木音效 - 轻快的上升音
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(400, now);
                oscillator.frequency.linearRampToValueAtTime(600, now + 0.1);
                gainNode.gain.setValueAtTime(this.volume * 0.2, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                oscillator.start(now);
                oscillator.stop(now + 0.15);
                break;

            case 'remove':
                // 移除积木音效 - 下降音
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(600, now);
                oscillator.frequency.linearRampToValueAtTime(300, now + 0.1);
                gainNode.gain.setValueAtTime(this.volume * 0.2, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                oscillator.start(now);
                oscillator.stop(now + 0.1);
                break;

            case 'move':
                // 移动音效 - 短促的啵声
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(200, now);
                gainNode.gain.setValueAtTime(this.volume * 0.15, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
                oscillator.start(now);
                oscillator.stop(now + 0.08);
                break;

            case 'jump':
                // 跳跃音效 - 上升音
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(300, now);
                oscillator.frequency.linearRampToValueAtTime(800, now + 0.2);
                gainNode.gain.setValueAtTime(this.volume * 0.25, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                oscillator.start(now);
                oscillator.stop(now + 0.2);
                break;

            case 'turn':
                // 转向音效 - 滑音
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(400, now);
                oscillator.frequency.linearRampToValueAtTime(500, now + 0.1);
                gainNode.gain.setValueAtTime(this.volume * 0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                oscillator.start(now);
                oscillator.stop(now + 0.1);
                break;

            case 'collect':
                // 收集音效 - 清脆的叮声
                this.playCollectSound(gainNode, oscillator, now);
                break;

            case 'win':
                // 胜利音效 - 欢乐音阶
                this.playWinSound(now);
                break;

            case 'fail':
                // 失败音效 - 低沉的咚声
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(150, now);
                oscillator.frequency.exponentialRampToValueAtTime(80, now + 0.3);
                gainNode.gain.setValueAtTime(this.volume * 0.3, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
                oscillator.start(now);
                oscillator.stop(now + 0.4);
                break;

            case 'unlock':
                // 解锁音效 - 华丽的上升音
                this.playUnlockSound(now);
                break;

            default:
                oscillator.stop(now);
        }
    }

    /**
     * 播放收集音效（多音调）
     */
    playCollectSound(gainNode, oscillator, now) {
        // 主音
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, now);
        gainNode.gain.setValueAtTime(this.volume * 0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);

        // 和音（延迟一点）
        setTimeout(() => {
            const osc2 = this.audioContext.createOscillator();
            const gain2 = this.audioContext.createGain();
            osc2.connect(gain2);
            gain2.connect(this.audioContext.destination);

            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(1100, this.audioContext.currentTime);
            gain2.gain.setValueAtTime(this.volume * 0.15, this.audioContext.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            osc2.start(this.audioContext.currentTime);
            osc2.stop(this.audioContext.currentTime + 0.1);
        }, 50);
    }

    /**
     * 播放胜利音效（音阶）
     */
    playWinSound(now) {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C major chord: C, E, G, C
        const durations = [0, 0.1, 0.2, 0.3];

        notes.forEach((freq, index) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.type = 'sine';
            const startTime = now + durations[index];
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(this.volume * 0.2, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
            osc.start(startTime);
            osc.stop(startTime + 0.3);
        });
    }

    /**
     * 播放解锁音效
     */
    playUnlockSound(now) {
        const notes = [440, 554, 659, 880]; // A, C#, E, A

        notes.forEach((freq, index) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.type = 'triangle';
            const startTime = now + index * 0.08;
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(this.volume * 0.25, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);
            osc.start(startTime);
            osc.stop(startTime + 0.25);
        });
    }

    /**
     * 设置音效开关
     * @param {boolean} enabled 是否开启
     */
    setEnabled(enabled) {
        this.enabled = enabled;
        Utils.save('audio_enabled', enabled);
    }

    /**
     * 设置音量
     * @param {number} volume 音量 (0-1)
     */
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        Utils.save('audio_volume', this.volume);
    }

    /**
     * 切换音效开关
     */
    toggle() {
        this.setEnabled(!this.enabled);
        return this.enabled;
    }

    /**
     * 绑定设置按钮
     */
    bindSettings() {
        // 可以在这里绑定设置面板中的音效开关
        // 暂时通过全局访问
        window.audioManager = this;
    }

    /**
     * 创建音效控制UI
     */
    createAudioControls() {
        const container = document.createElement('div');
        container.className = 'audio-controls';
        container.innerHTML = `
            <button class="btn-audio-toggle" id="btn-audio-toggle" title="${this.enabled ? '关闭音效' : '开启音效'}">
                ${this.enabled ? '🔊' : '🔇'}
            </button>
            <input type="range" class="audio-volume" id="audio-volume"
                   min="0" max="100" value="${this.volume * 100}"
                   ${!this.enabled ? 'disabled' : ''}>
        `;

        // 绑定事件
        const toggleBtn = container.querySelector('#btn-audio-toggle');
        const volumeSlider = container.querySelector('#audio-volume');

        toggleBtn.addEventListener('click', () => {
            const enabled = this.toggle();
            toggleBtn.textContent = enabled ? '🔊' : '🔇';
            toggleBtn.title = enabled ? '关闭音效' : '开启音效';
            volumeSlider.disabled = !enabled;
        });

        volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });

        return container;
    }
}

// 全局音效管理器实例
window.AudioManager = AudioManager;
window.audioManager = new AudioManager();
