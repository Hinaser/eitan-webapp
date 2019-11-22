import {dataURItoBlob} from "../../../lib/dataURItoBlob/index";
import {File} from "../index.type";

const prefix = `/${process.env.REACT_APP_NAME || "qreate"}/storage`;

export function toCanonicalPath(path: string){
  return `${prefix}/${path.replace(/^\//, "")}`;
}

export function toLocalPath(canonicalPath: string){
  return canonicalPath.replace(new RegExp(`^${prefix}`), "");
}

export function getFile(dataURI: string): Omit<File, "path"> | null {
  const contentTypeRegexp = new RegExp(`^data:(.+?)(;base64)?,`);
  const matches = contentTypeRegexp.exec(dataURI);
  if(!matches) {
    return null;
  }
  
  const mimeType = matches[1];
  const isBase64Encoded = Boolean(matches[2]);
  const data = isBase64Encoded ? dataURItoBlob(dataURI) : dataURI.split(/,/)[1];
  
  return {
    contentType: mimeType,
    data,
  };
}
