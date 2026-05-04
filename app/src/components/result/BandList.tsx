import type { RankedResult } from "../../types/rockti";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

type Props = {
  result: RankedResult;
};

export function BandList({ result }: Props) {
  return (
    <Card variant="paper" className="p-5">
      <h3 className="text-sm font-extrabold tracking-widest text-rockti-pink mb-4">
        ♫ 代表乐队
      </h3>
      <div className="space-y-4">
        <div>
          <div className="text-xs font-bold tracking-wider text-rockti-black/60 mb-2">
            国外
          </div>
          <div className="flex flex-wrap gap-2">
            {result.bandsGlobal.map((band) => (
              <Badge key={band} variant="black" size="sm">
                {band}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold tracking-wider text-rockti-black/60 mb-2">
            华语
          </div>
          <div className="flex flex-wrap gap-2">
            {result.bandsChinese.map((band) => (
              <Badge key={band} variant="pink" size="sm">
                {band}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
