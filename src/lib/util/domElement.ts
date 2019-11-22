import {hasCaptionProblem} from "./browser";

export function getScrollBarWidth(): number {
  const {document} = window;
  
  // Create the measurement node
  const scrollDiv = document.createElement("div");
  scrollDiv.style.width = "100px";
  scrollDiv.style.height = "100px";
  scrollDiv.style.overflow = "scroll";
  scrollDiv.style.position = "absolute";
  scrollDiv.style.top = "-100px";
  document.body.appendChild(scrollDiv);

  // Get the scrollbar width
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  // Delete the DIV 
  document.body.removeChild(scrollDiv);
  
  return scrollbarWidth;
}

export function getTextContainerSize(text: string, fontSize: number): {width: number, height: number} {
  const {document} = window;
  
  const div = document.createElement("div");
  div.style.fontSize = fontSize + "px";
  div.style.position = "absolute";
  div.style.visibility = "hidden";
  div.style.height = "auto";
  div.style.width = "auto";
  div.style.whiteSpace = "nowrap";
  div.style.top = "-1000px";
  div.innerText = text;
  document.body.appendChild(div);
  
  const height = div.clientHeight + 1;
  const width = div.clientWidth + 1;
  
  // Delete the DIV 
  document.body.removeChild(div);
  
  return {height, width};
}



/**
 * From https://github.com/handsontable/handsontable/blob/f2310fd4f6cf6b3c00c892a176f90320ac785251/src/helpers/dom/element.js
 * @param elem
 * @returns {number} Element's outer height
 */
function getOuterHeight(elem: HTMLElement){
  if (hasCaptionProblem() && elem.firstChild && elem.firstChild.nodeName === "CAPTION") {
    // fixes problem with Firefox ignoring <caption> in TABLE.offsetHeight
    // jQuery (1.10.1) still has this unsolved
    // may be better to just switch to getBoundingClientRect
    // http://bililite.com/blog/2009/03/27/finding-the-size-of-a-table/
    // http://lists.w3.org/Archives/Public/www-style/2009Oct/0089.html
    // http://bugs.jquery.com/ticket/2196
    // http://lists.w3.org/Archives/Public/www-style/2009Oct/0140.html#start140
    return elem.offsetHeight + (elem.firstChild as HTMLElement).offsetHeight;
  }
  
  return elem.offsetHeight;
}

/**
 * @param {HTMLElement} element
 * @returns {number}
 */
export function getContainerHeight(element: HTMLElement){
  const elem = element.cloneNode(true) as HTMLElement;
  elem.style.position = "absolute";
  elem.style.top = "-2000px";
  window.document.body.appendChild(elem);
  const height = getOuterHeight(elem);
  window.document.body.removeChild(elem);
  return height;
}

export function getPositionByWindow(el: HTMLElement){
  const rect = el.getBoundingClientRect();
  
  return {
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right,
    width: rect.width,
    height: rect.height,
  };
}

export function getPositionByDocument(el: HTMLElement){
  const scrollX = window.pageXOffset;
  const scrollY = window.pageYOffset;
  const positionByWindow = getPositionByWindow(el);
  
  return {
    top: positionByWindow.top + scrollY,
    left: positionByWindow.left + scrollX,
    bottom: positionByWindow.bottom + scrollY,
    right: positionByWindow.right + scrollX,
    width: positionByWindow.width,
    height: positionByWindow.height,
  };
}
