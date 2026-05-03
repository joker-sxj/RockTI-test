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
      className="min-h-dvh bg-stage-black noise-bg overflow-hidden"
    >
      {/* Atmospheric background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-hot-pink/6 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[400px] rounded-full bg-electric-teal/4 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-28">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.1 }}
            className="mb-8"
          >
            <img
              src={`${BASE}images/Rockti.png`}
              alt="RockTI"
              className="w-40 h-40 md:w-52 md:h-52 object-contain drop-shadow-[0_0_50px_rgba(255,46,136,0.35)]"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-6xl md:text-8xl font-black text-hot-pink neon-glow tracking-tighter mb-5"
          >
            ROCKTI
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-paper-white/70 mb-3 font-medium"
          >
            24 道题，测出你的摇滚人格
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm md:text-base text-paper-white/40 max-w-md leading-relaxed mb-12"
          >
            你是舞台中央的经典摇滚，还是低头调效果器的盯鞋灵魂？
            <br className="hidden md:block" />
            通过声音、情绪、态度和舞台选择，找到你的专属摇滚类型。
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <button
              onClick={onStart}
              className="btn-press bg-hot-pink text-white text-lg font-bold px-12 py-4 rounded-2xl border-2 border-hot-pink/40 hover:bg-hot-pink/90 transition-colors"
            >
              开始测试
            </button>
            {hasResult && (
              <button
                onClick={onShowResult}
                className="btn-press bg-electric-teal text-stage-black text-lg font-bold px-12 py-4 rounded-2xl border-2 border-electric-teal/40 hover:bg-electric-teal/90 transition-colors"
              >
                查看上次结果
              </button>
            )}
          </motion.div>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-3 text-xs text-paper-white/30"
          >
            <span>约 3-5 分钟</span>
            <span className="w-1 h-1 rounded-full bg-paper-white/15" />
            <span>16 种摇滚人格</span>
            <span className="w-1 h-1 rounded-full bg-paper-white/15" />
            <span>生成专属海报</span>
          </motion.div>
        </div>

        {/* Type Preview Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-center text-xs text-paper-white/25 mb-8 tracking-widest uppercase">16 种摇滚人格</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-5">
            {ROCK_PROFILES.map((profile, i) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.035, type: 'spring', stiffness: 180 }}
                className="group flex flex-col items-center"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden mb-2.5 border border-paper-white/[0.06] group-hover:border-hot-pink/40 group-hover:shadow-[0_0_15px_rgba(255,46,136,0.2)] transition-all duration-300">
                  <img
                    src={GENRE_IMAGES[profile.id]}
                    alt={profile.genre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] text-paper-white/40 group-hover:text-paper-white/70 transition-colors text-center leading-tight">
                  {profile.personaName}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-[10px] text-paper-white/15 mt-16"
        >
          本测试仅用于音乐偏好探索与娱乐，不构成心理诊断
        </motion.p>
      </div>
    </motion.div>
  )
}
