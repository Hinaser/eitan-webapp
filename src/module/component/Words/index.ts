import {withStyles} from "@material-ui/styles";
import {withRouter} from "react-router-dom";
import {withI18n} from "../../../i18n/context";
import {purify} from "../../../service/purify";
import {withContentSize} from "../../../service/contentSizeMonitor/context";
import {withContainer} from "./index.container";
import withRedux from "./index.redux";
import Style from "./index.style";
import View from "./index.view";


const ws = withStyles(Style, {withTheme: true});

export default withRedux(withRouter(withContentSize(withI18n(ws(withContainer(purify(View)))))));
