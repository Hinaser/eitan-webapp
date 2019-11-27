// DO NOT FORGET TO INCREMENT VERSION BELOW when you modify the state definition.
import {TExam, TExamResult, TQATrend, TWord} from "../../../../lib/eowp/index";

export const currentVersion = 0;

export type EowpState = {
  version: number;
  loading: boolean;
  wordList: TWord[];
  examHistory: TExam[];
  resultHistory: TExamResult[];
  qaTrend: TQATrend[];
  nQuestionsInExam: number;
  nChoices: number,
};
