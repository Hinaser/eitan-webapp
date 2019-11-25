import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import memoizeOne from "memoize-one";
import {
  optimizedResizeEvent,
  getWindowSize,
} from "../../service/contentSizeMonitor/resizeMonitor";
import {ScrollbarMonitor} from "../../service/scrollAPI/context";
import {IContainerState, IContainerProps, IViewProps} from "./Outline.type";
import {OptimizedContentSizeMonitor} from "../../service/contentSizeMonitor/context";
import {doPostRenderingTasks} from "../../init";



const mainContentPadding = 64;

const getMainContentPosition = memoizeOne((
  headerHeight: number,
  sidebarWidth: number,
  sidebarPosition: "left"|"right",
  windowWidth: number,
) => {
  const top = headerHeight + mainContentPadding;
  const bottom = mainContentPadding;
  
  let left = sidebarPosition === "left" ? sidebarWidth + mainContentPadding : mainContentPadding;
  let right = sidebarPosition === "left" ? mainContentPadding : sidebarWidth + mainContentPadding;
  
  const contentWidth = windowWidth - left - right;
  if(contentWidth > 1000){
    left = (windowWidth - sidebarWidth - 1000) / 2 + (sidebarPosition === "left" ? sidebarWidth : 0);
    right = (windowWidth - sidebarWidth - 1000) / 2 + (sidebarPosition === "left" ? 0 : sidebarWidth);
  }
  
  return {
    top,
    bottom,
    left,
    right,
  };
});

const getScrollbarStyle = memoizeOne((width: number, height: number) => ({
  width,
  height,
  transition: "all ease .3s",
}));

class OutlineContainer extends React.PureComponent<IContainerProps, IContainerState> {
  protected scrollRef: React.RefObject<Scrollbars>;
  
  constructor(props: IContainerProps){
    super(props);
    this.scrollRef = React.createRef<Scrollbars>();
    
    this.onResize = this.onResize.bind(this);
    this.onHeaderHeightChange = this.onHeaderHeightChange.bind(this);
    this.onSidebarWidthChange = this.onSidebarWidthChange.bind(this);
    
    const windowSize = getWindowSize();
    this.state = {
      windowHeight: windowSize.height,
      windowWidth: windowSize.width,
      headerHeight: 0,
      sidebarWidth: 0,
      isLoading: true,
    };
  }
  
  public async componentDidMount(){
    optimizedResizeEvent.addListener(this.onResize);
    
    if(process.env.REACT_APP_ENV === "development"){
      const start = Date.now();
      
      await doPostRenderingTasks();
      
      const elapsedTime = Date.now() - start;
      console.log("Post rendering time", elapsedTime);
    }
    else{
      await doPostRenderingTasks();
    }
    
    this.setState({
      isLoading: false,
    });
  }
  
  public componentDidUpdate(){
    const {current: scrollbar} = this.scrollRef;
    if(scrollbar && typeof(scrollbar.scrollTop) === "function"){
      scrollbar.scrollToTop();
    }
  }
  
  public componentWillUnmount(){
    if(typeof(this.onResize) === "function"){
      optimizedResizeEvent.removeListener(this.onResize);
    }
  }
  
  public render(){
    const {
      children,
      classes,
      sidebarPosition,
      view: Component,
    } = this.props;
    const {
      windowWidth,
      windowHeight,
      headerHeight,
      sidebarWidth,
      isLoading,
    } = this.state;
    
    const contentHeight = windowHeight - (headerHeight);
    const contentWidth = windowWidth - (sidebarWidth);
    
    const childrenWithSize = OptimizedContentSizeMonitor(
      sidebarWidth,
      headerHeight,
      contentHeight,
      contentWidth,
    )(children);
    const childrenWithSizeAndScroll = ScrollbarMonitor({
      scrollAPI: this.scrollRef.current,
    })(childrenWithSize);
    
    const mainContentPosition = getMainContentPosition(headerHeight, sidebarWidth, sidebarPosition, windowWidth);
    const scrollbarStyle = getScrollbarStyle(
      contentWidth - mainContentPadding*2, 
      contentHeight - mainContentPadding*2,
    );
    
    return (
      <Component
        classes={classes}
        childrenWithSizeAndScroll={childrenWithSizeAndScroll}
        mainContentPosition={mainContentPosition}
        scrollbarStyle={scrollbarStyle}
        onHeaderHeightChange={this.onHeaderHeightChange}
        onSidebarWidthChange={this.onSidebarWidthChange}
        scrollRef={this.scrollRef}
        isLoading={isLoading}
      />
    );
  }
  
  protected onResize(windowWidth: number, windowHeight: number){
    this.setState({
      windowWidth: windowWidth,
      windowHeight: windowHeight,
    });
  }
  
  protected onHeaderHeightChange(height: number){
    this.setState({
      headerHeight: height,
    });
  }
  
  protected onSidebarWidthChange(width: number){
    this.setState({
      sidebarWidth: width,
    });
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <OutlineContainer {...props} view={component} />
  );
}
