import * as React from "react";
import {CommonHeaderProps, WithStyleAndI18nProps, WithStyleProps} from "../../App/types";

export interface IContainerState {
}

export interface IViewForMonitorProps extends WithStyleProps {
  rootStyle: {height: number, paddingLeft?: number};
  HeaderContent: React.ComponentType<any>;
}

export interface IContainerForMonitorProps extends CommonHeaderProps, WithStyleAndI18nProps {
  sidebarPosition: "left" | "right";
  HeaderContent: React.ComponentType<any> | null;
  view: React.ComponentType<IViewForMonitorProps>;
}




export interface IViewForMobileProps extends WithStyleProps {
  rootStyle: {height: number, paddingLeft?: number};
  HeaderContent: React.ComponentType<any>;
}

export interface IContainerForMobileProps extends CommonHeaderProps, WithStyleAndI18nProps {
  sidebarPosition: "left" | "right";
  HeaderContent: React.ComponentType<any> | null;
  view: React.ComponentType<IViewForMobileProps>;
}
