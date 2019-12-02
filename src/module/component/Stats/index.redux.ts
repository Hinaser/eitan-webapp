import {connect} from "react-redux";
import {RootState} from "../../../state";
import {ThunkDispatch} from "redux-thunk";
import {RootActions} from "../../../state/store/index.action";


export default connect(
  (rootReduxState: RootState) => {
    const {lang} = rootReduxState.App;
    return {
      lang,
    };
  },
  (dispatch: ThunkDispatch<RootState, undefined, RootActions>) => {
    return {
    };
  },
);
