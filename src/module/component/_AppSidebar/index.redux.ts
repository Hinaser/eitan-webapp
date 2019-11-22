import {connect} from "react-redux";
import {RootState} from "../../../state";
import {changeLanguage} from "../../../state/store/App/action/language";
import {changeTheme} from "../../../state/store/App/action/theme";
import {toggleSidebar} from "../../../state/store/App/action/sidebar";

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
      changeLanguage: (lang: string) => dispatch(changeLanguage(lang)),
      changeTheme: (theme: string) => dispatch(changeTheme(theme)),
      toggleSidebar: (openOrClose: "open"|"close") => dispatch(toggleSidebar(openOrClose)),
    };
  },
);

