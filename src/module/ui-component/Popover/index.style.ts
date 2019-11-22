import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    ...(theme.customUI.Popover || {}),
    position: "fixed" as const,
    top: 0, left: 0, bottom: 0, right: 0,
    zIndex: 9999,
  },
  popover: {
    position: "absolute" as const,
  },
});
