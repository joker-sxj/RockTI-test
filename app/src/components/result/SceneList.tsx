import type { RankedResult } from "../../types/rockti";
import { Card } from "../ui/Card";

type Props = {
  result: RankedResult;
};

export function SceneList({ result }: Props) {
  return (
    <Card variant="yellow" className="p-5">
      <h3 className="text-sm font-extrabold tracking-widest text-rockti-black mb-3">
        ▶ 适合场景
      </h3>
      <ul className="grid grid-cols-2 gap-2">
        {result.scenes.map((scene) => (
          <li
            key={scene}
            className="flex items-center gap-2 text-sm font-bold text-rockti-black"
          >
            <span className="shrink-0 inline-block w-1.5 h-1.5 bg-rockti-black rounded-full" />
            {scene}
          </li>
        ))}
      </ul>
    </Card>
  );
}
