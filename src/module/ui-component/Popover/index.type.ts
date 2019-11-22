import * as React from "react";
import {ClassNameMap} from "@material-ui/styles/withStyles";

export interface IViewProps extends React.PropsWithChildren<{}>{
  classes: ClassNameMap;
  position: Partial<{top: number, left: number, bottom: number, right: number, width: number, height: number}>;
  onLoad: (ref: React.RefObject<HTMLDivElement>) => void;
  onClose?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface IContainerProps extends React.PropsWithChildren<{}>{
  classes: ClassNameMap;
  open: boolean;
  anchor?: HTMLElement|null;
  placement?: "top"|"bottom"|"left"|"right";
  align?: "top"|"bottom"|"center"|"left"|"right";
  offset?: number;
  className?: string;
  id?: string;
  onClose?: () => void;
  view: React.ComponentType<IViewProps>;
}

export interface IContainerState {
  allocation: {width: number, height: number};
}
