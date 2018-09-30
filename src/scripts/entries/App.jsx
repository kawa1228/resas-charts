import React from 'react'
import axios from 'axios'
import { apiKey } from '../../myApiKey'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      prefectures: [],
      tasks: [],
      flag: false
    }
    this.getRegionalData(11)
  }
  componentWillMount() {
    axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures',
      { headers: { 'X-API-KEY': apiKey } })
      .then(res => {
        this.setState({
          prefectures: res.data.result
        })
      })
  }
  getRegionalData(index) {
    axios.get(`https://opendata.resas-portal.go.jp/api/v1/population/sum/perYear?cityCode=-&prefCode=${index}`,
      { headers: { 'X-API-KEY': apiKey } })
      .then(res =>
        console.log(`データ：${res.data.result.line.data}`)
      )
  }
  renderItems() {
    return this.state.prefectures.map(val => {
      return (
        <div>
          <input type="checkbox" />
          {val.prefName}
        </div>
      )
    })
  }
  introduceChart() {
    const options = {
      title: {
        text: 'My chart'
      },
      series: [{
        data: [1, 2, 3]
      }]
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
    return (
      <div>
        <p>
          {this.renderItems()}
        </p>
        {this.introduceChart()}
      </div>
    )
  }
}

export default App