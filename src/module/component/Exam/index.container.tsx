import * as React from "react";
import memoizeOne from "memoize-one";
import {IContainerProps, IContainerState, IViewProps} from "./index.type";
import {generateQuestionList} from "../../../lib/eowp/index";

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
    this.onClickPrevious = this.onClickPrevious.bind(this);
    this.onClickQuestion = this.onClickQuestion.bind(this);
    this.onClickComplete = this.onClickComplete.bind(this);
    this.onClickToHome = this.onClickToHome.bind(this);
    
    const ql = generateQuestionList(props.wordList).map(q => ({...q, answer: null}));
    
    this.state = {
      qaList: ql,
      currentQa: ql.length > 0 ? 0 : null,
      selectedAnswerIndexes: null,
      readList: ql.length > 0 ? [0] : [],
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
        onClickPrevious={this.onClickPrevious}
        onClickQuestion={this.onClickQuestion}
        onClickComplete={this.onClickComplete}
        onClickToHome={this.onClickToHome}
      />
    );
  }
  
  public onClickAnswer(e: React.MouseEvent<HTMLElement>){
    const indexStr = e.currentTarget.dataset.index as string;
    const index = +indexStr;
    const {selectedAnswerIndexes, qaList, currentQa} = this.state;
    
    if(!selectedAnswerIndexes){
      return this.setState({
        qaList: qaList.map((q, i2) => {
          if(i2 === currentQa){
            return {...q, answer: [index]};
          }
          return q;
        }),
        selectedAnswerIndexes: [index],
      });
    }
    
    const i = selectedAnswerIndexes.findIndex(ai => ai === index);
    if(i < 0){
      const nextSelectedAnswerIndexes = [...selectedAnswerIndexes, index];
      
      return this.setState({
        qaList: qaList.map((q, i2) => {
          if(i2 === currentQa){
            return {...q, answer: nextSelectedAnswerIndexes};
          }
          return q;
        }),
        selectedAnswerIndexes: nextSelectedAnswerIndexes,
      });
    }
    
    const nextSelectedAnswerIndexes = selectedAnswerIndexes.filter(ai => ai !== index);
    return this.setState({
      qaList: qaList.map((q, i2) => {
        if(i2 === currentQa){
          return {...q, answer: nextSelectedAnswerIndexes};
        }
        return q;
      }),
      selectedAnswerIndexes: nextSelectedAnswerIndexes,
    });
  }
  
  public onClickNext(e: React.MouseEvent<HTMLElement>){
    const {currentQa, qaList, readList} = this.state;
    if(currentQa === null || currentQa >= qaList.length - 1){
      return;
    }
    
    const nextQa = currentQa + 1;
    
    this.setState({
      currentQa: nextQa,
      selectedAnswerIndexes: qaList[nextQa].answer,
      readList: readList.includes(nextQa) ? readList : [...readList, nextQa],
    });
  }
  
  public onClickPrevious(e: React.MouseEvent<HTMLElement>){
    const {currentQa, qaList, readList} = this.state;
    if(currentQa === null || currentQa <= 0){
      return;
    }
  
    const prevQa = currentQa - 1;
  
    this.setState({
      currentQa: prevQa,
      selectedAnswerIndexes: qaList[prevQa].answer,
      readList: readList.includes(prevQa) ? readList : [...readList, prevQa],
    });
  }
  
  public onClickQuestion(e: React.MouseEvent<HTMLElement>){
    const {qaList, readList} = this.state;
    const indexStr = e.currentTarget.dataset.index as string;
    const index = +indexStr;
    
    if(!readList.includes(index)){
      return;
    }
    
    this.setState({
      currentQa: index,
      selectedAnswerIndexes: qaList[index].answer,
    });
  }
  
  public onClickComplete(e: React.MouseEvent<HTMLElement>){
  }
  
  public onClickToHome(e: React.MouseEvent<HTMLElement>){
    const {history} = this.props;
    history.push("/");
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <ExamContainer {...props} view={component} />
  );
}
