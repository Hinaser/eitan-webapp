import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    ...(theme.customComponents.appSidebar || {}),
    position: "fixed" as const,
    top: 0,
    left: 0,
    height: "100vh",
    boxSizing: "border-box" as const,
    paddingBottom: 32,
    fontSize: ".9rem",
  },
  container: {
    height: "100%",
  },
  toggleButtonContainer: {
    ...(theme.customComponents.appSidebarToggle || {}),
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: 32,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    overflow: "hidden",
  },
});
