import { QuestionCardPropsType } from "../../types/questions-answers";

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
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;
