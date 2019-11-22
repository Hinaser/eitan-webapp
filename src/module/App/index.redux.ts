import {connect} from "react-redux";
import {RootState} from "../../state";


export default connect(
  (rootReduxState: RootState) => {
    const {App: {theme}} = rootReduxState;
    return {
      theme,
    };
  },
  (dispatch) => {
    return {
    };
  },
);
