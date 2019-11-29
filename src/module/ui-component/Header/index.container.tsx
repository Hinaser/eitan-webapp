import * as React from "react";
import {IContainerProps, IContainerState, IViewProps} from "./index.type";

class HeaderContainer extends React.Component<IContainerProps, IContainerState> {
  constructor(props: IContainerProps) {
    super(props);
    
    this.onClickToHome = this.onClickToHome.bind(this);
    
    this.state = {
    };
  }
  
  public render(){
    const {
      location,
      view: Component,
    } = this.props;
    
    const showBackToHome = !["", "/", "/home"].includes(location.pathname);

    return (
      <Component
        {...this.props}
        {...this.state}
        onClickToHome={this.onClickToHome}
        showBackToHome={showBackToHome}
      />
    );
  }
  
  public onClickToHome(){
    const {history} = this.props;
    history.push("/");
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <HeaderContainer {...props} view={component} />
  );
}
