/**
 * 海底世界主题
 */
const OceanTheme = {
    id: 'ocean',
    name: '海底世界',
    icon: '🐠',
    description: '神秘的海底探险',

    colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        background: '#006B8F',
        surface: '#005A7A',
        text: '#FFFFFF',
        textLight: '#B0E0E6',
        grid: '#004A66',
        obstacle: '#2C3E50',
        success: '#7FFF00',
        warning: '#FFD700',
        error: '#FF6347'
    },

    map: {
        start: { icon: '🤿', color: '#FF6B6B' },
        goal: { icon: '🏴‍☠️', color: '#FFD700' },
        collectable: { icon: '🦪', color: '#E0E0E0' },
        obstacle: { icon: '🪸', color: '#FF7F7F' },
        ground: { color: '#006B8F' },
        grid: { color: '#004A66' }
    },

    particles: {
        type: 'bubbles',
        colors: ['#FFFFFF', '#87CEEB', '#ADD8E6', '#B0E0E6']
    },

    decorations: {
        enabled: true,
        items: [
            { icon: '🫧', position: 'random', opacity: 0.3 },
            { icon: '🌊', position: 'bottom', opacity: 0.2 }
        ]
    },

    drawCell(ctx, x, y, size, type, theme = this) {
        const padding = 2;
        const cellSize = size - padding * 2;

        // 海洋波浪纹理背景
        ctx.fillStyle = theme.colors.grid;
        ctx.fillRect(x + padding, y + padding, cellSize, cellSize);

        // 添加波浪线装饰
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
            ctx.moveTo(x + padding, y + padding + i * 15);
            ctx.quadraticCurveTo(
                x + size/2, y + padding + i * 15 + 5,
                x + size - padding, y + padding + i * 15
            );
        }
        ctx.stroke();

        switch (type) {
            case 'start':
                ctx.fillStyle = theme.map.start.color + '40';
                ctx.beginPath();
                ctx.arc(x + size/2, y + size/2, cellSize/2.2, 0, Math.PI * 2);
                ctx.fill();
                this.drawEmoji(ctx, theme.map.start.icon, x + size/2, y + size/2, size * 0.5);
                break;

            case 'goal':
                // 宝箱效果
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(x + 10, y + size/2, size - 20, size/2 - 5);
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(x + size/2 - 5, y + size/2 + 5, 10, 8);
                this.drawEmoji(ctx, theme.map.goal.icon, x + size/2, y + size/2 - 5, size * 0.4);
                break;

            case 'obstacle':
                // 珊瑚
                ctx.fillStyle = theme.map.obstacle.color;
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    ctx.arc(
                        x + 10 + i * 12,
                        y + size - 10,
                        8 + Math.random() * 4,
                        0, Math.PI * 2
                    );
                    ctx.fill();
                }
                break;

            case 'collectable':
                // 珍珠贝壳
                ctx.fillStyle = '#FFE4E1';
                ctx.beginPath();
                ctx.arc(x + size/2, y + size/2, cellSize/3, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FFF0F5';
                ctx.beginPath();
                ctx.arc(x + size/2 - 3, y + size/2 - 3, cellSize/6, 0, Math.PI * 2);
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

        // 小鱼身体（椭圆）
        ctx.fillStyle = character.color || '#FF6B6B';
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 1.2, radius * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();

        // 尾巴
        ctx.beginPath();
        ctx.moveTo(-radius, 0);
        ctx.lineTo(-radius * 1.5, -radius * 0.5);
        ctx.lineTo(-radius * 1.5, radius * 0.5);
        ctx.closePath();
        ctx.fill();

        // 眼睛
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(radius * 0.5, -radius * 0.2, radius * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(radius * 0.6, -radius * 0.2, radius * 0.12, 0, Math.PI * 2);
        ctx.fill();

        // 鱼鳍
        ctx.fillStyle = character.color || '#FF6B6B';
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.ellipse(0, radius * 0.5, radius * 0.4, radius * 0.3, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.restore();
    },

    applyCSS() {
        const root = document.documentElement;
        Object.entries(this.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    }
};

window.OceanTheme = OceanTheme;
