/**
 * 小丸子的编程冒险 - 主入口
 */
document.addEventListener('DOMContentLoaded', () => {
    // 初始化游戏
    window.game = new Game();
    window.game.init();

    console.log('🎮 小丸子的编程冒险 已启动！');
    console.log('📝 当前版本: v1.0.0');
    console.log('🎨 主题系统已就绪');
    console.log('🐱 角色系统已就绪');
    console.log('🔊 音效系统已就绪');
    console.log('💬 语音引导已就绪');
});

// 移动端触摸滚动支持
document.addEventListener('touchmove', function(e) {
    // 如果用户在可滚动容器上触摸，让它自然滚动
    const scrollableContainers = [
        '.blocks-container',
        '.code-area',
        '.modal-content',
        '.worlds-container',
        '.editor-sidebar',
        '.worlds-nav'
    ];

    for (const selector of scrollableContainers) {
        const container = e.target.closest(selector);
        if (container) {
            return; // 允许自然滚动
        }
    }
}, { passive: true });

// 窗口大小改变时重新调整
window.addEventListener('resize', () => {
    if (window.game && window.game.stage) {
        window.game.stage.resize();
    }
});

// 第一次用户交互时初始化语音（浏览器安全限制）
let voiceInitialized = false;
const initVoiceOnInteraction = () => {
    if (!voiceInitialized && window.voiceManager && window.speechSynthesis) {
        voiceInitialized = true;
        // 预加载语音列表
        window.speechSynthesis.getVoices();
        console.log('💬 语音系统已激活');
    }
};

document.addEventListener('click', initVoiceOnInteraction, { once: true });
document.addEventListener('touchstart', initVoiceOnInteraction, { once: true });
