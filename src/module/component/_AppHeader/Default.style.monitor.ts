import {AppTheme} from "../../../style/theme/type";

export default (theme: AppTheme) => ({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  title: {
    padding: "0 16px",
  },
  spacer: {
    flex: "auto",
    padding: "0 16px",
  },
  label: {
    fontSize: ".8rem",
    borderBottom: "1px solid #eee",
    marginBottom: 4,
  },
  link: {
    cursor: "pointer",
    color: "rgb(6,69,173)",
    textDecoration: "underline",
    fontSize: ".9rem",
  },
  language: {
    padding: "0 16px",
    "& span + span": {
      marginLeft: 16,
    },
  },
  theme: {
    padding: "0 16px",
    "& span + span": {
      marginLeft: 16,
    },
  },
});
