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
  const {
    t,
    classes,
    onClickMenu,
    summary,
  } = props;
  
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
  
        <div className={classes.menu} onClick={onClickMenu} data-menu="words">
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
      <div className={classes.summaryContainer}>
        <div className={classes.stats}>
          <div className={classes.summaryTitle}>
            サマリー
          </div>
          <table className={classes.summaryTable}>
            <tbody>
            {Object.keys(summary).filter(item => !["troublingWords","top10TroublingWords"].includes(item)).map(item => {
              return (
                <tr
                  key={item}
                  title={item === "troublingWordsCount" ? t("eowp:troublingWordTitle") : undefined}
                >
                  <td>{t(`eowp:${item}`)}</td>
                  <td>
                    {summary[item as keyof typeof summary]}
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
        <div className={classes.troublingWords}>
          <div className={classes.summaryTitle} title={t("eowp:troublingWordTitle")}>
            苦手な単語トップ10
          </div>
          <table className={classes.troublingWordsTable}>
            <tbody>
            {summary.top10TroublingWords.map((w, i) => {
              return (
                <tr key={w.word} title={w.wordMeans.map(m => m.mean).join("\r\n")}>
                  <td>{i+1}</td>
                  <td>
                    {w.word}
                  </td>
                  <td>
                    誤答率 {Math.round(w.missCount/w.allCount*1000)/10}%
                  </td>
                  <td>
                    誤答 {w.missCount}回
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
