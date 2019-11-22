/**
 * Declare Header/Sidebar component to be attached to AppOutline.
 * You can change Header/Sidebar by specifying component path below.
 *
 * e.g.
 * export {default as Header} from "......";
 * export {default as Sidebar} from "......";
 */
import _Sidebar from "./component/_AppSidebar";
import {withSidebarContent} from "../service/customOutline/sidebar.context";
import _Header from "./component/_AppHeader";
import {withHeaderContent} from "../service/customOutline/header.context";

export const Header = withHeaderContent(_Header);
export const Sidebar = withSidebarContent(_Sidebar);
