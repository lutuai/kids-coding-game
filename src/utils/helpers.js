/**
 * 工具函数集合
 */

const Utils = {
    /**
     * 生成唯一ID
     */
    uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    /**
     * 延迟函数
     * @param {number} ms 毫秒
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * 创建DOM元素
     * @param {string} tag 标签名
     * @param {Object} options 选项
     */
    createElement(tag, options = {}) {
        const el = document.createElement(tag);
        if (options.className) el.className = options.className;
        if (options.id) el.id = options.id;
        if (options.text) el.textContent = options.text;
        if (options.html) el.innerHTML = options.html;
        if (options.attrs) {
            Object.entries(options.attrs).forEach(([key, value]) => {
                el.setAttribute(key, value);
            });
        }
        if (options.style) {
            Object.assign(el.style, options.style);
        }
        if (options.onClick) {
            el.addEventListener('click', options.onClick);
        }
        return el;
    },

    /**
     * 角度转弧度
     * @param {number} degrees 角度
     */
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    },

    /**
     * 弧度转角度
     * @param {number} radians 弧度
     */
    toDegrees(radians) {
        return radians * (180 / Math.PI);
    },

    /**
     * 限制数值范围
     * @param {number} value 值
     * @param {number} min 最小值
     * @param {number} max 最大值
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    /**
     * 播放音效（预留接口）
     * @param {string} type 音效类型
     */
    async playSound(type) {
        // 预留接口，后续添加实际音效
        console.log(`播放音效: ${type}`);
    },

    /**
     * 语音合成（预留接口）
     * @param {string} text 文本
     */
    async speak(text) {
        // 预留接口，后续添加语音功能
        console.log(`语音: ${text}`);
    },

    /**
     * 创建粒子效果
     * @param {number} x 起始X
     * @param {number} y 起始Y
     * @param {string} emoji 表情符号
     * @param {number} count 数量
     */
    createParticles(x, y, emoji = '⭐', count = 10) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = emoji;
            particle.style.left = `${x + (Math.random() - 0.5) * 100}px`;
            particle.style.top = `${y + (Math.random() - 0.5) * 50}px`;
            particle.style.fontSize = `${20 + Math.random() * 20}px`;
            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
        }
    },

    /**
     * 本地存储
     * @param {string} key 键
     * @param {any} value 值
     */
    save(key, value) {
        try {
            localStorage.setItem(`kids_coding_${key}`, JSON.stringify(value));
        } catch (e) {
            console.error('保存失败:', e);
        }
    },

    /**
     * 读取本地存储
     * @param {string} key 键
     * @param {any} defaultValue 默认值
     */
    load(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(`kids_coding_${key}`);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('读取失败:', e);
            return defaultValue;
        }
    },

    /**
     * 节流函数
     * @param {Function} func 函数
     * @param {number} limit 限制时间
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * 防抖函数
     * @param {Function} func 函数
     * @param {number} wait 等待时间
     */
    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
};

// 全局暴露
window.Utils = Utils;
