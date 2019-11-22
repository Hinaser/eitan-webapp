import * as React from "react";

export type SetSidebarContentType = <C extends React.ComponentType<any>>(Component: C|null) => void;

type ContextType = {
  setSidebarContent: <C extends React.ComponentType<any>>(Component: C|null) => void;
  SidebarContent: React.ComponentType<any>|null;
};

const defaultContext: ContextType = {
  setSidebarContent: (c: React.ComponentType<any>|null) => {return;},
  SidebarContent: null,
};

const Context = React.createContext(defaultContext);

export const provideSidebarSwitcher = <C extends React.ComponentType<any>>(Component: C) => {
  type P = C extends React.ComponentType<infer _P> ? _P : never;
  
  return function SidebarContentProvider(props: P){
    const [SidebarContent, _setSidebarContent] = React.useState<React.ComponentType<any>|null>(null);
    const setSidebarContent: SetSidebarContentType = (_Component) => {
      return _setSidebarContent(() => _Component);
    };
    
    return (
      <Context.Provider value={{setSidebarContent, SidebarContent}}>
        <Component {...props} />
      </Context.Provider>
    );
  };
};

export const withSidebarContentProvider = <C extends React.ComponentType<any>>(Component: C) => {
  type P = C extends React.ComponentType<infer _P> ? _P : never;
  
  return function SidebarContentProvider(props: P){
    return (
      <Context.Consumer>
        {value => (
          <Component {...props as any} setSidebarContent={value.setSidebarContent} />
        )}
      </Context.Consumer>
    );
  };
};

export const withSidebarContent = <C extends React.ComponentType<any>>(Component: C) => {
  type P = C extends React.ComponentType<infer _P> ? _P : never;
  
  return function SidebarContentConsumer(props: P){
    return (
      <Context.Consumer>
        {value => (
          <Component {...props as any} SidebarContent={value.SidebarContent} />
        )}
      </Context.Consumer>
    );
  };
};
