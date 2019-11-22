import {CreateThemeType} from "./type";

export const createTheme: CreateThemeType = () => {
  return {
    customProps: {
      primaryForegroundColor: "rgba(33,33,33,.7)",
      primaryBackgroundColor: "#eee",
      dialogClickListenerBackgroundColor: "rgba(0,0,0,.5)",
    },
    customComponents: {
      appLoader: {
        background: "#fff",
      },
      appOutline: {
        background: "#fff",
      },
      appMain: {
        color: "rgba(0,0,0,.87)",
        transition: "all ease .3s, color ease 0s",
      },
      appHeader: {
        background: "#fefefe",
        zIndex: -1,
        boxShadow: "3px 3px 8px rgba(33,33,33,.2)",
        transition: "all ease .3s, width 0s, top 0s, right 0s, left 0s, bottom 0s",
      },
      appSidebar: {
        background: "#fefefe",
        zIndex: 1,
        boxShadow: "3px 3px 8px rgba(33,33,33,.2)",
        transition: "all ease .3s, height 0s, top 0s, right 0s, left 0s, bottom 0s",
      },
      appSidebarToggle: {
        background: "rgba(240,240,240,1)",
      },
    },
    customUI: {
      Button: {
        background: "rgba(230,230,230, .6)",
      },
      Popover: {
        "& > div": {
          background: "#fff",
          color: "rgba(0,0,0,.87)",
          transition: "all ease .3s, color ease 0s",
          borderRadius: "5px",
          boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
        },
      },
    },
  };
};
