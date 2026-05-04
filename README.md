# ROCKTI · 摇滚人格测试

> 24 道题，8 维偏好模型，16 种摇滚人格 — 专属可分享海报。

ROCKTI 是一个**纯前端摇滚人格测试 H5 / Web App**。
通过 24 道场景化的选择题，从 8 个音乐偏好维度匹配你最接近的摇滚类型，并生成可下载的 1080×1350 分享海报。

> ROCKTI 结果基于你的音乐偏好、情绪表达方式和审美选择生成，仅用于娱乐和自我探索，不构成心理诊断或人格评估。

---

## ✨ 特性

- **24 道场景沉浸式题目** — 把"你对 X 的态度"换成有画面的小剧场。
- **8 维评分模型** — 能量唤醒 / 重度失真 / 反叛冲动 / 实验开放 / 结构复杂 / 情绪叙事 / 根源复古 / 舞台社交。
- **16 种摇滚人格** — 经典摇滚到后摇滚，每种都有独立分析、代表乐队和适合场景。
- **加权欧氏距离匹配** — 不是简单计数，而是向量空间中的最近邻。
- **8 维雷达图** — Recharts 可视化你的偏好向量 vs 原型分布。
- **隐藏副人格** — 第一名和第二名距离差 < 8 时触发，混合两种人格。
- **海报导出** — DOM 重绘 + html-to-image，1080×1350 PNG，直接发朋友圈 / 小红书 / 微博。
- **离线友好** — localStorage 自动保存答题进度。
- **Neon Garage 视觉** — 霓虹粉 / 电青 / 安培黄 / 舞台黑，厚黑描边 + 海报感。

---

## 🛠️ 技术栈

- **React 19** + **TypeScript strict** — 类型安全的 UI 层
- **Vite 7** — 闪电构建
- **Tailwind CSS v4** — 原子化样式（用 `@tailwindcss/vite` 插件）
- **Framer Motion** — 进出场 / 选项 / 海报动效
- **Recharts** — 8 维雷达图
- **html-to-image** — DOM → PNG 海报导出
- **qrcode** — 海报二维码

代码全在 `app/` 目录（Vite Root）。

---

## 🚀 本地开发

```bash
cd app
npm install
npm run dev      # 开发：http://localhost:5173
npm run build    # 生产构建（含 tsc -b 严格类型检查）
npm run preview  # 本地预览生产包
npm run lint     # ESLint
```

要求 Node.js 20+。

---

## 📦 部署

### 方案 A · GitHub Pages（推荐，自动部署）

仓库已配 `.github/workflows/deploy.yml`，每次 push 到 `main` 都会自动 build 并部署到 GitHub Pages。

**只需一次启用**：
1. 进入仓库 **Settings → Pages**
2. **Source** 选 **GitHub Actions**

下次 push 之后 workflow 会自动跑，部署完成后访问：

```
https://joker-sxj.github.io/rockti/
```

Workflow 内部用 `--base=/rockti/` 构建，并把 `index.html` 复制成 `404.html` 作为 SPA fallback（避免刷新 404）。

### 方案 B · Vercel

仓库已配 `app/vercel.json`，使用 SPA rewrites。

**只需两步**：
1. 把仓库 import 到 Vercel
2. 在 Project Settings → General → **Root Directory** 设置为 `app`

Vercel 会自动识别 Vite 框架，跑 `npm install && npm run build`，部署 `app/dist`。

---

## 📁 项目结构

```
.
├── app/                          # Vite React 应用（Vercel Root）
│   ├── public/
│   │   └── images/
│   │       ├── Rockti.png        # 主视觉
│   │       └── profiles/         # 16 种人格插画
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/           # PageShell / StickerLayer
│   │   │   ├── ui/               # Button / Card / Badge / ProgressBar
│   │   │   ├── quiz/             # QuestionCard / OptionCard / StageHintModal
│   │   │   └── result/           # ResultHero / DimensionRadar / ShareCard ...
│   │   ├── data/
│   │   │   ├── questions.ts      # 24 道题
│   │   │   ├── profiles.ts       # 16 种人格
│   │   │   └── dimensions.ts     # 8 维定义 + 权重
│   │   ├── hooks/
│   │   │   └── use-rockti.ts     # 全局状态 (useReducer + localStorage)
│   │   ├── lib/
│   │   │   ├── scoring.ts        # 评分算法（可独立单测）
│   │   │   ├── share.ts          # 海报导出
│   │   │   ├── storage.ts        # localStorage 包装
│   │   │   └── utils.ts          # 小工具
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── QuizPage.tsx
│   │   │   └── ResultPage.tsx
│   │   ├── types/rockti.ts       # 全部 TS 类型
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css             # Tailwind v4 @theme + 自定义动画
│   ├── package.json
│   ├── vite.config.ts            # 含 manualChunks 拆包
│   └── vercel.json               # SPA rewrites
├── docs/
│   ├── plans/                    # 设计文档
│   └── spec/                     # 原始 spec
├── image/                        # 原始素材（设计师交付）
├── rockti_开发文档_v_1_0.md       # 完整产品 / UI / 算法 spec
├── AGENT.md                      # 开发流水线
└── README.md                     # 本文档
```

---

## 🎯 评分算法概览

1. **加分** — 每题选项给 1–3 个维度加分（如选项 A 给 EN+2 / ST+1）
2. **标准化** — 用每维度的最大可能分数把 raw 标准化到 0–100
3. **加权欧氏距离** — 用户向量与 16 种原型逐一计算距离，HV/RB/EX/EM 维度权重 1.1
4. **匹配度** — distance → 0–100 区间，最终 clamp 到 [72, 98]（避免太低伤体验、太高假装诊断）
5. **副人格** — 排序后取前三，第一二名距离差 < 8 触发"混合体"

完整算法见 [`app/src/lib/scoring.ts`](app/src/lib/scoring.ts)，纯函数，可独立测试。

---

## 🔒 隐私 / 数据

- **没有后端、没有登录、没有埋点**
- 答题记录和结果只保存在你**本地浏览器** localStorage
- 海报生成完全在浏览器内完成，不上传任何数据
- 二维码内容是 `window.location.origin` — 没有用户身份信息

---

## 📜 License

MIT — 仅用于学习和娱乐。题目、文案、视觉系统的灵感参考网络与社区，无任何商业授权背书。
