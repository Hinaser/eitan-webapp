import * as React from "react";
import {IViewProps, IContainerProps} from "./Default.type";

class DefaultHeaderContainer extends React.PureComponent<IContainerProps> {
  public static readonly initialHeight: number = 80;
  
  constructor(props: IContainerProps){
    super(props);
    
    this.onClickLang = this.onClickLang.bind(this);
    this.onClickTheme = this.onClickTheme.bind(this);
    this.onClickSidebarPosition = this.onClickSidebarPosition.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  
  public render(){
    const {
      classes,
      theme,
      t,
      lang,
      children,
      view: Component,
    } = this.props;
    
    return (
      <Component
        classes={classes}
        theme={theme}
        lang={lang}
        t={t}
        onClickLang={this.onClickLang}
        onClickTheme={this.onClickTheme}
        onClickSidebarPosition={this.onClickSidebarPosition}
        toggleSidebar={this.toggleSidebar}
        children={children}
      />
    );
  }
  
  public onClickLang(e: React.MouseEvent<HTMLSpanElement, MouseEvent>){
    const span = e.currentTarget;
    if(!span){
      return;
    }
    
    const lang = span.dataset.lang;
    if(!lang){
      return;
    }
    this.props.changeLanguage(lang);
  }
  
  public onClickTheme(e: React.MouseEvent<HTMLSpanElement, MouseEvent>){
    const span = e.currentTarget;
    if(!span){
      return;
    }
    
    const theme = span.dataset.theme;
    if(!theme){
      return;
    }
    this.props.changeTheme(theme);
  }
  
  public onClickSidebarPosition(e: React.MouseEvent<HTMLSpanElement,MouseEvent>){
    const span = e.currentTarget;
    if(!span){
      return;
    }
    
    const position = span.dataset.position as "left"|"right";
    if(!position){
      return;
    }
    this.props.changeSidebarPosition(position);
  }
  
  public toggleSidebar(){
    const {toggleSidebar, isSidebarOpen} = this.props;
    
    toggleSidebar(isSidebarOpen ? "close" : "open");
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <DefaultHeaderContainer {...props} view={component} />
  );
}
