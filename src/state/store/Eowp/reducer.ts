// tslint:disable-next-line:no-implicit-dependencies
import {CreatorsToActions} from "type-util";
import {Reducer} from "redux";
import * as EowpActionsBase from "./action";
import {EowpState} from "./initialState/index.type";
import {getInitialState} from "./initialState/index";
import {LOADING_DATA, LOAD_DATA} from "./action/index.type";

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
      const {data} = action.payload;
      return {
        ...state,
        ...data,
        loading: false,
      };
    }
    default:
      break;
  }
  
  return state;
};

export default eowpReducer;
