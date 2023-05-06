import { Question } from "../api/fetchQuestions";

export type UserAnswerObject = {
    answer: string;
    question: string;
    correct: boolean;
    correctAnswer: string;
};

export type QuestionCardPropsType = {
    question: string;
    answers: string[];
    userAnswer: UserAnswerObject | undefined;
    questionNum: number;
    totalQuestions: number;
    callback: (e:React.MouseEvent<HTMLButtonElement>) => void;
};

export type QuestionState= Question & {answers: string[]}