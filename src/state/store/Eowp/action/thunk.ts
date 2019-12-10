import {ThunkDispatch} from "redux-thunk";
import {TExamResult, TQATrend} from "../../../../lib/eowp";
import {EowpState} from "../initialState/index.type";
import {changeNChoices, changeNQuestionsInExam, finishExam} from "./";
import {RootState} from "../../../index";

export function finishExamAsync(examResult: TExamResult, qaTrend: TQATrend){
  return async (
    dispatch: ThunkDispatch<
      EowpState,
      undefined,
      ReturnType<typeof finishExam>
    >,
    getState: () => RootState,
  ) => {
    const rootState = getState();
    const eowpState = rootState.Eowp;
    const {resultHistory, qaTrend: savedTrend} = eowpState;
    
    const newResultHistory = resultHistory.concat(examResult);
    const newQaTrend: TQATrend = {...savedTrend};
    Object.keys(qaTrend).forEach(word => {
      if(newQaTrend[word]){
        newQaTrend[word] = newQaTrend[word].concat(qaTrend[word]);
      }
      else{
        newQaTrend[word] = qaTrend[word];
      }
    });
    
    // Save data to localStorage
    localStorage.setItem("resultHistory", JSON.stringify(newResultHistory));
    localStorage.setItem("qaTrend", JSON.stringify(newQaTrend));
    
    dispatch(finishExam(newResultHistory, newQaTrend));
  };
}

export function changeNChoicesAsync(nChoices: number){
  return async (
    dispatch: ThunkDispatch<
      EowpState,
      undefined,
      ReturnType<typeof changeNChoices>
      >,
    getState: () => RootState,
  ) => {
    // Save data to localStorage
    localStorage.setItem("nChoices", JSON.stringify(nChoices));
    
    dispatch(changeNChoices(nChoices));
  };
}

export function changeNQuestionsInExamAsync(nQuestionsInExam: number){
  return async (
    dispatch: ThunkDispatch<
      EowpState,
      undefined,
      ReturnType<typeof changeNQuestionsInExam>
      >,
    getState: () => RootState,
  ) => {
    // Save data to localStorage
    localStorage.setItem("nQuestionsInExam", JSON.stringify(nQuestionsInExam));
    
    dispatch(changeNQuestionsInExam(nQuestionsInExam));
  };
}
