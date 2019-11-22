import {IMigration, IMinimalState} from "../../../migration/type";

// Definition of state before update
export interface IStateV0 extends IMinimalState {
  lang: string;
}

// Definition of state after update
// As you see, the new state just adds `theme` property to old state. 
export interface IStateV1 extends IStateV0 {
  theme: string;
}

// This is migration body.
// Migration object must implement both upgrade function and
// downgrade function.
const Migration: IMigration<IStateV0, IStateV1> = {
  upgrade: (appState) => {
    return {
      ...appState,
      version: 1,
      theme: "default",
    };
  },
  downgrade: (appState) => {
    const oldState = {...appState, version: 0};
    delete oldState.theme;
    return oldState;
  },
};

export default Migration;
