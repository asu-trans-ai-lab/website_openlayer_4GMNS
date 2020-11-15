(function() {

	var urlParms = function() {
		var params = {};

		if (location.search) {
			var parts = location.search.substring(1).split('&');

			for (var i = 0; i < parts.length; i++) {
				var nv = parts[i].split('=');
				if (!nv[0]) { continue; }
				params[nv[0]] = nv[1] || true;
			}
		}

		return params;
	};

	var LNK = function(config) {
		if (config === undefined){
			config = {};
		}
		this.settingsGetParmName = config.settingsGetParmName || "q";
		this.raw = urlParms();

		return this;
	};

	LNK.prototype.get = function(parmName) {
		return decodeURIComponent(urlParms()[parmName]);
	};


	LNK.prototype.href = function(newSetup) {
		return "?" + this.settingsGetParmName + "=" + this.encrypt(newSetup);
	};

	LNK.prototype.fetchSettings = function() {
		var parms = urlParms();
		var result = null;
		if (parms[this.settingsGetParmName]){
			result = parms[this.settingsGetParmName];
		}
		return this.decrypt(result);
	};

	LNK.prototype.encrypt = function(data) {
		var res = encodeURIComponent(JSON.stringify(data));
		if (res.length>1900){
			throw new Error ("Cannot create a valid share link because data is too large and exceeds the maximum length of 2000 characters.");
		}
		return res;
	};

	LNK.prototype.decrypt = function(data) {
		var res = JSON.parse(decodeURIComponent(data));
		return res;
	}; 


	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose lnk as module.exports in loaders that implement the Node
		// module pattern (including browserify). Do not create the global, since
		// the user will be storing it themselves locally, and globals are frowned
		// upon in the Node module world.
		module.exports = LNK;
	} else {
		// Otherwise expose lnk to the global object as usual
		window.LNK = LNK;

		// Register as a named AMD module, since lnk can be concatenated with other
		// files that may use define, but not via a proper concatenation script that
		// understands anonymous AMD modules. A named AMD is safest and most robust
		// way to register. Lowercase "lnk" is used because AMD module names are
		// derived from file names, and lnk is normally delivered in a lowercase
		// file name. Do this after creating the global so that if an AMD module wants
		// to call noConflict to hide this version of lnk, it will work.
		if ( typeof define === "function" && define.amd ) {
			define( "LNK", [], function () { return LNK; } );
		}
	}

})();