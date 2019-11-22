import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    ...(theme.customUI.Modal || {}),
    position: "fixed" as const,
    top: 0, left: 0, bottom: 0, right: 0,
    display: "flex" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  popover: {
    overflow: "auto",
    "& [data-class='title']": {
      textAlign: "center" as const,
      padding: "12px 16px",
    },
    "& [data-class='body']": {
      overflow: "auto",
      padding: "0 16px",
      marginTop: 16,
      marginBottom: 16,
    },
    "& [data-class='button-container']": {
      display: "flex" as const,
      alignItems: "center" as const,
      justifyContent: "flex-end" as const,
      marginTop: 16,
      padding: "0 16px 16px 16px",
      "& > div + div": {
        marginLeft: 16,
      },
    },
    "& [data-class='ok-button']": {
      cursor: "pointer" as const,
    },
    "& [data-class='cancel-button']": {
      cursor: "pointer" as const,
    },
  },
});
