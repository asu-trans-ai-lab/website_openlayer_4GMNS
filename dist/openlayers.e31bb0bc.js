// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
// // import Circle from 'ol/geom/Circle';
// import Feature from 'ol/Feature';
// // import GeoJSON from 'ol/format/GeoJSON';
// import LineString from 'ol/geom/LineString';
// // import Map from 'ol/Map';
// // import View from 'ol/View';
// // import ol from 'ol';
// import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
// import {OSM, Vector as VectorSource} from 'ol/source';
// import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
// import {transform} from 'ol/proj';
// import { getVectorContext } from 'ol/render';
// // import * as turf from '@turf/turf';
// // import Point from 'ol/geom/Point';
// // import {toLonLat} from 'ol/proj';
// // import {toStringHDMS} from 'ol/coordinate';
// import {altKeyOnly, click, pointerMove} from 'ol/events/condition';
// import {
//   defaults as defaultInteractions,
//   Select
// } from "ol/interaction";
// // import Overlay from 'ol/Overlay';
var container = document.getElementById('popup');
var content_element = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
/**
 * Create an overlay to anchor the popup to the map.
 */

var overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  offset: [-20, 30]
});
var tileLayer = new ol.layer.Tile({
  preload: 4,
  source: new ol.source.OSM()
});
var tileLayerBiying = new ol.layer.Tile({
  // Bing Map图层
  source: new ol.source.BingMaps({
    key: 'Av4ovOw8t6AxyGYHajcc5mzcpBcJnySmdIOmwUBc3zHA7NKzpB6qsAx0zhWXvGUT',
    imagerySet: 'Aerial'
  }),
  visible: false // 先隐藏该图层

});
map.addOverlay(overlay);
map.addLayer(tileLayer);
map.addLayer(tileLayerBiying); // /**
//  * Add a click handler to hide the popup.
//  * @return {boolean} Don't follow the href.
//  */
// closer.onclick = function () {
//   overlay.setPosition(undefined);
//   closer.blur();
//   return false;
// };
// //修改选择功能的默认属性
// var selectPointerMove = new ol.interaction.Select({
//   condition: ol.events.condition.pointerMove,
// });
//总网络link的style

var styles = {
  'LineString': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      width: 2
    })
  })
};
var styles2 = {
  'LineString': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgba(200,200,20)',
      width: 2
    })
  })
}; // var styles3 = {
//   'LineString': new ol.style.Style({
//     stroke: new ol.style.Stroke({
//       color: 'rgba(20,200,200)',
//       width: 2,
//     }),
//   }),
// };

var styleFunction = function styleFunction(feature) {
  return styles[feature.getGeometry().getType()];
}; //总Link的数据


var link_data = window.link_geojson_data;

var styleFunction2 = function styleFunction2(feature) {
  return styles2[feature.getGeometry().getType()];
}; //总Link的数据


var link2_data = window.link2_geojson_data; // var styleFunction3 = function (feature) {
//   return styles3[feature.getGeometry().getType()];
// };
// //总Link的数据
// var link3_data = window.link3_geojson_data;
//转化geojson数据的坐标系

for (var i = 0; i < link_data.features.length; i++) {
  //开始转换
  for (var j = 0; j < link_data.features[i].geometry.coordinates.length; j++) {
    link_data.features[i].geometry.coordinates[j] = ol.proj.transform(link_data.features[i].geometry.coordinates[j], 'EPSG:4326', 'EPSG:3857');
  }
}

;

for (var i = 0; i < link2_data.features.length; i++) {
  //开始转换
  for (var j = 0; j < link2_data.features[i].geometry.coordinates.length; j++) {
    link2_data.features[i].geometry.coordinates[j] = ol.proj.transform(link2_data.features[i].geometry.coordinates[j], 'EPSG:4326', 'EPSG:3857');
  }
}

; // for(var i = 0;i < link3_data.features.length;i++){
//   //开始转换
//   for(var j=0;j<link3_data.features[i].geometry.coordinates.length;j++){
//     link3_data.features[i].geometry.coordinates[j] =ol.proj.transform(link3_data.features[i].geometry.coordinates[j],'EPSG:4326','EPSG:3857');
//   }
// };
// 总网络geo数据

var geojsonObject = link_data;
var geojsonObject2 = link2_data; // var geojsonObject3 = link3_data;
//加载道路geojson对象数据

var vectorSource = new ol.source.Vector({
  features: new ol.format.GeoJSON().readFeatures(geojsonObject)
});
var vectorSource2 = new ol.source.Vector({
  features: new ol.format.GeoJSON().readFeatures(geojsonObject2)
}); // var vectorSource3 = new ol.source.Vector({
//   features: new ol.format.GeoJSON().readFeatures(geojsonObject3),
// });

var link_Layer = new ol.layer.Vector({
  source: vectorSource,
  style: styleFunction,
  visible: false
});
var link_Layer2 = new ol.layer.Vector({
  source: vectorSource2,
  style: styleFunction2,
  visible: false
}); // var link_Layer3 = new ol.layer.Vector({
//   source: vectorSource3,
//   style: styleFunction3,
//   visible: true,
// });
//绑定多选框

var control2 = document.getElementById('controls2'); // 事件委托

control2.addEventListener('click', function (event) {
  if (event.target.checked) {
    // 如果选中某一复选框
    // 通过DOM元素的id值来判断应该对哪个图层进行显示
    switch (event.target.id) {
      case "Agent3":
        map.getLayers().item(6).setVisible(true);
        break;

      case "Agent4":
        map.getLayers().item(7).setVisible(true);
        break;

      case "Agent5":
        map.getLayers().item(8).setVisible(true);
        break;
    }
  } else {
    // 如果取消某一复选框
    // 通过DOM元素的id值来判断应该对哪个图层进行隐藏
    switch (event.target.id) {
      case "Agent3":
        map.getLayers().item(6).setVisible(false);
        break;

      case "Agent4":
        map.getLayers().item(7).setVisible(false);
        break;

      case "Agent5":
        map.getLayers().item(8).setVisible(false);
        break;
    }
  }
}); //绑定多选框

var control1 = document.getElementById('controls1'); // 事件委托

control1.addEventListener('click', function (event) {
  if (event.target.checked) {
    // 如果选中某一复选框
    // 通过DOM元素的id值来判断应该对哪个图层进行显示
    switch (event.target.id) {
      case "Agent1":
        map.getLayers().item(4).setVisible(true);
        break;

      case "Agent2":
        map.getLayers().item(5).setVisible(true);
        break;

      case "macronet":
        map.getLayers().item(2).setVisible(true);
        break;

      case "mesonet":
        map.getLayers().item(3).setVisible(true);
        break;
    }
  } else {
    // 如果取消某一复选框
    // 通过DOM元素的id值来判断应该对哪个图层进行隐藏
    switch (event.target.id) {
      case "Agent1":
        map.getLayers().item(4).setVisible(false);
        break;

      case "Agent2":
        map.getLayers().item(5).setVisible(false);
        break;

      case "macronet":
        map.getLayers().item(2).setVisible(false);
        break;

      case "mesonet":
        map.getLayers().item(3).setVisible(false);
        break;
    }
  }
}); // map.on('click', function (evt) {
//   var feature = map.forEachFeatureAtPixel(evt.pixel,function(feature, layer) 
//   {
//       return feature;
//     });
//   if (feature) {
//       var geometry = feature.getGeometry();
//       var coord = evt.coordinate
//       var contents = '<p>title_name1: content</p>'+'<br/>'+'<p>title_name2: content</p>'+'<br/>'+'<p>......</p>';    
//       content_element.innerHTML = contents;
//       overlay.setPosition(coord);
//   }
// });
// map.on('pointermove', function(e) {
//   if (e.dragging) return;
//   var pixel = map.getEventPixel(e.originalEvent);
//   var hit = map.hasFeatureAtPixel(pixel);
//   map.getTargetElement().style.cursor = hit ? 'pointer' : '';
// });
//动态路径1的样式

var style_1 = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'rgba(27,75,153)',
    width: 4
  })
}); //动态路径2的样式

var style_2 = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'rgba(210,46,41)',
    width: 4
  })
}); //动态路径3的样式

var style_3 = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'rgba(210,46,41)',
    width: 4
  })
}); //动态路径4的样式

var style_4 = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'rgba(27,75,153)',
    width: 4
  })
}); //动态路径5的样式

var style_5 = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'rgba(154,192,67)',
    width: 4
  })
}); //用来存储所有的feature的坐标

var sourceString_1 = []; //动态路径1的source

var flightsSource = new ol.source.Vector({
  wrapX: false,
  loader: function loader() {
    var flightsData = window.flights1;

    for (var i = 0; i < flightsData.length; i++) {
      var flight = flightsData[i];
      var from = flight[0];
      var to = flight[1]; // create an arc circle between the two locations

      var arcGenerator = new arc.GreatCircle({
        x: from[0],
        y: from[1]
      }, {
        x: to[0],
        y: to[1]
      });
      var arcLine = arcGenerator.Arc(100, {
        offset: 0
      });
      sourceString_1 = sourceString_1.concat(arcLine.geometries[0].coords);
    } // var line = new LineString(arcLine.geometries[0].coords);


    var line = new ol.geom.LineString(sourceString_1);
    line.transform('EPSG:4326', 'EPSG:3857');
    var feature = new ol.Feature({
      geometry: line,
      finished: false
    }); // add the feature with a delay so that the animation
    // for all features does not start at the same time

    addLater(feature, 0);
    tileLayer.on('postrender', animateFlights);
  }
}); //用来存储所有的feature的坐标

var sourceString_2 = []; //动态路径1的source

var flightsSource_2 = new ol.source.Vector({
  wrapX: false,
  loader: function loader() {
    var flightsData = window.flights_2;

    for (var i = 0; i < flightsData.length; i++) {
      var flight = flightsData[i];
      var from = flight[0];
      var to = flight[1]; // create an arc circle between the two locations

      var arcGenerator = new arc.GreatCircle({
        x: from[0],
        y: from[1]
      }, {
        x: to[0],
        y: to[1]
      });
      var arcLine = arcGenerator.Arc(100, {
        offset: 0
      });
      sourceString_2 = sourceString_2.concat(arcLine.geometries[0].coords);
    } // var line = new LineString(arcLine.geometries[0].coords);


    var line = new ol.geom.LineString(sourceString_2);
    line.transform('EPSG:4326', 'EPSG:3857');
    var feature = new ol.Feature({
      geometry: line,
      finished: false
    }); // add the feature with a delay so that the animation
    // for all features does not start at the same time

    addLater_2(feature, 0);
    tileLayer.on('postrender', animateFlights_2);
  }
}); //用来存储所有的feature的坐标

var sourceString_3 = []; //动态路径3的source

var flightsSource_3 = new ol.source.Vector({
  wrapX: false,
  loader: function loader() {
    var flightsData = window.flights_3;

    for (var i = 0; i < flightsData.length; i++) {
      var flight = flightsData[i];
      var from = flight[0];
      var to = flight[1]; // create an arc circle between the two locations

      var arcGenerator = new arc.GreatCircle({
        x: from[0],
        y: from[1]
      }, {
        x: to[0],
        y: to[1]
      });
      var arcLine = arcGenerator.Arc(100, {
        offset: 0
      });
      sourceString_3 = sourceString_3.concat(arcLine.geometries[0].coords);
    } // var line = new LineString(arcLine.geometries[0].coords);


    var line = new ol.geom.LineString(sourceString_3);
    line.transform('EPSG:4326', 'EPSG:3857');
    var feature = new ol.Feature({
      geometry: line,
      finished: false
    }); // add the feature with a delay so that the animation
    // for all features does not start at the same time

    addLater_3(feature, 0);
    tileLayer.on('postrender', animateFlights_3);
  }
}); //用来存储所有的feature的坐标

var sourceString_4 = []; //动态路径3的source

var flightsSource_4 = new ol.source.Vector({
  wrapX: false,
  loader: function loader() {
    var flightsData = window.flights_4;

    for (var i = 0; i < flightsData.length; i++) {
      var flight = flightsData[i];
      var from = flight[0];
      var to = flight[1]; // create an arc circle between the two locations

      var arcGenerator = new arc.GreatCircle({
        x: from[0],
        y: from[1]
      }, {
        x: to[0],
        y: to[1]
      });
      var arcLine = arcGenerator.Arc(100, {
        offset: 0
      });
      sourceString_4 = sourceString_4.concat(arcLine.geometries[0].coords);
    } // var line = new LineString(arcLine.geometries[0].coords);


    var line = new ol.geom.LineString(sourceString_4);
    line.transform('EPSG:4326', 'EPSG:3857');
    var feature = new ol.Feature({
      geometry: line,
      finished: false
    }); // add the feature with a delay so that the animation
    // for all features does not start at the same time

    addLater_4(feature, 0);
    tileLayer.on('postrender', animateFlights_4);
  }
}); //用来存储所有的feature的坐标

var sourceString_5 = []; //动态路径3的source

var flightsSource_5 = new ol.source.Vector({
  wrapX: false,
  loader: function loader() {
    var flightsData = window.flights_5;

    for (var i = 0; i < flightsData.length; i++) {
      var flight = flightsData[i];
      var from = flight[0];
      var to = flight[1]; // create an arc circle between the two locations

      var arcGenerator = new arc.GreatCircle({
        x: from[0],
        y: from[1]
      }, {
        x: to[0],
        y: to[1]
      });
      var arcLine = arcGenerator.Arc(100, {
        offset: 0
      });
      sourceString_5 = sourceString_5.concat(arcLine.geometries[0].coords);
    } // var line = new LineString(arcLine.geometries[0].coords);


    var line = new ol.geom.LineString(sourceString_5);
    line.transform('EPSG:4326', 'EPSG:3857');
    var feature = new ol.Feature({
      geometry: line,
      finished: false
    }); // add the feature with a delay so that the animation
    // for all features does not start at the same time

    addLater_5(feature, 0);
    tileLayer.on('postrender', animateFlights_5);
  }
});
var flightsLayer_1 = new ol.layer.Vector({
  source: flightsSource,
  style: function style(feature) {
    // if the animation is still active for a feature, do not
    // render the feature with the layer style
    if (feature.get('finished')) {
      return style_1;
    } else {
      return null;
    }
  }
});
var flightsLayer_2 = new ol.layer.Vector({
  source: flightsSource_2,
  style: function style(feature) {
    // if the animation is still active for a feature, do not
    // render the feature with the layer style
    if (feature.get('finished')) {
      return style_2;
    } else {
      return null;
    }
  }
});
var flightsLayer_3 = new ol.layer.Vector({
  source: flightsSource_3,
  style: function style(feature) {
    // if the animation is still active for a feature, do not
    // render the feature with the layer style
    if (feature.get('finished')) {
      return style_3;
    } else {
      return null;
    }
  }
});
var flightsLayer_4 = new ol.layer.Vector({
  source: flightsSource_4,
  style: function style(feature) {
    // if the animation is still active for a feature, do not
    // render the feature with the layer style
    if (feature.get('finished')) {
      return style_4;
    } else {
      return null;
    }
  }
});
var flightsLayer_5 = new ol.layer.Vector({
  source: flightsSource_5,
  style: function style(feature) {
    // if the animation is still active for a feature, do not
    // render the feature with the layer style
    if (feature.get('finished')) {
      return style_5;
    } else {
      return null;
    }
  }
});
map.addLayer(link_Layer);
map.addLayer(link_Layer2); // map.addLayer(link_Layer3);

map.addLayer(flightsLayer_1);
map.addLayer(flightsLayer_2);
map.addLayer(flightsLayer_3);
map.addLayer(flightsLayer_4);
map.addLayer(flightsLayer_5);
var pointsPerMs = 0.2;

function animateFlights(event) {
  var vectorContext = ol.render.getVectorContext(event);
  var frameState = event.frameState;
  vectorContext.setStyle(style_1);
  var features = flightsSource.getFeatures();

  for (var i = 0; i < features.length; i++) {
    var feature = features[i];

    if (!feature.get('finished')) {
      // only draw the lines for which the animation has not finished yet
      var coords = feature.getGeometry().getCoordinates();
      var elapsedTime = frameState.time - feature.get('start');
      var elapsedPoints = elapsedTime * pointsPerMs;

      if (elapsedPoints >= coords.length) {
        feature.set('finished', true);
      }

      var maxIndex = Math.min(elapsedPoints, coords.length);
      var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex)); // directly draw the line with the vector context

      vectorContext.drawGeometry(currentLine);
    }
  } // tell OpenLayers to continue the animation


  map.render();
}

function animateFlights_2(event) {
  var vectorContext = ol.render.getVectorContext(event);
  var frameState = event.frameState;
  vectorContext.setStyle(style_2);
  var features = flightsSource_2.getFeatures();

  for (var i = 0; i < features.length; i++) {
    var feature = features[i];

    if (!feature.get('finished')) {
      // only draw the lines for which the animation has not finished yet
      var coords = feature.getGeometry().getCoordinates();
      var elapsedTime = frameState.time - feature.get('start');
      var elapsedPoints = elapsedTime * pointsPerMs;

      if (elapsedPoints >= coords.length) {
        feature.set('finished', true);
      }

      var maxIndex = Math.min(elapsedPoints, coords.length);
      var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex)); // directly draw the line with the vector context

      vectorContext.drawGeometry(currentLine);
    }
  } // tell OpenLayers to continue the animation


  map.render();
}

function animateFlights_3(event) {
  var vectorContext = ol.render.getVectorContext(event);
  var frameState = event.frameState;
  vectorContext.setStyle(style_3);
  var features = flightsSource_3.getFeatures();

  for (var i = 0; i < features.length; i++) {
    var feature = features[i];

    if (!feature.get('finished')) {
      // only draw the lines for which the animation has not finished yet
      var coords = feature.getGeometry().getCoordinates();
      var elapsedTime = frameState.time - feature.get('start');
      var elapsedPoints = elapsedTime * pointsPerMs;

      if (elapsedPoints >= coords.length) {
        feature.set('finished', true);
      }

      var maxIndex = Math.min(elapsedPoints, coords.length);
      var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex)); // directly draw the line with the vector context

      vectorContext.drawGeometry(currentLine);
    }
  } // tell OpenLayers to continue the animation


  map.render();
}

function animateFlights_4(event) {
  var vectorContext = ol.render.getVectorContext(event);
  var frameState = event.frameState;
  vectorContext.setStyle(style_4);
  var features = flightsSource_4.getFeatures();

  for (var i = 0; i < features.length; i++) {
    var feature = features[i];

    if (!feature.get('finished')) {
      // only draw the lines for which the animation has not finished yet
      var coords = feature.getGeometry().getCoordinates();
      var elapsedTime = frameState.time - feature.get('start');
      var elapsedPoints = elapsedTime * pointsPerMs;

      if (elapsedPoints >= coords.length) {
        feature.set('finished', true);
      }

      var maxIndex = Math.min(elapsedPoints, coords.length);
      var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex)); // directly draw the line with the vector context

      vectorContext.drawGeometry(currentLine);
    }
  } // tell OpenLayers to continue the animation


  map.render();
}

function animateFlights_5(event) {
  var vectorContext = ol.render.getVectorContext(event);
  var frameState = event.frameState;
  vectorContext.setStyle(style_5);
  var features = flightsSource_5.getFeatures();

  for (var i = 0; i < features.length; i++) {
    var feature = features[i];

    if (!feature.get('finished')) {
      // only draw the lines for which the animation has not finished yet
      var coords = feature.getGeometry().getCoordinates();
      var elapsedTime = frameState.time - feature.get('start');
      var elapsedPoints = elapsedTime * pointsPerMs;

      if (elapsedPoints >= coords.length) {
        feature.set('finished', true);
      }

      var maxIndex = Math.min(elapsedPoints, coords.length);
      var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex)); // directly draw the line with the vector context

      vectorContext.drawGeometry(currentLine);
    }
  } // tell OpenLayers to continue the animation


  map.render();
}

function addLater(feature, timeout) {
  window.setTimeout(function () {
    feature.set('start', new Date().getTime());
    flightsSource.addFeature(feature);
  }, timeout);
}

function addLater_2(feature, timeout) {
  window.setTimeout(function () {
    feature.set('start', new Date().getTime());
    flightsSource_2.addFeature(feature);
  }, timeout);
}

function addLater_3(feature, timeout) {
  window.setTimeout(function () {
    feature.set('start', new Date().getTime());
    flightsSource_3.addFeature(feature);
  }, timeout);
}

function addLater_4(feature, timeout) {
  window.setTimeout(function () {
    feature.set('start', new Date().getTime());
    flightsSource_4.addFeature(feature);
  }, timeout);
}

function addLater_5(feature, timeout) {
  window.setTimeout(function () {
    feature.set('start', new Date().getTime());
    flightsSource_5.addFeature(feature);
  }, timeout);
}

console.log(window.map.layers);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55128" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/openlayers.e31bb0bc.js.map