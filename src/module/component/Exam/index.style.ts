import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    padding: 16,
  },
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
  body: {
    marginTop: 16,
    minWidth: 300,
    display: "flex" as const,
    flexWrap: "nowrap" as const,
  },
  historyContainer: {
    width: 240,
  },
  separator: {
    marginLeft: 16,
    marginRight: 15,
    borderRight: "1px solid #ccc",
  },
  questionContainer: {
  },
  qaListContainer: {
    
  },
  qi: {
    cursor: "pointer",
    "&:hover": {
      background: "rgba(77,77,77,.1)",
    },
    "&.selected": {
      background: "rgba(77,77,77,.1)",
    },
  },
  question: {
    
  },
  word: {
    fontSize: "2rem",
    fontWeight: "bold" as const,
  },
  statement: {
    fontSize: ".8rem",
    marginTop: 8,
  },
  choiceContainer: {
    fontSize: ".85rem",
    marginTop: 32,
  },
  choiceTable: {
    borderCollapse: "collapse" as const,
    width: "100%",
    fontSize: ".85rem",
    "& > tbody > tr": {
      cursor: "pointer",
      "&:hover": {
        background: "rgba(77,77,77,.1)",
      },
    },
    "& > tbody > tr > td": {
      borderTop: "1px solid #ccc",
      borderBottom: "1px solid #ccc",
      paddingTop: 8,
      paddingBottom: 8,
      "&:not(:first-child)": {
        paddingLeft: 8,
      },
    },
  },
  check: {
    "& > div": {
      width: 32,
      height: 32,
      display: "flex" as const,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      "& > svg": {
        fontSize: 28,
        color: "rgba(200,200,200,.3)",
      },
      "&.checked > svg": {
        color: "rgba(0,0,0,.6)",
      },
    },
  },
  choiceIndex: {
    textAlign: "center" as const,
  },
  choice: {
  },
  footer: {
    height: 48,
    position: "relative" as const,
    display: "flex" as const,
    alignItems: "center" as const,
  },
  toPrev: {
    cursor: "pointer",
    padding: "4px 8px",
    transition: "all ease .1s",
    "&:hover": {
      background: "rgba(77,77,77,.1)",
    },
  },
  toNext: {
    cursor: "pointer",
    marginLeft: 16,
    padding: "4px 8px",
    transition: "all ease .1s",
    "&:hover": {
      background: "rgba(77,77,77,.1)",
    },
  },
  completeButtonContainer: {
    position: "absolute" as const,
    right: 8,
    height: 48,
    display: "flex" as const,
    alignItems: "center" as const,
    padding: "4px 8px",
    transition: "all ease .1s",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(77,77,77,.1)",
    },
  },
});
