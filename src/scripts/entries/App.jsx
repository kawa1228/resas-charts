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
      select: [],
      flag: Array(47).fill(false)
    }
  }
  componentDidMount() {
    axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures',
      { headers: { 'X-API-KEY': apiKey } })
      .then(res => {
        this.setState({
          prefectures: res.data.result
        })
      })
  }
  getRegionalData(index) {
    return axios.get(`https://opendata.resas-portal.go.jp/api/v1/population/sum/perYear?cityCode=-&prefCode=${index}`,
      { headers: { 'X-API-KEY': apiKey } })
      .then(res => {
        return res.data
      })
  }
  handleClick(e) {
    let index = e.target.value

    this.state.flag[index - 1] = !this.state.flag[index - 1]
    this.setState({
      flag: this.state.flag
    })
    this.setSelect(index)
  }
  renderItems() {
    return this.state.prefectures.map(val => {
      return (
        <label>
          <input
            type="checkbox"
            value={val.prefCode}
            onClick={(e) => this.handleClick(e)}
          />
          {val.prefName}
        </label>
      )
    })
  }
  introduceChart() {
    const options = {
      title: {
        text: '都道府県別人口構成'
      },
      series: [{
        data: this.state.select,
        pointStart: 1965,
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
  setSelect(num) {
    this.getRegionalData(num).then(res => {

      let obj = {}
      obj = {
        id: num,
        name: this.state.prefectures[num - 1].prefName,
        data: res.result.line.data
      }
      this.setState({
        select: this.state.select.concat(obj)
      })
    })
  }
  render() {
    console.log(this.state)
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