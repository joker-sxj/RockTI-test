import type { ReactNode } from "react";
import { cx } from "../../lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "pink" | "teal" | "yellow" | "purple" | "red" | "blue" | "black" | "paper";
  size?: "xs" | "sm" | "md";
};

const VARIANT_CLASS: Record<NonNullable<Props["variant"]>, string> = {
  pink: "bg-rockti-pink text-rockti-paper",
  teal: "bg-rockti-teal text-rockti-black",
  yellow: "bg-rockti-yellow text-rockti-black",
  purple: "bg-rockti-purple text-rockti-paper",
  red: "bg-rockti-red text-rockti-paper",
  blue: "bg-rockti-blue text-rockti-paper",
  black: "bg-rockti-black text-rockti-paper",
  paper: "bg-rockti-paper text-rockti-black",
};

const SIZE_CLASS: Record<NonNullable<Props["size"]>, string> = {
  xs: "px-2 py-0.5 text-[10px]",
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-1.5 text-sm",
};

export function Badge({ children, className, variant = "pink", size = "sm" }: Props) {
  return (
    <span
      className={cx(
        "inline-flex items-center justify-center font-bold tracking-wider",
        "border-2 border-rockti-black rounded-full whitespace-nowrap",
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
