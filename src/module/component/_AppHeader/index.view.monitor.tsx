import * as React from "react";
import {IViewForMonitorProps} from "./index.type";

export default function AppHeaderView(props: IViewForMonitorProps){
  const {
    classes,
    rootStyle,
    HeaderContent,
  } = props;
  
  return (
    <div
      className={classes.root}
      style={rootStyle}
    >
      <HeaderContent />
    </div>
  );
}
