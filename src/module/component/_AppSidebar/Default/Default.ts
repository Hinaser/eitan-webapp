import {withStyles} from "@material-ui/styles";
import {purify} from "../../../../service/purify/index";
import StyleForMobile from "./Default.style.mobile";
import StyleForMonitor from "./Default.style.monitor";
import {withViewSwitch} from "../../../../service/breakPointMonitor/index";
import {withI18n} from "../../../../i18n/context";
import withRedux from "./Default.redux";
import ViewForMonitor from "./Default.view.monitor";
import ViewForMobile from "./Default.view.mobile";
import {withContainer} from "./Default.container";

const Views = {
  mobile: withStyles(StyleForMobile, {withTheme: true})(withContainer(purify(ViewForMobile))),
  monitor: withStyles(StyleForMonitor, {withTheme: true})(withContainer(purify(ViewForMonitor))),
};

export default withRedux(withI18n(withViewSwitch(Views)));
