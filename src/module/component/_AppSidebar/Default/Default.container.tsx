import * as React from "react";
import {IViewProps, IContainerProps} from "./Default.type";


class DefaultContainer extends React.PureComponent<IContainerProps> {
  public render(){
    const {
      isSidebarOpen,
      sidebarPosition,
      view: Component,
      children,
    } = this.props;
    
    return (
      <Component
        sidebarPosition={sidebarPosition}
        isSidebarOpen={isSidebarOpen}
        children={children}
      />
    );
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <DefaultContainer {...props} view={component} />
  );
}
