import * as React from "react";
import memoizeOne from "memoize-one";
import Scrollbars from "react-custom-scrollbars";
import {IViewForMobileProps} from "./index.type";

const getScrollbarStyle = memoizeOne((height) => ({
  height,
}));

export default function AppSidebarView(props: IViewForMobileProps){
  const {
    classes,
    rootStyle,
    sidebarContentHeight,
    toggleSidebar,
    toggleButtonDirection,
    isSidebarOpen,
    SidebarContent,
    sidebarPosition,
  } = props;
  
  const scrollbarStyle = getScrollbarStyle(sidebarContentHeight);
  
  return (
    <div>
      {isSidebarOpen && (
        <div
          className={classes.clickListener}
          onClick={toggleSidebar}
        />
      )}
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
            {toggleButtonDirection === "left" ? "<" : ">"}
          </div>
        </div>
      </div>
    </div>
  );
}
