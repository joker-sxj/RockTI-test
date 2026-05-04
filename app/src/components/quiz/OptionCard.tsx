import { motion } from "framer-motion";
import type { Option } from "../../types/rockti";
import { cx } from "../../lib/utils";

type Props = {
  option: Option;
  index: number;
  selected: boolean;
  onSelect: () => void;
};

const LABELS = ["A", "B", "C", "D", "E", "F"];

export function OptionCard({ option, index, selected, onSelect }: Props) {
  const label = LABELS[index] ?? String(index + 1);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98, y: 3 }}
      aria-pressed={selected}
      className={cx(
        "group relative w-full text-left",
        "flex items-start gap-3 sm:gap-4 p-4 sm:p-5",
        "border-[3px] border-rockti-black rounded-2xl sm:rounded-3xl",
        "transition-all duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rockti-yellow/70",
        selected
          ? "bg-rockti-pink text-rockti-paper shadow-[var(--shadow-rockti-lg)] -translate-y-0.5"
          : "bg-rockti-paper text-rockti-black shadow-[var(--shadow-rockti-sm)] hover:shadow-[var(--shadow-rockti)] hover:-translate-y-0.5 hover:border-rockti-teal",
      )}
    >
      {/* A/B/C/D 标签 */}
      <span
        className={cx(
          "shrink-0 inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10",
          "rounded-full border-[3px] border-rockti-black font-extrabold text-base",
          "transition-colors",
          selected
            ? "bg-rockti-yellow text-rockti-black"
            : "bg-rockti-paper text-rockti-black group-hover:bg-rockti-teal",
        )}
      >
        {label}
      </span>

      <span className="pt-1.5 sm:pt-2 text-base sm:text-lg leading-relaxed font-bold flex-1">
        {option.text}
      </span>

      {/* 选中闪电 */}
      {selected && (
        <motion.span
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="absolute -top-3 -right-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-rockti-yellow border-[3px] border-rockti-black shadow-[var(--shadow-rockti-sm)] text-rockti-black text-lg"
          aria-hidden
        >
          ⚡
        </motion.span>
      )}
    </motion.button>
  );
}
