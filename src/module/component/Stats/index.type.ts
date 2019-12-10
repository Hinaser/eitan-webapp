import * as React from "react";
import {WithStyleAndI18nProps} from "../../App/types";
import Style from "./index.style";
import {RouteComponentProps} from "react-router";
import {WithContentSizeProps} from "../../../service/contentSizeMonitor/context";
import {TQATrend} from "../../../lib/eowp/index";

type ClassKeys = keyof ReturnType<typeof Style>;

export interface IContainerState {
}

export interface IViewProps extends WithStyleAndI18nProps<ClassKeys>, IContainerState {
  containerStyle: {height: number};
  width: number;
  qaDataIn7Days: Array<{date: string, time: number, allCount: number, missCount: number, missRate: number}>;
  qaDataIn12Months: Array<{date: string, time: number, allCount: number, missCount: number, missRate: number}>;
}

export interface IContainerProps extends WithStyleAndI18nProps<ClassKeys>, WithContentSizeProps, RouteComponentProps {
  qaTrend: TQATrend;
  view: React.ComponentType<IViewProps>;
}
