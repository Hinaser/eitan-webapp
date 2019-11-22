import {CHANGE_LANGUAGE} from "./index.type";

export function changeLanguage(lang: string) {
  return {
    type: CHANGE_LANGUAGE,
    payload: {lang},
  };
}
