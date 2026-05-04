# ROCKTI 设计文档（Brainstorm + Pipeline 规划）

**日期**：2026-05-03
**项目**：ROCKTI 摇滚人格测试 H5
**仓库目标**：`github.com/joker-sxj/rockti`（Public）
**部署目标**：Vercel
**状态**：Brainstorm 完成，Pipeline 启动中

---

## 1. 决策摘要

| 维度 | 决策 | 备选与权衡 |
|---|---|---|
| 技术栈 | React 19 + Vite 7 + TS strict + Tailwind v4 + Framer Motion + Recharts + html-to-image + qrcode | 与 spec 推荐一致 |
| 题目风格 | 场景沉浸式，仅改造偏抽象的题目（约 9 道），其余保留 | 全量改造（被否决，工作量大且可能稀释 spec 已有亮点） |
| 题型 | 24 道纯文字单选 | 加图片/排序/歌词题（被否决，开发复杂度上升、性价比低） |
| 部署 | Vercel | Cloudflare Pages（速度更快但配置略复杂）、GitHub Pages（免费但需 Actions） |
| 海报 | DOM 重绘 + html-to-image | Canvas 手绘（工作量翻倍）、跳过（不符需求） |
| 仓库可见性 | Public | Private（部署额度受限） |
| GitHub 推送方式 | SSH key（用户已配置） | PAT（被替代） |

## 2. 项目结构

```
Rockti/                                <- 本地路径 + GitHub repo 根
├── image/                             <- 原始 17 张 PNG（保留）
├── rockti_开发文档_v_1_0.md            <- 原始 spec（保留）
├── rockti_开发文档_v_1_0.docx
├── docs/
│   ├── plans/
│   │   └── 2026-05-03-rockti-design.md  <- 本文档
│   └── spec/                            <- 原 spec 副本（可选）
├── app/                                 <- Vite React 应用（实际部署目标）
│   ├── public/
│   │   └── images/profiles/             <- 复制自 ../../image/
│   ├── src/
│   │   ├── types/rockti.ts
│   │   ├── data/{questions,profiles,dimensions}.ts
│   │   ├── lib/{scoring,share,storage,utils}.ts
│   │   ├── components/{ui,quiz,result,layout}/
│   │   ├── pages/{HomePage,QuizPage,ResultPage}.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts        <- v4 用 @tailwindcss/vite，无需 PostCSS
│   ├── tsconfig.json
│   └── eslint.config.js
├── AGENT.md                       <- 开发流水（每个 chunk 完成后追加）
├── README.md                      <- 用户面向，含部署链接
└── .gitignore
```

**Vercel 部署设置**：Root Directory = `app`。

## 3. 隐私保护规则（已记入长期 memory）

1. `.gitignore` 严格覆盖：`node_modules/`、`dist/`、`.env*`、`.vercel/`、`.claude/`、`.idea/`、`.vscode/local.*`、`*.log`、`.DS_Store`
2. 每次 commit 前 `git status` 自审，可疑文件先暂停问用户
3. Git author email 在仓库范围（不动全局）切到 GitHub noreply 邮箱（用户提供数字 id）
4. 文档/README/AGENT.md 不出现绝对路径、真实姓名、学号邮箱
5. Commit message 不含本地路径或个人识别信息
6. Vercel 部署只走 GitHub OAuth，不接触 token

## 4. Pipeline 9 个 Chunk

| # | 内容 | Qwen 介入 | 硬闸门 |
|---|---|---|---|
| 1 | 脚手架 | ✗ | `npm run build` 通过 |
| 2 | 核心数据 & 评分算法 | ✓ Qwen 独立审查算法 | `npm run build` + 算法单测覆盖关键场景 |
| 3 | 24 道题场景化重写 | ✓ Qwen 写 6 道做风格对照 | 题目维度映射与原 spec 对照表 100% 一致 |
| 4 | 首页 | ✗ | `npm run build` + 移动端目视通过 |
| 5 | 测试页 | ✗ | `npm run build` + 答题流程手工通过 |
| 6 | 结果页 | ✗ | `npm run build` + 雷达图渲染正常 |
| 7 | 分享海报 | ✗ | html-to-image 导出 PNG 实测 |
| 8 | 动效 & 适配 | ✓ Qwen 跨设备测试报告 | DevTools 三档断点目视通过 |
| 9 | 部署 | ✗ | Vercel 公共链接可访问 |

## 5. Pipeline 四阶段对应

按 pipeline 技能定义：

- **异源对抗规划**：本设计文档 + 关键 chunk（2、3、8）调用 Qwen 独立产出，差异点暴露后人工裁决
- **硬闸门机械验证**：每 chunk 后必须通过 `npm run build`、TypeScript 严格检查、关键路径手测
- **软维度交叉 Review**：UI 视觉、文案趣味度、移动端体验由我做主观判断 + Qwen 反向挑刺
- **教训沉淀自注入**：每 chunk 完成后写 AGENT.md，记录踩坑、决策、未解决项

## 6. 题目改造范围（Chunk 3 预判）

**保留或微调（15 道）**：q01、q02、q03、q05、q07、q08、q10、q11、q13、q14、q17、q19、q20、q22、q24

**重写为场景沉浸式（9 道）**：q04、q06、q09、q12、q15、q16、q18、q21、q23（这些题以"你对 X 的态度是？"句式为主，缺乏画面）

**底线**：每道题的 8 维分数映射严格不变，只动文案。重写后会列对照表。

## 7. 风险与缓解

| 风险 | 缓解 |
|---|---|
| Tailwind v4 与 Vite 7 集成踩坑 | 用 `@tailwindcss/vite` 插件（v4 推荐方式） |
| Recharts 在 SSR / 移动端 layout 异常 | 纯客户端渲染（CSR），Vite 默认即可 |
| html-to-image 导出中文字体丢失 | 提前 preload 字体或用 web-safe 中文字体栈 |
| Vercel 部署根目录配置错误 | 部署时显式设 Root Directory = `app` |
| 用户误以为是心理诊断 | 首页底部 + 结果页 + 海报小字三处声明"仅用于音乐偏好探索" |
| 提交时学号邮箱泄露 | 仓库内 git config user.email 切到 noreply 邮箱 |

## 8. 验收标准

- [ ] 公共链接可访问，3G 网络下首屏 < 3s
- [ ] 桌面 1920、平板 1024、手机 375 三档断点目视通过
- [ ] 完成 24 题流程不报错，结果合理
- [ ] 分享海报可导出为 PNG
- [ ] README 含部署链接和娱乐声明
- [ ] git 历史中无本地路径、无 token、无学号邮箱

## 9. 启动信号

设计已确认。Pipeline 进入 chunk 1（脚手架）。
