import { AnimatePresence, motion } from "framer-motion";
import { useRockti } from "./hooks/use-rockti";
import { HomePage } from "./pages/HomePage";
import { QuizPage } from "./pages/QuizPage";
import { ResultPage } from "./pages/ResultPage";

export default function App() {
  const rockti = useRockti();

  return (
    <AnimatePresence mode="wait">
      {rockti.stage === "home" && (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <HomePage onStart={rockti.startQuiz} />
        </motion.div>
      )}
      {rockti.stage === "quiz" && (
        <motion.div
          key="quiz"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
        >
          <QuizPage rockti={rockti} />
        </motion.div>
      )}
      {rockti.stage === "result" && rockti.result && (
        <motion.div
          key="result"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.45 }}
        >
          <ResultPage result={rockti.result} onRestart={rockti.restart} onHome={rockti.goHome} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
