import * as React from "react";
import {WithStyleAndI18nProps} from "../../App/types";
import Style from "./index.style";

type ClassKeys = keyof ReturnType<typeof Style>;

export interface IContainerState {
}

export interface IViewProps extends WithStyleAndI18nProps<ClassKeys>, IContainerState {
}

export interface IContainerProps extends WithStyleAndI18nProps<ClassKeys> {
  view: React.ComponentType<IViewProps>;
}
