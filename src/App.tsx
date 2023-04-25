import { useState } from "react";
import QuestionCard from "./components/QuestionCard/QuestionCard";
import { TOTAL_QUESTIONS } from "./constants/ImportantVals";

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(true);

  // Main functions
  const startQuiz = () => {};

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <button className="btn start" onClick={startQuiz}>
        start
      </button>
      <p>Score: </p>
      <p>Loading Questions...</p>
      {/* <QuestionCard
        questionNum={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button className="btn next" onClick={nextQuestion}>
        next
      </button>
    </div>
  );
}

export default App;
