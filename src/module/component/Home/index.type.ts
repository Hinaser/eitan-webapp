import * as React from "react";
import {WithStyleAndI18nProps} from "../../App/types";
import Style from "./index.style";
import {RouteComponentProps} from "react-router";

type ClassKeys = keyof ReturnType<typeof Style>;

export interface IContainerState {
}

export interface IViewProps extends WithStyleAndI18nProps<ClassKeys>, IContainerState {
  onClickMenu: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface IContainerProps extends WithStyleAndI18nProps<ClassKeys>, RouteComponentProps {
  view: React.ComponentType<IViewProps>;
}
