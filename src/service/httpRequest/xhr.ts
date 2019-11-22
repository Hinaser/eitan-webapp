import {RequestOption, APIResponse, normalizeContentType} from "./type";

export default async function sendRequest(
  url: string,
  method: string,
  option?: RequestOption,
  onProgress?: (current: number, total: number) => void,
): Promise<APIResponse> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    
    if(typeof(onProgress) === "function"){
      xhr.onprogress = e => {
        const loadedBytes = e.loaded;
        const totalBytes = e.total;
        onProgress(loadedBytes, totalBytes);
      };
    }
    
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        const headersContainer: Record<string, string> = {};
        const headers = xhr
          .getAllResponseHeaders()
          .split(/\r\n/)
          .reduce((acc: Record<string, string>, h) => {
            const header = h.split(/:/) as [string, string];
            if(Array.isArray(header) && header.length === 2){
              acc[header[0].toLocaleLowerCase()] = header[1];
            }
            return acc;
          }, headersContainer);
        const contentType = headers["content-type"] as string;
        const type = (option && option.parseAs) || normalizeContentType(contentType);
        const body: any = (()=>{
          if((option && option.parseAs)){
            return xhr.response;
          }
          
          if(type === "text" || type === "formData"){
            return xhr.responseText;
          }
          else if(type === "json"){
            return JSON.parse(xhr.response);
          }
          
          return xhr.response;
        })();
        
        const response: APIResponse = {
          type,
          body,
          headers,
          ok: 200 <= xhr.status && xhr.status < 300,
          status: xhr.status,
          finalUrl: xhr.responseURL,
        };
        return resolve(response);
      }
    };
    
    xhr.open(method, url);
    
    if(option && option.parseAs){
      xhr.responseType = option.parseAs === "formData" ? "text" : option.parseAs;
    }
    
    if(option){
      if(option.headers){
        Object.entries(option.headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }
      if(option.credentials){
        xhr.withCredentials = option.credentials && option.credentials !== "omit";
      }
    }
    
    xhr.send((option && option.body) || null);
  });
}
