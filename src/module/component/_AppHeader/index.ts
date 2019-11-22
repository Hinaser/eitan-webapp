import {withStyles} from "@material-ui/styles";
import {purify} from "../../../service/purify/index";
import {withContainer as withContainerForMonitor} from "./index.container.monitor";
import {withContainer as withContainerForMobile} from "./index.container.mobile";
import withRedux from "./index.redux";
import StyleForMobile from "./index.style.mobile";
import StyleForMonitor from "./index.style.monitor";
import ViewForMobile from "./index.view.mobile";
import ViewForMonitor from "./index.view.monitor";
import {withViewSwitch} from "../../../service/breakPointMonitor/index";

const withStyleForMonitor = withStyles(StyleForMonitor, {withTheme: true});
const withStyleForMobile = withStyles(StyleForMobile, {withTheme: true});

const Views = {
  monitor: withStyleForMonitor(withContainerForMonitor(purify(ViewForMonitor))),
  mobile: withStyleForMobile(withContainerForMobile(purify(ViewForMobile))),
};

export default withRedux(withViewSwitch(Views));
