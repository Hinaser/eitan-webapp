import * as React from "react";
import memoizeOne from "memoize-one";
import Scrollbars from "react-custom-scrollbars";
import {MdClose as CloseIcon} from "react-icons/md";
import {IViewForMonitorProps} from "./index.type";

const getScrollbarStyle = memoizeOne((height) => ({
  height,
}));

export default function AppSidebarView(props: IViewForMonitorProps){
  const {
    classes,
    rootStyle,
    sidebarContentHeight,
    toggleSidebar,
    SidebarContent,
    isSidebarOpen,
    sidebarPosition,
  } = props;
  
  const scrollbarStyle = getScrollbarStyle(sidebarContentHeight);
  
  return (
    <div
      className={classes.root}
      style={rootStyle}
    >
      <Scrollbars
        autoHide={true}
        hideTracksWhenNotNeeded={true}
        style={scrollbarStyle}
      >
        <div className={classes.container}>
          <SidebarContent
            isSidebarOpen={isSidebarOpen}
            sidebarPosition={sidebarPosition}
          />
        </div>
      </Scrollbars>
      <div
        className={classes.toggleButtonContainer}
        onClick={toggleSidebar}
      >
        <div>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}
