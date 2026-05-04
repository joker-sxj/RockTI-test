import {
  DIMENSIONS,
  type DimensionKey,
  type DimensionLevels,
  type DimensionScores,
  type Level,
  type Question,
  type RankedResult,
  type RockProfile,
  type RocktiResult,
  type UserAnswerMap,
} from "../types/rockti";
import { LEVEL_SCORES, LEVEL_THRESHOLDS } from "../data/dimensions";

/**
 * 评分算法 v3 — 连续 0-100 分距离 + 多级 tiebreaker
 *
 * 修复 v2 的"经典摇滚永远胜出"bug：
 *   v2 把 sum 离散化成 L/M/H 后再算曼哈顿距离，M 区间太宽（sum 5-7），
 *   大量"温和型"用户向量都是 MMMMMMMM，多个原型同时距离最小，
 *   稳定排序让数组第一个的 classic 永远胜出。
 *
 * v3 改进：
 *   1. M 区间缩窄到 sum=6（见 dimensions.ts）—— 减少全 M 向量出现概率
 *   2. 距离主算法换成连续 0-100 分曼哈顿距离 —— 保留每分细节，几乎不平局
 *   3. tiebreaker 升级：连续曼哈顿 → 欧氏距离 → exact 档位匹配 → id 哈希
 *      绝不让 profiles.ts 数组顺序决定结果
 *
 * 流程：
 *   1. 用户每题选 1/2/3 分（likert）
 *   2. 每维度 3 道题 → 维度总分 3-9
 *   3. sumToScore 把 3-9 线性映射到 0-100
 *   4. 用户 0-100 分向量与 16 个 prototype 的 0-100 分向量算曼哈顿距离
 *   5. similarity = (1 - distance / 400) * 100，clamp 到 [60, 99]
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

/** sum (3-9) → 档位（v3：M 仅 sum=6） */
export function sumToLevel(sum: number): Level {
  if (sum <= LEVEL_THRESHOLDS.L_MAX) return "L";
  if (sum >= LEVEL_THRESHOLDS.H_MIN) return "H";
  return "M";
}

/** sum (3-9) → 0-100 标准化分（用于雷达图与连续距离计算） */
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

/** Pattern 转 0-100 分数（雷达图叠加显示与连续距离计算用） */
export function patternToScores(pattern: string): DimensionScores {
  const levels = parsePattern(pattern);
  const scores = emptyScores();
  for (const dim of DIMENSIONS) {
    scores[dim] = LEVEL_SCORES[levels[dim]];
  }
  return scores;
}

/**
 * 连续曼哈顿距离 — v3 主距离算法
 *
 * 用户每维度 0-100 分向量 vs prototype 0-100 分向量逐位绝对差之和。
 * 每维度差 0-100，8 维总差 0-800（实际典型 100-300）。
 *
 * 替代 v2 的离散 L/M/H 距离，避免大量平局。
 */
export function getDistance(userScores: DimensionScores, protoPattern: string): number {
  const protoScores = patternToScores(protoPattern);
  let sum = 0;
  for (const dim of DIMENSIONS) {
    sum += Math.abs(userScores[dim] - protoScores[dim]);
  }
  return sum;
}

/** 欧氏距离 — tiebreaker 用，比曼哈顿距离对"集中差异"更敏感 */
export function getEuclideanDistance(
  userScores: DimensionScores,
  protoPattern: string,
): number {
  const protoScores = patternToScores(protoPattern);
  let sum = 0;
  for (const dim of DIMENSIONS) {
    const diff = userScores[dim] - protoScores[dim];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

/** 离散档位对齐数 (0-8) — 二级 tiebreaker */
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

/**
 * 距离 → 匹配度 (60-99)
 *
 * v3 尺度：连续曼哈顿距离实际范围 0-800，但典型用户 100-300。
 *   distance=0   → match=99
 *   distance=200 → match=50 → clamp 到 60
 *   distance=400 → match=0  → clamp 到 60
 *
 * 让大部分人落在 70-95，避免全员都是 99% 或都是 60%。
 */
export function distanceToMatchScore(distance: number): number {
  const raw = Math.round((1 - distance / 400) * 100);
  return clamp(raw, 60, 99);
}

/** profile id → 32 位哈希，最后兜底 tiebreaker 用（避免数组顺序决定） */
function hashProfileId(id: string): number {
  let h = 2166136261; // FNV-1a 初值
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function calculateRocktiResult(
  questions: Question[],
  profiles: RockProfile[],
  answers: UserAnswerMap,
): RocktiResult {
  const userScores = calculateUserScores(questions, answers);
  const userLevels = calculateUserLevels(questions, answers);

  // 内部计算时多带一个 euclidean 字段做 tiebreaker，排序后剥离不暴露
  type Internal = RockProfile & {
    distance: number;
    euclidean: number;
    exact: number;
    match: number;
    prototypeScores: DimensionScores;
  };

  const internalRanked: Internal[] = profiles
    .map((profile) => {
      const distance = getDistance(userScores, profile.pattern);
      const euclidean = getEuclideanDistance(userScores, profile.pattern);
      const exact = getExactMatches(userLevels, profile.pattern);
      const match = distanceToMatchScore(distance);
      return {
        ...profile,
        distance,
        euclidean,
        exact,
        match,
        prototypeScores: patternToScores(profile.pattern),
      };
    })
    .sort((a, b) => {
      // 1) 连续曼哈顿距离（主排序，几乎不会平局）
      if (a.distance !== b.distance) return a.distance - b.distance;
      // 2) 欧氏距离（对"个别维度大差"更敏感）
      if (Math.abs(a.euclidean - b.euclidean) > 1e-6) return a.euclidean - b.euclidean;
      // 3) 离散档位精确匹配数（保留 v2 直觉）
      if (a.exact !== b.exact) return b.exact - a.exact;
      // 4) 兜底：profile id 哈希——绝不让 profiles 数组顺序决定胜者
      return hashProfileId(a.id) - hashProfileId(b.id);
    });

  // 剥离内部字段 euclidean，对外只暴露 RankedResult
  const ranked: RankedResult[] = internalRanked.map((item) => ({
    id: item.id,
    genre: item.genre,
    personaName: item.personaName,
    tagline: item.tagline,
    pattern: item.pattern,
    analysis: item.analysis,
    strengths: item.strengths,
    blindspots: item.blindspots,
    bandsGlobal: item.bandsGlobal,
    bandsChinese: item.bandsChinese,
    scenes: item.scenes,
    colors: item.colors,
    imageFile: item.imageFile,
    distance: item.distance,
    exact: item.exact,
    match: item.match,
    prototypeScores: item.prototypeScores,
  }));

  return {
    userScores,
    userLevels,
    primary: ranked[0],
    secondary: ranked[1],
    third: ranked[2],
    // v3 距离尺度变成 0-800，混合判定阈值相应调整为 30 分以内（约 3-4 档差异）
    isHybrid: ranked[1].distance - ranked[0].distance <= 30,
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
