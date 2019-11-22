import {LocalStorageConnector} from "../lib/react-model/connector/localStorage";

export const DefaultConnector = LocalStorageConnector;

export function getConnectorByName(type: "local"|"remote"){
  if(type === "local"){
    return LocalStorageConnector;
  }
  
  return LocalStorageConnector;
}
