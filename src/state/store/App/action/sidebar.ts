import {CHANGE_SIDEBAR_POSITION, TOGGLE_SIDEBAR} from "./index.type";

export function toggleSidebar(openOrClose: "open"|"close") {
  return {
    type: TOGGLE_SIDEBAR,
    payload: {openOrClose},
  };
}

export function changeSidebarPosition(position: "left"|"right"){
  return {
    type: CHANGE_SIDEBAR_POSITION,
    payload: {position},
  };
}
