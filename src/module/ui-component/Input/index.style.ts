import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    ...(theme.customUI.Button || {}),
    padding: "3px 8px",
    borderRadius: 5,
    border: "none",
    fontSize: ".9rem",
  },
});
