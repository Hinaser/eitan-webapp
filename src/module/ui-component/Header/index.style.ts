import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  header: {
    display: "flex" as const,
    alignItems: "center" as const,
    height: 40,
    borderBottom: "1px solid #ccc",
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
});
