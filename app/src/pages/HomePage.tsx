import { motion } from "framer-motion";
import { ROCK_PROFILES } from "../data/profiles";
import { ROCKTI_DISCLAIMER } from "../data/dimensions";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { PageShell } from "../components/layout/PageShell";

type Props = {
  onStart: () => void;
};

export function HomePage({ onStart }: Props) {
  return (
    <PageShell variant="stage" className="overflow-hidden">
      {/* 背景：旋转扫光 + 网格 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 大网格底纹 */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,249,239,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,249,239,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* 顶光 */}
        <motion.div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[140%] h-[420px] rounded-[50%] blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255, 46, 136, 0.55), rgba(139, 92, 246, 0.25) 45%, transparent 70%)",
          }}
          animate={{ x: ["-6%", "6%", "-6%"] }}
          transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
        />
        {/* 底光 */}
        <motion.div
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[140%] h-[380px] rounded-[50%] blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(24, 209, 194, 0.5), rgba(255, 212, 59, 0.18) 45%, transparent 70%)",
          }}
          animate={{ x: ["6%", "-6%", "6%"] }}
          transition={{ duration: 11, ease: "easeInOut", repeat: Infinity }}
        />
        {/* 横扫线 */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[140%] h-px bg-gradient-to-r from-transparent via-rockti-pink/40 to-transparent blur-[1px]" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[140%] h-px bg-gradient-to-r from-transparent via-rockti-teal/35 to-transparent blur-[1px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-5 sm:px-6 pt-16 sm:pt-24 pb-16 flex flex-col min-h-[100dvh]">
        {/* 头部小字 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3 text-rockti-paper/70 text-xs tracking-[0.5em] font-bold mb-6"
        >
          <span className="w-8 h-px bg-rockti-paper/30" />
          <span>NEON GARAGE</span>
          <span className="w-8 h-px bg-rockti-paper/30" />
        </motion.div>

        {/* 主 Logo 文字 */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="text-center text-7xl sm:text-[120px] font-black tracking-[0.04em] leading-none text-rockti-paper neon-glow-pink [animation:var(--animate-flicker)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ROCKTI
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-center text-rockti-yellow neon-glow-yellow text-base sm:text-xl font-bold tracking-wider mt-4"
        >
          24 道题 · 测出你的摇滚人格
        </motion.p>

        {/* 主标语 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm sm:text-base text-rockti-paper/80 leading-relaxed mt-5 mb-9 max-w-md mx-auto"
        >
          你是舞台中央的<span className="text-rockti-pink font-extrabold neon-glow-pink">经典摇滚</span>，
          还是低头调效果器的<span className="text-rockti-teal font-extrabold neon-glow-teal">盯鞋灵魂</span>？
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, type: "spring", stiffness: 220 }}
          className="flex justify-center mb-5"
        >
          <Button
            variant="pink"
            size="lg"
            onClick={onStart}
            className="text-xl px-10"
          >
            ▶ 开始测试
          </Button>
        </motion.div>

        {/* 辅助信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          <Badge variant="paper" size="sm">3–5 分钟</Badge>
          <Badge variant="teal" size="sm">16 种摇滚人格</Badge>
          <Badge variant="yellow" size="sm">专属海报</Badge>
        </motion.div>

        {/* 类型标签云（不是大图，是 pill）*/}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-rockti-yellow">★</span>
            <h2 className="text-rockti-paper/80 font-extrabold tracking-[0.3em] text-xs">
              你可能是这 16 种之一
            </h2>
            <div className="flex-1 h-px bg-rockti-paper/15" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {ROCK_PROFILES.map((profile, i) => (
              <motion.span
                key={profile.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.025 }}
                className="px-3 py-1.5 rounded-full border-2 border-rockti-paper/30 bg-rockti-paper/5 text-rockti-paper/80 text-xs font-bold tracking-wider hover:border-rockti-pink hover:text-rockti-pink transition-colors"
              >
                {profile.genre}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* 底部铭牌 */}
        <div className="mt-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-rockti-paper/40 text-xs tracking-[0.3em] font-bold">
              EST. 2026
            </span>
            <span className="text-rockti-paper/30">·</span>
            <span className="text-rockti-paper/40 text-xs tracking-[0.3em] font-bold">
              MADE FOR FUN
            </span>
          </div>
          <p className="text-center text-[11px] text-rockti-paper/45 leading-relaxed max-w-md mx-auto">
            {ROCKTI_DISCLAIMER}
          </p>
        </div>
      </div>
    </PageShell>
  );
}
