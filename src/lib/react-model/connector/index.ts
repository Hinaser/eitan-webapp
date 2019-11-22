import {flatten} from "../index.lib";
import {DependencyMap} from "../dependency.type";
import {BaseModelType, isModelRef, ModelRef, UnResolvedArrayRef, UnResolvedRef, WithRef} from "../index.type";
import {OrderBy, SearchConditions, SearchResult} from "../search.type";


export abstract class DataConnector {
  protected constructor(
    protected readonly dependencyMap?: DependencyMap,
  ){}
  
  public abstract find<
    M extends BaseModelType = BaseModelType,
    R extends keyof M = never,
    RArr extends Exclude<keyof M, R> = never,
    >(
    collectionName: string,
    keys: string[],
  ): Promise<Array<WithRef<M, R, RArr>>>;
  
  public abstract createSearch<
    M extends BaseModelType = BaseModelType,
    R extends keyof M = never,
    RArr extends Exclude<keyof M, R> = never,
    >(
    collectionName: string,
    itemsPerPage: number,
    condition?: SearchConditions<M>,
    orderBy?: Array<OrderBy<M>>,
  ): AsyncIterableIterator<SearchResult<M, R, RArr>>;
  
  public abstract save<M extends BaseModelType = BaseModelType>(collectionName: string, models: M[]): Promise<M[]>;
  
  public abstract delete<M extends BaseModelType = BaseModelType>(collectionName: string, modelKeys: string[]): Promise<void>;
  
  public async joinRef<M extends BaseModelType,
    R extends BaseModelType,
    K extends keyof M,
    >(
    refKey: K,
    collectionForRef: string,
    models: M[],
  ): Promise<Array<M & { [P in K]: R | null }>> {
    const refs = models.map(model => {
      if (isModelRef(model[refKey])) {
        return model[refKey] as any;
      }
      
      return undefined;
    }).filter(f => f) as string[];
    
    const refEntities = (await this.find<R>(collectionForRef, refs))
      .filter((entity, i, arr) => i === arr.findIndex(a => a.key === entity.key))
    ;
    
    return models.map(model => {
      return {
        ...model,
        [refKey]: refEntities.find(entity => entity.key === (model[refKey] as any)) || null,
      };
    }) as Array<M & { [P in K]: R | null }>;
  }
  
  public async joinRefArray<M extends BaseModelType,
    R extends BaseModelType,
    K extends keyof M,
    >(
    refKey: K,
    collectionForRef: string,
    models: M[],
  ): Promise<Array<M & { [P in K]: R[] }>> {
    const searchingRefsStack = models.map(model => {
      const refs: string[] = model[refKey] as any;
      if(!refs){
        return [];
      }
      
      return refs.map(ref => {
        if (isModelRef(ref)) {
          return ref;
        }
        return undefined;
      }).filter(r => r);
    });
    const searchingRefs = flatten(searchingRefsStack)
      .filter((r, i, arr) => i === arr.findIndex(a => a === r)) as string[];
    
    const refEntities = (await this.find<R>(collectionForRef, searchingRefs))
      .filter((entity, i, arr) => i === arr.findIndex(a => a.key === entity.key))
    ;
    
    return models.map(model => {
      const refs: string[] = model[refKey] as any;
      return {
        ...model,
        [refKey]: refEntities.filter(entity => refs.includes(entity.key || "")),
      };
    }) as Array<M & { [P in K]: R[] }>;
  }
  
  public serializeRef<M extends BaseModelType, K extends keyof M>(
    refKey: K,
    models: M[],
  ): Array<UnResolvedRef<M, K>> {
    return models.map(model => {
      const refModel = model[refKey] as any;
      return {
        ...model,
        [refKey]: typeof refModel === "string" ? refModel : refModel.key,
      };
    });
  }
  
  public serializeRefArray<M extends BaseModelType, K extends keyof M>(
    refKey: K,
    models: M[],
  ): Array<UnResolvedArrayRef<M, K>> {
    return models.map(model => {
      const refModelArray = model[refKey] as any;
      return {
        ...model,
        [refKey]: (refModelArray as Array<BaseModelType|ModelRef>).map(refModel => {
          return typeof refModel === "string" ? refModel : refModel.key;
        }) as string[],
      };
    });
  }
}
