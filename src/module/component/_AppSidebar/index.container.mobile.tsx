import * as React from "react";
import memoizeOne from "memoize-one";
import {IViewForMobileProps, IContainerForMobileProps, IContainerState} from "./index.type";
import {getWindowSize} from "../../../service/contentSizeMonitor/resizeMonitor";
import DefaultView from "./Default/Default";


const getRootStyle = memoizeOne((
  isSidebarOpen: boolean,
  sidebarPosition: "left"|"right",
) => {
  const width = AppSidebarContainer.initialWidth;
  
  if(sidebarPosition === "right"){
    return {
      width,
      left: "unset",
      right: isSidebarOpen ? 0 : -width,
    };
  }
  
  return {
    width,
    left: isSidebarOpen ? 0 : -width,
  };
});

class AppSidebarContainer extends React.PureComponent<IContainerForMobileProps, IContainerState> {
  public static readonly initialWidth: number = 300;
  public static readonly collapsedWidth: number = 0;
  
  constructor(props: IContainerForMobileProps){
    super(props);
    
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  
  public componentDidMount(){
    const {onWidthChange} = this.props;
    onWidthChange(0);
  }
  
  public render(){
    const {
      t,
      lang,
      theme,
      classes,
      isSidebarOpen,
      sidebarPosition,
      SidebarContent,
      view: Component,
    } = this.props;
    const rootStyle = getRootStyle(isSidebarOpen, sidebarPosition);
    const toggleButtonDirection = sidebarPosition === "left" ?
      (isSidebarOpen ? "left" : "right") : (isSidebarOpen ? "right" : "left");
    const windowHeight = getWindowSize().height;
    const sidebarContentHeight = windowHeight  - 32;
    
    return (
      <Component
        classes={classes}
        theme={theme}
        lang={lang}
        t={t}
        rootStyle={rootStyle}
        sidebarPosition={sidebarPosition}
        toggleSidebar={this.toggleSidebar}
        toggleButtonDirection={toggleButtonDirection}
        sidebarContentHeight={sidebarContentHeight}
        isSidebarOpen={isSidebarOpen}
        SidebarContent={SidebarContent || DefaultView}
      />
    );
  }
  
  public toggleSidebar(){
    const {isSidebarOpen, toggleSidebar} = this.props;
    toggleSidebar(isSidebarOpen ? "close" : "open");
  }
}

export function withContainer(component: React.ComponentType<IViewForMobileProps>){
  return (props: Omit<IContainerForMobileProps, "view">) => (
    <AppSidebarContainer {...props} view={component} />
  );
}
