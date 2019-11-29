import * as React from "react";
import {IViewProps} from "./index.type";
import Header from "../../ui-component/Header";

export default function SettingView(props: IViewProps){
  const {
    classes,
    onChangeNChoices,
    onChangeNQuestionsInExam,
    nChoices,
    nQuestionsInExam,
  } = props;
  
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.settingContainer}>
        <table className={classes.settingTable}>
          <tbody>
          <tr>
            <td>テストあたりの問題数</td>
            <td>
              <input
                type="number"
                value={nQuestionsInExam}
                onChange={onChangeNQuestionsInExam}
                className={classes.input}
              />
            </td>
          </tr>
          <tr>
            <td>1問あたりの選択肢の数</td>
            <td>
              <input
                type="number"
                value={nChoices}
                onChange={onChangeNChoices}
                className={classes.input}
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
