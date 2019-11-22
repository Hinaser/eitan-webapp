import {combineReducers} from "redux";
import AppReducer from "./store/App/reducer";
import {getInitialState as getInitialStateApp} from "./store/App/initialState";
import {AppState} from "./store/App/initialState/index.type";
import {RESET_ENTIRE_STATE} from "./store/root.type.action";
import {detectLanguage} from "../lib/util/browser";

export type RootState = {
  App: AppState;
};

export function getInitialState(): RootState {
  return {
    App: getInitialStateApp(),
  };
}

const combinedReducer = combineReducers({
  App: AppReducer, // This reducer manages state under `state.App`
});

export const rootReducer: typeof combinedReducer = (state, action) => {
  if(action.type === RESET_ENTIRE_STATE){
    state = action.payload.state;
  }
  
  return combinedReducer(state, action);
};

/**
 * Try to configure initialState based on various sources like browser options, configs saved on localStorage etc.
 */
export function detectInitialState(): RootState {
  const initialState = getInitialState();
  
  const lang = detectLanguage();
  
  if (lang !== null) {
    initialState.App = {
      ...initialState.App,
      lang,
    };
  }
  
  return initialState;
}
