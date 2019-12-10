import {connect} from "react-redux";
import {RootState} from "../../../state";


export default connect(
  (rootReduxState: RootState) => {
    const {lang} = rootReduxState.App;
    const {wordList, resultHistory, qaTrend} = rootReduxState.Eowp;
    return {
      lang,
      wordList,
      resultHistory,
      qaTrend,
    };
  },
  dispatch => {
    return {
    };
  },
);
