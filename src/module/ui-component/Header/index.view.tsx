import * as React from "react";
import {GiBookshelf as HeaderIcon} from "react-icons/gi";
import {IViewProps} from "./index.type";

export default function HomeView(props: IViewProps){
  const {classes, wordList} = props;
  
  return (
    <div className={classes.header}>
      <div className={classes.iconContainer}>
        <HeaderIcon />
      </div>
      <div className={classes.titleContainer}>
        <div className={classes.title}>英単語テストアプリ</div>
        <div className={classes.version}>v0.0.1</div>
      </div>
      <div className={classes.storedWordsContainer}>
        登録済み単語数: {wordList.length}単語
      </div>
    </div>
  );
}
