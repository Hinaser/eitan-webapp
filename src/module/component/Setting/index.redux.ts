import {connect} from "react-redux";
import {RootState} from "../../../state";
import {ThunkDispatch} from "redux-thunk";
import {RootActions} from "../../../state/store/index.action";
import {
  changeNChoicesAsync,
  changeNQuestionsInExamAsync,
} from "../../../state/store/Eowp/action/thunk";


export default connect(
  (rootReduxState: RootState) => {
    const {lang} = rootReduxState.App;
    const {nChoices, nQuestionsInExam} = rootReduxState.Eowp;
    return {
      lang,
      nChoices,
      nQuestionsInExam,
    };
  },
  (dispatch: ThunkDispatch<RootState, undefined, RootActions>) => {
    return {
      changeNChoices: (nChoices: number) => dispatch(changeNChoicesAsync(nChoices)),
      changeNQuestionsInExam: (nQuestionsInExam: number) => dispatch(changeNQuestionsInExamAsync(nQuestionsInExam)),
    };
  },
);
