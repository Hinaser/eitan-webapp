import * as React from "react";
import * as ReactDOM from "react-dom";
import {IContainerProps, IContainerState, IViewProps} from "./index.type";
import {calcPosition} from "./index.lib";


class PopoverContainer extends React.Component<IContainerProps, IContainerState> {
  constructor(props: IContainerProps){
    super(props);
    
    this.onClickVoid = this.onClickVoid.bind(this);
    this.onLoad = this.onLoad.bind(this);
    
    this.state = {
      allocation: {width: 200, height: 80},
    };
  }
  
  public render(){
    const {
      open,
      anchor,
      children,
      classes,
      placement,
      align,
      offset,
      view: Component,
    } = this.props;
    const {allocation} = this.state;
    
    if(!open || !anchor){
      return null;
    }
    
    const position = calcPosition(anchor, offset, placement, align, allocation);
    const body = document.body;
    
    return ReactDOM.createPortal(
      (
        <Component
          classes={classes}
          position={position}
          onClose={this.onClickVoid}
          onLoad={this.onLoad}
        >
          {children}
        </Component>
      ),
      body,
    );
  }
  
  public onClickVoid(e: React.MouseEvent<HTMLElement, MouseEvent>){
    if(e.target !== e.currentTarget){
      return;
    }
    
    if(typeof this.props.onClose !== "function"){
      return;
    }
    
    this.props.onClose();
  }
  
  public onLoad(ref: React.RefObject<HTMLDivElement>){
    const popover = ref.current;
    if(!popover){
      return;
    }
    
    const {height, width} = popover.getBoundingClientRect();
    this.setState({
      allocation: {height, width},
    });
  }
}

export const withContainer = (view: React.ComponentType<IViewProps>) => {
  return (props: Omit<IContainerProps, "view">) => {
    return (
      <PopoverContainer {...props} view={view} />
    );
  };
};
