import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import * as R from 'ramda'

export default class Chart extends React.Component {
	constructor(props) {
		super(props)
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
			series: this.getSeries()
		}

		const App = () => <div>
			<HighchartsReact
				highcharts={Highcharts}
				options={options}
			/>
		</div>

		return App()
	}

	getSeries() {
		if (this.props.data.length === 0) {
			return null
		}

		let series = []
		this.props.data.forEach(v => {
			const ser = {
				name: v.name,
				data: R.pluck('value', v.data)
			}
			series.push(ser)
		})
		return series
	}

	render() {
		return <div>{this.makeChart()}</div>
	}
}
