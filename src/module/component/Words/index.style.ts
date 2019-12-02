import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    padding: 16,
  },
  controlContainer: {
    marginTop: 8,
    height: 40,
    display: "flex" as const,
    alignItems: "center" as const,
  },
  paginator: {
    display: "flex" as const,
    alignItems: "center" as const,
    height: 40,
    "& > div": {
      cursor: "pointer",
      "&.no-index": {
        color: "rgba(33,33,33,.2)",
        cursor: "default",
      },
      "& + div": {
        marginLeft: 8,
      },
    },
  },
  pageSummaryContainer: {
    marginLeft: 16,
    fontSize: ".8rem",
  },
  selectContainer: {
    marginLeft: 32,
    height: 40,
    display: "flex",
    alignItems: "center" as const,
    fontSize: ".8rem",
  },
  selectItemsPerPage: {
    height: 32,
    border: "none",
    background: "#f3f3f3",
    marginLeft: 8,
  },
  hideMeanContainer: {
    marginLeft: 32,
    fontSize: ".8rem",
    height: 40,
    display: "flex",
    alignItems: "center" as const,
    cursor: "pointer",
  },
  checkIcon: {
    fontSize: 24,
    display: "flex",
    alignItems: "center",
  },
  sortTypeContainer: {
    marginLeft: 32,
    height: 40,
    display: "flex",
    alignItems: "center" as const,
    fontSize: ".8rem",
  },
  selectSortType: {
    height: 32,
    border: "none",
    background: "#f3f3f3",
    marginLeft: 8,
  },
  wordsContainer: {
    marginTop: 32,
  },
  wordsTable: {
    width: "100%",
    borderCollapse: "collapse" as const,
    "& > tbody > tr > td": {
      paddingTop: 8,
      paddingBottom: 8,
      borderTop: "1px solid #ccc",
      borderBottom: "1px solid #ccc",
      "&:not(:first-child)": {
        paddingLeft: 16,
      },
    },
  },
  wordTd: {
  },
  word: {
  },
  pronounce: {
    fontSize: ".8rem",
    color: "#999",
  },
  meanTd: {
    fontSize: ".8rem",
    transition: "all ease .1s",
    "&.hide": {
      color: "#fff",
    },
  }
});
