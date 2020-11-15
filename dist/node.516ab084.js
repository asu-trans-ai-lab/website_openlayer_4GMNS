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
})({"node.js":[function(require,module,exports) {
// import GeoJSON from 'ol/format/GeoJSON';
// import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
// import {Vector as VectorSource} from 'ol/source';
// import {Vector as VectorLayer} from 'ol/layer';
// import {transform} from 'ol/proj';
// import Point from 'ol/geom/Point';
//点的样式
var image = new ol.style.Circle({
  radius: 3,
  fill: new ol.style.Fill({
    color: 'black'
  }),
  stroke: new ol.style.Stroke({
    color: 'red',
    width: 1
  })
});
var styles1_node = {
  'Point': new ol.style.Style({
    image: image
  })
};

var style_nodeFunction1 = function style_nodeFunction1(feature) {
  return styles1_node[feature.getGeometry().getType()];
}; //转化node坐标


for (var k = 0; k < node_data.features.length; k++) {
  //开始转换
  node_data.features[k].geometry.coordinates = ol.proj.transform(node_data.features[k].geometry.coordinates, 'EPSG:4326', 'EPSG:3857');
}

; //node节点geo数据

var geojsonObject2 = node_data; //加载node1的geojson对象数据

var nodeSource = new ol.source.Vector({
  features: new ol.format.GeoJSON().readFeatures(geojsonObject2),
  attributions: '</br>' + 'Link and node data by ' + '<a href="https://github.com/xzhou99">Xuesong Zhou</a>,'
});
var node_Layer = new ol.layer.Vector({
  source: nodeSource,
  style: style_nodeFunction1,
  visible: true
});
map.addLayer(node_Layer); // var node_add = [
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49232" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","node.js"], null)
//# sourceMappingURL=/node.516ab084.js.map