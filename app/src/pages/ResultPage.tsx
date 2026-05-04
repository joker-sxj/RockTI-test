import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { RocktiResult } from "../types/rockti";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ResultHero } from "../components/result/ResultHero";
import { MatchScore } from "../components/result/MatchScore";
import { DimensionRadar } from "../components/result/DimensionRadar";
import { PreferenceProfile } from "../components/result/PreferenceProfile";
import { ProfileAnalysis } from "../components/result/ProfileAnalysis";
import { BandList } from "../components/result/BandList";
import { SceneList } from "../components/result/SceneList";
import { SecondaryProfile } from "../components/result/SecondaryProfile";
import { ShareCard } from "../components/result/ShareCard";
import { PageShell } from "../components/layout/PageShell";
import { ROCKTI_DISCLAIMER, DIMENSION_LABELS } from "../data/dimensions";
import { topDimensions } from "../lib/scoring";
import { downloadDataUrl, exportNodeToPng } from "../lib/share";

type Props = {
  result: RocktiResult;
  onRestart: () => void;
  onHome: () => void;
};

export function ResultPage({ result, onRestart, onHome }: Props) {
  const { primary, secondary, isHybrid, userScores, userLevels } = result;
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const top3 = topDimensions(userScores, 3);
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "https://rockti.app";

  const handleExport = useCallback(async () => {
    setExportError(null);
    setShowShareCard(true);
    setExporting(true);
    try {
      // 给 React 渲染海报节点 + QR 二维码生成的时间
      await new Promise((r) => setTimeout(r, 600));
      const node = shareCardRef.current;
      if (!node) throw new Error("海报节点未就绪，请重试");
      const dataUrl = await exportNodeToPng(node, {
        pixelRatio: 1,
        backgroundColor: primary.colors.primary,
      });
      downloadDataUrl(dataUrl, `rockti-${primary.id}.png`);
    } catch (err) {
      console.error("[share] export failed:", err);
      const msg = err instanceof Error ? err.message : "未知错误";
      setExportError(`海报生成失败（${msg}），可以截屏分享～`);
    } finally {
      setExporting(false);
    }
  }, [primary.colors.primary, primary.id]);

  return (
    <PageShell variant="grid">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-6 sm:pt-10 pb-16 space-y-6">
        {/* Top: 操作 */}
        <div className="flex items-center justify-between">
          <button
            onClick={onHome}
            className="text-sm font-bold tracking-wider text-rockti-black/60 hover:text-rockti-pink transition-colors"
          >
            ← ROCKTI
          </button>
          <Badge variant="black" size="xs">
            {new Date(result.completedAt).toLocaleDateString("zh-CN")}
          </Badge>
        </div>

        {/* Hero */}
        <ResultHero result={primary} />

        {/* 匹配度 + Top 维度 */}
        <Card variant="paper" className="p-5 sm:p-6 grid sm:grid-cols-[auto_1fr] gap-6 items-center">
          <MatchScore value={primary.match} />
          <div>
            <div className="text-xs tracking-[0.3em] font-bold text-rockti-black/60 mb-2">
              TOP DIMENSIONS
            </div>
            <div className="flex flex-wrap gap-2">
              {top3.map(({ dim, score }) => (
                <Badge key={dim} variant="black" size="md">
                  {DIMENSION_LABELS[dim].name} · {score}
                </Badge>
              ))}
            </div>
            <p className="mt-3 text-sm text-rockti-black/70 leading-relaxed">
              这三个维度是你最强的偏好信号——你的摇滚口味由它们说了算。
            </p>
          </div>
        </Card>

        {/* 雷达图 */}
        <Card variant="paper" className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-extrabold tracking-widest text-rockti-pink">
              ◆ 八维偏好雷达
            </h3>
            <div className="flex items-center gap-3 text-[11px] font-bold text-rockti-black/60">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-full bg-rockti-pink" />
                你
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-full border-2 border-dashed border-rockti-black bg-transparent" />
                {primary.genre} 原型
              </span>
            </div>
          </div>
          <DimensionRadar userScores={userScores} prototypeScores={primary.prototypeScores} height={320} />
        </Card>

        {/* 你的偏好画像 */}
        <PreferenceProfile levels={userLevels} />

        {/* 分析 + 优势/盲区 */}
        <ProfileAnalysis result={primary} />

        {/* 乐队 + 场景 */}
        <div className="grid gap-4 sm:grid-cols-2">
          <BandList result={primary} />
          <SceneList result={primary} />
        </div>

        {/* 副人格 */}
        <SecondaryProfile primary={primary} secondary={secondary} isHybrid={isHybrid} />

        {/* 分享 + 重新测试 */}
        <Card variant="black" className="p-5 sm:p-6">
          <h3 className="text-sm font-extrabold tracking-widest text-rockti-yellow mb-3">
            ★ 分享你的人格
          </h3>
          <p className="text-sm text-rockti-paper/85 leading-relaxed mb-4">
            生成一张 1080×1350 的专属海报，可以直接发朋友圈 / 小红书 / 微博。
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="pink"
              size="md"
              onClick={handleExport}
              disabled={exporting}
            >
              {exporting ? "正在生成..." : "📥 下载海报"}
            </Button>
            <Button variant="ghost" size="md" onClick={onRestart}>
              重新测试
            </Button>
          </div>
          {exportError && (
            <div className="mt-3 text-sm text-rockti-yellow">{exportError}</div>
          )}
        </Card>

        {/* 免责声明 */}
        <p className="text-xs text-rockti-black/55 leading-relaxed text-center max-w-md mx-auto pt-2">
          {ROCKTI_DISCLAIMER}
        </p>
      </div>

      {/* 隐藏的海报节点（仅用于截图） */}
      {showShareCard && (
        <motion.div
          aria-hidden
          className="fixed left-[-12000px] top-0 pointer-events-none"
          style={{ width: 1080, height: 1350 }}
        >
          <ShareCard ref={shareCardRef} result={result} shareUrl={shareUrl} />
        </motion.div>
      )}
    </PageShell>
  );
}
