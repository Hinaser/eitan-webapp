import {getFile, toCanonicalPath, toLocalPath} from "./common.lib";
import {File} from "../index.type";

export async function list(path?: string, recursive?: boolean): Promise<File[]>{
  const ls: File[] = [];
  for(let i=0;i<localStorage.length;i++){
    const key = localStorage.key(i);
    
    if(typeof key !== "string"){
      continue;
    }
    
    const cPath = toCanonicalPath(path || "");
    
    if(!new RegExp(`^${cPath}`).test(key)){
      continue;
    }
  
    const lPath = toLocalPath(key);
    
    if(!recursive){
      if(!new RegExp(`^${path}[^/]*`).test(lPath)){
        continue;
      }
    }
    
    const dataURI = localStorage.getItem(cPath);
    if(!dataURI){
      continue;
    }
  
    const file = getFile(dataURI);
    if(!file){
      continue;
    }
  
    ls.push({
      ...file,
      path: lPath,
    });
  }
  
  return ls;
}
