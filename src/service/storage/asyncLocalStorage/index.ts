import {IStorage} from "../index.type";
import {list} from "./list";
import {download} from "./download";
import {upload} from "./upload";
import {remove} from "./remove";

export function getStorage(): IStorage {
  return {
    list,
    download,
    upload,
    remove,
  };
}
