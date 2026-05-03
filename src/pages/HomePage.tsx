import { motion } from 'framer-motion'
import { ROCK_PROFILES } from '../data/rockProfiles'

interface HomePageProps {
  onStart: () => void
  hasResult: boolean
  onShowResult: () => void
}

const GENRE_IMAGES: Record<string, string> = {
  classic: '/images/经典摇滚.png',
  hard: '/images/硬摇滚.png',
  metal: '/images/重金属.png',
  punk: '/images/朋克摇滚.png',
  postPunk: '/images/后朋克.png',
  prog: '/images/前卫摇滚.png',
  psych: '/images/迷幻摇滚.png',
  blues: '/images/布鲁斯摇滚.png',
  folk: '/images/民谣摇滚.png',
  alt: '/images/另类摇滚.png',
  indie: '/images/独立摇滚.png',
  grunge: '/images/垃圾摇滚.png',
  britpop: '/images/英伦摇滚.png',
  popPunk: '/images/流行朋克.png',
  shoegaze: '/images/钉鞋摇滚.png',
  postRock: '/images/后摇滚.png',
}

export function HomePage({ onStart, hasResult, onShowResult }: HomePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-dvh flex flex-col items-center bg-stage-black noise-bg overflow-hidden"
    >
      {/* Atmospheric background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-hot-pink/8 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-electric-teal/5 blur-[100px]" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-purple-haze/5 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center px-4 pt-16 pb-12">
        {/* Logo Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.1 }}
          className="mb-6"
        >
          <img
            src="/images/Rockti.png"
            alt="RockTI"
            className="w-48 h-48 md:w-56 md:h-56 mx-auto object-contain drop-shadow-[0_0_40px_rgba(255,46,136,0.4)]"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="text-7xl md:text-8xl font-black text-hot-pink neon-glow mb-3 tracking-tighter"
        >
          ROCKTI
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-xl md:text-2xl font-bold text-paper-white/90 mb-4"
        >
          24 道题，测出你的摇滚人格
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-base text-paper-white/50 mb-10 max-w-md mx-auto leading-relaxed"
        >
          你是舞台中央的经典摇滚，还是低头调效果器的盯鞋灵魂？
          <br />
          通过声音、情绪、态度和舞台选择，找到你的专属摇滚类型。
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
        >
          <button
            onClick={onStart}
            className="btn-press bg-hot-pink text-white text-lg font-bold px-10 py-4 rounded-2xl border-2 border-hot-pink/50 hover:bg-hot-pink/90 transition-colors"
          >
            开始测试
          </button>
          {hasResult && (
            <button
              onClick={onShowResult}
              className="btn-press bg-electric-teal text-stage-black text-lg font-bold px-10 py-4 rounded-2xl border-2 border-electric-teal/50 hover:bg-electric-teal/90 transition-colors"
            >
              查看上次结果
            </button>
          )}
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex items-center justify-center gap-4 text-xs text-paper-white/40 mb-12"
        >
          <span>约 3-5 分钟</span>
          <span className="w-1 h-1 rounded-full bg-paper-white/20" />
          <span>16 种摇滚人格</span>
          <span className="w-1 h-1 rounded-full bg-paper-white/20" />
          <span>生成专属海报</span>
        </motion.div>

        {/* Type Preview Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="grid grid-cols-4 sm:grid-cols-8 gap-2"
        >
          {ROCK_PROFILES.map((profile, i) => (
            <motion.div
              key={profile.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.85 + i * 0.04, type: 'spring', stiffness: 200 }}
              className="group relative flex flex-col items-center p-2 rounded-xl bg-paper-white/[0.03] border border-paper-white/[0.06] hover:border-hot-pink/40 hover:bg-hot-pink/5 transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden mb-1.5 group-hover:scale-110 transition-transform">
                <img
                  src={GENRE_IMAGES[profile.id]}
                  alt={profile.genre}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="text-[10px] md:text-xs text-paper-white/50 group-hover:text-paper-white/80 transition-colors text-center leading-tight">
                {profile.personaName}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-[10px] text-paper-white/20 mt-10"
        >
          本测试仅用于音乐偏好探索与娱乐，不构成心理诊断
        </motion.p>
      </div>
    </motion.div>
  )
}
