import {AppTheme} from "../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    ...(theme.customComponents.appOutline || {}),
    position: "fixed" as "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,.4)",
    zIndex: 99999999,
  },
  mainRoot: {
    ...(theme.customComponents.appMain || {}),
    position: "fixed" as "fixed",
    background: "#fefefe",
    overflow: "hidden" as const,
    boxShadow: "3px 3px 8px rgba(33,33,33,.2)",
  },
  closeButton: {
    position: "absolute" as const,
    right: 8,
    top: 8,
    height: 48,
    width: 48,
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderRadius: "50%",
    transition: "all ease .2s",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(200,200,200,.2)",
    },
    "& > svg": {
      height: 32,
      width: 32,
    },
  },
});
