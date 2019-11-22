import {BaseModelType, ModelRef} from "./index.type";
import {convertRefToValueInCondition} from "./index.lib";
import {Dependency, DependencyMap} from "./dependency.type";
import {SearchConditions} from "./search.type";

function removeRefFromRefArray<M extends BaseModelType>(deletingModel: BaseModelType, model: M, prop: keyof M){
  const refArray = model[prop] as unknown|ModelRef[];
  
  if(!Array.isArray(refArray)){
    return refArray;
  }
  
  return refArray.filter((ref: ModelRef) => ref !== deletingModel.key);
}

function decrement<M extends BaseModelType>(model: M, prop: keyof M){
  const counter = model[prop] as unknown|number;
  if(typeof counter !== "number"){
    return counter;
  }
  
  return counter - 1;
}

export function createDependency(dependency: DependencyMap){
  const {remove, update} = dependency;
  
  return class Dep extends Dependency {
    public constructor(
      protected readonly getModels: <Model extends BaseModelType>(
        collectionName: string,
        condition?: SearchConditions<Model>,
      ) => Promise<Model[]>,
      protected readonly saveModels: <Model extends BaseModelType>(
        collectionName: string,
        models: Model[],
      ) => Promise<void>,
      protected readonly deleteModels: <Model extends BaseModelType>(
        collectionName: string,
        keys: string[],
      ) => Promise<void>,
      protected readonly incrementModels: <Model extends BaseModelType>(
        collectionName: string,
        property: keyof Model,
        step: number,
        condition?: SearchConditions<Model>,
      ) => Promise<void>,
    ){
      super();
    }
    
    public async onDelete(deletingModels: BaseModelType[]){
      if(remove && remove.length > 0){
        const removeTasks = remove.map(async (r) => {
          const {collection, condition: refCondition, dependency: subDependency} = r;
          
          const deleteModelTasks = deletingModels.map(async (model) => {
            const condition = convertRefToValueInCondition(refCondition, model);
            const models = await this.getModels(collection, condition);
            
            if(subDependency){
              const SubDep = createDependency(subDependency);
              const subDep = new SubDep(
                this.getModels,
                this.saveModels,
                this.deleteModels,
                this.incrementModels,
              );
              await subDep.onDelete(models);
            }
            else{
              await this.deleteModels(collection, models.map(m => m.key));
            }
          });
          
          await Promise.all(deleteModelTasks);
        });
        
        await Promise.all(removeTasks);
      }
      
      if(update && update.length > 0){
        const updateTasks = update.map(async (upd) => {
          const {collection, condition: refCondition, updates} = upd;
          
          const updateModelTasks = deletingModels.map(async (deletingModel) => {
            const condition = convertRefToValueInCondition(refCondition, deletingModel);
            const models = await this.getModels(collection, condition);
            
            const newModels = models.map(m => {
              m = {...m};
              
              updates.forEach(u => {
                const {prop, action} = u;
                if(action.operation === "removeRefFromRefArray"){
                  m[prop] = removeRefFromRefArray(deletingModel, m, prop) as any;
                }
                else if(action.operation === "decrement"){
                  m[prop] = decrement(m, prop) as any;
                }
              });
              
              return m;
            });
            
            await this.saveModels(collection, newModels);
          });
          
          await Promise.all(updateModelTasks);
        });
        
        await Promise.all(updateTasks);
      }
    }
  };
}
