import * as React from "react";
import {RouteComponentProps} from "react-router";
import {WithStyleAndI18nProps} from "../../App/types";
import Style from "./index.style";
import {WithContentSizeProps} from "../../../service/contentSizeMonitor/context";
import {TExam, TWord} from "../../../lib/eowp/index";

type ClassKeys = keyof ReturnType<typeof Style>;

export interface IContainerState {
  qaList: TExam["qa"];
  currentQa: number|null;
  readList: number[];
  answerResult: "correct"|"no"|null;
}

export interface IViewProps extends WithStyleAndI18nProps<ClassKeys>, IContainerState {
  styleForHistoryContainer: {width: number, height: number};
  styleForQuestionContainer: {width: number, height: number};
  onClickAnswer: (e: React.MouseEvent<HTMLElement>) => void;
  onClickNext: (e: React.MouseEvent<HTMLElement>) => void;
  onClickQuestion: (e: React.MouseEvent<HTMLElement>) => void;
  onClickToHome: (e: React.MouseEvent<HTMLElement>) => void;
  onClickComplete: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface IContainerProps extends WithStyleAndI18nProps<ClassKeys>, WithContentSizeProps, RouteComponentProps {
  wordList: TWord[];
  nChoices: number;
  nQuestionsInExam: number;
  view: React.ComponentType<IViewProps>;
}
