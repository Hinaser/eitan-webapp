import * as React from "react";
import {IViewProps} from "./Default.type";

export default function AppSidebarDefaultViewForMobile(props: IViewProps){
  const {
    classes,
    toggleSidebar,
    t,
    children,
  } = props;
  
  return (
    <div className={classes.body}>
      <div className={classes.title}>
        <div>
          {t("general:title")}
        </div>
      </div>
      <div className={classes.spacer} />
      <div className={classes.childContainer}>
        {children}
      </div>
      <div className={classes.toggleMenuContainer} onClick={toggleSidebar}>
        Menu
      </div>
    </div>
  );
}
