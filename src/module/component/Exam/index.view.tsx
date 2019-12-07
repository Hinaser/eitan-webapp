import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import classNames from "classnames";
import {
  MdCheck as CheckIcon,
  MdSend as NextIcon,
  MdRadioButtonUnchecked as CorrectIcon,
  MdClear as NoIcon,
  MdCheck as CompleteIcon,
} from "react-icons/md";
import {GiBookshelf as HeaderIcon} from "react-icons/all";
import {IViewProps} from "./index.type";
import {checkAnswer} from "./index.lib";

export default function ExamView(props: IViewProps){
  const {
    classes,
    styleForHistoryContainer,
    styleForQuestionContainer,
    qaList,
    currentQa,
    onClickAnswer,
    onClickNext,
    onClickQuestion,
    onClickToHome,
    onClickComplete,
    readList,
    answerResult,
  } = props;
  
  const qa = qaList[currentQa !== null ? currentQa : 0];
  const answers = qaList.map(q => checkAnswer(q, q.answer));
  const nAnswered = answers.filter(a => a !== null).length;
  const nCorrect = answers.filter(a => a === "correct").length;
  const nNo = answers.filter(a => a === "no").length;
  
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.iconContainer}>
          <HeaderIcon />
        </div>
        <div className={classes.titleContainer}>
          <div className={classes.title}>英単語復習アプリ</div>
          <div className={classes.version}>v{process.env.REACT_APP_VERSION}</div>
        </div>
        <div className={classes.examSummaryContainer}>
          <div>
            全 {qaList.length}問
          </div>
          <div>
            正 {nCorrect} 誤 {nNo}
          </div>
          <div>
            正答率 {nAnswered > 0 ? Math.round(nCorrect / nAnswered * 1000)/10 : "-"}%
          </div>
        </div>
        <div className={classes.backToHome}>
          <div onClick={onClickToHome}>
            やめる
          </div>
        </div>
      </div>
      {qaList.length >= 10 ? (
        <div className={classes.body}>
          <div className={classes.historyContainer}>
            <Scrollbars
              style={styleForHistoryContainer}
            >
              <div className={classes.qaListContainer}>
                {qaList.map((q, i) => {
                  const checkAnswerResult = checkAnswer(q, q.answer);
                  return (
                    <div
                      className={classNames(classes.qi, i === currentQa && "selected")}
                      key={q.word}
                      onClick={onClickQuestion}
                      data-index={i}
                      data-result={checkAnswerResult || ""}
                    >
                      {checkAnswerResult === "correct" ? <CorrectIcon /> : (checkAnswerResult === "no" ? <NoIcon /> : null)}
                      {(i === currentQa || readList.includes(i)) ? q.word : "???"}
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
                  {qa.word}
                </div>
                <div className={classes.pronounce}>
                  {qa.pronounce && `[${qa.pronounce}]`}
                </div>
                <div className={classes.statement}>
                  この単語の意味を下記より1つ選びなさい。
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
                            className={classNames(answerResult !== null && "answered")}
                          >
                            <td
                              className={classes.check}
                            >
                              <div
                                className={classNames(qa.answer && qa.answer.includes(i) && "checked")}
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
                  <div
                    className={classNames(
                      classes.answerResultImage,
                      answerResult === null && "hide",
                      answerResult === "correct" && "correct",
                      answerResult === "no" && "no",
                    )}
                  >
                    {answerResult === "correct" ? <CorrectIcon /> : (answerResult === "no" ? <NoIcon /> : null)}
                  </div>
                </div>
                <div className={classNames(classes.answerResult, answerResult === null && "hide")}>
                  <div>
                    {answerResult === "correct" && (
                      <div className={classes.correct}>
                        正解!
                      </div>
                    )}
                    {answerResult === "no" && (
                      <div className={classes.no}>
                        間違い
                      </div>
                    )}
                  </div>
                  <div>
                    <ol>
                      {qa.wordMeans.map((m, i) => {
                        return (
                          <li
                            key={`${qa.word}-${m.mean}-${i}`}
                          >
                            {m.mean}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
              </div>
            </Scrollbars>
            <div className={classes.footer}>
              {answerResult !== null && (nAnswered < qaList.length ? (
                <div className={classes.footerButton} onClick={onClickNext}>
                  <NextIcon /> 次の英単語へ
                </div>
              ) : (
                <div className={classes.footerButton} onClick={onClickComplete}>
                  <CompleteIcon /> 完了する
                </div>
              ))}
            </div>
          </div>
        </div>

      ) : (
        <div className={classes.notEnoughWordlist}>
          テストを開始するためには10個以上の単語を単語帳に登録する必要があります。
        </div>
      )}
    </div>
  );
}
