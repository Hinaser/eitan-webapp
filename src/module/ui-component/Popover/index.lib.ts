import {IContainerProps} from "./index.type";
import {getPositionByWindow} from "../../../lib/util/domElement";
import {getWindowSize} from "../../../service/contentSizeMonitor/resizeMonitor";

function getPlacement(
  windowSize: ReturnType<typeof getWindowSize>,
  anchorPosition: ReturnType<typeof getPositionByWindow>,
  allocation: { width: number, height: number },
  offset: number,
) {
  if (windowSize.height - (anchorPosition.bottom + offset) > allocation.height) {
    return "bottom";
  } else if (anchorPosition.top - offset > allocation.height) {
    return "top";
  } else if (windowSize.width - (anchorPosition.right + offset) > allocation.width) {
    return "right";
  }
  return "left";
}

function getAlign(
  placement: "top" | "bottom" | "left" | "right",
  windowSize: ReturnType<typeof getWindowSize>,
  anchorPosition: ReturnType<typeof getPositionByWindow>,
  allocation: { width: number, height: number },
) {
  if (placement === "top" || placement === "bottom") {
    if (windowSize.width - (anchorPosition.left + allocation.width) >= 0) {
      return "left";
    } else {
      return "right";
    }
  } else {
    if (windowSize.height - (anchorPosition.top + allocation.height) >= 0) {
      return "top";
    } else {
      return "bottom";
    }
  }
}

export function calcPosition(
  anchor: HTMLElement,
  offset: IContainerProps["offset"],
  placement: IContainerProps["placement"],
  align: IContainerProps["align"],
  allocation: {width: number, height: number},
) {
  offset = offset || 0;
  
  const anchorPosition = getPositionByWindow(anchor);
  const position: Partial<typeof anchorPosition> = {};
  const windowSize = getWindowSize();
  
  if (!placement || !align) {
    if (!placement) {
      placement = getPlacement(windowSize, anchorPosition, allocation, offset);
    }
    
    if (!align) {
      align = getAlign(placement, windowSize, anchorPosition, allocation);
    }
  }
  
  switch (placement) {
    case "top":
      position.bottom = anchorPosition.top - offset;
      break;
    case "bottom":
      position.top = anchorPosition.bottom + offset;
      break;
    case "left":
      position.right = anchorPosition.left - offset;
      break;
    case "right":
      position.left = anchorPosition.right + offset;
      break;
    default:
      break;
  }
  
  switch (align) {
    case "left": {
      position.left = anchorPosition.left;
      const overflowX = windowSize.width - (position.left + allocation.width + offset);
      if(overflowX < 0){
        position.left += overflowX;
      }
      break;
    }
    case "right": {
      position.right = windowSize.width - anchorPosition.right;
      const overflowX = windowSize.width - (position.right + allocation.width + offset);
      if(overflowX < 0){
        position.right += overflowX;
      }
      break;
    }
    case "top": {
      position.top = anchorPosition.top;
      const overflowY = windowSize.height - (position.top + allocation.height + offset);
      if(overflowY < 0){
        position.top += overflowY;
      }
      break;
    }
    case "bottom": {
      position.bottom = windowSize.height - anchorPosition.bottom;
      const overflowY = windowSize.height - (position.bottom + allocation.height + offset);
      if(overflowY < 0){
        position.bottom += overflowY;
      }
      break;
    }
  }
  
  return position;
}
