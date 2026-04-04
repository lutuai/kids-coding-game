# 🎮 小丸子的编程冒险

> 专为4-8岁儿童设计的可视化编程启蒙游戏

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
</p>

<p align="center">
  <a href="https://kid-game.lutuai.space/" target="_blank">🌐 在线试玩</a>
  &nbsp;|&nbsp;
  <a href="#-快速开始">📦 本地运行</a>
  &nbsp;|&nbsp;
  <a href="#-功能特性">✨ 功能特性</a>
</p>

---

## 📖 项目介绍

**小丸子的编程冒险** 是一款专为学龄前儿童设计的编程启蒙教育游戏。通过拖拽积木式的可视化编程方式，让孩子在帮助小丸子回家的冒险中，自然而然地掌握编程思维。

### 🎯 设计理念

- **无文字障碍**：使用直观的图形和箭头，不依赖识字能力
- **即时反馈**：拖拽积木到舞台，角色立即执行动作
- **渐进难度**：30个关卡从简单到复杂，循序渐进
- **趣味主题**：6个精美主题世界，保持新鲜感

---

## ✨ 功能特性

### 🎮 核心玩法
- **可视化编程**：拖拽积木块，像搭积木一样编写程序
- **绝对方向控制**：⬆️⬇️⬅️➡️ 箭头直接对应上下左右，简单直观
- **即时执行模式**：可直接拖拽积木到游戏舞台，立即看到效果
- **程序运行模式**：组合多个积木，点击"开始"一键运行

### 🌍 六大主题世界

| 世界 | 名称 | 关卡 | 教学重点 |
|:---:|:---:|:---:|:---|
| 🍬 | 糖果乐园 | 1-5 | 基础移动、顺序执行 |
| 🚀 | 太空探险 | 6-10 | 循环概念 |
| 🐠 | 海底世界 | 11-15 | 条件判断 |
| 🌲 | 森林奇遇 | 16-20 | 函数/子程序 |
| 🌃 | 霓虹都市 | 21-25 | 变量与优化 |
| 🎋 | 水墨中国 | 26-30 | 综合挑战 |

### 🛠️ 高级功能
- **音效系统**：Web Audio API 生成音效，支持开关
- **语音引导**：中文语音讲解，帮助理解
- **关卡地图**：可视化进度追踪，支持重玩已通关卡
- **创意模式**：内置关卡编辑器，孩子可以自己设计关卡
- **角色解锁**：完成特定关卡解锁新角色

---

## 🚀 快速开始

### 方式一：在线试玩（推荐）

直接访问：👉 [https://kid-game.lutuai.space/](https://kid-game.lutuai.space/)

无需安装，浏览器打开即玩，支持电脑、平板、手机。

### 方式二：本地运行

```bash
# 1. 克隆仓库
git clone https://github.com/lutuai/kids-coding-game.git

# 2. 进入目录
cd kids-coding-game

# 3. 用浏览器打开 index.html
# Windows
start index.html

# Mac
open index.html

# Linux
xdg-open index.html
```

或者使用本地服务器（推荐）：

```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .

# 然后访问 http://localhost:8080
```

---

## 📚 教学大纲

### Level 1-5：基础概念
- 认识方向：上、下、左、右
- 顺序执行：按顺序执行指令
- 路径规划：规划最短路径

### Level 6-10：循环结构
- 重复执行：使用"重复N次"积木
- 模式识别：发现路径中的重复模式
- 代码优化：用循环减少代码量

### Level 11-15：条件判断
- 如果...就...：条件执行指令
- 传感器思维：检测前方是否有路/墙
- 自动避障：编写智能避障程序

### Level 16-20：函数概念
- 制作积木：将常用代码封装成函数
- 重复利用：多次调用同一个函数
- 模块化思维：分解复杂问题

### Level 21-30：综合运用
- 变量概念：可编辑的循环次数
- 算法优化：寻找最优解
- 调试能力：排查程序错误

---

## 🏗️ 项目架构

```
kids-coding-game/
├── index.html              # 入口文件
├── styles/
│   └── main.css           # 样式文件（含6种主题）
├── src/
│   ├── components/        # 核心组件
│   │   ├── Game.js        # 游戏主逻辑
│   │   ├── Stage.js       # 舞台渲染
│   │   ├── BlockPanel.js  # 积木面板
│   │   ├── CodeArea.js    # 编程区
│   │   ├── Character.js   # 角色系统
│   │   ├── LevelMap.js    # 关卡地图
│   │   ├── LevelEditor.js # 关卡编辑器
│   │   ├── AudioManager.js# 音效管理
│   │   └── VoiceManager.js# 语音引导
│   ├── levels/            # 关卡数据
│   │   ├── world1/        # 糖果乐园
│   │   ├── world2/        # 太空探险
│   │   ├── world3/        # 海底世界
│   │   ├── world4/        # 森林奇遇
│   │   ├── world5/        # 霓虹都市
│   │   └── world6/        # 水墨中国
│   ├── themes/            # 主题配置
│   │   ├── candy.js
│   │   ├── space.js
│   │   ├── ocean.js
│   │   ├── forest.js
│   │   ├── neon.js
│   │   └── ink.js
│   ├── characters/        # 角色数据
│   └── utils/             # 工具函数
└── README.md
```

---

## 🎯 技术亮点

- **纯原生实现**：无第三方依赖，单HTML文件可直接运行
- **组件化架构**：模块清晰，易于扩展新功能
- **响应式设计**：适配各种屏幕尺寸（电脑/平板/手机）
- **LocalStorage 存档**：自动保存进度和自定义关卡
- **Web Audio API**：程序化生成音效，无需音频文件
- **Web Speech API**：中文语音合成，引导学习

---

## 📋 后续计划

以下功能正在规划中，欢迎贡献代码或提出建议：

- [ ] **导出/导入进度** - 进度文件分享与导入
- [ ] **云端同步** - 多设备进度同步（基于 Firebase）
- [ ] **成就系统** - 解锁成就和徽章
- [ ] **排行榜** - 社区排名挑战
- [ ] **多人模式** - 协作或对战模式

---

## 🤝 贡献指南

欢迎提交 Issue 和 PR！

### 添加新关卡

在 `src/levels/worldX/` 目录下添加新的关卡文件：

```javascript
// 关卡数据格式
{
  id: 编号,
  name: '关卡名称',
  width: 网格宽度,
  height: 网格高度,
  start: { x: 起点X, y: 起点Y },
  goal: { x: 终点X, y: 终点Y },
  map: [ // 地图网格
    ['start', 'path', 'obstacle', 'goal'],
    ...
  ],
  items: [ // 收集物
    { x: 0, y: 0, type: 'star', collected: false }
  ],
  hint: '提示信息',
  maxBlocks: 最大积木数,
  targetBlocks: 目标积木数（3星标准）
}
```

### 添加新主题

在 `src/themes/` 目录下创建新的主题文件，参考现有主题格式。

---

## 📜 开源协议

[MIT License](LICENSE) © 2024 lutuai

---

## 💖 致谢

献给所有热爱学习和探索的小朋友们！

特别感谢小丸子小朋友的灵感支持 🎉

---

<p align="center">
  如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！
</p>
