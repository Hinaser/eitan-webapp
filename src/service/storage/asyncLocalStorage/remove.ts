import {toCanonicalPath} from "./common.lib";

export async function remove(path: string){
  const key = toCanonicalPath(path);
  localStorage.removeItem(key);
}
