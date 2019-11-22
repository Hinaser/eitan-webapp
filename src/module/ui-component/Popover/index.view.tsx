import * as React from "react";
import memoizeOne from "memoize-one";
import {IViewProps} from "./index.type";

const getStyle = memoizeOne((position: IViewProps["position"], loaded: boolean) => {
  if(!loaded){
    return {
      opacity: 0,
    };
  }
  
  return {
    top: position.top,
    left: position.left,
    right: position.right,
    bottom: position.bottom,
  };
});


const PopoverView = (props: IViewProps) => {
  const {
    classes,
    children,
    position,
    onClose,
    onLoad,
  } = props;
  
  const ref = React.useRef(null);
  
  React.useEffect(() => {
    onLoad(ref);
  }, [onLoad]);
  
  const style = getStyle(position, Boolean(ref.current));
  
  return (
    <div
      className={classes.root}
      role="presentation"
      onClick={onClose}
    >
      <div
        className={classes.popover}
        style={style}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default PopoverView;
