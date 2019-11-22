import uuidv4 from "uuid/v4";
import {makeFilterFromCondition} from "../../index.lib";
import {Dependency, DependencyMap} from "../../dependency.type";
import {BaseModelType, WithRef} from "../../index.type";
import {OrderBy, SearchConditions, SearchResult} from "../../search.type";
import {DataConnector} from "../index";
import {createDependency} from "../../dependency.lib";

export class LocalStorageConnector extends DataConnector {
  protected readonly prefix: string = `${process.env.REACT_APP_NAME || ""}/dataModel`;
  protected readonly dependency?: Dependency;
  
  public constructor(Dep?: DependencyMap){
    super(Dep);
    
    if(Dep){
      const DependencyKlass = createDependency(Dep);
      this.dependency = new DependencyKlass(
        this.getModels.bind(this),
        this.saveModels.bind(this),
        this.deleteModels.bind(this),
        this.incrementCounter.bind(this),
      );
    }
  }
  
  protected getPath(name: string){
    return `${this.prefix}/${name}`;
  }
  
  public async find<
    M extends BaseModelType=BaseModelType,
    R extends keyof M=never,
    RArr extends Exclude<keyof M, R>=never,
    >(
    collectionName: string,
    keys: string[],
  ): Promise<Array<WithRef<M, R, RArr>>> {
    if(keys.length < 1){
      return [];
    }
    
    const path = this.getPath(collectionName);
    
    const collectionAsString = localStorage.getItem(path);
    if(!collectionAsString){
      return [];
    }
    
    const collection = JSON.parse(collectionAsString) as Array<WithRef<M, R, RArr>>;
    if(!collection || collection.length < 1){
      return [];
    }
    
    return collection.filter(doc => {
      return keys.includes(doc.key);
    });
  }
  
  public async *createSearch<
    M extends BaseModelType=BaseModelType,
    R extends keyof M=never,
    RArr extends Exclude<keyof M, R>=never,
    >(
    collectionName: string,
    itemsPerPage: number,
    condition?: SearchConditions<M>,
    orderBy?: Array<OrderBy<M>>,
  ): AsyncIterableIterator<SearchResult<M, R, RArr>> {
    const path = this.getPath(collectionName);
    
    const collectionAsString = localStorage.getItem(path);
    if(!collectionAsString){
      return;
    }
    
    const collectionObj = JSON.parse(collectionAsString) as Array<WithRef<M, R, RArr>>;
    const collection = condition ? collectionObj.filter(makeFilterFromCondition(condition)) : collectionObj;
    
    if(orderBy && orderBy.length > 0){
      for(let i=0;i<orderBy.length;i++){
        const {field, direction} = orderBy[i];
        collection.sort((a, b) => {
          const fieldOfA = a[field] as number|string|unknown;
          const fieldOfB = b[field] as number|string|unknown;
          if(typeof fieldOfA === "number"){
            return direction === "asc" ?
              fieldOfA - (fieldOfB as number) : (fieldOfB as number) - fieldOfA;
          }
          else if(typeof fieldOfA === "string"){
            return direction === "asc" ?
              fieldOfA.localeCompare(fieldOfB as string) : (fieldOfB as string).localeCompare(fieldOfA);
          }
          else{
            const Astr = JSON.stringify(fieldOfA);
            const Bstr = JSON.stringify(fieldOfB);
            
            return direction === "asc" ? Astr.localeCompare(Bstr) : (Bstr).localeCompare(Astr);
          }
        });
      }
    }
    
    let done: boolean = false;
    let index: number = 0;
    
    do {
      const result = collection.slice(itemsPerPage*index, itemsPerPage);
      if(result.length < 1){
        done = true;
        return [];
      }
      
      const searchResult = {
        result,
        page: {current: index++, max: Math.floor((collection.length-1)/itemsPerPage)},
      };
      
      if(result.length < itemsPerPage){
        done = true;
        return searchResult;
      }
      
      yield searchResult;
    } while(!done);
  }
  
  public async save<M extends BaseModelType = BaseModelType>(collectionName: string, models: M[]){
    const path = this.getPath(collectionName);
    
    const modelsWithKey = models.map(m => {
      if(!m.key){
        const key = uuidv4();
        return {
          ...m,
          key,
        };
      }
      
      return {...m};
    });
    
    const collectionAsString = localStorage.getItem(path);
    if(!collectionAsString){
      const modelsWithKeyAsString = JSON.stringify(modelsWithKey);
      localStorage.setItem(path, modelsWithKeyAsString);
      
      return modelsWithKey;
    }
    
    const collection = JSON.parse(collectionAsString) as M[];
    
    // Merge collection
    const updateList = collection.filter(c => modelsWithKey.find(m => m.key === c.key)).map(c => c.key);
    const mergedCollection = collection.filter(c => !updateList.includes(c.key)).concat(modelsWithKey);
    const mergedCollectionAsString = JSON.stringify(mergedCollection);
    localStorage.setItem(path, mergedCollectionAsString);
    
    return modelsWithKey;
  }
  
  public async delete<M extends BaseModelType = BaseModelType>(collectionName: string, modelKeys: string[]){
    const path = this.getPath(collectionName);
    
    const collectionAsString = localStorage.getItem(path);
    if(!collectionAsString){
      return;
    }
    
    const collection = JSON.parse(collectionAsString) as M[];
    
    // Drop target collections
    const deletingModels = collection.filter(c => modelKeys.find(key => key === c.key));
    const deleteList = deletingModels.map(c => c.key);
    const survivedCollection = collection.filter(c => !deleteList.includes(c.key));
    const survivedCollectionAsString = JSON.stringify(survivedCollection);
    localStorage.setItem(path, survivedCollectionAsString);
    
    if(this.dependency){
      await this.dependency.onDelete(deletingModels);
    }
  }
  
  
  
  public async getModels<M extends BaseModelType>(
    collectionName: string,
    condition?: SearchConditions<M>,
  ){
    const path = this.getPath(collectionName);
    const collectionAsString = localStorage.getItem(path);
    if(!collectionAsString){
      return [] as M[];
    }
    
    const collectionObj = JSON.parse(collectionAsString) as M[];
    return condition ? collectionObj.filter(makeFilterFromCondition(condition)) : collectionObj;
  }
  
  public async saveModels<M extends BaseModelType>(collectionName: string, models: M[]){
    await this.save(collectionName, models);
  }
  
  public async deleteModels<M extends BaseModelType>(collectionName: string, keys: string[]){
    await this.delete(collectionName, keys);
  }
  
  public async incrementCounter<M extends BaseModelType>(
    collectionName: string,
    property: keyof M,
    step: number,
    condition?: SearchConditions<M>,
  ){
    const models = await this.getModels(collectionName, condition);
    
    const incrementedModels = models.map(m => {
      return {
        ...m,
        [property]: (m[property] as any) + step,
      };
    });
    
    await this.saveModels(collectionName, incrementedModels);
  }
}
