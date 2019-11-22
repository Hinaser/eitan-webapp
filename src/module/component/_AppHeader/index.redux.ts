import {connect} from "react-redux";
import {RootState} from "../../../state";

export default connect(
  (rootReduxState: RootState) => {
    const {App: {sidebarPosition}} = rootReduxState;
    return {
      sidebarPosition,
    };
  },
  dispatch => {
    return {
    };
  },
);

