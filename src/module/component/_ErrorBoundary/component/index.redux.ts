import {connect} from "react-redux";
import {RootState} from "../../../../state/index";



export default connect(
  (rootReduxState: RootState) => {
    const {lang} = rootReduxState.App;
    return {
      lang,
    };
  },
  dispatch => {
    return {
    };
  },
);
