import * as React from "react";
import {AppTheme} from "../../style/theme/type";

export interface IContainerState {
}

export interface IViewProps extends IContainerState {
  theme: AppTheme;
}

export interface IContainerProps {
  theme: string;
  view: React.ComponentType<IViewProps>;
}
