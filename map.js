// import Map from 'ol/Map';
// import View from 'ol/View';
// import {pointerMove} from 'ol/events/condition';
// import {
//   defaults as defaultInteractions,
//   Select
// } from "ol/interaction";
// import {FullScreen} from 'ol/control';
// // import {fromLonLat} from 'ol/proj';
// // import {easeIn, easeOut} from 'ol/easing';




//修改选择功能的默认属性
var selectPointerMove = new ol.interaction.Select({
  condition: ol.events.condition.pointerMove,
});
var location1 = [-12460000.10578194, 3951000.0];

window.map = new ol.Map({
  layers: [],
  target: document.getElementById('map'),
  view: new ol.View({
    center: location1,
    zoom: 14,
  }),
  interactions: ol.interaction.defaults().extend([
    selectPointerMove
])
});


// let controls = document.getElementById('ControlLayers');     
//         // 事件委托
//         controls.addEventListener('onselect', (event) => {
//             if(event.target.checked){                       
//                 switch(event.target.id){
//                     case "osm": 
//                         map.getLayers().item(0).setVisible(true);
//                         break;
//                     case "bingmap":
//                         map.getLayers().item(1).setVisible(true);
//                         break;
//                     default: break;
//                 }
//             }else{                                         
//                 // 通过DOM元素的id值来判断应该对哪个图层进行隐藏
//                 switch(event.target.id){
//                   case "osm": 
//                       map.getLayers().item(0).setVisible(false);
//                       break;
//                   case "bingmap":
//                       map.getLayers().item(1).setVisible(false);
//                   default: break;
//               }
//           } 
//       });


//全屏控件
var fullscreen = new ol.control.FullScreen();
map.addControl(fullscreen);
function onClick(id, callback) {
  document.getElementById(id).addEventListener('click', callback);
};


onClick('pan-to-washington', function () {
  map.getView().animate(
    {center: [-10770463.155277295, 5397724.615835932]},
    {zoom: 12},
  );
});
onClick('pan-to-phoenix', function () {
  map.getView().animate(
    {center: [-12460000.10578194, 3951000.0]},
    {zoom: 14},
  );
});






 

