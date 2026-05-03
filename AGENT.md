# AGENT.md — RockTI-test 项目 Agent 指令

## 项目概述

RockTI 是一个摇滚人格测试 Web App。用户完成 24 道趣味选择题，系统根据 8 个摇滚偏好维度匹配 16 种摇滚人格。

## 技术栈

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- Framer Motion
- Recharts
- React Router DOM

## 目录结构

```
rockti-test/
├── .github/workflows/   # GitHub Actions 部署
├── public/
│   ├── favicon.svg
│   └── images/          # 摇滚类型图片（不提交到 git）
├── src/
│   ├── assets/          # 静态资源
│   ├── data/
│   │   ├── questions.ts # 24 道题库
│   │   └── rockProfiles.ts # 16 种人格数据
│   ├── lib/
│   │   └── scoring.ts   # 评分算法
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── QuizPage.tsx
│   │   └── ResultPage.tsx
│   ├── types/
│   │   └── rockti.ts    # 类型定义
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── AGENT.md             # 本文件
├── SPEC.md              # 项目规格说明
└── package.json
```

## 部署

- GitHub Pages: https://joker-sxj.github.io/RockTI-test/
- 自动部署：push 到 main 分支触发 GitHub Actions

## 开发规范

### 代码风格

- 使用 TypeScript 严格模式
- 组件使用函数式组件 + hooks
- 样式使用 Tailwind CSS，不写自定义 CSS（除非必要）
- 动效使用 Framer Motion
- 所有中文文案由 HTML/CSS 渲染，不写死在图片里

### 提交规范

- 不提交隐私信息（API key、.env、个人数据）
- 不提交 node_modules、dist
- 图片资源在 public/images/ 目录，不提交到 git

### 设计风格

- **Neon Garage / 霓虹车库风**
- 主色：Hot Pink (#FF2E88)、Electric Teal (#18D1C2)、Amp Yellow (#FFD43B)
- 背景：Stage Black (#111111)、Paper White (#FFF9EF)
- 按钮：圆角 24px、3px 黑色粗描边、4px 4px 阴影
- 字体：中文用思源黑体，数字用 Inter

### 协作模式

- mimo：主力编码、架构设计、功能实现
- Qwen：代码审查、设计审查、文案优化、审美把关
- 每个 Chunk：mimo 编码 → Qwen 审查 → mimo 修改 → 通过

## 核心原则

1. **文字不烘焙进图片** — 所有中文由前端渲染
2. **题库和结果配置化** — 数据放 data/ 目录，方便调整
3. **算法独立** — scoring.ts 可独立单元测试
4. **移动端优先** — 主要目标设备：iPhone 12+、常见 Android、微信内置浏览器
5. **科学克制** — 明确说明结果是音乐偏好画像，不是心理诊断
