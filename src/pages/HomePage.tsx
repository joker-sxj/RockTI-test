import { motion } from 'framer-motion'
import { ROCK_PROFILES } from '../data/rockProfiles'

interface HomePageProps {
  onStart: () => void
  hasResult: boolean
  onShowResult: () => void
}

const BASE = import.meta.env.BASE_URL

const GENRE_IMAGES: Record<string, string> = {
  classic: `${BASE}images/经典摇滚.png`,
  hard: `${BASE}images/硬摇滚.png`,
  metal: `${BASE}images/重金属.png`,
  punk: `${BASE}images/朋克摇滚.png`,
  postPunk: `${BASE}images/后朋克.png`,
  prog: `${BASE}images/前卫摇滚.png`,
  psych: `${BASE}images/迷幻摇滚.png`,
  blues: `${BASE}images/布鲁斯摇滚.png`,
  folk: `${BASE}images/民谣摇滚.png`,
  alt: `${BASE}images/另类摇滚.png`,
  indie: `${BASE}images/独立摇滚.png`,
  grunge: `${BASE}images/垃圾摇滚.png`,
  britpop: `${BASE}images/英伦摇滚.png`,
  popPunk: `${BASE}images/流行朋克.png`,
  shoegaze: `${BASE}images/钉鞋摇滚.png`,
  postRock: `${BASE}images/后摇滚.png`,
}

export { GENRE_IMAGES }

export function HomePage({ onStart, hasResult, onShowResult }: HomePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-dvh bg-stage-black noise-bg flex flex-col items-center overflow-x-hidden"
    >
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-hot-pink/5 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[15%] w-[400px] h-[350px] rounded-full bg-electric-teal/4 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] flex flex-col">

        {/* ── Section 1: Title & Action ── */}
        <section className="flex flex-col items-center text-center px-6 pt-20 pb-14 md:pt-28 md:pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[2.5rem] md:text-[4rem] font-black text-hot-pink tracking-tighter leading-none mb-5"
            style={{ textShadow: '0 0 12px rgba(255,46,136,0.6), 0 0 36px rgba(255,46,136,0.3), 0 0 72px rgba(255,46,136,0.12)' }}
          >
            ROCKTI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-paper-white/70 font-medium mb-2 text-[1rem] md:text-[1.1rem]"
          >
            24 道题，测出你的摇滚人格
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-paper-white/40 max-w-[480px] leading-[1.5] mb-10 text-[0.9rem] md:text-[1rem]"
          >
            你是舞台中央的经典摇滚，还是低头调效果器的盯鞋灵魂？
            <br />
            通过声音、情绪、态度和舞台选择，找到你的专属摇滚类型。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={onStart}
              className="min-w-[44px] min-h-[44px] bg-hot-pink text-white font-bold rounded-xl border-2 border-hot-pink/40 transition-all duration-150
                         px-6 py-3 text-[0.95rem]
                         sm:px-6 sm:py-3
                         hover:bg-[#e0267a] hover:shadow-[0_0_20px_rgba(255,46,136,0.35)]
                         active:translate-y-[1px]"
              style={{ padding: '12px 24px' }}
            >
              开始测试
            </button>
            {hasResult && (
              <button
                onClick={onShowResult}
                className="min-w-[44px] min-h-[44px] bg-electric-teal text-stage-black font-bold rounded-xl border-2 border-electric-teal/40 transition-all duration-150
                           px-6 py-3 text-[0.95rem]
                           sm:px-6 sm:py-3
                           hover:bg-[#15b8ab] hover:shadow-[0_0_20px_rgba(24,209,194,0.35)]
                           active:translate-y-[1px]"
                style={{ padding: '12px 24px' }}
              >
                查看上次结果
              </button>
            )}
          </motion.div>
        </section>

        {/* ── Section 2: 16 Personality Grid ── */}
        <section className="px-6 pb-14 md:pb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-center text-[11px] text-paper-white/20 mb-6 tracking-[0.15em] uppercase"
          >
            16 种摇滚人格
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {/* Desktop: 8 cols, Tablet: 4 cols via responsive override */}
            <style>{`
              @media (min-width: 768px) {
                .persona-grid { grid-template-columns: repeat(4, 1fr) !important; }
              }
              @media (min-width: 1024px) {
                .persona-grid { grid-template-columns: repeat(8, 1fr) !important; }
              }
            `}</style>
            <div className="persona-grid grid gap-4">
              {ROCK_PROFILES.map((profile, i) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.03, type: 'spring', stiffness: 180 }}
                  className="group flex flex-col items-center"
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden border border-paper-white/[0.06] transition-all duration-250 group-hover:border-hot-pink/40 group-hover:shadow-[0_0_14px_rgba(255,46,136,0.18)] group-hover:scale-[1.06]">
                    <img
                      src={GENRE_IMAGES[profile.id]}
                      alt={profile.genre}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="mt-2 text-[11px] text-paper-white/40 group-hover:text-paper-white/70 transition-colors text-center leading-tight">
                    {profile.personaName}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Section 3: Footer ── */}
        <section className="px-6 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-3 text-[11px] text-paper-white/25 mb-5"
          >
            <span>约 3-5 分钟</span>
            <span className="w-1 h-1 rounded-full bg-paper-white/15" />
            <span>16 种摇滚人格</span>
            <span className="w-1 h-1 rounded-full bg-paper-white/15" />
            <span>生成专属海报</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-[10px] text-paper-white/12"
          >
            本测试仅用于音乐偏好探索与娱乐，不构成心理诊断
          </motion.p>
        </section>

      </div>
    </motion.div>
  )
}
