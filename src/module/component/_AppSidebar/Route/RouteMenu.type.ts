import * as React from "react";
import {WithStyleAndI18nProps} from "../../../App/types";

export interface IViewProps extends WithStyleAndI18nProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  sidebarPosition: "left" | "right";
}

export interface IContainerProps extends WithStyleAndI18nProps {
  isSidebarOpen: boolean;
  toggleSidebar: (openOrClose: "open" | "close") => void;
  sidebarPosition: "left" | "right";
  view: React.ComponentType<IViewProps>;
}
