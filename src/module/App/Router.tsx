import * as React from "react";
import {Switch, Route} from "react-router-dom";
import {purify} from "../../service/purify";
import PageLoaderView from "../component/_Loader/PageLoader.view";
import routes from "../route.config";
import Home from "../component/Home";



interface IProps {
}

function Router(props: IProps) {
  return (
    <React.Suspense fallback={<PageLoaderView />}>
      <Switch>
        {routes.map(r => (
          <Route key={r.key} {...r} />
        ))}
        <Route component={Home} />
      </Switch>
    </React.Suspense>
  );
}

export default purify(Router);
