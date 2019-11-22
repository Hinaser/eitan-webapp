import * as React from "react";
import {ClassNameMap} from "@material-ui/styles/withStyles";
import Scrollbars from "react-custom-scrollbars";

export interface IContainerState {
  windowHeight: number;
  windowWidth: number;
  headerHeight: number;
  sidebarWidth: number;
  isLoading: boolean;
}

export interface IViewProps {
  classes: ClassNameMap;
  mainContentPosition: {top: number, left: number; right: number; bottom: number};
  scrollbarStyle: {width: number; height: number; transition?: string};
  childrenWithSizeAndScroll: JSX.Element;
  onHeaderHeightChange: (height: number) => void;
  onSidebarWidthChange: (width: number) => void;
  scrollRef: React.RefObject<Scrollbars>;
  isLoading: boolean;
}

export interface IContainerProps {
  classes: ClassNameMap;
  sidebarPosition: "left"|"right";
  view: React.ComponentType<IViewProps>;
  children: React.ReactElement<any, any>;
}
