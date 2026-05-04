import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { RocktiResult, UserAnswerMap } from "../types/rockti";
import { QUESTIONS } from "../data/questions";
import { ROCK_PROFILES } from "../data/profiles";
import { calculateRocktiResult } from "../lib/scoring";
import {
  clearAll,
  loadAnswers,
  loadResult,
  saveAnswers,
  saveResult,
} from "../lib/storage";

export type Stage = "home" | "quiz" | "result";

type State = {
  stage: Stage;
  index: number;
  answers: UserAnswerMap;
  result: RocktiResult | null;
};

type Action =
  | { type: "GO_HOME" }
  | { type: "START_QUIZ" }
  | { type: "ANSWER"; questionId: string; optionId: string }
  | { type: "GOTO"; index: number }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "FINISH"; result: RocktiResult }
  | { type: "RESTART" }
  | { type: "HYDRATE"; payload: Partial<State> };

const initialState: State = {
  stage: "home",
  index: 0,
  answers: {},
  result: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "GO_HOME":
      return { ...state, stage: "home" };
    case "START_QUIZ":
      return { ...state, stage: "quiz", index: 0 };
    case "ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.optionId },
      };
    case "GOTO":
      return { ...state, index: Math.max(0, Math.min(QUESTIONS.length - 1, action.index)) };
    case "NEXT":
      return { ...state, index: Math.min(QUESTIONS.length - 1, state.index + 1) };
    case "PREV":
      return { ...state, index: Math.max(0, state.index - 1) };
    case "FINISH":
      return { ...state, stage: "result", result: action.result };
    case "RESTART":
      return { ...initialState };
    case "HYDRATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function useRockti() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 启动时从 localStorage 恢复
  useEffect(() => {
    const answers = loadAnswers();
    const result = loadResult();
    const payload: Partial<State> = {};
    if (Object.keys(answers).length > 0) payload.answers = answers;
    if (result) {
      payload.result = result;
      payload.stage = "result";
    }
    if (Object.keys(payload).length > 0) {
      dispatch({ type: "HYDRATE", payload });
    }
  }, []);

  // answers 持久化
  useEffect(() => {
    if (Object.keys(state.answers).length > 0) {
      saveAnswers(state.answers);
    }
  }, [state.answers]);

  const total = QUESTIONS.length;
  const currentQuestion = QUESTIONS[state.index];
  const selectedOptionId = currentQuestion ? state.answers[currentQuestion.id] : undefined;

  const answeredCount = useMemo(
    () => QUESTIONS.filter((q) => state.answers[q.id]).length,
    [state.answers],
  );
  const allAnswered = answeredCount === total;

  const goHome = useCallback(() => dispatch({ type: "GO_HOME" }), []);
  const startQuiz = useCallback(() => dispatch({ type: "START_QUIZ" }), []);
  const answer = useCallback(
    (questionId: string, optionId: string) =>
      dispatch({ type: "ANSWER", questionId, optionId }),
    [],
  );
  const next = useCallback(() => dispatch({ type: "NEXT" }), []);
  const prev = useCallback(() => dispatch({ type: "PREV" }), []);
  const goto = useCallback((index: number) => dispatch({ type: "GOTO", index }), []);

  const finish = useCallback(() => {
    const result = calculateRocktiResult(QUESTIONS, ROCK_PROFILES, state.answers);
    saveResult(result);
    dispatch({ type: "FINISH", result });
  }, [state.answers]);

  const restart = useCallback(() => {
    clearAll();
    dispatch({ type: "RESTART" });
  }, []);

  return {
    stage: state.stage,
    index: state.index,
    answers: state.answers,
    result: state.result,
    total,
    currentQuestion,
    selectedOptionId,
    answeredCount,
    allAnswered,
    goHome,
    startQuiz,
    answer,
    next,
    prev,
    goto,
    finish,
    restart,
  };
}
