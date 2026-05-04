import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/utils";

type Variant = "pink" | "teal" | "yellow" | "ghost" | "black";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
};

const VARIANT_CLASS: Record<Variant, string> = {
  pink: "bg-rockti-pink text-rockti-paper",
  teal: "bg-rockti-teal text-rockti-black",
  yellow: "bg-rockti-yellow text-rockti-black",
  ghost: "bg-rockti-paper text-rockti-black",
  black: "bg-rockti-black text-rockti-paper",
};

const SIZE_CLASS: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-2xl",
  md: "px-6 py-3 text-base rounded-3xl",
  lg: "px-8 py-4 text-lg rounded-3xl",
};

export function Button({
  variant = "pink",
  size = "md",
  fullWidth = false,
  className,
  children,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cx(
        "relative inline-flex items-center justify-center font-extrabold tracking-wide select-none",
        "border-[3px] border-rockti-black shadow-[var(--shadow-rockti)]",
        "transition-all duration-150 ease-out",
        "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-rockti-lg)]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rockti-yellow/70",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[var(--shadow-rockti)]",
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        fullWidth && "w-full",
        className,
      )}
    >
      {children}
    </button>
  );
}
