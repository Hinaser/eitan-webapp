import * as React from "react";
import {IViewProps} from "./Default.type";
import RouteMenuView from "../Route/RouteMenu";

export default function AppSidebarDefaultViewForMobile(props: IViewProps){
  return (
    <div style={{padding: "16px 8px"}}>
      <RouteMenuView />
      {props.children}
    </div>
  );
}
