import React from "react";

interface ISvgComponentProps {
  width: number;
  height: number;
  style?: React.CSSProperties;
}

const SvgComponent: React.FunctionComponent<ISvgComponentProps> = (props) => {
  const {width, height} = props;
  let {style} = props;
  
  if(!style){
    style = {};
  }
  
  return (
    <svg
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style={style}
      width={width}
      height={height}
    >
      <path
        style={{fill: "#F5F5F5"}}
        d="M473.655,88.275H38.345C17.167,88.275,0,105.442,0,126.62V385.38
        c0,21.177,17.167,38.345,38.345,38.345h435.31c21.177,0,38.345-17.167,38.345-38.345V126.62
        C512,105.442,494.833,88.275,473.655,88.275z"
      />
      <circle style={{fill: "#FF4B55"}} cx="256" cy="255.999" r="97.1"/>
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>

  );
};

export default SvgComponent;
