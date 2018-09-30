import React from 'react'
import axios from 'axios'
import { apiKey } from '../../myApiKey'
// import heighcharts from 'highcharts-react'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      prefectures: {},
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
        console.log(res.data.result.line.data)
      )
  }
  render() {
    console.log(this.state.prefectures[0])
    return (
      <div>
        <input
          type="checkbox"
        />
        {/* {this.state.prefecture[0].prefName} */}
      </div>
    )
  }
}

export default App