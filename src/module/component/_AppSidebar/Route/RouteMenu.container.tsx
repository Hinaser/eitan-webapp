import * as React from "react";
import {IViewProps, IContainerProps} from "./RouteMenu.type";


class RouteMenuContainer extends React.PureComponent<IContainerProps> {
  public constructor(props: IContainerProps){
    super(props);
    
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  
  public render(){
    const {
      t,
      lang,
      theme,
      classes,
      isSidebarOpen,
      sidebarPosition,
      view: Component,
    } = this.props;
    
    return (
      <Component
        classes={classes}
        theme={theme}
        t={t}
        lang={lang}
        sidebarPosition={sidebarPosition}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={this.toggleSidebar}
      />
    );
  }
  
  public toggleSidebar(){
    const {isSidebarOpen, toggleSidebar} = this.props;
    const nextOpenOrClose = isSidebarOpen ? "close" : "open";
    
    toggleSidebar(nextOpenOrClose);
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <RouteMenuContainer {...props} view={component} />
  );
}
