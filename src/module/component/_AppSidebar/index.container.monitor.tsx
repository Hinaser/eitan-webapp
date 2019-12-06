import * as React from "react";
import memoizeOne from "memoize-one";
import {getWindowSize} from "../../../service/contentSizeMonitor/resizeMonitor";
import {IViewForMonitorProps, IContainerForMonitorProps, IContainerState} from "./index.type";
import DefaultView from "./Default/Default";
import {closeApp} from "../../../index.lib";


const getRootStyle = memoizeOne((
  sidebarPosition: "left"|"right",
  width: number,
  paddingTop: number,
) => {
  
  if(sidebarPosition === "right"){
    return {
      width,
      left: "unset",
      right: 0,
      paddingTop,
    };
  }
  
  return {
    width,
    paddingTop,
  };
});



class AppSidebarContainer extends React.PureComponent<IContainerForMonitorProps, IContainerState> {
  public static readonly initialWidth: number = 0;
  public static readonly collapsedWidth: number = 0;
  
  public constructor(props: IContainerForMonitorProps){
    super(props);
    
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  
  public componentDidMount(){
    const {onWidthChange} = this.props;
    onWidthChange(AppSidebarContainer.initialWidth);
  }
  
  public componentDidUpdate(
    prevProps: Readonly<IContainerForMonitorProps>,
    prevState: Readonly<IContainerState>,
  ) {
    const {onWidthChange} = this.props;
    onWidthChange(this.props.isSidebarOpen ? AppSidebarContainer.initialWidth : AppSidebarContainer.collapsedWidth);
  }
  
  public render(){
    const {
      t,
      lang,
      theme,
      classes,
      mainContentPosition,
      isSidebarOpen,
      sidebarPosition,
      SidebarContent,
      view: Component,
    } = this.props;
    
    const sidebarHasPriority = (()=>{
      return theme.customComponents.appHeader
        && theme.customComponents.appSidebar
        && (theme.customComponents.appHeader.zIndex||0) < (theme.customComponents.appSidebar.zIndex||0);
    })();
    
    const width = isSidebarOpen ? AppSidebarContainer.initialWidth : AppSidebarContainer.collapsedWidth;
    const paddingTop = sidebarHasPriority ? 0 : mainContentPosition.top;
    const rootStyle = getRootStyle(
      sidebarPosition,
      width,
      paddingTop,
    );
    const toggleButtonDirection = sidebarPosition === "left" ?
      (isSidebarOpen ? "left" : "right") : (isSidebarOpen ? "right" : "left");
    const windowHeight = getWindowSize().height;
    const sidebarContentHeight = windowHeight - rootStyle.paddingTop - 32;
    
    return (
      <Component
        classes={classes}
        theme={theme}
        t={t}
        lang={lang}
        rootStyle={rootStyle}
        sidebarPosition={sidebarPosition}
        isSidebarOpen={isSidebarOpen}
        sidebarContentHeight={sidebarContentHeight}
        toggleButtonDirection={toggleButtonDirection}
        toggleSidebar={this.toggleSidebar}
        SidebarContent={SidebarContent || DefaultView}
      />
    );
  }
  
  public toggleSidebar(){
    closeApp();
  }
}

export function withContainer(component: React.ComponentType<IViewForMonitorProps>){
  return (props: Omit<IContainerForMonitorProps, "view">) => (
    <AppSidebarContainer {...props} view={component} />
  );
}
