/**
 * 森林奇遇主题
 */
const ForestTheme = {
    id: 'forest',
    name: '森林奇遇',
    icon: '🌲',
    description: '神秘的森林冒险',

    colors: {
        primary: '#2E8B57',
        secondary: '#DAA520',
        background: '#F0FFF0',
        surface: '#E8F5E9',
        text: '#2F4F4F',
        textLight: '#556B2F',
        grid: '#C8E6C9',
        obstacle: '#8B4513',
        success: '#32CD32',
        warning: '#DAA520',
        error: '#DC143C'
    },

    map: {
        start: { icon: '🏕️', color: '#8B4513' },
        goal: { icon: '🏠', color: '#D2691E' },
        collectable: { icon: '🍄', color: '#DC143C' },
        obstacle: { icon: '🌲', color: '#228B22' },
        ground: { color: '#F0FFF0' },
        grid: { color: '#C8E6C9' }
    },

    particles: {
        type: 'leaves',
        colors: ['#228B22', '#32CD32', '#DAA520', '#8B4513']
    },

    decorations: {
        enabled: true,
        items: [
            { icon: '🍃', position: 'random', opacity: 0.2 },
            { icon: '🌿', position: 'corner', opacity: 0.15 }
        ]
    },

    drawCell(ctx, x, y, size, type, theme = this) {
        const padding = 2;
        const cellSize = size - padding * 2;

        // 草地纹理
        ctx.fillStyle = theme.colors.grid;
        ctx.fillRect(x + padding, y + padding, cellSize, cellSize);

        // 草地点缀
        if ((x + y) % 3 === 0) {
            ctx.fillStyle = 'rgba(144,238,144,0.3)';
            ctx.beginPath();
            ctx.arc(x + size/2 + 5, y + size/2 + 5, 3, 0, Math.PI * 2);
            ctx.fill();
        }

        switch (type) {
            case 'start':
                ctx.fillStyle = theme.map.start.color + '30';
                ctx.beginPath();
                ctx.arc(x + size/2, y + size/2, cellSize/2.2, 0, Math.PI * 2);
                ctx.fill();
                this.drawEmoji(ctx, theme.map.start.icon, x + size/2, y + size/2, size * 0.5);
                break;

            case 'goal':
                // 小木屋
                ctx.fillStyle = theme.map.goal.color;
                ctx.fillRect(x + 12, y + 15, size - 24, size - 20);
                ctx.beginPath();
                ctx.moveTo(x + 8, y + 15);
                ctx.lineTo(x + size/2, y + 5);
                ctx.lineTo(x + size - 8, y + 15);
                ctx.closePath();
                ctx.fillStyle = '#8B4513';
                ctx.fill();
                break;

            case 'obstacle':
                // 松树
                ctx.fillStyle = theme.map.obstacle.color;
                ctx.beginPath();
                ctx.moveTo(x + size/2, y + 5);
                ctx.lineTo(x + size - 8, y + size/2);
                ctx.lineTo(x + size/2 + 5, y + size/2);
                ctx.lineTo(x + size - 5, y + size - 8);
                ctx.lineTo(x + 5, y + size - 8);
                ctx.lineTo(x + size/2 - 5, y + size/2);
                ctx.lineTo(x + 8, y + size/2);
                ctx.closePath();
                ctx.fill();
                // 树干
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(x + size/2 - 3, y + size - 12, 6, 8);
                break;

            case 'collectable':
                // 蘑菇
                ctx.fillStyle = '#FFF8DC';
                ctx.fillRect(x + size/2 - 4, y + size/2 + 2, 8, 12);
                ctx.fillStyle = theme.map.collectable.color;
                ctx.beginPath();
                ctx.arc(x + size/2, y + size/2 + 2, 12, Math.PI, 0);
                ctx.fill();
                // 蘑菇点
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(x + size/2 - 5, y + size/2 - 2, 3, 0, Math.PI * 2);
                ctx.arc(x + size/2 + 4, y + size/2, 2, 0, Math.PI * 2);
                ctx.fill();
                break;
        }
    },

    drawEmoji(ctx, emoji, x, y, size) {
        ctx.font = `${size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, x, y + 2);
    },

    drawCharacter(ctx, x, y, size, character, direction = 0) {
        const centerX = x + size / 2;
        const centerY = y + size / 2;
        const radius = size * 0.35;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(Utils.toRadians(direction));

        // 小熊身体（圆滚滚）
        ctx.fillStyle = character.color || '#8B4513';
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();

        // 耳朵
        ctx.beginPath();
        ctx.arc(-radius * 0.6, -radius * 0.6, radius * 0.35, 0, Math.PI * 2);
        ctx.arc(radius * 0.6, -radius * 0.6, radius * 0.35, 0, Math.PI * 2);
        ctx.fill();

        // 耳朵内侧
        ctx.fillStyle = '#DEB887';
        ctx.beginPath();
        ctx.arc(-radius * 0.6, -radius * 0.6, radius * 0.2, 0, Math.PI * 2);
        ctx.arc(radius * 0.6, -radius * 0.6, radius * 0.2, 0, Math.PI * 2);
        ctx.fill();

        // 脸部区域
        ctx.fillStyle = '#DEB887';
        ctx.beginPath();
        ctx.arc(0, radius * 0.1, radius * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // 眼睛
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(-radius * 0.25, -radius * 0.15, radius * 0.12, 0, Math.PI * 2);
        ctx.arc(radius * 0.25, -radius * 0.15, radius * 0.12, 0, Math.PI * 2);
        ctx.fill();

        // 鼻子
        ctx.beginPath();
        ctx.arc(0, radius * 0.05, radius * 0.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    },

    applyCSS() {
        const root = document.documentElement;
        Object.entries(this.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    }
};

window.ForestTheme = ForestTheme;
