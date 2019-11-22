import * as React from "react";

export interface IViewProps extends React.PropsWithChildren<{}> {
  isSidebarOpen: boolean;
  sidebarPosition: "left" | "right";
}

export interface IContainerProps extends React.PropsWithChildren<{}> {
  isSidebarOpen: boolean;
  sidebarPosition: "left" | "right";
  view: React.ComponentType<IViewProps>;
}
