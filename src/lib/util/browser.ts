// From https://github.com/handsontable/handsontable/blob/f2310fd4f6cf6b3c00c892a176f90320ac785251/src/helpers/feature.js
// MIT License
export const hasCaptionProblem = (() => {
  let _hasCaptionProblem: boolean | undefined;
  
  function detectCaptionProblem() {
    if (_hasCaptionProblem !== void 0) {
      return _hasCaptionProblem;
    }
    
    const TABLE = document.createElement("TABLE");
    TABLE.style.borderSpacing = "0";
    TABLE.style.borderWidth = "0";
    TABLE.style.padding = "0";
    const TBODY = document.createElement("TBODY");
    TABLE.appendChild(TBODY);
    const TR = document.createElement("TR");
    TBODY.appendChild(TR);
    const TD = document.createElement("TD");
    TR.appendChild(TD);
    TD.innerHTML = "<tr><td>t<br>t</td></tr>";
    
    const CAPTION = document.createElement("CAPTION");
    CAPTION.innerHTML = "c<br>c<br>c<br>c";
    CAPTION.style.padding = "0";
    CAPTION.style.margin = "0";
    TABLE.insertBefore(CAPTION, TBODY);
    
    document.body.appendChild(TABLE);
    _hasCaptionProblem = (TABLE.offsetHeight < 2 * TBODY.offsetHeight); // boolean
    document.body.removeChild(TABLE);
    return _hasCaptionProblem;
  }
  
  return detectCaptionProblem;
})();

export function detectLanguage() {
  const url = new URL(window.location.href);
  const search = url.search;
  const queryString = search ? search.replace(/^\?/, "") : null;
  const searchParams = (queryString && window.URLSearchParams) ? new URLSearchParams(queryString) : null;
  
  if (searchParams && searchParams.has("lang")) {
    const l = searchParams.get("lang");
    if (l === "ja") {
      return "ja";
    } else if (l === "en") {
      return "en";
    }
  }
  
  if (window.navigator.language === "ja") {
    return "ja";
  } else if (window.navigator.language === "en") {
    return "en";
  }
  
  return null;
}
