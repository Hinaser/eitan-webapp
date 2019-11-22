import {APIResponse, normalizeContentType, RequestOption, ResponseType} from "./type";

export default async function sendRequest(
  url: string,
  method: string,
  option?: RequestOption,
  onProgress?: (current: number, total: number) => void,
): Promise<APIResponse>{
  let response: Response;
  let type: ResponseType;
  
  return fetch(url, {
    ...(option||{}),
    method,
  })
    .then(r => {
      response = r;
      const {headers} = response;
      const contentType = headers.get("content-type");
      // @todo Test whether content-type based response works as expected
      
      if(option && option.parseAs){
        switch(option.parseAs){
          case "arraybuffer":
            type = "arraybuffer";
            return response.arrayBuffer();
          case "blob":
            type = "blob";
            return response.blob();
          case "formData":
            type = "formData";
            return response.formData();
          case "json":
            type = "json";
            return response.json();
          default:
            type = "text";
            return response.text();
        }
      }
      
      type = normalizeContentType(contentType);
      
      if(type === "text"){
        return response.text();
      }
      else if(type === "json"){
        return response.json();
      }
      else if(type === "document"){
        return response.text();
      }
      else if(type === "formData"){
        return response.formData();
      }
      else if(type === "blob"){
        return response.blob();
      }
      /*
      else if(type === "arraybuffer"){
        return response.arrayBuffer();
      }
      */
      
      return response.arrayBuffer();
    })
    .then(body => {
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      
      if(typeof onProgress === "function"){
        onProgress(0, 0);
      }
      
      return {
        type,
        headers,
        ok: response.ok,
        status: response.status,
        body,
        finalUrl: response.url,
      };
    });
}
