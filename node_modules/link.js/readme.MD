# link.js
[![Build Status](http://img.shields.io/travis/s-a/link.js.svg?style=flat-square)](https://travis-ci.org/s-a/link.js)
[![NPM Version](http://img.shields.io/npm/v/link.js.svg?style=flat-square)](https://www.npmjs.org/package/link.js)
[![Bower](http://img.shields.io/bower/v/link.js.svg?style=flat-square)](http://bower.io/search/?q=link.js)
[![Coverage Status](http://img.shields.io/coveralls/s-a/link.js.svg?style=flat-square)](https://coveralls.io/r/s-a/link.js?branch=master)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://s-a.mit-license.org/)


# about

link.js aims to quick share settings over pages via URL GET parms.

``` javascript
	var lnk = new window.LNK({settingsGetParmName: "aaa"});
	var setup = lnk.fetchSettings();
	var newSetup = {
		"hello" : "world"
	};

	console.log(setup || "no setup given.");
	document.getElementById("test").href = lnk.href(newSetup);
```

# install

```npm install link.js```  
```bower install link.js```