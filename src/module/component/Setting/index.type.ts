import * as React from "react";
import {WithStyleAndI18nProps} from "../../App/types";
import Style from "./index.style";
import {RouteComponentProps} from "react-router";

type ClassKeys = keyof ReturnType<typeof Style>;

export interface IContainerState {
}

export interface IViewProps extends WithStyleAndI18nProps<ClassKeys>, IContainerState {
  nChoices: number;
  nQuestionsInExam: number;
  onChangeNChoices: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNQuestionsInExam: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IContainerProps extends WithStyleAndI18nProps<ClassKeys>, RouteComponentProps {
  nChoices: number;
  nQuestionsInExam: number;
  changeNChoices: (nChoices: number) => void;
  changeNQuestionsInExam: (nQuestionsInExam: number) => void;
  view: React.ComponentType<IViewProps>;
}
