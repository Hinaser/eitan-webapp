import {toCanonicalPath, getFile} from "./common.lib";
import {File} from "../index.type";

export async function download(path: string): Promise<File|null> {
  const key = toCanonicalPath(path);
  const dataURI = localStorage.getItem(key);
  if(!dataURI){
    return null;
  }
  
  const partialFile = getFile(dataURI);
  if(!partialFile){
    return null;
  }
  
  return {
    ...partialFile,
    path,
  };
}
