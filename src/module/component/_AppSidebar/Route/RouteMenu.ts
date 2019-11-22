import {withStyles} from "@material-ui/styles";
import {purify} from "../../../../service/purify/index";
import StyleForMobile from "./RouteMenu.style.mobile";
import StyleForMonitor from "./RouteMenu.style.monitor";
import {withViewSwitch} from "../../../../service/breakPointMonitor/index";
import {withI18n} from "../../../../i18n/context";
import withRedux from "./RouteMenu.redux";
import ViewForMonitor from "./RouteMenu.view.monitor";
import ViewForMobile from "./RouteMenu.view.mobile";
import {withContainer} from "./RouteMenu.container";

const Views = {
  mobile: withStyles(StyleForMobile, {withTheme: true})(withContainer(purify(ViewForMobile))),
  monitor: withStyles(StyleForMonitor, {withTheme: true})(withContainer(purify(ViewForMonitor))),
};

export default withRedux(withI18n(withViewSwitch(Views)));
