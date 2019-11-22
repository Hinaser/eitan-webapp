import * as React from "react";
import {ClassNameMap} from "@material-ui/styles/withStyles";

export interface IContainerState {
}

export interface IViewProps extends Partial<Exclude<HTMLInputElement, "form">> {
  classes: ClassNameMap;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IContainerProps extends Partial<Exclude<HTMLInputElement, "form">> {
  classes: ClassNameMap;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  view: React.ComponentType<IViewProps>;
}
