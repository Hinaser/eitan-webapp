// https://stackoverflow.com/questions/12168909/blob-from-dataurl

export function dataURItoBlob(dataURI: string) {
  const dataUriParts = dataURI.split(",");
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataUriParts[1]);
  
  // separate out the mime component
  const mimeString = dataUriParts[0].split(":")[1].split(";")[0];
  
  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  
  // create a view into the buffer
  const ia = new Uint8Array(ab);
  
  // set the bytes of the buffer to the correct values
  for(let i = 0; i < byteString.length; i++){
    ia[i] = byteString.charCodeAt(i);
  }
  
  // write the ArrayBuffer to a blob, and you"re done
  return new Blob([ab], {type: mimeString});
}

export async function blobToDataURI(blob: Blob, mimeType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.addEventListener("load", (ev) => {
      const dataURL = reader.result as string;
      if(!mimeType){
        return resolve(dataURL);
      }
      else{
        const isBase64Encoded = /data:.+?;base64,/.test(dataURL);
        const modifiedDataURL = isBase64Encoded ?
          dataURL.replace(/data:.+?;base64,/, `data:${mimeType};base64,`)
          : dataURL.replace(/data:.+?,/, `data:${mimeType};base64,`);
        
        return resolve(modifiedDataURL);
      }
    });
    
    reader.addEventListener("error", (ev) => {
      reject(reader.error);
    });
    
    reader.readAsDataURL(blob);
  });
}

export function getMimeTypeFromDataURI(dataURI: string){
  const dataUriParts = dataURI.split(",");
  return dataUriParts[0].split(":")[1].split(";")[0];
}
