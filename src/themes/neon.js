/**
 * 霓虹都市主题
 */
const NeonTheme = {
    id: 'neon',
    name: '霓虹都市',
    icon: '🌃',
    description: '炫酷的赛博朋克城市',

    colors: {
        primary: '#FF00FF',
        secondary: '#00FFFF',
        background: '#0A0A0A',
        surface: '#1A1A1A',
        text: '#FFFFFF',
        textLight: '#AAAAAA',
        grid: '#2A2A2A',
        obstacle: '#444444',
        success: '#00FF00',
        warning: '#FFFF00',
        error: '#FF0000'
    },

    map: {
        start: { icon: '🚗', color: '#FF00FF' },
        goal: { icon: '🏢', color: '#00FFFF' },
        collectable: { icon: '💎', color: '#00FFFF' },
        obstacle: { icon: '🚧', color: '#FF6600' },
        ground: { color: '#0A0A0A' },
        grid: { color: '#1A1A1A' }
    },

    particles: {
        type: 'neon',
        colors: ['#FF00FF', '#00FFFF', '#FFFF00', '#00FF00']
    },

    decorations: {
        enabled: true,
        items: [
            { icon: '✦', position: 'random', opacity: 0.5 },
            { icon: '▚', position: 'grid', opacity: 0.1 }
        ]
    },

    drawCell(ctx, x, y, size, type, theme = this) {
        const padding = 2;
        const cellSize = size - padding * 2;

        // 霓虹网格
        ctx.fillStyle = theme.colors.grid;
        ctx.fillRect(x + padding, y + padding, cellSize, cellSize);

        // 网格线
        ctx.strokeStyle = '#FF00FF20';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + padding, y + padding, cellSize, cellSize);

        switch (type) {
            case 'start':
                // 霓虹发光效果
                ctx.shadowColor = theme.map.start.color;
                ctx.shadowBlur = 10;
                ctx.fillStyle = theme.map.start.color;
                this.drawRoundRect(ctx, x + 8, y + 8, size - 16, size - 16, 4);
                ctx.fill();
                ctx.shadowBlur = 0;
                this.drawEmoji(ctx, theme.map.start.icon, x + size/2, y + size/2, size * 0.5);
                break;

            case 'goal':
                ctx.shadowColor = theme.map.goal.color;
                ctx.shadowBlur = 15;
                ctx.fillStyle = theme.map.goal.color;
                ctx.fillRect(x + 10, y + 5, size - 20, size - 10);
                ctx.shadowBlur = 0;
                // 高楼窗户
                ctx.fillStyle = '#000';
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 2; j++) {
                        ctx.fillRect(x + 14 + j * 12, y + 12 + i * 12, 6, 8);
                    }
                }
                break;

            case 'obstacle':
                // 路障条纹
                ctx.fillStyle = theme.map.obstacle.color;
                ctx.fillRect(x + 5, y + 5, size - 10, size - 10);
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.moveTo(x + 5, y + 5);
                ctx.lineTo(x + 15, y + 5);
                ctx.lineTo(x + 5, y + 15);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(x + size - 5, y + size - 5);
                ctx.lineTo(x + size - 15, y + size - 5);
                ctx.lineTo(x + size - 5, y + size - 15);
                ctx.closePath();
                ctx.fill();
                break;

            case 'collectable':
                // 发光钻石
                ctx.shadowColor = theme.map.collectable.color;
                ctx.shadowBlur = 20;
                ctx.fillStyle = theme.map.collectable.color;
                ctx.beginPath();
                ctx.moveTo(x + size/2, y + 8);
                ctx.lineTo(x + size - 8, y + size/2);
                ctx.lineTo(x + size/2, y + size - 8);
                ctx.lineTo(x + 8, y + size/2);
                ctx.closePath();
                ctx.fill();
                ctx.shadowBlur = 0;
                // 高光
                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                ctx.beginPath();
                ctx.moveTo(x + size/2, y + 8);
                ctx.lineTo(x + size/2 + 5, y + size/2 - 5);
                ctx.lineTo(x + size/2, y + size/2);
                ctx.lineTo(x + size/2 - 5, y + size/2 - 5);
                ctx.closePath();
                ctx.fill();
                break;
        }
    },

    drawRoundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
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

        // 霓虹机器人身体
        ctx.shadowColor = character.color || '#00FFFF';
        ctx.shadowBlur = 15;

        // 六边形身体
        ctx.fillStyle = character.color || '#00FFFF';
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const px = Math.cos(angle) * radius;
            const py = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0;

        // 内部核心
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // LED眼睛
        ctx.shadowColor = '#00FF00';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(-radius * 0.25, -radius * 0.1, radius * 0.15, radius * 0.3);
        ctx.fillRect(radius * 0.1, -radius * 0.1, radius * 0.15, radius * 0.3);
        ctx.shadowBlur = 0;

        ctx.restore();
    },

    applyCSS() {
        const root = document.documentElement;
        Object.entries(this.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    }
};

window.NeonTheme = NeonTheme;
