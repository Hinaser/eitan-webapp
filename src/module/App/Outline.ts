import {withStyles} from "@material-ui/styles";
import {purify} from "../../service/purify";
import {withContainer} from "./Outline.container";
import withRedux from "./Outline.redux";
import Style from "./Outline.style";
import View from "./Outline.view";
import {provideViewSwitch} from "../../service/breakPointMonitor";
import {provideSidebarSwitcher} from "../../service/customOutline/sidebar.context";
import {provideHeaderSwitcher} from "../../service/customOutline/header.context";


const ws = withStyles(Style, {withTheme: true});

export default withRedux(
  provideViewSwitch(
    provideHeaderSwitcher(
      provideSidebarSwitcher(
        ws(
          withContainer(
            purify(View)))))));
