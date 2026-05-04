import {
  DIMENSIONS,
  type DimensionKey,
  type DimensionLevels,
  type DimensionScores,
  type Level,
  type Question,
  type RockProfile,
  type RocktiResult,
  type UserAnswerMap,
} from "../types/rockti";
import { LEVEL_SCORES, LEVEL_THRESHOLDS, LEVEL_VALUES } from "../data/dimensions";

/**
 * 评分算法 — 离散化曼哈顿距离版本
 *
 * 核心流程：
 *   1. 用户每题选 1/2/3 分（likert）
 *   2. 每维度 3 道题 → 维度总分 3-9
 *   3. 总分映射到档位 L (≤4) / M (5-7) / H (≥8)
 *   4. 用户档位向量与 16 个 prototype pattern 计算曼哈顿距离（max 16）
 *   5. similarity = (1 - distance / 16) * 100，clamp 到 [60, 99]
 */

export function emptyScores(): DimensionScores {
  return { EN: 0, HV: 0, RB: 0, EX: 0, CX: 0, EM: 0, RT: 0, ST: 0 };
}

function emptyLevels(): DimensionLevels {
  return { EN: "M", HV: "M", RB: "M", EX: "M", CX: "M", EM: "M", RT: "M", ST: "M" };
}

/** 累加每维度 likert 总分（3-9 范围） */
export function sumDimensionScores(
  questions: Question[],
  answers: UserAnswerMap,
): Record<DimensionKey, number> {
  const sums: Record<DimensionKey, number> = {
    EN: 0, HV: 0, RB: 0, EX: 0, CX: 0, EM: 0, RT: 0, ST: 0,
  };
  for (const q of questions) {
    const optionId = answers[q.id];
    if (!optionId) continue;
    const option = q.options.find((o) => o.id === optionId);
    if (!option) continue;
    sums[q.dim] += option.value;
  }
  return sums;
}

/** sum (3-9) → 档位 */
export function sumToLevel(sum: number): Level {
  if (sum <= LEVEL_THRESHOLDS.L_MAX) return "L";
  if (sum >= LEVEL_THRESHOLDS.H_MIN) return "H";
  return "M";
}

/** sum (3-9) → 0-100 标准化分（用于雷达图） */
export function sumToScore(sum: number): number {
  // 3-9 线性映射到 0-100；最低 3 → 0, 最高 9 → 100
  return Math.round(((sum - 3) / 6) * 100);
}

export function calculateUserLevels(
  questions: Question[],
  answers: UserAnswerMap,
): DimensionLevels {
  const sums = sumDimensionScores(questions, answers);
  const levels = emptyLevels();
  for (const dim of DIMENSIONS) {
    levels[dim] = sumToLevel(sums[dim]);
  }
  return levels;
}

export function calculateUserScores(
  questions: Question[],
  answers: UserAnswerMap,
): DimensionScores {
  const sums = sumDimensionScores(questions, answers);
  const scores = emptyScores();
  for (const dim of DIMENSIONS) {
    scores[dim] = sumToScore(sums[dim]);
  }
  return scores;
}

/** Pattern 字符串解析为档位对象 */
export function parsePattern(pattern: string): DimensionLevels {
  const result = emptyLevels();
  for (let i = 0; i < DIMENSIONS.length && i < pattern.length; i++) {
    const ch = pattern[i] as Level;
    result[DIMENSIONS[i]] = ch === "L" || ch === "M" || ch === "H" ? ch : "M";
  }
  return result;
}

/** Pattern 转 0-100 分数（雷达图叠加显示用） */
export function patternToScores(pattern: string): DimensionScores {
  const levels = parsePattern(pattern);
  const scores = emptyScores();
  for (const dim of DIMENSIONS) {
    scores[dim] = LEVEL_SCORES[levels[dim]];
  }
  return scores;
}

/** 曼哈顿距离 — 维度档位逐位绝对差之和 (0-16) */
export function getDistance(userLevels: DimensionLevels, protoPattern: string): number {
  const protoLevels = parsePattern(protoPattern);
  let sum = 0;
  for (const dim of DIMENSIONS) {
    const u = LEVEL_VALUES[userLevels[dim]];
    const p = LEVEL_VALUES[protoLevels[dim]];
    sum += Math.abs(u - p);
  }
  return sum;
}

/** 精确档位对齐数 (0-8) — distance 相同的 tiebreaker 用 */
export function getExactMatches(userLevels: DimensionLevels, protoPattern: string): number {
  const protoLevels = parsePattern(protoPattern);
  let count = 0;
  for (const dim of DIMENSIONS) {
    if (userLevels[dim] === protoLevels[dim]) count += 1;
  }
  return count;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** distance (0-16) → match score (60-99)。最近邻通常落在 80-99。 */
export function distanceToMatchScore(distance: number): number {
  const raw = Math.round((1 - distance / 16) * 100);
  return clamp(raw, 60, 99);
}

export function calculateRocktiResult(
  questions: Question[],
  profiles: RockProfile[],
  answers: UserAnswerMap,
): RocktiResult {
  const userScores = calculateUserScores(questions, answers);
  const userLevels = calculateUserLevels(questions, answers);

  const ranked = profiles
    .map((profile) => {
      const distance = getDistance(userLevels, profile.pattern);
      const exact = getExactMatches(userLevels, profile.pattern);
      const match = distanceToMatchScore(distance);
      return {
        ...profile,
        distance,
        exact,
        match,
        prototypeScores: patternToScores(profile.pattern),
      };
    })
    .sort((a, b) => {
      if (a.distance !== b.distance) return a.distance - b.distance;
      // 距离相同时，精确档位对齐数多的胜出（避免数组顺序决定结果）
      return b.exact - a.exact;
    });

  return {
    userScores,
    userLevels,
    primary: ranked[0],
    secondary: ranked[1],
    third: ranked[2],
    // 第一名第二名距离差 ≤ 2（即一个维度差两档或两个维度各差一档）触发混合人格
    isHybrid: ranked[1].distance - ranked[0].distance <= 2,
    completedAt: new Date().toISOString(),
  };
}

/** 找出用户得分最高的 3 个维度 */
export function topDimensions(scores: DimensionScores, n = 3) {
  return DIMENSIONS
    .map((dim) => ({ dim, score: scores[dim] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}
