import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    ...(theme.customComponents.appLoader || {}),
    position: "fixed" as const,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
});
