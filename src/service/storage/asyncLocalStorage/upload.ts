import {blobToDataURI} from "../../../lib/dataURItoBlob";
import {toCanonicalPath} from "./common.lib";
import {File} from "../index.type";

export async function upload(file: File): Promise<boolean> {
  const {path, contentType, data} = file;
  if(!data){
    return false;
  }
  
  const key = toCanonicalPath(path);
  const dataURI = typeof data === "string" ?
    `data:text/plain,${data}` : (await blobToDataURI(data, contentType || undefined));
  
  localStorage.setItem(key, dataURI);
  
  return true;
}
