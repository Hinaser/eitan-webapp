import {IMigration} from "../../../migration/type";
import {IStateV1} from "./v1";

// Definition of state after update
// As you see, the new state just adds `theme` property to old state. 
export interface IStateV2 extends IStateV1 {
  isLoadingApp: boolean;
  isSidebarOpen: boolean;
  sidebarPosition: "left" | "right";
}

// This is migration body.
// Migration object must implement both upgrade function and
// downgrade function.
const Migration: IMigration<IStateV1, IStateV2> = {
  upgrade: (appState) => {
    return {
      ...appState,
      version: 2,
      isLoadingApp: false,
      isSidebarOpen: true,
      sidebarPosition: "left",
    };
  },
  downgrade: (appState) => {
    const oldState = {...appState, version: 1};
    delete oldState.isLoadingApp;
    delete oldState.isSidebarOpen;
    delete oldState.sidebarPosition;
    return oldState;
  },
};

export default Migration;
