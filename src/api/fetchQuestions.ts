import { shuffleArray } from "../utils/shuffleArray";


export type Question={
    category:string,
    correct_answer:string,
    difficulty:string,
    incorrect_answers: string[],
    question:string,
    type:string
}

export enum Difficulty{
    EASY="easy",
    MEDIUM="medium",
    HARD="hard",
}

export const fetchQuestions= async(amount:number,difficulty:Difficulty)=>{
    const url= `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

    try {
        const questions= await fetch(url).then(res=>res.json()).then(data=>data.results);

        return questions.map((question:Question)=>{
            return {
                ...question,
                answers: shuffleArray([...question.incorrect_answers,question.correct_answer])
            }
        })
    } catch (error) {
        console.log('Error fetching quiz questions: ',error)
    }

}