import {initializeI18n} from "./i18n/index";
import {detectInitialState, rootReducer} from "./state";
import thunkMiddleware from "redux-thunk";
import {applyMiddleware, createStore, Middleware, Store} from "redux";
import {createLogger} from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension";
import {EowpActions} from "./state/store/Eowp/reducer";
import {LOAD_DATA} from "./state/store/Eowp/action/index.type";
import {loadEowpData} from "./state/store/Eowp/action/index.lib";

// Place redux store here for reference accessed from pre/post rendering functions.
let _store: Store;

/**
 * Do whatever needs to be done before rendering main app.
 * This pre-rendering tasks will be executed after redux store is initialized.
 * 
 * DO NOT INCLUDE Heavy loaded tasks here.
 * 
 * This async function prevents app from rendering, including loading spinner.
 * If this pre-rendering tasks take seconds, users will go looking for another web site.
 * When you have heavy tasks, consider moving those tasks to post-rendering function.
 * Loading screen will appear after pre-rendering tasks done and before post-rendering tasks done. 
 */
export async function doPreRenderingTasks(){
  await initializeI18n();
  return;
}

/**
 * Dispatch post rendering actions in this function.
 * App is rendered at least once before this post rendering function is executed.
 */
export async function doPostRenderingTasks(){
  // We never go inside this if-block because _store should be initialized when
  // this post-rendering tasks is dispatched.
  if(!_store){
    throw new Error("Redux store has not been initialized!");
  }
  
  // Load eowp data
  const eowpData = await loadEowpData();
  _store.dispatch<EowpActions>({
    type: LOAD_DATA,
    payload: {
      data: eowpData,
    },
  });
}

/**
 * Initialize and configure redux store here.
 */
export const initializeStore = async () => {
  const middlewares = [thunkMiddleware] as Middleware[];
  
  if (process.env.NODE_ENV === "development") {
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
    
    if (process.env.REACT_APP_ENABLE_REDUX_IMMUTABLE_STATE_INVARIANT === "true") {
      middlewares.push(require("redux-immutable-state-invariant").default());
    }
  }
  
  // Override initialState if told to do so.
  const initialState = await detectInitialState();
  
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  
  _store = store;
  
  return {
    store,
  };
};

