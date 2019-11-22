import {connect} from "react-redux";
import {RootState} from "../../../../state/index";
import {toggleSidebar} from "../../../../state/store/App/action/sidebar";

export default connect(
  (rootReduxState: RootState) => {
    const {App: {lang, isSidebarOpen, sidebarPosition}} = rootReduxState;
    return {
      lang,
      isSidebarOpen,
      sidebarPosition,
    };
  },
  dispatch => {
    return {
      toggleSidebar: (openOrClose: "open"|"close") => dispatch(toggleSidebar(openOrClose)),
    };
  },
);

