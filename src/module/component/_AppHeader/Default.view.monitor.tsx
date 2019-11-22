import * as React from "react";
import {IViewProps} from "./Default.type";

export default function AppSidebarDefaultViewForMonitor(props: IViewProps){
  const {
    t,
    classes,
    onClickLang,
    onClickTheme,
    onClickSidebarPosition,
  } = props;
  
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        {t("general:title")}
      </div>
      <div className={classes.spacer} />
      <div className={classes.language}>
        <div className={classes.label}>
          {t("general:language")}
        </div>
        <div>
          <span onClick={onClickLang} className={classes.link} data-lang="en">
            {t("general:English")}
          </span>
          <span onClick={onClickLang}  className={classes.link} data-lang="ja">
            {t("general:Japanese")}
          </span>
        </div>
      </div>
      <div className={classes.theme}>
        <div className={classes.label}>
          {t("design")}
        </div>
        <div>
          <span onClick={onClickTheme} className={classes.link} data-theme="default">
            {t("general:theme1")}
          </span>
          <span onClick={onClickTheme} className={classes.link} data-theme="dark">
            {t("general:theme2")}
          </span>
        </div>
      </div>
      <div className={classes.theme}>
        <div className={classes.label}>
          {t("general:sidebarPosition")}
        </div>
        <div>
          <span onClick={onClickSidebarPosition} className={classes.link} data-position="left">
            {t("general:sidebarLeft")}
          </span>
          <span onClick={onClickSidebarPosition} className={classes.link} data-position="right">
            {t("general:sidebarRight")}
          </span>
        </div>
      </div>
    </div>
  );
}
