import * as CSS from "csstype";
/**
 * When you use @material-ui as Style Framework, uncomment the following import statement
 * and comment out `interface Theme {}`.
 */
// import {Theme} from "@material-ui/core";
interface Theme {}

/**
 * Add user-defined custom theme here.
 * What property you add and/or how to use these original properties are up to you.
 */
interface CustomProps {
  primaryForegroundColor: CSS.ColorProperty;
  primaryBackgroundColor: CSS.BackgroundColorProperty;
  dialogClickListenerBackgroundColor: CSS.BackgroundColorProperty;
}

interface CustomComponents {
  [name: string]: CSS.Properties | CustomComponents;
}

export interface AppTheme extends Theme {
  customProps: CustomProps;
  customComponents: CustomComponents;
  customUI: CustomComponents;
}

export type CreateThemeType = () => AppTheme;
