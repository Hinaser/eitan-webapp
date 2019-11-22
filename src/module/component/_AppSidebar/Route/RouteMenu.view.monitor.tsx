import * as React from "react";
import {Link} from "react-router-dom";
import {IViewProps} from "./RouteMenu.type";

export default function RouteMenuViewForMonitor(props: IViewProps){
  const {
    classes,
    t,
  } = props;
  
  return (
    <div className={classes.menuList}>
      <div>
        <Link to="/">{t("route:home")}</Link>
      </div>
    </div>
  );
}
