import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    ...(theme.customComponents.appHeader || {}),
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    boxSizing: "border-box" as "border-box",
    width: "100vw",
  },
});
