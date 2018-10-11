# resas-charts

## 都道府県別人口構成グラフ

```
・ script/entries/index.js
  App.jsx をレンダー

・ script/component/App.jsx
  Checkbox.jsx、Chart.jsx をまとめる・Stateの保持

・ script/component/Checkbox.jsx
  都道府県一覧のチェックボックスを生成

・ script/component/Chart.jsx
  Highcharts を用い、人口数の折れ線グラフを生成

・ server/populationComposition.php
  RESAS API から都道府県一覧取得

・ server/prefectures.php
  RESAS API から県の人口構成を取得
```

## Dependency

React：v16.5.2

RESAS API：https://opendata.resas・portal.go.jp/

highcharts・react：https://github.com/highcharts/highcharts・react

## Setup

```
$ yarn install
$ yarn run dev
```
