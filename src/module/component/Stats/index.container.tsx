import * as React from "react";
import {IContainerProps, IContainerState, IViewProps} from "./index.type";
import memoizeOne from "memoize-one";

const getContainerStyle = memoizeOne((height: number, width: number) => {
  return {height, width};
});

type DataByDate = {[date: number]: {allCount: number, missCount: number, missRate: number}};

class StatsContainer extends React.Component<IContainerProps, IContainerState> {
  public constructor(props: IContainerProps){
    super(props);
    
    this.state = {
    };
  }
  
  public render(){
    const {
      view: Component,
    } = this.props;
  
    const windowHeight = window.innerHeight
      || window.document.documentElement.clientHeight || document.body.clientHeight;
    const height = windowHeight - 64*2 - 40 - 32 - 16 - 16;
    const windowWidth = window.innerWidth
      || window.document.documentElement.clientWidth || document.body.clientWidth;
    const width = Math.min(windowWidth - 128, 1000) - 16*2/*padding*/;
  
    const containerStyle = getContainerStyle(height, width);
    
    const qaDataByDate = this.getDataByDate();
    const qaDataIn7Days = this.getDataInLast7Days(qaDataByDate);
    const qaDataIn12Months = this.getDataInLast12Months(qaDataByDate);
  
    return (
      <Component
        {...this.props}
        {...this.state}
        containerStyle={containerStyle}
        width={width}
        qaDataIn7Days={qaDataIn7Days}
        qaDataIn12Months={qaDataIn12Months}
      />
    );
  }
  
  public getDataByDate(){
    const {
      qaTrend,
    } = this.props;
  
    const qaDataByDate: DataByDate = {};
    Object.keys(qaTrend).forEach(word => {
      const stat = qaTrend[word];
      stat.forEach(s => {
        if(!qaDataByDate[s.ymd]){
          qaDataByDate[s.ymd] = {allCount: 0, missCount: 0, missRate: 0};
        }
        qaDataByDate[s.ymd].allCount++;
        qaDataByDate[s.ymd].missCount += s.result === 0 ? 1 : 0;
        qaDataByDate[s.ymd].missRate = Math.round(qaDataByDate[s.ymd].missCount/qaDataByDate[s.ymd].allCount*1000)/10;
      });
    });
    
    return qaDataByDate;
  }
  
  public getDataInLast7Days(dataByDate: DataByDate){
    const last7Days = [...new Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i - 6);
      return (d.getFullYear()*10000 + (d.getMonth()+1)*100 + d.getDate()).toString();
    });
  
    return last7Days.map((d: string) => {
      const date = new Date(+d.substr(0, 4), (+d.substr(4, 2)-1), +d.substr(6,2));
      return {
        time: date.getTime(),
        date: `${date.getFullYear().toString().substr(2, 2)}/${date.getMonth()+1}/${date.getDate()}`,
        ...(dataByDate[+d] ? dataByDate[+d] : {allCount: 0, missCount: 0, missRate: 0}),
      };
    });
  }
  
  public getDataInLast12Months(dataByDate: DataByDate){
    const last12Months = [...new Array(12)].map((_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() + i - 11);
      return (d.getFullYear()*10000 + (d.getMonth()+1)*100).toString();
    });
    
    return last12Months.map((ym: string) => {
      const regex = new RegExp(`^${ym.substr(0, 4)}${ym.substr(4, 2)}`);
      const data = Object.keys(dataByDate).reduce((acc, d) => {
        if(regex.test(d)){
          acc.allCount += dataByDate[+d].allCount;
          acc.missCount += dataByDate[+d].missCount;
          acc.missRate = Math.round(acc.missCount/acc.allCount*1000)/10;
        }
        return acc;
      }, {allCount: 0, missCount: 0, missRate: 0});
  
      const date = new Date(+ym.substr(0, 4), (+ym.substr(4, 2)-1), 1);
      return {
        time: date.getTime(),
        date: `${date.getFullYear().toString().substr(2, 2)}/${date.getMonth()+1}`,
        ...data,
      };
    });
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <StatsContainer {...props} view={component} />
  );
}
