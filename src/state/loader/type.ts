import {RootState} from "../";
import {IMinimalState} from "../migration/type";
import {upgradeToLatestState as updateAppStateToLatest} from "../store/App/migration/index";

export abstract class IStateLoader {
  public abstract async loadState(): Promise<RootState>;
  public abstract async saveState(state: RootState): Promise<void>;
  
  public static upgradeState<S extends Record<keyof RootState, IMinimalState>>(oldState: S): RootState {
    const App = updateAppStateToLatest(oldState.App);
    
    return {
      App,
    };
  }
}
