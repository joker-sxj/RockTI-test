import { useEffect, useRef, useState } from "react";
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
  const lastShownStage = useRef<number>(-1);

  // 阶段提示触发：在用户答完第 8、16、24 题后跳出
  useEffect(() => {
    const answeredIndex = index + 1;
    if (
      selectedOptionId &&
      STAGE_HINTS[answeredIndex] &&
      lastShownStage.current !== answeredIndex
    ) {
      // 只在用户做出了选择 + 当前题号正好是阶段点 时显示
      lastShownStage.current = answeredIndex;
      setHint(STAGE_HINTS[answeredIndex]);
    }
  }, [index, selectedOptionId]);

  if (!currentQuestion) return null;

  const isLast = index === total - 1;
  const canContinue = !!selectedOptionId;

  function handlePrimary() {
    if (!canContinue) return;
    if (isLast) {
      finish();
    } else {
      next();
    }
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
          onSelect={(optionId) => answer(currentQuestion.id, optionId)}
        />
      </div>

      {/* 底部固定操作栏 */}
      <div className="fixed bottom-0 inset-x-0 z-30 border-t-[3px] border-rockti-black bg-rockti-paper/95 backdrop-blur supports-[backdrop-filter]:bg-rockti-paper/85">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="md"
            onClick={prev}
            disabled={index === 0}
          >
            ← 上一题
          </Button>
          <div className="flex-1" />
          <Button
            variant={isLast ? "yellow" : "pink"}
            size="md"
            onClick={handlePrimary}
            disabled={!canContinue}
          >
            {isLast ? "★ 生成我的摇滚人格" : "下一题 →"}
          </Button>
        </div>
      </div>

      <StageHintModal
        open={hint !== null}
        text={hint ?? ""}
        onClose={() => setHint(null)}
      />
    </PageShell>
  );
}
