import * as React from "react";

export interface IContainerProps {
  children: React.ReactElement;
  mouseEvent?: "onClick" | "onMouseDown" | "onMouseUp" | false;
  touchEvent?: "onTouchStart" | "onTouchEnd" | false;
  onClickAway: (e: MouseEvent) => any;
}
