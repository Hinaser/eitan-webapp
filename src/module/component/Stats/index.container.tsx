import * as React from "react";
import {IContainerProps, IContainerState, IViewProps} from "./index.type";

class StatsContainer extends React.Component<IContainerProps, IContainerState> {
  public constructor(props: IContainerProps){
    super(props);
    
    this.state = {
    };
  }
  
  public render(){
    const {
      view: Component,
    } = this.props;

    return (
      <Component
        {...this.props}
        {...this.state}
      />
    );
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <StatsContainer {...props} view={component} />
  );
}
