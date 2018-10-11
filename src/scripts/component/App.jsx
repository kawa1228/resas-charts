import React from "react";
import axios from "axios";
import { Checkbox } from "./Checkbox.jsx";
import { CreateChart } from "./Chart.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      prefectures: [],
      chartData: [],
      checkedPref: Array(47).fill(false)
    };
  }

  componentDidMount() {
    this.getPrefectures();
  }

  getPrefectures() {
    // 都道府県一覧取得
    axios.get("http://localhost:8000/prefectures.php?").then(res => {
      this.setState({
        prefectures: res.data.result
      });
    });
  }

  getPopulationData(index) {
    // 県の人口構成を取得
    return axios
      .get(`http://localhost:8000/populationComposition.php?prefId=${index}`)
      .then(res => {
        return res.data;
      });
  }

  clickCheckbox(e) {
    // チェック判定
    let index = e.target.value;
    let flag = this.state.checkedPref;

    flag[index - 1] = !flag[index - 1];
    this.setState({
      checkedPref: flag
    });
    this.setChartData(index);
  }

  setChartData(prefId) {
    this.getPopulationData(prefId).then(res => {
      let index = prefId - 1;
      let name = this.state.prefectures[index].prefName;

      // チェックしたらstate.chartDataに詰める
      if (this.state.checkedPref[index]) {
        let obj = {};
        obj = {
          name: name,
          data: res.result.data[0].data
        };
        this.setState({ chartData: this.state.chartData.concat(obj) });
      } else {
        // チェックを外したらstate.chartDataから削除
        let obj = this.state.chartData;

        for (let i = 0; i < obj.length; i++) {
          if (obj[i].name === name) {
            obj.splice(i, 1);
          }
        }
        this.setState({ chartData: obj });
      }
    });
  }

  render() {
    return (
      <div>
        <p>
          <Checkbox
            data={this.state.prefectures}
            handleClick={e => this.clickCheckbox(e)}
          />
        </p>
        <CreateChart data={this.state.chartData} />
      </div>
    );
  }
}

export default App;
