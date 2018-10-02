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
      population: [],
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
        let populations = []
        res.data.result.line.data.map(val => {
          populations.push(val.value)
        })
        return populations
        // this.setState({
        //   population: populations
        // })
      })
  }
  handleClick(e) {
    let index = this.state.prefectures[e.target.value - 1].prefCode

    this.state.flag[index - 1] = !this.state.flag[index - 1]
    this.setState({
      flag: this.state.flag
    })
    this.selectSeries()
  }
  selectSeries() {
    let obj = {}
    for (let i = 0; i < this.state.flag.length; i++) {
      if (this.state.flag[i]) {
        obj = {
          id: i + 1,
          name: this.state.prefectures[i].prefName
        }
      }
    }
    this.getRegionalData(obj.id).then((res) => {
      console.log(res)
      console.log(obj)
      obj.data = res
    })
    console.log(obj)
    // this.setState({
    //   select: obj
    // })
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
        data: this.state.population,
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