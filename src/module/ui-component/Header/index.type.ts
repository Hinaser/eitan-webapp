import * as React from "react";
import {WithStyleAndI18nProps} from "../../App/types";
import Style from "./index.style";
import {TWord} from "../../../lib/eowp/index";

type ClassKeys = keyof ReturnType<typeof Style>;

export interface IContainerState {
}

export interface IViewProps extends WithStyleAndI18nProps<ClassKeys>, IContainerState {
  wordList: TWord[];
}

export interface IContainerProps extends WithStyleAndI18nProps<ClassKeys> {
  wordList: TWord[];
  view: React.ComponentType<IViewProps>;
}
