import {withStyles} from "@material-ui/styles";
import {purify} from "../../../service/purify/index";
import Style from "./AppLoader.style";
import View from "./AppLoader.view";


const ws = withStyles(Style, {withTheme: true});

export default ws(purify(View));
