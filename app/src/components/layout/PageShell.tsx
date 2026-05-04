import type { ReactNode } from "react";
import { cx } from "../../lib/utils";

type Props = {
  children: ReactNode;
  variant?: "paper" | "stage" | "grid";
  className?: string;
};

export function PageShell({ children, variant = "paper", className }: Props) {
  return (
    <div
      className={cx(
        "relative min-h-[100dvh] w-full",
        variant === "paper" && "bg-rockti-paper",
        variant === "grid" && "bg-paper-grid",
        variant === "stage" && "bg-stage text-rockti-paper",
        className,
      )}
    >
      {children}
    </div>
  );
}
