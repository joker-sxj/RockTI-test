import { useState, useCallback } from 'react'
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

export function QuizPage({ questions, answers, onAnswer, onComplete, onBack }: QuizPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [showHint, setShowHint] = useState<string | null>(null)

  const currentQuestion = questions[currentIndex]
  const selectedOption = answers[currentQuestion.id]
  const isLast = currentIndex === questions.length - 1
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleSelect = useCallback((optionId: string) => {
    onAnswer(currentQuestion.id, optionId)
  }, [currentQuestion.id, onAnswer])

  const handleNext = useCallback(() => {
    if (!selectedOption) return

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
        }
      }, 1500)
    } else if (isLast) {
      onComplete()
    } else {
      setDirection(1)
      setCurrentIndex(nextIndex)
    }
  }, [currentIndex, selectedOption, isLast, onComplete])

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(currentIndex - 1)
    }
  }, [currentIndex])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-dvh flex flex-col bg-paper-white"
    >
      {/* Header */}
      <div className="sticky top-0 z-20 bg-paper-white border-b-2 border-stage-black/10 px-4 py-3">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={currentIndex === 0 ? onBack : handlePrev}
              className="text-sm text-stage-black/60 hover:text-stage-black transition-colors"
            >
              {currentIndex === 0 ? '← 返回' : '← 上一题'}
            </button>
            <span className="text-sm font-bold text-stage-black">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-2 bg-stage-black/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-hot-pink to-electric-teal rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-lg w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Question */}
              <h2 className="text-2xl md:text-3xl font-bold text-stage-black mb-8 text-center">
                {currentQuestion.text}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {currentQuestion.options.map((option, i) => {
                  const isSelected = selectedOption === option.id
                  const labels = ['A', 'B', 'C', 'D']

                  return (
                    <motion.button
                      key={option.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleSelect(option.id)}
                      className={`w-full text-left p-4 rounded-2xl border-3 transition-all ${
                        isSelected
                          ? 'bg-hot-pink text-white border-hot-pink shadow-lg'
                          : 'bg-white text-stage-black border-stage-black/20 hover:border-electric-teal hover:shadow-md'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isSelected ? 'bg-white/20' : 'bg-stage-black/10'
                        }`}>
                          {labels[i]}
                        </span>
                        <span className="text-lg">{option.text}</span>
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="sticky bottom-0 bg-paper-white border-t-2 border-stage-black/10 px-4 py-4">
        <div className="max-w-lg mx-auto flex justify-center">
          <button
            onClick={isLast ? onComplete : handleNext}
            disabled={!selectedOption}
            className={`btn-press px-8 py-3 rounded-2xl text-lg font-bold border-3 transition-all ${
              selectedOption
                ? 'bg-electric-teal text-stage-black border-stage-black hover:bg-electric-teal/90'
                : 'bg-stage-black/20 text-stage-black/40 border-stage-black/20 cursor-not-allowed'
            }`}
          >
            {isLast ? '🎸 查看结果' : '下一题 →'}
          </button>
        </div>
      </div>

      {/* Stage Hint Modal */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stage-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center px-8"
            >
              <div className="text-6xl mb-4">⚡</div>
              <p className="text-2xl font-bold text-amp-yellow neon-glow">
                {showHint}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
