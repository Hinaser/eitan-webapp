import {LOADING_DATA, LOAD_DATA, FINISH_EXAM} from "./index.type";
import {EowpState} from "../initialState/index.type";
import {TExamResult, TQATrend} from "../../../../lib/eowp/index";

export function loadingData(){
  return {
    type: LOADING_DATA,
  };
}

export function loadData(data: Partial<EowpState>){
  return {
    type: LOAD_DATA,
    payload: {data},
  };
}

export function finishExam(examResults: TExamResult[], qaTrend: TQATrend){
  return {
    type: FINISH_EXAM,
    payload: {
      examResults,
      qaTrend,
    },
  };
}
