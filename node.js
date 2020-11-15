// import GeoJSON from 'ol/format/GeoJSON';
// import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
// import {Vector as VectorSource} from 'ol/source';
// import {Vector as VectorLayer} from 'ol/layer';
// import {transform} from 'ol/proj';
// import Point from 'ol/geom/Point';




//点的样式
var image = new ol.style.Circle({
  radius: 3,
  fill: new ol.style.Fill({color: 'black'}),
  stroke: new ol.style.Stroke({color: 'red', width: 1}),
});

var styles1_node = {
  'Point': new ol.style.Style({
    image: image,
  }),
};
var style_nodeFunction1 = function (feature) {
  return styles1_node[feature.getGeometry().getType()];
};


//转化node坐标
for(var k = 0;k < node_data.features.length;k++){
  //开始转换
  node_data.features[k].geometry.coordinates = ol.proj.transform(node_data.features[k].geometry.coordinates,'EPSG:4326','EPSG:3857');
};

//node节点geo数据
var geojsonObject2 = node_data;



//加载node1的geojson对象数据
var nodeSource = new ol.source.Vector({
  features: new ol.format.GeoJSON().readFeatures(geojsonObject2),
  attributions:
  '</br>'+'Link and node data by ' +
  '<a href="https://github.com/xzhou99">Xuesong Zhou</a>,'
});



var node_Layer = new ol.layer.Vector({
  source: nodeSource,
  style: style_nodeFunction1,
  visible: true,
});

map.addLayer(node_Layer);
// var node_add = [
//  [-76.898200,39.006061], 
//  [-76.897580,39.004451], 
//  [-76.897400,39.001851], 
//  [-76.905587,39.012843], 
//  [-76.899271,39.007351], 
//  [-76.899041,39.007081], 
//  [-76.898251,39.006171], 
//  [-76.896891,39.004611], 
//  [-76.895545,39.003098], 
//  [-76.895521,39.002871], 
//  [-76.896498,39.001555], 
//  [-76.896769,39.001189], 
//  [-76.896916,39.000985], 
//  [-76.897831,38.999679], 
//  [-76.898119,38.999251], 
//  [-76.898229,38.999111], 
//  [-76.898339,38.998961], 
//  [-76.899789,38.997021], 
//  [-76.901129,38.995211], 
//  [-76.902731,38.993389], 
//  [-76.903209,38.992931], 
//  [-76.904509,38.991751], 
//  [-76.904639,38.991621], 
//  [-76.905069,38.991221], 
//  [-76.905846,38.990497], 
//  [-76.906050,38.990325], 
//  [-76.906069,38.990311], 
//  [-76.907519,38.988611], 
//  [-76.909860,38.983111], 
//  [-76.912710,38.977871], 
//  [-76.913770,38.975011], 
//  [-76.914340,38.973971], 
//  [-76.915200,38.972521], 
//  [-76.915311,38.972338], 
//  [-76.915374,38.972232], 
//  [-76.915426,38.972128], 
//  [-76.915487,38.972022], 
//  [-76.915640,38.971761], 
//  [-76.916821,38.969818], 
//  [-76.916941,38.969603], 
//  [-76.917180,38.969151], 
//  [-76.917219,38.969091], 
//  [-76.917903,38.967925], 
//  [-76.915496,38.972286], 
//  [-76.915589,38.972320], 
//  [-76.916309,38.972630], 
//  [-76.918704,38.974562], 
//  [-76.918700,38.974565], 
//  [-76.915530,38.972195], 
// ];
// var node_string;
// for(var i=0;i<node_add.length;i++){
//   node_string = node_string + "{'type': 'Feature','geometry':{'type': 'Point','coordinates':["+node_add[i]+"]},},"
// };
// console.log(node_string);

