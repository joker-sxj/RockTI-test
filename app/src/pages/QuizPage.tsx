import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { QuestionCard } from "../components/quiz/QuestionCard";
import { StageHintModal } from "../components/quiz/StageHintModal";
import { PageShell } from "../components/layout/PageShell";
import { STAGE_HINTS } from "../data/dimensions";
import type { useRockti } from "../hooks/use-rockti";

type Props = {
  rockti: ReturnType<typeof useRockti>;
};

const SELECT_TO_ADVANCE_MS = 320;

export function QuizPage({ rockti }: Props) {
  const {
    index,
    total,
    currentQuestion,
    selectedOptionId,
    answer,
    next,
    prev,
    finish,
  } = rockti;

  const [hint, setHint] = useState<string | null>(null);
  // 防止 320ms 等待期内重复触发跳转；用户再选别的选项答案会更新但跳转不重复排队
  const advancingRef = useRef(false);

  if (!currentQuestion) return null;

  const isLast = index === total - 1;
  const answeredNumber = index + 1; // 1-based

  function commitAdvance() {
    advancingRef.current = false;
    if (isLast) {
      finish();
    } else {
      next();
    }
  }

  async function handleSelect(optionId: string) {
    // 答案总是更新，即使在 advancing 期间用户改主意
    answer(currentQuestion.id, optionId);

    if (advancingRef.current) return;
    advancingRef.current = true;

    // 给一点时间让用户看到选中高亮 + 闪电图标
    await new Promise<void>((r) => setTimeout(r, SELECT_TO_ADVANCE_MS));

    const stageText = STAGE_HINTS[answeredNumber];
    if (stageText) {
      // 阶段提示弹出，关闭回调里再推进
      setHint(stageText);
      return;
    }

    commitAdvance();
  }

  function handleHintClose() {
    setHint(null);
    commitAdvance();
  }

  function handlePrev() {
    advancingRef.current = false;
    setHint(null);
    prev();
  }

  return (
    <PageShell variant="grid">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 pt-6 sm:pt-10 pb-32 sm:pb-40">
        {/* 顶部：进度 */}
        <div className="mb-8">
          <ProgressBar current={index + 1} total={total} />
        </div>

        {/* 题卡 */}
        <QuestionCard
          question={currentQuestion}
          index={index}
          total={total}
          selectedOptionId={selectedOptionId}
          onSelect={handleSelect}
        />
      </div>

      {/* 底部固定操作栏：上一题 + 自动跳提示 */}
      <div className="fixed bottom-0 inset-x-0 z-30 border-t-[3px] border-rockti-black bg-rockti-paper/95 backdrop-blur supports-[backdrop-filter]:bg-rockti-paper/85">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="md"
            onClick={handlePrev}
            disabled={index === 0}
          >
            ← 上一题
          </Button>
          <div className="flex-1 text-center text-xs text-rockti-black/55 font-bold tracking-[0.2em] hidden sm:block">
            {isLast ? "选完即生成结果" : "选完自动进入下一题"}
          </div>
          <div className="flex-1 sm:hidden" />
          {/* 兜底按钮：用户改答案后想立刻去下一题 / 选完没等够 320ms 想自己点 */}
          <Button
            variant={isLast ? "yellow" : "pink"}
            size="md"
            onClick={() => {
              advancingRef.current = false;
              if (isLast) finish();
              else next();
            }}
            disabled={!selectedOptionId}
          >
            {isLast ? "★ 生成结果" : "下一题 →"}
          </Button>
        </div>
      </div>

      <StageHintModal
        open={hint !== null}
        text={hint ?? ""}
        onClose={handleHintClose}
      />
    </PageShell>
  );
}
