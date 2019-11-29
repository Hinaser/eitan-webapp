// tslint:disable-next-line:no-implicit-dependencies
import {CreatorsToActions} from "type-util";
import {Reducer} from "redux";
import * as EowpActionsBase from "./action";
import {EowpState} from "./initialState/index.type";
import {getInitialState} from "./initialState/index";
import {LOADING_DATA, LOAD_DATA, FINISH_EXAM, CHANGE_NCHOICES, CHANGE_NQUESTIONS_IN_EXAM} from "./action/index.type";

export type EowpActions = CreatorsToActions<typeof EowpActionsBase>;
type R = Reducer<EowpState, EowpActions>;

const eowpReducer: R = (state = getInitialState(), action) => {
  switch(action.type){
    case LOADING_DATA: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_DATA: {
      const data = {...action.payload.data};
      
      Object.keys(data).forEach(k => {
        if(typeof data[k as keyof EowpState] === "undefined"){
          delete data[k as keyof EowpState];
        }
      });
      
      return {
        ...state,
        ...data,
        loading: false,
      };
    }
    case FINISH_EXAM: {
      const {examResults, qaTrend} = action.payload;
      
      return {
        ...state,
        resultHistory: examResults,
        qaTrend,
      };
    }
    case CHANGE_NCHOICES: {
      const {nChoices} = action.payload;
      
      return {
        ...state,
        nChoices,
      };
    }
    case CHANGE_NQUESTIONS_IN_EXAM: {
      const {nQuestionsInExam} = action.payload;
      
      return {
        ...state,
        nQuestionsInExam,
      };
    }
    default:
      break;
  }
  
  return state;
};

export default eowpReducer;
