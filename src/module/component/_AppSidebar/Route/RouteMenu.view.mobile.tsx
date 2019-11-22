import * as React from "react";
import {Link} from "react-router-dom";
import {IViewProps} from "./RouteMenu.type";

export default function RouteMenuViewForMobile(props: IViewProps){
  const {
    classes,
    t,
    toggleSidebar,
  } = props;
  
  return (
    <div className={classes.menuList}>
      <div>
        <Link to="/" onClick={toggleSidebar}>{t("route:home")}</Link>
      </div>
    </div>
  );
}
