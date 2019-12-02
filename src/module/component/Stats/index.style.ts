import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    padding: 16,
  },
  statsContainer: {
    marginTop: 32,
  },
  chartTable: {
    borderCollapse: "collapse" as const,
    width: "100%",
    fontSize: ".8rem",
    "& > tbody > tr > td": {
      paddingTop: 8,
      paddingBottom: 8,
      "&:first-child": {
        width: 180,
        textAlign: "center" as const,
      },
    },
    "& svg text": {
      fontSize: ".8rem",
    },
  },
});
