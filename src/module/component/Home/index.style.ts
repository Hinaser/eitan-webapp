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
});
