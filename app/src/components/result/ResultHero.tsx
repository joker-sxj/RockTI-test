import { motion } from "framer-motion";
import type { RankedResult } from "../../types/rockti";
import { profileImageUrl, cx } from "../../lib/utils";
import { Badge } from "../ui/Badge";

type Props = {
  result: RankedResult;
  className?: string;
};

export function ResultHero({ result, className }: Props) {
  return (
    <div
      className={cx("relative overflow-hidden rounded-3xl border-[3px] border-rockti-black shadow-[var(--shadow-rockti-lg)]", className)}
      style={{
        background: `linear-gradient(135deg, ${result.colors.primary}, ${result.colors.secondary})`,
      }}
    >
      {/* 海报感网格 */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,17,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,.18) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* 装饰星 */}
      <div className="absolute top-4 left-4 text-2xl text-rockti-black/40 [animation:var(--animate-float-slow)]">
        ★
      </div>
      <div className="absolute top-8 right-6 text-xl text-rockti-black/40 [animation:var(--animate-float-fast)]">
        ✦
      </div>

      <div className="relative grid gap-5 sm:grid-cols-[1fr_auto] items-center p-5 sm:p-7">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="black" size="sm">{result.genre}</Badge>
            <Badge variant="paper" size="sm">匹配度 {result.match}%</Badge>
          </div>
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold leading-tight text-rockti-black tracking-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {result.personaName}
          </motion.h1>
          <p className="text-base sm:text-lg font-bold text-rockti-black/85 max-w-md">
            {result.tagline}
          </p>
        </div>

        <motion.div
          initial={{ scale: 0.85, rotate: -4, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          className="relative justify-self-center sm:justify-self-end"
        >
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl border-[3px] border-rockti-black overflow-hidden shadow-[var(--shadow-rockti)] bg-rockti-paper">
            <img
              src={profileImageUrl(result.imageFile)}
              alt={result.genre}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
