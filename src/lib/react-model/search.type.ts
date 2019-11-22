import {BaseModelType, WithRef} from "./index.type";

export type Operation = "<" | "<=" | "==" | ">=" | ">" | "contains";
export type OrConditions<M extends BaseModelType = BaseModelType> = Array<Condition<M>>;
export type Condition<M extends BaseModelType = BaseModelType, K extends keyof M = keyof M> = {
  field: K;
  op: Operation;
  value: M[K];
  and?: Array<Condition<M>>;
};
export type SearchConditions<M extends BaseModelType> = OrConditions<M>;
export type OrderBy<M extends BaseModelType=BaseModelType> = {
  field: keyof M;
  direction: "asc"|"desc";
};
export type PageIndex = {
  current: number;
  max: number | null; // null when max page index is null.
};
export type SearchResult<M extends BaseModelType = BaseModelType,
  R extends keyof M = never,
  RArr extends Exclude<keyof M, R> = never,
  > = {
  result: Array<WithRef<M, R, RArr>>;
  page: PageIndex;
};
