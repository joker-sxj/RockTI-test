import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { DIMENSIONS, type DimensionScores } from "../../types/rockti";
import { DIMENSION_LABELS } from "../../data/dimensions";

type Props = {
  userScores: DimensionScores;
  prototypeScores?: DimensionScores;
  height?: number;
};

export function DimensionRadar({ userScores, prototypeScores, height = 280 }: Props) {
  const data = DIMENSIONS.map((dim) => ({
    dim,
    label: DIMENSION_LABELS[dim].name,
    you: userScores[dim],
    prototype: prototypeScores?.[dim] ?? 0,
  }));

  return (
    <div className="w-full" style={{ height }} aria-label="八维偏好雷达图">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="78%">
          <PolarGrid stroke="#111111" strokeOpacity={0.25} strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="label"
            tick={{
              fill: "#111111",
              fontSize: 12,
              fontWeight: 800,
            }}
          />
          {prototypeScores && (
            <Radar
              name="原型"
              dataKey="prototype"
              stroke="#111111"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="#111111"
              fillOpacity={0.06}
              isAnimationActive={true}
              animationDuration={900}
            />
          )}
          <Radar
            name="你"
            dataKey="you"
            stroke="#FF2E88"
            strokeWidth={3}
            fill="#FF2E88"
            fillOpacity={0.32}
            isAnimationActive={true}
            animationDuration={1100}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
