import type { RocktiResult, UserAnswerMap } from "../types/rockti";

/**
 * Schema 版本号 — 每当 RocktiResult / UserAnswerMap 结构或文案语料发生
 * 与历史不兼容的变化时升级，启动时旧数据会被自动清空。
 */
const SCHEMA_VERSION = "2026-05-04-v2";

const KEYS = {
  ANSWERS: "rockti_answers",
  RESULT: "rockti_result",
  COMPLETED_AT: "rockti_last_completed_at",
  SCHEMA: "rockti_schema_version",
} as const;

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* quota / privacy mode — silently ignore */
  }
}

function safeRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/** 启动时调用一次：检查 schema，老版本数据全部清掉。 */
export function migrateOrReset(): void {
  const stored = safeGet(KEYS.SCHEMA);
  if (stored !== SCHEMA_VERSION) {
    safeRemove(KEYS.ANSWERS);
    safeRemove(KEYS.RESULT);
    safeRemove(KEYS.COMPLETED_AT);
    safeSet(KEYS.SCHEMA, SCHEMA_VERSION);
  }
}

export function loadAnswers(): UserAnswerMap {
  const raw = safeGet(KEYS.ANSWERS);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? (parsed as UserAnswerMap) : {};
  } catch {
    return {};
  }
}

export function saveAnswers(answers: UserAnswerMap): void {
  safeSet(KEYS.ANSWERS, JSON.stringify(answers));
}

export function clearAnswers(): void {
  safeRemove(KEYS.ANSWERS);
}

export function loadResult(): RocktiResult | null {
  const raw = safeGet(KEYS.RESULT);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as RocktiResult;
  } catch {
    return null;
  }
}

export function saveResult(result: RocktiResult): void {
  safeSet(KEYS.RESULT, JSON.stringify(result));
  safeSet(KEYS.COMPLETED_AT, result.completedAt);
}

export function clearResult(): void {
  safeRemove(KEYS.RESULT);
  safeRemove(KEYS.COMPLETED_AT);
}

export function clearAll(): void {
  clearAnswers();
  clearResult();
}
