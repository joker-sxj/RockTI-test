import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cx } from "../../lib/utils";

type Sticker = {
  id: string;
  text: string;
  x: string;
  y: string;
  rotate: number;
  color: "pink" | "teal" | "yellow" | "purple" | "red" | "blue" | "black";
  size?: "sm" | "md" | "lg";
  float?: "slow" | "fast";
};

type Props = {
  stickers?: Sticker[];
  children?: ReactNode;
  className?: string;
};

const COLOR_CLASS: Record<Sticker["color"], string> = {
  pink: "bg-rockti-pink text-rockti-paper",
  teal: "bg-rockti-teal text-rockti-black",
  yellow: "bg-rockti-yellow text-rockti-black",
  purple: "bg-rockti-purple text-rockti-paper",
  red: "bg-rockti-red text-rockti-paper",
  blue: "bg-rockti-blue text-rockti-paper",
  black: "bg-rockti-black text-rockti-paper",
};

const SIZE_CLASS: Record<NonNullable<Sticker["size"]>, string> = {
  sm: "text-xs px-3 py-1",
  md: "text-sm px-4 py-1.5",
  lg: "text-base px-5 py-2",
};

const DEFAULT_STICKERS: Sticker[] = [
  { id: "rock", text: "★ ROCK", x: "5%", y: "12%", rotate: -8, color: "pink", size: "md", float: "slow" },
  { id: "amp", text: "AMP UP", x: "85%", y: "8%", rotate: 6, color: "yellow", size: "sm", float: "fast" },
  { id: "feedback", text: "FEEDBACK", x: "8%", y: "75%", rotate: 4, color: "teal", size: "sm", float: "fast" },
  { id: "loud", text: "LOUD", x: "88%", y: "82%", rotate: -10, color: "purple", size: "md", float: "slow" },
];

export function StickerLayer({ stickers, children, className }: Props) {
  const list = stickers ?? DEFAULT_STICKERS;
  return (
    <div className={cx("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {list.map((s) => (
        <motion.span
          key={s.id}
          className={cx(
            "absolute font-extrabold border-2 border-rockti-black rounded-2xl shadow-[var(--shadow-rockti-sm)]",
            "tracking-wider whitespace-nowrap",
            COLOR_CLASS[s.color],
            SIZE_CLASS[s.size ?? "md"],
            s.float === "fast" ? "[animation:var(--animate-float-fast)]" : "[animation:var(--animate-float-slow)]",
          )}
          style={{ left: s.x, top: s.y, "--tw-rotate": `${s.rotate}deg`, transform: `rotate(${s.rotate}deg)` } as React.CSSProperties}
        >
          {s.text}
        </motion.span>
      ))}
      {children}
    </div>
  );
}
