import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  value: number;
  className?: string;
};

export function MatchScore({ value, className }: Props) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, motionValue, rounded]);

  return (
    <div className={className}>
      <div className="text-xs tracking-[0.3em] font-bold text-rockti-black/60 mb-1">
        MATCH SCORE
      </div>
      <div className="flex items-baseline gap-1">
        <motion.span
          className="font-[var(--font-num)] text-7xl sm:text-8xl font-black tabular-nums leading-none text-rockti-pink neon-glow-pink"
          initial={{ scale: 0.85 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
        >
          {display}
        </motion.span>
        <span className="text-3xl font-extrabold text-rockti-black">%</span>
      </div>
    </div>
  );
}
