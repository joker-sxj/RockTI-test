import { motion } from "framer-motion";
import { ROCK_PROFILES } from "../data/profiles";
import { ROCKTI_DISCLAIMER } from "../data/dimensions";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { PageShell } from "../components/layout/PageShell";
import { StickerLayer } from "../components/layout/StickerLayer";
import { logoImageUrl, profileImageUrl } from "../lib/utils";

type Props = {
  onStart: () => void;
};

export function HomePage({ onStart }: Props) {
  return (
    <PageShell variant="stage" className="overflow-hidden">
      <StickerLayer
        stickers={[
          { id: "live", text: "LIVE / LOUD", x: "5%", y: "10%", rotate: -10, color: "pink", size: "md", float: "slow" },
          { id: "amp", text: "AMP UP", x: "82%", y: "6%", rotate: 8, color: "yellow", size: "sm", float: "fast" },
          { id: "feedback", text: "FEEDBACK ★", x: "4%", y: "44%", rotate: 6, color: "teal", size: "sm", float: "fast" },
          { id: "noise", text: "NOISE OK", x: "84%", y: "40%", rotate: -6, color: "purple", size: "md", float: "slow" },
          { id: "stage", text: "MAIN STAGE", x: "8%", y: "75%", rotate: 4, color: "yellow", size: "sm", float: "fast" },
          { id: "encore", text: "★ ENCORE", x: "78%", y: "78%", rotate: -8, color: "pink", size: "md", float: "slow" },
        ]}
      />

      {/* 闪烁灯光 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-rockti-pink/40 to-transparent blur-sm" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-rockti-teal/40 to-transparent blur-sm" />
      </div>

      <div className="relative max-w-2xl mx-auto px-5 sm:px-6 pt-12 sm:pt-16 pb-16 flex flex-col">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, rotate: -3 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute -inset-3 bg-rockti-pink/40 rounded-full blur-2xl" />
            <img
              src={logoImageUrl()}
              alt="ROCKTI Logo"
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl border-[3px] border-rockti-paper bg-rockti-paper object-cover shadow-[6px_6px_0_0_#000000]"
            />
          </div>
        </motion.div>

        {/* 标题 */}
        <h1
          className="text-center text-6xl sm:text-7xl font-black tracking-[0.05em] mb-3 text-rockti-paper neon-glow-pink [animation:var(--animate-flicker)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ROCKTI
        </h1>
        <p className="text-center text-base sm:text-lg font-bold mb-2 text-rockti-yellow neon-glow-yellow">
          24 道题，测出你的摇滚人格
        </p>
        <p className="text-center text-sm sm:text-base text-rockti-paper/85 leading-relaxed mb-8 max-w-md mx-auto">
          你是舞台中央的<span className="text-rockti-pink font-extrabold">经典摇滚</span>，
          还是低头调效果器的<span className="text-rockti-teal font-extrabold">盯鞋灵魂</span>？
          通过声音、情绪、态度和舞台选择，找到你的专属摇滚类型。
        </p>

        {/* CTA */}
        <div className="flex justify-center mb-5">
          <Button
            variant="pink"
            size="lg"
            onClick={onStart}
            className="text-xl"
          >
            ▶ 开始测试
          </Button>
        </div>

        {/* 辅助信息 */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Badge variant="paper" size="sm">约 3–5 分钟</Badge>
          <Badge variant="teal" size="sm">16 种摇滚人格</Badge>
          <Badge variant="yellow" size="sm">专属结果海报</Badge>
        </div>

        {/* 16 类型预览 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-rockti-yellow text-xl">★</span>
            <h2 className="text-rockti-paper font-extrabold tracking-[0.25em] text-sm">
              16 种摇滚人格
            </h2>
            <div className="flex-1 h-px bg-rockti-paper/20" />
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {ROCK_PROFILES.map((profile, i) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.35 }}
                className="group"
              >
                <div className="aspect-square rounded-xl border-2 border-rockti-paper/80 overflow-hidden bg-rockti-paper transition-transform group-hover:-translate-y-0.5 group-hover:shadow-[3px_3px_0_0_var(--color-rockti-paper)]">
                  <img
                    src={profileImageUrl(profile.imageFile)}
                    alt={profile.genre}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-1 text-[10px] sm:text-xs font-bold text-rockti-paper/85 text-center truncate">
                  {profile.genre}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 免责声明 */}
        <p className="text-center text-xs text-rockti-paper/55 leading-relaxed max-w-md mx-auto">
          {ROCKTI_DISCLAIMER}
        </p>
      </div>
    </PageShell>
  );
}
