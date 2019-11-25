import * as React from "react";
import {
  MdLaunch as LaunchIcon,
  MdList as ListIcon,
  MdShowChart as ChartIcon,
  MdSettings as ConfigIcon,
} from "react-icons/md";
import {IViewProps} from "./index.type";
import Header from "../../ui-component/Header";

export default function HomeView(props: IViewProps){
  const {classes, onClickMenu} = props;
  
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.menuContainer}>
        <div className={classes.menu} onClick={onClickMenu} data-menu="exam">
          <div className={classes.menuImage}>
            <LaunchIcon />
          </div>
          <div className={classes.menuTitle}>
            テスト開始
          </div>
        </div>
  
        <div className={classes.menu} onClick={onClickMenu} data-menu="wordList">
          <div className={classes.menuImage}>
            <ListIcon />
          </div>
          <div className={classes.menuTitle}>
            単語一覧
          </div>
        </div>
  
        <div className={classes.menu} onClick={onClickMenu} data-menu="stats">
          <div className={classes.menuImage}>
            <ChartIcon />
          </div>
          <div className={classes.menuTitle}>
            統計
          </div>
        </div>
  
        <div className={classes.menu} onClick={onClickMenu} data-menu="config">
          <div className={classes.menuImage}>
            <ConfigIcon />
          </div>
          <div className={classes.menuTitle}>
            設定
          </div>
        </div>
      </div>
    </div>
  );
}
