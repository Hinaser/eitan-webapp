import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  body: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  spacer: {
    flex: "auto",
  },
  childContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  toggleMenuContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    cursor: "pointer",
  },
});
