import {TExam} from "../../../lib/eowp";

export function checkAnswer(qa: TExam extends Array<infer T> ? T : never, answer: number[]|null){
  if(answer === null){
    return null;
  }
  const checkedChoices = qa.choices.filter((_, i) => answer.includes(i));
  const uncheckedChoices = qa.choices.filter((_, i) => !answer.includes(i));
  const areCheckedChoicesCorrect = checkedChoices.every(c => qa.wordMeans.some(m => m.mean === c.mean));
  const areUncheckedChoicesCorrect = uncheckedChoices.every(c => qa.wordMeans.every(m => m.mean !== c.mean));
  return areCheckedChoicesCorrect && areUncheckedChoicesCorrect ? "correct" : "no";
}
