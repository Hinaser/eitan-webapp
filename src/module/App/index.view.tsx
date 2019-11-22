import * as React from "react";
import {HashRouter} from "react-router-dom";
import {ThemeProvider} from "@material-ui/styles";
import Route from "./Router";
import ErrorBoundaryForEntireApp from "../component/_ErrorBoundary/app";
import AppOutline from "./Outline";
import {IViewProps} from "./index.type";

export default function AppView(props: IViewProps){
  const {theme} = props;
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundaryForEntireApp>
        <HashRouter>
          <AppOutline>
            <Route />
          </AppOutline>
        </HashRouter>
      </ErrorBoundaryForEntireApp>
    </ThemeProvider>
  );
}
