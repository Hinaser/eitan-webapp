import * as React from "react";
import {RouteComponentProps} from "react-router";
import {WithStyleAndI18nProps} from "../../App/types";
import {WithContentSizeProps} from "../../../service/contentSizeMonitor/context";
import Style from "./index.style";
import {TQATrend, TWord} from "../../../lib/eowp/index";

type ClassKeys = keyof ReturnType<typeof Style>;

export interface IContainerState {
  itemsPerPage: number;
  pageIndex: number;
  hideMean: boolean;
  sortType: "alphabet"|"noSort"|"mostTroubling";
}

export interface IViewProps extends WithStyleAndI18nProps<ClassKeys>, IContainerState {
  wordList: TWord[];
  containerStyle: {height: number};
  maxPage: number;
  pageIndex: number;
  onChangePage: (e: React.MouseEvent<HTMLElement>) => void;
  onChangeItemsPerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeHideMean: () => void;
  onChangeSortType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface IContainerProps extends WithStyleAndI18nProps<ClassKeys>, WithContentSizeProps, RouteComponentProps {
  wordList: TWord[];
  qaTrend: TQATrend,
  view: React.ComponentType<IViewProps>;
}
