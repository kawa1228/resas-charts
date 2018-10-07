import React from 'react'
import axios from 'axios'
import { apiKey } from '../../myApiKey'
import Chart from './Chart.jsx'
import { Checkbox } from './Checkbox.jsx'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      prefectures: [],
      chartData: [],
      checkedPref: Array(47).fill(false)
    }
  }

  componentDidMount() {
    this.getPrefectures()
  }

  getPrefectures() {
    // 都道府県一覧取得
    axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures',
      { headers: { 'X-API-KEY': apiKey } })
      .then(res => {
        this.setState({
          prefectures: res.data.result
        })
      })
  }

  getPopulationData(index) {
    // 県の人口構成を取得
    return axios.get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${index}`,
      { headers: { 'X-API-KEY': apiKey } })
      .then(res => {
        return res.data
      })
  }

  handleClick(e) {
    // チェック判定
    let index = e.target.value

    this.state.checkedPref[index - 1] = !this.state.checkedPref[index - 1]
    this.setState({
      checkedPref: this.state.checkedPref
    })
    this.setChartData(index)
  }

  setChartData(prefId) {
    this.getPopulationData(prefId).then(res => {

      let index = prefId - 1
      let name = this.state.prefectures[index].prefName

      // チェックしたらstate.chartDataに詰める
      if (this.state.checkedPref[index]) {
        let obj = {}
        obj = {
          name: name,
          data: res.result.data[0].data
        }
        this.setState({ chartData: this.state.chartData.concat(obj) })
      } else {
        // チェックを外したらstate.chartDataから削除
        let obj = this.state.chartData

        for (let i = 0; i < obj.length; i++) {
          if (obj[i].name === name) {
            obj.splice(i, 1)
          }
        }
        this.setState({ chartData: obj })
      }
    })
  }

  renderItems() {
    return this.state.prefectures.map(val => {
      return (
        <label
          style={{ margin: '5px', display: 'inline-block' }}
        >
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

  render() {
    return (
      <div>
        <p>
          {this.renderItems()}
        </p>
        <Checkbox data={this.state} />
        <Chart data={this.state.chartData} />
      </div>
    )
  }
}

export default App