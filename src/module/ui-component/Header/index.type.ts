import * as React from "react";
import {WithStyleAndI18nProps} from "../../App/types";
import Style from "./index.style";
import {TWord} from "../../../lib/eowp/index";
import {RouteComponentProps} from "react-router";

type ClassKeys = keyof ReturnType<typeof Style>;

export interface IContainerState {
}

export interface IViewProps extends WithStyleAndI18nProps<ClassKeys>, IContainerState {
  wordList: TWord[];
  showBackToHome?: boolean;
  onClickToHome: () => void;
}

export interface IContainerProps extends WithStyleAndI18nProps<ClassKeys>, RouteComponentProps {
  wordList: TWord[];
  view: React.ComponentType<IViewProps>;
}
