import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'
import { ResultPage } from './pages/ResultPage'
import { QUESTIONS } from './data/questions'
import { ROCK_PROFILES } from './data/rockProfiles'
import { calculateRocktiResult } from './lib/scoring'
import type { RocktiResult } from './types/rockti'

type Page = 'home' | 'quiz' | 'result'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<RocktiResult | null>(() => {
    const saved = localStorage.getItem('rockti_result')
    return saved ? JSON.parse(saved) : null
  })

  const handleStart = useCallback(() => {
    setAnswers({})
    setResult(null)
    setPage('quiz')
  }, [])

  const handleAnswer = useCallback((questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }, [])

  const handleComplete = useCallback(() => {
    const rocktiResult = calculateRocktiResult(QUESTIONS, ROCK_PROFILES, answers)
    setResult(rocktiResult)
    localStorage.setItem('rockti_result', JSON.stringify(rocktiResult))
    setPage('result')
  }, [answers])

  const handleRestart = useCallback(() => {
    setAnswers({})
    setResult(null)
    localStorage.removeItem('rockti_result')
    setPage('home')
  }, [])

  return (
    <div className="min-h-dvh bg-stage-black text-paper-white noise-bg">
      <AnimatePresence mode="wait">
        {page === 'home' && (
          <HomePage key="home" onStart={handleStart} hasResult={!!result} onShowResult={() => setPage('result')} />
        )}
        {page === 'quiz' && (
          <QuizPage
            key="quiz"
            questions={QUESTIONS}
            answers={answers}
            onAnswer={handleAnswer}
            onComplete={handleComplete}
            onBack={() => setPage('home')}
          />
        )}
        {page === 'result' && result && (
          <ResultPage key="result" result={result} onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </div>
  )
}
