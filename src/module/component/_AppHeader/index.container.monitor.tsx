import * as React from "react";
import memoizeOne from "memoize-one";
import DefaultView from "./Default";
import {IViewForMonitorProps, IContainerForMonitorProps, IContainerState} from "./index.type";

const getRootStyle = memoizeOne((
  height: number,
  mainContentPosition: {top: number, left: number, bottom: number, right: number},
  sidebarOverHeader: boolean,
  sidebarPosition: "left"|"right",
) => {
  if(sidebarPosition === "right"){
    if(sidebarOverHeader){
      return {
        height,
        paddingRight: mainContentPosition.right,
      };
    }
    return {
      height,
    };
  }
  else{
    if(sidebarOverHeader){
      return {
        height,
        paddingLeft: mainContentPosition.left,
      };
    }
    return {
      height,
    };
  }
});


class AppHeaderContainer extends React.PureComponent<IContainerForMonitorProps, IContainerState> {
  public static readonly initialHeight: number = 0;
  
  public componentDidMount(){
    const {onHeightChange} = this.props;
    onHeightChange(AppHeaderContainer.initialHeight);
  }
  
  public render(){
    const {
      classes,
      mainContentPosition,
      theme,
      sidebarPosition,
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
      mainContentPosition,
      sidebarHasPriority,
      sidebarPosition,
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

export function withContainer(component: React.ComponentType<IViewForMonitorProps>){
  return (props: Omit<IContainerForMonitorProps, "view">) => (
    <AppHeaderContainer {...props} view={component} />
  );
}
