import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class Chart extends React.Component {
    constructor(props) {
        super(props)
        console.log('hello')
    }
    makeChart() {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        })
        const options = {
            title: {
                text: '都道府県別人口構成'
            },
            yAxis: {
                title: {
                    text: '人口数'
                }
            },
            xAxis: {
                title: {
                    text: '年'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
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
            series: this.props.data
        }

        const App = () => <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>

        return App()
    }
    render() {
        console.log(this.props.data)
        return <div>{this.makeChart()}</div>
    }
}

export default Chart