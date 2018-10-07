import React from 'react'
import axios from 'axios'
import { apiKey } from '../../myApiKey'
import Chart from './Chart.jsx'
import * as Checkbox from './Checkbox.jsx'

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

  clickCheckbox(e) {
    // チェック判定
    let index = e.target.value
    let flag = this.state.checkedPref

    flag[index - 1] = !flag[index - 1]
    this.setState({
      checkedPref: flag
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

  render() {
    return (
      <div>
        <Checkbox.box
          data={this.state.prefectures}
          handleClick={(e) => this.clickCheckbox(e)}
        />
        < Chart data={this.state.chartData} />
      </div>
    )
  }
}

export default App