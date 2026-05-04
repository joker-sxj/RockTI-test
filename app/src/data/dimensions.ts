import type { DimensionKey, Level } from "../types/rockti";

/**
 * 维度元信息
 */
export const DIMENSION_LABELS: Record<DimensionKey, { name: string; short: string; description: string }> = {
  EN: { name: "能量唤醒", short: "EN", description: "对高能量、快速度、刺激音乐的偏好" },
  HV: { name: "重度失真", short: "HV", description: "对重音色、低频、压迫感的接受度" },
  RB: { name: "反叛冲动", short: "RB", description: "对反主流、反规则、直接表达的偏好" },
  EX: { name: "实验开放", short: "EX", description: "对怪异、迷幻、抽象声音的接受度" },
  CX: { name: "结构复杂", short: "CX", description: "对复杂编曲、奇拍、长结构的兴趣" },
  EM: { name: "情绪叙事", short: "EM", description: "对歌词、情绪、故事表达的偏好" },
  RT: { name: "根源复古", short: "RT", description: "对经典、蓝调、原声乐器的偏好" },
  ST: { name: "舞台社交", short: "ST", description: "对合唱、互动、群体氛围的偏好" },
};

/**
 * 每个维度有 3 道题，sum 范围 3-9。
 *
 * v3 算法（2026-05）：缩窄 M 区间，避免"中庸偏差"导致大量用户被判为全 M 向量。
 *   - sum 3-5 → L（3 个值，43%）
 *   - sum  6  → M（仅 1 个值，14%）
 *   - sum 7-9 → H（3 个值，43%）
 *
 * 旧阈值（L_MAX=4, H_MIN=8）下 M 占 43%，只要 3 题里没有 2 题选极端就一定是 M，
 * 配合稳定排序使"经典摇滚"在平局时永远胜出。新阈值参考 SBTI 设计的方法（M 仅 1 个值）。
 */
export const LEVEL_THRESHOLDS = {
  L_MAX: 5, // sum ≤ 5 → L
  H_MIN: 7, // sum ≥ 7 → H
  // sum = 6 → M
} as const;

/**
 * Level → 雷达图数值（0-100）
 *
 * v3：与 sumToScore 中点对齐——
 *   L 区间中点 sum=4 → score≈17
 *   M 仅 sum=6 → score=50
 *   H 区间中点 sum=8 → score≈83
 * 这样原型分数与用户实际分数在同一尺度上，连续距离才有意义。
 */
export const LEVEL_SCORES: Record<Level, number> = {
  L: 17,
  M: 50,
  H: 83,
};

/** Level → 距离计算用的 1/2/3 数值 */
export const LEVEL_VALUES: Record<Level, number> = {
  L: 1,
  M: 2,
  H: 3,
};

/** Level → 中文标签 */
export const LEVEL_LABELS: Record<Level, string> = {
  L: "低偏好",
  M: "中等",
  H: "高偏好",
};

/** Level → 档位简短描述（用于结果页"你的偏好画像"） */
export const LEVEL_BLURBS: Record<DimensionKey, Record<Level, string>> = {
  EN: {
    L: "节奏稳一点你才舒服，不太需要肾上腺素",
    M: "能炸能慢，看心情",
    H: "炸的歌让你瞬间活过来",
  },
  HV: {
    L: "干净温暖的音色更对味",
    M: "失真可以接受，但别一直堆",
    H: "越脏越重越带感",
  },
  RB: {
    L: "你不太需要靠摇滚来反叛什么",
    M: "对规则有意见，但不一定要喊出来",
    H: "带刺的歌词最对味",
  },
  EX: {
    L: "歌还是要听得懂、有抓手",
    M: "可以接受怪一点，但别太久",
    H: "怪、迷幻、抽象——越往边缘越上头",
  },
  CX: {
    L: "好听的副歌就够了",
    M: "细节多没关系，但要为表达服务",
    H: "结构精巧、每段有用意才过瘾",
  },
  EM: {
    L: "听歌主要听爽，不太关注情绪",
    M: "情绪到位会加分",
    H: "扎心歌词能让你反复循环",
  },
  RT: {
    L: "电子合成、新声音更对你胃口",
    M: "新旧都行，重点在歌本身",
    H: "经典老歌经得起反复听",
  },
  ST: {
    L: "你更享受一个人戴耳机的瞬间",
    M: "现场可以，但不必非要挤前排",
    H: "万人合唱才是现场的灵魂",
  },
};

export const STAGE_HINTS: Record<number, string> = {
  8: "音箱预热完成，失真开始加载",
  16: "你的摇滚轮廓正在成型",
  24: "准备生成你的摇滚人格",
};

export const ROCKTI_DISCLAIMER =
  "ROCKTI 结果基于你的音乐偏好、情绪表达方式和审美选择生成，仅用于娱乐和自我探索，不构成心理诊断或人格评估。";
