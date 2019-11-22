import {DataConnector} from "./connector/index";
import {DependencyMap, SearchResultWithModel} from "./dependency.type";
import {BaseModelType} from "./index.type";
import {OrderBy, SearchConditions, SearchResult} from "./search.type";

export abstract class BaseModelCollection<M extends BaseModelType=BaseModelType> {
  public abstract connector: DataConnector;
  public readonly collectionName: string = "";
  public dependency?: DependencyMap;
  
  public setConnector(Connector: new (d?: DependencyMap) => DataConnector){
    this.connector = new Connector(this.dependency);
  }
  
  public abstract async find(
    keys: string[],
    ...args: any[]
  ): Promise<M[]>;
  
  public async *createSearch(
    itemsPerPage: number,
    condition?: SearchConditions<M>,
    orderBy?: Array<OrderBy<M>>,
    ...args: any[]
  ): AsyncIterableIterator<SearchResult|SearchResultWithModel>{
    yield {result: [], page: {current: 0, max: null}};
  }
  
  public abstract async save(models: M[], ...args: any[]): Promise<M[]>;
  
  public abstract async delete(modelKeys: string[], ...args: any[]): Promise<void>;
}
