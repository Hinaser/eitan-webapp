import * as React from "react";
import ErrorBoundaryForComponent from "./component/index";

export function protectComponent<C extends React.ComponentType<any>>(Component: C) {
  return (props: React.ComponentProps<C>) => (
    <ErrorBoundaryForComponent>
      <Component {...props} />
    </ErrorBoundaryForComponent>
  );
}
