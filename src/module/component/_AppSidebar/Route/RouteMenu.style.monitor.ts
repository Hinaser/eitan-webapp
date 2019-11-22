import {AppTheme} from "../../../../style/theme/type";

export default (theme: AppTheme) => ({
  menuList: {
    "& div": {
      whiteSpace: "nowrap" as const,
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxWidth: "100%",
      textAlign: "center" as const,
      
      "& + div": {
        marginTop: 8,
      },
    },
  },
});
