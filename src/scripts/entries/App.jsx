import React from 'react'
import axios from 'axios'
import { apiKey } from '../../myApiKey'
import Chart from './Chart.jsx'

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

    this.state.flag[index - 1] = !this.state.flag[index - 1]
    this.setState({
      flag: this.state.flag
    })
    this.setSelect(index)
  }
  setSelect(num) {
    this.getPopulationData(num).then(res => {

      let value = []
      res.result.data[0].data.map(val => {
        value.push(val.value)
      })

      let index = num - 1
      let name = this.state.prefectures[index].prefName

      // チェックしたらstate.selectに詰める
      if (this.state.flag[index]) {
        let obj = {}
        obj = {
          name: name,
          data: value
        }
        this.setState({ select: this.state.select.concat(obj) })
      } else {
        // チェックを外したらstate.selectから削除
        let obj = this.state.select

        for (let i = 0; i < obj.length; i++) {
          if (obj[i].name === name) {
            obj.splice(i, 1)
          }
        }
        this.setState({ select: obj })
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
        <Chart data={this.state.select} />
      </div>
    )
  }
}

export default App