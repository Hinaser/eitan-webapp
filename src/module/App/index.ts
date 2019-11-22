import {purify} from "../../service/purify";
import {withContainer} from "./index.container";
import withRedux from "./index.redux";
import View from "./index.view";



export default withRedux(withContainer(purify(View)));
