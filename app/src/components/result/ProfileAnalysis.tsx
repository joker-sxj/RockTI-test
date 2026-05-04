import type { RankedResult } from "../../types/rockti";
import { Card } from "../ui/Card";

type Props = {
  result: RankedResult;
};

export function ProfileAnalysis({ result }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card variant="paper" className="p-5">
        <h3 className="text-sm font-extrabold tracking-widest text-rockti-pink mb-2">
          ◆ 详细分析
        </h3>
        <p className="text-base leading-relaxed text-rockti-black/85">
          {result.analysis}
        </p>
      </Card>
      <div className="grid gap-4">
        <Card variant="teal" className="p-5">
          <h3 className="text-sm font-extrabold tracking-widest text-rockti-black mb-3">
            ✓ 你的优势
          </h3>
          <ul className="space-y-1.5">
            {result.strengths.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm font-bold text-rockti-black">
                <span className="shrink-0 mt-0.5">⚡</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card variant="paper" className="p-5 border-rockti-red">
          <h3 className="text-sm font-extrabold tracking-widest text-rockti-red mb-3">
            ✗ 可能盲区
          </h3>
          <ul className="space-y-1.5">
            {result.blindspots.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm font-bold text-rockti-black/80">
                <span className="shrink-0 mt-0.5">!</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
