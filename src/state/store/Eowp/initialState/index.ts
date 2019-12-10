import {getInitialState as getInitialState_dev} from "./initialState.dev";
import {getInitialState as getInitialState_prod} from "./initialState.prod";

export const getInitialState = (() => {
  if(process.env.REACT_APP_ENV === "development"){
    return getInitialState_dev;
  }
  else{
    return getInitialState_prod;
  }
})();
