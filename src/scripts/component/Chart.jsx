import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as R from "ramda";

export const CreateChart = props => {
  if (props.data.length === 0) {
    return null;
  }

  let chartData = [];
  props.data.forEach(v => {
    const data = {
      name: v.name,
      data: R.pluck("value", v.data)
    };
    chartData.push(data);
  });

  const Chart = (
    <HighchartsReact highcharts={Highcharts} options={setOption(chartData)} />
  );

  return <div>{Chart}</div>;
};

const setOption = chartData => {
  const options = {
    title: {
      text: "都道府県別人口構成"
    },
    yAxis: {
      title: {
        text: "人口数"
      }
    },
    xAxis: {
      title: {
        text: "年"
      }
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },
    tooltip: {
      pointFormat: "{point.y:,f} 人"
    },
    plotOptions: {
      series: {
        pointInterval: 5,
        pointStart: 1960
      }
    },
    series: chartData
  };
  return options;
};
