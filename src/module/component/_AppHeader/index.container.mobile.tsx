import * as React from "react";
import memoizeOne from "memoize-one";
import {IViewForMobileProps, IContainerForMobileProps, IContainerState} from "./index.type";
import DefaultView from "./Default";


const getRootStyle = memoizeOne((height: number, paddingLeft?: number) => {
  return {
    height,
    paddingLeft,
  };
});


class AppHeaderContainer extends React.PureComponent<IContainerForMobileProps, IContainerState> {
  public static readonly initialHeight: number = 40;
  
  public componentDidMount(){
    const {onHeightChange} = this.props;
    onHeightChange(AppHeaderContainer.initialHeight);
  }
  
  public render(){
    const {
      classes,
      mainContentPosition,
      theme,
      HeaderContent,
      view: Component,
    } = this.props;
    
    const sidebarHasPriority = (()=>{
      return theme.customComponents.appHeader
        && theme.customComponents.appSidebar
        && (theme.customComponents.appHeader.zIndex||0) < (theme.customComponents.appSidebar.zIndex||0);
    })();
    
    const rootStyle = getRootStyle(
      AppHeaderContainer.initialHeight,
      sidebarHasPriority ? mainContentPosition.left : undefined,
    );
    
    return (
      <Component
        classes={classes}
        theme={theme}
        rootStyle={rootStyle}
        HeaderContent={HeaderContent || DefaultView}
      />
    );
  }
}

export function withContainer(component: React.ComponentType<IViewForMobileProps>){
  return (props: Omit<IContainerForMobileProps, "view">) => (
    <AppHeaderContainer {...props} view={component} />
  );
}
