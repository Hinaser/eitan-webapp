import {withStyles} from "@material-ui/styles";
import {withContentSize} from "../../../service/contentSizeMonitor/context";
import {withContainer} from "./index.container";
import Style from "./index.style";
import View from "./index.view";

const withStyle = withStyles(Style);

export default withStyle(withContentSize(withContainer(View)));
