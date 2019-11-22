import React from "react";
import {IViewProps} from "./index.type";

export default function ComponentErrorBoundaryView(props: IViewProps){
  const {classes, t} = props;
  
  return (
    <div className={classes.root}>
      <span>
        {t("unexpectedErrorFromContent")}
      </span>
    </div>
  );
}
