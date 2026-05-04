import type { ReactNode } from "react";
import { cx } from "../../lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "paper" | "pink" | "teal" | "yellow" | "black";
  hover?: boolean;
};

const VARIANT_CLASS: Record<NonNullable<Props["variant"]>, string> = {
  paper: "bg-rockti-paper text-rockti-black",
  pink: "bg-rockti-pink text-rockti-paper",
  teal: "bg-rockti-teal text-rockti-black",
  yellow: "bg-rockti-yellow text-rockti-black",
  black: "bg-rockti-black text-rockti-paper",
};

export function Card({ children, className, variant = "paper", hover = false }: Props) {
  return (
    <div
      className={cx(
        "border-[3px] border-rockti-black rounded-3xl shadow-[var(--shadow-rockti)]",
        "transition-all duration-200",
        hover && "hover:-translate-y-0.5 hover:shadow-[var(--shadow-rockti-lg)]",
        VARIANT_CLASS[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
