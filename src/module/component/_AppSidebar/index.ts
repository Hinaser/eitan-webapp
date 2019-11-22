import {withStyles} from "@material-ui/styles";
import {withI18n} from "../../../i18n/context";
import {purify} from "../../../service/purify/index";
import withRedux from "./index.redux";
import StyleForMonitor from "./index.style.monitor";
import ViewForMonitor from "./index.view.monitor";
import StyleForMobile from "./index.style.mobile";
import ViewForMobile from "./index.view.mobile";
import {withContainer as withContainerForMonitor} from "./index.container.monitor";
import {withContainer as withContainerForMobile} from "./index.container.mobile";
import {withViewSwitch} from "../../../service/breakPointMonitor/index";

const withStyleForMonitor = withStyles(StyleForMonitor, {withTheme: true});
const withStyleForMobile = withStyles(StyleForMobile, {withTheme: true});

const Views = {
  mobile: withStyleForMobile(withContainerForMobile(purify(ViewForMobile))),
  monitor: withStyleForMonitor(withContainerForMonitor(purify(ViewForMonitor))),
};

export default withRedux(withI18n(withViewSwitch(Views)));
