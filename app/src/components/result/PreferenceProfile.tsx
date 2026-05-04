import type { DimensionLevels } from "../../types/rockti";
import { DIMENSIONS } from "../../types/rockti";
import { DIMENSION_LABELS, LEVEL_BLURBS, LEVEL_LABELS } from "../../data/dimensions";
import { Card } from "../ui/Card";
import { cx } from "../../lib/utils";

type Props = {
  levels: DimensionLevels;
};

const LEVEL_BG: Record<string, string> = {
  L: "bg-rockti-paper border-rockti-black/30",
  M: "bg-rockti-teal/30 border-rockti-teal",
  H: "bg-rockti-pink text-rockti-paper border-rockti-black",
};

const LEVEL_DOT: Record<string, string> = {
  L: "bg-rockti-black/30",
  M: "bg-rockti-teal",
  H: "bg-rockti-pink",
};

export function PreferenceProfile({ levels }: Props) {
  return (
    <Card variant="paper" className="p-5 sm:p-6">
      <h3 className="text-sm font-extrabold tracking-widest text-rockti-pink mb-4">
        ◆ 你的偏好画像
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {DIMENSIONS.map((dim) => {
          const lv = levels[dim];
          const meta = DIMENSION_LABELS[dim];
          return (
            <div
              key={dim}
              className={cx(
                "rounded-2xl border-2 p-3 transition-colors",
                LEVEL_BG[lv],
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={cx("inline-block w-2 h-2 rounded-full", LEVEL_DOT[lv])} />
                  <span className="font-extrabold text-sm">
                    {meta.name}
                  </span>
                </div>
                <span className="text-[10px] font-extrabold tracking-[0.2em] opacity-80">
                  {LEVEL_LABELS[lv]}
                </span>
              </div>
              <p className={cx("text-xs leading-relaxed", lv === "H" ? "text-rockti-paper/90" : "text-rockti-black/75")}>
                {LEVEL_BLURBS[dim][lv]}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
