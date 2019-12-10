import React from "react";
import {ScaleLoader} from "react-spinners";
import {IViewProps} from "./AppLoader.type";


function AppLoaderView(props: IViewProps){
  const {classes} = props;
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    if(!props.isLoading){
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [props.isLoading]);
  
  if(!isLoading){
    return null;
  }
  
  return (
    <div className={classes.root}>
      <div>
        <ScaleLoader
          height={35}
          width={4}
          radius={2}
          margin="2px"
          loading={true}
          color={"rgba(54,215,183,100)"}
        />
      </div>
    </div>
  );
}


export default AppLoaderView;
