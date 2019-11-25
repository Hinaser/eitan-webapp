import {RoutePropsWithKey} from "./App/types";
import {protectComponent} from "./component/_ErrorBoundary/index";

import Home from "./component/Home";
import Exam from "./component/Exam";
// const Page1 = React.lazy(() => import("../component/Page1/index.container"));



export default  [
  {key: "home", path: ["/", "/home"], exact: true, component: protectComponent(Home)},
  {key: "exam", path: ["/exam"], exact: true, component: protectComponent(Exam)},
] as RoutePropsWithKey[];
