import * as React from "react";
import {WithStyleAndI18nProps} from "../../../App/types";

export interface IContainerState {
  hasError: boolean;
}

export interface IViewProps extends WithStyleAndI18nProps {
}

export interface IContainerProps extends WithStyleAndI18nProps {
  view: React.ComponentType<IViewProps>;
  children: React.ReactElement<any, any>;
}
