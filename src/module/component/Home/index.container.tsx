import * as React from "react";
import {IContainerProps, IContainerState, IViewProps} from "./index.type";

class HomeContainer extends React.Component<IContainerProps, IContainerState> {
  public constructor(props: IContainerProps){
    super(props);
    
    this.onClickMenu = this.onClickMenu.bind(this);
    
    this.state = {
    };
  }
  
  public render(){
    const {view: Component} = this.props;

    return (
      <Component
        {...this.props}
        {...this.state}
        onClickMenu={this.onClickMenu}
      />
    );
  }
  
  public onClickMenu(e: React.MouseEvent<HTMLElement>){
    const target = e.currentTarget.dataset.menu as string;
    const {history} = this.props;
    history.push(target);
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <HomeContainer {...props} view={component} />
  );
}
