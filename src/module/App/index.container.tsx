import * as React from "react";
import memoizeOne from "memoize-one";
import {getTheme} from "../theme.config";
import {IContainerProps, IContainerState, IViewProps} from "./index.type";


const getThemeMemoized = memoizeOne((name: string) => getTheme(name));

class AppContainer extends React.PureComponent<IContainerProps, IContainerState> {
  public render(){
    const {theme: themeName, view: Component} = this.props;
    const theme = getThemeMemoized(themeName);
    
    return (
      <Component
        theme={theme}
      />
    );
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <AppContainer {...props} view={component}/>
  );
}
