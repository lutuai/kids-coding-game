/**
 * 水墨中国风主题
 */
const InkTheme = {
    id: 'ink',
    name: '水墨中国',
    icon: '🎋',
    description: '典雅的水墨山水画风',

    colors: {
        primary: '#8B4513',
        secondary: '#2F4F4F',
        background: '#F5F5DC',
        surface: '#FAF0E6',
        text: '#2F2F2F',
        textLight: '#696969',
        grid: '#E8E8D0',
        obstacle: '#4A4A4A',
        success: '#228B22',
        warning: '#B8860B',
        error: '#8B0000'
    },

    map: {
        start: { icon: '🎋', color: '#228B22' },
        goal: { icon: '🏯', color: '#8B4513' },
        collectable: { icon: '🏮', color: '#DC143C' },
        obstacle: { icon: '🪨', color: '#696969' },
        ground: { color: '#F5F5DC' },
        grid: { color: '#E8E8D0' }
    },

    particles: {
        type: 'ink',
        colors: ['#2F2F2F', '#4A4A4A', '#696969', '#8B4513']
    },

    decorations: {
        enabled: true,
        items: [
            { icon: '🌸', position: 'random', opacity: 0.2 },
            { icon: '🍃', position: 'float', opacity: 0.15 }
        ]
    },

    drawCell(ctx, x, y, size, type, theme = this) {
        const padding = 2;
        const cellSize = size - padding * 2;

        // 宣纸纹理
        ctx.fillStyle = theme.colors.grid;
        ctx.fillRect(x + padding, y + padding, cellSize, cellSize);

        // 水墨晕染效果
        if ((x + y) % 4 === 0) {
            ctx.fillStyle = 'rgba(139,69,19,0.05)';
            ctx.beginPath();
            ctx.arc(x + size/2, y + size/2, size/3, 0, Math.PI * 2);
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
                // 中式亭子
                ctx.fillStyle = theme.map.goal.color;
                // 屋顶
                ctx.beginPath();
                ctx.moveTo(x + 5, y + size/2);
                ctx.lineTo(x + size/2, y + 8);
                ctx.lineTo(x + size - 5, y + size/2);
                ctx.lineTo(x + size - 10, y + size/2 + 5);
                ctx.lineTo(x + 10, y + size/2 + 5);
                ctx.closePath();
                ctx.fill();
                // 柱子
                ctx.fillRect(x + size/2 - 8, y + size/2 + 5, 4, size/2 - 10);
                ctx.fillRect(x + size/2 + 4, y + size/2 + 5, 4, size/2 - 10);
                break;

            case 'obstacle':
                // 水墨山石
                ctx.fillStyle = theme.map.obstacle.color;
                ctx.beginPath();
                ctx.ellipse(x + size/2, y + size/2 + 5, size/3, size/4, 0, 0, Math.PI * 2);
                ctx.fill();
                // 山石纹理
                ctx.strokeStyle = 'rgba(0,0,0,0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x + size/2 - 8, y + size/2);
                ctx.lineTo(x + size/2 + 5, y + size/2 + 8);
                ctx.stroke();
                break;

            case 'collectable':
                // 灯笼
                ctx.fillStyle = theme.map.collectable.color;
                ctx.beginPath();
                ctx.ellipse(x + size/2, y + size/2 + 2, 10, 14, 0, 0, Math.PI * 2);
                ctx.fill();
                // 灯笼上下
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(x + size/2 - 6, y + size/2 - 14, 12, 4);
                ctx.fillRect(x + size/2 - 4, y + size/2 + 12, 8, 4);
                // 流苏
                ctx.strokeStyle = '#DC143C';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x + size/2, y + size/2 + 16);
                ctx.lineTo(x + size/2, y + size/2 + 22);
                ctx.stroke();
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

        // 熊猫黑白配色
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();

        // 白色脸部
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ellipse(0, radius * 0.1, radius * 0.75, radius * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // 黑眼圈
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.ellipse(-radius * 0.25, -radius * 0.05, radius * 0.2, radius * 0.15, -0.3, 0, Math.PI * 2);
        ctx.ellipse(radius * 0.25, -radius * 0.05, radius * 0.2, radius * 0.15, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // 眼睛
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(-radius * 0.25, -radius * 0.05, radius * 0.06, 0, Math.PI * 2);
        ctx.arc(radius * 0.25, -radius * 0.05, radius * 0.06, 0, Math.PI * 2);
        ctx.fill();

        // 鼻子
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.ellipse(0, radius * 0.15, radius * 0.08, radius * 0.05, 0, 0, Math.PI * 2);
        ctx.fill();

        // 耳朵
        ctx.beginPath();
        ctx.arc(-radius * 0.6, -radius * 0.5, radius * 0.25, 0, Math.PI * 2);
        ctx.arc(radius * 0.6, -radius * 0.5, radius * 0.25, 0, Math.PI * 2);
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

window.InkTheme = InkTheme;
