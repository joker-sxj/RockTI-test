export const DIMENSIONS = ["EN", "HV", "RB", "EX", "CX", "EM", "RT", "ST"] as const;

export type DimensionKey = (typeof DIMENSIONS)[number];

/** 用户 0-100 标准化分数，用于雷达图渲染 */
export type DimensionScores = Record<DimensionKey, number>;

/** 维度档位 — 离散化后的"低/中/高"偏好 */
export type Level = "L" | "M" | "H";

export type DimensionLevels = Record<DimensionKey, Level>;

export type OptionValue = 1 | 2 | 3;

export type Option = {
  id: string;
  text: string;
  /** 1 = 不认同 / 弱偏好；2 = 中立；3 = 认同 / 强偏好 */
  value: OptionValue;
};

/**
 * 每道题主测一个维度，用户 1-3 的 likert 分会累加到该维度。
 * 每个维度有 3 道题，所以维度总分范围是 3-9。
 */
export type Question = {
  id: string;
  text: string;
  dim: DimensionKey;
  options: Option[];
};

export type RockProfile = {
  id: string;
  genre: string;
  personaName: string;
  tagline: string;
  /** 8 字符 H/M/L pattern，按 DIMENSIONS 顺序：EN HV RB EX CX EM RT ST */
  pattern: string;
  analysis: string;
  strengths: string[];
  blindspots: string[];
  bandsGlobal: string[];
  bandsChinese: string[];
  scenes: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  imageFile: string;
};

export type RankedResult = RockProfile & {
  /** 用户向量与该 profile pattern 的连续 0-100 分曼哈顿距离 (0-800) */
  distance: number;
  /** 精确档位对齐数 (0-8) */
  exact: number;
  /** 匹配度 0-99 */
  match: number;
  /** Pattern 转回的 0-100 分（用于雷达图叠加显示原型轮廓） */
  prototypeScores: DimensionScores;
};

export type RocktiResult = {
  /** 用户每维度 0-100 标准化分（雷达图用） */
  userScores: DimensionScores;
  /** 用户每维度 L/M/H 档位（用于精确匹配 tiebreaker） */
  userLevels: DimensionLevels;
  primary: RankedResult;
  secondary: RankedResult;
  third: RankedResult;
  /** 第一名与第二名连续距离差 ≤ 30 时为混合人格 */
  isHybrid: boolean;
  completedAt: string;
};

export type UserAnswerMap = Record<string, string>;
