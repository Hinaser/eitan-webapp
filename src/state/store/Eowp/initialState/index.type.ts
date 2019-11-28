// DO NOT FORGET TO INCREMENT VERSION BELOW when you modify the state definition.
import {TExamResult, TQATrend, TWord} from "../../../../lib/eowp";

export const currentVersion = 0;

export type EowpState = {
  version: number;
  loading: boolean;
  wordList: TWord[];
  resultHistory: TExamResult[];
  qaTrend: TQATrend;
  nQuestionsInExam: number;
  nChoices: number,
};
