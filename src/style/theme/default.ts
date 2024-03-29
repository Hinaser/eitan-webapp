import {CreateThemeType} from "./type";

export const createTheme: CreateThemeType = () => {
  const primaryForegroundColor = "rgba(0,0,0,.87)";
  const secondaryForegroundColor = "rgba(100,100,100,.8)";
  const primaryBackgroundColor = "#eee";
  const secondaryBackgroundColor = "rgba(245,245,245,1)";
  const selectedBorderColor = "rgba(220,220,220,1)";
  const errorForegroundColor = "red";
  const successForegroundColor = "green";
  const buttonBackgroundColor = "rgb(224,225,226)";
  
  return {
    customProps: {
      primaryForegroundColor,
      secondaryForegroundColor,
      primaryBackgroundColor,
      secondaryBackgroundColor,
      dialogClickListenerBackgroundColor: "rgba(0,0,0,.5)",
      selectedBorderColor,
      successForegroundColor,
      errorForegroundColor,
      buttonBackgroundColor,
    },
    customComponents: {
      appLoader: {
        background: "transparent",
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
        zIndex: 1,
        boxShadow: "3px 3px 8px rgba(33,33,33,.2)",
        transition: "all ease .3s, width 0s, top 0s, right 0s, left 0s, bottom 0s",
      },
      appSidebar: {
        background: "#fefefe",
        zIndex: -1,
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
