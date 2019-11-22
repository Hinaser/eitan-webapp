import {APIResponse, RequestOption} from "./type";
import fetch from "./fetch";
import xhr from "./xhr";
import {rewriteParameter} from "./config";

const httpRequestConfig = {
  useFetch: false as boolean,
  noRewriteParams: false as boolean,
};

export function setConfig(config: Partial<typeof httpRequestConfig>){
  if(typeof config.useFetch === "boolean"){
    httpRequestConfig.useFetch = config.useFetch;
  }
  
  if(typeof config.noRewriteParams === "boolean"){
    httpRequestConfig.noRewriteParams = config.noRewriteParams;
  }
}

export async function httpRequest(
  url: string,
  method: string,
  option?: RequestOption,
  onProgress?: (current: number, total: number) => void,
): Promise<APIResponse>{
  if(!httpRequestConfig.noRewriteParams){
    // Rewrite request params here.
    // For example, you can rewrite url based on environment. 
    ({url, method, option} = rewriteParameter(url, method, option));
  }
  
  if(httpRequestConfig.useFetch){
    return fetch(url, method, option, onProgress);
  }
  
  return xhr(url, method, option, onProgress);
}
