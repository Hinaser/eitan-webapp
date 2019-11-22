import React from "react";
import memoize from "memoize-one";

const defaultContext = {
  sidebarWidth: 0 as number,
  headerHeight: 0 as number,
  contentWidth: 0 as number,
  contentHeight: 0 as number,
};

export type WithContentSizeProps = typeof defaultContext;

const Context = React.createContext(defaultContext);

export const ContentSizeMonitor = (props: WithContentSizeProps) => {
  return (children: React.ReactNode) => (
    <Context.Provider value={props}>
      {children}
    </Context.Provider>
  );
};

export const withContentSize =
  <P extends WithContentSizeProps, R = Omit<P, keyof WithContentSizeProps>>
  (ComponentClass: React.ComponentType<P>) => {
    return (props: R) => {
      return (
        <Context.Consumer>
          {value =>  <ComponentClass {...props as any} {...value}/>}
        </Context.Consumer>
      );
    };
  };

export const OptimizedContentSizeMonitor = memoize(
  (
    sidebarWidth,
    headerHeight,
    contentHeight,
    contentWidth,
  ) => ContentSizeMonitor({
    sidebarWidth,
    headerHeight,
    contentHeight,
    contentWidth,
  }),
);
