import * as React from "react";
import {IContainerProps, IContainerState, IViewProps} from "./index.type";

class SettingContainer extends React.Component<IContainerProps, IContainerState> {
  public constructor(props: IContainerProps){
    super(props);
    
    this.onChangeNChoices = this.onChangeNChoices.bind(this);
    this.onChangeNQuestionsInExam = this.onChangeNQuestionsInExam.bind(this);
    
    this.state = {
    };
  }
  
  public render(){
    const {
      view: Component,
    } = this.props;

    return (
      <Component
        {...this.props}
        {...this.state}
        onChangeNChoices={this.onChangeNChoices}
        onChangeNQuestionsInExam={this.onChangeNQuestionsInExam}
      />
    );
  }
  
  public onChangeNChoices(e: React.ChangeEvent<HTMLInputElement>){
    const {changeNChoices} = this.props;
    const valueStr = e.currentTarget.value as string;
    const value = +valueStr;
    
    if(2 <= value && value <= 10){
      changeNChoices(value);
    }
  }
  
  public onChangeNQuestionsInExam(e: React.ChangeEvent<HTMLInputElement>){
    const {changeNQuestionsInExam} = this.props;
    const valueStr = e.currentTarget.value as string;
    const value = +valueStr;
    
    if(2 <= value && value <= 100){
      changeNQuestionsInExam(value);
    }
  }
}

export function withContainer(component: React.ComponentType<IViewProps>){
  return (props: Omit<IContainerProps, "view">) => (
    <SettingContainer {...props} view={component} />
  );
}
