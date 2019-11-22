import {withStyles} from "@material-ui/styles";
import {purify} from "../../../service/purify/index";
import Style from "./index.style";
import View from "./index.view";
import {withContainer} from "./index.container";

const withStyle = withStyles(Style, {withTheme: true});

export default withStyle(withContainer(purify(View)));
