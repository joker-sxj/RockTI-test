import { motion } from "framer-motion";
import { cx } from "../../lib/utils";

type Props = {
  /** 当前题号（1-based） */
  current: number;
  total: number;
  className?: string;
};

export function ProgressBar({ current, total, className }: Props) {
  const safe = Math.max(0, Math.min(total, current));
  const percent = (safe / total) * 100;

  // 阶段星星节点（题号 8、16、24）映射到比例位置
  const stars = [8, 16, 24]
    .filter((n) => n <= total)
    .map((n) => ({ n, pos: (n / total) * 100 }));

  return (
    <div className={cx("relative w-full", className)}>
      <div className="relative h-3 w-full rounded-full border-[3px] border-rockti-black bg-rockti-paper overflow-visible">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--color-rockti-pink) 0%, var(--color-rockti-yellow) 60%, var(--color-rockti-teal) 100%)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
        {/* 阶段星星 */}
        {stars.map(({ n, pos }) => {
          const reached = current >= n;
          return (
            <span
              key={n}
              className={cx(
                "absolute -top-2 -translate-x-1/2 text-base leading-none",
                "transition-transform duration-300",
                reached ? "scale-110" : "scale-90 opacity-60",
              )}
              style={{ left: `${pos}%` }}
              aria-hidden
            >
              <span className={cx("inline-block", reached && "drop-shadow-[0_0_6px_rgba(255,212,59,0.85)]")}>
                ★
              </span>
            </span>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs font-bold tabular-nums">
        <span className="font-[var(--font-num)]">
          {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="opacity-70">{Math.round(percent)}% 加载中</span>
      </div>
    </div>
  );
}
