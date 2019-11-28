import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    padding: 16,
  },
  examSummaryContainer: {
    marginLeft: 32,
    display: "flex" as const,
    alignItems: "center" as const,
    fontSize: ".85rem",
    "& > div:not(:first-child)": {
      marginLeft: 16,
    },
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
    display: "flex" as const,
    alignItems: "center" as const,
    "&:hover": {
      background: "rgba(77,77,77,.1)",
    },
    "&.selected": {
      background: "rgba(77,77,77,.1)",
    },
    "& > svg": {
      marginLeft: 4,
      marginRight: 4,
    },
    "&[data-result='correct'] > svg": {
      color: "rgba(20,155,30,.5)",
    },
    "&[data-result='no'] > svg": {
      color: "rgba(255,10,0,.5)",
    }
  },
  question: {
    
  },
  word: {
    fontSize: "2rem",
    fontWeight: "bold" as const,
  },
  pronounce: {
    fontSize: ".9rem",
    color: "rgba(33,33,33,.6)",
  },
  statement: {
    fontSize: ".8rem",
    marginTop: 8,
  },
  choiceContainer: {
    fontSize: ".85rem",
    marginTop: 32,
    position: "relative" as const,
  },
  choiceTable: {
    borderCollapse: "collapse" as const,
    width: "100%",
    fontSize: ".85rem",
    "& > tbody > tr": {
      "&:not(.answered)": {
        cursor: "pointer",
        "&:hover": {
          background: "rgba(77,77,77,.1)",
        },
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
  answerResultImage: {
    position: "absolute" as const,
    top: 0, left: 0, right: 0, bottom: 0,
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    zIndex: 2,
    transition: "all ease .2s",
    "&.hide": {
      opacity: 0,
      zIndex: -1,
    },
    "&.correct": {
      color: "rgba(20,155,30,.5)",
      fontSize: 200,
    },
    "&.no": {
      color: "rgba(255,10,0,.5)",
      fontSize: 200,
    },
  },
  answerResult: {
    marginTop: 32,
    transition: "all ease .2s",
    "& > div:last-child": {
      overflow: "hidden",
    },
    "&.hide": {
      opacity: 0,
      "& > div:last-child": {
        maxHeight: 0,
      },
    },
    "& ol li": {
      fontSize: ".8rem",
      color: "#999",
    },
  },
  correct: {
    fontSize: "1.2rem",
    color: "green",
  },
  no: {
    fontSize: "1.2rem",
    color: "red",
  },
  check: {
    width: 40,
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
    justifyContent: "flex-end",
  },
  footerButton: {
    fontSize: "1rem",
    padding: 8,
    borderRadius: 3,
    border: "1px solid #ccc",
    cursor: "pointer",
    display: "flex" as const,
    alignItems: "center" as const,
    transition: "all ease .2s",
    "& > svg": {
      marginRight: 8,
    },
    "&:hover": {
      background: "rgba(77,77,77,.1)",
    },
  },
});
