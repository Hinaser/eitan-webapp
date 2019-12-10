import * as React from "react";
import {GiBookshelf as HeaderIcon} from "react-icons/gi";
import {IViewProps} from "./index.type";

export default function HomeView(props: IViewProps){
  const {classes, wordList, onClickToHome, showBackToHome} = props;
  
  return (
    <div className={classes.header}>
      <div className={classes.iconContainer}>
        <HeaderIcon />
      </div>
      <div className={classes.titleContainer}>
        <div className={classes.title}>英単 単語帳復習アプリ</div>
        <div className={classes.version}>v{process.env.REACT_APP_VERSION}</div>
      </div>
      <div className={classes.storedWordsContainer}>
        登録済み単語数: {wordList.length}単語
      </div>
      {showBackToHome && (
        <div className={classes.backToHome}>
          <div onClick={onClickToHome}>
            戻る
          </div>
        </div>
      )}
    </div>
  );
}
