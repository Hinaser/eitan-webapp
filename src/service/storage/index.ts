import {getStorage as getAsyncLocalStorage} from "./asyncLocalStorage";

export function getStorage(type: "local"|"remote"|"remote-secure"){
  if(type === "local"){
    return getAsyncLocalStorage();
  }
  
  return getAsyncLocalStorage();
}
