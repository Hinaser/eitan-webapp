import * as React from "react";
import {ClassNameMap} from "@material-ui/styles/withStyles";
import {WithContentSizeProps} from "../../../service/contentSizeMonitor/context";

export interface IViewProps extends React.PropsWithChildren<{}>{
  classes: ClassNameMap;
  className?: string;
  style: {zIndex: number};
  popoverStyle: {maxHeight: number};
  onClose?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  title?: string;
  onClickOK?: () => void;
  onClickCancel?: () => void;
  OKButtonLabel?: string;
  CancelButtonLabel?: string;
}

export interface IContainerProps extends React.PropsWithChildren<WithContentSizeProps>{
  open: boolean;
  classes: ClassNameMap;
  className?: string;
  onClose?: () => void;
  notCloseOnClickBackground?: boolean;
  title?: string;
  onClickOK?: () => void;
  onClickCancel?: () => void;
  OKButtonLabel?: string;
  CancelButtonLabel?: string;
  view: React.ComponentType<IViewProps>;
}

export interface IContainerState {
}
