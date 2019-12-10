import {EowpState, currentVersion} from "./index.type";

export function getInitialState(): EowpState {
  return {
    version: currentVersion,
    loading: false,
    wordList: [],
    resultHistory: [],
    qaTrend: {},
    nQuestionsInExam: 10,
    nChoices: 5,
  };
}
