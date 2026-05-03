import { motion } from 'framer-motion'
import { ROCK_PROFILES } from '../data/rockProfiles'

interface HomePageProps {
  onStart: () => void
  hasResult: boolean
  onShowResult: () => void
}

export function HomePage({ onStart, hasResult, onShowResult }: HomePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-dvh flex flex-col items-center justify-center px-4 py-12 bg-stage-black"
    >
      {/* Background stickers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] text-6xl opacity-20 rotate-[-15deg]">🎸</div>
        <div className="absolute top-[20%] right-[8%] text-5xl opacity-15 rotate-[20deg]">⚡</div>
        <div className="absolute bottom-[15%] left-[10%] text-5xl opacity-20 rotate-[10deg]">🔥</div>
        <div className="absolute bottom-[25%] right-[5%] text-6xl opacity-15 rotate-[-10deg]">🎤</div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Logo */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-8xl md:text-9xl font-black text-hot-pink neon-glow mb-4 tracking-tight"
        >
          ROCKTI
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-paper-white mb-6"
        >
          24 道题，测出你的摇滚人格
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-paper-white/70 mb-8 max-w-xl mx-auto"
        >
          你是舞台中央的经典摇滚，还是低头调效果器的盯鞋灵魂？
          <br />
          通过声音、情绪、态度和舞台选择，找到你的专属摇滚类型。
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <button
            onClick={onStart}
            className="btn-press bg-hot-pink text-white text-xl font-bold px-10 py-4 rounded-3xl border-3 border-stage-black hover:bg-hot-pink/90 transition-colors"
          >
            🎸 开始测试
          </button>
          {hasResult && (
            <button
              onClick={onShowResult}
              className="btn-press bg-electric-teal text-stage-black text-xl font-bold px-10 py-4 rounded-3xl border-3 border-stage-black hover:bg-electric-teal/90 transition-colors"
            >
              📊 查看上次结果
            </button>
          )}
        </motion.div>

        {/* Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-paper-white/50 mb-10"
        >
          约 3–5 分钟完成 ｜ 16 种摇滚人格 ｜ 生成专属结果海报
        </motion.p>

        {/* Type Preview Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-10"
        >
          {ROCK_PROFILES.map((profile, i) => (
            <motion.div
              key={profile.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.05 }}
              className="flex flex-col items-center p-2 rounded-xl bg-stage-black/50 border border-paper-white/10 hover:border-hot-pink/50 transition-colors"
            >
              <div className="text-2xl mb-1">{profile.iconKeywords[0]}</div>
              <div className="text-xs text-paper-white/70 text-center leading-tight">
                {profile.personaName}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-paper-white/30 max-w-md mx-auto"
        >
          本测试仅用于音乐偏好探索与娱乐，不构成心理诊断。
        </motion.p>
      </div>
    </motion.div>
  )
}
