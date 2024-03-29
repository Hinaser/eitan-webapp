import {CreateThemeType} from "./type";

export const createTheme: CreateThemeType = () => {
  const primaryForegroundColor = "#dcdcdc";
  const secondaryForegroundColor = "#999";
  const primaryBackgroundColor = "rgba(33,33,33,.7)";
  const secondaryBackgroundColor = "rgba(33,33,33,.2)";
  const selectedBorderColor = "rgba(220,220,220,1)";
  const errorForegroundColor = "rgba(255,110,20,1)";
  const successForegroundColor = "rgba(0,255,80,.9)";
  const buttonBackgroundColor = "#18202c";
  
  return {
    customProps: {
      primaryForegroundColor,
      secondaryForegroundColor,
      primaryBackgroundColor,
      secondaryBackgroundColor,
      dialogClickListenerBackgroundColor: "rgba(0,0,0,.6)",
      selectedBorderColor,
      successForegroundColor,
      errorForegroundColor,
      buttonBackgroundColor,
    },
    customComponents: {
      appLoader: {
        background: "#3a3a4a",
      },
      appOutline: {
        background: "#3a3a4a",
        color: "rgba(255,255,255,.7)",
        "& a": {
          color: "rgba(255,255,255,.7)" as const,
        },
      },
      appMain: {
        color: "rgba(255,255,255,.7)",
        background: "#3a3a4a",
        transition: "all ease .3s, color ease 0s",
      },
      appHeader: {
        background: "#232f3e",
        zIndex: -1,
        boxShadow: "3px 3px 8px rgba(33,33,33,.2)",
        transition: "all ease .3s, width 0s, top 0s, right 0s, left 0s, bottom 0s",
        "& span": {
          color: "rgba(255,255,255,.7)",
        },
      },
      appSidebar: {
        background: "#18202c",
        zIndex: 1,
        transition: "all ease .3s, height 0s, top 0s, right 0s, left 0s, bottom 0s",
      },
      appSidebarToggle: {
        background: "rgba(200, 200, 200, .3)",
      },
    },
    customUI: {
      Button: {
      },
      Popover: {
        "& > div": {
          background: "#3a3a4a",
          color: "rgba(255,255,255,.7)",
          transition: "all ease .3s, color ease 0s",
          borderRadius: "5px",
          boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
        },
      },
    },
  };
};
