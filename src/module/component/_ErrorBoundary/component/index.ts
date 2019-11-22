import {withStyles} from "@material-ui/styles";
import {withI18n} from "../../../../i18n/context";
import {purify} from "../../../../service/purify/index";
import {withContainer} from "./index.container";
import withRedux from "./index.redux";
import View from "./index.view";
import Style from "./index.style";



const ws = withStyles(Style, {withTheme: true});

export default withRedux(withI18n(ws(withContainer(purify(View)))));
