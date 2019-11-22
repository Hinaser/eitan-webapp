import * as React from "react";

export function purify<C extends React.FunctionComponent<any>, P = React.ComponentProps<C>>(
  fc: C,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean,
){
  return React.memo(fc, propsAreEqual);
}
