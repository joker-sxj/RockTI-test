import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Question } from '../types/rockti'

interface QuizPageProps {
  questions: Question[]
  answers: Record<string, string>
  onAnswer: (questionId: string, optionId: string) => void
  onComplete: () => void
  onBack: () => void
}

const STAGE_HINTS: Record<number, string> = {
  8: '音箱预热完成，失真开始加载',
  16: '你的摇滚轮廓正在成型',
  24: '准备生成你的摇滚人格',
}

const STAGE_ICONS: Record<number, string> = {
  8: '🎸',
  16: '🔥',
  24: '⚡',
}

export function QuizPage({ questions, answers, onAnswer, onComplete, onBack }: QuizPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [showHint, setShowHint] = useState<string | null>(null)
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const currentQuestion = questions[currentIndex]
  const selectedOption = answers[currentQuestion.id]
  const isLast = currentIndex === questions.length - 1
  const progress = ((currentIndex + 1) / questions.length) * 100
  const stageNum = currentIndex < 8 ? 1 : currentIndex < 16 ? 2 : 3

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current)
    }
  }, [])

  const goNext = useCallback(() => {
    const nextIndex = currentIndex + 1
    const hint = STAGE_HINTS[nextIndex]

    if (hint) {
      setShowHint(hint)
      setTimeout(() => {
        setShowHint(null)
        if (isLast) {
          onComplete()
        } else {
          setDirection(1)
          setCurrentIndex(nextIndex)
          setSelectedLabel(null)
        }
      }, 1200)
    } else if (isLast) {
      onComplete()
    } else {
      setDirection(1)
      setCurrentIndex(nextIndex)
      setSelectedLabel(null)
    }
  }, [currentIndex, isLast, onComplete])

  const handleSelect = useCallback((optionId: string, label: string) => {
    onAnswer(currentQuestion.id, optionId)
    setSelectedLabel(label)

    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current)
    advanceTimerRef.current = setTimeout(() => {
      goNext()
    }, 450)
  }, [currentQuestion.id, onAnswer, goNext])

  const handlePrev = useCallback(() => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current)
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(currentIndex - 1)
      setSelectedLabel(null)
    }
  }, [currentIndex])

  const handleBackToHome = useCallback(() => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current)
    onBack()
  }, [onBack])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  }

  const labels = ['A', 'B', 'C', 'D']

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-dvh flex flex-col bg-stage-black noise-bg"
    >
      {/* Header */}
      <div className="sticky top-0 z-20 bg-stage-black/90 backdrop-blur-md border-b border-paper-white/[0.06] px-4 py-3">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-2.5">
            <button
              onClick={currentIndex === 0 ? handleBackToHome : handlePrev}
              className="text-sm text-paper-white/50 hover:text-paper-white transition-colors flex items-center gap-1.5"
            >
              <span>←</span>
              <span>{currentIndex === 0 ? '返回' : '上一题'}</span>
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xs text-paper-white/30">Stage {stageNum}</span>
              <span className="text-sm font-bold text-electric-teal tabular-nums">
                {currentIndex + 1}/{questions.length}
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-paper-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #FF2E88, #8B5CF6, #18D1C2)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <div className="max-w-lg w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Question number badge */}
              <div className="flex justify-center mb-5">
                <div className="inline-flex items-center gap-2 bg-paper-white/[0.04] border border-paper-white/[0.08] rounded-full px-4 py-1.5">
                  <span className="text-xs text-hot-pink font-bold">Q{currentIndex + 1}</span>
                  <span className="w-px h-3 bg-paper-white/10" />
                  <span className="text-xs text-paper-white/40">{stageNum === 1 ? '声音偏好' : stageNum === 2 ? '态度立场' : '生活方式'}</span>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-xl md:text-2xl font-bold text-paper-white mb-7 text-center leading-relaxed">
                {currentQuestion.text}
              </h2>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((option, i) => {
                  const isSelected = selectedOption === option.id
                  const justSelected = selectedLabel === labels[i]

                  return (
                    <motion.button
                      key={option.id}
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => handleSelect(option.id, labels[i])}
                      className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? 'bg-hot-pink/15 border-hot-pink/60 shadow-[0_0_20px_rgba(255,46,136,0.15)]'
                          : 'bg-paper-white/[0.02] border-paper-white/[0.08] hover:border-electric-teal/40 hover:bg-paper-white/[0.04]'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                          isSelected
                            ? 'bg-hot-pink text-white scale-110'
                            : 'bg-paper-white/[0.06] text-paper-white/40'
                        }`}>
                          {justSelected && isSelected ? '✓' : labels[i]}
                        </span>
                        <span className={`text-sm md:text-base transition-colors ${isSelected ? 'text-paper-white' : 'text-paper-white/70'}`}>
                          {option.text}
                        </span>
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Stage Hint Modal */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stage-black/95 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-center px-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="text-7xl mb-5"
              >
                {STAGE_ICONS[Math.ceil(currentIndex / 8) * 8] || '⚡'}
              </motion.div>
              <p className="text-2xl font-black text-amp-yellow neon-glow-yellow">
                {showHint}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
