import {connect} from "react-redux";
import {RootState} from "../../../state";
import {changeLanguage} from "../../../state/store/App/action/language";
import {changeTheme} from "../../../state/store/App/action/theme";
import {changeSidebarPosition, toggleSidebar} from "../../../state/store/App/action/sidebar";

export default connect(
  (rootReduxState: RootState) => {
    const {App: {lang, sidebarPosition, isSidebarOpen}} = rootReduxState;
    return {
      lang,
      sidebarPosition,
      isSidebarOpen,
    };
  },
  dispatch => {
    return {
      changeLanguage: (lang: string) => dispatch(changeLanguage(lang)),
      changeTheme: (theme: string) => dispatch(changeTheme(theme)),
      changeSidebarPosition: (position: "left"|"right") => dispatch(changeSidebarPosition(position)),
      toggleSidebar: (openOrClose: "open"|"close") => dispatch(toggleSidebar(openOrClose)),
    };
  },
);

