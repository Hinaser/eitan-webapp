import * as React from "react";
import {IViewProps} from "./index.type";
import Header from "../../ui-component/Header";

export default function StatsView(props: IViewProps){
  const {
    classes,
  } = props;
  
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.statsContainer}>
      </div>
    </div>
  );
}
