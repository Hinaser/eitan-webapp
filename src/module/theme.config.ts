import {AppTheme} from "../style/theme/type";
import {createTheme as createDefaultTheme} from "../style/theme/default";
import {createTheme as createDarkTheme} from "../style/theme/dark";

export function getTheme(name: string): AppTheme {
  if(name === "dark"){
    return createDarkTheme();
  }
  
  return createDefaultTheme();
}
