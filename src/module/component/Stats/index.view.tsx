import * as React from "react";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from "recharts";
import {IViewProps} from "./index.type";
import Header from "../../ui-component/Header";
import Scrollbars from "react-custom-scrollbars";

export default function StatsView(props: IViewProps){
  const {
    classes,
    containerStyle,
    qaDataIn7Days,
    qaDataIn12Months,
    width,
  } = props;
  
  const tickFormatterFor7Days = (t: number) => {
    const d = new Date(t);
    return `${d.getFullYear().toString().substr(2,2)}/${(d.getMonth()+1).toString().padStart(2, "0")}/${d.getDate().toString().padStart(2, "0")}`;
  };
  const labelFormatterFor7days = (label: string|number) => {
    const d = new Date(label);
    return `${d.getFullYear().toString().substr(2,2)}/${(d.getMonth()+1).toString().padStart(2, "0")}/${d.getDate().toString().padStart(2, "0")}`;
  };
  
  const tickFormatterFor12Months = (t: number) => {
    const d = new Date(t);
    return `${d.getFullYear().toString().substr(2,2)}/${(d.getMonth()+1).toString().padStart(2, "0")}`;
  };
  const labelFormatterFor12Months = (label: string|number) => {
    const d = new Date(label);
    return `${d.getFullYear().toString().substr(2,2)}/${(d.getMonth()+1).toString().padStart(2, "0")}`;
  };
  
  return (
    <div className={classes.root}>
      <Header />
      <Scrollbars
        style={containerStyle}
        className={classes.statsContainer}
      >
        <div>
          <table className={classes.chartTable}>
            <tbody>
            <tr>
              <td>直近7日間</td>
              <td>
                {
                  <LineChart
                    data={qaDataIn7Days}
                    width={width-200}
                    height={200}
                  >
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis
                      scale={"time"}
                      dataKey="time"
                      tickFormatter={tickFormatterFor7Days}
                    />
                    <YAxis />
                    <Line name={"回答数"} type="monotone" dataKey="allCount" stroke="#8884d8" />
                    <Line name={"誤答数"} type="monotone" dataKey="missCount" stroke="red" />
                    <Tooltip labelFormatter={labelFormatterFor7days} />
                    <Legend />
                  </LineChart>
                }
              </td>
            </tr>
            <tr>
              <td>直近12ヶ月</td>
              <td>
                {
                  <LineChart
                    data={qaDataIn12Months}
                    width={width-200}
                    height={200}
                  >
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis
                      scale={"time"}
                      dataKey="time"
                      tickFormatter={tickFormatterFor12Months}
                    />
                    <YAxis />
                    <Line name={"回答数"} type="monotone" dataKey="allCount" stroke="#8884d8" />
                    <Line name={"誤答数"} type="monotone" dataKey="missCount" stroke="red" />
                    <Tooltip labelFormatter={labelFormatterFor12Months} />
                    <Legend />
                  </LineChart>
                }
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </Scrollbars>
    </div>
  );
}
