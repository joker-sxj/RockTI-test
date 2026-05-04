import { forwardRef, useEffect, useState } from "react";
import type { DimensionScores, RocktiResult } from "../../types/rockti";
import { DIMENSIONS } from "../../types/rockti";
import { DIMENSION_LABELS, LEVEL_LABELS, ROCKTI_DISCLAIMER } from "../../data/dimensions";
import { topDimensions } from "../../lib/scoring";
import { generateQrCodeDataUrl } from "../../lib/share";
import { logoImageUrl } from "../../lib/utils";

type Props = {
  result: RocktiResult;
  shareUrl: string;
};

const POSTER_W = 1080;
const POSTER_H = 1350;
const RADAR_SIZE = 380;

/** 自定义 SVG 雷达图 — 不依赖 Recharts，html-to-image 截图时稳定 */
function PosterRadar({
  userScores,
  prototypeScores,
}: {
  userScores: DimensionScores;
  prototypeScores: DimensionScores;
}) {
  const cx = RADAR_SIZE / 2;
  const cy = RADAR_SIZE / 2;
  const r = RADAR_SIZE * 0.34;

  const angles = DIMENSIONS.map((_, i) => -Math.PI / 2 + (i * Math.PI) / 4);

  const point = (angle: number, ratio: number): [number, number] => [
    cx + Math.cos(angle) * r * ratio,
    cy + Math.sin(angle) * r * ratio,
  ];

  const polygonPoints = (scores: DimensionScores) =>
    DIMENSIONS.map((d, i) => {
      const [x, y] = point(angles[i], Math.max(0.04, (scores[d] || 0) / 100));
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");

  const ringPolygons = [0.25, 0.5, 0.75, 1].map((ratio) =>
    angles
      .map((a) => {
        const [x, y] = point(a, ratio);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" "),
  );

  return (
    <svg width={RADAR_SIZE} height={RADAR_SIZE} viewBox={`0 0 ${RADAR_SIZE} ${RADAR_SIZE}`}>
      {/* 4 圈八角网格 */}
      {ringPolygons.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="#111111"
          strokeOpacity={i === 3 ? 0.55 : 0.22}
          strokeWidth={i === 3 ? 3 : 1.5}
        />
      ))}
      {/* 8 条轴线 */}
      {DIMENSIONS.map((d, i) => {
        const [x, y] = point(angles[i], 1);
        return <line key={d} x1={cx} y1={cy} x2={x} y2={y} stroke="#111111" strokeOpacity={0.2} strokeWidth={1.5} />;
      })}
      {/* 原型轮廓（虚线） */}
      <polygon
        points={polygonPoints(prototypeScores)}
        fill="#111111"
        fillOpacity={0.08}
        stroke="#111111"
        strokeWidth={3}
        strokeDasharray="8 6"
      />
      {/* 用户实心 */}
      <polygon
        points={polygonPoints(userScores)}
        fill="#FF2E88"
        fillOpacity={0.45}
        stroke="#FF2E88"
        strokeWidth={5}
        strokeLinejoin="round"
      />
      {/* 用户顶点小圆 */}
      {DIMENSIONS.map((d, i) => {
        const [x, y] = point(angles[i], Math.max(0.04, (userScores[d] || 0) / 100));
        return (
          <circle
            key={d}
            cx={x}
            cy={y}
            r={6}
            fill="#FFD43B"
            stroke="#111111"
            strokeWidth={2.5}
          />
        );
      })}
      {/* 中心 */}
      <circle cx={cx} cy={cy} r={5} fill="#111111" />
      {/* 8 维标签 */}
      {DIMENSIONS.map((d, i) => {
        const [lx, ly] = point(angles[i], 1.22);
        return (
          <text
            key={d}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={20}
            fontWeight={900}
            fill="#111111"
          >
            {DIMENSION_LABELS[d].name}
          </text>
        );
      })}
    </svg>
  );
}

export const ShareCard = forwardRef<HTMLDivElement, Props>(({ result, shareUrl }, ref) => {
  const { primary, secondary, isHybrid, userScores, userLevels } = result;
  const [qrUrl, setQrUrl] = useState<string>("");
  const top3 = topDimensions(userScores, 3);

  useEffect(() => {
    let active = true;
    generateQrCodeDataUrl(shareUrl, 240).then((url) => {
      if (active) setQrUrl(url);
    });
    return () => {
      active = false;
    };
  }, [shareUrl]);

  // URL 显示用：去掉 protocol，简短
  const shortUrl = shareUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div
      ref={ref}
      className="relative overflow-hidden text-rockti-black"
      style={{
        width: POSTER_W,
        height: POSTER_H,
        background: `linear-gradient(135deg, ${primary.colors.primary} 0%, ${primary.colors.secondary} 100%)`,
        fontFamily: "var(--font-body)",
      }}
    >
      {/* 网格底纹 */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,17,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* 大星星装饰 */}
      <div
        className="absolute select-none pointer-events-none"
        style={{ top: 32, right: 80, fontSize: 80, color: "#11111122", transform: "rotate(-12deg)" }}
      >
        ✦
      </div>
      <div
        className="absolute select-none pointer-events-none"
        style={{ bottom: 320, right: 32, fontSize: 60, color: "#11111122", transform: "rotate(8deg)" }}
      >
        ★
      </div>
      <div
        className="absolute select-none pointer-events-none"
        style={{ top: 540, left: 30, fontSize: 50, color: "#11111122", transform: "rotate(-6deg)" }}
      >
        ⚡
      </div>

      {/* 装饰贴纸：右上 + 左下 */}
      <div
        className="absolute top-12 right-14 bg-rockti-yellow border-[6px] border-rockti-black rounded-3xl px-7 py-2.5 text-2xl font-extrabold shadow-[12px_12px_0_0_#111111]"
        style={{ transform: "rotate(6deg)" }}
      >
        ★ NEON GARAGE
      </div>
      {isHybrid && (
        <div
          className="absolute top-[510px] right-[38px] bg-rockti-paper border-[5px] border-rockti-black rounded-2xl px-5 py-1.5 text-lg font-extrabold shadow-[8px_8px_0_0_#111111]"
          style={{ transform: "rotate(-8deg)" }}
        >
          ✶ 混合人格
        </div>
      )}
      <div
        className="absolute bottom-[290px] left-12 bg-rockti-pink text-rockti-paper border-[5px] border-rockti-black rounded-2xl px-5 py-1.5 text-lg font-extrabold shadow-[8px_8px_0_0_#111111]"
        style={{ transform: "rotate(-5deg)" }}
      >
        AMP UP / TURN IT LOUD
      </div>

      <div className="relative z-10 h-full px-16 py-14 flex flex-col">
        {/* === Header === */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              src={logoImageUrl()}
              alt="ROCKTI"
              className="w-20 h-20 rounded-2xl border-[5px] border-rockti-black bg-rockti-paper object-cover shadow-[6px_6px_0_0_#111111]"
            />
            <div>
              <div className="text-3xl font-black tracking-[0.4em]">ROCKTI</div>
              <div className="text-base font-bold opacity-80 tracking-wider">摇滚人格测试 · v1.0</div>
            </div>
          </div>
        </div>

        {/* === 主标题区 === */}
        <div className="mt-9">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rockti-black text-rockti-paper px-5 py-2 rounded-full text-2xl font-extrabold tracking-wider">
              {primary.genre}
            </div>
            <div className="bg-rockti-paper border-[3px] border-rockti-black px-4 py-1.5 rounded-full text-lg font-extrabold">
              匹配度 {primary.match}%
            </div>
          </div>
          <h1
            className="font-black tracking-tight leading-[0.95]"
            style={{ fontSize: 130 }}
          >
            {primary.personaName}
          </h1>
          <p className="mt-5 text-2xl font-bold leading-snug max-w-[820px] opacity-90">
            {primary.tagline}
          </p>
        </div>

        {/* === 雷达 + Top Dim === */}
        <div className="mt-8 grid grid-cols-[auto_1fr] gap-8 items-center">
          <div className="bg-rockti-paper rounded-3xl border-[5px] border-rockti-black p-3 shadow-[8px_8px_0_0_#111111]">
            <PosterRadar userScores={userScores} prototypeScores={primary.prototypeScores} />
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-extrabold tracking-[0.3em] opacity-65 mb-2">
                你的核心维度
              </div>
              <div className="flex flex-col gap-2">
                {top3.map(({ dim }, i) => (
                  <div
                    key={dim}
                    className="flex items-center gap-3 bg-rockti-black text-rockti-paper rounded-2xl px-4 py-2 border-[3px] border-rockti-black"
                  >
                    <span className="text-rockti-yellow font-black text-2xl tabular-nums w-6">
                      {i + 1}
                    </span>
                    <span className="text-xl font-extrabold flex-1">
                      {DIMENSION_LABELS[dim].name}
                    </span>
                    <span className="bg-rockti-pink text-rockti-paper px-2.5 py-0.5 rounded-full text-sm font-extrabold tracking-wider">
                      {LEVEL_LABELS[userLevels[dim]]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {isHybrid && (
              <div className="bg-rockti-paper/85 border-[3px] border-rockti-black rounded-2xl p-3">
                <div className="text-[11px] tracking-[0.3em] font-extrabold opacity-70 mb-1">
                  HIDDEN B-SIDE
                </div>
                <div className="text-lg font-extrabold leading-tight">
                  也是「{secondary.personaName}」
                </div>
                <div className="text-xs opacity-80 mt-0.5">
                  {secondary.genre} · {secondary.match}%
                </div>
              </div>
            )}
          </div>
        </div>

        {/* === 洞察区 === */}
        <div className="mt-7 grid grid-cols-2 gap-4">
          <div className="bg-rockti-paper border-[3px] border-rockti-black rounded-2xl p-4">
            <div className="text-xs font-extrabold tracking-[0.25em] text-rockti-pink mb-2">
              ✓ 你的优势
            </div>
            <div className="text-sm font-bold leading-relaxed">
              {primary.strengths.slice(0, 3).map((s, i) => (
                <span key={s}>
                  {i > 0 && <span className="opacity-40 mx-1.5">·</span>}
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-rockti-paper border-[3px] border-rockti-black rounded-2xl p-4">
            <div className="text-xs font-extrabold tracking-[0.25em] text-rockti-red mb-2">
              ▶ 适合场景
            </div>
            <div className="text-sm font-bold leading-relaxed">
              {primary.scenes.slice(0, 3).map((s, i) => (
                <span key={s}>
                  {i > 0 && <span className="opacity-40 mx-1.5">·</span>}
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* === 代表乐队 === */}
        <div className="mt-4 bg-rockti-black text-rockti-paper rounded-2xl border-[3px] border-rockti-black p-4">
          <div className="text-xs font-extrabold tracking-[0.25em] text-rockti-yellow mb-2">
            ♫ 代表乐队
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm font-bold">
            <div>
              <span className="opacity-60 text-xs mr-2">海外</span>
              {primary.bandsGlobal.slice(0, 3).join(" · ")}
            </div>
            <div>
              <span className="opacity-60 text-xs mr-2">华语</span>
              {primary.bandsChinese.slice(0, 3).join(" · ")}
            </div>
          </div>
        </div>

        {/* === Footer：QR + URL + 免责 === */}
        <div className="mt-auto pt-6 grid grid-cols-[auto_1fr] gap-5 items-end">
          {qrUrl && (
            <div className="bg-rockti-paper p-2.5 rounded-2xl border-[4px] border-rockti-black shadow-[6px_6px_0_0_#111111] text-center">
              <img src={qrUrl} alt="" className="w-28 h-28" />
              <div className="mt-1 text-[10px] font-extrabold tracking-[0.2em]">
                扫码测一下
              </div>
            </div>
          )}
          <div className="space-y-1.5">
            <div className="text-base font-extrabold leading-tight">
              ✦ 你也来测一下你的摇滚人格
            </div>
            <div className="text-sm font-bold opacity-70 break-all">
              {shortUrl}
            </div>
            <div className="text-[11px] opacity-60 leading-relaxed font-bold">
              {ROCKTI_DISCLAIMER}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ShareCard.displayName = "ShareCard";
