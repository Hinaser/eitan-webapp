import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  root: {
    padding: 16,
  },
  settingContainer: {
    marginTop: 32,
  },
  settingTable: {
    fontSize: ".9rem",
    borderCollapse: "collapse" as const,
    "& > tbody > tr > td": {
      paddingTop: 4,
      paddingBottom: 4,
      "&:not(:first-child)": {
        paddingLeft: 16,
      },
    },
  },
  input: {
    display: "inline-block" as const,
    height: 30,
    width: 80,
    lineHeight: "30px",
    border: "none",
    background: "#f3f3f3",
    textAlign: "right" as const,
  },
});
