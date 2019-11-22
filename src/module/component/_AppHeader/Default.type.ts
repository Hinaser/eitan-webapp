import * as React from "react";
import {CommonHeaderProps, WithStyleAndI18nProps} from "../../App/types";

export interface IViewProps extends React.PropsWithChildren<WithStyleAndI18nProps> {
  onClickLang: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onClickTheme: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onClickSidebarPosition: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  toggleSidebar: () => void;
}

export interface IContainerProps extends React.PropsWithChildren<CommonHeaderProps & WithStyleAndI18nProps> {
  isSidebarOpen: boolean;
  sidebarPosition: "left" | "right";
  changeLanguage: (lang: string) => void;
  changeTheme: (theme: string) => void;
  changeSidebarPosition: (position: "left"|"right") => void;
  toggleSidebar: (openOrClose: "open"|"close") => void;
  view: React.ComponentType<IViewProps>;
}
