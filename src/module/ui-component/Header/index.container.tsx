import * as React from "react";
import {IContainerProps, IContainerState, IViewProps} from "./index.type";

class HeaderContainer extends React.Component<IContainerProps, IContainerState> {
  public state = {
    content: "",
  };
  
  public render(){
    const {view: Component} = this.props;

    return (
      <Component {...this.props} {...this.state} />
    );
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <HeaderContainer {...props} view={component} />
  );
}
