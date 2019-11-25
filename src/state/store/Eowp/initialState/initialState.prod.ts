import {EowpState, currentVersion} from "./index.type";

export function getInitialState(): EowpState {
  return {
    version: currentVersion,
    loading: false,
    wordList: [],
    examHistory: [],
    resultHistory: [],
    qaTrend: [],
  };
}
