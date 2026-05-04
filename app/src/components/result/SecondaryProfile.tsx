import type { RankedResult } from "../../types/rockti";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { profileImageUrl } from "../../lib/utils";

type Props = {
  primary: RankedResult;
  secondary: RankedResult;
  isHybrid: boolean;
};

export function SecondaryProfile({ primary, secondary, isHybrid }: Props) {
  return (
    <Card variant="black" className="p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant={isHybrid ? "yellow" : "teal"} size="sm">
          {isHybrid ? "★ 隐藏副人格" : "★ 第二接近"}
        </Badge>
        <span className="text-xs font-bold tracking-wider text-rockti-paper/70">
          匹配度 {secondary.match}%
        </span>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-[3px] border-rockti-paper overflow-hidden bg-rockti-paper shrink-0">
          <img
            src={profileImageUrl(secondary.imageFile)}
            alt={secondary.genre}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-bold tracking-wider text-rockti-paper/60">
            {secondary.genre}
          </div>
          <h4 className="text-xl sm:text-2xl font-extrabold text-rockti-paper">
            {secondary.personaName}
          </h4>
          <p className="text-sm text-rockti-paper/85 leading-relaxed">
            {secondary.tagline}
          </p>
        </div>
      </div>
      {isHybrid && (
        <div className="mt-4 p-3 rounded-2xl bg-rockti-paper/10 text-sm text-rockti-paper/90 leading-relaxed">
          你是「<span className="font-extrabold text-rockti-yellow">{primary.personaName}</span>」
          和「<span className="font-extrabold text-rockti-teal">{secondary.personaName}</span>」的混合体——
          一只手在主舞台，一只手藏着另一种摇滚的私货。
        </div>
      )}
    </Card>
  );
}
