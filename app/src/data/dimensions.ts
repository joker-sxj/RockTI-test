import type { DimensionKey, DimensionScores } from "../types/rockti";

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

export const DIMENSION_LABELS: Record<DimensionKey, { name: string; short: string; description: string }> = {
  EN: { name: "能量唤醒", short: "EN", description: "对高能量、高速度、高刺激音乐的偏好" },
  HV: { name: "重度失真", short: "HV", description: "对重音色、低频、失真、压迫感的接受度" },
  RB: { name: "反叛冲动", short: "RB", description: "对反主流、反权威、直接表达的偏好" },
  EX: { name: "实验开放", short: "EX", description: "对怪异、迷幻、抽象、陌生声音的接受度" },
  CX: { name: "结构复杂", short: "CX", description: "对复杂编曲、奇拍、长结构、技术性的兴趣" },
  EM: { name: "情绪叙事", short: "EM", description: "对歌词、情绪、脆弱、故事表达的偏好" },
  RT: { name: "根源复古", short: "RT", description: "对经典、蓝调、木吉他、根源风格的偏好" },
  ST: { name: "舞台社交", short: "ST", description: "对合唱、互动、群体氛围、舞台人格的偏好" },
};

export const STAGE_HINTS: Record<number, string> = {
  8: "音箱预热完成，失真开始加载",
  16: "你的摇滚轮廓正在成型",
  24: "准备生成你的摇滚人格",
};

export const ROCKTI_DISCLAIMER =
  "ROCKTI 结果基于你的音乐偏好、情绪表达方式和审美选择生成，仅用于娱乐和自我探索，不构成心理诊断或人格评估。";
