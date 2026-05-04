import { forwardRef, useEffect, useState } from "react";
import type { RocktiResult } from "../../types/rockti";
import { DIMENSION_LABELS, ROCKTI_DISCLAIMER } from "../../data/dimensions";
import { topDimensions } from "../../lib/scoring";
import { generateQrCodeDataUrl } from "../../lib/share";
import { profileImageUrl, logoImageUrl } from "../../lib/utils";

type Props = {
  result: RocktiResult;
  shareUrl: string;
};

export const ShareCard = forwardRef<HTMLDivElement, Props>(({ result, shareUrl }, ref) => {
  const { primary, userScores } = result;
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

  return (
    <div
      ref={ref}
      className="relative overflow-hidden text-rockti-black"
      style={{
        width: 1080,
        height: 1350,
        background: `linear-gradient(135deg, ${primary.colors.primary}, ${primary.colors.secondary})`,
        fontFamily: "var(--font-body)",
      }}
    >
      {/* 网格底纹 */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,17,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,.25) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* 装饰贴纸 */}
      <div className="absolute top-12 right-14 rotate-6 bg-rockti-yellow border-[6px] border-rockti-black rounded-3xl px-8 py-3 text-3xl font-extrabold shadow-[12px_12px_0_0_#111111]">
        ★ ROCKTI
      </div>
      <div className="absolute bottom-44 left-12 -rotate-6 bg-rockti-paper border-[6px] border-rockti-black rounded-3xl px-6 py-2 text-2xl font-extrabold shadow-[8px_8px_0_0_#111111]">
        AMP UP
      </div>

      <div className="relative z-10 h-full p-16 flex flex-col">
        {/* 头部 */}
        <div className="flex items-center gap-5">
          <img
            src={logoImageUrl()}
            alt="ROCKTI"
            crossOrigin="anonymous"
            className="w-24 h-24 rounded-2xl border-[6px] border-rockti-black bg-rockti-paper object-cover shadow-[6px_6px_0_0_#111111]"
          />
          <div>
            <div className="text-2xl font-extrabold tracking-[0.4em]">ROCKTI</div>
            <div className="text-base opacity-80 font-bold">摇滚人格测试</div>
          </div>
        </div>

        {/* 主结果 */}
        <div className="mt-10">
          <div className="inline-block bg-rockti-black text-rockti-paper px-5 py-2 rounded-full text-2xl font-extrabold tracking-wider mb-6">
            {primary.genre}
          </div>
          <h1 className="text-[110px] leading-[0.95] font-black tracking-tight">
            {primary.personaName}
          </h1>
          <p className="mt-6 text-3xl font-bold leading-snug max-w-[820px]">
            {primary.tagline}
          </p>
        </div>

        {/* 中间：插画 + 数据 */}
        <div className="mt-10 grid grid-cols-[auto_1fr] gap-12 items-center">
          <div className="w-72 h-72 rounded-3xl border-[8px] border-rockti-black bg-rockti-paper overflow-hidden shadow-[10px_10px_0_0_#111111]">
            <img
              src={profileImageUrl(primary.imageFile)}
              alt={primary.genre}
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-xl font-extrabold tracking-[0.3em] opacity-70 mb-2">
                MATCH SCORE
              </div>
              <div className="flex items-baseline gap-3">
                <span
                  className="text-[160px] leading-none font-black tabular-nums"
                  style={{ fontFamily: "var(--font-num)" }}
                >
                  {primary.match}
                </span>
                <span className="text-5xl font-extrabold">%</span>
              </div>
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-[0.3em] opacity-70 mb-3">
                TOP DIMENSIONS
              </div>
              <div className="flex flex-wrap gap-3">
                {top3.map(({ dim, score }) => (
                  <div
                    key={dim}
                    className="bg-rockti-black text-rockti-paper border-[5px] border-rockti-black rounded-2xl px-5 py-2 text-2xl font-extrabold"
                  >
                    {DIMENSION_LABELS[dim].name} · {score}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 底部：二维码 + 免责声明 */}
        <div className="mt-auto pt-10 grid grid-cols-[auto_1fr] gap-6 items-end">
          {qrUrl && (
            <div className="bg-rockti-paper p-3 rounded-2xl border-[5px] border-rockti-black shadow-[6px_6px_0_0_#111111]">
              <img src={qrUrl} alt="扫码测一下" className="w-32 h-32" />
              <div className="mt-1 text-center text-xs font-extrabold tracking-widest">
                扫码 · 测一下
              </div>
            </div>
          )}
          <div className="text-base opacity-80 leading-relaxed font-bold">
            {ROCKTI_DISCLAIMER}
          </div>
        </div>
      </div>
    </div>
  );
});

ShareCard.displayName = "ShareCard";
