import * as React from "react";
import {IViewProps} from "./Default.type";
import RouteMenuView from "../Route/RouteMenu";

export default function AppSidebarDefaultViewForMonitor(props: IViewProps){
  return (
    <div style={{padding: "16px 8px"}}>
      <RouteMenuView />
      {props.children}
    </div>
  );
}
