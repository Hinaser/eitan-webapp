import {BaseModelType, WithModel} from "./index.type";
import {Condition, PageIndex, SearchConditions} from "./search.type";

export type SearchResultWithModel<M extends BaseModelType = BaseModelType,
  R extends keyof M = never,
  RArr extends Exclude<keyof M, R> = never,
  ResolvedModel extends BaseModelType = BaseModelType,
  > = {
  result: Array<WithModel<M, R, RArr, ResolvedModel>>;
  page: PageIndex;
};
export type BackendGet<M extends BaseModelType = BaseModelType> = (
  collectionName: string,
  condition?: SearchConditions<M>,
) => Promise<M[]>;
export type BackendSet<M extends BaseModelType = BaseModelType> = (
  collectionName: string,
  models: M[],
) => Promise<void>;
export type BackendDelete<M extends BaseModelType = BaseModelType> = (
  collectionName: string,
  models: M[],
) => Promise<void>;
export type BackendIncrement<M extends BaseModelType = BaseModelType> = (
  collectionName: string,
  property: Exclude<keyof M, symbol|number>,
  step: number,
  condition?: SearchConditions<M>,
) => Promise<void>;

/**
 * Describe model dependencies here.
 * e.g. Delete xxx model when yyy model is deleted.
 *
 * The code of this Dependency class is assumed to be run on backend server.
 * In case backend server doesn't support javascript, please write dependency codes descriptive
 * so that anyone can convert javascript dependency code into another language.
 */
export class Dependency {
  public constructor(
    backendGet?: BackendGet,
    backendSet?: BackendSet,
    backendDelete?: BackendDelete,
    backendIncrement?: BackendIncrement,
  ) {
    // Only for type assertion
    return;
  }
  
  public async onDelete(models: BaseModelType[], ...args: any[]) {
    return;
  }
}

export type DependencyClass = new (...args: any[]) => Dependency;




export type DepCondition<M extends BaseModelType=BaseModelType, K extends keyof M=keyof M> = {
  ref?: string;
  value?: any;
  and?: Array<DepCondition<M>>;
} & Exclude<Condition<M, K>, "value"|"and">;

export type DepOrConditions<M extends BaseModelType=BaseModelType> = Array<DepCondition<M, any>>;

export type DeleteDependency<M extends BaseModelType> = {
  collection: string;
  condition: DepOrConditions<M>;
  dependency?: DependencyMap;
};

export type RemoveRefAction = {
  operation: "removeRefFromRefArray";
};

export type DecrementAction = {
  operation: "decrement";
};

export type UpdateOperation<M extends BaseModelType=BaseModelType> = {
  prop: keyof M;
  action: RemoveRefAction|DecrementAction;
};

export type UpdateDependency<M extends BaseModelType> = {
  collection: string;
  condition: DepOrConditions<M>;
  updates: UpdateOperation[];
};

export type DependencyMap = {
  remove?: Array<DeleteDependency<any>>;
  update?: Array<UpdateDependency<any>>;
};
