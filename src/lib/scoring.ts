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
  return { EN: 0, HV: 0, RB: 0, EX: 0, CX: 0, EM: 0, RT: 0, ST: 0 };
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
      return { ...profile, distance, match: distanceToMatchScore(distance) };
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
