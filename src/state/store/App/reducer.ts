// tslint:disable-next-line:no-implicit-dependencies
import {CreatorsToActions} from "type-util";
import {Reducer} from "redux";
import * as AppActions from "./action";
import {AppState} from "./initialState/index.type";
import {getInitialState} from "./initialState/index";
import {CHANGE_LANGUAGE, CHANGE_SIDEBAR_POSITION, CHANGE_THEME, TOGGLE_SIDEBAR} from "./action/index.type";

type R = Reducer<AppState, CreatorsToActions<typeof AppActions>>;

const appReducer: R = (state = getInitialState(), action) => {
  switch(action.type){
    case CHANGE_LANGUAGE: {
      const {lang} = action.payload;
      return {
        ...state,
        lang,
      };
    }
    case CHANGE_THEME: {
      const {theme} = action.payload;
      return {
        ...state,
        theme,
      };
    }
    case TOGGLE_SIDEBAR: {
      const {openOrClose} = action.payload;
      return {
        ...state,
        isSidebarOpen: openOrClose === "open",
      };
    }
    case CHANGE_SIDEBAR_POSITION: {
      const {position} = action.payload;
      return {
        ...state,
        sidebarPosition: position,
      };
    }
    default:
      break;
  }
  
  return state;
};

export default appReducer;
