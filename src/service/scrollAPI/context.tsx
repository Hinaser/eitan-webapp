import React from "react";
import Scrollbars from "react-custom-scrollbars";

const defaultContext = {
  scrollAPI: null as (Scrollbars| null),
};

type ContextType = typeof defaultContext;

const Context = React.createContext(defaultContext);

export const ScrollbarMonitor = (props: ContextType) => {
  return (children: React.ReactNode) => (
    <Context.Provider value={props}>
      {children}
    </Context.Provider>
  );
};

export const withScrollAPI =
  <P extends ContextType, R = Omit<P, keyof ContextType>>
  (ComponentClass: React.ComponentType<P>) => {
    return (props: R) => {
      return (
        <Context.Consumer>
          {value => <ComponentClass {...props as any} {...value}/>}
        </Context.Consumer>
      );
    };
  };
