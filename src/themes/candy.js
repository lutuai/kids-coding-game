/**
 * 糖果乐园主题
 */
const CandyTheme = {
    id: 'candy',
    name: '糖果乐园',
    icon: '🍬',
    description: '甜蜜可爱的糖果世界',

    colors: {
        primary: '#FF6B9D',
        secondary: '#4ECDC4',
        background: '#FFF5F7',
        surface: '#FFFFFF',
        text: '#333333',
        textLight: '#666666',
        grid: '#FFE4EC',
        obstacle: '#C44569',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336'
    },

    // 地图元素
    map: {
        start: { icon: '🍭', color: '#FF6B9D' },
        goal: { icon: '🏰', color: '#9C27B0' },
        collectable: { icon: '🍬', color: '#4ECDC4' },
        obstacle: { icon: '🍫', color: '#795548' },
        ground: { color: '#FFF5F7' },
        grid: { color: '#FFE4EC' }
    },

    // 粒子效果
    particles: {
        type: 'confetti',
        colors: ['#FF6B9D', '#4ECDC4', '#FFD93D', '#6BCB77', '#4D96FF']
    },

    // 背景装饰
    decorations: {
        enabled: true,
        items: [
            { icon: '🍭', position: 'top-left', opacity: 0.1 },
            { icon: '🍬', position: 'top-right', opacity: 0.1 },
            { icon: '🧁', position: 'bottom-left', opacity: 0.1 }
        ]
    },

    // 音效（预留）
    sounds: {
        move: 'pop',
        collect: 'ding',
        success: 'celebration',
        fail: 'bump'
    },

    // 绘制地图单元格
    drawCell(ctx, x, y, size, type, theme = this) {
        const padding = 2;
        const cellSize = size - padding * 2;

        switch (type) {
            case 'start':
                // 起始点 - 粉色圆角方块
                ctx.fillStyle = theme.colors.grid;
                ctx.fillRect(x + padding, y + padding, cellSize, cellSize);
                ctx.fillStyle = theme.map.start.color;
                this.drawRoundRect(ctx, x + 4, y + 4, cellSize - 4, cellSize - 4, 8);
                ctx.fill();
                this.drawEmoji(ctx, theme.map.start.icon, x + size/2, y + size/2, size * 0.5);
                break;

            case 'goal':
                // 目标点 - 紫色圆角方块
                ctx.fillStyle = theme.colors.grid;
                ctx.fillRect(x + padding, y + padding, cellSize, cellSize);
                ctx.fillStyle = theme.map.goal.color;
                this.drawRoundRect(ctx, x + 4, y + 4, cellSize - 4, cellSize - 4, 8);
                ctx.fill();
                this.drawEmoji(ctx, theme.map.goal.icon, x + size/2, y + size/2, size * 0.5);
                break;

            case 'obstacle':
                // 障碍物 - 棕色方块
                ctx.fillStyle = theme.colors.grid;
                ctx.fillRect(x + padding, y + padding, cellSize, cellSize);
                ctx.fillStyle = theme.map.obstacle.color;
                this.drawRoundRect(ctx, x + 6, y + 6, cellSize - 8, cellSize - 8, 6);
                ctx.fill();
                this.drawEmoji(ctx, theme.map.obstacle.icon, x + size/2, y + size/2, size * 0.4);
                break;

            case 'collectable':
                // 收集物 - 青色圆圈
                ctx.fillStyle = theme.colors.grid;
                ctx.fillRect(x + padding, y + padding, cellSize, cellSize);
                ctx.beginPath();
                ctx.arc(x + size/2, y + size/2, cellSize/3, 0, Math.PI * 2);
                ctx.fillStyle = theme.map.collectable.color + '30';
                ctx.fill();
                this.drawEmoji(ctx, theme.map.collectable.icon, x + size/2, y + size/2, size * 0.4);
                break;

            case 'path':
            default:
                // 普通路径
                ctx.fillStyle = theme.colors.grid;
                ctx.fillRect(x + padding, y + padding, cellSize, cellSize);
                break;
        }
    },

    // 绘制圆角矩形
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

    // 绘制emoji
    drawEmoji(ctx, emoji, x, y, size) {
        ctx.font = `${size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, x, y + 2);
    },

    // 绘制角色
    drawCharacter(ctx, x, y, size, character, direction = 0) {
        const centerX = x + size / 2;
        const centerY = y + size / 2;
        const radius = size * 0.35;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(Utils.toRadians(direction));

        // 绘制角色身体（圆形）
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fillStyle = character.color || '#FF6B9D';
        ctx.fill();

        // 绘制边框
        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // 绘制眼睛（简单的两个小点）
        const eyeOffset = radius * 0.3;
        const eyeY = -radius * 0.2;

        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(-eyeOffset, eyeY, radius * 0.15, 0, Math.PI * 2);
        ctx.arc(eyeOffset, eyeY, radius * 0.15, 0, Math.PI * 2);
        ctx.fill();

        // 绘制嘴巴（微笑）
        ctx.beginPath();
        ctx.arc(0, radius * 0.1, radius * 0.25, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    },

    // 应用CSS变量
    applyCSS() {
        const root = document.documentElement;
        Object.entries(this.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    }
};

// 注册主题
window.CandyTheme = CandyTheme;
