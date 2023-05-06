import { useEffect, useState } from "react";
import { Difficulty, fetchQuestions } from "./api/fetchQuestions";
import QuestionCard from "./components/QuestionCard/QuestionCard";
import { TOTAL_QUESTIONS } from "./constants/ImportantVals";
import RenderWhen from "./components/GeneralComponents/RenderWhen";
import { QuestionState, UserAnswerObject } from "./types/questions-answers";

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(true);

  // Main functions
  const resetStates = () => {
    setLoading(true);
    setNumber(0);
    setScore(0);
    setGameover(false);
    setQuestions([]);
    setUserAnswers([]);
  };

  const startQuiz = async () => {
    resetStates();

    try {
      const newQuestions = await fetchQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );
      setQuestions(newQuestions);
    } catch (error) {
      console.log("Error:: ", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameover) {
      // user answer
      const userAnswer = e.currentTarget.value;

      // check if correct
      const isCorrect = userAnswer === questions[number].correct_answer;

      if (isCorrect) setScore((prev) => prev + 1);

      // save the user answer object
      const answerObj: UserAnswerObject = {
        question: questions[number].question,
        answer: userAnswer,
        correct: isCorrect,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameover(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const isRenderingNextButton =
    !gameover &&
    !loading &&
    number + 1 !== TOTAL_QUESTIONS &&
    userAnswers.length === number + 1;

  useEffect(() => {
    console.log("IsNext:: ", isRenderingNextButton);
    console.log("IsOver:: ", gameover);
  }, [gameover]);

  return (
    <div className="App">
      <h1>Quiz App</h1>

      <RenderWhen
        condition={gameover || userAnswers.length === TOTAL_QUESTIONS}
        fallback={<LoadingComponent />}
      >
        <button className="btn start" onClick={startQuiz}>
          start
        </button>
      </RenderWhen>

      <RenderWhen condition={!gameover} fallback={null}>
        <p>Score: {score}</p>
      </RenderWhen>

      <RenderWhen condition={loading} fallback={null}>
        <p>Loading Questions...</p>
      </RenderWhen>

      <RenderWhen condition={!loading && !gameover} fallback={null}>
        <QuestionCard
          questionNum={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number]?.question}
          answers={questions[number]?.answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      </RenderWhen>

      <RenderWhen condition={isRenderingNextButton} fallback={null}>
        <button className="btn next" onClick={nextQuestion}>
          next
        </button>
      </RenderWhen>
    </div>
  );
}

export default App;

const LoadingComponent = () => {
  return <h4>Loading...</h4>;
};
