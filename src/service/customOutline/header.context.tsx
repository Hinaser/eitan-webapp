import * as React from "react";

export type SetHeaderContentType = <C extends React.ComponentType<any>>(Component: C|null) => void;

type ContextType = {
  setHeaderContent: <C extends React.ComponentType<any>>(Component: C|null) => void;
  HeaderContent: React.ComponentType<any>|null;
};

const defaultContext: ContextType = {
  setHeaderContent: (c: React.ComponentType<any>|null) => {return;},
  HeaderContent: null,
};

const Context = React.createContext(defaultContext);

export const provideHeaderSwitcher = <C extends React.ComponentType<any>>(Component: C) => {
  type P = C extends React.ComponentType<infer _P> ? _P : never;
  
  return function HeaderContentProvider(props: P){
    const [HeaderContent, _setHeaderContent] = React.useState<React.ComponentType<any>|null>(null);
    const setHeaderContent: SetHeaderContentType = (_Component) => {
      return _setHeaderContent(() => _Component);
    };
    
    return (
      <Context.Provider value={{setHeaderContent, HeaderContent}}>
        <Component {...props} />
      </Context.Provider>
    );
  };
};

export const withHeaderContentProvider = <C extends React.ComponentType<any>>(Component: C) => {
  type P = C extends React.ComponentType<infer _P> ? _P : never;
  
  return function HeaderContentProvider(props: P){
    return (
      <Context.Consumer>
        {value => (
          <Component {...props as any} setHeaderContent={value.setHeaderContent} />
        )}
      </Context.Consumer>
    );
  };
};

export const withHeaderContent = <C extends React.ComponentType<any>>(Component: C) => {
  type P = C extends React.ComponentType<infer _P> ? _P : never;
  
  return function HeaderContentConsumer(props: P){
    return (
      <Context.Consumer>
        {value => (
          <Component {...props as any} HeaderContent={value.HeaderContent} />
        )}
      </Context.Consumer>
    );
  };
};
