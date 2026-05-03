import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
} from 'recharts'
import html2canvas from 'html2canvas-pro'
import { DIMENSIONS } from '../types/rockti'
import type { RocktiResult, DimensionKey, RankedResult } from '../types/rockti'

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
      setPosterUrl(canvas.toDataURL('image/png'))
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
      className="min-h-dvh bg-stage-black text-paper-white noise-bg pb-20"
    >
      {/* Hero Section with Genre Image */}
      <section className="relative overflow-hidden">
        {/* Genre image background */}
        <div className="absolute inset-0">
          <img
            src={GENRE_IMAGES[primary.id]}
            alt=""
            className="w-full h-full object-cover opacity-20 genre-image-mask"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stage-black/30 via-stage-black/70 to-stage-black" />
        </div>

        {/* Atmospheric glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-hot-pink/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 px-4 pt-14 pb-10">
          <div className="max-w-lg mx-auto text-center">
            {/* Match badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-block bg-amp-yellow/90 text-stage-black text-sm font-black px-5 py-1.5 rounded-full mb-5 tracking-wide"
            >
              匹配度 {primary.match}%
            </motion.div>

            {/* Genre image circle */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.3 }}
              className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-2xl overflow-hidden border-2 border-hot-pink/40 shadow-[0_0_30px_rgba(255,46,136,0.3)] mb-5"
            >
              <img src={GENRE_IMAGES[primary.id]} alt={primary.genre} className="w-full h-full object-cover" />
            </motion.div>

            {/* Persona name */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl font-black text-hot-pink neon-glow mb-2 tracking-tight"
            >
              {primary.personaName}
            </motion.h1>

            {/* Genre */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-electric-teal font-bold mb-3"
            >
              {primary.genre}
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-base text-paper-white/60 italic max-w-sm mx-auto"
            >
              "{primary.tagline}"
            </motion.p>

            {/* Hybrid indicator */}
            {isHybrid && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-4 inline-flex items-center gap-2 bg-purple-haze/15 border border-purple-haze/30 rounded-full px-4 py-2 text-sm"
              >
                <span className="text-base">🔀</span>
                <span className="text-purple-haze">混合型：{secondary.personaName} ({secondary.match}%)</span>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Personality Portrait */}
      <SectionWrapper delay={0.8}>
        <SectionTitle icon="🎭" title="你是谁" />
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm leading-relaxed text-paper-white/80">{primary.personalityPortrait}</p>
        </div>
      </SectionWrapper>

      {/* Core Traits */}
      <SectionWrapper delay={0.9}>
        <SectionTitle icon="🏷️" title="核心特质" />
        <div className="flex flex-wrap gap-2">
          {primary.coreTraits.map((trait, i) => (
            <motion.span
              key={trait}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 + i * 0.08, type: 'spring' }}
              className="bg-hot-pink/10 border border-hot-pink/30 text-hot-pink px-3.5 py-1.5 rounded-full text-sm font-bold"
            >
              {trait}
            </motion.span>
          ))}
        </div>
      </SectionWrapper>

      {/* Superpower & Weakness */}
      <SectionWrapper delay={1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-electric-teal/[0.06] border border-electric-teal/20 rounded-2xl p-4"
          >
            <div className="text-xl mb-2">⚡</div>
            <h3 className="text-electric-teal font-bold text-sm mb-1.5">超能力</h3>
            <p className="text-xs text-paper-white/70 leading-relaxed">{primary.superpower}</p>
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.05 }}
            className="bg-danger-red/[0.06] border border-danger-red/20 rounded-2xl p-4"
          >
            <div className="text-xl mb-2">🎯</div>
            <h3 className="text-danger-red font-bold text-sm mb-1.5">隐藏弱点</h3>
            <p className="text-xs text-paper-white/70 leading-relaxed">{primary.hiddenWeakness}</p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Radar Chart */}
      <SectionWrapper delay={1.1}>
        <SectionTitle icon="📊" title="你的摇滚频谱" />
        <div className="glass-card rounded-2xl p-3">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="65%">
              <PolarGrid stroke="#ffffff10" />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: '#FFF9EF', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="得分" dataKey="value" stroke="#FF2E88" fill="#FF2E88" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </SectionWrapper>

      {/* Representative Scenes */}
      <SectionWrapper delay={1.2}>
        <SectionTitle icon="🎬" title="代表场景" />
        <div className="space-y-2.5">
          {primary.representativeScenes.map((scene, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="flex gap-3 items-start glass-card rounded-xl p-3.5"
            >
              <span className="text-base flex-shrink-0 mt-0.5">{['🎸', '🎤', '🥁'][i] || '🎵'}</span>
              <p className="text-xs text-paper-white/70 leading-relaxed">{scene}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Life BGM */}
      <SectionWrapper delay={1.4}>
        <SectionTitle icon="🎵" title="人生 BGM" />
        <div className="bg-gradient-to-r from-hot-pink/10 to-purple-haze/10 border border-hot-pink/20 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-hot-pink/20 flex items-center justify-center text-2xl flex-shrink-0">
            🎶
          </div>
          <div>
            <p className="font-bold text-paper-white text-sm">{primary.lifeBgm.song}</p>
            <p className="text-xs text-paper-white/50">{primary.lifeBgm.artist}</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Bands Section */}
      <SectionWrapper delay={1.5}>
        <SectionTitle icon="🎸" title="代表乐队" />
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card rounded-2xl p-4">
            <h4 className="text-xs text-electric-teal font-bold mb-2.5 uppercase tracking-wider">国际</h4>
            <div className="space-y-1.5">
              {primary.bandsGlobal.slice(0, 3).map(band => (
                <p key={band} className="text-sm text-paper-white/80">{band}</p>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <h4 className="text-xs text-hot-pink font-bold mb-2.5 uppercase tracking-wider">国内</h4>
            <div className="space-y-1.5">
              {primary.bandsChinese.slice(0, 3).map(band => (
                <p key={band} className="text-sm text-paper-white/80">{band}</p>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Best Matches */}
      <SectionWrapper delay={1.6}>
        <SectionTitle icon="🤝" title="最佳拍档" />
        <div className="space-y-2.5">
          {primary.bestMatches.map((match, i) => {
            const matchedProfile = findProfile([primary, secondary, third], match.type)
            return (
              <motion.div
                key={match.type}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6 + i * 0.08 }}
                className="flex items-center gap-3 glass-card rounded-xl p-3.5"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={GENRE_IMAGES[match.type]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-paper-white">{matchedProfile.personaName} · {matchedProfile.genre}</p>
                  <p className="text-xs text-paper-white/50 truncate">{match.reason}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </SectionWrapper>

      {/* Social Signature */}
      <SectionWrapper delay={1.8}>
        <SectionTitle icon="📱" title="社交签名" />
        <div className="bg-amp-yellow/[0.06] border border-amp-yellow/20 rounded-2xl p-4 text-center">
          <p className="text-base font-bold text-amp-yellow neon-glow-yellow">{primary.socialSignature}</p>
        </div>
      </SectionWrapper>

      {/* Top 3 Results */}
      <SectionWrapper delay={1.9}>
        <SectionTitle icon="🏆" title="你的人格排名" />
        <div className="space-y-2.5">
          {[primary, secondary, third].map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.9 + i * 0.1 }}
              className={`flex items-center gap-3 p-3.5 rounded-xl border ${
                i === 0 ? 'bg-hot-pink/[0.08] border-hot-pink/30' : 'glass-card'
              }`}
            >
              <span className="text-2xl w-8 text-center">{['🥇', '🥈', '🥉'][i]}</span>
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                <img src={GENRE_IMAGES[p.id]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{p.personaName}</p>
                <p className="text-xs text-paper-white/50">{p.genre}</p>
              </div>
              <span className="text-base font-black text-electric-teal">{p.match}%</span>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Action Buttons */}
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.2 }}
            onClick={handleGeneratePoster}
            className="btn-press bg-hot-pink text-white text-base font-bold px-8 py-3.5 rounded-2xl border-2 border-hot-pink/50"
          >
            生成分享海报
          </motion.button>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.3 }}
            onClick={onRestart}
            className="btn-press bg-electric-teal text-stage-black text-base font-bold px-8 py-3.5 rounded-2xl border-2 border-electric-teal/50"
          >
            重新测试
          </motion.button>
        </div>
      </section>

      {/* Share Poster Overlay */}
      {showPoster && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stage-black/95 backdrop-blur-lg p-4"
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
                  <button onClick={handleShare} className="btn-press bg-hot-pink text-white font-bold px-5 py-2.5 rounded-xl text-sm border-2 border-hot-pink/50">
                    分享
                  </button>
                  <button onClick={handleDownload} className="btn-press bg-electric-teal text-stage-black font-bold px-5 py-2.5 rounded-xl text-sm border-2 border-electric-teal/50">
                    保存
                  </button>
                  <button onClick={() => setShowPoster(false)} className="btn-press bg-paper-white/10 text-paper-white font-bold px-5 py-2.5 rounded-xl text-sm border-2 border-paper-white/10">
                    关闭
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-4xl mb-4 animate-pulse">⚡</div>
                <p className="text-paper-white/50 text-sm">正在生成海报...</p>
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
            width: 1080, height: 1350,
            background: 'linear-gradient(180deg, #111111 0%, #1a0a1e 30%, #0a1a1e 70%, #111111 100%)',
            position: 'relative', overflow: 'hidden',
            fontFamily: "'Noto Sans SC', sans-serif",
          }}
        >
          {/* Decorative glows */}
          <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(255,46,136,0.15), transparent)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: -50, left: '30%', width: 400, height: 300, background: 'radial-gradient(ellipse, rgba(24,209,194,0.1), transparent)', borderRadius: '50%' }} />

          <div style={{ position: 'relative', zIndex: 1, padding: '50px 70px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 30 }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: '#FF2E88', textShadow: '0 0 20px rgba(255,46,136,0.5)', letterSpacing: -2 }}>ROCKTI</div>
              <div style={{ fontSize: 16, color: '#18D1C2', marginTop: 6, letterSpacing: 4 }}>摇滚人格测试</div>
            </div>

            {/* Genre image + result */}
            <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={GENRE_IMAGES[primary.id]}
                alt=""
                style={{ width: 180, height: 180, borderRadius: 24, objectFit: 'cover', border: '3px solid rgba(255,46,136,0.4)', boxShadow: '0 0 40px rgba(255,46,136,0.3)', marginBottom: 30 }}
              />
              <div style={{ fontSize: 52, fontWeight: 900, color: '#FF2E88', textShadow: '0 0 30px rgba(255,46,136,0.5)', marginBottom: 10 }}>{primary.personaName}</div>
              <div style={{ fontSize: 22, color: '#18D1C2', fontWeight: 700, marginBottom: 16 }}>{primary.genre} · 匹配度 {primary.match}%</div>
              <div style={{ fontSize: 18, color: '#FFF9EF99', fontStyle: 'italic', marginBottom: 28, maxWidth: 650 }}>"{primary.tagline}"</div>

              {/* Core traits */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
                {primary.coreTraits.map(trait => (
                  <span key={trait} style={{ background: 'rgba(255,46,136,0.15)', border: '1px solid rgba(255,46,136,0.3)', color: '#FF2E88', padding: '6px 20px', borderRadius: 50, fontSize: 16, fontWeight: 700 }}>{trait}</span>
                ))}
              </div>

              {/* Social signature */}
              <div style={{ background: 'rgba(255,212,59,0.08)', border: '1px solid rgba(255,212,59,0.2)', borderRadius: 16, padding: '16px 32px', maxWidth: 600 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#FFD43B' }}>{primary.socialSignature}</div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', color: '#FFF9EF40', fontSize: 14 }}>
              扫码测测你的摇滚人格 →
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SectionWrapper({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
      className="px-4 py-4"
    >
      <div className="max-w-lg mx-auto">{children}</div>
    </motion.section>
  )
}

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <h2 className="flex items-center gap-2 text-base font-bold text-paper-white mb-3">
      <span className="text-lg">{icon}</span>
      <span>{title}</span>
    </h2>
  )
}

function findProfile(candidates: RankedResult[], id: string): RankedResult {
  return candidates.find(p => p.id === id) || candidates[0]
}
