export interface RequestOption extends RequestInit {
  parseAs?: ResponseType;
}

export type ResponseType = "document" | "json" | "text" | "formData" | "blob" | "arraybuffer";

export interface APIResponse {
  type: ResponseType;
  headers: Record<string, string>;
  ok: boolean;
  status: number;
  body: any;
  finalUrl: string;
}

export function normalizeContentType(contentType: string|null){
  if(!contentType){
    return "text";
  }
  else if(contentType.match(/javascript|charset/)){
    return "text";
  }
  else if(contentType.match(/application\/json/)){
    return "json";
  }
  else if(contentType.match(/html|xml/)){
    return "document";
  }
  else if(contentType.match(/form-data/)){
    return "formData";
  }
  else if(contentType.match(/image|audio|video|application\/ogg/)){
    return "blob";
  }
  else if(contentType.match(/text/)){
    return "text";
  }
  
  return "arraybuffer";
}
