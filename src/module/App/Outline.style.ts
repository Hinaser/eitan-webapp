import {AppTheme} from "../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    ...(theme.customComponents.appOutline || {}),
    position: "fixed" as "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,.4)",
  },
  mainRoot: {
    ...(theme.customComponents.appMain || {}),
    position: "fixed" as "fixed",
    background: "#fefefe",
    borderRadius: 6,
    overflow: "hidden" as const,
    boxShadow: "3px 3px 8px rgba(33,33,33,.2)",
  },
});
