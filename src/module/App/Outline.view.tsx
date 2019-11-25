import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import {MdClose as CloseIcon} from "react-icons/md";
import {Sidebar} from "../outline.config";
import {IViewProps} from "./Outline.type";
import AppLoader from "../component/_Loader/AppLoader";
import {closeApp} from "../../index.lib";


export default function OutlineView(props: IViewProps){
  const {
    classes,
    mainContentPosition,
    scrollbarStyle,
    childrenWithSizeAndScroll,
    onSidebarWidthChange,
    scrollRef,
    isLoading,
  } = props;
  
  return (
    <div className={classes.root}>
      <Sidebar
        onWidthChange={onSidebarWidthChange}
        mainContentPosition={mainContentPosition}
      />
      <main
        style={mainContentPosition}
        className={classes.mainRoot}
      >
        <Scrollbars
          ref={scrollRef}
          autoHide={true}
          hideTracksWhenNotNeeded={true}
          style={scrollbarStyle}
        >
          {!isLoading && childrenWithSizeAndScroll}
        </Scrollbars>
      </main>
      <AppLoader isLoading={isLoading} />
      <div className={classes.closeButton} onClick={closeApp}>
        <CloseIcon />
      </div>
    </div>
  );
}
