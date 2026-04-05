/**
 * 游戏主逻辑
 * 协调所有组件，处理游戏流程
 */
class Game {
    constructor() {
        this.stage = null;
        this.blockPanel = null;
        this.codeArea = null;
        this.characterSystem = null;
        this.isRunning = false;
        this.runSpeed = 500; // 毫秒/步
        this.currentLevel = 1;
        this.totalLevels = 30;
    }

    /**
     * 初始化游戏
     */
    init() {
        // 初始化关卡管理器
        LevelManager.init();
        this.currentLevel = LevelManager.currentLevel;

        // 初始化主题管理器
        themeManager.init();

        // 初始化音效管理器
        if (window.audioManager) {
            window.audioManager.init();
        }

        // 初始化语音管理器
        if (window.voiceManager) {
            window.voiceManager.init();
        }

        // 初始化组件
        this.stage = new Stage('game-canvas');
        this.blockPanel = new BlockPanel('blocks-container');
        this.codeArea = new CodeArea('code-area');
        this.characterSystem = new CharacterSystem(this.stage.canvas);

        this.blockPanel.init(this.currentLevel);
        this.codeArea.init();
        this.characterSystem.bindEvents();

        // 加载关卡
        this.loadLevel(this.currentLevel);

        // 绑定事件
        this.bindEvents();

        // 绑定舞台拖放事件（直接拖拽执行）
        this.bindStageDragDrop();

        // 更新UI
        this.updateUI();

        // 添加音效控制
        this.addAudioControls();

        // 初始化关卡地图
        if (window.LevelMap) {
            window.levelMap = new LevelMap();
            window.levelMap.init();
        }

        // 初始化关卡编辑器
        if (window.LevelEditor) {
            window.levelEditor = new LevelEditor();
        }

        console.log('游戏初始化完成');
    }

    /**
     * 加载关卡
     * @param {number} levelNum 关卡号
     */
    loadLevel(levelNum) {
        const levelData = LevelManager.getLevel(levelNum);
        if (!levelData) {
            console.error(`关卡 ${levelNum} 不存在`);
            return;
        }

        this.currentLevel = levelNum;
        LevelManager.setCurrentLevel(levelNum);

        // 初始化舞台
        this.stage.init(levelData);
        this.stage.characterSystem = this.characterSystem;

        // 更新积木面板
        this.blockPanel.setLevel(levelNum);

        // 清空编程区
        this.codeArea.clear();
        this.codeArea.reset();

        // 更新角色选择
        this.characterSystem.renderCharacterSelector(levelNum);

        // 更新UI
        this.updateUI();

        // 显示提示
        if (levelData.hint) {
            console.log(`关卡 ${levelNum} 提示: ${levelData.hint}`);
        }

        // 播放关卡语音引导
        if (window.voiceManager) {
            window.voiceManager.levelStart(levelNum);
        }
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 开始按钮
        const playBtn = document.getElementById('btn-play');
        if (playBtn) {
            playBtn.addEventListener('click', () => this.runCode());
        }

        // 速度控制
        document.querySelectorAll('.btn-speed').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.btn-speed').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const speed = e.target.dataset.speed;
                this.runSpeed = speed === 'fast' ? 200 : 800;
            });
        });

        // 默认选择慢速
        const slowBtn = document.querySelector('[data-speed="slow"]');
        if (slowBtn) slowBtn.classList.add('active');

        // 下一关按钮
        const nextBtn = document.getElementById('btn-next-level');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.closeModal('level-complete-modal');
                this.loadLevel(this.currentLevel + 1);
            });
        }

        // 再玩一次按钮
        const replayBtn = document.getElementById('btn-replay');
        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                this.closeModal('level-complete-modal');
                this.resetLevel();
            });
        }

        // 设置按钮 - 显示角色选择
        const settingsBtn = document.getElementById('btn-settings');
        const charModal = document.getElementById('character-modal');
        if (settingsBtn && charModal) {
            settingsBtn.addEventListener('click', () => {
                this.characterSystem.renderCharacterSelector(this.currentLevel);
                charModal.classList.add('active');
            });
        }

        // 点击logo重置当前关卡
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', () => this.resetLevel());
        }

        // 地图按钮
        const mapBtn = document.getElementById('btn-map');
        if (mapBtn) {
            mapBtn.addEventListener('click', () => {
                if (window.levelMap) {
                    window.levelMap.show();
                }
            });
        }

        // 编辑器按钮（添加在设置按钮旁边）
        if (settingsBtn) {
            const editorBtn = document.createElement('button');
            editorBtn.className = 'btn-create-level';
            editorBtn.id = 'btn-create-level';
            editorBtn.title = '创意模式';
            editorBtn.textContent = '🎨';
            editorBtn.style.cssText = `
                width: 40px;
                height: 40px;
                border: none;
                background: linear-gradient(135deg, #9C27B0, #E91E63);
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
                transition: transform 0.2s;
                margin-left: 8px;
            `;

            editorBtn.addEventListener('click', () => {
                if (window.levelEditor) {
                    window.levelEditor.show();
                }
            });

            editorBtn.addEventListener('mouseenter', () => {
                editorBtn.style.transform = 'scale(1.1)';
            });

            editorBtn.addEventListener('mouseleave', () => {
                editorBtn.style.transform = 'scale(1)';
            });

            settingsBtn.parentNode.insertBefore(editorBtn, settingsBtn.nextSibling);
        }
    }

    /**
     * 添加音效控制按钮
     */
    addAudioControls() {
        const headerActions = document.querySelector('.header-actions');
        if (!headerActions || !window.audioManager) return;

        // 创建音效开关按钮
        const audioBtn = document.createElement('button');
        audioBtn.className = 'btn-audio';
        audioBtn.id = 'btn-audio';
        audioBtn.title = window.audioManager.enabled ? '关闭音效' : '开启音效';
        audioBtn.textContent = window.audioManager.enabled ? '🔊' : '🔇';
        audioBtn.style.cssText = `
            width: 40px;
            height: 40px;
            border: none;
            background: var(--background);
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            transition: transform 0.2s, background 0.2s;
        `;

        audioBtn.addEventListener('click', () => {
            const enabled = window.audioManager.toggle();
            audioBtn.textContent = enabled ? '🔊' : '🔇';
            audioBtn.title = enabled ? '关闭音效' : '开启音效';
        });

        // 创建语音开关按钮
        const voiceBtn = document.createElement('button');
        voiceBtn.className = 'btn-voice';
        voiceBtn.id = 'btn-voice';
        voiceBtn.title = window.voiceManager?.enabled ? '关闭语音' : '开启语音';
        voiceBtn.textContent = window.voiceManager?.enabled ? '💬' : '🚫';
        voiceBtn.style.cssText = `
            width: 40px;
            height: 40px;
            border: none;
            background: var(--background);
            border-radius: 50%;
            font-size: 18px;
            cursor: pointer;
            transition: transform 0.2s, background 0.2s;
        `;

        voiceBtn.addEventListener('click', () => {
            const enabled = window.voiceManager.toggle();
            voiceBtn.textContent = enabled ? '💬' : '🚫';
            voiceBtn.title = enabled ? '关闭语音' : '开启语音';
        });

        // 插入到设置按钮之前
        const settingsBtn = document.getElementById('btn-settings');
        if (settingsBtn) {
            headerActions.insertBefore(audioBtn, settingsBtn);
            headerActions.insertBefore(voiceBtn, settingsBtn);
        } else {
            headerActions.appendChild(audioBtn);
            headerActions.appendChild(voiceBtn);
        }
    }

    /**
     * 运行代码
     */
    async runCode() {
        if (this.isRunning) return;

        if (!this.codeArea.hasCode()) {
            // 移动端友好的提示
            const codeArea = document.getElementById('code-area');
            if (codeArea) {
                codeArea.style.borderColor = '#FF6B9D';
                codeArea.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    codeArea.style.borderColor = '';
                    codeArea.style.animation = '';
                }, 1000);
            }
            // 添加临时提示
            const hint = document.createElement('div');
            hint.className = 'mobile-hint';
            hint.textContent = '请先添加积木~';
            hint.style.cssText = `
                position: fixed;
                bottom: 120px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 12px 24px;
                border-radius: 30px;
                font-size: 14px;
                z-index: 9999;
                animation: fadeInOut 2s ease forwards;
            `;
            document.body.appendChild(hint);
            setTimeout(() => hint.remove(), 2000);

            // 音效提示
            if (window.audioManager) window.audioManager.play('error');
            return;
        }

        this.isRunning = true;
        const playBtn = document.getElementById('btn-play');
        if (playBtn) {
            playBtn.disabled = true;
            playBtn.textContent = '⏸️ 运行中';
        }

        // 重置舞台
        this.stage.reset();
        this.codeArea.reset();

        // 获取代码并展开循环
        const rawCode = this.codeArea.getCode();
        const code = this.expandLoops(rawCode);

        let success = true;
        let reachedGoal = false;

        // 执行代码
        let i = 0;
        while (i < code.length) {
            if (!this.isRunning) break;

            const block = code[i];

            // 高亮当前执行的积木（映射回原始代码索引）
            const originalIndex = block.originalIndex;
            this.codeArea.setRunningIndex(originalIndex);

            // 检查是否是条件指令
            if (block.blockId.startsWith('if_')) {
                const conditionMet = this.checkCondition(block.blockId);

                if (conditionMet) {
                    // 条件成立，执行下一条指令
                    i++;
                    if (i < code.length) {
                        const nextBlock = code[i];
                        this.codeArea.setRunningIndex(nextBlock.originalIndex);
                        const result = await this.executeBlock(nextBlock);

                        if (!result.success) {
                            success = false;
                            if (window.audioManager) window.audioManager.play('fail');
                            if (window.voiceManager) window.voiceManager.encourage();
                            await this.stage.playFailEffect();
                            break;
                        }
                    }
                }
                // 条件不成立，跳过下一条指令
                i++;
            } else {
                // 普通指令，直接执行
                const result = await this.executeBlock(block);

                if (!result.success) {
                    success = false;
                    if (window.audioManager) window.audioManager.play('fail');
                    if (window.voiceManager) window.voiceManager.encourage();
                    await this.stage.playFailEffect();
                    break;
                }

                i++;
            }

            // 检查是否到达终点
            const char = this.characterSystem;
            if (this.stage.isAtGoal(char.position.gridX, char.position.gridY)) {
                reachedGoal = true;
                break;
            }
        }

        // 检查结果
        if (success && this.isRunning) {
            if (reachedGoal) {
                await this.levelComplete();
            } else {
                // 没到终点
                if (window.voiceManager) window.voiceManager.hint('notGoal');
            }
        }

        // 恢复状态
        this.isRunning = false;
        this.codeArea.setRunningIndex(-1);
        if (playBtn) {
            playBtn.disabled = false;
            playBtn.textContent = '▶️ 开始';
        }
    }

    /**
     * 检查条件是否成立
     * @param {string} blockId 条件积木ID
     * @returns {boolean} 条件是否成立
     */
    checkCondition(blockId) {
        const char = this.characterSystem;

        // 计算前方位置
        const dx = Math.round(Math.cos(Utils.toRadians(char.direction)));
        const dy = Math.round(Math.sin(Utils.toRadians(char.direction)));
        const frontX = char.position.gridX + dx;
        const frontY = char.position.gridY + dy;

        switch (blockId) {
            case 'if_wall':
                // 检查前方是否有墙（不能移动）
                return !this.stage.canMoveTo(frontX, frontY);

            case 'if_path':
                // 检查前方是否有路（可以移动）
                return this.stage.canMoveTo(frontX, frontY);

            default:
                return false;
        }
    }

    /**
     * 展开循环代码
     * 将 "重复N次" 和其后的积木展开为平铺指令
     * @param {Array} code 原始代码
     * @returns {Array} 展开后的代码
     */
    expandLoops(code) {
        const expanded = [];

        for (let i = 0; i < code.length; i++) {
            const block = code[i];

            // 检查是否是循环指令
            if (block.blockId.startsWith('repeat')) {
                // 支持可编辑的重复次数（repeatN）
                let repeatCount = block.params?.count || 2;
                if (block.blockId === 'repeatN' && block.currentValue) {
                    repeatCount = parseInt(block.currentValue) || 3;
                }

                // 获取循环体内的积木（接下来的积木，直到下一个循环或结束）
                const loopBody = [];
                let j = i + 1;

                // 收集循环体内的积木
                while (j < code.length) {
                    const nextBlock = code[j];
                    // 如果遇到另一个循环，停止当前循环体的收集
                    if (nextBlock.blockId.startsWith('repeat')) {
                        break;
                    }
                    loopBody.push({ ...nextBlock, originalIndex: j });

                    // 如果是条件积木，额外包含它后面的一个积木作为条件体
                    if (nextBlock.blockId.startsWith('if_')) {
                        j++;
                        if (j < code.length) {
                            const ifBodyBlock = code[j];
                            loopBody.push({ ...ifBodyBlock, originalIndex: j });
                        }
                    }
                    j++;
                }

                // 如果没有循环体，跳过这个循环
                if (loopBody.length === 0) {
                    continue;
                }

                // 展开循环：重复N次循环体
                for (let r = 0; r < repeatCount; r++) {
                    expanded.push(...loopBody);
                }

                // 跳过已处理的循环体
                i = j - 1;
            } else {
                // 普通指令，直接添加
                expanded.push({ ...block, originalIndex: i });
            }
        }

        return expanded;
    }

    /**
     * 执行单个积木
     * @param {Object} block 积木数据
     * @param {number} depth 调用深度（防止无限递归）
     */
    async executeBlock(block, depth = 0) {
        if (depth > 10) {
            console.error('函数调用嵌套太深');
            return { success: false, reason: '函数嵌套太深' };
        }

        const char = this.characterSystem;
        const speed = this.runSpeed;

        switch (block.blockId) {
            case 'up':
                if (window.audioManager) window.audioManager.play('move');
                return await this.moveAbsolute(0, -1, speed);

            case 'down':
                if (window.audioManager) window.audioManager.play('move');
                return await this.moveAbsolute(0, 1, speed);

            case 'left':
                if (window.audioManager) window.audioManager.play('move');
                return await this.moveAbsolute(-1, 0, speed);

            case 'right':
                if (window.audioManager) window.audioManager.play('move');
                return await this.moveAbsolute(1, 0, speed);

            case 'jump':
                if (window.audioManager) window.audioManager.play('jump');
                return await this.jumpForward(char, speed);

            default:
                // 检查是否是函数调用
                if (block.blockId.startsWith('func_')) {
                    return await this.executeFunction(block, depth + 1);
                }
                console.warn('未知指令:', block.blockId);
                return { success: true };
        }
    }

    /**
     * 执行函数
     * @param {Object} block 函数积木
     * @param {number} depth 调用深度
     */
    async executeFunction(block, depth) {
        const definition = block.definition || [];

        for (const action of definition) {
            const result = await this.executeBlock(
                { blockId: action, originalIndex: block.originalIndex },
                depth
            );
            if (!result.success) {
                return result;
            }
        }

        return { success: true };
    }

    /**
     * 向前移动
     * @param {CharacterSystem} char 角色
     * @param {number} speed 速度
     */
    async moveForward(char, speed) {
        const dx = Math.round(Math.cos(Utils.toRadians(char.direction)));
        const dy = Math.round(Math.sin(Utils.toRadians(char.direction)));

        const newX = char.position.gridX + dx;
        const newY = char.position.gridY + dy;

        if (!this.stage.canMoveTo(newX, newY)) {
            return { success: false, reason: '撞墙了' };
        }

        await char.moveTo(newX, newY, speed);
        this.checkCollection();
        return { success: true };
    }

    /**
     * 绝对方向移动
     * @param {number} dx X方向移动 (-1, 0, 1)
     * @param {number} dy Y方向移动 (-1, 0, 1)
     * @param {number} speed 速度
     */
    async moveAbsolute(dx, dy, speed) {
        const char = this.characterSystem;
        const newX = char.position.gridX + dx;
        const newY = char.position.gridY + dy;

        if (!this.stage.canMoveTo(newX, newY)) {
            return { success: false, reason: '撞墙了' };
        }

        // 根据移动方向调整角色朝向（视觉反馈）
        let targetDirection = char.direction;
        if (dx === 1) targetDirection = 0;      // 向右
        else if (dy === 1) targetDirection = 90; // 向下
        else if (dx === -1) targetDirection = 180; // 向左
        else if (dy === -1) targetDirection = 270; // 向上
        char.setDirection(targetDirection);

        await char.moveTo(newX, newY, speed);
        this.checkCollection();
        return { success: true };
    }

    /**
     * 向前跳跃（跳过一格）
     * @param {CharacterSystem} char 角色
     * @param {number} speed 速度
     */
    async jumpForward(char, speed) {
        const dx = Math.round(Math.cos(Utils.toRadians(char.direction)));
        const dy = Math.round(Math.sin(Utils.toRadians(char.direction)));

        const jumpX = char.position.gridX + dx * 2;
        const jumpY = char.position.gridY + dy * 2;

        // 检查落点是否有效
        if (!this.stage.canMoveTo(jumpX, jumpY)) {
            return { success: false, reason: '跳不过去' };
        }

        // 先执行跳跃动画，再移动位置
        await char.jump(speed);
        await char.moveTo(jumpX, jumpY, speed / 2);
        this.checkCollection();
        return { success: true };
    }

    /**
     * 检查收集物品
     */
    checkCollection() {
        const char = this.characterSystem;
        const item = this.stage.collectItem(char.position.gridX, char.position.gridY);
        if (item) {
            Utils.playSound('collect');
            // 播放收集音效
            if (window.audioManager) window.audioManager.play('collect');
            // 播放收集语音（偶尔）
            if (window.voiceManager) window.voiceManager.collect();
            // 可以添加收集特效
        }
    }

    /**
     * 关卡完成
     */
    async levelComplete() {
        await this.stage.playWinEffect();

        // 播放胜利音效
        if (window.audioManager) window.audioManager.play('win');

        // 计算星星
        const codeLength = this.codeArea.getLength();
        const levelData = LevelManager.getLevel(this.currentLevel);
        let stars = 1;

        if (codeLength <= levelData.targetBlocks) {
            stars = 3;
        } else if (codeLength <= levelData.maxBlocks) {
            stars = 2;
        }

        // 保存进度
        LevelManager.completeLevel(this.currentLevel, stars);

        // 检查是否解锁新角色
        if (levelData.unlocksCharacter) {
            this.showUnlockNotification(levelData.unlocksCharacter);
            // 播放解锁音效
            if (window.audioManager) window.audioManager.play('unlock');
            // 播放解锁语音
            if (window.voiceManager) window.voiceManager.unlock();
        }

        // 更新星星显示
        this.updateUI();

        // 播放语音鼓励
        if (window.voiceManager) window.voiceManager.success();

        // 显示完成弹窗
        this.showLevelComplete(stars);
    }

    /**
     * 显示解锁通知
     * @param {string} characterId 角色ID
     */
    showUnlockNotification(characterId) {
        const char = Characters.getById(characterId);
        if (!char) return;

        // 创建解锁提示
        const notification = document.createElement('div');
        notification.className = 'unlock-notification';
        notification.innerHTML = `
            <div class="unlock-content">
                <div class="unlock-avatar">${char.avatar}</div>
                <div class="unlock-text">
                    <h3>解锁新角色！</h3>
                    <p>${char.name}</p>
                </div>
            </div>
        `;

        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            padding: 16px 24px;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideInRight 0.5s ease;
        `;

        document.body.appendChild(notification);

        // 3秒后移除
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    /**
     * 显示关卡完成弹窗
     * @param {number} stars 星星数
     */
    showLevelComplete(stars) {
        const modal = document.getElementById('level-complete-modal');
        const starRating = document.getElementById('star-rating');

        if (starRating) {
            starRating.textContent = '⭐'.repeat(stars);
        }

        if (modal) {
            modal.classList.add('active');
        }

        // 播放音效（预留）
        Utils.playSound('win');
    }

    /**
     * 关闭弹窗
     * @param {string} modalId 弹窗ID
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    /**
     * 重置当前关卡
     */
    resetLevel() {
        this.isRunning = false;
        this.stage.reset();
        this.codeArea.reset();

        const playBtn = document.getElementById('btn-play');
        if (playBtn) {
            playBtn.disabled = false;
            playBtn.textContent = '▶️ 开始';
        }
    }

    /**
     * 绑定舞台拖放事件
     * 允许直接拖拽积木到舞台执行
     */
    bindStageDragDrop() {
        this.stage.bindDragDrop(async (block) => {
            // 如果正在运行代码，忽略直接拖拽
            if (this.isRunning) return;

            // 播放音效
            if (window.audioManager) window.audioManager.play('click');

            // 执行单个动作
            await this.executeDirectAction(block);
        });

        // 首次显示提示（只显示一次）
        if (!Utils.load('drop_hint_shown', false)) {
            setTimeout(() => {
                this.stage.showDropHint();
                Utils.save('drop_hint_shown', true);
            }, 2000);
        }
    }

    /**
     * 直接执行单个动作（拖放触发）
     * @param {Object} block 积木数据
     */
    async executeDirectAction(block) {
        const char = this.characterSystem;

        // 执行动作（绝对方向）
        switch (block.id) {
            case 'up':
                if (window.audioManager) window.audioManager.play('move');
                await this.moveAbsolute(0, -1, 300);
                break;
            case 'down':
                if (window.audioManager) window.audioManager.play('move');
                await this.moveAbsolute(0, 1, 300);
                break;
            case 'left':
                if (window.audioManager) window.audioManager.play('move');
                await this.moveAbsolute(-1, 0, 300);
                break;
            case 'right':
                if (window.audioManager) window.audioManager.play('move');
                await this.moveAbsolute(1, 0, 300);
                break;
            case 'jump':
                if (window.audioManager) window.audioManager.play('jump');
                await this.jumpForward(char, 300);
                break;
        }

        // 检查收集
        this.checkCollection();

        // 检查是否到达终点
        const pos = char.position;
        if (this.stage.isAtGoal(pos.gridX, pos.gridY)) {
            await this.levelComplete();
        }
    }

    /**
     * 更新UI
     */
    updateUI() {
        // 更新关卡号
        const levelEl = document.getElementById('current-level');
        if (levelEl) {
            levelEl.textContent = this.currentLevel;
        }

        // 更新星星数
        const starEl = document.getElementById('star-count');
        if (starEl) {
            starEl.textContent = LevelManager.getTotalStars();
        }

        // 更新进度条
        const progressEl = document.getElementById('progress-fill');
        if (progressEl) {
            const progress = (this.currentLevel / this.totalLevels) * 100;
            progressEl.style.width = `${progress}%`;
        }
    }
}

// 全局暴露
window.Game = Game;
