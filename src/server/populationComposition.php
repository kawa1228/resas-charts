<?php
header('Access-Control-Allow-Origin: *');

$url = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode='.$_GET['prefId'];
require 'apikey.php';

$opts = array(
  'http'=>array(
    'method'=>"GET",
    'header'=>'X-API-KEY:'.$apikey
  )
);

$context = stream_context_create($opts);

$res = file_get_contents($url, false, $context);

echo $res;
