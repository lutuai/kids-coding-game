/**
 * 太空探险主题
 */
const SpaceTheme = {
    id: 'space',
    name: '太空探险',
    icon: '🚀',
    description: '神秘的宇宙星空',

    colors: {
        primary: '#7B68EE',
        secondary: '#00CED1',
        background: '#1A1A2E',
        surface: '#16213E',
        text: '#FFFFFF',
        textLight: '#B8B8D1',
        grid: '#0F3460',
        obstacle: '#533483',
        success: '#00D9FF',
        warning: '#FFA500',
        error: '#FF4444'
    },

    map: {
        start: { icon: '🚀', color: '#E94560' },
        goal: { icon: '🪐', color: '#7B68EE' },
        collectable: { icon: '⭐', color: '#FFD700' },
        obstacle: { icon: '🌑', color: '#4A4A6A' },
        ground: { color: '#1A1A2E' },
        grid: { color: '#0F3460' }
    },

    particles: {
        type: 'stars',
        colors: ['#FFD700', '#00D9FF', '#FFFFFF', '#7B68EE']
    },

    decorations: {
        enabled: true,
        items: [
            { icon: '✨', position: 'random', opacity: 0.3 },
            { icon: '🌟', position: 'random', opacity: 0.2 }
        ]
    },

    drawCell(ctx, x, y, size, type, theme = this) {
        const padding = 2;
        const cellSize = size - padding * 2;

        // 太空主题用深色网格
        ctx.fillStyle = theme.colors.grid;
        ctx.fillRect(x + padding, y + padding, cellSize, cellSize);

        switch (type) {
            case 'start':
                ctx.fillStyle = theme.map.start.color;
                ctx.beginPath();
                ctx.arc(x + size/2, y + size/2, cellSize/2.5, 0, Math.PI * 2);
                ctx.fill();
                this.drawEmoji(ctx, theme.map.start.icon, x + size/2, y + size/2, size * 0.5);
                break;

            case 'goal':
                // 土星环效果
                ctx.strokeStyle = theme.map.goal.color;
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.ellipse(x + size/2, y + size/2, cellSize/2, cellSize/4, Math.PI/6, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = theme.map.goal.color + '60';
                ctx.beginPath();
                ctx.arc(x + size/2, y + size/2, cellSize/3, 0, Math.PI * 2);
                ctx.fill();
                this.drawEmoji(ctx, theme.map.goal.icon, x + size/2, y + size/2, size * 0.5);
                break;

            case 'obstacle':
                ctx.fillStyle = theme.map.obstacle.color;
                ctx.beginPath();
                ctx.arc(x + size/2, y + size/2, cellSize/3, 0, Math.PI * 2);
                ctx.fill();
                // 陨石坑效果
                ctx.fillStyle = theme.colors.background;
                ctx.beginPath();
                ctx.arc(x + size/2 - 3, y + size/2 - 3, cellSize/8, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'collectable':
                // 闪烁的星星
                ctx.fillStyle = theme.map.collectable.color;
                this.drawStar(ctx, x + size/2, y + size/2, 5, cellSize/3, cellSize/6);
                ctx.fill();
                break;
        }
    },

    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
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

        // 宇航员头盔（圆形玻璃罩）
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#E0E0E0';
        ctx.fill();
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 玻璃反光
        ctx.beginPath();
        ctx.arc(-radius * 0.3, -radius * 0.3, radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fill();

        // 脸部
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = character.color || '#FFD700';
        ctx.fill();

        // 眼睛
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(-radius * 0.25, -radius * 0.1, radius * 0.12, 0, Math.PI * 2);
        ctx.arc(radius * 0.25, -radius * 0.1, radius * 0.12, 0, Math.PI * 2);
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

window.SpaceTheme = SpaceTheme;
