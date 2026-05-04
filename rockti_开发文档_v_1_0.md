# ROCKTI 开发文档 v1.0

## 0. 文档信息

| 项目 | 内容 |
|---|---|
| 产品名称 | ROCKTI |
| 产品类型 | 音乐偏好 / 摇滚人格测试 H5 / Web App |
| 核心玩法 | 用户完成 24 道趣味选择题，系统根据 8 个摇滚偏好维度匹配 16 种摇滚人格 |
| 推荐技术形态 | 纯前端 Web 应用，移动端优先 |
| 推荐技术栈 | React + Vite + TypeScript + Tailwind CSS + Framer Motion + Recharts |
| 是否需要后端 | MVP 阶段不需要 |
| 是否需要登录 | MVP 阶段不需要 |
| 目标上线版本 | MVP v1.0 |
| 文档目标 | 可直接供产品、UI、前端、测试、内容运营使用 |

---

# 1. 产品概述

## 1.1 产品一句话

**ROCKTI 是一个通过 24 道趣味问题，测出用户所属摇滚人格的音乐偏好测试。**

## 1.2 产品定位

ROCKTI 不是严肃心理诊断，也不是 MBTI 的摇滚版复制品，而是一个基于以下偏好的音乐人格画像：

1. 声音能量偏好
2. 音色重度偏好
3. 反叛 / 主流态度
4. 实验开放程度
5. 编曲复杂度偏好
6. 情绪叙事偏好
7. 根源复古偏好
8. 舞台社交偏好

最终输出一个有趣、可分享、视觉强烈的“摇滚人格”。

## 1.3 产品核心卖点

| 卖点 | 说明 |
|---|---|
| 有趣 | 题目像在选择自己的舞台、装备、歌词、现场反应 |
| 准确 | 用 8 维偏好向量匹配 16 种摇滚类型，而不是简单计数 |
| 科学克制 | 明确说明结果是音乐偏好画像，不是心理诊断 |
| 可传播 | 结果页生成视觉强烈的分享海报 |
| 可扩展 | 后续可加入歌单、乐队推荐、朋友匹配、城市摇滚地图 |

## 1.4 科学边界说明

产品中必须出现以下提示：

> ROCKTI 结果基于你的音乐偏好、情绪表达方式和审美选择生成，仅用于娱乐和自我探索，不构成心理诊断或人格评估。

建议位置：

- 首页底部
- 结果页底部
- 分享卡小字

---

# 2. 用户流程

## 2.1 主流程

```text
进入首页
  ↓
点击「开始测试」
  ↓
完成 24 道单选题
  ↓
系统计算 8 维偏好得分
  ↓
匹配 16 种摇滚人格原型
  ↓
展示结果页
  ↓
生成分享图 / 重新测试 / 查看隐藏副人格
```

## 2.2 页面结构

```text
ROCKTI
├── 首页 Home
│   ├── Logo
│   ├── 主标语
│   ├── 测试说明
│   ├── 开始测试按钮
│   └── 16 种摇滚类型预览
│
├── 测试页 Quiz
│   ├── 进度条
│   ├── 当前题号
│   ├── 题目文本
│   ├── 4 个选项
│   ├── 上一题 / 下一题
│   └── 提交按钮
│
├── 结果页 Result
│   ├── 主人格名称
│   ├── 摇滚类型
│   ├── 匹配度
│   ├── 一句话描述
│   ├── 主视觉插画
│   ├── 8 维雷达图
│   ├── 详细分析
│   ├── 代表乐队
│   ├── 适合场景
│   ├── 隐藏副人格
│   ├── 分享结果
│   └── 重新测试
│
└── 分享卡 Share Card
    ├── ROCKTI Logo
    ├── 用户结果
    ├── 匹配度
    ├── 核心维度
    ├── 结果插画
    └── 测试入口二维码 / URL
```

---

# 3. 信息架构

## 3.1 首页内容

### 首屏标题

```text
ROCKTI
24 道题，测出你的摇滚人格
```

### 副标题

```text
你是舞台中央的经典摇滚，还是低头调效果器的盯鞋灵魂？
通过声音、情绪、态度和舞台选择，找到你的专属摇滚类型。
```

### 主按钮

```text
开始测试
```

### 辅助信息

```text
约 3–5 分钟完成｜16 种摇滚人格｜生成专属结果海报
```

### 底部提示

```text
本测试仅用于音乐偏好探索与娱乐，不构成心理诊断。
```

## 3.2 测试页内容

### 页面元素

| 元素 | 说明 |
|---|---|
| 进度条 | 例如 7 / 24 |
| 题号 | 问题 07 / 24 |
| 题目 | 当前题目 |
| 选项 | 4 个选项，单选 |
| 上一题 | 可返回修改答案 |
| 下一题 | 选中后才可点击 |
| 阶段提示 | 第 8、16、24 题之后出现 |

### 阶段提示文案

| 节点 | 文案 |
|---|---|
| 完成第 8 题 | 音箱预热完成，失真开始加载 |
| 完成第 16 题 | 你的摇滚轮廓正在成型 |
| 完成第 24 题 | 准备生成你的摇滚人格 |

## 3.3 结果页内容

结果页应包含：

1. 主类型
2. ROCKTI 人格名
3. 匹配度
4. 一句话暴击
5. 结果插画
6. 8 维雷达图
7. 详细分析
8. 你的优势
9. 可能盲区
10. 代表乐队
11. 推荐听歌场景
12. 隐藏副人格
13. 分享按钮
14. 重新测试按钮

---

# 4. UI 视觉规范

## 4.1 总体风格

风格名称：**Neon Garage / 霓虹车库风**

关键词：

- 摇滚
- 霓虹
- 贴纸
- 手绘简笔
- 海报感
- 厚黑描边
- 舞台灯
- 失真
- 车库乐队
- 青年文化

## 4.2 色彩规范

### 主色

| 名称 | HEX | 用途 |
|---|---|---|
| Hot Pink | `#FF2E88` | Logo、按钮、进度条高亮 |
| Electric Teal | `#18D1C2` | 辅助高亮、图标、卡片描边 |
| Amp Yellow | `#FFD43B` | 星星、闪电、提示标签 |
| Stage Black | `#111111` | 背景、文字、主轮廓 |
| Paper White | `#FFF9EF` | 背景、卡片底色 |
| Purple Haze | `#8B5CF6` | 迷幻、前卫、后摇氛围 |
| Danger Red | `#F43F3F` | 金属、朋克、高能警示 |
| Denim Blue | `#2563EB` | 英伦、独立、后摇辅助色 |

### 推荐背景

- 首页：深色舞台黑 + 霓虹贴纸
- 测试页：浅色纸张背景 + 彩色边框
- 结果页：根据结果类型切换主题色
- 分享图：高饱和海报风

## 4.3 字体建议

| 场景 | 字体建议 |
|---|---|
| Logo | 自定义手绘字 / 粗斜体 / Graffiti 风 |
| 中文标题 | 思源黑体 Heavy / 阿里妈妈方圆体 / 站酷快乐体 |
| 正文 | 思源黑体 / HarmonyOS Sans |
| 数字 | Inter / DIN Condensed |

## 4.4 UI 元素风格

### 按钮

- 圆角：24px
- 边框：3px 黑色粗描边
- 阴影：4px 4px 0px `#111111`
- Hover：按钮轻微上浮，阴影变大
- Active：按钮下沉，模拟踩效果器踏板

### 选项卡片

- 背景：浅米白 `#FFF9EF`
- 边框：2–3px 黑色
- 选中：Hot Pink 背景 + 白字 + 闪电小图标
- Hover：边框变 Electric Teal
- 卡片左侧可加 A/B/C/D 标签

### 进度条

推荐视觉：吉他指板 / 音量条。

- 背景：灰色轨道
- 当前进度：Hot Pink → Electric Teal 渐变
- 节点：第 8、16、24 题用星星标记

---

# 5. 8 维评分模型

## 5.1 维度定义

| 代码 | 中文名 | 定义 | 高分表现 |
|---|---|---|---|
| EN | 能量唤醒 | 用户对高能量、高速度、高刺激音乐的偏好 | 喜欢快、炸、跳、冲、现场爆发 |
| HV | 重度失真 | 用户对重音色、低频、失真、噪音、压迫感的接受度 | 喜欢金属、硬摇、粗粝音墙 |
| RB | 反叛冲动 | 用户对反主流、反权威、直接表达的偏好 | 喜欢朋克、另类、后朋克态度 |
| EX | 实验开放 | 用户对怪异、迷幻、抽象、陌生声音的接受度 | 喜欢迷幻、前卫、盯鞋、后摇 |
| CX | 结构复杂 | 用户对复杂编曲、奇拍、长结构、技术性的兴趣 | 喜欢前卫、数学、后摇、复杂概念 |
| EM | 情绪叙事 | 用户对歌词、情绪、脆弱、故事表达的偏好 | 喜欢民谣、grunge、emo、后摇 |
| RT | 根源复古 | 用户对经典、蓝调、木吉他、公路、根源风格的偏好 | 喜欢经典摇滚、布鲁斯、民谣、英伦 |
| ST | 舞台社交 | 用户对合唱、互动、群体氛围、舞台人格的偏好 | 喜欢硬摇、流行朋克、英伦、经典 |

## 5.2 维度权重

```ts
export const DIMENSION_WEIGHTS = {
  EN: 1.0,
  HV: 1.1,
  RB: 1.1,
  EX: 1.1,
  CX: 1.0,
  EM: 1.1,
  RT: 0.9,
  ST: 0.9,
} as const;
```

说明：

- HV、RB、EX、EM 权重略高，因为它们对摇滚类型区分度更强。
- RT、ST 权重略低，避免经典、英伦、流行朋克过度吸收用户。

---

# 6. 16 种 ROCKTI 人格原型

## 6.1 类型总表

| ID | 摇滚类型 | ROCKTI 人格名 | 一句话 |
|---|---|---|---|
| classic | 经典摇滚 | 复古舞台王 | 你的人生需要一个复古麦克风和一段漂亮 riff。 |
| hard | 硬摇滚 | 高压放大器 | 你解决问题的方式是：把音箱再开大一点。 |
| metal | 重金属 | 黑铁战士 | 你不是暴躁，你只是需要足够重的声音承载灵魂。 |
| punk | 朋克 | 反骨安全别针 | 你的内心住着一枚安全别针，专扎虚伪。 |
| postPunk | 后朋克 | 冷脸贝斯诗人 | 你不吵，但你的沉默很有攻击性。 |
| prog | 前卫摇滚 | 概念专辑建筑师 | 你的脑子里住着一张还没发行的概念专辑。 |
| psych | 迷幻摇滚 | 宇宙蘑菇旅人 | 你听的不是歌，是一场意识的液态旅行。 |
| blues | 布鲁斯摇滚 | 午夜蓝调浪子 | 你很松弛，但你的情绪有很深的年轮。 |
| folk | 民谣摇滚 | 公路故事歌手 | 你把生活写成歌，把远方唱成家。 |
| alt | 另类摇滚 | 反主流观察者 | 你不是难懂，你只是讨厌被分类。 |
| indie | 独立摇滚 | 小众耳机收藏家 | 你的人格像一张只发行 300 张的黑胶。 |
| grunge | 垃圾摇滚 | 破洞牛仔失眠人 | 你不想精致，你想真实到有点破。 |
| britpop | 英伦摇滚 | 都市合唱青年 | 你适合站在城市黄昏里唱一首万人副歌。 |
| popPunk | 流行朋克 | 青春爆裂汽水 | 你是青春期没关掉的失真踏板。 |
| shoegaze | 盯鞋摇滚 | 低头音墙梦游者 | 你低头不是害羞，是在调通往梦境的效果器。 |
| postRock | 后摇滚 | 远山延迟信号 | 你不急着唱，因为你的情绪会自己长成山。 |

## 6.2 原型分数表

| 类型 | EN | HV | RB | EX | CX | EM | RT | ST |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 经典摇滚 | 70 | 55 | 45 | 35 | 45 | 55 | 80 | 75 |
| 硬摇滚 | 85 | 75 | 55 | 35 | 45 | 45 | 60 | 85 |
| 重金属 | 90 | 95 | 60 | 45 | 70 | 50 | 35 | 75 |
| 朋克 | 85 | 65 | 95 | 45 | 25 | 50 | 35 | 80 |
| 后朋克 | 45 | 45 | 70 | 70 | 65 | 65 | 30 | 35 |
| 前卫摇滚 | 55 | 50 | 40 | 90 | 95 | 50 | 35 | 45 |
| 迷幻摇滚 | 50 | 40 | 50 | 95 | 70 | 70 | 40 | 45 |
| 布鲁斯摇滚 | 50 | 45 | 25 | 25 | 45 | 85 | 95 | 55 |
| 民谣摇滚 | 35 | 20 | 35 | 35 | 35 | 95 | 80 | 50 |
| 另类摇滚 | 60 | 55 | 70 | 70 | 60 | 70 | 30 | 55 |
| 独立摇滚 | 45 | 35 | 50 | 65 | 50 | 75 | 45 | 35 |
| 垃圾摇滚 | 70 | 75 | 75 | 45 | 35 | 90 | 35 | 55 |
| 英伦摇滚 | 70 | 45 | 45 | 40 | 45 | 60 | 70 | 85 |
| 流行朋克 | 90 | 55 | 70 | 30 | 25 | 75 | 35 | 95 |
| 盯鞋摇滚 | 30 | 55 | 35 | 80 | 60 | 85 | 25 | 20 |
| 后摇滚 | 40 | 50 | 30 | 85 | 85 | 90 | 20 | 25 |

---

# 7. 评分算法

## 7.1 答案计分

每个选项给 1–3 个维度加分。用户完成 24 道题后，累加每个维度的 raw score。

示例：

```ts
{
  id: "q01_a",
  text: "冲到前排，先让耳膜上班",
  scores: { EN: 2, ST: 1 }
}
```

## 7.2 分数标准化

由于不同维度的最高可能分数不完全一致，需要标准化到 0–100。

```ts
function normalizeScores(
  rawScores: DimensionScores,
  maxScores: DimensionScores
): DimensionScores {
  const result = {} as DimensionScores;

  for (const dim of DIMENSIONS) {
    result[dim] = Math.round((rawScores[dim] / maxScores[dim]) * 100);
  }

  return result;
}
```

## 7.3 类型匹配算法

使用加权欧氏距离计算用户向量和 16 种类型原型的距离。

```ts
function getDistance(
  user: DimensionScores,
  prototype: DimensionScores
): number {
  let sum = 0;

  for (const dim of DIMENSIONS) {
    const diff = user[dim] - prototype[dim];
    sum += DIMENSION_WEIGHTS[dim] * diff * diff;
  }

  return Math.sqrt(sum);
}
```

## 7.4 匹配度计算

```ts
function distanceToMatchScore(distance: number): number {
  const maxDistance = 220;
  const raw = 100 - (distance / maxDistance) * 100;
  return clamp(Math.round(raw), 72, 98);
}
```

说明：

- 结果页展示的匹配度建议控制在 72–98。
- 过低会损害娱乐体验。
- 过高会让用户误以为是严肃心理诊断。

## 7.5 主人格与副人格

```ts
function calculateResult(userScores: DimensionScores) {
  const ranked = ROCK_PROFILES
    .map(profile => {
      const distance = getDistance(userScores, profile.prototype);
      return {
        ...profile,
        distance,
        match: distanceToMatchScore(distance),
      };
    })
    .sort((a, b) => a.distance - b.distance);

  return {
    primary: ranked[0],
    secondary: ranked[1],
    third: ranked[2],
    isHybrid: ranked[1].distance - ranked[0].distance < 8,
  };
}
```

## 7.6 混合人格展示规则

当第一名和第二名距离差小于 8 时，结果页增加“隐藏副人格”。

示例：

```text
你的主类型：盯鞋摇滚
隐藏副人格：后摇滚
你是「低头音墙梦游者」和「远山延迟信号」的混合体。
```

---

# 8. 24 道题题库

## 8.1 题库数据结构

```ts
type DimensionKey = "EN" | "HV" | "RB" | "EX" | "CX" | "EM" | "RT" | "ST";

type Option = {
  id: string;
  text: string;
  scores: Partial<Record<DimensionKey, number>>;
};

type Question = {
  id: string;
  text: string;
  options: Option[];
};
```

## 8.2 正式题库

```ts
export const QUESTIONS: Question[] = [
  {
    id: "q01",
    text: "你走进 livehouse，第一反应是？",
    options: [
      { id: "q01_a", text: "冲到前排，先让耳膜上班", scores: { EN: 2, ST: 1 } },
      { id: "q01_b", text: "找个角落，观察灯光和氛围", scores: { EX: 1, EM: 2 } },
      { id: "q01_c", text: "看设备、看效果器、看音箱型号", scores: { CX: 2, HV: 1 } },
      { id: "q01_d", text: "和旁边的人聊：你也喜欢这个乐队？", scores: { ST: 2, RT: 1 } },
    ],
  },
  {
    id: "q02",
    text: "你最想在舞台上听到哪种开场？",
    options: [
      { id: "q02_a", text: "一个干净漂亮的经典吉他 riff", scores: { RT: 2, ST: 1 } },
      { id: "q02_b", text: "鼓手直接把场子炸开", scores: { EN: 2, HV: 1 } },
      { id: "q02_c", text: "一段听不懂但很上头的噪音或采样", scores: { EX: 2, RB: 1 } },
      { id: "q02_d", text: "一段慢慢升起、像电影开场的铺垫", scores: { EM: 1, CX: 2 } },
    ],
  },
  {
    id: "q03",
    text: "如果你组乐队，你最想当？",
    options: [
      { id: "q03_a", text: "主唱，负责点燃全场", scores: { ST: 2, EN: 1 } },
      { id: "q03_b", text: "吉他手，负责 riff 和 solo", scores: { RT: 1, HV: 1, EN: 1 } },
      { id: "q03_c", text: "贝斯手，冷静但决定灵魂", scores: { CX: 1, EX: 1 } },
      { id: "q03_d", text: "键盘、效果器或采样，负责让大家听不懂", scores: { EX: 2, CX: 1 } },
    ],
  },
  {
    id: "q04",
    text: "你对“难听但高级”的音乐怎么看？",
    options: [
      { id: "q04_a", text: "给我三分钟，我要理解它", scores: { EX: 2, CX: 1 } },
      { id: "q04_b", text: "听不懂，但感觉很厉害", scores: { EX: 1, EM: 1 } },
      { id: "q04_c", text: "太装了，我要旋律和爽感", scores: { ST: 1, RT: 1 } },
      { id: "q04_d", text: "越难听越诚实，继续放", scores: { RB: 2, HV: 1 } },
    ],
  },
  {
    id: "q05",
    text: "你的情绪崩溃方式更像？",
    options: [
      { id: "q05_a", text: "大吼一声，把负能量甩出去", scores: { EN: 2, HV: 1 } },
      { id: "q05_b", text: "写三页歌词，自己看完都沉默", scores: { EM: 2, EX: 1 } },
      { id: "q05_c", text: "开一首老歌，怀念不存在的青春", scores: { RT: 2, EM: 1 } },
      { id: "q05_d", text: "什么都不说，盯着墙听音墙", scores: { EM: 1, EX: 2 } },
    ],
  },
  {
    id: "q06",
    text: "你最喜欢哪种歌词？",
    options: [
      { id: "q06_a", text: "“老子不服”式反叛宣言", scores: { RB: 2, EN: 1 } },
      { id: "q06_b", text: "很生活，很具体，像一段真实经历", scores: { EM: 2, RT: 1 } },
      { id: "q06_c", text: "城市、阶层、青年、讽刺", scores: { RB: 1, CX: 1 } },
      { id: "q06_d", text: "意象很多，像梦、宇宙、雾和海", scores: { EX: 2, EM: 1 } },
    ],
  },
  {
    id: "q07",
    text: "朋友说“这歌也太吵了吧”，你会？",
    options: [
      { id: "q07_a", text: "这才哪到哪，后面更狠", scores: { HV: 2, EN: 1 } },
      { id: "q07_b", text: "确实吵，但吵得有层次", scores: { HV: 1, CX: 2 } },
      { id: "q07_c", text: "不是吵，是情绪太满", scores: { EM: 2, HV: 1 } },
      { id: "q07_d", text: "那我给你放个更温柔的版本", scores: { RT: 1, EM: 1 } },
    ],
  },
  {
    id: "q08",
    text: "你理想中的专辑封面是？",
    options: [
      { id: "q08_a", text: "皮衣、吉他、霓虹灯、老舞台", scores: { RT: 2, ST: 1 } },
      { id: "q08_b", text: "黑色、骷髅、火焰、金属质感", scores: { HV: 2, EN: 1 } },
      { id: "q08_c", text: "抽象图形、宇宙、奇怪符号", scores: { EX: 2, CX: 1 } },
      { id: "q08_d", text: "旧照片、公路、手写字", scores: { EM: 2, RT: 1 } },
    ],
  },
  {
    id: "q09",
    text: "你最讨厌哪种音乐评价？",
    options: [
      { id: "q09_a", text: "别那么认真，歌好听就行", scores: { CX: 1, EM: 1 } },
      { id: "q09_b", text: "太小众了，肯定不好听", scores: { RB: 1, EX: 1 } },
      { id: "q09_c", text: "摇滚不就是吵吗？", scores: { HV: 1, RT: 1 } },
      { id: "q09_d", text: "这种歌不适合大众", scores: { ST: 1, RB: 1 } },
    ],
  },
  {
    id: "q10",
    text: "如果一首歌超过 8 分钟，你会？",
    options: [
      { id: "q10_a", text: "太棒了，终于有展开空间", scores: { CX: 2, EX: 1 } },
      { id: "q10_b", text: "看它有没有情绪推进", scores: { EM: 2, CX: 1 } },
      { id: "q10_c", text: "太长了，副歌快来", scores: { ST: 2, EN: 1 } },
      { id: "q10_d", text: "只要 riff 够爽，多长都行", scores: { HV: 1, EN: 1 } },
    ],
  },
  {
    id: "q11",
    text: "你最想拥有哪件装备？",
    options: [
      { id: "q11_a", text: "一把经典 Les Paul 或 Strat", scores: { RT: 2 } },
      { id: "q11_b", text: "一个巨大的失真音箱墙", scores: { HV: 2, EN: 1 } },
      { id: "q11_c", text: "一整排效果器和延迟踏板", scores: { EX: 2, CX: 1 } },
      { id: "q11_d", text: "一把木吉他和一个本子", scores: { EM: 2, RT: 1 } },
    ],
  },
  {
    id: "q12",
    text: "你面对规则的态度是？",
    options: [
      { id: "q12_a", text: "规则可以有，但别挡我表达", scores: { RB: 1, EM: 1 } },
      { id: "q12_b", text: "规则就是用来打破的", scores: { RB: 2, EN: 1 } },
      { id: "q12_c", text: "先理解规则，再把它玩复杂", scores: { CX: 2, EX: 1 } },
      { id: "q12_d", text: "老规矩有老规矩的美", scores: { RT: 2 } },
    ],
  },
  {
    id: "q13",
    text: "你的舞台穿搭更接近？",
    options: [
      { id: "q13_a", text: "复古皮衣、墨镜、靴子", scores: { RT: 2, ST: 1 } },
      { id: "q13_b", text: "铆钉、补丁、破洞、别针", scores: { RB: 2, EN: 1 } },
      { id: "q13_c", text: "黑色、长发、金属饰品", scores: { HV: 2 } },
      { id: "q13_d", text: "宽松毛衣、帆布鞋、低头弹琴", scores: { EX: 1, EM: 1 } },
    ],
  },
  {
    id: "q14",
    text: "你最喜欢的现场瞬间是？",
    options: [
      { id: "q14_a", text: "全场大合唱", scores: { ST: 2, EM: 1 } },
      { id: "q14_b", text: "鼓点一进来，大家一起跳", scores: { EN: 2, ST: 1 } },
      { id: "q14_c", text: "所有人安静，只有音墙慢慢升起来", scores: { EX: 2, EM: 1 } },
      { id: "q14_d", text: "乐队突然变拍，观众愣住", scores: { CX: 2, EX: 1 } },
    ],
  },
  {
    id: "q15",
    text: "你更愿意写一首什么歌？",
    options: [
      { id: "q15_a", text: "写给一个人、一座城、一段生活", scores: { EM: 2, RT: 1 } },
      { id: "q15_b", text: "写给不服、愤怒和反抗", scores: { RB: 2, EN: 1 } },
      { id: "q15_c", text: "写一个概念故事，从第一首铺到最后一首", scores: { CX: 2, EX: 1 } },
      { id: "q15_d", text: "写一首所有人都会唱的副歌", scores: { ST: 2, EN: 1 } },
    ],
  },
  {
    id: "q16",
    text: "你对“流行性”的看法是？",
    options: [
      { id: "q16_a", text: "能流行说明旋律真的有力量", scores: { ST: 2 } },
      { id: "q16_b", text: "太流行我会有点想躲开", scores: { RB: 1, EX: 1 } },
      { id: "q16_c", text: "流行不流行不重要，真诚重要", scores: { EM: 2 } },
      { id: "q16_d", text: "如果结构够有趣，流行也可以", scores: { CX: 1, ST: 1 } },
    ],
  },
  {
    id: "q17",
    text: "你最喜欢哪种鼓？",
    options: [
      { id: "q17_a", text: "直给、快、冲", scores: { EN: 2, RB: 1 } },
      { id: "q17_b", text: "厚重、压迫、像坦克", scores: { HV: 2, EN: 1 } },
      { id: "q17_c", text: "稳、复古、有律动", scores: { RT: 2 } },
      { id: "q17_d", text: "慢慢叠加，最后爆发", scores: { CX: 1, EM: 2 } },
    ],
  },
  {
    id: "q18",
    text: "你听歌时最在意？",
    options: [
      { id: "q18_a", text: "能不能让我跟着动起来", scores: { EN: 2, ST: 1 } },
      { id: "q18_b", text: "声音质感和编曲层次", scores: { CX: 2, EX: 1 } },
      { id: "q18_c", text: "歌词是不是扎心", scores: { EM: 2 } },
      { id: "q18_d", text: "有没有一种历史感和根源感", scores: { RT: 2 } },
    ],
  },
  {
    id: "q19",
    text: "你更像哪种朋友？",
    options: [
      { id: "q19_a", text: "聚会点歌王，负责让大家唱起来", scores: { ST: 2, EN: 1 } },
      { id: "q19_b", text: "小众推荐官，总能放出没人听过的怪歌", scores: { EX: 2, RB: 1 } },
      { id: "q19_c", text: "情绪树洞，歌单像日记", scores: { EM: 2 } },
      { id: "q19_d", text: "乐理考古学家，讲得比歌还长", scores: { CX: 2, RT: 1 } },
    ],
  },
  {
    id: "q20",
    text: "如果要给你的人生配一段吉他音色？",
    options: [
      { id: "q20_a", text: "干净、温暖、略带蓝调", scores: { RT: 2, EM: 1 } },
      { id: "q20_b", text: "高增益、失真、冲击力强", scores: { HV: 2, EN: 1 } },
      { id: "q20_c", text: "延迟、混响、像在水里发光", scores: { EX: 2, EM: 1 } },
      { id: "q20_d", text: "简单明亮，适合大合唱", scores: { ST: 2, EN: 1 } },
    ],
  },
  {
    id: "q21",
    text: "你对“主流审美”的态度？",
    options: [
      { id: "q21_a", text: "可以借用，但不能被它驯化", scores: { RB: 1, EX: 1 } },
      { id: "q21_b", text: "不关心，我只听让我爽的", scores: { EN: 1, HV: 1 } },
      { id: "q21_c", text: "主流也有经典，要看时间筛选", scores: { RT: 2 } },
      { id: "q21_d", text: "我喜欢藏在边缘里的声音", scores: { EX: 2, EM: 1 } },
    ],
  },
  {
    id: "q22",
    text: "你最想去哪个场景？",
    options: [
      { id: "q22_a", text: "烟雾缭绕的蓝调酒吧", scores: { RT: 2, EM: 1 } },
      { id: "q22_b", text: "汗水飞溅的地下朋克现场", scores: { RB: 2, EN: 1 } },
      { id: "q22_c", text: "大型音乐节万人合唱", scores: { ST: 2, EN: 1 } },
      { id: "q22_d", text: "黑暗剧场里看一支器乐乐队", scores: { CX: 2, EM: 1 } },
    ],
  },
  {
    id: "q23",
    text: "你更能接受哪种“极端”？",
    options: [
      { id: "q23_a", text: "极端快、极端炸", scores: { EN: 2, HV: 1 } },
      { id: "q23_b", text: "极端慢、极端沉浸", scores: { EM: 1, EX: 2 } },
      { id: "q23_c", text: "极端复杂、极端精密", scores: { CX: 2 } },
      { id: "q23_d", text: "极端简单、极端直接", scores: { RB: 2, EN: 1 } },
    ],
  },
  {
    id: "q24",
    text: "测完后你希望结果怎么说你？",
    options: [
      { id: "q24_a", text: "你是舞台中心的天然明星", scores: { ST: 2, EN: 1 } },
      { id: "q24_b", text: "你是不会被规训的反骨灵魂", scores: { RB: 2 } },
      { id: "q24_c", text: "你是情绪和故事的收藏者", scores: { EM: 2 } },
      { id: "q24_d", text: "你是声音宇宙的建筑师", scores: { EX: 1, CX: 2 } },
    ],
  },
];
```

---

# 9. 结果文案库

## 9.1 结果数据结构

```ts
type RockProfile = {
  id: string;
  genre: string;
  personaName: string;
  tagline: string;
  prototype: DimensionScores;
  summary: string;
  analysis: string;
  strengths: string[];
  blindspots: string[];
  bandsGlobal: string[];
  bandsChinese: string[];
  scenes: string[];
  colors: string[];
  iconKeywords: string[];
};
```

## 9.2 16 个结果详情

### 1. 经典摇滚｜复古舞台王

**一句话**：你的人生需要一个复古麦克风和一段漂亮 riff。

**分析**：  
你偏好清晰、有记忆点、能让人立刻进入状态的摇滚。你喜欢经典的舞台姿态、漂亮的吉他动机、可以跟着唱的旋律，以及“这歌能传很多年”的耐听感。你不是保守，而是相信真正的好歌经得起时间放大。

**优势**：

- 审美稳定
- 喜欢高完成度作品
- 有舞台感
- 容易成为聚会里的气氛担当

**盲区**：

- 可能对过度实验的音乐耐心不足
- 容易把“经典”误认为唯一标准

**国外代表**：The Beatles、The Rolling Stones、Queen、Led Zeppelin、The Who  
**华语代表**：黑豹、唐朝、Beyond、零点、轮回

**适合场景**：公路、聚会、演出返场、朋友合唱。

---

### 2. 硬摇滚｜高压放大器

**一句话**：你解决问题的方式是：把音箱再开大一点。

**分析**：  
你喜欢直接、强烈、充满肌肉感的声音。你不想绕弯子，riff 要硬，鼓点要冲，副歌要能让人站起来。你对舞台能量和身体反应很敏感，一首歌好不好，首先要看它有没有把空气推起来。

**优势**：

- 行动力强
- 情绪释放能力好
- 喜欢直接表达
- 很懂现场感染力

**盲区**：

- 有时会嫌细腻表达不够有劲
- 对慢热型作品容易失去耐心

**国外代表**：AC/DC、Deep Purple、Guns N’ Roses、Aerosmith、Van Halen  
**华语代表**：黑豹、唐朝、超载、指南针、信乐团

**适合场景**：健身、通勤、开工、演出前预热。

---

### 3. 重金属｜黑铁战士

**一句话**：你不是暴躁，你只是需要足够重的声音承载灵魂。

**分析**：  
你偏好高密度、高压迫、高控制感的声音。你不一定每天都愤怒，但你需要一种足够重的声音来承载复杂情绪。你喜欢强鼓点、厚失真、暗色意象、技术感和仪式感。对你来说，音乐不是背景，而是一套盔甲。

**优势**：

- 抗压能力强
- 对强烈情绪有容纳力
- 对技术和完成度敏感
- 喜欢有力量的表达

**盲区**：

- 有时会把“强烈”误认为“真实”
- 可能低估轻柔音乐的情绪深度

**国外代表**：Black Sabbath、Metallica、Iron Maiden、Judas Priest、Megadeth  
**华语代表**：唐朝、超载、夜叉、冥界、窒息

**适合场景**：健身、赶 deadline、夜路、情绪蓄力。

---

### 4. 朋克｜反骨安全别针

**一句话**：你的内心住着一枚安全别针，专扎虚伪。

**分析**：  
你讨厌过度包装和假装高级的东西。你更相信直接、快速、真实、带刺的表达。你喜欢那些粗糙但有态度的声音，宁愿三分钟说真话，也不愿十分钟装深刻。

**优势**：

- 立场鲜明
- 表达直接
- 行动力强
- 不容易被权威吓住

**盲区**：

- 有时过于排斥复杂性
- 容易把妥协都看成投降

**国外代表**：Ramones、Sex Pistols、The Clash、Dead Kennedys、Green Day  
**华语代表**：反光镜、脑浊、SMZB、Demerit、Joyside

**适合场景**：发泄、抗议、冲动出门、想说“不”的时候。

---

### 5. 后朋克｜冷脸贝斯诗人

**一句话**：你不吵，但你的沉默很有攻击性。

**分析**：  
你喜欢冷感、克制、疏离却带着锋利态度的声音。你未必追求高分贝，但你在意气质、结构和潜台词。你常被低频贝斯、重复节奏、城市焦虑和黑白色调吸引。

**优势**：

- 观察力强
- 审美克制
- 思考深
- 不轻易被热闹带走

**盲区**：

- 容易显得距离感强
- 可能不擅长直接表达情绪

**国外代表**：Joy Division、The Cure、Bauhaus、Siouxsie and the Banshees、Interpol  
**华语代表**：P.K.14、重塑雕像的权利、Snapline、亲爱的艾洛伊丝、工工工

**适合场景**：夜晚地铁、城市散步、独处、整理思绪。

---

### 6. 前卫摇滚｜概念专辑建筑师

**一句话**：你的脑子里住着一张还没发行的概念专辑。

**分析**：  
你不满足于一首歌只有主歌和副歌。你喜欢复杂结构、奇怪节拍、宏大概念、长篇展开和听第二遍才发现的细节。你听音乐像读一本结构复杂的小说，需要线索、伏笔和世界观。

**优势**：

- 好奇心强
- 结构感强
- 喜欢深度探索
- 对复杂作品有耐心

**盲区**：

- 可能把简单作品低估
- 有时会显得过度分析

**国外代表**：Pink Floyd、King Crimson、Yes、Genesis、Rush  
**华语代表**：万能青年旅店、木马、美好药店、吹万、唐朝

**适合场景**：深夜、长途、阅读、独自沉浸。

---

### 7. 迷幻摇滚｜宇宙蘑菇旅人

**一句话**：你听的不是歌，是一场意识的液态旅行。

**分析**：  
你偏好漂浮、旋涡、回声、梦境感和感知扩张。你喜欢声音不急着抵达，而是在空间中流动。你对未知和抽象有天然兴趣，不怕音乐变怪，甚至越怪越想靠近。

**优势**：

- 想象力强
- 开放度高
- 对氛围敏感
- 善于进入沉浸状态

**盲区**：

- 有时容易沉迷感受而忽略现实推进
- 对直白表达可能兴趣不足

**国外代表**：The Doors、Grateful Dead、Tame Impala、Pink Floyd、Jefferson Airplane  
**华语代表**：吹万、Carsick Cars、鸭打鹅、海龟先生、白水相关实验项目

**适合场景**：夜晚、旅行、冥想、独自发呆。

---

### 8. 布鲁斯摇滚｜午夜蓝调浪子

**一句话**：你很松弛，但你的情绪有很深的年轮。

**分析**：  
你喜欢根源、律动、烟雾感和细腻的情绪颗粒。你不需要音乐一直爆炸，你更在意那一下弯音、那一段即兴、那种“经历过才懂”的味道。你像一杯慢慢喝的酒，不急，但很深。

**优势**：

- 情绪成熟
- 审美有根
- 喜欢真实表达
- 能在简单里听见细节

**盲区**：

- 对过度电子化或概念化音乐可能较冷淡
- 有时容易沉溺怀旧

**国外代表**：Cream、The Allman Brothers Band、Stevie Ray Vaughan & Double Trouble、ZZ Top、Gary Moore  
**华语代表**：布衣、低苦艾、野孩子、杭盖、二手玫瑰

**适合场景**：酒吧、夜路、公路、一个人慢慢想事情。

---

### 9. 民谣摇滚｜公路故事歌手

**一句话**：你把生活写成歌，把远方唱成家。

**分析**：  
你重视故事、生活、真诚和人文温度。你喜欢木吉他、路、风、故乡、朋友和具体的人。对你来说，摇滚不一定要很吵，它也可以是一种诚实地讲述生活的方式。

**优势**：

- 共情力强
- 文字敏感
- 真实可靠
- 重视人与故事

**盲区**：

- 可能对强噪音和极端表达不适应
- 容易被情绪拖住

**国外代表**：Bob Dylan、The Byrds、Simon & Garfunkel、Eagles、Mumford & Sons  
**华语代表**：野孩子、低苦艾、布衣、马条与乐队、九连真人

**适合场景**：旅行、露营、写东西、和老朋友聊天。

---

### 10. 另类摇滚｜反主流观察者

**一句话**：你不是难懂，你只是讨厌被分类。

**分析**：  
你喜欢旋律和噪音并存，也喜欢漂亮和别扭共处。你不一定故意小众，但你天然会避开过于标准的答案。你在意态度、情绪和观察力，希望音乐能表达那些难以用普通话说清楚的东西。

**优势**：

- 审美独立
- 敏感敏锐
- 能接受矛盾
- 喜欢发现边缘价值

**盲区**：

- 有时会过度抗拒大众喜好
- 可能把“不一样”当成必要条件

**国外代表**：R.E.M.、Radiohead、Pixies、The Smashing Pumpkins、Sonic Youth  
**华语代表**：万能青年旅店、痛仰、新裤子、刺猬、逃跑计划

**适合场景**：独处、城市漫游、深夜耳机、情绪复杂的时候。

---

### 11. 独立摇滚｜小众耳机收藏家

**一句话**：你的人格像一张只发行 300 张的黑胶。

**分析**：  
你喜欢自我、小众、松弛、有一点不合群但不刻意的东西。你可能比起万人合唱，更喜欢一个下午、一副耳机、一支没人知道的乐队。你的审美更像私人收藏，不是为了炫耀，而是为了确认“这是我”。

**优势**：

- 审美细腻
- 自我意识强
- 不轻易随大流
- 能发现冷门好东西

**盲区**：

- 容易陷入小众优越感
- 有时社交表达不够主动

**国外代表**：The Strokes、Arctic Monkeys、Modest Mouse、Arcade Fire、Vampire Weekend  
**华语代表**：刺猬、旅行团、后海大鲨鱼、Carsick Cars、Schoolgirl byebye

**适合场景**：咖啡店、卧室、通勤耳机、独立书店。

---

### 12. 垃圾摇滚｜破洞牛仔失眠人

**一句话**：你不想精致，你想真实到有点破。

**分析**：  
你偏好粗粝、厌世、真实和脆弱混在一起的声音。你可能不喜欢过度完美的表达，反而容易被破音、失真、疲惫感和自嘲打动。你听歌不是为了假装没事，而是为了承认“我确实不太好”。

**优势**：

- 真诚
- 不装
- 能面对阴暗情绪
- 对虚假精致很敏感

**盲区**：

- 容易沉入低气压
- 有时把粗糙误认为真实

**国外代表**：Nirvana、Pearl Jam、Soundgarden、Alice in Chains、Stone Temple Pilots  
**华语代表**：木马、清醒、The Molds、Birdstriking、Carsick Cars

**适合场景**：失眠、雨天、整理房间、情绪低谷。

---

### 13. 英伦摇滚｜都市合唱青年

**一句话**：你适合站在城市黄昏里唱一首万人副歌。

**分析**：  
你喜欢旋律、城市感、复古青年气质和可以一起唱的副歌。你的摇滚不一定最重，但一定要有记忆点和画面感。你喜欢把个人情绪变成公共合唱，把日常生活唱成一部城市电影。

**优势**：

- 旋律感强
- 社交感好
- 审美有风格
- 善于制造共同记忆

**盲区**：

- 可能对过于抽象的音乐缺少耐心
- 容易迷恋某种青春滤镜

**国外代表**：Oasis、Blur、Pulp、Suede、The Verve  
**华语代表**：果味VC、花儿乐队、逃跑计划、五月天、苏打绿

**适合场景**：城市傍晚、朋友聚会、KTV、音乐节。

---

### 14. 流行朋克｜青春爆裂汽水

**一句话**：你是青春期没关掉的失真踏板。

**分析**：  
你喜欢明亮、直接、年轻、快节奏的情绪释放。你不是没有烦恼，而是更愿意把烦恼唱成一个可以跳起来的副歌。你需要一点叛逆、一点可爱、一点冲动，最好还有一个全场都能喊的 hook。

**优势**：

- 情绪外放
- 感染力强
- 年轻感强
- 很会把坏心情变成动力

**盲区**：

- 可能处理复杂情绪时过于急着乐观
- 容易三分钟热血

**国外代表**：Green Day、Blink-182、Paramore、Sum 41、Fall Out Boy  
**华语代表**：Chinese Football、反光镜、果味VC、花儿乐队、夏日入侵企画

**适合场景**：放学路上、夜跑、朋友出游、想重新开始的时候。

---

### 15. 盯鞋摇滚｜低头音墙梦游者

**一句话**：你低头不是害羞，是在调通往梦境的效果器。

**分析**：  
你喜欢朦胧、内向、柔软又巨大的声音。你不需要主唱把话说得很清楚，甚至人声埋在音墙里才刚刚好。你重视氛围、纹理、混响和那种像梦一样包住自己的感觉。

**优势**：

- 审美敏感
- 内在世界丰富
- 能享受细微变化
- 对空间感和声音质地敏锐

**盲区**：

- 表达容易含糊
- 可能过度沉浸在自己的情绪空间

**国外代表**：My Bloody Valentine、Slowdive、Ride、Cocteau Twins、DIIV  
**华语代表**：亲爱的艾洛伊丝、缺省、The White Tulips、Forsaken Autumn、City Flanker

**适合场景**：夜晚卧室、雨天、耳机、一个人走路。

---

### 16. 后摇滚｜远山延迟信号

**一句话**：你不急着唱，因为你的情绪会自己长成山。

**分析**：  
你喜欢器乐、渐强、空间、长线情绪和电影感。你不一定需要歌词，因为你相信声音本身可以完成叙事。你像一首慢慢铺开的曲子，前半段安静，后半段把所有情绪推到天边。

**优势**：

- 情绪深
- 有耐心
- 画面感强
- 善于感受长期变化

**盲区**：

- 有时表达不够直接
- 可能让急性子的人等不及

**国外代表**：Mogwai、Godspeed You! Black Emperor、Explosions in the Sky、Sigur Rós、toe  
**华语代表**：惘闻、沼泽、发光曲线、Chinese Football、大象体操

**适合场景**：长途、山海、深夜工作、情绪整理。

---

# 10. 前端技术架构

## 10.1 推荐目录结构

```text
rockti/
├── public/
│   ├── images/
│   │   ├── profiles/
│   │   └── stickers/
│   └── favicon.svg
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── Badge.tsx
│   │   ├── quiz/
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── OptionCard.tsx
│   │   │   └── QuizProgress.tsx
│   │   ├── result/
│   │   │   ├── ResultHero.tsx
│   │   │   ├── DimensionRadar.tsx
│   │   │   ├── ProfileAnalysis.tsx
│   │   │   ├── BandList.tsx
│   │   │   └── ShareCard.tsx
│   │   └── layout/
│   │       ├── PageShell.tsx
│   │       └── StickerLayer.tsx
│   │
│   ├── data/
│   │   ├── questions.ts
│   │   ├── profiles.ts
│   │   └── dimensions.ts
│   │
│   ├── lib/
│   │   ├── scoring.ts
│   │   ├── share.ts
│   │   ├── storage.ts
│   │   └── utils.ts
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── QuizPage.tsx
│   │   └── ResultPage.tsx
│   │
│   ├── types/
│   │   └── rockti.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## 10.2 状态管理

MVP 不需要 Redux。使用 React state + localStorage 即可。

```ts
type UserAnswerMap = Record<string, string>;

const [answers, setAnswers] = useState<UserAnswerMap>(() => {
  return loadAnswersFromStorage();
});
```

本地存储字段：

```text
rockti_answers
rockti_result
rockti_last_completed_at
```

## 10.3 路由

如果使用 React Router：

```text
/           首页
/quiz       测试页
/result     结果页
```

也可以用单页状态切换，减少复杂度。

---

# 11. 核心 TypeScript 类型

```ts
export const DIMENSIONS = ["EN", "HV", "RB", "EX", "CX", "EM", "RT", "ST"] as const;

export type DimensionKey = typeof DIMENSIONS[number];

export type DimensionScores = Record<DimensionKey, number>;

export type Option = {
  id: string;
  text: string;
  scores: Partial<DimensionScores>;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
};

export type RockProfile = {
  id: string;
  genre: string;
  personaName: string;
  tagline: string;
  prototype: DimensionScores;
  summary: string;
  analysis: string;
  strengths: string[];
  blindspots: string[];
  bandsGlobal: string[];
  bandsChinese: string[];
  scenes: string[];
  colors: string[];
  iconKeywords: string[];
};

export type RankedResult = RockProfile & {
  distance: number;
  match: number;
};

export type RocktiResult = {
  userScores: DimensionScores;
  primary: RankedResult;
  secondary: RankedResult;
  third: RankedResult;
  isHybrid: boolean;
  completedAt: string;
};
```

---

# 12. 核心评分函数

```ts
import { DIMENSIONS } from "../types/rockti";
import type { DimensionScores, Question, RockProfile, RocktiResult } from "../types/rockti";

export const DIMENSION_WEIGHTS: DimensionScores = {
  EN: 1.0,
  HV: 1.1,
  RB: 1.1,
  EX: 1.1,
  CX: 1.0,
  EM: 1.1,
  RT: 0.9,
  ST: 0.9,
};

export function emptyScores(): DimensionScores {
  return {
    EN: 0,
    HV: 0,
    RB: 0,
    EX: 0,
    CX: 0,
    EM: 0,
    RT: 0,
    ST: 0,
  };
}

export function calculateRawScores(
  questions: Question[],
  answers: Record<string, string>
): DimensionScores {
  const scores = emptyScores();

  for (const question of questions) {
    const selectedOptionId = answers[question.id];
    const option = question.options.find(item => item.id === selectedOptionId);

    if (!option) continue;

    for (const dim of DIMENSIONS) {
      scores[dim] += option.scores[dim] ?? 0;
    }
  }

  return scores;
}

export function calculateMaxScores(questions: Question[]): DimensionScores {
  const maxScores = emptyScores();

  for (const question of questions) {
    for (const dim of DIMENSIONS) {
      const maxForQuestion = Math.max(
        ...question.options.map(option => option.scores[dim] ?? 0)
      );
      maxScores[dim] += maxForQuestion;
    }
  }

  return maxScores;
}

export function normalizeScores(
  rawScores: DimensionScores,
  maxScores: DimensionScores
): DimensionScores {
  const normalized = emptyScores();

  for (const dim of DIMENSIONS) {
    if (maxScores[dim] === 0) {
      normalized[dim] = 0;
    } else {
      normalized[dim] = Math.round((rawScores[dim] / maxScores[dim]) * 100);
    }
  }

  return normalized;
}

export function getDistance(
  userScores: DimensionScores,
  prototype: DimensionScores
): number {
  let sum = 0;

  for (const dim of DIMENSIONS) {
    const diff = userScores[dim] - prototype[dim];
    sum += DIMENSION_WEIGHTS[dim] * diff * diff;
  }

  return Math.sqrt(sum);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function distanceToMatchScore(distance: number): number {
  const maxDistance = 220;
  const raw = 100 - (distance / maxDistance) * 100;
  return clamp(Math.round(raw), 72, 98);
}

export function calculateRocktiResult(
  questions: Question[],
  profiles: RockProfile[],
  answers: Record<string, string>
): RocktiResult {
  const rawScores = calculateRawScores(questions, answers);
  const maxScores = calculateMaxScores(questions);
  const userScores = normalizeScores(rawScores, maxScores);

  const ranked = profiles
    .map(profile => {
      const distance = getDistance(userScores, profile.prototype);
      return {
        ...profile,
        distance,
        match: distanceToMatchScore(distance),
      };
    })
    .sort((a, b) => a.distance - b.distance);

  return {
    userScores,
    primary: ranked[0],
    secondary: ranked[1],
    third: ranked[2],
    isHybrid: ranked[1].distance - ranked[0].distance < 8,
    completedAt: new Date().toISOString(),
  };
}
```

---

# 13. 组件需求

## 13.1 HomePage

### 功能

- 展示品牌和测试入口
- 展示简短说明
- 展示 16 类型预览
- 点击开始进入 QuizPage

### 组件

```text
HomePage
├── HeroLogo
├── IntroText
├── StartButton
├── TypePreviewGrid
└── Disclaimer
```

## 13.2 QuizPage

### 功能

- 展示 24 道题
- 记录用户选择
- 支持上一题
- 未选择时不能进入下一题
- 全部完成后进入结果页

### 组件

```text
QuizPage
├── QuizProgress
├── QuestionCard
│   └── OptionCard x4
├── QuizNavigation
└── StageHintModal
```

### 交互规则

| 行为 | 结果 |
|---|---|
| 点击选项 | 选项高亮，按钮可继续 |
| 点击下一题 | 保存答案，跳下一题 |
| 点击上一题 | 返回上一题，保留答案 |
| 未选答案点击下一题 | 按钮禁用或轻微 shake |
| 第 24 题点击提交 | 计算结果并跳转结果页 |

## 13.3 ResultPage

### 功能

- 展示主结果
- 展示匹配度
- 展示雷达图
- 展示详细分析
- 展示代表乐队
- 展示隐藏副人格
- 分享结果图
- 重新测试

### 组件

```text
ResultPage
├── ResultHero
├── MatchScore
├── DimensionRadar
├── ProfileAnalysis
├── BandList
├── SceneList
├── SecondaryProfile
├── ShareButton
└── RestartButton
```

## 13.4 ShareCard

### 功能

- 根据结果生成可保存图片
- 尺寸推荐 1080 × 1350
- 包含二维码或 URL

### 内容

```text
ROCKTI
我的摇滚人格是：
[人格名]
[摇滚类型]
匹配度 XX%
主导维度：A / B / C
一句话描述
二维码 / 测试入口
```

---

# 14. 动效规范

## 14.1 首页

| 元素 | 动效 |
|---|---|
| Logo | 进入时轻微放大 + 震动 |
| 贴纸元素 | 缓慢漂浮 |
| 开始按钮 | Hover 上浮，Active 下沉 |
| 背景闪电 | 随机轻微闪烁 |

## 14.2 测试页

| 元素 | 动效 |
|---|---|
| 题目切换 | 左右滑入 |
| 选项选中 | 像踩踏板一样下沉 |
| 进度条 | 平滑增长 |
| 阶段提示 | 舞台灯扫过 |

## 14.3 结果页

| 元素 | 动效 |
|---|---|
| 结果卡 | 像海报贴到墙上 |
| 匹配度数字 | 从 0 滚动到最终值 |
| 雷达图 | 逐步点亮 |
| 分享卡 | 生成时轻微闪光 |

---

# 15. 适配规范

## 15.1 移动端优先

主要目标设备：

- iPhone 12 及以上
- 常见 Android 手机
- 微信内置浏览器
- Safari / Chrome

## 15.2 断点

| 断点 | 说明 |
|---|---|
| `< 640px` | 手机布局，一题一屏 |
| `640–1024px` | 平板布局，内容居中 |
| `> 1024px` | 桌面布局，左右增加贴纸装饰 |

## 15.3 可访问性

- 所有按钮可键盘操作
- 选项卡片有 `aria-pressed`
- 图片有 alt
- 文字和背景对比度足够
- 不依赖颜色表达唯一信息

---

# 16. 埋点方案

MVP 可先用简单 console 或第三方统计，后续接入正式 analytics。

## 16.1 事件表

| 事件名 | 触发时机 | 参数 |
|---|---|---|
| `home_view` | 进入首页 | source |
| `quiz_start` | 点击开始测试 | timestamp |
| `question_view` | 展示题目 | questionId, index |
| `option_select` | 选择选项 | questionId, optionId |
| `quiz_complete` | 完成 24 题 | duration, answerCount |
| `result_view` | 展示结果页 | primaryType, match |
| `share_click` | 点击分享 | primaryType |
| `restart_click` | 重新测试 | primaryType |

## 16.2 关键指标

| 指标 | 目标 |
|---|---|
| 首页开始率 | > 45% |
| 测试完成率 | > 70% |
| 平均完成时长 | 3–5 分钟 |
| 结果页分享率 | > 15% |
| 重新测试率 | > 8% |
| Top 3 自评命中率 | > 75% |

---

# 17. 测试与验收标准

## 17.1 功能验收

| 功能 | 验收标准 |
|---|---|
| 首页 | Logo、说明、开始按钮正常显示 |
| 开始测试 | 点击后进入第 1 题 |
| 答题 | 24 道题均可选择 |
| 返回上一题 | 答案保留 |
| 进度条 | 根据题号正确变化 |
| 未选不能下一题 | 按钮禁用或提示 |
| 提交结果 | 完成 24 题后可计算结果 |
| 结果页 | 主人格、匹配度、雷达图、分析正常展示 |
| 分享图 | 可生成图片或截图 |
| 重新测试 | 清空答案并回到首页或第 1 题 |

## 17.2 算法验收

| 场景 | 预期 |
|---|---|
| 全选高能选项 | 倾向硬摇滚、流行朋克、朋克 |
| 全选重型选项 | 倾向重金属、硬摇滚、垃圾摇滚 |
| 全选情绪叙事选项 | 倾向民谣、后摇、盯鞋、垃圾摇滚 |
| 全选复杂实验选项 | 倾向前卫、迷幻、后摇 |
| 全选复古根源选项 | 倾向布鲁斯、经典、民谣 |
| 全选社交合唱选项 | 倾向英伦、流行朋克、经典 |

## 17.3 视觉验收

| 项目 | 标准 |
|---|---|
| 摇滚感 | 首页和结果页明显具有摇滚海报气质 |
| 可读性 | 中文标题和题目清晰可读 |
| 移动端 | 单手操作舒适 |
| 动效 | 有趣但不卡顿 |
| 风格统一 | 贴纸、线条、颜色保持统一 |

## 17.4 性能验收

| 指标 | 标准 |
|---|---|
| 首屏加载 | < 2.5 秒 |
| JS 包体 | MVP 尽量 < 300KB gzip |
| 图片资源 | 单图压缩后 < 300KB |
| 动画帧率 | 常见手机保持流畅 |
| 分享图生成 | < 3 秒 |

---

# 18. 开发里程碑

## Week 1：基础框架与数据

- 搭建 React + Vite + TS 项目
- 配置 Tailwind
- 写入题库和 profile 数据
- 实现评分算法
- 完成基础页面路由

## Week 2：页面开发

- 首页开发
- 测试页开发
- 结果页开发
- 雷达图接入
- 本地存储

## Week 3：视觉与动效

- ROCKTI 主视觉
- 16 类型图标 / 插画接入
- Framer Motion 动效
- 移动端适配
- 分享卡生成

## Week 4：测试与上线

- 功能测试
- 算法测试
- 小样本内测
- 文案修正
- 部署上线

---

# 19. MVP 版本范围

## 必须做

- 首页
- 24 道题
- 8 维评分
- 16 类型匹配
- 结果页
- 代表乐队
- 分享图
- 重新测试
- 移动端适配

## 可延后

- 登录
- 用户历史记录
- 社交好友匹配
- 歌单自动生成
- 后台配置题库
- 多语言版本
- AI 动态分析

---

# 20. 风险与处理

| 风险 | 说明 | 处理 |
|---|---|---|
| 被理解成心理诊断 | 用户误以为结果等同真实人格 | 加娱乐和偏好说明 |
| 类型刻板印象 | 某些摇滚类型被描述过窄 | 文案强调“倾向”而非绝对 |
| 结果不准 | 用户觉得不像自己 | 展示 Top 3 和隐藏副人格 |
| 文案太长 | 移动端阅读压力大 | 分块折叠展示 |
| 中文文字生成图不稳定 | AI 插画中文字可能错误 | 最终 UI 中文用前端文字渲染，不写死在图片里 |
| 版权风险 | 参考项目无 license | 不复制代码、题目、设计，仅参考交互结构 |

---

# 21. 推荐实现原则

1. **文字不要烘焙进图片**  
   所有中文标题、按钮、题目、结果文案都由 HTML / CSS 渲染，避免图片中文字错误。

2. **插画只做视觉装饰**  
   结果判断和内容展示不依赖插画。

3. **题库和结果配置化**  
   所有题目、选项、分数、profile 都放在 `data` 文件夹，方便运营调整。

4. **算法独立测试**  
   `scoring.ts` 必须能独立单元测试，不和 UI 绑定。

5. **结果展示 Top 3**  
   降低单一结果不准确带来的挫败感。

6. **强调娱乐与自我探索**  
   不使用“诊断”“真实人格”“天生如此”等绝对表达。

---

# 22. README 建议

```md
# ROCKTI

ROCKTI 是一个摇滚人格测试 Web App。
用户通过 24 道题完成音乐偏好测试，系统根据 8 个摇滚偏好维度匹配 16 种摇滚人格。

## Features

- 24 道趣味测试题
- 8 维摇滚偏好模型
- 16 种摇滚人格结果
- 结果雷达图
- 分享海报
- 移动端优先

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts

## Disclaimer

ROCKTI 仅用于音乐偏好探索与娱乐，不构成心理诊断。
```

---

# 23. 后续扩展方向

## 23.1 歌单推荐

根据主结果和副结果推荐：

- 入门歌单
- 进阶歌单
- 华语歌单
- 现场必听

## 23.2 社交分享

- 我的 ROCKTI 海报
- 我和朋友的摇滚兼容度
- 组乐队匹配：主唱 / 吉他 / 贝斯 / 鼓手

## 23.3 节日活动

- 音乐节人格测试
- 城市摇滚地图
- 年度摇滚人格报告

## 23.4 进阶算法

- 加入用户喜欢的乐队作为校准题
- 加入题目权重
- 加入结果置信度
- 加入 AB Test 优化题目区分度

---

# 24. 最终交付清单

## 产品侧

- [ ] 产品需求文档
- [ ] 24 道题最终文案
- [ ] 16 个结果最终文案
- [ ] 代表乐队列表
- [ ] 分享卡文案

## 设计侧

- [ ] 首页设计稿
- [ ] 测试页设计稿
- [ ] 结果页设计稿
- [ ] 分享卡设计稿
- [ ] 16 类型插画 / 图标
- [ ] 动效说明

## 前端侧

- [ ] 项目初始化
- [ ] 数据结构实现
- [ ] 评分算法实现
- [ ] 首页实现
- [ ] 测试页实现
- [ ] 结果页实现
- [ ] 分享图实现
- [ ] 移动端适配
- [ ] 部署上线

## 测试侧

- [ ] 题目流程测试
- [ ] 算法结果测试
- [ ] 移动端兼容测试
- [ ] 分享图测试
- [ ] 性能测试
- [ ] 文案校对

---

# 25. 版本结论

ROCKTI v1.0 应优先做成一个**轻量、好玩、视觉强、可分享的纯前端测试产品**。

核心成功标准不是“像心理量表一样严肃”，而是：

1. 用户觉得题目有趣。
2. 用户觉得结果有一定准确感。
3. 用户愿意分享结果图。
4. 视觉上足够摇滚、有辨识度。
5. 算法逻辑可解释、可调整、可迭代。

一句话总结：

> ROCKTI = 24 道题 + 8 维音乐偏好模型 + 16 种摇滚人格 + 可分享摇滚海报。

