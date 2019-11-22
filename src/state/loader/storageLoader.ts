import {getStorage} from "../../service/storage/asyncLocalStorage";
import {IStateLoader} from "./type";
import {RootState, getInitialState} from "../";

export default class StorageLoader extends IStateLoader {
  protected readonly key = "/state";
  
  public async loadState(){
    const storage = getStorage();
    const file = await storage.download(this.key);
    if(!file || !file.data){
      return getInitialState();
    }
    
    const data = file.data as string;
    const state = JSON.parse(data);
    if(!state){
      return getInitialState();
    }
    
    return StorageLoader.upgradeState(state);
  }
  
  public async saveState(state: RootState){
    const storage = getStorage();
    const file = {
      path: this.key,
      data: JSON.stringify(state),
      contentType: "application/json",
    };
    
    await storage.upload(file);
  }
}
