import React from "react";
import {FadeLoader} from "react-spinners";
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
        <FadeLoader
          height={15}
          width={5}
          margin="2px"
          radius={2}
          loading={true}
          color="rgba(33,33,33,.7)"
        />
      </div>
    </div>
  );
}


export default AppLoaderView;
