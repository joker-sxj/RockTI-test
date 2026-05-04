import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type Props = {
  open: boolean;
  text: string;
  onClose: () => void;
};

export function StageHintModal({ open, text, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, 1900);
    return () => clearTimeout(timer);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="status"
          aria-live="polite"
        >
          <div className="absolute inset-0 bg-rockti-black/55" />
          {/* 舞台灯扫光 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-0 left-1/2 h-[180%] w-[60%] -translate-x-1/2 origin-top blur-2xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 212, 59, 0.55), rgba(255, 46, 136, 0.18) 60%, transparent)",
                animation: "var(--animate-stage-light)",
              }}
            />
          </div>
          <motion.div
            initial={{ scale: 0.7, rotate: -6, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="relative max-w-md w-full rounded-3xl bg-rockti-yellow border-[3px] border-rockti-black shadow-[var(--shadow-rockti-lg)] p-8 text-center"
          >
            <div className="text-xs tracking-[0.3em] font-bold text-rockti-black/70 mb-3">
              STAGE LIGHT
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold leading-tight text-rockti-black">
              {text}
            </p>
            <div className="mt-5 flex items-center justify-center gap-1 text-rockti-black/60 text-xs">
              <span>★</span>
              <span>触屏继续</span>
              <span>★</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
