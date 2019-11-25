import {AppState, currentVersion} from "./index.type";

export function getInitialState(): AppState {
  return {
    version: currentVersion,
    lang: "ja",
    theme: "default",
    isLoadingApp: false,
    isSidebarOpen: false,
    sidebarPosition: "left",
  };
}
