import * as React from "react";
import {IViewForMobileProps} from "./index.type";

export default function AppHeaderView(props: IViewForMobileProps){
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
