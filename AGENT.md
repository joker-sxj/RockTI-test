# AGENT.md — ROCKTI 开发流水

记录关键决策、踩坑与未解决项。每个里程碑后追加一条。

---

## Milestone 1 — 脚手架与数据底座（已完成）

**已完成功能**：
- Vite 7 + React 19 + TypeScript strict 项目脚手架
- Tailwind CSS v4 通过 `@tailwindcss/vite` 集成（不走 PostCSS 路径）
- 8 维评分模型 + DIMENSION_WEIGHTS + DIMENSION_LABELS
- 24 道题题库（其中 9 道偏抽象的题目改写为场景沉浸式，分数映射严格不变）
- 16 种摇滚人格 prototype + 完整文案（分析 / 优势 / 盲区 / 乐队 / 场景）
- 评分算法：raw → 标准化 → 加权欧氏距离 → 匹配度 → 排序 → 副人格判断
- localStorage 持久化（答题进度 + 结果）

**关键决策**：
- 单页状态切换替代 React Router，减少路由复杂度（home / quiz / result 三态）
- `useReducer` 统一管理所有状态，避免 prop drilling
- 题目改写时坚守"分数映射不动"的硬约束 — 否则算法失效
- profile 图片用 URL-encode 处理中文文件名，避免空格 / 中文 URL 编码问题

**已知限制**：
- 评分算法暂未加单元测试（测试目录留空，后续可加 vitest）
- 题库目前是硬编码，未做后台配置化

---

## Milestone 2 — UI 与动效（已完成）

**已完成功能**：
- Neon Garage 视觉系统：霓虹粉 #FF2E88 / 电青 #18D1C2 / 安培黄 #FFD43B / 舞台黑 #111
- 厚黑描边按钮（3px border + 4px 黑色阴影 + active 下沉踏板感）
- 进度条（指板风格 + 8/16/24 题星星节点 + 渐变填充）
- 阶段提示弹窗（舞台灯扫光动画）
- 选项卡片：选中 → 粉色填充 + 黄色闪电图标
- 8 维雷达图（Recharts，对比用户 vs 原型）
- 匹配度数字滚动动画（0 → 最终值，1.4s ease-out）
- 海报组件：1080×1350，含 logo / 主结果 / 插画 / 匹配度 / Top 3 维度 / 二维码 / 免责声明
- 海报导出：html-to-image + pixelRatio 1（避免 Retina 翻倍导致海报变成 2160×2700）
- 首页 16 类型预览网格 + Sticker 漂浮动效

**关键决策**：
- Tailwind v4 用 `@theme` 自定义颜色，而非 `tailwind.config.ts`（v4 推荐方式）
- 自定义关键帧（flicker / float / stage-light）写在 `@theme` 里通过 CSS 变量暴露
- 海报渲染节点用 `position: fixed; left: -12000px` 离屏挂载，避免影响布局也能被 html-to-image 截图
- 海报上的 logo / 插画都加 `crossOrigin="anonymous"`（虽然 same-origin 但保险）
- ShareCard 用 `forwardRef` 暴露 DOM ref 给截图函数

**已知限制**：
- 题目切换的左右滑入用 `AnimatePresence mode="wait"`，瞬间会有空帧 — 在快速点击下可能有视觉断层
- 海报中字体依赖系统字体回退，不同设备看到的字体可能略有差异

---

## Milestone 3 — 构建与部署准备（已完成）

**已完成功能**：
- `npm run build` 通过 tsc strict + vite build 双闸门
- `vite.config.ts` 配 `manualChunks`：react / motion / chart / share 拆包
- 单 chunk 最大 367KB（Recharts，gzip 102KB），index.js 242KB（gzip 79KB）
- `app/vercel.json` 配 SPA rewrites（避免刷新 404）
- 仓库根 `.gitignore` 加 `history.md` / `*.local.md` / `notes.local/`（隐私清单）

**关键决策**：
- Vercel 部署的 Root Directory 让用户在 Project Settings 里指定为 `app`，比仓库根写 fallback vercel.json 更干净
- Git author email 在仓库范围用 GitHub noreply（`<user>@users.noreply.github.com`），不动全局配置
- 没有引入 React Router、状态管理库、UI 组件库 — 三个 page + useReducer + Tailwind 已足够覆盖

**已知限制**：
- 没接入正式 analytics（spec 16 章列出的事件埋点暂未实现，按 MVP 范围延后）
- 没做 PWA / Service Worker（首次加载后离线可用，但安装到桌面需要后续加 manifest）

---

## 隐私保护检查清单（每次 commit 前自审）

- [x] `.gitignore` 已涵盖 node_modules / dist / .env / .vercel / .claude / history.md
- [x] Git author email 用 noreply 邮箱，不出现真实学号 / 工作邮箱
- [x] README / AGENT.md 不含本地绝对路径、真实姓名
- [x] Commit message 描述功能而非环境
- [x] 海报二维码内容只是 `window.location.origin`，无用户身份

---

## 后续可选优化

- 单元测试：用 vitest 覆盖 `lib/scoring.ts` 的关键路径（全选高能 / 全选重型 / 全选实验 等场景验收）
- PWA：加 manifest + service worker，支持加桌
- 题库配置化：把 questions / profiles 抽到 JSON，方便运营改文案不动代码
- 多语言：英文版（spec 第 19 章列为可延后项）
- 分享方式：Web Share API（移动端原生分享面板）
