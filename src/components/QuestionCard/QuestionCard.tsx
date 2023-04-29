type QuestionCardPropsType = {
  question: string;
  answers: string[];
  userAnswer: any;
  questionNum: number;
  totalQuestions: number;
  callback: any;
};

const QuestionCard: React.FC<QuestionCardPropsType> = ({
  question,
  answers,
  userAnswer,
  questionNum,
  totalQuestions,
  callback,
}) => {
  return (
    <div>
      <p>
        Question: {questionNum} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      {answers.map((answer, indx) => (
        <div key={indx}>
          <button disabled={userAnswer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;
