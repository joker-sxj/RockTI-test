import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
} from 'recharts'
import html2canvas from 'html2canvas-pro'
import { DIMENSIONS } from '../types/rockti'
import type { RocktiResult, DimensionKey } from '../types/rockti'

interface ResultPageProps {
  result: RocktiResult
  onRestart: () => void
}

const DIMENSION_LABELS: Record<DimensionKey, string> = {
  EN: '能量唤醒',
  HV: '重度失真',
  RB: '反叛冲动',
  EX: '实验开放',
  CX: '结构复杂',
  EM: '情绪叙事',
  RT: '根源复古',
  ST: '舞台社交',
}

function getRadarData(scores: Record<string, number>) {
  return DIMENSIONS.map(dim => ({
    dimension: DIMENSION_LABELS[dim],
    value: scores[dim],
    fullMark: 100,
  }))
}

export function ResultPage({ result, onRestart }: ResultPageProps) {
  const { primary, secondary, third, isHybrid, userScores } = result
  const [showPoster, setShowPoster] = useState(false)
  const [posterUrl, setPosterUrl] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const posterRef = useRef<HTMLDivElement>(null)

  const radarData = getRadarData(userScores)

  const handleGeneratePoster = useCallback(async () => {
    if (!posterRef.current) return
    setGenerating(true)
    setShowPoster(true)

    await new Promise(r => setTimeout(r, 100))

    try {
      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: '#111111',
        scale: 2,
        useCORS: true,
      })
      const url = canvas.toDataURL('image/png')
      setPosterUrl(url)
    } catch (err) {
      console.error('Poster generation failed:', err)
    } finally {
      setGenerating(false)
    }
  }, [])

  const handleDownload = useCallback(() => {
    if (!posterUrl) return
    const a = document.createElement('a')
    a.href = posterUrl
    a.download = `rockti-${primary.id}-result.png`
    a.click()
  }, [posterUrl, primary.id])

  const handleShare = useCallback(async () => {
    if (navigator.share && posterUrl) {
      const blob = await (await fetch(posterUrl)).blob()
      const file = new File([blob], `rockti-${primary.id}.png`, { type: 'image/png' })
      try {
        await navigator.share({ title: `我是${primary.personaName}！`, text: primary.socialSignature, files: [file] })
      } catch {
        handleDownload()
      }
    } else {
      handleDownload()
    }
  }, [posterUrl, primary, handleDownload])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-dvh bg-stage-black text-paper-white pb-20"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-12 pb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-hot-pink/10 to-transparent pointer-events-none" />
        <div className="max-w-lg mx-auto text-center relative z-10">
          {/* Match badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-block bg-amp-yellow text-stage-black text-sm font-bold px-4 py-1 rounded-full mb-4"
          >
            匹配度 {primary.match}%
          </motion.div>

          {/* Genre icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150, delay: 0.3 }}
            className="text-7xl mb-4"
          >
            {primary.iconKeywords[0]}
          </motion.div>

          {/* Persona name */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-6xl font-black text-hot-pink neon-glow mb-2"
          >
            {primary.personaName}
          </motion.h1>

          {/* Genre */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-electric-teal font-bold mb-3"
          >
            {primary.genre}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-paper-white/70 italic"
          >
            "{primary.tagline}"
          </motion.p>

          {/* Hybrid indicator */}
          {isHybrid && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 inline-flex items-center gap-2 bg-purple-haze/20 border border-purple-haze/50 rounded-full px-4 py-2 text-sm"
            >
              <span>🔀</span>
              <span>混合型人格：{secondary.personaName} ({secondary.match}%)</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Personality Portrait */}
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto">
          <SectionTitle icon="🎭" title="你是谁" />
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-base leading-relaxed text-paper-white/90 bg-stage-black/50 border border-paper-white/10 rounded-2xl p-5"
          >
            {primary.personalityPortrait}
          </motion.p>
        </div>
      </section>

      {/* Core Traits */}
      <section className="px-4 py-4">
        <div className="max-w-lg mx-auto">
          <SectionTitle icon="🏷️" title="核心特质" />
          <div className="flex flex-wrap gap-2">
            {primary.coreTraits.map((trait, i) => (
              <motion.span
                key={trait}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1, type: 'spring' }}
                className="bg-hot-pink/20 border border-hot-pink/40 text-hot-pink px-4 py-2 rounded-full text-sm font-bold"
              >
                {trait}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Superpower & Weakness */}
      <section className="px-4 py-6">
        <div className="max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-electric-teal/10 border border-electric-teal/30 rounded-2xl p-5"
          >
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-electric-teal font-bold mb-2">超能力</h3>
            <p className="text-sm text-paper-white/80">{primary.superpower}</p>
          </motion.div>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="bg-danger-red/10 border border-danger-red/30 rounded-2xl p-5"
          >
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="text-danger-red font-bold mb-2">隐藏弱点</h3>
            <p className="text-sm text-paper-white/80">{primary.hiddenWeakness}</p>
          </motion.div>
        </div>
      </section>

      {/* Radar Chart */}
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto">
          <SectionTitle icon="📊" title="你的摇滚频谱" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-stage-black/50 border border-paper-white/10 rounded-2xl p-4"
          >
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#ffffff20" />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fill: '#FFF9EF', fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#ffffff40', fontSize: 10 }}
                />
                <Radar
                  name="你的得分"
                  dataKey="value"
                  stroke="#FF2E88"
                  fill="#FF2E88"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* Representative Scenes */}
      <section className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          <SectionTitle icon="🎬" title="代表场景" />
          <div className="space-y-3">
            {primary.representativeScenes.map((scene, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.3 + i * 0.15 }}
                className="flex gap-3 items-start bg-stage-black/50 border border-paper-white/10 rounded-xl p-4"
              >
                <span className="text-lg flex-shrink-0">{['🎸', '🎤', '🥁'][i] || '🎵'}</span>
                <p className="text-sm text-paper-white/80">{scene}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Life BGM */}
      <section className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          <SectionTitle icon="🎵" title="人生 BGM" />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="bg-gradient-to-r from-hot-pink/20 to-purple-haze/20 border border-hot-pink/30 rounded-2xl p-5 flex items-center gap-4"
          >
            <div className="text-4xl">🎶</div>
            <div>
              <p className="text-lg font-bold text-paper-white">{primary.lifeBgm.song}</p>
              <p className="text-sm text-paper-white/60">{primary.lifeBgm.artist}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Best Matches */}
      <section className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          <SectionTitle icon="🤝" title="最佳拍档" />
          <div className="space-y-3">
            {primary.bestMatches.map((match, i) => {
              const matchedProfile = [primary, secondary, third].find(p => p.id === match.type) || third
              return (
                <motion.div
                  key={match.type}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.6 + i * 0.1 }}
                  className="flex items-center gap-3 bg-stage-black/50 border border-paper-white/10 rounded-xl p-4"
                >
                  <span className="text-2xl">{matchedProfile.iconKeywords[0]}</span>
                  <div className="flex-1">
                    <p className="font-bold text-paper-white">{matchedProfile.personaName} · {matchedProfile.genre}</p>
                    <p className="text-sm text-paper-white/60">{match.reason}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Social Signature */}
      <section className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          <SectionTitle icon="📱" title="社交签名" />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="bg-amp-yellow/10 border border-amp-yellow/30 rounded-2xl p-5 text-center"
          >
            <p className="text-lg font-bold text-amp-yellow">{primary.socialSignature}</p>
          </motion.div>
        </div>
      </section>

      {/* Top 3 Results */}
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto">
          <SectionTitle icon="🏆" title="你的人格排名" />
          <div className="space-y-3">
            {[primary, secondary, third].map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2 + i * 0.15 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${
                  i === 0
                    ? 'bg-hot-pink/10 border-hot-pink/40'
                    : 'bg-stage-black/50 border-paper-white/10'
                }`}
              >
                <span className="text-3xl font-black text-amp-yellow w-8 text-center">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                </span>
                <span className="text-3xl">{p.iconKeywords[0]}</span>
                <div className="flex-1">
                  <p className="font-bold text-paper-white">{p.personaName}</p>
                  <p className="text-sm text-paper-white/60">{p.genre}</p>
                </div>
                <span className="text-lg font-black text-electric-teal">{p.match}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.3 }}
            onClick={handleGeneratePoster}
            className="btn-press bg-hot-pink text-white text-lg font-bold px-8 py-4 rounded-3xl border-3 border-stage-black"
          >
            🖼️ 生成分享海报
          </motion.button>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.4 }}
            onClick={onRestart}
            className="btn-press bg-electric-teal text-stage-black text-lg font-bold px-8 py-4 rounded-3xl border-3 border-stage-black"
          >
            🔄 重新测试
          </motion.button>
        </div>
      </section>

      {/* Share Poster Overlay */}
      {showPoster && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stage-black/90 backdrop-blur-sm p-4"
          onClick={() => setShowPoster(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-sm w-full"
            onClick={e => e.stopPropagation()}
          >
            {!generating && posterUrl ? (
              <div>
                <img src={posterUrl} alt="RockTI Result" className="w-full rounded-2xl shadow-2xl mb-4" />
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleShare}
                    className="btn-press bg-hot-pink text-white font-bold px-6 py-3 rounded-2xl border-3 border-stage-black"
                  >
                    📤 分享
                  </button>
                  <button
                    onClick={handleDownload}
                    className="btn-press bg-electric-teal text-stage-black font-bold px-6 py-3 rounded-2xl border-3 border-stage-black"
                  >
                    💾 保存
                  </button>
                  <button
                    onClick={() => setShowPoster(false)}
                    className="btn-press bg-paper-white/20 text-paper-white font-bold px-6 py-3 rounded-2xl border-3 border-stage-black"
                  >
                    关闭
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-4xl mb-4 animate-spin">⚡</div>
                <p className="text-paper-white/70">正在生成海报...</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Hidden Poster Template */}
      <div className="fixed -left-[9999px] top-0" style={{ width: 1080 }}>
        <div
          ref={posterRef}
          style={{
            width: 1080,
            height: 1350,
            background: 'linear-gradient(180deg, #111111 0%, #1a1a2e 50%, #111111 100%)',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'Noto Sans SC', sans-serif",
          }}
        >
          {/* Decorative elements */}
          <div style={{ position: 'absolute', top: 40, left: 50, opacity: 0.15, fontSize: 120 }}>🎸</div>
          <div style={{ position: 'absolute', top: 200, right: 60, opacity: 0.1, fontSize: 100 }}>⚡</div>
          <div style={{ position: 'absolute', bottom: 100, left: 80, opacity: 0.1, fontSize: 100 }}>🔥</div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, padding: '60px 80px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 30 }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: '#FF2E88', textShadow: '0 0 20px rgba(255,46,136,0.5)', letterSpacing: -2 }}>
                ROCKTI
              </div>
              <div style={{ fontSize: 18, color: '#18D1C2', marginTop: 8 }}>摇滚人格测试</div>
            </div>

            {/* Result */}
            <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 100, marginBottom: 20 }}>{primary.iconKeywords[0]}</div>
              <div style={{ fontSize: 56, fontWeight: 900, color: '#FF2E88', textShadow: '0 0 30px rgba(255,46,136,0.6)', marginBottom: 12 }}>
                {primary.personaName}
              </div>
              <div style={{ fontSize: 24, color: '#18D1C2', fontWeight: 700, marginBottom: 20 }}>
                {primary.genre} · 匹配度 {primary.match}%
              </div>
              <div style={{ fontSize: 20, color: '#FFF9EFcc', fontStyle: 'italic', marginBottom: 30, maxWidth: 700, margin: '0 auto 30px' }}>
                "{primary.tagline}"
              </div>

              {/* Core traits */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 30 }}>
                {primary.coreTraits.map(trait => (
                  <span key={trait} style={{
                    background: 'rgba(255,46,136,0.2)',
                    border: '1px solid rgba(255,46,136,0.4)',
                    color: '#FF2E88',
                    padding: '8px 24px',
                    borderRadius: 50,
                    fontSize: 18,
                    fontWeight: 700,
                  }}>
                    {trait}
                  </span>
                ))}
              </div>

              {/* Social signature */}
              <div style={{
                background: 'rgba(255,212,59,0.1)',
                border: '1px solid rgba(255,212,59,0.3)',
                borderRadius: 20,
                padding: '20px 40px',
                maxWidth: 700,
                margin: '0 auto',
              }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#FFD43B' }}>
                  {primary.socialSignature}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', color: '#FFF9EF60', fontSize: 16 }}>
              扫码测测你的摇滚人格 →
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <motion.h2
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center gap-2 text-xl font-bold text-paper-white mb-4"
    >
      <span>{icon}</span>
      <span>{title}</span>
    </motion.h2>
  )
}
