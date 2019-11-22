import React, {ErrorInfo} from "react";
import {IContainerProps, IContainerState, IViewProps} from "./index.type";


class AppErrorBoundaryContainer extends React.PureComponent<IContainerProps, IContainerState> {
  constructor(props: IContainerProps){
    super(props);
    
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(error: any){
    return {
      hasError: true,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo){
    reportError(error, errorInfo).catch(reason => {
      if(process.env.REACT_APP_ENV === "development"){
        console.error("Error while logging error");
        console.error(reason);
      }
    });
  }

  public render(){
    const {t, children, view: Component} = this.props;
    const {hasError} = this.state;

    if(hasError){
      return (
        <Component {...this.props} t={t} />
      );
    }

    return children;
  }
}


/**
 * Supposed to report errors to remote logger.
 */
async function reportError(error: Error, info: ErrorInfo){
  if(process.env.REACT_APP_ENV === "development"){
    console.error("Error has been caught on ErrorBoundary");
    console.error(error, info);
  }
}



export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <AppErrorBoundaryContainer {...props} view={component} />
  );
}
