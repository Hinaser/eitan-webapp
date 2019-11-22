import * as React from "react";
import classNames from "classnames";
import {IViewProps} from "./index.type";

export default function Input(props: IViewProps){
  const {
    classes,
    className,
  } = props;
  
  return (
    <input
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      className={classNames(classes.root, className)}
    />
  );
}
