// tslint:disable-next-line:no-implicit-dependencies
import {CreatorsToActions} from "type-util";
import * as RootActionCreators from "./root.action";
import * as AppActionCreators from "./App/action";

export type RootActions =
  CreatorsToActions<typeof RootActionCreators>
  | CreatorsToActions<typeof AppActionCreators>
  ;
