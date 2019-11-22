import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../index";
import {IStateLoader} from "../loader/type";
import {
  prepareLoadingState,
  resetEntireState,
  prepareSavingState,
  finishSavingState,
} from "./root.action";


export function loadStateAsync(loader: IStateLoader){
  return async (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      ReturnType<typeof prepareLoadingState | typeof resetEntireState>
    >,
  ) => {
    dispatch(prepareLoadingState());
    const state = await loader.loadState();
    dispatch(resetEntireState(state));
  };
}

export function saveStateAsync(loader: IStateLoader){
  return async (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      ReturnType<typeof prepareSavingState | typeof finishSavingState>
    >,
    getState: () => RootState,
  ) => {
    dispatch(prepareSavingState());
    await loader.saveState(getState());
    dispatch(finishSavingState());
  };
}
