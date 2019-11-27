import {connect} from "react-redux";
import {RootState} from "../../../state";


export default connect(
  (rootReduxState: RootState) => {
    const {lang} = rootReduxState.App;
    const {wordList, nChoices, nQuestionsInExam} = rootReduxState.Eowp;
    return {
      lang,
      wordList,
      nChoices,
      nQuestionsInExam,
    };
  },
  dispatch => {
    return {
    };
  },
);
