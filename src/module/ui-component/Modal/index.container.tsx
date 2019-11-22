import * as React from "react";
import * as ReactDOM from "react-dom";
import {IContainerProps, IContainerState, IViewProps} from "./index.type";
import memoizeOne from "memoize-one";


let zIndex = 99999;

const getStyle = memoizeOne((_zIndex: number) => {
  return {
    zIndex: _zIndex,
  };
});

const getPopoverStyle = memoizeOne((height: number) => {
  return {
    maxHeight: height - 16,
  };
});


class ModalContainer extends React.Component<IContainerProps, IContainerState> {
  protected readonly zIndex: number = zIndex;
  
  constructor(props: IContainerProps){
    super(props);
    
    this.onClickVoid = this.onClickVoid.bind(this);
  }
  
  public componentDidMount(){
    zIndex++;
  }
  
  public componentWillUnmount(){
    zIndex--;
  }
  
  public render(){
    const {
      open,
      children,
      classes,
      className,
      notCloseOnClickBackground,
      title,
      onClickOK,
      onClickCancel,
      OKButtonLabel,
      CancelButtonLabel,
      contentHeight,
      view: Component,
    } = this.props;
    
    if(!open){
      return null;
    }
    
    const body = document.body;
    const style = getStyle(this.zIndex);
    const popoverStyle = getPopoverStyle(contentHeight);
    
    return ReactDOM.createPortal(
      (
        <Component
          classes={classes}
          className={className}
          onClose={!notCloseOnClickBackground ? this.onClickVoid : undefined}
          style={style}
          popoverStyle={popoverStyle}
          title={title}
          onClickOK={onClickOK}
          onClickCancel={onClickCancel}
          OKButtonLabel={OKButtonLabel}
          CancelButtonLabel={CancelButtonLabel}
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
}

export const withContainer = (view: React.ComponentType<IViewProps>) => {
  return (props: Omit<IContainerProps, "view">) => {
    return (
      <ModalContainer {...props} view={view} />
    );
  };
};
