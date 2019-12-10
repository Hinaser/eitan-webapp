import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../../../state";
import {TExamResult, TQATrend} from "../../../lib/eowp";
import {finishExamAsync} from "../../../state/store/Eowp/action/thunk";
import {RootActions} from "../../../state/store/index.action";


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
  (dispatch: ThunkDispatch<RootState, undefined, RootActions>) => {
    return {
      onExamFinish: (examResult: TExamResult, qaTrend: TQATrend) => dispatch(finishExamAsync(examResult, qaTrend)),
    };
  },
);
