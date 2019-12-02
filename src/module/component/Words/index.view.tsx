import * as React from "react";
import classNames from "classnames";
import {MdCheckBox as CheckIcon, MdCheckBoxOutlineBlank as NoCheckIcon} from "react-icons/md";
import {IViewProps} from "./index.type";
import Header from "../../ui-component/Header";
import Scrollbars from "react-custom-scrollbars";

export default function WordsView(props: IViewProps){
  const {
    classes,
    t,
    wordList,
    containerStyle,
    itemsPerPage,
    pageIndex,
    maxPage,
    hideMean,
    sortType,
    onChangeHideMean,
    onChangeItemsPerPage,
    onChangePage,
    onChangeSortType,
  } = props;
  
  const wordListInPage = wordList.slice(pageIndex*itemsPerPage, pageIndex*itemsPerPage + itemsPerPage);
  
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.controlContainer}>
        <div className={classes.paginator}>
          <div
            onClick={onChangePage}
            data-index={pageIndex-1}
            className={classNames(pageIndex - 1 < 0 && "no-index")}
          >
            前
          </div>
          {[...new Array(maxPage)].map((_, i) => {
            return (
              <div key={i} onClick={onChangePage} data-index={i}>{i+1}</div>
            );
          })}
          <div
            onClick={onChangePage}
            data-index={pageIndex+1}
            className={classNames(pageIndex + 1 > maxPage - 1 && "no-index")}
          >
            次
          </div>
        </div>
        <div
          className={classes.pageSummaryContainer}
        >
          {wordList.length}件中{pageIndex*itemsPerPage+1}～{pageIndex*itemsPerPage + wordListInPage.length}件を表示
        </div>
        <div className={classes.selectContainer}>
          <div>
            表示件数
          </div>
          <select
            className={classes.selectItemsPerPage}
            onChange={onChangeItemsPerPage}
            value={itemsPerPage}
          >
            {[30,50,100].map(ipp => {
              return (
                <option key={ipp} value={ipp}>{ipp}</option>
              );
            })}
          </select>
        </div>
        <div className={classes.hideMeanContainer} onClick={onChangeHideMean}>
          <div>
            意味を隠す
          </div>
          <div className={classes.checkIcon}>
            {hideMean ? <CheckIcon /> : <NoCheckIcon/>}
          </div>
        </div>
        <div className={classes.sortTypeContainer}>
          <div>
            表示件数
          </div>
          <select
            className={classes.selectSortType}
            onChange={onChangeSortType}
            value={sortType}
          >
            {["alphabet","noSort","mostTroubling"].map(sortType => {
              return (
                <option key={sortType} value={sortType}>{t(`eowp:sortOrder.${sortType}`)}</option>
              );
            })}
          </select>
        </div>
      </div>
      <Scrollbars
        style={containerStyle}
        className={classes.wordsContainer}
      >
        <table className={classes.wordsTable}>
          <tbody>
          {wordListInPage.map((w, i) => {
            return (
              <tr key={`${w.word}-${i}`}>
                <td className={classes.wordTd}>
                  <div className={classes.word}>{w.word}</div>
                  {w.pronounce && (
                    <div className={classes.pronounce}>{w.pronounce}</div>
                  )}
                </td>
                <td className={classNames(classes.meanTd, hideMean && "hide")}>
                  {w.wordMeans.map(m => {
                    return (
                      <div key={`${w.word}-${i}-${m.wordClass}-${m.mean}`}>
                        【{m.wordClass}】{m.mean}
                      </div>
                    );
                  })}
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </Scrollbars>
    </div>
  );
}
