import React from "react";
import {optimizedResizeEvent, getWindowSize} from "../contentSizeMonitor/resizeMonitor";
import {breakPoint} from "./config";

type IScreenType = "mobile" | "tablet" | "monitor";

const getScreenByWindowWidth = (width: number): IScreenType => {
  width = Math.floor(width);
  if(width <= breakPoint.mobile){
    return "mobile";
  }
  else if(width < breakPoint.monitor){
    return "tablet";
  }
  return "monitor";
};

const initialWindowWidth = getWindowSize().width;
const initialScreen = getScreenByWindowWidth(initialWindowWidth);

const defaultScreenContext = {
  screen: (initialScreen as IScreenType),
};

type ContextType = typeof defaultScreenContext;

const ScreenContext = React.createContext(defaultScreenContext);

export const provideViewSwitch = <P extends {}>(Component: React.ComponentType<P>) => {
  return function ViewSwitchProvider(props: P){
    const [screen, setScreen] = React.useState(initialScreen);
    window.document.body.dataset.screen = screen;
    
    React.useEffect(() => {
      const onWindowWidthChanged = (w: number) => {
        const newScreen = getScreenByWindowWidth(w);
        if(screen !== newScreen){
          setScreen(newScreen);
        }
      };
      
      optimizedResizeEvent.addListener(onWindowWidthChanged);
      
      return () => {
        optimizedResizeEvent.removeListener(onWindowWidthChanged);
      };
    }, [screen]);
    
    return (
      <ScreenContext.Provider value={{screen}}>
        <Component {...props} />
      </ScreenContext.Provider>
    );
  };
};

type ScreenComponents<
  MB extends React.ComponentType<any>|undefined,
  T extends React.ComponentType<any>|undefined,
  MN extends React.ComponentType<any>|undefined,
> = Partial<{
  mobile: MB;
  tablet: T;
  monitor: MN;
}>;

function chooseView<
  MB extends React.ComponentType<any>|undefined,
  T extends React.ComponentType<any>|undefined,
  MN extends React.ComponentType<any>|undefined,
>(screen: IScreenType, Views: ScreenComponents<MB, T, MN>): MB|T|MN|undefined {
  if(Views[screen]){
    return Views[screen];
  }
  
  switch(screen){
    case "monitor":
      return Views.tablet || Views.mobile;
    case "tablet":
      return Views.mobile || Views.monitor;
    case "mobile":
      return Views.tablet || Views.monitor;
    default:
      return undefined;
  }
}

type GetProp<C> = C extends React.ComponentType<infer _P> ? _P : never;

export const withViewSwitch = <
  MB extends React.ComponentType<any>|undefined,
  T extends React.ComponentType<any>|undefined,
  MN extends React.ComponentType<any>|undefined,
>(Views: ScreenComponents<MB, T, MN>) => {
  type PMonitor = GetProp<MB>;
  type PTablet = GetProp<T>;
  type PMobile = GetProp<MN>;
  
  return function ViewSwitch(props: PMonitor | PTablet | PMobile){
    return (
      <ScreenContext.Consumer>
        {({screen}) => {
          const View = chooseView(screen, Views) as Exclude<MB|T|MN, undefined>;
          if(!View){
            return null;
          }
          
          return (
            <View {...props} />
          );
        }}
      </ScreenContext.Consumer>
    );
  };
};
