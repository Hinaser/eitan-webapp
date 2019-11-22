import * as React from "react";
import memoizeOne from "memoize-one";
import {getWindowSize} from "../../../service/contentSizeMonitor/resizeMonitor";
import {IViewForMonitorProps, IContainerForMonitorProps, IContainerState} from "./index.type";
import DefaultView from "./Default/Default";
import {mountPointNodeId} from "../../../index.config";


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
  public static readonly initialWidth: number = 280;
  public static readonly collapsedWidth: number = 100;
  
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
    const nodeToMount = document.getElementById(mountPointNodeId);
    if(!nodeToMount){
      throw new Error("Mount point missing");
    }
    
    const showButtonDiv = document.createElement("div");
    showButtonDiv.id = "show-" + mountPointNodeId;
    showButtonDiv.addEventListener("click", (e) => {
      nodeToMount.style.display = "";
      nodeToMount.style.opacity = "1";
      document.body.removeChild(showButtonDiv);
    });
    showButtonDiv.innerText = "SHOW";
    showButtonDiv.style.position = "fixed";
    showButtonDiv.style.bottom = "16px";
    showButtonDiv.style.left = "16px";
    showButtonDiv.style.background = "#f3f3f3";
    showButtonDiv.style.color = "#333";
    showButtonDiv.style.padding = "8px 16px";
    showButtonDiv.style.cursor = "pointer";
    showButtonDiv.style.borderRadius = "6px";
    showButtonDiv.style.border = "1px solid #ccc";
    
    nodeToMount.style.opacity = "0";
    nodeToMount.style.transition = "all ease .2s";
    const onTransitionEndMountPoint = () => {
      nodeToMount.removeEventListener("transitionend", onTransitionEndMountPoint);
      nodeToMount.style.display = "none";
      document.body.appendChild(showButtonDiv);
    };
    nodeToMount.addEventListener("transitionend", onTransitionEndMountPoint);
  }
}

export function withContainer(component: React.ComponentType<IViewForMonitorProps>){
  return (props: Omit<IContainerForMonitorProps, "view">) => (
    <AppSidebarContainer {...props} view={component} />
  );
}
