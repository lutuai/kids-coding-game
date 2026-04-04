/**
 * 主题管理器
 * 负责主题的注册、切换和应用
 */
class ThemeManager {
    constructor() {
        this.themes = new Map();
        this.currentTheme = null;
        this.defaultThemeId = 'candy';
    }

    /**
     * 初始化主题管理器
     */
    init() {
        // 注册所有内置主题
        this.register(CandyTheme);
        this.register(SpaceTheme);
        this.register(OceanTheme);
        this.register(ForestTheme);
        this.register(NeonTheme);
        this.register(InkTheme);

        // 加载保存的主题或默认主题
        const savedThemeId = Utils.load('selected_theme', this.defaultThemeId);
        this.switch(savedThemeId);

        // 绑定主题切换按钮
        this.bindEvents();

        return this;
    }

    /**
     * 注册主题
     * @param {Object} theme 主题配置对象
     */
    register(theme) {
        if (!theme || !theme.id) {
            console.error('主题注册失败：无效的主题配置');
            return false;
        }
        this.themes.set(theme.id, theme);
        console.log(`主题已注册: ${theme.name} (${theme.id})`);
        return true;
    }

    /**
     * 切换主题
     * @param {string} themeId 主题ID
     */
    switch(themeId) {
        const theme = this.themes.get(themeId);
        if (!theme) {
            console.warn(`主题不存在: ${themeId}，使用默认主题`);
            themeId = this.defaultThemeId;
        }

        this.currentTheme = this.themes.get(themeId);

        // 应用CSS变量
        this.currentTheme.applyCSS();

        // 保存选择
        Utils.save('selected_theme', themeId);

        // 触发主题切换事件
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: this.currentTheme }
        }));

        console.log(`主题已切换: ${this.currentTheme.name}`);
        return this.currentTheme;
    }

    /**
     * 获取当前主题
     */
    getCurrent() {
        return this.currentTheme;
    }

    /**
     * 获取所有主题
     */
    getAll() {
        return Array.from(this.themes.values());
    }

    /**
     * 渲染主题选择弹窗
     */
    renderThemeSelector() {
        const grid = document.getElementById('theme-grid');
        if (!grid) return;

        grid.innerHTML = '';

        this.getAll().forEach(theme => {
            const item = Utils.createElement('div', {
                className: `theme-item ${theme.id === this.currentTheme.id ? 'selected' : ''}`,
                onClick: () => {
                    this.switch(theme.id);
                    this.renderThemeSelector(); // 重新渲染以更新选中状态
                }
            });

            // 主题预览色块
            const preview = Utils.createElement('div', {
                className: 'theme-preview',
                style: {
                    background: `linear-gradient(135deg, ${theme.colors.primary} 50%, ${theme.colors.secondary} 50%)`
                }
            });

            // 主题名称
            const name = Utils.createElement('span', {
                className: 'theme-name',
                text: theme.name
            });

            // 图标
            const icon = Utils.createElement('span', {
                style: { fontSize: '20px', marginBottom: '4px' },
                text: theme.icon
            });

            item.appendChild(icon);
            item.appendChild(preview);
            item.appendChild(name);
            grid.appendChild(item);
        });
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 主题按钮
        const themeBtn = document.getElementById('btn-theme');
        const themeModal = document.getElementById('theme-modal');
        const closeThemeBtn = document.getElementById('btn-close-theme');

        if (themeBtn && themeModal) {
            themeBtn.addEventListener('click', () => {
                this.renderThemeSelector();
                themeModal.classList.add('active');
            });
        }

        if (closeThemeBtn && themeModal) {
            closeThemeBtn.addEventListener('click', () => {
                themeModal.classList.remove('active');
            });

            // 点击背景关闭
            themeModal.addEventListener('click', (e) => {
                if (e.target === themeModal) {
                    themeModal.classList.remove('active');
                }
            });
        }
    }

    /**
     * 获取主题适合的角色（某些主题有特殊角色效果）
     * @param {Object} character 角色
     */
    getCharacterEffect(character) {
        if (!this.currentTheme || !character) return null;

        // 特殊主题角色搭配
        const effects = {
            'space': {
                'astronaut': { specialAnimation: 'float' },
                'robot': { specialAnimation: 'scan' }
            },
            'neon': {
                'robot': { glow: true, glowColor: '#00FFFF' }
            },
            'ink': {
                'panda': { specialAnimation: 'ink_roll' },
                'dragon': { specialAnimation: 'ink_trail' }
            }
        };

        const themeEffects = effects[this.currentTheme.id];
        if (themeEffects && themeEffects[character.id]) {
            return themeEffects[character.id];
        }

        return null;
    }
}

// 全局主题管理器实例
window.themeManager = new ThemeManager();
