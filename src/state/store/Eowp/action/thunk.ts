import {ThunkDispatch} from "redux-thunk";
import {TExamResult, TQATrend} from "../../../../lib/eowp";
import {EowpState} from "../initialState/index.type";
import {finishExam} from "./index";
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
    const newQaTrend: TQATrend = {};
    Object.keys(qaTrend).forEach(word => {
      if(savedTrend[word]){
        newQaTrend[word] = savedTrend[word].concat(qaTrend[word]);
      }
      else{
        newQaTrend[word] = qaTrend[word];
      }
    });
    
    // Save data to localStorage
    localStorage.setItem("resultHistory", JSON.stringify(newResultHistory));
    localStorage.setItem("qaTrend", JSON.stringify(newQaTrend));
    
    finishExam(newResultHistory, newQaTrend);
  };
}
