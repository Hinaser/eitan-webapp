import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import classNames from "classnames";
import {MdCheck as CheckIcon} from "react-icons/md";
import {IViewProps} from "./index.type";
import {GiBookshelf as HeaderIcon} from "react-icons/all";

export default function ExamView(props: IViewProps){
  const {
    classes,
    styleForHistoryContainer,
    styleForQuestionContainer,
    qaList,
    currentQa,
    selectedAnswerIndexes,
    onClickAnswer,
    onClickNext,
    onClickPrevious,
    onClickQuestion,
    onClickComplete,
    onClickToHome,
    readList,
  } = props;
  
  const qa = qaList[currentQa !== null ? currentQa : 0];
  
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.iconContainer}>
          <HeaderIcon />
        </div>
        <div className={classes.titleContainer}>
          <div className={classes.title}>英単語テストアプリ</div>
          <div className={classes.version}>v0.0.1</div>
        </div>
        <div className={classes.storedWordsContainer}>
        </div>
        <div className={classes.backToHome}>
          <div onClick={onClickToHome}>
            ホームへ戻る
          </div>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.historyContainer}>
          <Scrollbars
            style={styleForHistoryContainer}
          >
            <div className={classes.qaListContainer}>
              {qaList.map((qa, i) => {
                return (
                  <div
                    className={classNames(classes.qi, i === currentQa && "selected")}
                    key={qa.word}
                    onClick={onClickQuestion}
                    data-index={i}
                  >
                    {(i === currentQa || readList.includes(i)) ? qa.word : "???"}
                  </div>
                );
              })}
            </div>
          </Scrollbars>
        </div>
        <div className={classes.separator} />
        <div className={classes.questionContainer}>
          <Scrollbars
            style={styleForQuestionContainer}
          >
            <div className={classes.question}>
              <div className={classes.word}>
                {qa && qa.word}
              </div>
              <div className={classes.statement}>
                この単語の意味を下記の選択肢より選びなさい。(複数選択可)
              </div>
              <div className={classes.choiceContainer}>
                {qa && (
                  <table className={classes.choiceTable}>
                    <tbody>
                    {qa.choices.map((c, i) => {
                      return (
                        <tr
                          key={`${qa.word}-${c.mean}-${i}`}
                          onClick={onClickAnswer}
                          data-index={i}
                        >
                          <td
                            className={classes.check}
                          >
                            <div
                              className={classNames(selectedAnswerIndexes && selectedAnswerIndexes.includes(i) && "checked")}
                            >
                              <CheckIcon />
                            </div>
                          </td>
                          <td className={classes.choiceIndex}>
                            {i+1}
                          </td>
                          <td className={classes.choice}>
                            {c.mean}
                          </td>
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </Scrollbars>
          <div className={classes.footer}>
            <div
              className={classes.toPrev}
              onClick={onClickPrevious}
            >
              前へ
            </div>
            <div
              className={classes.toNext}
              onClick={onClickNext}
            >
              次へ
            </div>
            <div
              className={classes.completeButtonContainer}
              onClick={onClickComplete}
            >
              採点する
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
