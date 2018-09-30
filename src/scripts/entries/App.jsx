import React from 'react'
import axios from 'axios'
import { apiKey } from '../../myApiKey'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      tasks: [],
      flag: false
    }
    this.getRegionalData(11)
  }
  componentWillMount() {
    axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures',
      { headers: { 'X-API-KEY': apiKey } })
      .then(res => console.log(res.data.result))
  }
  getRegionalData(index) {
    console.log('hello')
    axios.get(`https://opendata.resas-portal.go.jp/api/v1/population/sum/perYear?cityCode=-&prefCode=${index}`,
      { headers: { 'X-API-KEY': apiKey } })
      .then(res => console.log(res.data.result.line.data))
  }
  render() {
    return (
      < form >
      </form >
    )
  }
}

export default App