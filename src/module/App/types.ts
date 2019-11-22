import {RouteProps} from "react-router-dom";
import {ClassNameMap} from "@material-ui/styles/withStyles";
import {AppTheme} from "../../style/theme/type";
import * as i18next from "i18next";

export interface RoutePropsWithKey extends RouteProps {
  key: string;
}

export interface CommonHeaderProps {
  onHeightChange: (height: number) => void;
  onWidthChange?: (width: number) => void;
  mainContentPosition: {
    top: number, left: number, right: number, bottom: number,
  };
}

export interface CommonSidebarProps {
  onWidthChange: (width: number) => void;
  onHeightChange?: (height: number) => void;
  mainContentPosition: {
    top: number, left: number, right: number, bottom: number,
  };
}

export interface WithI18nProps {
  lang: string;
  t: i18next.TFunction;
}

export interface WithStyleProps<ClassKey extends string = string> {
  classes: ClassNameMap<ClassKey>;
  theme: AppTheme;
}

export interface WithStyleAndI18nProps<ClassKey extends string = string>
  extends WithI18nProps, WithStyleProps<ClassKey> {
}
