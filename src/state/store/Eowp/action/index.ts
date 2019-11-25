import {LOADING_DATA, LOAD_DATA} from "./index.type";
import {EowpState} from "../initialState/index.type";

export function loadingData(){
  return {
    type: LOADING_DATA,
  };
}

export function loadData(data: EowpState){
  return {
    type: LOAD_DATA,
    payload: {data},
  };
}
