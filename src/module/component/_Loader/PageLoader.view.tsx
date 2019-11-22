import React from "react";
import {FadeLoader} from "react-spinners";
import {purify} from "../../../service/purify/index";

interface IProps {
  height?: number;
  width?: number;
}

function PageLoaderView(props: IProps){
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <FadeLoader
          height={typeof(props.height) === "number" ? props.height : 15}
          width={typeof(props.width) === "number" ? props.width : 5}
          margin="2px"
          radius={2}
          loading={true}
          color="rgba(33,33,33,.7)"
        />
      </div>
    </div>
  );
}


export default purify(PageLoaderView);
