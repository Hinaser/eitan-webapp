import * as React from "react";
import {IContainerProps, IContainerState, IViewProps} from "./index.type";
import memoizeOne from "memoize-one";

const getTableStyle = memoizeOne((height: number) => {
  return {height};
});



class WordsContainer extends React.Component<IContainerProps, IContainerState> {
  public constructor(props: IContainerProps){
    super(props);
  
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeItemsPerPage = this.onChangeItemsPerPage.bind(this);
    this.onChangeHideMean = this.onChangeHideMean.bind(this);
    this.onChangeSortType = this.onChangeSortType.bind(this);
    
    this.state = {
      itemsPerPage: 50,
      pageIndex: 0,
      hideMean: false,
      sortType: "noSort",
    };
  }
  
  public render(){
    const {
      wordList,
      qaTrend,
      view: Component,
    } = this.props;
    const {
      itemsPerPage,
      sortType,
    } = this.state;
  
    const windowHeight = window.innerHeight
      || window.document.documentElement.clientHeight || document.body.clientHeight;
    
    const height = windowHeight - 64*2 - 40 - 32 - 32 - 48;
    const containerStyle = getTableStyle(height);
    
    const maxPage = Math.ceil(wordList.length / itemsPerPage);
    
    const sortedWordList = (()=>{
      if(sortType === "alphabet"){
        return [...wordList].sort((a, b) => a.word.localeCompare(b.word));
      }
      else if(sortType === "mostTroubling"){
        return [...wordList]
          .sort((a, b) => a.word.localeCompare(b.word))
          .sort((a, b) => {
            const trendA = qaTrend[a.word];
            const trendB = qaTrend[b.word];
            if(!trendA && !trendB){
              return 1;
            }
            else if(!trendA){
              return 1;
            }
            else if(!trendB){
              return -1;
            }
    
            const errorA = trendA.reduce((acc, t) => acc + (t.result ? 0 : 1), 0) / trendA.length;
            const errorB = trendB.reduce((acc, t) => acc + (t.result ? 0 : 1), 0) / trendB.length;
            return errorB - errorA;
          });
      }
      return wordList;
    })();
    
    return (
      <Component
        {...this.props}
        {...this.state}
        containerStyle={containerStyle}
        maxPage={maxPage}
        wordList={sortedWordList}
        onChangePage={this.onChangePage}
        onChangeItemsPerPage={this.onChangeItemsPerPage}
        onChangeHideMean={this.onChangeHideMean}
        onChangeSortType={this.onChangeSortType}
      />
    );
  }
  
  public onChangePage(e: React.MouseEvent<HTMLElement>){
    const {wordList} = this.props;
    const {itemsPerPage} = this.state;
    const indexStr = e.currentTarget.dataset.index as string;
    const index = +indexStr;
    const maxPage = Math.ceil(wordList.length / itemsPerPage);
    
    if(isNaN(index) || !isFinite(index) || index < 0 || index > maxPage - 1){
      return;
    }
    
    this.setState({
      pageIndex: index,
    });
  }
  
  public onChangeItemsPerPage(e: React.ChangeEvent<HTMLSelectElement>){
    const itemsPerPageStr = e.currentTarget.value;
    const itemsPerPage = +itemsPerPageStr;
    
    this.setState({
      itemsPerPage,
      pageIndex: 0,
    });
  }
  
  public onChangeHideMean(){
    this.setState(prevState => ({
      hideMean: !prevState.hideMean,
    }));
  }
  
  public onChangeSortType(e: React.ChangeEvent<HTMLSelectElement>){
    const sortType = e.currentTarget.value as "alphabet"|"noSort"|"mostTroubling";
    this.setState({
      sortType,
    });
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <WordsContainer {...props} view={component} />
  );
}
