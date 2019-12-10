import * as React from "react";
import {WithStyleAndI18nProps} from "../../App/types";
import Style from "./index.style";
import {RouteComponentProps} from "react-router";
import {TExamResult, TQATrend, summarizeStats, TWord} from "../../../lib/eowp";

type ClassKeys = keyof ReturnType<typeof Style>;

export interface IContainerState {
}

export interface IViewProps extends WithStyleAndI18nProps<ClassKeys>, IContainerState {
  onClickMenu: (e: React.MouseEvent<HTMLElement>) => void;
  summary: ReturnType<typeof summarizeStats>;
}

export interface IContainerProps extends WithStyleAndI18nProps<ClassKeys>, RouteComponentProps {
  wordList: TWord[];
  resultHistory: TExamResult[];
  qaTrend: TQATrend;
  view: React.ComponentType<IViewProps>;
}
