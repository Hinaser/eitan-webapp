import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  header: {
    display: "flex" as const,
    alignItems: "center" as const,
    height: 40,
    borderBottom: "1px solid #ccc",
    position: "relative" as const,
  },
  iconContainer: {
    height: 40,
    lineHeight: "40px",
    fontSize: 36,
  },
  titleContainer: {
    marginLeft: 8,
  },
  title: {
    fontSize: "1rem",
  },
  version: {
    color: theme.customProps.secondaryForegroundColor,
    fontSize: ".8rem",
  },
  storedWordsContainer: {
    marginLeft: 16,
    fontSize: ".9rem",
  },
  backToHome: {
    position: "absolute" as const,
    top: 0,
    right: 8,
    height: 39,
    display: "flex" as const,
    alignItems: "center" as const,
    fontSize: ".8rem",
    "& > div": {
      cursor: "pointer",
      padding: "4px 8px",
      transition: "all ease .1s",
      "&:hover": {
        background: "rgba(77,77,77,.1)",
      },
    },
  },
});
