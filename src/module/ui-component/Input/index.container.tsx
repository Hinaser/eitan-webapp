import * as React from "react";
import {IViewProps, IContainerProps, IContainerState} from "./index.type";


class ButtonContainer extends React.PureComponent<IContainerProps, IContainerState> {
  public render(){
    const {
      view: Component,
    } = this.props;
    
    return (
      <Component
        {...this.props}
      />
    );
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <ButtonContainer {...props} view={component} />
  );
}
