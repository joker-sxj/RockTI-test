import { AnimatePresence, motion } from "framer-motion";
import type { Question } from "../../types/rockti";
import { OptionCard } from "./OptionCard";

type Props = {
  question: Question;
  index: number;
  total: number;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
};

export function QuestionCard({ question, index, total, selectedOptionId, onSelect }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -60 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="w-full"
      >
        <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-widest text-rockti-black/60">
          <span className="font-[var(--font-num)] text-rockti-pink text-base tabular-nums">
            Q{String(index + 1).padStart(2, "0")}
          </span>
          <span className="opacity-60">/ {String(total).padStart(2, "0")}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug mb-6 sm:mb-8 text-rockti-black">
          {question.text}
        </h2>
        <div className="grid gap-3 sm:gap-4">
          {question.options.map((option, i) => (
            <OptionCard
              key={option.id}
              option={option}
              index={i}
              selected={selectedOptionId === option.id}
              onSelect={() => onSelect(option.id)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
