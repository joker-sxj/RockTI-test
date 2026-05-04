import { forwardRef, useEffect, useState } from "react";
import type { DimensionScores, RocktiResult } from "../../types/rockti";
import { DIMENSIONS } from "../../types/rockti";
import { DIMENSION_LABELS, LEVEL_LABELS, ROCKTI_DISCLAIMER } from "../../data/dimensions";
import { topDimensions } from "../../lib/scoring";
import { generateQrCodeDataUrl } from "../../lib/share";
import { profileImageUrl } from "../../lib/utils";

type Props = {
  result: RocktiResult;
  shareUrl: string;
};

const POSTER_W = 1080;
const POSTER_H = 1350;
const RADAR_SIZE = 300;

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
      {ringPolygons.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="#111111"
          strokeOpacity={i === 3 ? 0.55 : 0.22}
          strokeWidth={i === 3 ? 2 : 1.2}
        />
      ))}
      {DIMENSIONS.map((d, i) => {
        const [x, y] = point(angles[i], 1);
        return (
          <line key={d} x1={cx} y1={cy} x2={x} y2={y} stroke="#111111" strokeOpacity={0.18} strokeWidth={1.2} />
        );
      })}
      <polygon
        points={polygonPoints(prototypeScores)}
        fill="#111111"
        fillOpacity={0.08}
        stroke="#111111"
        strokeWidth={2}
        strokeDasharray="6 4"
      />
      <polygon
        points={polygonPoints(userScores)}
        fill="#FF2E88"
        fillOpacity={0.45}
        stroke="#FF2E88"
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      {DIMENSIONS.map((d, i) => {
        const [x, y] = point(angles[i], Math.max(0.04, (userScores[d] || 0) / 100));
        return (
          <circle key={d} cx={x} cy={y} r={4.5} fill="#FFD43B" stroke="#111111" strokeWidth={1.8} />
        );
      })}
      <circle cx={cx} cy={cy} r={3.5} fill="#111111" />
      {DIMENSIONS.map((d, i) => {
        const [lx, ly] = point(angles[i], 1.22);
        return (
          <text
            key={d}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={15}
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
  const shortUrl = shareUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  useEffect(() => {
    let active = true;
    generateQrCodeDataUrl(shareUrl, 200).then((url) => {
      if (active) setQrUrl(url);
    });
    return () => {
      active = false;
    };
  }, [shareUrl]);

  // 字号自适应（主图 280×280，留给文案 ~660px 宽）
  const personaLen = primary.personaName.length;
  const personaFontSize =
    personaLen <= 4 ? 104 : personaLen <= 5 ? 92 : personaLen <= 6 ? 80 : 70;

  // analysis 控制在 ~80 字内（line-clamp 兜底）
  const analysisText = primary.analysis;

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
        className="absolute inset-0 opacity-[0.16] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,17,1) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,1) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />

      {/* 装饰大水印 */}
      <div
        className="absolute pointer-events-none select-none font-black leading-none"
        style={{
          right: -32,
          bottom: 60,
          fontSize: 360,
          color: "#111111",
          opacity: 0.05,
          letterSpacing: "-0.04em",
        }}
      >
        ROCK
      </div>

      {/* 装饰星点 */}
      <div className="absolute top-[120px] right-[60px] text-[24px] font-black opacity-25 pointer-events-none">
        ✦
      </div>
      <div className="absolute top-[640px] left-[40px] text-[20px] font-black opacity-25 pointer-events-none">
        ★
      </div>
      <div className="absolute bottom-[260px] right-[44px] text-[18px] font-black opacity-25 pointer-events-none">
        ✶
      </div>

      <div
        className="relative z-10 h-full flex flex-col"
        style={{ padding: "44px 50px" }}
      >
        {/* === Header === */}
        <header className="flex items-end justify-between border-b-[3px] border-rockti-black/80 pb-3 shrink-0">
          <div>
            <div className="text-[42px] font-black tracking-[0.12em] leading-none">
              ROCKTI
            </div>
            <div className="mt-1.5 text-[12px] font-bold opacity-75 tracking-[0.2em]">
              ROCK PERSONALITY · 摇滚人格测试
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold opacity-65 tracking-[0.2em] leading-relaxed">
              EST. 2026
              <br />
              MADE FOR FUN
            </div>
            <div className="mt-2 inline-flex items-center gap-1 bg-rockti-black text-rockti-paper px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-[0.2em]">
              <span>#</span>
              <span>{primary.id.toUpperCase()}</span>
            </div>
          </div>
        </header>

        {/* === 主人格区：人格图 + 标题 === */}
        <section className="mt-5 grid grid-cols-[280px_1fr] gap-6 items-center shrink-0">
          {/* 人格图 + 浮标 */}
          <div className="relative">
            <div className="w-[280px] h-[280px] rounded-3xl border-[4px] border-rockti-black overflow-hidden bg-rockti-paper shadow-[8px_8px_0_0_#111111]">
              <img
                src={profileImageUrl(primary.imageFile)}
                alt={primary.genre}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            {/* 角标：匹配度 */}
            <div className="absolute -top-3 -right-3 bg-rockti-yellow border-[3px] border-rockti-black rounded-full w-[78px] h-[78px] flex flex-col items-center justify-center shadow-[3px_3px_0_0_#111111]">
              <div className="text-[10px] font-extrabold tracking-[0.15em] leading-none">
                MATCH
              </div>
              <div className="text-[26px] font-black leading-none mt-0.5 tabular-nums">
                {primary.match}
              </div>
            </div>
          </div>

          {/* 人格信息 */}
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-rockti-black text-rockti-paper px-4 py-1 rounded-full text-[16px] font-extrabold tracking-wider">
                {primary.genre}
              </span>
              {isHybrid ? (
                <span className="bg-rockti-pink text-rockti-paper border-[2.5px] border-rockti-black px-3.5 py-0.5 rounded-full text-[13px] font-extrabold">
                  ✶ 混合人格
                </span>
              ) : (
                <span className="bg-rockti-paper border-[2.5px] border-rockti-black px-3.5 py-0.5 rounded-full text-[13px] font-extrabold">
                  ROCK PERSONA
                </span>
              )}
            </div>
            <h1
              className="font-black tracking-tight leading-[0.95] truncate"
              style={{ fontSize: personaFontSize }}
            >
              {primary.personaName}
            </h1>
            <p className="mt-3 text-[19px] font-bold leading-snug opacity-90 line-clamp-3">
              {primary.tagline}
            </p>
          </div>
        </section>

        {/* === 关于你 / Analysis === */}
        <section className="mt-5 relative bg-rockti-paper border-[3px] border-rockti-black rounded-2xl px-5 py-4 shadow-[5px_5px_0_0_#111111] shrink-0">
          <div className="absolute -top-3 left-5 bg-rockti-pink text-rockti-paper px-3 py-0.5 rounded-full text-[10px] font-extrabold tracking-[0.25em] border-[2.5px] border-rockti-black">
            ABOUT YOU
          </div>
          <p className="text-[15px] font-bold leading-[1.55] text-rockti-black/90 line-clamp-3">
            {analysisText}
          </p>
        </section>

        {/* === 雷达 + Top Dim === */}
        <section className="mt-4 grid grid-cols-[auto_1fr] gap-5 items-stretch shrink-0">
          <div className="bg-rockti-paper rounded-3xl border-[4px] border-rockti-black p-2 shadow-[6px_6px_0_0_#111111] shrink-0">
            <PosterRadar userScores={userScores} prototypeScores={primary.prototypeScores} />
          </div>
          <div className="flex flex-col justify-center gap-2 min-w-0">
            <div className="text-[11px] font-extrabold tracking-[0.3em] opacity-70 mb-0.5">
              你的核心维度
            </div>
            {top3.map(({ dim }, i) => (
              <div
                key={dim}
                className="flex items-center gap-3 bg-rockti-black text-rockti-paper rounded-2xl px-4 py-2"
              >
                <span className="text-rockti-yellow font-black text-xl tabular-nums w-6 shrink-0">
                  {i + 1}
                </span>
                <span className="text-[16px] font-extrabold flex-1 truncate">
                  {DIMENSION_LABELS[dim].name}
                </span>
                <span className="bg-rockti-pink text-rockti-paper px-2.5 py-0.5 rounded-full text-[11px] font-extrabold tracking-wider shrink-0">
                  {LEVEL_LABELS[userLevels[dim]]}
                </span>
              </div>
            ))}
            {isHybrid && (
              <div className="bg-rockti-paper border-[2.5px] border-rockti-black rounded-2xl px-3.5 py-1.5 mt-0.5">
                <div className="text-[9px] tracking-[0.3em] font-extrabold opacity-70">
                  HIDDEN B-SIDE
                </div>
                <div className="text-[14px] font-extrabold leading-tight mt-0.5 truncate">
                  也是「{secondary.personaName}」 · {secondary.match}%
                </div>
              </div>
            )}
          </div>
        </section>

        {/* === 优势 + 场景 === */}
        <section className="mt-4 grid grid-cols-2 gap-3 shrink-0">
          <div className="bg-rockti-paper border-[2.5px] border-rockti-black rounded-2xl p-3.5">
            <div className="text-[10px] font-extrabold tracking-[0.25em] text-rockti-pink mb-1.5">
              ✓ 你的优势
            </div>
            <div className="text-[14px] font-bold leading-relaxed">
              {primary.strengths.slice(0, 3).join(" · ")}
            </div>
          </div>
          <div className="bg-rockti-paper border-[2.5px] border-rockti-black rounded-2xl p-3.5">
            <div className="text-[10px] font-extrabold tracking-[0.25em] text-rockti-blue mb-1.5">
              ▶ 适合场景
            </div>
            <div className="text-[14px] font-bold leading-relaxed">
              {primary.scenes.slice(0, 3).join(" · ")}
            </div>
          </div>
        </section>

        {/* === 代表乐队 === */}
        <section className="mt-3 bg-rockti-black text-rockti-paper rounded-2xl px-5 py-3 shrink-0">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[10px] font-extrabold tracking-[0.25em] text-rockti-yellow">
              ♫ 代表乐队
            </div>
            <div className="text-[9px] font-bold tracking-[0.25em] text-rockti-paper/40">
              REPRESENTATIVE BANDS
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-0.5 text-[13px] font-bold">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="opacity-55 text-[10px] tracking-wider w-7 shrink-0">海外</span>
              <span className="flex-1 truncate">
                {primary.bandsGlobal.slice(0, 3).join(" · ")}
              </span>
            </div>
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="opacity-55 text-[10px] tracking-wider w-7 shrink-0">华语</span>
              <span className="flex-1 truncate">
                {primary.bandsChinese.slice(0, 3).join(" · ")}
              </span>
            </div>
          </div>
        </section>

        {/* 小 spacer：留极小弹性，防止极端字号下挤压 footer */}
        <div className="flex-1 min-h-[8px] max-h-[28px]" />

        {/* === Footer：QR + URL + 免责 === */}
        <footer className="grid grid-cols-[auto_1fr] gap-4 items-end shrink-0 border-t-[3px] border-rockti-black/40 pt-3">
          {qrUrl && (
            <div className="bg-rockti-paper p-2 rounded-2xl border-[3px] border-rockti-black shadow-[4px_4px_0_0_#111111] text-center shrink-0">
              <img src={qrUrl} alt="" className="w-[100px] h-[100px] block" />
              <div className="mt-1 text-[9px] font-extrabold tracking-[0.2em]">
                扫码挑战
              </div>
            </div>
          )}
          <div className="space-y-1 min-w-0">
            <div className="text-[18px] font-black leading-tight">
              ✦ 你也来测一下你的摇滚人格
            </div>
            <div className="text-[13px] font-extrabold opacity-85 break-all">
              {shortUrl}
            </div>
            <div className="text-[9px] opacity-60 leading-snug font-bold">
              {ROCKTI_DISCLAIMER}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
});

ShareCard.displayName = "ShareCard";
