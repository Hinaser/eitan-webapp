import {RequestOption} from "./type";

export function rewriteParameter(
  url: string,
  method: string,
  option?: RequestOption,
) {
  /**
   * Define rewrite rule as you like.
   * i.e. Rewrite url based on env var.
   * if(REACT_APP_ENV === "development"){
   *   url = url.replace(/^https://prod.aaa.bbb/, "https://dev.aaa.bbb/");
   * }
   */
  return {url, method, option};
}
