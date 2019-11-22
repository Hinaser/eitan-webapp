export interface BaseModelType {
  key: string;
  visibility?: "public" | "private"; // Default visibility is "private".
}

export type ModelRef = string;
export type FuzzyModel<M extends BaseModelType = BaseModelType> = M | ModelRef | null;
export type FuzzyModelArray<M extends BaseModelType = BaseModelType> = Array<M | ModelRef> | null;

export function isModelRef(ref: FuzzyModel | any): ref is ModelRef {
  return typeof ref === "string" && Boolean(ref);
}

export type UnResolvedRef<M extends BaseModelType, K extends keyof M> =
  M & { [P in Exclude<K, "key">]: ModelRef | null };
export type UnResolvedArrayRef<M extends BaseModelType, K extends keyof M> =
  M & { [P in Exclude<K, "key">]: ModelRef[] | null };
export type WithRef<M extends BaseModelType, R extends keyof M, RArr extends Exclude<keyof M, R>> =
  UnResolvedArrayRef<UnResolvedRef<M, R>, RArr>;
export type RefModel<M extends BaseModelType, K extends keyof M, ResolvedModel> =
  M & { [P in Exclude<K, "key">]: ResolvedModel | null };
export type RefModelArray<M extends BaseModelType, K extends keyof M, ResolvedModel> =
  M & { [P in Exclude<K, "key">]: ResolvedModel[] | null };
export type WithModel<M extends BaseModelType, R extends keyof M, RArr extends Exclude<keyof M, R>, ResolvedModel> =
  RefModelArray<RefModel<M, R, ResolvedModel>, RArr, ResolvedModel>;
