import * as React from "react";
import memoizeOne from "memoize-one";
import {IContainerProps, IContainerState, IViewProps} from "./index.type";
import {generateQuestionList, TExamResult, TQATrend} from "../../../lib/eowp";
import {checkAnswer} from "./index.lib";

const getStyleForHistoryContainer = memoizeOne((width: number, height: number) => {
  return {
    height,
    width,
  };
});

const getStyleForQuestionContainer = memoizeOne((width: number, height: number) => {
  return {
    height,
    width,
  };
});



class ExamContainer extends React.Component<IContainerProps, IContainerState> {
  public constructor(props: IContainerProps){
    super(props);
    
    this.onClickAnswer = this.onClickAnswer.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickQuestion = this.onClickQuestion.bind(this);
    this.onClickToHome = this.onClickToHome.bind(this);
    this.onClickComplete = this.onClickComplete.bind(this);
    
    const ql = generateQuestionList(props.wordList, props.nChoices, props.nQuestionsInExam)
      .map(q => ({...q, answer: null}));
    
    this.state = {
      qaList: ql,
      currentQa: ql.length > 0 ? 0 : null,
      readList: ql.length > 0 ? [0] : [],
      answerResult: null,
    };
  }
  
  public render(){
    const {
      view: Component,
      contentHeight,
    } = this.props;
    
    const styleForHistoryContainer = getStyleForHistoryContainer(
      240,
      contentHeight - 128/*mainContentPadding*/ - 40/*Header height*/ - 16*3/*Sum of padding*/,
    );
  
    const windowWidth = window.innerWidth || window.document.documentElement.clientWidth || document.body.clientWidth;
    
    const styleForQuestionContainer = getStyleForQuestionContainer(
      Math.min(windowWidth - 128, 1000) - 16*2/*padding*/ - 32/*separator*/ - styleForHistoryContainer.width,
      contentHeight - 128/*mainContentPadding*/ - 40/*Header height*/ - 16*3/*Sum of padding*/ - 48/*Footer*/,
    );

    return (
      <Component
        {...this.props}
        {...this.state}
        styleForHistoryContainer={styleForHistoryContainer}
        styleForQuestionContainer={styleForQuestionContainer}
        onClickAnswer={this.onClickAnswer}
        onClickNext={this.onClickNext}
        onClickQuestion={this.onClickQuestion}
        onClickToHome={this.onClickToHome}
        onClickComplete={this.onClickComplete}
      />
    );
  }
  
  public onClickAnswer(e: React.MouseEvent<HTMLElement>){
    const indexStr = e.currentTarget.dataset.index as string;
    const index = +indexStr;
    const {qaList, currentQa, readList} = this.state;
    
    if(currentQa === null || !qaList[currentQa]){
      return;
    }
    
    const qa = qaList[currentQa];
    // Already answered question cannot be re-answered
    if(qa.answer !== null && qa.answer.length > 0){
      return;
    }
    
    const answer = [index];
    
    const nextQaList = qaList.map((q, i2) => {
      if(i2 === currentQa){
        return {...q, answer};
      }
      return q;
    });
    
    const answerResult = checkAnswer(qa, answer);
    
    return this.setState({
      qaList: nextQaList,
      answerResult,
      readList: readList.includes(currentQa) ? readList : readList.concat(currentQa),
    });
  }
  
  public onClickNext(e: React.MouseEvent<HTMLElement>){
    const {currentQa, readList, qaList} = this.state;
    if(currentQa === null || currentQa >= qaList.length-1){
      return;
    }
    
    this.setState({
      currentQa: currentQa + 1,
      answerResult: null,
      readList: readList.includes(currentQa) ? readList : readList.concat(currentQa),
    });
  }
  
  public onClickQuestion(e: React.MouseEvent<HTMLElement>){
    const {readList, qaList} = this.state;
    const indexStr = e.currentTarget.dataset.index as string;
    const index = +indexStr;
    
    if(!readList.includes(index)){
      return;
    }
    
    const qa = qaList[index];
    const answerResult = checkAnswer(qa, qa.answer);
    
    this.setState({
      currentQa: index,
      answerResult,
    });
  }
  
  public onClickToHome(e: React.MouseEvent<HTMLElement>){
    const {history} = this.props;
    history.push("/");
  }
  
  public async onClickComplete(e: React.MouseEvent<HTMLElement>){
    const {onExamFinish, history} = this.props;
    const {qaList} = this.state;
    const d = new Date();
    const date = d.getFullYear()*10000 + (d.getMonth()+1)*100 + d.getDate();
    
    const examResult: TExamResult = {
      maxScore: qaList.length,
      score: qaList.filter(q => checkAnswer(q, q.answer) === "correct").length,
      date: d.getTime(),
      ymd: date,
      exam: qaList,
    };
    
    const qaTrend: TQATrend = {};
    qaList.forEach(q => {
      qaTrend[q.word] = [{
        ymd: date,
        date: d.getTime(),
        result: checkAnswer(q, q.answer) === "correct" ? 1 : 0,
      }];
    });
  
    await onExamFinish(examResult, qaTrend);
    history.push("/");
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <ExamContainer {...props} view={component} />
  );
}
