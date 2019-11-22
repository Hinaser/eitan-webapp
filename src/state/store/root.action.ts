import {RootState} from "../index";
import {LOADING_STATE, RESET_ENTIRE_STATE, SAVED_STATE, SAVING_STATE} from "./root.type.action";

export function resetEntireState(state: RootState | undefined) {
  return {
    type: RESET_ENTIRE_STATE,
    payload: {state},
  };
}

export function prepareLoadingState(){
  return {
    type: LOADING_STATE,
  };
}

export function prepareSavingState(){
  return {
    type: SAVING_STATE,
  };
}

export function finishSavingState(){
  return {
    type: SAVED_STATE,
  };
}

