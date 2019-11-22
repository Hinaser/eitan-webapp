import * as React from "react";
import {CommonSidebarProps, WithStyleAndI18nProps} from "../../App/types";

export interface IContainerState {
}

export interface IViewForMonitorProps extends WithStyleAndI18nProps {
  rootStyle: {width: number};
  sidebarContentHeight: number;
  toggleButtonDirection: "left"|"right";
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  sidebarPosition: "left" | "right";
  SidebarContent: React.ComponentType<any>;
}

export interface IContainerForMonitorProps extends CommonSidebarProps, WithStyleAndI18nProps {
  onWidthChange: (width: number) => void;
  isSidebarOpen: boolean;
  toggleSidebar: (openOrClose: "open"|"close") => void;
  sidebarPosition: "left" | "right";
  SidebarContent: React.ComponentType<any> | null;
  view: React.ComponentType<IViewForMonitorProps>;
}

export interface IViewForMobileProps extends WithStyleAndI18nProps {
  rootStyle: {width: number};
  sidebarContentHeight: number;
  toggleButtonDirection: "left"|"right";
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  sidebarPosition: "left" | "right";
  SidebarContent: React.ComponentType<any>;
}

export interface IContainerForMobileProps extends CommonSidebarProps, WithStyleAndI18nProps {
  onWidthChange: (width: number) => void;
  isSidebarOpen: boolean;
  toggleSidebar: (openOrClose: "open"|"close") => void;
  sidebarPosition: "left" | "right";
  SidebarContent: React.ComponentType<any> | null;
  view: React.ComponentType<IViewForMobileProps>;
}
