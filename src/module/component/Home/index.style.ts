import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    padding: 16,
  },
  menuContainer: {
    display: "flex" as const,
    flexWrap: "wrap" as const,
    justifyContent: "center" as const,
    marginTop: 48,
  },
  menu: {
    width: 160,
    height: 100,
    position: "relative" as const,
    border: "1px solid #ccc",
    marginBottom: 16,
    cursor: "pointer",
    transition: "all ease .1s",
    "&:hover": {
      background: "rgba(33,33,33,.1)",
    },
    "& + div": {
      marginLeft: 16,
    },
  },
  menuImage: {
    height: 70,
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    fontSize: 50,
  },
  menuTitle: {
    textAlign: "center" as const,
    fontSize: ".9rem",
    height: 30,
    lineHeight: "30px",
  },
  summaryContainer: {
    marginTop: 48,
    display: "flex" as const,
    flexWrap: "nowrap" as const,
    justifyContent: "center",
  },
  summaryTitle: {
    fontSize: ".9rem",
    marginBottom: 8,
  },
  summaryTable: {
    borderCollapse: "collapse" as const,
    "& > tbody > tr > td": {
      paddingTop: 4,
      paddingBottom: 4,
      "&:not(:first-child)": {
        paddingLeft: 16,
      },
    },
  },
  stats: {
    fontSize: ".9rem",
  },
  troublingWords: {
    marginLeft: 32,
    fontSize: ".9rem",
  },
  troublingWordsTable: {
    borderCollapse: "collapse" as const,
    "& > tbody > tr > td": {
      "&:not(:first-child)": {
        paddingLeft: 8,
      },
    },
  },
});
