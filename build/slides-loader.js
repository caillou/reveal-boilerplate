/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/
/******/ 	};
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 			function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 				hotAddUpdateChunk(chunkId, moreModules);
/******/ 				if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 			}
/******/ 	
/******/ 			function hotDownloadUpdateChunk(chunkId) {
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				script.type = 'text/javascript';
/******/ 				script.charset = 'utf-8';
/******/ 				script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 	
/******/ 			function hotDownloadManifest(callback) {
/******/ 				if(typeof XMLHttpRequest === "undefined")
/******/ 					return callback(new Error("No browser support"));
/******/ 				try {
/******/ 					var request = new XMLHttpRequest();
/******/ 					request.open("GET", __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json", true);
/******/ 					request.send(null);
/******/ 				} catch(err) {
/******/ 					return callback(err);
/******/ 				}
/******/ 				request.onreadystatechange = function() {
/******/ 					if(request.readyState !== 4) return;
/******/ 					if(request.status !== 200 && request.status !== 304) {
/******/ 						callback();
/******/ 					} else {
/******/ 						try {
/******/ 							var update = JSON.parse(request.responseText);
/******/ 						} catch(e) {
/******/ 							callback();
/******/ 							return;
/******/ 						}
/******/ 						callback(null, update);
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "0ab42daf818ef2e36b87";
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = [];
/******/ 	
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				fn[name] = __webpack_require__[name];
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 				else for(var i = 0; i < dep.length; i++)
/******/ 					hot._acceptedDependencies[dep[i]] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else for(var i = 0; i < dep.length; i++)
/******/ 					hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		var oldStatus = hotStatus;
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) { if(err) throw err };
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks) {
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(+id);
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) { if(err) throw err };
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) { if(err) throw err };
/******/ 		}
/******/ 		
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = [];
/******/ 			
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 			
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = +id;
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j]
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 					if(child.parents.length === 0 && child.hot && child.hot._disposeHandlers && child.hot._disposeHandlers.length > 0) {
/******/ 						// Child has dispose handlers and no more references, dispose it too
/******/ 						queue.push(child.id);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".slides-loader.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(16);
	__webpack_require__(18);
	__webpack_require__(20);

	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);

	__webpack_require__(4);

	window.Reveal.initialize({
	    controls: true,
	    progress: true,
	    history: true,
	    center: false,
	    theme: window.Reveal.getQueryHash().theme, // available themes are in /css/theme
	    transition: 'linear' // default/cube/page/concave/zoom/linear/fade/none
	});

	__webpack_require__.e/*nsure*/(1, function() {
	    __webpack_require__(8);
	    window.hljs.initHighlightingOnLoad();
	    __webpack_require__(9);
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	if(true) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_require__.h()) >= 0;
		};
		var check = function check() {
			module.hot.check(true, function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {abort:1,fail:1}) {
						console.warn("[HMR] Cannot apply update. Need to do a full reload!");
						window.location.reload();
					} else {
						console.warn("[HMR] Update failed: " + err);
					}
					return;
				}

				if(!updatedModules)
					return console.log("[HMR] No Update found.");

				if(!upToDate()) {
					check();
				}

				if(!updatedModules || updatedModules.length === 0) {
					console.log("[HMR] Update is empty.");
				} else {
					console.log("[HMR] Updated modules:");
					updatedModules.forEach(function(moduleId) {
						console.log("[HMR]  - " + moduleId);
					});
				}
				if(upToDate()) {
					console.log("[HMR] App is up to date.");
				}

			});
		};
		var addEventListener = window.addEventListener || function (eventName, listener) {
			return attachEvent('on' + eventName, listener);
		};
		addEventListener("message", function(event) {
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled");
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {var io = __webpack_require__(23);
	var scriptElements = document.getElementsByTagName("script");
	io = io.connect(true ?
		__resourceQuery.substr(1) :
		scriptElements[scriptElements.length-1].getAttribute("src").replace(/\/[^\/]+$/, "")
	);

	var hot = false;
	var initial = true;
	var currentHash = "";

	io.on("hot", function() {
		hot = true;
		console.log("[WDS] Hot Module Replacement enabled.");
	});

	io.on("invalid", function() {
		console.log("[WDS] App updated. Recompiling...");
	});

	io.on("hash", function(hash) {
		currentHash = hash;
	});

	io.on("ok", function() {
		if(initial) return initial = false;
		reloadApp();
	});

	io.on("warnings", function(warnings) {
		console.log("[WDS] Warnings while compiling.");
		for(var i = 0; i < warnings.length; i++)
			console.warn(warnings[i]);
		if(initial) return initial = false;
		reloadApp();
	});

	io.on("errors", function(errors) {
		console.log("[WDS] Errors while compiling.");
		for(var i = 0; i < errors.length; i++)
			console.error(errors[i]);
		if(initial) return initial = false;
		reloadApp();
	});

	io.on("proxy-error", function(errors) {
		console.log("[WDS] Proxy error.");
		for(var i = 0; i < errors.length; i++)
			console.error(errors[i]);
		if(initial) return initial = false;
		reloadApp();
	});

	io.on("disconnect", function() {
		console.error("[WDS] Disconnected!");
	});

	function reloadApp() {
		if(hot) {
			console.log("[WDS] App hot update...");
			window.postMessage("webpackHotUpdate" + currentHash, "*");
		} else {
			console.log("[WDS] App updated. Reloading...");
			window.location.reload();
		}
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "?http://localhost:8081"))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var $ = __webpack_require__(28);

	var slides = __webpack_require__(26);

	$('.slides').append(slides);
	$('#what-is-webpack').attr("src", __webpack_require__(25));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10)(__webpack_require__(11))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10)(__webpack_require__(12))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10)(__webpack_require__(13))

/***/ },
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (window.execScript)
			window.execScript(src);
		else
			eval.call(null, src);
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "/**\r\n    Head JS     The only script in your <HEAD>\r\n    Copyright   Tero Piirainen (tipiirai)\r\n    License     MIT / http://bit.ly/mit-license\r\n    Version     0.96\r\n\r\n    http://headjs.com\r\n*/(function(a){function z(){d||(d=!0,s(e,function(a){p(a)}))}function y(c,d){var e=a.createElement(\"script\");e.type=\"text/\"+(c.type||\"javascript\"),e.src=c.src||c,e.async=!1,e.onreadystatechange=e.onload=function(){var a=e.readyState;!d.done&&(!a||/loaded|complete/.test(a))&&(d.done=!0,d())},(a.body||b).appendChild(e)}function x(a,b){if(a.state==o)return b&&b();if(a.state==n)return k.ready(a.name,b);if(a.state==m)return a.onpreload.push(function(){x(a,b)});a.state=n,y(a.url,function(){a.state=o,b&&b(),s(g[a.name],function(a){p(a)}),u()&&d&&s(g.ALL,function(a){p(a)})})}function w(a,b){a.state===undefined&&(a.state=m,a.onpreload=[],y({src:a.url,type:\"cache\"},function(){v(a)}))}function v(a){a.state=l,s(a.onpreload,function(a){a.call()})}function u(a){a=a||h;var b;for(var c in a){if(a.hasOwnProperty(c)&&a[c].state!=o)return!1;b=!0}return b}function t(a){return Object.prototype.toString.call(a)==\"[object Function]\"}function s(a,b){if(!!a){typeof a==\"object\"&&(a=[].slice.call(a));for(var c=0;c<a.length;c++)b.call(a,a[c],c)}}function r(a){var b;if(typeof a==\"object\")for(var c in a)a[c]&&(b={name:c,url:a[c]});else b={name:q(a),url:a};var d=h[b.name];if(d&&d.url===b.url)return d;h[b.name]=b;return b}function q(a){var b=a.split(\"/\"),c=b[b.length-1],d=c.indexOf(\"?\");return d!=-1?c.substring(0,d):c}function p(a){a._done||(a(),a._done=1)}var b=a.documentElement,c,d,e=[],f=[],g={},h={},i=a.createElement(\"script\").async===!0||\"MozAppearance\"in a.documentElement.style||window.opera,j=window.head_conf&&head_conf.head||\"head\",k=window[j]=window[j]||function(){k.ready.apply(null,arguments)},l=1,m=2,n=3,o=4;i?k.js=function(){var a=arguments,b=a[a.length-1],c={};t(b)||(b=null),s(a,function(d,e){d!=b&&(d=r(d),c[d.name]=d,x(d,b&&e==a.length-2?function(){u(c)&&p(b)}:null))});return k}:k.js=function(){var a=arguments,b=[].slice.call(a,1),d=b[0];if(!c){f.push(function(){k.js.apply(null,a)});return k}d?(s(b,function(a){t(a)||w(r(a))}),x(r(a[0]),t(d)?d:function(){k.js.apply(null,b)})):x(r(a[0]));return k},k.ready=function(b,c){if(b==a){d?p(c):e.push(c);return k}t(b)&&(c=b,b=\"ALL\");if(typeof b!=\"string\"||!t(c))return k;var f=h[b];if(f&&f.state==o||b==\"ALL\"&&u()&&d){p(c);return k}var i=g[b];i?i.push(c):i=g[b]=[c];return k},k.ready(a,function(){u()&&s(g.ALL,function(a){p(a)}),k.feature&&k.feature(\"domloaded\",!0)});if(window.addEventListener)a.addEventListener(\"DOMContentLoaded\",z,!1),window.addEventListener(\"load\",z,!1);else if(window.attachEvent){a.attachEvent(\"onreadystatechange\",function(){a.readyState===\"complete\"&&z()});var A=1;try{A=window.frameElement}catch(B){}!A&&b.doScroll&&function(){try{b.doScroll(\"left\"),z()}catch(a){setTimeout(arguments.callee,1);return}}(),window.attachEvent(\"onload\",z)}!a.readyState&&a.addEventListener&&(a.readyState=\"loading\",a.addEventListener(\"DOMContentLoaded\",handler=function(){a.removeEventListener(\"DOMContentLoaded\",handler,!1),a.readyState=\"complete\"},!1)),setTimeout(function(){c=!0,s(f,function(a){a()})},300)})(document)"

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/\r\nif(typeof document!==\"undefined\"&&!(\"classList\" in document.createElement(\"a\"))){(function(j){var a=\"classList\",f=\"prototype\",m=(j.HTMLElement||j.Element)[f],b=Object,k=String[f].trim||function(){return this.replace(/^\\s+|\\s+$/g,\"\")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===\"\"){throw new n(\"SYNTAX_ERR\",\"An invalid or illegal string was specified\")}if(/\\s/.test(o)){throw new n(\"INVALID_CHARACTER_ERR\",\"String contains an invalid character\")}return c.call(p,o)},d=function(s){var r=k.call(s.className),q=r?r.split(/\\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.className=this.toString()}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+=\"\";return g(this,o)!==-1};e.add=function(o){o+=\"\";if(g(this,o)===-1){this.push(o);this._updateClassName()}};e.remove=function(p){p+=\"\";var o=g(this,p);if(o!==-1){this.splice(o,1);this._updateClassName()}};e.toggle=function(o){o+=\"\";if(g(this,o)===-1){this.add(o)}else{this.remove(o)}};e.toString=function(){return this.join(\" \")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};"

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "/*!\r\n * reveal.js 2.6.1 (2014-03-13, 09:22)\r\n * http://lab.hakim.se/reveal-js\r\n * MIT licensed\r\n *\r\n * Copyright (C) 2014 Hakim El Hattab, http://hakim.se\r\n */\r\nvar Reveal=function(){\"use strict\";function a(a){if(b(),!ec.transforms2d&&!ec.transforms3d)return document.body.setAttribute(\"class\",\"no-transforms\"),void 0;window.addEventListener(\"load\",A,!1);var d=Reveal.getQueryHash();\"undefined\"!=typeof d.dependencies&&delete d.dependencies,k(_b,a),k(_b,d),r(),c()}function b(){ec.transforms3d=\"WebkitPerspective\"in document.body.style||\"MozPerspective\"in document.body.style||\"msPerspective\"in document.body.style||\"OPerspective\"in document.body.style||\"perspective\"in document.body.style,ec.transforms2d=\"WebkitTransform\"in document.body.style||\"MozTransform\"in document.body.style||\"msTransform\"in document.body.style||\"OTransform\"in document.body.style||\"transform\"in document.body.style,ec.requestAnimationFrameMethod=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,ec.requestAnimationFrame=\"function\"==typeof ec.requestAnimationFrameMethod,ec.canvas=!!document.createElement(\"canvas\").getContext,Vb=navigator.userAgent.match(/(iphone|ipod|android)/gi)}function c(){function a(){e.length&&head.js.apply(null,e),d()}function b(b){head.ready(b.src.match(/([\\w\\d_\\-]*)\\.?js$|[^\\\\\\/]*$/i)[0],function(){\"function\"==typeof b.callback&&b.callback.apply(this),0===--f&&a()})}for(var c=[],e=[],f=0,g=0,h=_b.dependencies.length;h>g;g++){var i=_b.dependencies[g];(!i.condition||i.condition())&&(i.async?e.push(i.src):c.push(i.src),b(i))}c.length?(f=c.length,head.js.apply(null,c)):a()}function d(){e(),Q(),h(),cb(),X(!0),setTimeout(function(){dc.slides.classList.remove(\"no-transition\"),ac=!0,t(\"ready\",{indexh:Qb,indexv:Rb,currentSlide:Tb})},1)}function e(){dc.theme=document.querySelector(\"#theme\"),dc.wrapper=document.querySelector(\".reveal\"),dc.slides=document.querySelector(\".reveal .slides\"),dc.slides.classList.add(\"no-transition\"),dc.background=f(dc.wrapper,\"div\",\"backgrounds\",null),dc.progress=f(dc.wrapper,\"div\",\"progress\",\"<span></span>\"),dc.progressbar=dc.progress.querySelector(\"span\"),f(dc.wrapper,\"aside\",\"controls\",'<div class=\"navigate-left\"></div><div class=\"navigate-right\"></div><div class=\"navigate-up\"></div><div class=\"navigate-down\"></div>'),dc.slideNumber=f(dc.wrapper,\"div\",\"slide-number\",\"\"),f(dc.wrapper,\"div\",\"state-background\",null),f(dc.wrapper,\"div\",\"pause-overlay\",null),dc.controls=document.querySelector(\".reveal .controls\"),dc.controlsLeft=l(document.querySelectorAll(\".navigate-left\")),dc.controlsRight=l(document.querySelectorAll(\".navigate-right\")),dc.controlsUp=l(document.querySelectorAll(\".navigate-up\")),dc.controlsDown=l(document.querySelectorAll(\".navigate-down\")),dc.controlsPrev=l(document.querySelectorAll(\".navigate-prev\")),dc.controlsNext=l(document.querySelectorAll(\".navigate-next\"))}function f(a,b,c,d){var e=a.querySelector(\".\"+c);return e||(e=document.createElement(b),e.classList.add(c),null!==d&&(e.innerHTML=d),a.appendChild(e)),e}function g(){function a(a,b){var c={background:a.getAttribute(\"data-background\"),backgroundSize:a.getAttribute(\"data-background-size\"),backgroundImage:a.getAttribute(\"data-background-image\"),backgroundColor:a.getAttribute(\"data-background-color\"),backgroundRepeat:a.getAttribute(\"data-background-repeat\"),backgroundPosition:a.getAttribute(\"data-background-position\"),backgroundTransition:a.getAttribute(\"data-background-transition\")},d=document.createElement(\"div\");return d.className=\"slide-background\",c.background&&(/^(http|file|\\/\\/)/gi.test(c.background)||/\\.(svg|png|jpg|jpeg|gif|bmp)$/gi.test(c.background)?d.style.backgroundImage=\"url(\"+c.background+\")\":d.style.background=c.background),(c.background||c.backgroundColor||c.backgroundImage)&&d.setAttribute(\"data-background-hash\",c.background+c.backgroundSize+c.backgroundImage+c.backgroundColor+c.backgroundRepeat+c.backgroundPosition+c.backgroundTransition),c.backgroundSize&&(d.style.backgroundSize=c.backgroundSize),c.backgroundImage&&(d.style.backgroundImage='url(\"'+c.backgroundImage+'\")'),c.backgroundColor&&(d.style.backgroundColor=c.backgroundColor),c.backgroundRepeat&&(d.style.backgroundRepeat=c.backgroundRepeat),c.backgroundPosition&&(d.style.backgroundPosition=c.backgroundPosition),c.backgroundTransition&&d.setAttribute(\"data-background-transition\",c.backgroundTransition),b.appendChild(d),d}q()&&document.body.classList.add(\"print-pdf\"),dc.background.innerHTML=\"\",dc.background.classList.add(\"no-transition\"),l(document.querySelectorAll(Yb)).forEach(function(b){var c;c=q()?a(b,b):a(b,dc.background),l(b.querySelectorAll(\"section\")).forEach(function(b){q()?a(b,b):a(b,c)})}),_b.parallaxBackgroundImage?(dc.background.style.backgroundImage='url(\"'+_b.parallaxBackgroundImage+'\")',dc.background.style.backgroundSize=_b.parallaxBackgroundSize,setTimeout(function(){dc.wrapper.classList.add(\"has-parallax-background\")},1)):(dc.background.style.backgroundImage=\"\",dc.wrapper.classList.remove(\"has-parallax-background\"))}function h(a){var b=document.querySelectorAll(Xb).length;if(dc.wrapper.classList.remove(_b.transition),\"object\"==typeof a&&k(_b,a),ec.transforms3d===!1&&(_b.transition=\"linear\"),dc.wrapper.classList.add(_b.transition),dc.wrapper.setAttribute(\"data-transition-speed\",_b.transitionSpeed),dc.wrapper.setAttribute(\"data-background-transition\",_b.backgroundTransition),dc.controls.style.display=_b.controls?\"block\":\"none\",dc.progress.style.display=_b.progress?\"block\":\"none\",_b.rtl?dc.wrapper.classList.add(\"rtl\"):dc.wrapper.classList.remove(\"rtl\"),_b.center?dc.wrapper.classList.add(\"center\"):dc.wrapper.classList.remove(\"center\"),_b.mouseWheel?(document.addEventListener(\"DOMMouseScroll\",Bb,!1),document.addEventListener(\"mousewheel\",Bb,!1)):(document.removeEventListener(\"DOMMouseScroll\",Bb,!1),document.removeEventListener(\"mousewheel\",Bb,!1)),_b.rollingLinks?u():v(),_b.previewLinks?w():(x(),w(\"[data-preview-link]\")),b>1&&_b.autoSlide&&_b.autoSlideStoppable&&ec.canvas&&ec.requestAnimationFrame?(Wb=new Pb(dc.wrapper,function(){return Math.min(Math.max((Date.now()-mc)/kc,0),1)}),Wb.on(\"click\",Ob),nc=!1):Wb&&(Wb.destroy(),Wb=null),_b.theme&&dc.theme){var c=dc.theme.getAttribute(\"href\"),d=/[^\\/]*?(?=\\.css)/,e=c.match(d)[0];_b.theme!==e&&(c=c.replace(d,_b.theme),dc.theme.setAttribute(\"href\",c))}P()}function i(){if(jc=!0,window.addEventListener(\"hashchange\",Jb,!1),window.addEventListener(\"resize\",Kb,!1),_b.touch&&(dc.wrapper.addEventListener(\"touchstart\",vb,!1),dc.wrapper.addEventListener(\"touchmove\",wb,!1),dc.wrapper.addEventListener(\"touchend\",xb,!1),window.navigator.msPointerEnabled&&(dc.wrapper.addEventListener(\"MSPointerDown\",yb,!1),dc.wrapper.addEventListener(\"MSPointerMove\",zb,!1),dc.wrapper.addEventListener(\"MSPointerUp\",Ab,!1))),_b.keyboard&&document.addEventListener(\"keydown\",ub,!1),_b.progress&&dc.progress&&dc.progress.addEventListener(\"click\",Cb,!1),_b.focusBodyOnPageVisiblityChange){var a;\"hidden\"in document?a=\"visibilitychange\":\"msHidden\"in document?a=\"msvisibilitychange\":\"webkitHidden\"in document&&(a=\"webkitvisibilitychange\"),a&&document.addEventListener(a,Lb,!1)}[\"touchstart\",\"click\"].forEach(function(a){dc.controlsLeft.forEach(function(b){b.addEventListener(a,Db,!1)}),dc.controlsRight.forEach(function(b){b.addEventListener(a,Eb,!1)}),dc.controlsUp.forEach(function(b){b.addEventListener(a,Fb,!1)}),dc.controlsDown.forEach(function(b){b.addEventListener(a,Gb,!1)}),dc.controlsPrev.forEach(function(b){b.addEventListener(a,Hb,!1)}),dc.controlsNext.forEach(function(b){b.addEventListener(a,Ib,!1)})})}function j(){jc=!1,document.removeEventListener(\"keydown\",ub,!1),window.removeEventListener(\"hashchange\",Jb,!1),window.removeEventListener(\"resize\",Kb,!1),dc.wrapper.removeEventListener(\"touchstart\",vb,!1),dc.wrapper.removeEventListener(\"touchmove\",wb,!1),dc.wrapper.removeEventListener(\"touchend\",xb,!1),window.navigator.msPointerEnabled&&(dc.wrapper.removeEventListener(\"MSPointerDown\",yb,!1),dc.wrapper.removeEventListener(\"MSPointerMove\",zb,!1),dc.wrapper.removeEventListener(\"MSPointerUp\",Ab,!1)),_b.progress&&dc.progress&&dc.progress.removeEventListener(\"click\",Cb,!1),[\"touchstart\",\"click\"].forEach(function(a){dc.controlsLeft.forEach(function(b){b.removeEventListener(a,Db,!1)}),dc.controlsRight.forEach(function(b){b.removeEventListener(a,Eb,!1)}),dc.controlsUp.forEach(function(b){b.removeEventListener(a,Fb,!1)}),dc.controlsDown.forEach(function(b){b.removeEventListener(a,Gb,!1)}),dc.controlsPrev.forEach(function(b){b.removeEventListener(a,Hb,!1)}),dc.controlsNext.forEach(function(b){b.removeEventListener(a,Ib,!1)})})}function k(a,b){for(var c in b)a[c]=b[c]}function l(a){return Array.prototype.slice.call(a)}function m(a,b){var c=a.x-b.x,d=a.y-b.y;return Math.sqrt(c*c+d*d)}function n(a,b){a.style.WebkitTransform=b,a.style.MozTransform=b,a.style.msTransform=b,a.style.OTransform=b,a.style.transform=b}function o(a){var b=0;if(a){var c=0;l(a.childNodes).forEach(function(a){\"number\"==typeof a.offsetTop&&a.style&&(\"absolute\"===a.style.position&&(c+=1),b=Math.max(b,a.offsetTop+a.offsetHeight))}),0===c&&(b=a.offsetHeight)}return b}function p(a,b){if(b=b||0,a){var c=a.parentNode,d=c.childNodes;l(d).forEach(function(c){if(\"number\"==typeof c.offsetHeight&&c!==a){var d=window.getComputedStyle(c),e=parseInt(d.marginTop,10),f=parseInt(d.marginBottom,10);b-=c.offsetHeight+e+f}});var e=window.getComputedStyle(a);b-=parseInt(e.marginTop,10)+parseInt(e.marginBottom,10)}return b}function q(){return/print-pdf/gi.test(window.location.search)}function r(){_b.hideAddressBar&&Vb&&(window.addEventListener(\"load\",s,!1),window.addEventListener(\"orientationchange\",s,!1))}function s(){setTimeout(function(){window.scrollTo(0,1)},10)}function t(a,b){var c=document.createEvent(\"HTMLEvents\",1,2);c.initEvent(a,!0,!0),k(c,b),dc.wrapper.dispatchEvent(c)}function u(){if(ec.transforms3d&&!(\"msPerspective\"in document.body.style))for(var a=document.querySelectorAll(Xb+\" a:not(.image)\"),b=0,c=a.length;c>b;b++){var d=a[b];if(!(!d.textContent||d.querySelector(\"*\")||d.className&&d.classList.contains(d,\"roll\"))){var e=document.createElement(\"span\");e.setAttribute(\"data-title\",d.text),e.innerHTML=d.innerHTML,d.classList.add(\"roll\"),d.innerHTML=\"\",d.appendChild(e)}}}function v(){for(var a=document.querySelectorAll(Xb+\" a.roll\"),b=0,c=a.length;c>b;b++){var d=a[b],e=d.querySelector(\"span\");e&&(d.classList.remove(\"roll\"),d.innerHTML=e.innerHTML)}}function w(a){var b=l(document.querySelectorAll(a?a:\"a\"));b.forEach(function(a){/^(http|www)/gi.test(a.getAttribute(\"href\"))&&a.addEventListener(\"click\",Nb,!1)})}function x(){var a=l(document.querySelectorAll(\"a\"));a.forEach(function(a){/^(http|www)/gi.test(a.getAttribute(\"href\"))&&a.removeEventListener(\"click\",Nb,!1)})}function y(a){z(),dc.preview=document.createElement(\"div\"),dc.preview.classList.add(\"preview-link-overlay\"),dc.wrapper.appendChild(dc.preview),dc.preview.innerHTML=[\"<header>\",'<a class=\"close\" href=\"#\"><span class=\"icon\"></span></a>','<a class=\"external\" href=\"'+a+'\" target=\"_blank\"><span class=\"icon\"></span></a>',\"</header>\",'<div class=\"spinner\"></div>','<div class=\"viewport\">','<iframe src=\"'+a+'\"></iframe>',\"</div>\"].join(\"\"),dc.preview.querySelector(\"iframe\").addEventListener(\"load\",function(){dc.preview.classList.add(\"loaded\")},!1),dc.preview.querySelector(\".close\").addEventListener(\"click\",function(a){z(),a.preventDefault()},!1),dc.preview.querySelector(\".external\").addEventListener(\"click\",function(){z()},!1),setTimeout(function(){dc.preview.classList.add(\"visible\")},1)}function z(){dc.preview&&(dc.preview.setAttribute(\"src\",\"\"),dc.preview.parentNode.removeChild(dc.preview),dc.preview=null)}function A(){if(dc.wrapper&&!q()){var a=dc.wrapper.offsetWidth,b=dc.wrapper.offsetHeight;a-=b*_b.margin,b-=b*_b.margin;var c=_b.width,d=_b.height,e=20;B(_b.width,_b.height,e),\"string\"==typeof c&&/%$/.test(c)&&(c=parseInt(c,10)/100*a),\"string\"==typeof d&&/%$/.test(d)&&(d=parseInt(d,10)/100*b),dc.slides.style.width=c+\"px\",dc.slides.style.height=d+\"px\",cc=Math.min(a/c,b/d),cc=Math.max(cc,_b.minScale),cc=Math.min(cc,_b.maxScale),\"undefined\"==typeof dc.slides.style.zoom||navigator.userAgent.match(/(iphone|ipod|ipad|android)/gi)?n(dc.slides,\"translate(-50%, -50%) scale(\"+cc+\") translate(50%, 50%)\"):dc.slides.style.zoom=cc;for(var f=l(document.querySelectorAll(Xb)),g=0,h=f.length;h>g;g++){var i=f[g];\"none\"!==i.style.display&&(i.style.top=_b.center||i.classList.contains(\"center\")?i.classList.contains(\"stack\")?0:Math.max(-(o(i)/2)-e,-d/2)+\"px\":\"\")}U(),Y()}}function B(a,b,c){l(dc.slides.querySelectorAll(\"section > .stretch\")).forEach(function(d){var e=p(d,b-2*c);if(/(img|video)/gi.test(d.nodeName)){var f=d.naturalWidth||d.videoWidth,g=d.naturalHeight||d.videoHeight,h=Math.min(a/f,e/g);d.style.width=f*h+\"px\",d.style.height=g*h+\"px\"}else d.style.width=a+\"px\",d.style.height=e+\"px\"})}function C(a,b){\"object\"==typeof a&&\"function\"==typeof a.setAttribute&&a.setAttribute(\"data-previous-indexv\",b||0)}function D(a){if(\"object\"==typeof a&&\"function\"==typeof a.setAttribute&&a.classList.contains(\"stack\")){var b=a.hasAttribute(\"data-start-indexv\")?\"data-start-indexv\":\"data-previous-indexv\";return parseInt(a.getAttribute(b)||0,10)}return 0}function E(){if(_b.overview){kb();var a=dc.wrapper.classList.contains(\"overview\"),b=window.innerWidth<400?1e3:2500;dc.wrapper.classList.add(\"overview\"),dc.wrapper.classList.remove(\"overview-deactivating\"),clearTimeout(hc),clearTimeout(ic),hc=setTimeout(function(){for(var c=document.querySelectorAll(Yb),d=0,e=c.length;e>d;d++){var f=c[d],g=_b.rtl?-105:105;if(f.setAttribute(\"data-index-h\",d),n(f,\"translateZ(-\"+b+\"px) translate(\"+(d-Qb)*g+\"%, 0%)\"),f.classList.contains(\"stack\"))for(var h=f.querySelectorAll(\"section\"),i=0,j=h.length;j>i;i++){var k=d===Qb?Rb:D(f),l=h[i];l.setAttribute(\"data-index-h\",d),l.setAttribute(\"data-index-v\",i),n(l,\"translate(0%, \"+105*(i-k)+\"%)\"),l.addEventListener(\"click\",Mb,!0)}else f.addEventListener(\"click\",Mb,!0)}T(),A(),a||t(\"overviewshown\",{indexh:Qb,indexv:Rb,currentSlide:Tb})},10)}}function F(){_b.overview&&(clearTimeout(hc),clearTimeout(ic),dc.wrapper.classList.remove(\"overview\"),dc.wrapper.classList.add(\"overview-deactivating\"),ic=setTimeout(function(){dc.wrapper.classList.remove(\"overview-deactivating\")},1),l(document.querySelectorAll(Xb)).forEach(function(a){n(a,\"\"),a.removeEventListener(\"click\",Mb,!0)}),O(Qb,Rb),jb(),t(\"overviewhidden\",{indexh:Qb,indexv:Rb,currentSlide:Tb}))}function G(a){\"boolean\"==typeof a?a?E():F():H()?F():E()}function H(){return dc.wrapper.classList.contains(\"overview\")}function I(a){return a=a?a:Tb,a&&a.parentNode&&!!a.parentNode.nodeName.match(/section/i)}function J(){var a=document.body,b=a.requestFullScreen||a.webkitRequestFullscreen||a.webkitRequestFullScreen||a.mozRequestFullScreen||a.msRequestFullScreen;b&&b.apply(a)}function K(){var a=dc.wrapper.classList.contains(\"paused\");kb(),dc.wrapper.classList.add(\"paused\"),a===!1&&t(\"paused\")}function L(){var a=dc.wrapper.classList.contains(\"paused\");dc.wrapper.classList.remove(\"paused\"),jb(),a&&t(\"resumed\")}function M(){N()?L():K()}function N(){return dc.wrapper.classList.contains(\"paused\")}function O(a,b,c,d){Sb=Tb;var e=document.querySelectorAll(Yb);void 0===b&&(b=D(e[a])),Sb&&Sb.parentNode&&Sb.parentNode.classList.contains(\"stack\")&&C(Sb.parentNode,Rb);var f=bc.concat();bc.length=0;var g=Qb||0,h=Rb||0;Qb=S(Yb,void 0===a?Qb:a),Rb=S(Zb,void 0===b?Rb:b),T(),A();a:for(var i=0,j=bc.length;j>i;i++){for(var k=0;k<f.length;k++)if(f[k]===bc[i]){f.splice(k,1);continue a}document.documentElement.classList.add(bc[i]),t(bc[i])}for(;f.length;)document.documentElement.classList.remove(f.pop());H()&&E();var m=e[Qb],n=m.querySelectorAll(\"section\");Tb=n[Rb]||m,\"undefined\"!=typeof c&&gb(c);var o=Qb!==g||Rb!==h;o?t(\"slidechanged\",{indexh:Qb,indexv:Rb,previousSlide:Sb,currentSlide:Tb,origin:d}):Sb=null,Sb&&(Sb.classList.remove(\"present\"),document.querySelector($b).classList.contains(\"present\")&&setTimeout(function(){var a,b=l(document.querySelectorAll(Yb+\".stack\"));for(a in b)b[a]&&C(b[a],0)},0)),o&&(ab(Sb),_(Tb)),W(),U(),X(),Y(),V(),db(),jb()}function P(){j(),i(),A(),kc=_b.autoSlide,jb(),g(),R(),W(),U(),X(!0),V()}function Q(){var a=l(document.querySelectorAll(Yb));a.forEach(function(a){var b=l(a.querySelectorAll(\"section\"));b.forEach(function(a,b){b>0&&(a.classList.remove(\"present\"),a.classList.remove(\"past\"),a.classList.add(\"future\"))})})}function R(){var a=l(document.querySelectorAll(Yb));a.forEach(function(a){var b=l(a.querySelectorAll(\"section\"));b.forEach(function(a){fb(a.querySelectorAll(\".fragment\"))}),0===b.length&&fb(a.querySelectorAll(\".fragment\"))})}function S(a,b){var c=l(document.querySelectorAll(a)),d=c.length;if(d){_b.loop&&(b%=d,0>b&&(b=d+b)),b=Math.max(Math.min(b,d-1),0);for(var e=0;d>e;e++){var f=c[e],g=_b.rtl&&!I(f);if(f.classList.remove(\"past\"),f.classList.remove(\"present\"),f.classList.remove(\"future\"),f.setAttribute(\"hidden\",\"\"),b>e){f.classList.add(g?\"future\":\"past\");for(var h=l(f.querySelectorAll(\".fragment\"));h.length;){var i=h.pop();i.classList.add(\"visible\"),i.classList.remove(\"current-fragment\")}}else if(e>b){f.classList.add(g?\"past\":\"future\");for(var j=l(f.querySelectorAll(\".fragment.visible\"));j.length;){var k=j.pop();k.classList.remove(\"visible\"),k.classList.remove(\"current-fragment\")}}f.querySelector(\"section\")&&f.classList.add(\"stack\")}c[b].classList.add(\"present\"),c[b].removeAttribute(\"hidden\");var m=c[b].getAttribute(\"data-state\");m&&(bc=bc.concat(m.split(\" \")))}else b=0;return b}function T(){var a,b,c=l(document.querySelectorAll(Yb)),d=c.length;if(d){var e=H()?10:_b.viewDistance;Vb&&(e=H()?6:1);for(var f=0;d>f;f++){var g=c[f],h=l(g.querySelectorAll(\"section\")),i=h.length;if(a=Math.abs((Qb-f)%(d-e))||0,g.style.display=a>e?\"none\":\"block\",i)for(var j=D(g),k=0;i>k;k++){var m=h[k];b=f===Qb?Math.abs(Rb-k):Math.abs(k-j),m.style.display=a+b>e?\"none\":\"block\"}}}}function U(){if(_b.progress&&dc.progress){var a=l(document.querySelectorAll(Yb)),b=document.querySelectorAll(Xb+\":not(.stack)\").length,c=0;a:for(var d=0;d<a.length;d++){for(var e=a[d],f=l(e.querySelectorAll(\"section\")),g=0;g<f.length;g++){if(f[g].classList.contains(\"present\"))break a;c++}if(e.classList.contains(\"present\"))break;e.classList.contains(\"stack\")===!1&&c++}dc.progressbar.style.width=c/(b-1)*window.innerWidth+\"px\"}}function V(){if(_b.slideNumber&&dc.slideNumber){var a=Qb;Rb>0&&(a+=\" - \"+Rb),dc.slideNumber.innerHTML=a}}function W(){var a=Z(),b=$();dc.controlsLeft.concat(dc.controlsRight).concat(dc.controlsUp).concat(dc.controlsDown).concat(dc.controlsPrev).concat(dc.controlsNext).forEach(function(a){a.classList.remove(\"enabled\"),a.classList.remove(\"fragmented\")}),a.left&&dc.controlsLeft.forEach(function(a){a.classList.add(\"enabled\")}),a.right&&dc.controlsRight.forEach(function(a){a.classList.add(\"enabled\")}),a.up&&dc.controlsUp.forEach(function(a){a.classList.add(\"enabled\")}),a.down&&dc.controlsDown.forEach(function(a){a.classList.add(\"enabled\")}),(a.left||a.up)&&dc.controlsPrev.forEach(function(a){a.classList.add(\"enabled\")}),(a.right||a.down)&&dc.controlsNext.forEach(function(a){a.classList.add(\"enabled\")}),Tb&&(b.prev&&dc.controlsPrev.forEach(function(a){a.classList.add(\"fragmented\",\"enabled\")}),b.next&&dc.controlsNext.forEach(function(a){a.classList.add(\"fragmented\",\"enabled\")}),I(Tb)?(b.prev&&dc.controlsUp.forEach(function(a){a.classList.add(\"fragmented\",\"enabled\")}),b.next&&dc.controlsDown.forEach(function(a){a.classList.add(\"fragmented\",\"enabled\")})):(b.prev&&dc.controlsLeft.forEach(function(a){a.classList.add(\"fragmented\",\"enabled\")}),b.next&&dc.controlsRight.forEach(function(a){a.classList.add(\"fragmented\",\"enabled\")})))}function X(a){var b=null,c=_b.rtl?\"future\":\"past\",d=_b.rtl?\"past\":\"future\";if(l(dc.background.childNodes).forEach(function(e,f){Qb>f?e.className=\"slide-background \"+c:f>Qb?e.className=\"slide-background \"+d:(e.className=\"slide-background present\",b=e),(a||f===Qb)&&l(e.childNodes).forEach(function(a,c){Rb>c?a.className=\"slide-background past\":c>Rb?a.className=\"slide-background future\":(a.className=\"slide-background present\",f===Qb&&(b=a))})}),b){var e=Ub?Ub.getAttribute(\"data-background-hash\"):null,f=b.getAttribute(\"data-background-hash\");f&&f===e&&b!==Ub&&dc.background.classList.add(\"no-transition\"),Ub=b}setTimeout(function(){dc.background.classList.remove(\"no-transition\")},1)}function Y(){if(_b.parallaxBackgroundImage){var a,b,c=document.querySelectorAll(Yb),d=document.querySelectorAll(Zb),e=dc.background.style.backgroundSize.split(\" \");1===e.length?a=b=parseInt(e[0],10):(a=parseInt(e[0],10),b=parseInt(e[1],10));var f=dc.background.offsetWidth,g=c.length,h=-(a-f)/(g-1)*Qb,i=dc.background.offsetHeight,j=d.length,k=j>0?-(b-i)/(j-1)*Rb:0;dc.background.style.backgroundPosition=h+\"px \"+k+\"px\"}}function Z(){var a=document.querySelectorAll(Yb),b=document.querySelectorAll(Zb),c={left:Qb>0||_b.loop,right:Qb<a.length-1||_b.loop,up:Rb>0,down:Rb<b.length-1};if(_b.rtl){var d=c.left;c.left=c.right,c.right=d}return c}function $(){if(Tb&&_b.fragments){var a=Tb.querySelectorAll(\".fragment\"),b=Tb.querySelectorAll(\".fragment:not(.visible)\");return{prev:a.length-b.length>0,next:!!b.length}}return{prev:!1,next:!1}}function _(a){a&&!bb()&&(l(a.querySelectorAll(\"video, audio\")).forEach(function(a){a.hasAttribute(\"data-autoplay\")&&a.play()}),l(a.querySelectorAll(\"iframe\")).forEach(function(a){a.contentWindow.postMessage(\"slide:start\",\"*\")}),l(a.querySelectorAll('iframe[src*=\"youtube.com/embed/\"]')).forEach(function(a){a.hasAttribute(\"data-autoplay\")&&a.contentWindow.postMessage('{\"event\":\"command\",\"func\":\"playVideo\",\"args\":\"\"}',\"*\")}))}function ab(a){a&&(l(a.querySelectorAll(\"video, audio\")).forEach(function(a){a.hasAttribute(\"data-ignore\")||a.pause()}),l(a.querySelectorAll(\"iframe\")).forEach(function(a){a.contentWindow.postMessage(\"slide:stop\",\"*\")}),l(a.querySelectorAll('iframe[src*=\"youtube.com/embed/\"]')).forEach(function(a){a.hasAttribute(\"data-ignore\")||\"function\"!=typeof a.contentWindow.postMessage||a.contentWindow.postMessage('{\"event\":\"command\",\"func\":\"pauseVideo\",\"args\":\"\"}',\"*\")}))}function bb(){return!!window.location.search.match(/receiver/gi)}function cb(){var a=window.location.hash,b=a.slice(2).split(\"/\"),c=a.replace(/#|\\//gi,\"\");if(isNaN(parseInt(b[0],10))&&c.length){var d=document.querySelector(\"#\"+c);if(d){var e=Reveal.getIndices(d);O(e.h,e.v)}else O(Qb||0,Rb||0)}else{var f=parseInt(b[0],10)||0,g=parseInt(b[1],10)||0;(f!==Qb||g!==Rb)&&O(f,g)}}function db(a){if(_b.history)if(clearTimeout(gc),\"number\"==typeof a)gc=setTimeout(db,a);else{var b=\"/\";Tb&&\"string\"==typeof Tb.getAttribute(\"id\")?b=\"/\"+Tb.getAttribute(\"id\"):((Qb>0||Rb>0)&&(b+=Qb),Rb>0&&(b+=\"/\"+Rb)),window.location.hash=b}}function eb(a){var b,c=Qb,d=Rb;if(a){var e=I(a),f=e?a.parentNode:a,g=l(document.querySelectorAll(Yb));c=Math.max(g.indexOf(f),0),e&&(d=Math.max(l(a.parentNode.querySelectorAll(\"section\")).indexOf(a),0))}if(!a&&Tb){var h=Tb.querySelectorAll(\".fragment\").length>0;if(h){var i=Tb.querySelectorAll(\".fragment.visible\");b=i.length-1}}return{h:c,v:d,f:b}}function fb(a){a=l(a);var b=[],c=[],d=[];a.forEach(function(a){if(a.hasAttribute(\"data-fragment-index\")){var d=parseInt(a.getAttribute(\"data-fragment-index\"),10);b[d]||(b[d]=[]),b[d].push(a)}else c.push([a])}),b=b.concat(c);var e=0;return b.forEach(function(a){a.forEach(function(a){d.push(a),a.setAttribute(\"data-fragment-index\",e)}),e++}),d}function gb(a,b){if(Tb&&_b.fragments){var c=fb(Tb.querySelectorAll(\".fragment\"));if(c.length){if(\"number\"!=typeof a){var d=fb(Tb.querySelectorAll(\".fragment.visible\")).pop();a=d?parseInt(d.getAttribute(\"data-fragment-index\")||0,10):-1}\"number\"==typeof b&&(a+=b);var e=[],f=[];return l(c).forEach(function(b,c){b.hasAttribute(\"data-fragment-index\")&&(c=parseInt(b.getAttribute(\"data-fragment-index\"),10)),a>=c?(b.classList.contains(\"visible\")||e.push(b),b.classList.add(\"visible\"),b.classList.remove(\"current-fragment\"),c===a&&b.classList.add(\"current-fragment\")):(b.classList.contains(\"visible\")&&f.push(b),b.classList.remove(\"visible\"),b.classList.remove(\"current-fragment\"))}),f.length&&t(\"fragmenthidden\",{fragment:f[0],fragments:f}),e.length&&t(\"fragmentshown\",{fragment:e[0],fragments:e}),W(),!(!e.length&&!f.length)}}return!1}function hb(){return gb(null,1)}function ib(){return gb(null,-1)}function jb(){if(kb(),Tb){var a=Tb.parentNode?Tb.parentNode.getAttribute(\"data-autoslide\"):null,b=Tb.getAttribute(\"data-autoslide\");kc=b?parseInt(b,10):a?parseInt(a,10):_b.autoSlide,l(Tb.querySelectorAll(\"video, audio\")).forEach(function(a){a.hasAttribute(\"data-autoplay\")&&kc&&1e3*a.duration>kc&&(kc=1e3*a.duration+1e3)}),!kc||nc||N()||H()||Reveal.isLastSlide()&&_b.loop!==!0||(lc=setTimeout(sb,kc),mc=Date.now()),Wb&&Wb.setPlaying(-1!==lc)}}function kb(){clearTimeout(lc),lc=-1}function lb(){nc=!0,clearTimeout(lc),Wb&&Wb.setPlaying(!1)}function mb(){nc=!1,jb()}function nb(){_b.rtl?(H()||hb()===!1)&&Z().left&&O(Qb+1):(H()||ib()===!1)&&Z().left&&O(Qb-1)}function ob(){_b.rtl?(H()||ib()===!1)&&Z().right&&O(Qb-1):(H()||hb()===!1)&&Z().right&&O(Qb+1)}function pb(){(H()||ib()===!1)&&Z().up&&O(Qb,Rb-1)}function qb(){(H()||hb()===!1)&&Z().down&&O(Qb,Rb+1)}function rb(){if(ib()===!1)if(Z().up)pb();else{var a=document.querySelector(Yb+\".past:nth-child(\"+Qb+\")\");if(a){var b=a.querySelectorAll(\"section\").length-1||void 0,c=Qb-1;O(c,b)}}}function sb(){hb()===!1&&(Z().down?qb():ob()),jb()}function tb(){_b.autoSlideStoppable&&lb()}function ub(a){tb(a),document.activeElement;var b=!(!document.activeElement||!document.activeElement.type&&!document.activeElement.href&&\"inherit\"===document.activeElement.contentEditable);if(!(b||a.shiftKey&&32!==a.keyCode||a.altKey||a.ctrlKey||a.metaKey)){if(N()&&-1===[66,190,191].indexOf(a.keyCode))return!1;var c=!1;if(\"object\"==typeof _b.keyboard)for(var d in _b.keyboard)if(parseInt(d,10)===a.keyCode){var e=_b.keyboard[d];\"function\"==typeof e?e.apply(null,[a]):\"string\"==typeof e&&\"function\"==typeof Reveal[e]&&Reveal[e].call(),c=!0}if(c===!1)switch(c=!0,a.keyCode){case 80:case 33:rb();break;case 78:case 34:sb();break;case 72:case 37:nb();break;case 76:case 39:ob();break;case 75:case 38:pb();break;case 74:case 40:qb();break;case 36:O(0);break;case 35:O(Number.MAX_VALUE);break;case 32:H()?F():a.shiftKey?rb():sb();break;case 13:H()?F():c=!1;break;case 66:case 190:case 191:M();break;case 70:J();break;default:c=!1}c?a.preventDefault():27!==a.keyCode&&79!==a.keyCode||!ec.transforms3d||(dc.preview?z():G(),a.preventDefault()),jb()}}function vb(a){oc.startX=a.touches[0].clientX,oc.startY=a.touches[0].clientY,oc.startCount=a.touches.length,2===a.touches.length&&_b.overview&&(oc.startSpan=m({x:a.touches[1].clientX,y:a.touches[1].clientY},{x:oc.startX,y:oc.startY}))}function wb(a){if(oc.captured)navigator.userAgent.match(/android/gi)&&a.preventDefault();else{tb(a);var b=a.touches[0].clientX,c=a.touches[0].clientY;if(2===a.touches.length&&2===oc.startCount&&_b.overview){var d=m({x:a.touches[1].clientX,y:a.touches[1].clientY},{x:oc.startX,y:oc.startY});Math.abs(oc.startSpan-d)>oc.threshold&&(oc.captured=!0,d<oc.startSpan?E():F()),a.preventDefault()}else if(1===a.touches.length&&2!==oc.startCount){var e=b-oc.startX,f=c-oc.startY;e>oc.threshold&&Math.abs(e)>Math.abs(f)?(oc.captured=!0,nb()):e<-oc.threshold&&Math.abs(e)>Math.abs(f)?(oc.captured=!0,ob()):f>oc.threshold?(oc.captured=!0,pb()):f<-oc.threshold&&(oc.captured=!0,qb()),_b.embedded?(oc.captured||I(Tb))&&a.preventDefault():a.preventDefault()}}}function xb(){oc.captured=!1}function yb(a){a.pointerType===a.MSPOINTER_TYPE_TOUCH&&(a.touches=[{clientX:a.clientX,clientY:a.clientY}],vb(a))}function zb(a){a.pointerType===a.MSPOINTER_TYPE_TOUCH&&(a.touches=[{clientX:a.clientX,clientY:a.clientY}],wb(a))}function Ab(a){a.pointerType===a.MSPOINTER_TYPE_TOUCH&&(a.touches=[{clientX:a.clientX,clientY:a.clientY}],xb(a))}function Bb(a){if(Date.now()-fc>600){fc=Date.now();var b=a.detail||-a.wheelDelta;b>0?sb():rb()}}function Cb(a){tb(a),a.preventDefault();var b=l(document.querySelectorAll(Yb)).length,c=Math.floor(a.clientX/dc.wrapper.offsetWidth*b);O(c)}function Db(a){a.preventDefault(),tb(),nb()}function Eb(a){a.preventDefault(),tb(),ob()}function Fb(a){a.preventDefault(),tb(),pb()}function Gb(a){a.preventDefault(),tb(),qb()}function Hb(a){a.preventDefault(),tb(),rb()}function Ib(a){a.preventDefault(),tb(),sb()}function Jb(){cb()}function Kb(){A()}function Lb(){var a=document.webkitHidden||document.msHidden||document.hidden;a===!1&&document.activeElement!==document.body&&(document.activeElement.blur(),document.body.focus())}function Mb(a){if(jc&&H()){a.preventDefault();for(var b=a.target;b&&!b.nodeName.match(/section/gi);)b=b.parentNode;if(b&&!b.classList.contains(\"disabled\")&&(F(),b.nodeName.match(/section/gi))){var c=parseInt(b.getAttribute(\"data-index-h\"),10),d=parseInt(b.getAttribute(\"data-index-v\"),10);O(c,d)}}}function Nb(a){var b=a.target.getAttribute(\"href\");b&&(y(b),a.preventDefault())}function Ob(){Reveal.isLastSlide()&&_b.loop===!1?(O(0,0),mb()):nc?mb():lb()}function Pb(a,b){this.diameter=50,this.thickness=3,this.playing=!1,this.progress=0,this.progressOffset=1,this.container=a,this.progressCheck=b,this.canvas=document.createElement(\"canvas\"),this.canvas.className=\"playback\",this.canvas.width=this.diameter,this.canvas.height=this.diameter,this.context=this.canvas.getContext(\"2d\"),this.container.appendChild(this.canvas),this.render()}var Qb,Rb,Sb,Tb,Ub,Vb,Wb,Xb=\".reveal .slides section\",Yb=\".reveal .slides>section\",Zb=\".reveal .slides>section.present>section\",$b=\".reveal .slides>section:first-of-type\",_b={width:960,height:700,margin:.1,minScale:.2,maxScale:1,controls:!0,progress:!0,slideNumber:!1,history:!1,keyboard:!0,overview:!0,center:!0,touch:!0,loop:!1,rtl:!1,fragments:!0,embedded:!1,autoSlide:0,autoSlideStoppable:!0,mouseWheel:!1,rollingLinks:!1,hideAddressBar:!0,previewLinks:!1,focusBodyOnPageVisiblityChange:!0,theme:null,transition:\"default\",transitionSpeed:\"default\",backgroundTransition:\"default\",parallaxBackgroundImage:\"\",parallaxBackgroundSize:\"\",viewDistance:3,dependencies:[]},ac=!1,bc=[],cc=1,dc={},ec={},fc=0,gc=0,hc=0,ic=0,jc=!1,kc=0,lc=0,mc=-1,nc=!1,oc={startX:0,startY:0,startSpan:0,startCount:0,captured:!1,threshold:40};return Pb.prototype.setPlaying=function(a){var b=this.playing;this.playing=a,!b&&this.playing?this.animate():this.render()},Pb.prototype.animate=function(){var a=this.progress;this.progress=this.progressCheck(),a>.8&&this.progress<.2&&(this.progressOffset=this.progress),this.render(),this.playing&&ec.requestAnimationFrameMethod.call(window,this.animate.bind(this))},Pb.prototype.render=function(){var a=this.playing?this.progress:0,b=this.diameter/2-this.thickness,c=this.diameter/2,d=this.diameter/2,e=14;this.progressOffset+=.1*(1-this.progressOffset);var f=-Math.PI/2+a*2*Math.PI,g=-Math.PI/2+this.progressOffset*2*Math.PI;this.context.save(),this.context.clearRect(0,0,this.diameter,this.diameter),this.context.beginPath(),this.context.arc(c,d,b+2,0,2*Math.PI,!1),this.context.fillStyle=\"rgba( 0, 0, 0, 0.4 )\",this.context.fill(),this.context.beginPath(),this.context.arc(c,d,b,0,2*Math.PI,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle=\"#666\",this.context.stroke(),this.playing&&(this.context.beginPath(),this.context.arc(c,d,b,g,f,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle=\"#fff\",this.context.stroke()),this.context.translate(c-e/2,d-e/2),this.playing?(this.context.fillStyle=\"#fff\",this.context.fillRect(0,0,e/2-2,e),this.context.fillRect(e/2+2,0,e/2-2,e)):(this.context.beginPath(),this.context.translate(2,0),this.context.moveTo(0,0),this.context.lineTo(e-2,e/2),this.context.lineTo(0,e),this.context.fillStyle=\"#fff\",this.context.fill()),this.context.restore()},Pb.prototype.on=function(a,b){this.canvas.addEventListener(a,b,!1)},Pb.prototype.off=function(a,b){this.canvas.removeEventListener(a,b,!1)},Pb.prototype.destroy=function(){this.playing=!1,this.canvas.parentNode&&this.container.removeChild(this.canvas)},{initialize:a,configure:h,sync:P,slide:O,left:nb,right:ob,up:pb,down:qb,prev:rb,next:sb,navigateFragment:gb,prevFragment:ib,nextFragment:hb,navigateTo:O,navigateLeft:nb,navigateRight:ob,navigateUp:pb,navigateDown:qb,navigatePrev:rb,navigateNext:sb,layout:A,availableRoutes:Z,availableFragments:$,toggleOverview:G,togglePause:M,isOverview:H,isPaused:N,addEventListeners:i,removeEventListeners:j,getIndices:eb,getSlide:function(a,b){var c=document.querySelectorAll(Yb)[a],d=c&&c.querySelectorAll(\"section\");\r\nreturn\"undefined\"!=typeof b?d?d[b]:void 0:c},getPreviousSlide:function(){return Sb},getCurrentSlide:function(){return Tb},getScale:function(){return cc},getConfig:function(){return _b},getQueryHash:function(){var a={};location.search.replace(/[A-Z0-9]+?=([\\w\\.%-]*)/gi,function(b){a[b.split(\"=\").shift()]=b.split(\"=\").pop()});for(var b in a){var c=a[b];a[b]=unescape(c),\"null\"===c?a[b]=null:\"true\"===c?a[b]=!0:\"false\"===c?a[b]=!1:c.match(/^\\d+$/)&&(a[b]=parseFloat(c))}return a},isFirstSlide:function(){return null==document.querySelector(Xb+\".past\")?!0:!1},isLastSlide:function(){return Tb?Tb.nextElementSibling?!1:I(Tb)&&Tb.parentNode.nextElementSibling?!1:!0:!1},isReady:function(){return ac},addEventListener:function(a,b,c){\"addEventListener\"in window&&(dc.wrapper||document.querySelector(\".reveal\")).addEventListener(a,b,c)},removeEventListener:function(a,b,c){\"addEventListener\"in window&&(dc.wrapper||document.querySelector(\".reveal\")).removeEventListener(a,b,c)}}}();"

/***/ },
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content);
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		module.hot.accept(17, function() {
			var newContent = __webpack_require__(17);
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	exports.push([module.id, "@charset \"UTF-8\";\r\n\r\n/*!\r\n * reveal.js\r\n * http://lab.hakim.se/reveal-js\r\n * MIT licensed\r\n *\r\n * Copyright (C) 2014 Hakim El Hattab, http://hakim.se\r\n */\r\n\r\n\r\n/*********************************************\r\n * RESET STYLES\r\n *********************************************/\r\n\r\nhtml, body, .reveal div, .reveal span, .reveal applet, .reveal object, .reveal iframe,\r\n.reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6, .reveal p, .reveal blockquote, .reveal pre,\r\n.reveal a, .reveal abbr, .reveal acronym, .reveal address, .reveal big, .reveal cite, .reveal code,\r\n.reveal del, .reveal dfn, .reveal em, .reveal img, .reveal ins, .reveal kbd, .reveal q, .reveal s, .reveal samp,\r\n.reveal small, .reveal strike, .reveal strong, .reveal sub, .reveal sup, .reveal tt, .reveal var,\r\n.reveal b, .reveal u, .reveal i, .reveal center,\r\n.reveal dl, .reveal dt, .reveal dd, .reveal ol, .reveal ul, .reveal li,\r\n.reveal fieldset, .reveal form, .reveal label, .reveal legend,\r\n.reveal table, .reveal caption, .reveal tbody, .reveal tfoot, .reveal thead, .reveal tr, .reveal th, .reveal td,\r\n.reveal article, .reveal aside, .reveal canvas, .reveal details, .reveal embed,\r\n.reveal figure, .reveal figcaption, .reveal footer, .reveal header, .reveal hgroup,\r\n.reveal menu, .reveal nav, .reveal output, .reveal ruby, .reveal section, .reveal summary,\r\n.reveal time, .reveal mark, .reveal audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n\r\n.reveal article, .reveal aside, .reveal details, .reveal figcaption, .reveal figure,\r\n.reveal footer, .reveal header, .reveal hgroup, .reveal menu, .reveal nav, .reveal section {\r\n\tdisplay: block;\r\n}\r\n\r\n\r\n/*********************************************\r\n * GLOBAL STYLES\r\n *********************************************/\r\n\r\nhtml,\r\nbody {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\toverflow: hidden;\r\n}\r\n\r\nbody {\r\n\tposition: relative;\r\n\tline-height: 1;\r\n}\r\n\r\n::selection {\r\n\tbackground: #FF5E99;\r\n\tcolor: #fff;\r\n\ttext-shadow: none;\r\n}\r\n\r\n\r\n/*********************************************\r\n * HEADERS\r\n *********************************************/\r\n\r\n.reveal h1,\r\n.reveal h2,\r\n.reveal h3,\r\n.reveal h4,\r\n.reveal h5,\r\n.reveal h6 {\r\n\t-webkit-hyphens: auto;\r\n\t   -moz-hyphens: auto;\r\n\t        hyphens: auto;\r\n\r\n\tword-wrap: break-word;\r\n\tline-height: 1;\r\n}\r\n\r\n.reveal h1 { font-size: 3.77em; }\r\n.reveal h2 { font-size: 2.11em;\t}\r\n.reveal h3 { font-size: 1.55em;\t}\r\n.reveal h4 { font-size: 1em;\t}\r\n\r\n\r\n/*********************************************\r\n * VIEW FRAGMENTS\r\n *********************************************/\r\n\r\n.reveal .slides section .fragment {\r\n\topacity: 0;\r\n\r\n\t-webkit-transition: all .2s ease;\r\n\t   -moz-transition: all .2s ease;\r\n\t    -ms-transition: all .2s ease;\r\n\t     -o-transition: all .2s ease;\r\n\t        transition: all .2s ease;\r\n}\r\n\t.reveal .slides section .fragment.visible {\r\n\t\topacity: 1;\r\n\t}\r\n\r\n.reveal .slides section .fragment.grow {\r\n\topacity: 1;\r\n}\r\n\t.reveal .slides section .fragment.grow.visible {\r\n\t\t-webkit-transform: scale( 1.3 );\r\n\t\t   -moz-transform: scale( 1.3 );\r\n\t\t    -ms-transform: scale( 1.3 );\r\n\t\t     -o-transform: scale( 1.3 );\r\n\t\t        transform: scale( 1.3 );\r\n\t}\r\n\r\n.reveal .slides section .fragment.shrink {\r\n\topacity: 1;\r\n}\r\n\t.reveal .slides section .fragment.shrink.visible {\r\n\t\t-webkit-transform: scale( 0.7 );\r\n\t\t   -moz-transform: scale( 0.7 );\r\n\t\t    -ms-transform: scale( 0.7 );\r\n\t\t     -o-transform: scale( 0.7 );\r\n\t\t        transform: scale( 0.7 );\r\n\t}\r\n\r\n.reveal .slides section .fragment.zoom-in {\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: scale( 0.1 );\r\n\t   -moz-transform: scale( 0.1 );\r\n\t    -ms-transform: scale( 0.1 );\r\n\t     -o-transform: scale( 0.1 );\r\n\t        transform: scale( 0.1 );\r\n}\r\n\r\n\t.reveal .slides section .fragment.zoom-in.visible {\r\n\t\topacity: 1;\r\n\r\n\t\t-webkit-transform: scale( 1 );\r\n\t\t   -moz-transform: scale( 1 );\r\n\t\t    -ms-transform: scale( 1 );\r\n\t\t     -o-transform: scale( 1 );\r\n\t\t        transform: scale( 1 );\r\n\t}\r\n\r\n.reveal .slides section .fragment.roll-in {\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: rotateX( 90deg );\r\n\t   -moz-transform: rotateX( 90deg );\r\n\t    -ms-transform: rotateX( 90deg );\r\n\t     -o-transform: rotateX( 90deg );\r\n\t        transform: rotateX( 90deg );\r\n}\r\n\t.reveal .slides section .fragment.roll-in.visible {\r\n\t\topacity: 1;\r\n\r\n\t\t-webkit-transform: rotateX( 0 );\r\n\t\t   -moz-transform: rotateX( 0 );\r\n\t\t    -ms-transform: rotateX( 0 );\r\n\t\t     -o-transform: rotateX( 0 );\r\n\t\t        transform: rotateX( 0 );\r\n\t}\r\n\r\n.reveal .slides section .fragment.fade-out {\r\n\topacity: 1;\r\n}\r\n\t.reveal .slides section .fragment.fade-out.visible {\r\n\t\topacity: 0;\r\n\t}\r\n\r\n.reveal .slides section .fragment.semi-fade-out {\r\n\topacity: 1;\r\n}\r\n\t.reveal .slides section .fragment.semi-fade-out.visible {\r\n\t\topacity: 0.5;\r\n\t}\r\n\r\n.reveal .slides section .fragment.current-visible {\r\n\topacity:0;\r\n}\r\n\r\n.reveal .slides section .fragment.current-visible.current-fragment {\r\n\topacity:1;\r\n}\r\n\r\n.reveal .slides section .fragment.highlight-red,\r\n.reveal .slides section .fragment.highlight-current-red,\r\n.reveal .slides section .fragment.highlight-green,\r\n.reveal .slides section .fragment.highlight-current-green,\r\n.reveal .slides section .fragment.highlight-blue,\r\n.reveal .slides section .fragment.highlight-current-blue {\r\n\topacity: 1;\r\n}\r\n\t.reveal .slides section .fragment.highlight-red.visible {\r\n\t\tcolor: #ff2c2d\r\n\t}\r\n\t.reveal .slides section .fragment.highlight-green.visible {\r\n\t\tcolor: #17ff2e;\r\n\t}\r\n\t.reveal .slides section .fragment.highlight-blue.visible {\r\n\t\tcolor: #1b91ff;\r\n\t}\r\n\r\n.reveal .slides section .fragment.highlight-current-red.current-fragment {\r\n\tcolor: #ff2c2d\r\n}\r\n.reveal .slides section .fragment.highlight-current-green.current-fragment {\r\n\tcolor: #17ff2e;\r\n}\r\n.reveal .slides section .fragment.highlight-current-blue.current-fragment {\r\n\tcolor: #1b91ff;\r\n}\r\n\r\n\r\n/*********************************************\r\n * DEFAULT ELEMENT STYLES\r\n *********************************************/\r\n\r\n/* Fixes issue in Chrome where italic fonts did not appear when printing to PDF */\r\n.reveal:after {\r\n  content: '';\r\n  font-style: italic;\r\n}\r\n\r\n.reveal iframe {\r\n\tz-index: 1;\r\n}\r\n\r\n/* Ensure certain elements are never larger than the slide itself */\r\n.reveal img,\r\n.reveal video,\r\n.reveal iframe {\r\n\tmax-width: 95%;\r\n\tmax-height: 95%;\r\n}\r\n\r\n/** Prevents layering issues in certain browser/transition combinations */\r\n.reveal a {\r\n\tposition: relative;\r\n}\r\n\r\n.reveal strong,\r\n.reveal b {\r\n\tfont-weight: bold;\r\n}\r\n\r\n.reveal em,\r\n.reveal i {\r\n\tfont-style: italic;\r\n}\r\n\r\n.reveal ol,\r\n.reveal ul {\r\n\tdisplay: inline-block;\r\n\r\n\ttext-align: left;\r\n\tmargin: 0 0 0 1em;\r\n}\r\n\r\n.reveal ol {\r\n\tlist-style-type: decimal;\r\n}\r\n\r\n.reveal ul {\r\n\tlist-style-type: disc;\r\n}\r\n\r\n.reveal ul ul {\r\n\tlist-style-type: square;\r\n}\r\n\r\n.reveal ul ul ul {\r\n\tlist-style-type: circle;\r\n}\r\n\r\n.reveal ul ul,\r\n.reveal ul ol,\r\n.reveal ol ol,\r\n.reveal ol ul {\r\n\tdisplay: block;\r\n\tmargin-left: 40px;\r\n}\r\n\r\n.reveal p {\r\n\tmargin-bottom: 10px;\r\n\tline-height: 1.2em;\r\n}\r\n\r\n.reveal q,\r\n.reveal blockquote {\r\n\tquotes: none;\r\n}\r\n\r\n.reveal blockquote {\r\n\tdisplay: block;\r\n\tposition: relative;\r\n\twidth: 70%;\r\n\tmargin: 5px auto;\r\n\tpadding: 5px;\r\n\r\n\tfont-style: italic;\r\n\tbackground: rgba(255, 255, 255, 0.05);\r\n\tbox-shadow: 0px 0px 2px rgba(0,0,0,0.2);\r\n}\r\n\t.reveal blockquote p:first-child,\r\n\t.reveal blockquote p:last-child {\r\n\t\tdisplay: inline-block;\r\n\t}\r\n\r\n.reveal q {\r\n\tfont-style: italic;\r\n}\r\n\r\n.reveal pre {\r\n\tdisplay: block;\r\n\tposition: relative;\r\n\twidth: 90%;\r\n\tmargin: 15px auto;\r\n\r\n\ttext-align: left;\r\n\tfont-size: 0.55em;\r\n\tfont-family: monospace;\r\n\tline-height: 1.2em;\r\n\r\n\tword-wrap: break-word;\r\n\r\n\tbox-shadow: 0px 0px 6px rgba(0,0,0,0.3);\r\n}\r\n.reveal code {\r\n\tfont-family: monospace;\r\n}\r\n.reveal pre code {\r\n\tpadding: 5px;\r\n\toverflow: auto;\r\n\tmax-height: 400px;\r\n\tword-wrap: normal;\r\n}\r\n.reveal pre.stretch code {\r\n\theight: 100%;\r\n\tmax-height: 100%;\r\n\r\n\t-webkit-box-sizing: border-box;\r\n\t   -moz-box-sizing: border-box;\r\n\t        box-sizing: border-box;\r\n}\r\n\r\n.reveal table th,\r\n.reveal table td {\r\n\ttext-align: left;\r\n\tpadding-right: .3em;\r\n}\r\n\r\n.reveal table th {\r\n\tfont-weight: bold;\r\n}\r\n\r\n.reveal sup {\r\n\tvertical-align: super;\r\n}\r\n.reveal sub {\r\n\tvertical-align: sub;\r\n}\r\n\r\n.reveal small {\r\n\tdisplay: inline-block;\r\n\tfont-size: 0.6em;\r\n\tline-height: 1.2em;\r\n\tvertical-align: top;\r\n}\r\n\r\n.reveal small * {\r\n\tvertical-align: top;\r\n}\r\n\r\n.reveal .stretch {\r\n\tmax-width: none;\r\n\tmax-height: none;\r\n}\r\n\r\n\r\n/*********************************************\r\n * CONTROLS\r\n *********************************************/\r\n\r\n.reveal .controls {\r\n\tdisplay: none;\r\n\tposition: fixed;\r\n\twidth: 110px;\r\n\theight: 110px;\r\n\tz-index: 30;\r\n\tright: 10px;\r\n\tbottom: 10px;\r\n}\r\n\r\n.reveal .controls div {\r\n\tposition: absolute;\r\n\topacity: 0.05;\r\n\twidth: 0;\r\n\theight: 0;\r\n\tborder: 12px solid transparent;\r\n\r\n\t-moz-transform: scale(.9999);\r\n\r\n\t-webkit-transition: all 0.2s ease;\r\n\t   -moz-transition: all 0.2s ease;\r\n\t    -ms-transition: all 0.2s ease;\r\n\t     -o-transition: all 0.2s ease;\r\n\t        transition: all 0.2s ease;\r\n}\r\n\r\n.reveal .controls div.enabled {\r\n\topacity: 0.7;\r\n\tcursor: pointer;\r\n}\r\n\r\n.reveal .controls div.enabled:active {\r\n\tmargin-top: 1px;\r\n}\r\n\r\n\t.reveal .controls div.navigate-left {\r\n\t\ttop: 42px;\r\n\r\n\t\tborder-right-width: 22px;\r\n\t\tborder-right-color: #eee;\r\n\t}\r\n\t\t.reveal .controls div.navigate-left.fragmented {\r\n\t\t\topacity: 0.3;\r\n\t\t}\r\n\r\n\t.reveal .controls div.navigate-right {\r\n\t\tleft: 74px;\r\n\t\ttop: 42px;\r\n\r\n\t\tborder-left-width: 22px;\r\n\t\tborder-left-color: #eee;\r\n\t}\r\n\t\t.reveal .controls div.navigate-right.fragmented {\r\n\t\t\topacity: 0.3;\r\n\t\t}\r\n\r\n\t.reveal .controls div.navigate-up {\r\n\t\tleft: 42px;\r\n\r\n\t\tborder-bottom-width: 22px;\r\n\t\tborder-bottom-color: #eee;\r\n\t}\r\n\t\t.reveal .controls div.navigate-up.fragmented {\r\n\t\t\topacity: 0.3;\r\n\t\t}\r\n\r\n\t.reveal .controls div.navigate-down {\r\n\t\tleft: 42px;\r\n\t\ttop: 74px;\r\n\r\n\t\tborder-top-width: 22px;\r\n\t\tborder-top-color: #eee;\r\n\t}\r\n\t\t.reveal .controls div.navigate-down.fragmented {\r\n\t\t\topacity: 0.3;\r\n\t\t}\r\n\r\n\r\n/*********************************************\r\n * PROGRESS BAR\r\n *********************************************/\r\n\r\n.reveal .progress {\r\n\tposition: fixed;\r\n\tdisplay: none;\r\n\theight: 3px;\r\n\twidth: 100%;\r\n\tbottom: 0;\r\n\tleft: 0;\r\n\tz-index: 10;\r\n}\r\n\t.reveal .progress:after {\r\n\t\tcontent: '';\r\n\t\tdisplay: 'block';\r\n\t\tposition: absolute;\r\n\t\theight: 20px;\r\n\t\twidth: 100%;\r\n\t\ttop: -20px;\r\n\t}\r\n\t.reveal .progress span {\r\n\t\tdisplay: block;\r\n\t\theight: 100%;\r\n\t\twidth: 0px;\r\n\r\n\t\t-webkit-transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t\t   -moz-transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t\t    -ms-transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t\t     -o-transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t\t        transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t}\r\n\r\n/*********************************************\r\n * SLIDE NUMBER\r\n *********************************************/\r\n\r\n.reveal .slide-number {\r\n\tposition: fixed;\r\n\tdisplay: block;\r\n\tright: 15px;\r\n\tbottom: 15px;\r\n\topacity: 0.5;\r\n\tz-index: 31;\r\n\tfont-size: 12px;\r\n}\r\n\r\n/*********************************************\r\n * SLIDES\r\n *********************************************/\r\n\r\n.reveal {\r\n\tposition: relative;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\r\n\t-ms-touch-action: none;\r\n}\r\n\r\n.reveal .slides {\r\n\tposition: absolute;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tleft: 50%;\r\n\ttop: 50%;\r\n\r\n\toverflow: visible;\r\n\tz-index: 1;\r\n\ttext-align: center;\r\n\r\n\t-webkit-transition: -webkit-perspective .4s ease;\r\n\t   -moz-transition: -moz-perspective .4s ease;\r\n\t    -ms-transition: -ms-perspective .4s ease;\r\n\t     -o-transition: -o-perspective .4s ease;\r\n\t        transition: perspective .4s ease;\r\n\r\n\t-webkit-perspective: 600px;\r\n\t   -moz-perspective: 600px;\r\n\t    -ms-perspective: 600px;\r\n\t        perspective: 600px;\r\n\r\n\t-webkit-perspective-origin: 0px -100px;\r\n\t   -moz-perspective-origin: 0px -100px;\r\n\t    -ms-perspective-origin: 0px -100px;\r\n\t        perspective-origin: 0px -100px;\r\n}\r\n\r\n.reveal .slides>section {\r\n\t-ms-perspective: 600px;\r\n}\r\n\r\n.reveal .slides>section,\r\n.reveal .slides>section>section {\r\n\tdisplay: none;\r\n\tposition: absolute;\r\n\twidth: 100%;\r\n\tpadding: 20px 0px;\r\n\r\n\tz-index: 10;\r\n\tline-height: 1.2em;\r\n\tfont-weight: inherit;\r\n\r\n\t-webkit-transform-style: preserve-3d;\r\n\t   -moz-transform-style: preserve-3d;\r\n\t    -ms-transform-style: preserve-3d;\r\n\t        transform-style: preserve-3d;\r\n\r\n\t-webkit-transition: -webkit-transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\t-webkit-transform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t   -moz-transition: -moz-transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\t-moz-transform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t    -ms-transition: -ms-transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\t-ms-transform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t     -o-transition: -o-transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\t-o-transform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t        transition: transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\ttransform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\r\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n}\r\n\r\n/* Global transition speed settings */\r\n.reveal[data-transition-speed=\"fast\"] .slides section {\r\n\t-webkit-transition-duration: 400ms;\r\n\t   -moz-transition-duration: 400ms;\r\n\t    -ms-transition-duration: 400ms;\r\n\t        transition-duration: 400ms;\r\n}\r\n.reveal[data-transition-speed=\"slow\"] .slides section {\r\n\t-webkit-transition-duration: 1200ms;\r\n\t   -moz-transition-duration: 1200ms;\r\n\t    -ms-transition-duration: 1200ms;\r\n\t        transition-duration: 1200ms;\r\n}\r\n\r\n/* Slide-specific transition speed overrides */\r\n.reveal .slides section[data-transition-speed=\"fast\"] {\r\n\t-webkit-transition-duration: 400ms;\r\n\t   -moz-transition-duration: 400ms;\r\n\t    -ms-transition-duration: 400ms;\r\n\t        transition-duration: 400ms;\r\n}\r\n.reveal .slides section[data-transition-speed=\"slow\"] {\r\n\t-webkit-transition-duration: 1200ms;\r\n\t   -moz-transition-duration: 1200ms;\r\n\t    -ms-transition-duration: 1200ms;\r\n\t        transition-duration: 1200ms;\r\n}\r\n\r\n.reveal .slides>section {\r\n\tleft: -50%;\r\n\ttop: -50%;\r\n}\r\n\r\n.reveal .slides>section.stack {\r\n\tpadding-top: 0;\r\n\tpadding-bottom: 0;\r\n}\r\n\r\n.reveal .slides>section.present,\r\n.reveal .slides>section>section.present {\r\n\tdisplay: block;\r\n\tz-index: 11;\r\n\topacity: 1;\r\n}\r\n\r\n.reveal.center,\r\n.reveal.center .slides,\r\n.reveal.center .slides section {\r\n\tmin-height: auto !important;\r\n}\r\n\r\n/* Don't allow interaction with invisible slides */\r\n.reveal .slides>section.future,\r\n.reveal .slides>section>section.future,\r\n.reveal .slides>section.past,\r\n.reveal .slides>section>section.past {\r\n\tpointer-events: none;\r\n}\r\n\r\n.reveal.overview .slides>section,\r\n.reveal.overview .slides>section>section {\r\n\tpointer-events: auto;\r\n}\r\n\r\n\r\n\r\n/*********************************************\r\n * DEFAULT TRANSITION\r\n *********************************************/\r\n\r\n.reveal .slides>section[data-transition=default].past,\r\n.reveal .slides>section.past {\r\n\tdisplay: block;\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\r\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\r\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\r\n\t        transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\r\n}\r\n.reveal .slides>section[data-transition=default].future,\r\n.reveal .slides>section.future {\r\n\tdisplay: block;\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\r\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\r\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\r\n\t        transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\r\n}\r\n\r\n.reveal .slides>section>section[data-transition=default].past,\r\n.reveal .slides>section>section.past {\r\n\tdisplay: block;\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\r\n\t   -moz-transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\r\n\t    -ms-transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\r\n\t        transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\r\n}\r\n.reveal .slides>section>section[data-transition=default].future,\r\n.reveal .slides>section>section.future {\r\n\tdisplay: block;\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\r\n\t   -moz-transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\r\n\t    -ms-transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\r\n\t        transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\r\n}\r\n\r\n\r\n/*********************************************\r\n * CONCAVE TRANSITION\r\n *********************************************/\r\n\r\n.reveal .slides>section[data-transition=concave].past,\r\n.reveal.concave  .slides>section.past {\r\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\r\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\r\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\r\n\t        transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\r\n}\r\n.reveal .slides>section[data-transition=concave].future,\r\n.reveal.concave .slides>section.future {\r\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\r\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\r\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\r\n\t        transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\r\n}\r\n\r\n.reveal .slides>section>section[data-transition=concave].past,\r\n.reveal.concave .slides>section>section.past {\r\n\t-webkit-transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\r\n\t   -moz-transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\r\n\t    -ms-transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\r\n\t        transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\r\n}\r\n.reveal .slides>section>section[data-transition=concave].future,\r\n.reveal.concave .slides>section>section.future {\r\n\t-webkit-transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\r\n\t   -moz-transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\r\n\t    -ms-transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\r\n\t        transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\r\n}\r\n\r\n\r\n/*********************************************\r\n * ZOOM TRANSITION\r\n *********************************************/\r\n\r\n.reveal .slides>section[data-transition=zoom],\r\n.reveal.zoom .slides>section {\r\n\t-webkit-transition-timing-function: ease;\r\n\t   -moz-transition-timing-function: ease;\r\n\t    -ms-transition-timing-function: ease;\r\n\t     -o-transition-timing-function: ease;\r\n\t        transition-timing-function: ease;\r\n}\r\n\r\n.reveal .slides>section[data-transition=zoom].past,\r\n.reveal.zoom .slides>section.past {\r\n\topacity: 0;\r\n\tvisibility: hidden;\r\n\r\n\t-webkit-transform: scale(16);\r\n\t   -moz-transform: scale(16);\r\n\t    -ms-transform: scale(16);\r\n\t     -o-transform: scale(16);\r\n\t        transform: scale(16);\r\n}\r\n.reveal .slides>section[data-transition=zoom].future,\r\n.reveal.zoom .slides>section.future {\r\n\topacity: 0;\r\n\tvisibility: hidden;\r\n\r\n\t-webkit-transform: scale(0.2);\r\n\t   -moz-transform: scale(0.2);\r\n\t    -ms-transform: scale(0.2);\r\n\t     -o-transform: scale(0.2);\r\n\t        transform: scale(0.2);\r\n}\r\n\r\n.reveal .slides>section>section[data-transition=zoom].past,\r\n.reveal.zoom .slides>section>section.past {\r\n\t-webkit-transform: translate(0, -150%);\r\n\t   -moz-transform: translate(0, -150%);\r\n\t    -ms-transform: translate(0, -150%);\r\n\t     -o-transform: translate(0, -150%);\r\n\t        transform: translate(0, -150%);\r\n}\r\n.reveal .slides>section>section[data-transition=zoom].future,\r\n.reveal.zoom .slides>section>section.future {\r\n\t-webkit-transform: translate(0, 150%);\r\n\t   -moz-transform: translate(0, 150%);\r\n\t    -ms-transform: translate(0, 150%);\r\n\t     -o-transform: translate(0, 150%);\r\n\t        transform: translate(0, 150%);\r\n}\r\n\r\n\r\n/*********************************************\r\n * LINEAR TRANSITION\r\n *********************************************/\r\n\r\n.reveal.linear section {\r\n\t-webkit-backface-visibility: hidden;\r\n\t   -moz-backface-visibility: hidden;\r\n\t    -ms-backface-visibility: hidden;\r\n\t        backface-visibility: hidden;\r\n}\r\n\r\n.reveal .slides>section[data-transition=linear].past,\r\n.reveal.linear .slides>section.past {\r\n\t-webkit-transform: translate(-150%, 0);\r\n\t   -moz-transform: translate(-150%, 0);\r\n\t    -ms-transform: translate(-150%, 0);\r\n\t     -o-transform: translate(-150%, 0);\r\n\t        transform: translate(-150%, 0);\r\n}\r\n.reveal .slides>section[data-transition=linear].future,\r\n.reveal.linear .slides>section.future {\r\n\t-webkit-transform: translate(150%, 0);\r\n\t   -moz-transform: translate(150%, 0);\r\n\t    -ms-transform: translate(150%, 0);\r\n\t     -o-transform: translate(150%, 0);\r\n\t        transform: translate(150%, 0);\r\n}\r\n\r\n.reveal .slides>section>section[data-transition=linear].past,\r\n.reveal.linear .slides>section>section.past {\r\n\t-webkit-transform: translate(0, -150%);\r\n\t   -moz-transform: translate(0, -150%);\r\n\t    -ms-transform: translate(0, -150%);\r\n\t     -o-transform: translate(0, -150%);\r\n\t        transform: translate(0, -150%);\r\n}\r\n.reveal .slides>section>section[data-transition=linear].future,\r\n.reveal.linear .slides>section>section.future {\r\n\t-webkit-transform: translate(0, 150%);\r\n\t   -moz-transform: translate(0, 150%);\r\n\t    -ms-transform: translate(0, 150%);\r\n\t     -o-transform: translate(0, 150%);\r\n\t        transform: translate(0, 150%);\r\n}\r\n\r\n\r\n/*********************************************\r\n * CUBE TRANSITION\r\n *********************************************/\r\n\r\n.reveal.cube .slides {\r\n\t-webkit-perspective: 1300px;\r\n\t   -moz-perspective: 1300px;\r\n\t    -ms-perspective: 1300px;\r\n\t        perspective: 1300px;\r\n}\r\n\r\n.reveal.cube .slides section {\r\n\tpadding: 30px;\r\n\tmin-height: 700px;\r\n\r\n\t-webkit-backface-visibility: hidden;\r\n\t   -moz-backface-visibility: hidden;\r\n\t    -ms-backface-visibility: hidden;\r\n\t        backface-visibility: hidden;\r\n\r\n\t-webkit-box-sizing: border-box;\r\n\t   -moz-box-sizing: border-box;\r\n\t        box-sizing: border-box;\r\n}\r\n\t.reveal.center.cube .slides section {\r\n\t\tmin-height: auto;\r\n\t}\r\n\t.reveal.cube .slides section:not(.stack):before {\r\n\t\tcontent: '';\r\n\t\tposition: absolute;\r\n\t\tdisplay: block;\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\tbackground: rgba(0,0,0,0.1);\r\n\t\tborder-radius: 4px;\r\n\r\n\t\t-webkit-transform: translateZ( -20px );\r\n\t\t   -moz-transform: translateZ( -20px );\r\n\t\t    -ms-transform: translateZ( -20px );\r\n\t\t     -o-transform: translateZ( -20px );\r\n\t\t        transform: translateZ( -20px );\r\n\t}\r\n\t.reveal.cube .slides section:not(.stack):after {\r\n\t\tcontent: '';\r\n\t\tposition: absolute;\r\n\t\tdisplay: block;\r\n\t\twidth: 90%;\r\n\t\theight: 30px;\r\n\t\tleft: 5%;\r\n\t\tbottom: 0;\r\n\t\tbackground: none;\r\n\t\tz-index: 1;\r\n\r\n\t\tborder-radius: 4px;\r\n\t\tbox-shadow: 0px 95px 25px rgba(0,0,0,0.2);\r\n\r\n\t\t-webkit-transform: translateZ(-90px) rotateX( 65deg );\r\n\t\t   -moz-transform: translateZ(-90px) rotateX( 65deg );\r\n\t\t    -ms-transform: translateZ(-90px) rotateX( 65deg );\r\n\t\t     -o-transform: translateZ(-90px) rotateX( 65deg );\r\n\t\t        transform: translateZ(-90px) rotateX( 65deg );\r\n\t}\r\n\r\n.reveal.cube .slides>section.stack {\r\n\tpadding: 0;\r\n\tbackground: none;\r\n}\r\n\r\n.reveal.cube .slides>section.past {\r\n\t-webkit-transform-origin: 100% 0%;\r\n\t   -moz-transform-origin: 100% 0%;\r\n\t    -ms-transform-origin: 100% 0%;\r\n\t        transform-origin: 100% 0%;\r\n\r\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg);\r\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(-90deg);\r\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(-90deg);\r\n\t        transform: translate3d(-100%, 0, 0) rotateY(-90deg);\r\n}\r\n\r\n.reveal.cube .slides>section.future {\r\n\t-webkit-transform-origin: 0% 0%;\r\n\t   -moz-transform-origin: 0% 0%;\r\n\t    -ms-transform-origin: 0% 0%;\r\n\t        transform-origin: 0% 0%;\r\n\r\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(90deg);\r\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(90deg);\r\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(90deg);\r\n\t        transform: translate3d(100%, 0, 0) rotateY(90deg);\r\n}\r\n\r\n.reveal.cube .slides>section>section.past {\r\n\t-webkit-transform-origin: 0% 100%;\r\n\t   -moz-transform-origin: 0% 100%;\r\n\t    -ms-transform-origin: 0% 100%;\r\n\t        transform-origin: 0% 100%;\r\n\r\n\t-webkit-transform: translate3d(0, -100%, 0) rotateX(90deg);\r\n\t   -moz-transform: translate3d(0, -100%, 0) rotateX(90deg);\r\n\t    -ms-transform: translate3d(0, -100%, 0) rotateX(90deg);\r\n\t        transform: translate3d(0, -100%, 0) rotateX(90deg);\r\n}\r\n\r\n.reveal.cube .slides>section>section.future {\r\n\t-webkit-transform-origin: 0% 0%;\r\n\t   -moz-transform-origin: 0% 0%;\r\n\t    -ms-transform-origin: 0% 0%;\r\n\t        transform-origin: 0% 0%;\r\n\r\n\t-webkit-transform: translate3d(0, 100%, 0) rotateX(-90deg);\r\n\t   -moz-transform: translate3d(0, 100%, 0) rotateX(-90deg);\r\n\t    -ms-transform: translate3d(0, 100%, 0) rotateX(-90deg);\r\n\t        transform: translate3d(0, 100%, 0) rotateX(-90deg);\r\n}\r\n\r\n\r\n/*********************************************\r\n * PAGE TRANSITION\r\n *********************************************/\r\n\r\n.reveal.page .slides {\r\n\t-webkit-perspective-origin: 0% 50%;\r\n\t   -moz-perspective-origin: 0% 50%;\r\n\t    -ms-perspective-origin: 0% 50%;\r\n\t        perspective-origin: 0% 50%;\r\n\r\n\t-webkit-perspective: 3000px;\r\n\t   -moz-perspective: 3000px;\r\n\t    -ms-perspective: 3000px;\r\n\t        perspective: 3000px;\r\n}\r\n\r\n.reveal.page .slides section {\r\n\tpadding: 30px;\r\n\tmin-height: 700px;\r\n\r\n\t-webkit-box-sizing: border-box;\r\n\t   -moz-box-sizing: border-box;\r\n\t        box-sizing: border-box;\r\n}\r\n\t.reveal.page .slides section.past {\r\n\t\tz-index: 12;\r\n\t}\r\n\t.reveal.page .slides section:not(.stack):before {\r\n\t\tcontent: '';\r\n\t\tposition: absolute;\r\n\t\tdisplay: block;\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\tbackground: rgba(0,0,0,0.1);\r\n\r\n\t\t-webkit-transform: translateZ( -20px );\r\n\t\t   -moz-transform: translateZ( -20px );\r\n\t\t    -ms-transform: translateZ( -20px );\r\n\t\t     -o-transform: translateZ( -20px );\r\n\t\t        transform: translateZ( -20px );\r\n\t}\r\n\t.reveal.page .slides section:not(.stack):after {\r\n\t\tcontent: '';\r\n\t\tposition: absolute;\r\n\t\tdisplay: block;\r\n\t\twidth: 90%;\r\n\t\theight: 30px;\r\n\t\tleft: 5%;\r\n\t\tbottom: 0;\r\n\t\tbackground: none;\r\n\t\tz-index: 1;\r\n\r\n\t\tborder-radius: 4px;\r\n\t\tbox-shadow: 0px 95px 25px rgba(0,0,0,0.2);\r\n\r\n\t\t-webkit-transform: translateZ(-90px) rotateX( 65deg );\r\n\t}\r\n\r\n.reveal.page .slides>section.stack {\r\n\tpadding: 0;\r\n\tbackground: none;\r\n}\r\n\r\n.reveal.page .slides>section.past {\r\n\t-webkit-transform-origin: 0% 0%;\r\n\t   -moz-transform-origin: 0% 0%;\r\n\t    -ms-transform-origin: 0% 0%;\r\n\t        transform-origin: 0% 0%;\r\n\r\n\t-webkit-transform: translate3d(-40%, 0, 0) rotateY(-80deg);\r\n\t   -moz-transform: translate3d(-40%, 0, 0) rotateY(-80deg);\r\n\t    -ms-transform: translate3d(-40%, 0, 0) rotateY(-80deg);\r\n\t        transform: translate3d(-40%, 0, 0) rotateY(-80deg);\r\n}\r\n\r\n.reveal.page .slides>section.future {\r\n\t-webkit-transform-origin: 100% 0%;\r\n\t   -moz-transform-origin: 100% 0%;\r\n\t    -ms-transform-origin: 100% 0%;\r\n\t        transform-origin: 100% 0%;\r\n\r\n\t-webkit-transform: translate3d(0, 0, 0);\r\n\t   -moz-transform: translate3d(0, 0, 0);\r\n\t    -ms-transform: translate3d(0, 0, 0);\r\n\t        transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.reveal.page .slides>section>section.past {\r\n\t-webkit-transform-origin: 0% 0%;\r\n\t   -moz-transform-origin: 0% 0%;\r\n\t    -ms-transform-origin: 0% 0%;\r\n\t        transform-origin: 0% 0%;\r\n\r\n\t-webkit-transform: translate3d(0, -40%, 0) rotateX(80deg);\r\n\t   -moz-transform: translate3d(0, -40%, 0) rotateX(80deg);\r\n\t    -ms-transform: translate3d(0, -40%, 0) rotateX(80deg);\r\n\t        transform: translate3d(0, -40%, 0) rotateX(80deg);\r\n}\r\n\r\n.reveal.page .slides>section>section.future {\r\n\t-webkit-transform-origin: 0% 100%;\r\n\t   -moz-transform-origin: 0% 100%;\r\n\t    -ms-transform-origin: 0% 100%;\r\n\t        transform-origin: 0% 100%;\r\n\r\n\t-webkit-transform: translate3d(0, 0, 0);\r\n\t   -moz-transform: translate3d(0, 0, 0);\r\n\t    -ms-transform: translate3d(0, 0, 0);\r\n\t        transform: translate3d(0, 0, 0);\r\n}\r\n\r\n\r\n/*********************************************\r\n * FADE TRANSITION\r\n *********************************************/\r\n\r\n.reveal .slides section[data-transition=fade],\r\n.reveal.fade .slides section,\r\n.reveal.fade .slides>section>section {\r\n    -webkit-transform: none;\r\n\t   -moz-transform: none;\r\n\t    -ms-transform: none;\r\n\t     -o-transform: none;\r\n\t        transform: none;\r\n\r\n\t-webkit-transition: opacity 0.5s;\r\n\t   -moz-transition: opacity 0.5s;\r\n\t    -ms-transition: opacity 0.5s;\r\n\t     -o-transition: opacity 0.5s;\r\n\t        transition: opacity 0.5s;\r\n}\r\n\r\n\r\n.reveal.fade.overview .slides section,\r\n.reveal.fade.overview .slides>section>section,\r\n.reveal.fade.overview-deactivating .slides section,\r\n.reveal.fade.overview-deactivating .slides>section>section {\r\n\t-webkit-transition: none;\r\n\t   -moz-transition: none;\r\n\t    -ms-transition: none;\r\n\t     -o-transition: none;\r\n\t        transition: none;\r\n}\r\n\r\n\r\n/*********************************************\r\n * NO TRANSITION\r\n *********************************************/\r\n\r\n.reveal .slides section[data-transition=none],\r\n.reveal.none .slides section {\r\n\t-webkit-transform: none;\r\n\t   -moz-transform: none;\r\n\t    -ms-transform: none;\r\n\t     -o-transform: none;\r\n\t        transform: none;\r\n\r\n\t-webkit-transition: none;\r\n\t   -moz-transition: none;\r\n\t    -ms-transition: none;\r\n\t     -o-transition: none;\r\n\t        transition: none;\r\n}\r\n\r\n\r\n/*********************************************\r\n * OVERVIEW\r\n *********************************************/\r\n\r\n.reveal.overview .slides {\r\n\t-webkit-perspective-origin: 0% 0%;\r\n\t   -moz-perspective-origin: 0% 0%;\r\n\t    -ms-perspective-origin: 0% 0%;\r\n\t        perspective-origin: 0% 0%;\r\n\r\n\t-webkit-perspective: 700px;\r\n\t   -moz-perspective: 700px;\r\n\t    -ms-perspective: 700px;\r\n\t        perspective: 700px;\r\n}\r\n\r\n.reveal.overview .slides section {\r\n\theight: 600px;\r\n\ttop: -300px !important;\r\n\toverflow: hidden;\r\n\topacity: 1 !important;\r\n\tvisibility: visible !important;\r\n\tcursor: pointer;\r\n\tbackground: rgba(0,0,0,0.1);\r\n}\r\n.reveal.overview .slides section .fragment {\r\n\topacity: 1;\r\n}\r\n.reveal.overview .slides section:after,\r\n.reveal.overview .slides section:before {\r\n\tdisplay: none !important;\r\n}\r\n.reveal.overview .slides section>section {\r\n\topacity: 1;\r\n\tcursor: pointer;\r\n}\r\n\t.reveal.overview .slides section:hover {\r\n\t\tbackground: rgba(0,0,0,0.3);\r\n\t}\r\n\t.reveal.overview .slides section.present {\r\n\t\tbackground: rgba(0,0,0,0.3);\r\n\t}\r\n.reveal.overview .slides>section.stack {\r\n\tpadding: 0;\r\n\ttop: 0 !important;\r\n\tbackground: none;\r\n\toverflow: visible;\r\n}\r\n\r\n\r\n/*********************************************\r\n * PAUSED MODE\r\n *********************************************/\r\n\r\n.reveal .pause-overlay {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tbackground: black;\r\n\tvisibility: hidden;\r\n\topacity: 0;\r\n\tz-index: 100;\r\n\r\n\t-webkit-transition: all 1s ease;\r\n\t   -moz-transition: all 1s ease;\r\n\t    -ms-transition: all 1s ease;\r\n\t     -o-transition: all 1s ease;\r\n\t        transition: all 1s ease;\r\n}\r\n.reveal.paused .pause-overlay {\r\n\tvisibility: visible;\r\n\topacity: 1;\r\n}\r\n\r\n\r\n/*********************************************\r\n * FALLBACK\r\n *********************************************/\r\n\r\n.no-transforms {\r\n\toverflow-y: auto;\r\n}\r\n\r\n.no-transforms .reveal .slides {\r\n\tposition: relative;\r\n\twidth: 80%;\r\n\theight: auto !important;\r\n\ttop: 0;\r\n\tleft: 50%;\r\n\tmargin: 0;\r\n\ttext-align: center;\r\n}\r\n\r\n.no-transforms .reveal .controls,\r\n.no-transforms .reveal .progress {\r\n\tdisplay: none !important;\r\n}\r\n\r\n.no-transforms .reveal .slides section {\r\n\tdisplay: block !important;\r\n\topacity: 1 !important;\r\n\tposition: relative !important;\r\n\theight: auto;\r\n\tmin-height: auto;\r\n\ttop: 0;\r\n\tleft: -50%;\r\n\tmargin: 70px 0;\r\n\r\n\t-webkit-transform: none;\r\n\t   -moz-transform: none;\r\n\t    -ms-transform: none;\r\n\t     -o-transform: none;\r\n\t        transform: none;\r\n}\r\n\r\n.no-transforms .reveal .slides section section {\r\n\tleft: 0;\r\n}\r\n\r\n.reveal .no-transition,\r\n.reveal .no-transition * {\r\n\t-webkit-transition: none !important;\r\n\t   -moz-transition: none !important;\r\n\t    -ms-transition: none !important;\r\n\t     -o-transition: none !important;\r\n\t        transition: none !important;\r\n}\r\n\r\n\r\n/*********************************************\r\n * BACKGROUND STATES [DEPRECATED]\r\n *********************************************/\r\n\r\n.reveal .state-background {\r\n\tposition: absolute;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tbackground: rgba( 0, 0, 0, 0 );\r\n\r\n\t-webkit-transition: background 800ms ease;\r\n\t   -moz-transition: background 800ms ease;\r\n\t    -ms-transition: background 800ms ease;\r\n\t     -o-transition: background 800ms ease;\r\n\t        transition: background 800ms ease;\r\n}\r\n.alert .reveal .state-background {\r\n\tbackground: rgba( 200, 50, 30, 0.6 );\r\n}\r\n.soothe .reveal .state-background {\r\n\tbackground: rgba( 50, 200, 90, 0.4 );\r\n}\r\n.blackout .reveal .state-background {\r\n\tbackground: rgba( 0, 0, 0, 0.6 );\r\n}\r\n.whiteout .reveal .state-background {\r\n\tbackground: rgba( 255, 255, 255, 0.6 );\r\n}\r\n.cobalt .reveal .state-background {\r\n\tbackground: rgba( 22, 152, 213, 0.6 );\r\n}\r\n.mint .reveal .state-background {\r\n\tbackground: rgba( 22, 213, 75, 0.6 );\r\n}\r\n.submerge .reveal .state-background {\r\n\tbackground: rgba( 12, 25, 77, 0.6);\r\n}\r\n.lila .reveal .state-background {\r\n\tbackground: rgba( 180, 50, 140, 0.6 );\r\n}\r\n.sunset .reveal .state-background {\r\n\tbackground: rgba( 255, 122, 0, 0.6 );\r\n}\r\n\r\n\r\n/*********************************************\r\n * PER-SLIDE BACKGROUNDS\r\n *********************************************/\r\n\r\n.reveal>.backgrounds {\r\n\tposition: absolute;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\r\n\t-webkit-perspective: 600px;\r\n\t   -moz-perspective: 600px;\r\n\t    -ms-perspective: 600px;\r\n\t        perspective: 600px;\r\n}\r\n\t.reveal .slide-background {\r\n\t\tposition: absolute;\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t\topacity: 0;\r\n\t\tvisibility: hidden;\r\n\r\n\t\tbackground-color: rgba( 0, 0, 0, 0 );\r\n\t\tbackground-position: 50% 50%;\r\n\t\tbackground-repeat: no-repeat;\r\n\t\tbackground-size: cover;\r\n\r\n\t\t-webkit-transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t\t   -moz-transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t\t    -ms-transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t\t     -o-transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t\t        transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\r\n\t}\r\n\t.reveal .slide-background.present {\r\n\t\topacity: 1;\r\n\t\tvisibility: visible;\r\n\t}\r\n\r\n\t.print-pdf .reveal .slide-background {\r\n\t\topacity: 1 !important;\r\n\t\tvisibility: visible !important;\r\n\t}\r\n\r\n/* Immediate transition style */\r\n.reveal[data-background-transition=none]>.backgrounds .slide-background,\r\n.reveal>.backgrounds .slide-background[data-background-transition=none] {\r\n\t-webkit-transition: none;\r\n\t   -moz-transition: none;\r\n\t    -ms-transition: none;\r\n\t     -o-transition: none;\r\n\t        transition: none;\r\n}\r\n\r\n/* 2D slide */\r\n.reveal[data-background-transition=slide]>.backgrounds .slide-background,\r\n.reveal>.backgrounds .slide-background[data-background-transition=slide] {\r\n\topacity: 1;\r\n\r\n\t-webkit-backface-visibility: hidden;\r\n\t   -moz-backface-visibility: hidden;\r\n\t    -ms-backface-visibility: hidden;\r\n\t        backface-visibility: hidden;\r\n}\r\n\t.reveal[data-background-transition=slide]>.backgrounds .slide-background.past,\r\n\t.reveal>.backgrounds .slide-background.past[data-background-transition=slide] {\r\n\t\t-webkit-transform: translate(-100%, 0);\r\n\t\t   -moz-transform: translate(-100%, 0);\r\n\t\t    -ms-transform: translate(-100%, 0);\r\n\t\t     -o-transform: translate(-100%, 0);\r\n\t\t        transform: translate(-100%, 0);\r\n\t}\r\n\t.reveal[data-background-transition=slide]>.backgrounds .slide-background.future,\r\n\t.reveal>.backgrounds .slide-background.future[data-background-transition=slide] {\r\n\t\t-webkit-transform: translate(100%, 0);\r\n\t\t   -moz-transform: translate(100%, 0);\r\n\t\t    -ms-transform: translate(100%, 0);\r\n\t\t     -o-transform: translate(100%, 0);\r\n\t\t        transform: translate(100%, 0);\r\n\t}\r\n\r\n\t.reveal[data-background-transition=slide]>.backgrounds .slide-background>.slide-background.past,\r\n\t.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=slide] {\r\n\t\t-webkit-transform: translate(0, -100%);\r\n\t\t   -moz-transform: translate(0, -100%);\r\n\t\t    -ms-transform: translate(0, -100%);\r\n\t\t     -o-transform: translate(0, -100%);\r\n\t\t        transform: translate(0, -100%);\r\n\t}\r\n\t.reveal[data-background-transition=slide]>.backgrounds .slide-background>.slide-background.future,\r\n\t.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=slide] {\r\n\t\t-webkit-transform: translate(0, 100%);\r\n\t\t   -moz-transform: translate(0, 100%);\r\n\t\t    -ms-transform: translate(0, 100%);\r\n\t\t     -o-transform: translate(0, 100%);\r\n\t\t        transform: translate(0, 100%);\r\n\t}\r\n\r\n\r\n/* Convex */\r\n.reveal[data-background-transition=convex]>.backgrounds .slide-background.past,\r\n.reveal>.backgrounds .slide-background.past[data-background-transition=convex] {\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\r\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\r\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\r\n\t        transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\r\n}\r\n.reveal[data-background-transition=convex]>.backgrounds .slide-background.future,\r\n.reveal>.backgrounds .slide-background.future[data-background-transition=convex] {\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\r\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\r\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\r\n\t        transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\r\n}\r\n\r\n.reveal[data-background-transition=convex]>.backgrounds .slide-background>.slide-background.past,\r\n.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=convex] {\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\r\n\t   -moz-transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\r\n\t    -ms-transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\r\n\t        transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\r\n}\r\n.reveal[data-background-transition=convex]>.backgrounds .slide-background>.slide-background.future,\r\n.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=convex] {\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\r\n\t   -moz-transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\r\n\t    -ms-transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\r\n\t        transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\r\n}\r\n\r\n\r\n/* Concave */\r\n.reveal[data-background-transition=concave]>.backgrounds .slide-background.past,\r\n.reveal>.backgrounds .slide-background.past[data-background-transition=concave] {\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\r\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\r\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\r\n\t        transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\r\n}\r\n.reveal[data-background-transition=concave]>.backgrounds .slide-background.future,\r\n.reveal>.backgrounds .slide-background.future[data-background-transition=concave] {\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\r\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\r\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\r\n\t        transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\r\n}\r\n\r\n.reveal[data-background-transition=concave]>.backgrounds .slide-background>.slide-background.past,\r\n.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=concave] {\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\r\n\t   -moz-transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\r\n\t    -ms-transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\r\n\t        transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\r\n}\r\n.reveal[data-background-transition=concave]>.backgrounds .slide-background>.slide-background.future,\r\n.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=concave] {\r\n\topacity: 0;\r\n\r\n\t-webkit-transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\r\n\t   -moz-transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\r\n\t    -ms-transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\r\n\t        transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\r\n}\r\n\r\n/* Zoom */\r\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background,\r\n.reveal>.backgrounds .slide-background[data-background-transition=zoom] {\r\n\t-webkit-transition-timing-function: ease;\r\n\t   -moz-transition-timing-function: ease;\r\n\t    -ms-transition-timing-function: ease;\r\n\t     -o-transition-timing-function: ease;\r\n\t        transition-timing-function: ease;\r\n}\r\n\r\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background.past,\r\n.reveal>.backgrounds .slide-background.past[data-background-transition=zoom] {\r\n\topacity: 0;\r\n\tvisibility: hidden;\r\n\r\n\t-webkit-transform: scale(16);\r\n\t   -moz-transform: scale(16);\r\n\t    -ms-transform: scale(16);\r\n\t     -o-transform: scale(16);\r\n\t        transform: scale(16);\r\n}\r\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background.future,\r\n.reveal>.backgrounds .slide-background.future[data-background-transition=zoom] {\r\n\topacity: 0;\r\n\tvisibility: hidden;\r\n\r\n\t-webkit-transform: scale(0.2);\r\n\t   -moz-transform: scale(0.2);\r\n\t    -ms-transform: scale(0.2);\r\n\t     -o-transform: scale(0.2);\r\n\t        transform: scale(0.2);\r\n}\r\n\r\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background>.slide-background.past,\r\n.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=zoom] {\r\n\topacity: 0;\r\n\t\tvisibility: hidden;\r\n\r\n\t\t-webkit-transform: scale(16);\r\n\t\t   -moz-transform: scale(16);\r\n\t\t    -ms-transform: scale(16);\r\n\t\t     -o-transform: scale(16);\r\n\t\t        transform: scale(16);\r\n}\r\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background>.slide-background.future,\r\n.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=zoom] {\r\n\topacity: 0;\r\n\tvisibility: hidden;\r\n\r\n\t-webkit-transform: scale(0.2);\r\n\t   -moz-transform: scale(0.2);\r\n\t    -ms-transform: scale(0.2);\r\n\t     -o-transform: scale(0.2);\r\n\t        transform: scale(0.2);\r\n}\r\n\r\n\r\n/* Global transition speed settings */\r\n.reveal[data-transition-speed=\"fast\"]>.backgrounds .slide-background {\r\n\t-webkit-transition-duration: 400ms;\r\n\t   -moz-transition-duration: 400ms;\r\n\t    -ms-transition-duration: 400ms;\r\n\t        transition-duration: 400ms;\r\n}\r\n.reveal[data-transition-speed=\"slow\"]>.backgrounds .slide-background {\r\n\t-webkit-transition-duration: 1200ms;\r\n\t   -moz-transition-duration: 1200ms;\r\n\t    -ms-transition-duration: 1200ms;\r\n\t        transition-duration: 1200ms;\r\n}\r\n\r\n\r\n/*********************************************\r\n * RTL SUPPORT\r\n *********************************************/\r\n\r\n.reveal.rtl .slides,\r\n.reveal.rtl .slides h1,\r\n.reveal.rtl .slides h2,\r\n.reveal.rtl .slides h3,\r\n.reveal.rtl .slides h4,\r\n.reveal.rtl .slides h5,\r\n.reveal.rtl .slides h6 {\r\n\tdirection: rtl;\r\n\tfont-family: sans-serif;\r\n}\r\n\r\n.reveal.rtl pre,\r\n.reveal.rtl code {\r\n\tdirection: ltr;\r\n}\r\n\r\n.reveal.rtl ol,\r\n.reveal.rtl ul {\r\n\ttext-align: right;\r\n}\r\n\r\n.reveal.rtl .progress span {\r\n\tfloat: right\r\n}\r\n\r\n/*********************************************\r\n * PARALLAX BACKGROUND\r\n *********************************************/\r\n\r\n.reveal.has-parallax-background .backgrounds {\r\n\t-webkit-transition: all 0.8s ease;\r\n\t   -moz-transition: all 0.8s ease;\r\n\t    -ms-transition: all 0.8s ease;\r\n\t        transition: all 0.8s ease;\r\n}\r\n\r\n/* Global transition speed settings */\r\n.reveal.has-parallax-background[data-transition-speed=\"fast\"] .backgrounds {\r\n\t-webkit-transition-duration: 400ms;\r\n\t   -moz-transition-duration: 400ms;\r\n\t    -ms-transition-duration: 400ms;\r\n\t        transition-duration: 400ms;\r\n}\r\n.reveal.has-parallax-background[data-transition-speed=\"slow\"] .backgrounds {\r\n\t-webkit-transition-duration: 1200ms;\r\n\t   -moz-transition-duration: 1200ms;\r\n\t    -ms-transition-duration: 1200ms;\r\n\t        transition-duration: 1200ms;\r\n}\r\n\r\n\r\n/*********************************************\r\n * LINK PREVIEW OVERLAY\r\n *********************************************/\r\n\r\n .reveal .preview-link-overlay {\r\n \tposition: absolute;\r\n \ttop: 0;\r\n \tleft: 0;\r\n \twidth: 100%;\r\n \theight: 100%;\r\n \tz-index: 1000;\r\n \tbackground: rgba( 0, 0, 0, 0.9 );\r\n \topacity: 0;\r\n \tvisibility: hidden;\r\n\r\n \t-webkit-transition: all 0.3s ease;\r\n \t   -moz-transition: all 0.3s ease;\r\n \t    -ms-transition: all 0.3s ease;\r\n \t        transition: all 0.3s ease;\r\n }\r\n \t.reveal .preview-link-overlay.visible {\r\n \t\topacity: 1;\r\n \t\tvisibility: visible;\r\n \t}\r\n\r\n \t.reveal .preview-link-overlay .spinner {\r\n \t\tposition: absolute;\r\n \t\tdisplay: block;\r\n \t\ttop: 50%;\r\n \t\tleft: 50%;\r\n \t\twidth: 32px;\r\n \t\theight: 32px;\r\n \t\tmargin: -16px 0 0 -16px;\r\n \t\tz-index: 10;\r\n \t\tbackground-image: url(data:image/gif;base64,R0lGODlhIAAgAPMAAJmZmf%2F%2F%2F6%2Bvr8nJybW1tcDAwOjo6Nvb26ioqKOjo7Ozs%2FLy8vz8%2FAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ%2FV%2FnmOM82XiHRLYKhKP1oZmADdEAAAh%2BQQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY%2FCZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB%2BA4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6%2BHo7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq%2BB6QDtuetcaBPnW6%2BO7wDHpIiK9SaVK5GgV543tzjgGcghAgAh%2BQQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK%2B%2BG%2Bw48edZPK%2BM6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE%2BG%2BcD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm%2BFNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk%2BaV%2BoJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0%2FVNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc%2BXiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30%2FiI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE%2FjiuL04RGEBgwWhShRgQExHBAAh%2BQQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR%2BipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY%2BYip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd%2BMFCN6HAAIKgNggY0KtEBAAh%2BQQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1%2BvsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d%2BjYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg%2BygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0%2Bbm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h%2BKr0SJ8MFihpNbx%2B4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX%2BBP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA%3D%3D);\r\n\r\n \t\tvisibility: visible;\r\n \t\topacity: 0.6;\r\n\r\n \t\t-webkit-transition: all 0.3s ease;\r\n \t\t   -moz-transition: all 0.3s ease;\r\n \t\t    -ms-transition: all 0.3s ease;\r\n \t\t        transition: all 0.3s ease;\r\n \t}\r\n\r\n \t.reveal .preview-link-overlay header {\r\n \t\tposition: absolute;\r\n \t\tleft: 0;\r\n \t\ttop: 0;\r\n \t\twidth: 100%;\r\n \t\theight: 40px;\r\n \t\tz-index: 2;\r\n \t\tborder-bottom: 1px solid #222;\r\n \t}\r\n \t\t.reveal .preview-link-overlay header a {\r\n \t\t\tdisplay: inline-block;\r\n \t\t\twidth: 40px;\r\n \t\t\theight: 40px;\r\n \t\t\tpadding: 0 10px;\r\n \t\t\tfloat: right;\r\n \t\t\topacity: 0.6;\r\n\r\n \t\t\tbox-sizing: border-box;\r\n \t\t}\r\n \t\t\t.reveal .preview-link-overlay header a:hover {\r\n \t\t\t\topacity: 1;\r\n \t\t\t}\r\n \t\t\t.reveal .preview-link-overlay header a .icon {\r\n \t\t\t\tdisplay: inline-block;\r\n \t\t\t\twidth: 20px;\r\n \t\t\t\theight: 20px;\r\n\r\n \t\t\t\tbackground-position: 50% 50%;\r\n \t\t\t\tbackground-size: 100%;\r\n \t\t\t\tbackground-repeat: no-repeat;\r\n \t\t\t}\r\n \t\t\t.reveal .preview-link-overlay header a.close .icon {\r\n \t\t\t\tbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABkklEQVRYR8WX4VHDMAxG6wnoJrABZQPYBCaBTWAD2g1gE5gg6OOsXuxIlr40d81dfrSJ9V4c2VLK7spHuTJ/5wpM07QXuXc5X0opX2tEJcadjHuV80li/FgxTIEK/5QBCICBD6xEhSMGHgQPgBgLiYVAB1dpSqKDawxTohFw4JSEA3clzgIBPCURwE2JucBR7rhPJJv5OpJwDX+SfDjgx1wACQeJG1aChP9K/IMmdZ8DtESV1WyP3Bt4MwM6sj4NMxMYiqUWHQu4KYA/SYkIjOsm3BXYWMKFDwU2khjCQ4ELJUJ4SmClRArOCmSXGuKma0fYD5CbzHxFpCSGAhfAVSSUGDUk2BWZaff2g6GE15BsBQ9nwmpIGDiyHQddwNTMKkbZaf9fajXQca1EX44puJZUsnY0ObGmITE3GVLCbEhQUjGVt146j6oasWN+49Vph2w1pZ5EansNZqKBm1txbU57iRRcZ86RWMDdWtBJUHBHwoQPi1GV+JCbntmvok7iTX4/Up9mgyTc/FJYDTcndgH/AA5A/CHsyEkVAAAAAElFTkSuQmCC);\r\n \t\t\t}\r\n \t\t\t.reveal .preview-link-overlay header a.external .icon {\r\n \t\t\t\tbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAcElEQVRYR+2WSQoAIQwEzf8f7XiOMkUQxUPlGkM3hVmiQfQR9GYnH1SsAQlI4DiBqkCMoNb9y2e90IAEJPAcgdznU9+engMaeJ7Azh5Y1U67gAho4DqBqmB1buAf0MB1AlVBek83ZPkmJMGc1wAR+AAqod/B97TRpQAAAABJRU5ErkJggg==);\r\n \t\t\t}\r\n\r\n \t.reveal .preview-link-overlay .viewport {\r\n \t\tposition: absolute;\r\n \t\ttop: 40px;\r\n \t\tright: 0;\r\n \t\tbottom: 0;\r\n \t\tleft: 0;\r\n \t}\r\n\r\n \t.reveal .preview-link-overlay .viewport iframe {\r\n \t\twidth: 100%;\r\n \t\theight: 100%;\r\n \t\tmax-width: 100%;\r\n \t\tmax-height: 100%;\r\n \t\tborder: 0;\r\n\r\n \t\topacity: 0;\r\n \t\tvisibility: hidden;\r\n\r\n \t\t-webkit-transition: all 0.3s ease;\r\n \t\t   -moz-transition: all 0.3s ease;\r\n \t\t    -ms-transition: all 0.3s ease;\r\n \t\t        transition: all 0.3s ease;\r\n \t}\r\n\r\n \t.reveal .preview-link-overlay.loaded .viewport iframe {\r\n \t\topacity: 1;\r\n \t\tvisibility: visible;\r\n \t}\r\n\r\n \t.reveal .preview-link-overlay.loaded .spinner {\r\n \t\topacity: 0;\r\n \t\tvisibility: hidden;\r\n\r\n \t\t-webkit-transform: scale(0.2);\r\n \t\t   -moz-transform: scale(0.2);\r\n \t\t    -ms-transform: scale(0.2);\r\n \t\t        transform: scale(0.2);\r\n \t}\r\n\r\n\r\n\r\n/*********************************************\r\n * PLAYBACK COMPONENT\r\n *********************************************/\r\n\r\n.reveal .playback {\r\n\tposition: fixed;\r\n\tleft: 15px;\r\n\tbottom: 15px;\r\n\tz-index: 30;\r\n\tcursor: pointer;\r\n\r\n\t-webkit-transition: all 400ms ease;\r\n\t   -moz-transition: all 400ms ease;\r\n\t    -ms-transition: all 400ms ease;\r\n\t        transition: all 400ms ease;\r\n}\r\n\r\n.reveal.overview .playback {\r\n\topacity: 0;\r\n\tvisibility: hidden;\r\n}\r\n\r\n\r\n/*********************************************\r\n * ROLLING LINKS\r\n *********************************************/\r\n\r\n.reveal .roll {\r\n\tdisplay: inline-block;\r\n\tline-height: 1.2;\r\n\toverflow: hidden;\r\n\r\n\tvertical-align: top;\r\n\r\n\t-webkit-perspective: 400px;\r\n\t   -moz-perspective: 400px;\r\n\t    -ms-perspective: 400px;\r\n\t        perspective: 400px;\r\n\r\n\t-webkit-perspective-origin: 50% 50%;\r\n\t   -moz-perspective-origin: 50% 50%;\r\n\t    -ms-perspective-origin: 50% 50%;\r\n\t        perspective-origin: 50% 50%;\r\n}\r\n\t.reveal .roll:hover {\r\n\t\tbackground: none;\r\n\t\ttext-shadow: none;\r\n\t}\r\n.reveal .roll span {\r\n\tdisplay: block;\r\n\tposition: relative;\r\n\tpadding: 0 2px;\r\n\r\n\tpointer-events: none;\r\n\r\n\t-webkit-transition: all 400ms ease;\r\n\t   -moz-transition: all 400ms ease;\r\n\t    -ms-transition: all 400ms ease;\r\n\t        transition: all 400ms ease;\r\n\r\n\t-webkit-transform-origin: 50% 0%;\r\n\t   -moz-transform-origin: 50% 0%;\r\n\t    -ms-transform-origin: 50% 0%;\r\n\t        transform-origin: 50% 0%;\r\n\r\n\t-webkit-transform-style: preserve-3d;\r\n\t   -moz-transform-style: preserve-3d;\r\n\t    -ms-transform-style: preserve-3d;\r\n\t        transform-style: preserve-3d;\r\n\r\n\t-webkit-backface-visibility: hidden;\r\n\t   -moz-backface-visibility: hidden;\r\n\t        backface-visibility: hidden;\r\n}\r\n\t.reveal .roll:hover span {\r\n\t    background: rgba(0,0,0,0.5);\r\n\r\n\t    -webkit-transform: translate3d( 0px, 0px, -45px ) rotateX( 90deg );\r\n\t       -moz-transform: translate3d( 0px, 0px, -45px ) rotateX( 90deg );\r\n\t        -ms-transform: translate3d( 0px, 0px, -45px ) rotateX( 90deg );\r\n\t            transform: translate3d( 0px, 0px, -45px ) rotateX( 90deg );\r\n\t}\r\n.reveal .roll span:after {\r\n\tcontent: attr(data-title);\r\n\r\n\tdisplay: block;\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tpadding: 0 2px;\r\n\r\n\t-webkit-backface-visibility: hidden;\r\n\t   -moz-backface-visibility: hidden;\r\n\t        backface-visibility: hidden;\r\n\r\n\t-webkit-transform-origin: 50% 0%;\r\n\t   -moz-transform-origin: 50% 0%;\r\n\t    -ms-transform-origin: 50% 0%;\r\n\t        transform-origin: 50% 0%;\r\n\r\n\t-webkit-transform: translate3d( 0px, 110%, 0px ) rotateX( -90deg );\r\n\t   -moz-transform: translate3d( 0px, 110%, 0px ) rotateX( -90deg );\r\n\t    -ms-transform: translate3d( 0px, 110%, 0px ) rotateX( -90deg );\r\n\t        transform: translate3d( 0px, 110%, 0px ) rotateX( -90deg );\r\n}\r\n\r\n\r\n/*********************************************\r\n * SPEAKER NOTES\r\n *********************************************/\r\n\r\n.reveal aside.notes {\r\n\tdisplay: none;\r\n}\r\n\r\n\r\n/*********************************************\r\n * ZOOM PLUGIN\r\n *********************************************/\r\n\r\n.zoomed .reveal *,\r\n.zoomed .reveal *:before,\r\n.zoomed .reveal *:after {\r\n\t-webkit-transform: none !important;\r\n\t   -moz-transform: none !important;\r\n\t    -ms-transform: none !important;\r\n\t        transform: none !important;\r\n\r\n\t-webkit-backface-visibility: visible !important;\r\n\t   -moz-backface-visibility: visible !important;\r\n\t    -ms-backface-visibility: visible !important;\r\n\t        backface-visibility: visible !important;\r\n}\r\n\r\n.zoomed .reveal .progress,\r\n.zoomed .reveal .controls {\r\n\topacity: 0;\r\n}\r\n\r\n.zoomed .reveal .roll span {\r\n\tbackground: none;\r\n}\r\n\r\n.zoomed .reveal .roll span:after {\r\n\tvisibility: hidden;\r\n}\r\n\r\n\r\n", ""]);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content);
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		module.hot.accept(19, function() {
			var newContent = __webpack_require__(19);
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Lato:300,700,300italic,700italic);", ""]);
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,700,300italic,700italic);", ""]);
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Abril+Fatface);", ""]);
	exports.push([module.id, "\n\n\n/**\r\n * Default theme for reveal.js.\r\n *\r\n * Copyright (C) 2011-2012 Hakim El Hattab, http://hakim.se\r\n */\n@font-face {\n  font-family: 'Lato';\n  weight: normal;\n  font-style: normal; }\n\n/*********************************************\r\n * GLOBAL STYLES\r\n *********************************************/\nbody {\n  background: #2b2b2b;\n  background-color: #2b2b2b; }\n\n.reveal {\n  font-family: 'Open Sans', sans-serif;\n  font-size: 34px;\n  font-weight: normal;\n  letter-spacing: -0.02em;\n  color: #eee; }\n\n::selection {\n  color: #fff;\n  background: #FF5E99;\n  text-shadow: none; }\n\n/*********************************************\r\n * HEADERS\r\n *********************************************/\n.reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6 {\n  margin: 10px 0 5px 0;\n  color: #eee;\n  font-family: 'Abril Fatface', serif;\n  line-height: 0.9em;\n  letter-spacing: 0.02em;\n  text-transform: none;\n  text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2); }\n\n.reveal h1 {\n  text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2); }\n\n/*********************************************\r\n * LINKS\r\n *********************************************/\n.reveal a:not(.image) {\n  color: #13DAEC;\n  text-decoration: none;\n  -webkit-transition: color 0.15s ease;\n  -moz-transition: color 0.15s ease;\n  -ms-transition: color 0.15s ease;\n  -o-transition: color 0.15s ease;\n  transition: color 0.15s ease; }\n\n.reveal a:not(.image):hover {\n  color: #71e9f4;\n  text-shadow: none;\n  border: none; }\n\n.reveal .roll span:after {\n  color: #fff;\n  background: #0d99a5; }\n\n/*********************************************\r\n * IMAGES\r\n *********************************************/\n.reveal section img {\n  margin: 15px 0px;\n  background: rgba(255, 255, 255, 0.12);\n  border: 4px solid #eee;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);\n  -webkit-transition: all 0.2s linear;\n  -moz-transition: all 0.2s linear;\n  -ms-transition: all 0.2s linear;\n  -o-transition: all 0.2s linear;\n  transition: all 0.2s linear; }\n\n.reveal a:hover img {\n  background: rgba(255, 255, 255, 0.2);\n  border-color: #13DAEC;\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.55); }\n\n/*********************************************\r\n * NAVIGATION CONTROLS\r\n *********************************************/\n.reveal .controls div.navigate-left, .reveal .controls div.navigate-left.enabled {\n  border-right-color: #13DAEC; }\n\n.reveal .controls div.navigate-right, .reveal .controls div.navigate-right.enabled {\n  border-left-color: #13DAEC; }\n\n.reveal .controls div.navigate-up, .reveal .controls div.navigate-up.enabled {\n  border-bottom-color: #13DAEC; }\n\n.reveal .controls div.navigate-down, .reveal .controls div.navigate-down.enabled {\n  border-top-color: #13DAEC; }\n\n.reveal .controls div.navigate-left.enabled:hover {\n  border-right-color: #71e9f4; }\n\n.reveal .controls div.navigate-right.enabled:hover {\n  border-left-color: #71e9f4; }\n\n.reveal .controls div.navigate-up.enabled:hover {\n  border-bottom-color: #71e9f4; }\n\n.reveal .controls div.navigate-down.enabled:hover {\n  border-top-color: #71e9f4; }\n\n/*********************************************\r\n * PROGRESS BAR\r\n *********************************************/\n.reveal .progress {\n  background: rgba(0, 0, 0, 0.2); }\n\n.reveal .progress span {\n  background: #13DAEC;\n  -webkit-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  -moz-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  -ms-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  -o-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985); }\n\n/*********************************************\r\n * SLIDE NUMBER\r\n *********************************************/\n.reveal .slide-number {\n  color: #13DAEC; }\n\n.reveal .slides {\n  text-align: left;\n  letter-spacing: 0; }\n  .reveal .slides h1 {\n    margin-bottom: 40px; }\n  .reveal .slides h2, .reveal .slides h3 {\n    margin: 0 0 130px 0; }\n  .reveal .slides li, .reveal .slides p, .reveal .slides blockquote {\n    padding-bottom: 40px; }\n  .reveal .slides li {\n    list-style-type: disc;\n    list-style-position: inside;\n    text-indent: -1em;\n    padding-left: 1em; }\n  .reveal .slides pre code {\n    margin-top: 50px;\n    margin-bottom: 50px;\n    max-height: 650px;\n    font-size: 24px;\n    line-height: 30px; }\n  .reveal .slides [data-state=\"white-background\"] h2, .reveal .slides [data-state=\"white-background\"] h3, .reveal .slides [data-state=\"white-background\"] h4, .reveal .slides [data-state=\"white-background\"] p {\n    color: #3B3B3B; }\n\n.white-background .state-background {\n  background-color: #EDEDED; }\n", ""]);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content);
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		module.hot.accept(21, function() {
			var newContent = __webpack_require__(21);
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	exports.push([module.id, "/*\r\n\r\nZenburn style from voldmar.ru (c) Vladimir Epifanov <voldmar@voldmar.ru>\r\nbased on dark.css by Ivan Sagalaev\r\n\r\n*/\r\n\r\npre code {\r\n  display: block; padding: 0.5em;\r\n  background: #3F3F3F;\r\n  color: #DCDCDC;\r\n}\r\n\r\npre .keyword,\r\npre .tag,\r\npre .css .class,\r\npre .css .id,\r\npre .lisp .title,\r\npre .nginx .title,\r\npre .request,\r\npre .status,\r\npre .clojure .attribute {\r\n  color: #E3CEAB;\r\n}\r\n\r\npre .django .template_tag,\r\npre .django .variable,\r\npre .django .filter .argument {\r\n  color: #DCDCDC;\r\n}\r\n\r\npre .number,\r\npre .date {\r\n  color: #8CD0D3;\r\n}\r\n\r\npre .dos .envvar,\r\npre .dos .stream,\r\npre .variable,\r\npre .apache .sqbracket {\r\n  color: #EFDCBC;\r\n}\r\n\r\npre .dos .flow,\r\npre .diff .change,\r\npre .python .exception,\r\npre .python .built_in,\r\npre .literal,\r\npre .tex .special {\r\n  color: #EFEFAF;\r\n}\r\n\r\npre .diff .chunk,\r\npre .subst {\r\n  color: #8F8F8F;\r\n}\r\n\r\npre .dos .keyword,\r\npre .python .decorator,\r\npre .title,\r\npre .haskell .type,\r\npre .diff .header,\r\npre .ruby .class .parent,\r\npre .apache .tag,\r\npre .nginx .built_in,\r\npre .tex .command,\r\npre .prompt {\r\n    color: #efef8f;\r\n}\r\n\r\npre .dos .winutils,\r\npre .ruby .symbol,\r\npre .ruby .symbol .string,\r\npre .ruby .string {\r\n  color: #DCA3A3;\r\n}\r\n\r\npre .diff .deletion,\r\npre .string,\r\npre .tag .value,\r\npre .preprocessor,\r\npre .built_in,\r\npre .sql .aggregate,\r\npre .javadoc,\r\npre .smalltalk .class,\r\npre .smalltalk .localvars,\r\npre .smalltalk .array,\r\npre .css .rules .value,\r\npre .attr_selector,\r\npre .pseudo,\r\npre .apache .cbracket,\r\npre .tex .formula {\r\n  color: #CC9393;\r\n}\r\n\r\npre .shebang,\r\npre .diff .addition,\r\npre .comment,\r\npre .java .annotation,\r\npre .template_comment,\r\npre .pi,\r\npre .doctype {\r\n  color: #7F9F7F;\r\n}\r\n\r\npre .coffeescript .javascript,\r\npre .javascript .xml,\r\npre .tex .formula,\r\npre .xml .javascript,\r\npre .xml .vbscript,\r\npre .xml .css,\r\npre .xml .cdata {\r\n  opacity: 0.5;\r\n}", ""]);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {};

	module.exports = function(list) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styles = listToStyles(list);
		addStylesToDom(styles);
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j]));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j]));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			// var sourceMap = item[3];
			var part = {css: css, media: media/*, sourceMap: sourceMap*/};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function addStyle(obj) {
		var styleElement = document.createElement("style");
		var head = document.head || document.getElementsByTagName("head")[0];
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		applyToTag(styleElement, obj);
		return function(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media /*&& newObj.sourceMap === obj.sourceMap*/)
					return;
				applyToTag(styleElement, obj = newObj);
			} else {
				head.removeChild(styleElement);
			}
		};
	};

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		// var sourceMap = obj.sourceMap;

		// No browser support
		// if(sourceMap && typeof btoa === "function") {
			// try {
				// css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
			// } catch(e) {}
		// }
		if(media) {
			styleElement.setAttribute("media", media)
		}
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}

	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "4bcdb425cc2cbe8b8a0ad97184feb188.png"

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<section><h1>Webpack</h1><h3>The cool kids' Javascript bundler</h3></section><section><h2>Agenda</h2><ul><li>Why do we need bundlers and what should they be capable of?</li><li>Review of the main competitors of Webpack</li><li>Why Webpack and how do you use it?</li><li>Live Demo</li></ul></section><section><h2>About me</h2><h5>Name</h5><p>Reto Schläpfer</p><h5>Work</h5><p>React.js/Flux & Finance related backend stuff in Python at <i>Bluevalor AG</i></p><h5>Blog</h5><p>www.code-experience.com</p><h5>Twitter</h5><p><i>@Retolements</i></p><h5>GitHub</h5><p><i>Retozi</i></p><aside>blabla\n\n</aside></section><section><h2>Why do we need a bundler?</h2><div class=\"fragment\"><p>Because modules should be small, and loading many modules through HTTP-Requests is slow.</p><p>Bundling modules reduces the amount of necessary HTTP-Requests to load our app.</p></div></section><section><h2>Requirements for a good bundler</h2></section><section><h2>For production</h2><p><i>A bundling strategy that makes your app load quickly:</i></p><p>-> Deliver modules that are needed at the same time in one HTTP-Request.</p><p>-> Deliver independent modules seperately.</p><p>-> Optimize size of bundles and their caching.</p></section><section><h2>For Development</h2><p>Deliver changes to modules instantly.</p><p>Importing dependencies into your modules should be easy.</p><p>Minimal configuration / processing scripts.</p></section><section><h2>RequireJS vs Browserify</h2></section><section><h2>RequireJS</h2><p>AMD style modules</p><pre><code class=\"hljs javascript\">define([\n  'jquery',\n  'underscore',\n  'backbone',\n  'router',\n], function($, _, Backbone, Router){\n  var initialize = function(){\n    Router.initialize();\n  }\n\n  return {\n    initialize: initialize\n  };\n});\n</code></pre></section><section><h2>RequireJS: The Good</h2><ul><li>Battle proven</li><li>Asynchronous loading in the core (default in dev-mode)</li></ul></section><section><h2>RequireJS: The Bad</h2><ul><li>AMD is out, CommonJS is in (npm EVERYTHING)</li><li>A lot is possible, but everything requires massive configuration</li><li>Dev-mode doesn't scale</li></ul></section><section><h2>Browserify</h2><p>CommonJS style modules</p><pre><code class=\"hjs javascript\">var $ = require('jquery');\nvar _ = require('lodash');\nvar backbone = require('backbone');\nvar router = require('Router');\n\n  var initialize = function(){\n    Router.initialize();\n  }\n\nmodule.exports = initialize;\n</code></pre></section><section><h2>Browserify: The Good</h2><li>Use npm / node.js libraries</li><li>Plays well with Gulp/Grunt. => powerful processing strategies.\n</li><li>CommonJS syntax is better</li></section><section><h2>Browserify: The Bad</h2><li>you need Gulp/Grunt and plugins for instant dev rebuilds.</li><li>Default: bundling into a single file. Async loading & multiple bundles\npossible, but must be done manually.\n\n</li></section><section><h2>Conclusion</h2><p>Internet Consensus: Browserify > RequireJS for most of the cases</p><p>Both solutions get the job done well, but there are rough edges here\nand there.\n\n</p></section><section><h2>Webpack</h2><p>Instagram/Facebook hypes it, Yahoo uses it as well.</p></section><section><h2>Definition style agnostic</h2><p>Supports AMD, CommonJS and even ES6 modules</p></section><section><h2>Everything is a module</h2><p>Why do other bundlers only care about Javascript modules?</p><p>There are other assets that need bundling! Webpack enables you to do that.</p></section><section data-state=\"white-background\"><p>Take the full dependency graph of all assets, and bundle them to your liking</p><img id=\"what-is-webpack\"/></section><section><h2>Bundling into one file is not enough</h2><p>If our app is big, you would like to split the assets into multiple files:</p><p>Webpack will offer you powerful bundling strategies with minimal configuration</p></section><section><h2>Dev experience is great</h2><p>Webpack ships awesome dev-tools that provide instant rebuilds with\nhot reload.\n\n</p></section><section><h2>How to use Webpack</h2><pre><code class=\"hjs javascript\">// ------------------\n// webpack.config.js\n// ------------------\n\nmodule.exports = {\n    entry: ['./src/app.js'],\n    output: {\n        path: __dirname + '/build/js',\n        filename: 'bundle.js',\n        publicPath: '/js/'\n    }\n};\n</code></pre><pre><code class=\"bash\">bash:~$ webpack\n</code></pre></section><section><h2>How the hell do I bundle pngs and css?</h2><pre><code class=\"hljs javascript\">//yes, we require sass!\nrequire('./mySassForThisModule.scss');\n\nvar _ = require('lodash');\nvar FooComponent = require('./FooComponent.jsx');\n\n//yes, we require png!\nvar imageLink = require('../../img/myImage.png');\n\n// do something with imageLink, FooComponent and lodash\n\nmodule.exports = ThisModule;\n</code></pre><p>If you bundle this with webpack, all the assets will be automagically\navailable when you include your bundle into your html document.\n\n</p></section><section><h2>Loaders</h2><blockquote cite=\"http://webpack.github.io/docs/loaders.html\">Loaders are transformations that are applied on files. They preprocess files.\nFor instance they can transform CoffeeScript to JavaScript.\n\n</blockquote></section><section><h2>Lots of Loaders (via npm)</h2><ul><li>inlining stylesheets</li><li>various preprocessors (jsx, CoffeeScript, es6)</li><li>templates</li><li>files, jsons, source-maps</li><li>promises, webworkers</li></ul></section><section><h2>Loader Configuration</h2><pre><code class=\"hljs javascript\">// ------------------\n// webpack.config.js\n// ------------------\n...,\nmodule: {\n    loaders: [\n        {\n            test: /\\.js.{0,1}$/,\n            loader: 'jsx?harmony'\n        },{\n            test: /\\.scss$/,\n            loader: \"style!css!sass?outputStyle=expanded&includePaths[]=\" + __dirname + '/src/scss'\n        }, {\n            test: /\\.css$/,\n            loader: \"style!css\"\n        }\n    ],\n},\n...\n\n</code></pre></section><section><h2>Loaders are awesome</h2><p>requiring and inlining stylesheets is super helpful.</p><p>you get all the freedom you need with preprocessors.</p><p>you can do cool stuff like inlining small pngs or json files.</p><p>bye bye Grunt/Gulp.</p></section><section><h2>So your project is big...</h2></section><section><h2>Load on Demand</h2><p>Create splitpoints</p><pre><code class=\"hljs javascript\">require.ensure([\"./otherPart.js\"], function (otherPart) {\n    // now you can use otherPart\n});\n</code></pre><p>This will create two files (called chunks by Webpack).\nOne is your entrypoint, the other gets loaded on demand.\n\n</p></section><section><h2>Multiple Entrypoints</h2><p>Run the CommonsChunkPlugin to split code up</p><pre><code class=\"hljs javascript\">{\n    entry: { a: \"./a\", b: \"./b\" },\n    output: { filename: \"[name].js\" },\n    plugins: [ new webpack.CommonsChunkPlugin(\"common.js\") ]\n}\n\n</code></pre></section><section><h2>Caching</h2><p>Add hashes to your filenames</p><pre><code class=\"hljs javascript\">output: {\n    path: path.join(__dirname, \"assets\", \"[hash]\"),\n    publicPath: \"assets/[hash]/\",\n    filename: \"output.[hash].bundle.js\",\n    chunkFilename: \"[id].[hash].bundle.js\"\n}\n\n</code></pre></section><section><h2>There is more</h2><ul><li>uglify</li><li>dedupe</li><li>various chunk optimizations (max chunk count, min chunk size)</li><li>gulp/grunt</li><li>target various runtimes</li></ul></section><section><h2>Development productivity</h2></section><section><h2>webpack-dev-server</h2><p>Incremental (=instant) rebuilds</p><p>hot reload without plugins</p></section><section><h2>dev-server setup</h2><pre><code class=\"hljs javascript\">// ------------------\n// server.js\n// ------------------\n\"use strict\";\nvar webpack = require('webpack');\nvar WebpackDevServer = require('webpack-dev-server');\nvar config = require('./webpack.config');\n\nvar server = new WebpackDevServer(webpack(config), {\n    // webpack-dev-server options\n    hot: true,\n    contentBase: __dirname,\n    quiet: false,\n    noInfo: false,\n    publicPath: '/js/',\n    stats: { colors: true }\n});\n\nserver.listen(8081, \"localhost\", function() {});\n</code></pre></section><section><h2>dev-server setup (2)</h2><pre><code class=\"hljs javascript\">// ------------------\n// webpack.config.js\n// ------------------\nentry: [\n    './slides-loader.js',\n    'webpack/hot/dev-server',\n    'webpack-dev-server/client?http://localhost:8081'\n],\nplugins: [new webpack.HotModuleReplacementPlugin()],\n</code></pre></section><section><h2>Live Demo!</h2></section><section><h2>Further Reading</h2><li><a href=\"http://webpack.github.io/docs/\">http://webpack.github.io/docs/</a><span> (especially list of tutorials)</span></li><li><a href=\"https://github.com/petehunt/webpack-howto\">https://github.com/petehunt/webpack-howto</a></li></section><section><h2>Wrap-Up</h2><li>Good bundling is important (and easier than server-side rendering)</li><li>Webpack combines the strengths of RequireJS and Browserify</li><li>Webpack is a bundler for everbody</li><li>It is easy to migrate</li><li>Webpack is well supported (because of the cool kids)</li></section>";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*! Socket.IO.js build:0.9.10, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */

	var io = (false ? {} : module.exports);
	(function() {

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, global) {

	  /**
	   * IO namespace.
	   *
	   * @namespace
	   */

	  var io = exports;

	  /**
	   * Socket.IO version
	   *
	   * @api public
	   */

	  io.version = '0.9.10';

	  /**
	   * Protocol implemented.
	   *
	   * @api public
	   */

	  io.protocol = 1;

	  /**
	   * Available transports, these will be populated with the available transports
	   *
	   * @api public
	   */

	  io.transports = [];

	  /**
	   * Keep track of jsonp callbacks.
	   *
	   * @api private
	   */

	  io.j = [];

	  /**
	   * Keep track of our io.Sockets
	   *
	   * @api private
	   */
	  io.sockets = {};


	  /**
	   * Manages connections to hosts.
	   *
	   * @param {String} uri
	   * @Param {Boolean} force creation of new socket (defaults to false)
	   * @api public
	   */

	  io.connect = function (host, details) {
	    var uri = io.util.parseUri(host)
	      , uuri
	      , socket;

	    if (global && global.location) {
	      uri.protocol = uri.protocol || global.location.protocol.slice(0, -1);
	      uri.host = uri.host || (global.document
	        ? global.document.domain : global.location.hostname);
	      uri.port = uri.port || global.location.port;
	    }

	    uuri = io.util.uniqueUri(uri);

	    var options = {
	        host: uri.host
	      , secure: 'https' == uri.protocol
	      , port: uri.port || ('https' == uri.protocol ? 443 : 80)
	      , query: uri.query || ''
	    };

	    io.util.merge(options, details);

	    if (options['force new connection'] || !io.sockets[uuri]) {
	      socket = new io.Socket(options);
	    }

	    if (!options['force new connection'] && socket) {
	      io.sockets[uuri] = socket;
	    }

	    socket = socket || io.sockets[uuri];

	    // if path is different from '' or /
	    return socket.of(uri.path.length > 1 ? uri.path : '');
	  };

	})(true ? module.exports : (this.io = {}), this);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, global) {

	  /**
	   * Utilities namespace.
	   *
	   * @namespace
	   */

	  var util = exports.util = {};

	  /**
	   * Parses an URI
	   *
	   * @author Steven Levithan <stevenlevithan.com> (MIT license)
	   * @api public
	   */

	  var re = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

	  var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password',
	               'host', 'port', 'relative', 'path', 'directory', 'file', 'query',
	               'anchor'];

	  util.parseUri = function (str) {
	    var m = re.exec(str || '')
	      , uri = {}
	      , i = 14;

	    while (i--) {
	      uri[parts[i]] = m[i] || '';
	    }

	    return uri;
	  };

	  /**
	   * Produces a unique url that identifies a Socket.IO connection.
	   *
	   * @param {Object} uri
	   * @api public
	   */

	  util.uniqueUri = function (uri) {
	    var protocol = uri.protocol
	      , host = uri.host
	      , port = uri.port;

	    if ('document' in global) {
	      host = host || document.domain;
	      port = port || (protocol == 'https'
	        && document.location.protocol !== 'https:' ? 443 : document.location.port);
	    } else {
	      host = host || 'localhost';

	      if (!port && protocol == 'https') {
	        port = 443;
	      }
	    }

	    return (protocol || 'http') + '://' + host + ':' + (port || 80);
	  };

	  /**
	   * Mergest 2 query strings in to once unique query string
	   *
	   * @param {String} base
	   * @param {String} addition
	   * @api public
	   */

	  util.query = function (base, addition) {
	    var query = util.chunkQuery(base || '')
	      , components = [];

	    util.merge(query, util.chunkQuery(addition || ''));
	    for (var part in query) {
	      if (query.hasOwnProperty(part)) {
	        components.push(part + '=' + query[part]);
	      }
	    }

	    return components.length ? '?' + components.join('&') : '';
	  };

	  /**
	   * Transforms a querystring in to an object
	   *
	   * @param {String} qs
	   * @api public
	   */

	  util.chunkQuery = function (qs) {
	    var query = {}
	      , params = qs.split('&')
	      , i = 0
	      , l = params.length
	      , kv;

	    for (; i < l; ++i) {
	      kv = params[i].split('=');
	      if (kv[0]) {
	        query[kv[0]] = kv[1];
	      }
	    }

	    return query;
	  };

	  /**
	   * Executes the given function when the page is loaded.
	   *
	   *     io.util.load(function () { console.log('page loaded'); });
	   *
	   * @param {Function} fn
	   * @api public
	   */

	  var pageLoaded = false;

	  util.load = function (fn) {
	    if ('document' in global && document.readyState === 'complete' || pageLoaded) {
	      return fn();
	    }

	    util.on(global, 'load', fn, false);
	  };

	  /**
	   * Adds an event.
	   *
	   * @api private
	   */

	  util.on = function (element, event, fn, capture) {
	    if (element.attachEvent) {
	      element.attachEvent('on' + event, fn);
	    } else if (element.addEventListener) {
	      element.addEventListener(event, fn, capture);
	    }
	  };

	  /**
	   * Generates the correct `XMLHttpRequest` for regular and cross domain requests.
	   *
	   * @param {Boolean} [xdomain] Create a request that can be used cross domain.
	   * @returns {XMLHttpRequest|false} If we can create a XMLHttpRequest.
	   * @api private
	   */

	  util.request = function (xdomain) {

	    if (xdomain && 'undefined' != typeof XDomainRequest) {
	      return new XDomainRequest();
	    }

	    if ('undefined' != typeof XMLHttpRequest && (!xdomain || util.ua.hasCORS)) {
	      return new XMLHttpRequest();
	    }

	    if (!xdomain) {
	      try {
	        return new window[(['Active'].concat('Object').join('X'))]('Microsoft.XMLHTTP');
	      } catch(e) { }
	    }

	    return null;
	  };

	  /**
	   * XHR based transport constructor.
	   *
	   * @constructor
	   * @api public
	   */

	  /**
	   * Change the internal pageLoaded value.
	   */

	  if ('undefined' != typeof window) {
	    util.load(function () {
	      pageLoaded = true;
	    });
	  }

	  /**
	   * Defers a function to ensure a spinner is not displayed by the browser
	   *
	   * @param {Function} fn
	   * @api public
	   */

	  util.defer = function (fn) {
	    if (!util.ua.webkit || 'undefined' != typeof importScripts) {
	      return fn();
	    }

	    util.load(function () {
	      setTimeout(fn, 100);
	    });
	  };

	  /**
	   * Merges two objects.
	   *
	   * @api public
	   */
	  
	  util.merge = function merge (target, additional, deep, lastseen) {
	    var seen = lastseen || []
	      , depth = typeof deep == 'undefined' ? 2 : deep
	      , prop;

	    for (prop in additional) {
	      if (additional.hasOwnProperty(prop) && util.indexOf(seen, prop) < 0) {
	        if (typeof target[prop] !== 'object' || !depth) {
	          target[prop] = additional[prop];
	          seen.push(additional[prop]);
	        } else {
	          util.merge(target[prop], additional[prop], depth - 1, seen);
	        }
	      }
	    }

	    return target;
	  };

	  /**
	   * Merges prototypes from objects
	   *
	   * @api public
	   */
	  
	  util.mixin = function (ctor, ctor2) {
	    util.merge(ctor.prototype, ctor2.prototype);
	  };

	  /**
	   * Shortcut for prototypical and static inheritance.
	   *
	   * @api private
	   */

	  util.inherit = function (ctor, ctor2) {
	    function f() {};
	    f.prototype = ctor2.prototype;
	    ctor.prototype = new f;
	  };

	  /**
	   * Checks if the given object is an Array.
	   *
	   *     io.util.isArray([]); // true
	   *     io.util.isArray({}); // false
	   *
	   * @param Object obj
	   * @api public
	   */

	  util.isArray = Array.isArray || function (obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]';
	  };

	  /**
	   * Intersects values of two arrays into a third
	   *
	   * @api public
	   */

	  util.intersect = function (arr, arr2) {
	    var ret = []
	      , longest = arr.length > arr2.length ? arr : arr2
	      , shortest = arr.length > arr2.length ? arr2 : arr;

	    for (var i = 0, l = shortest.length; i < l; i++) {
	      if (~util.indexOf(longest, shortest[i]))
	        ret.push(shortest[i]);
	    }

	    return ret;
	  }

	  /**
	   * Array indexOf compatibility.
	   *
	   * @see bit.ly/a5Dxa2
	   * @api public
	   */

	  util.indexOf = function (arr, o, i) {
	    
	    for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0; 
	         i < j && arr[i] !== o; i++) {}

	    return j <= i ? -1 : i;
	  };

	  /**
	   * Converts enumerables to array.
	   *
	   * @api public
	   */

	  util.toArray = function (enu) {
	    var arr = [];

	    for (var i = 0, l = enu.length; i < l; i++)
	      arr.push(enu[i]);

	    return arr;
	  };

	  /**
	   * UA / engines detection namespace.
	   *
	   * @namespace
	   */

	  util.ua = {};

	  /**
	   * Whether the UA supports CORS for XHR.
	   *
	   * @api public
	   */

	  util.ua.hasCORS = 'undefined' != typeof XMLHttpRequest && (function () {
	    try {
	      var a = new XMLHttpRequest();
	    } catch (e) {
	      return false;
	    }

	    return a.withCredentials != undefined;
	  })();

	  /**
	   * Detect webkit.
	   *
	   * @api public
	   */

	  util.ua.webkit = 'undefined' != typeof navigator
	    && /webkit/i.test(navigator.userAgent);

	   /**
	   * Detect iPad/iPhone/iPod.
	   *
	   * @api public
	   */

	  util.ua.iDevice = 'undefined' != typeof navigator
	      && /iPad|iPhone|iPod/i.test(navigator.userAgent);

	})('undefined' != typeof io ? io : module.exports, this);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.EventEmitter = EventEmitter;

	  /**
	   * Event emitter constructor.
	   *
	   * @api public.
	   */

	  function EventEmitter () {};

	  /**
	   * Adds a listener
	   *
	   * @api public
	   */

	  EventEmitter.prototype.on = function (name, fn) {
	    if (!this.$events) {
	      this.$events = {};
	    }

	    if (!this.$events[name]) {
	      this.$events[name] = fn;
	    } else if (io.util.isArray(this.$events[name])) {
	      this.$events[name].push(fn);
	    } else {
	      this.$events[name] = [this.$events[name], fn];
	    }

	    return this;
	  };

	  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	  /**
	   * Adds a volatile listener.
	   *
	   * @api public
	   */

	  EventEmitter.prototype.once = function (name, fn) {
	    var self = this;

	    function on () {
	      self.removeListener(name, on);
	      fn.apply(this, arguments);
	    };

	    on.listener = fn;
	    this.on(name, on);

	    return this;
	  };

	  /**
	   * Removes a listener.
	   *
	   * @api public
	   */

	  EventEmitter.prototype.removeListener = function (name, fn) {
	    if (this.$events && this.$events[name]) {
	      var list = this.$events[name];

	      if (io.util.isArray(list)) {
	        var pos = -1;

	        for (var i = 0, l = list.length; i < l; i++) {
	          if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
	            pos = i;
	            break;
	          }
	        }

	        if (pos < 0) {
	          return this;
	        }

	        list.splice(pos, 1);

	        if (!list.length) {
	          delete this.$events[name];
	        }
	      } else if (list === fn || (list.listener && list.listener === fn)) {
	        delete this.$events[name];
	      }
	    }

	    return this;
	  };

	  /**
	   * Removes all listeners for an event.
	   *
	   * @api public
	   */

	  EventEmitter.prototype.removeAllListeners = function (name) {
	    if (name === undefined) {
	      this.$events = {};
	      return this;
	    }

	    if (this.$events && this.$events[name]) {
	      this.$events[name] = null;
	    }

	    return this;
	  };

	  /**
	   * Gets all listeners for a certain event.
	   *
	   * @api publci
	   */

	  EventEmitter.prototype.listeners = function (name) {
	    if (!this.$events) {
	      this.$events = {};
	    }

	    if (!this.$events[name]) {
	      this.$events[name] = [];
	    }

	    if (!io.util.isArray(this.$events[name])) {
	      this.$events[name] = [this.$events[name]];
	    }

	    return this.$events[name];
	  };

	  /**
	   * Emits an event.
	   *
	   * @api public
	   */

	  EventEmitter.prototype.emit = function (name) {
	    if (!this.$events) {
	      return false;
	    }

	    var handler = this.$events[name];

	    if (!handler) {
	      return false;
	    }

	    var args = Array.prototype.slice.call(arguments, 1);

	    if ('function' == typeof handler) {
	      handler.apply(this, args);
	    } else if (io.util.isArray(handler)) {
	      var listeners = handler.slice();

	      for (var i = 0, l = listeners.length; i < l; i++) {
	        listeners[i].apply(this, args);
	      }
	    } else {
	      return false;
	    }

	    return true;
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	/**
	 * Based on JSON2 (http://www.JSON.org/js.html).
	 */

	(function (exports, nativeJSON) {
	  "use strict";

	  // use native JSON if it's available
	  if (nativeJSON && nativeJSON.parse){
	    return exports.JSON = {
	      parse: nativeJSON.parse
	    , stringify: nativeJSON.stringify
	    }
	  }

	  var JSON = exports.JSON = {};

	  function f(n) {
	      // Format integers to have at least two digits.
	      return n < 10 ? '0' + n : n;
	  }

	  function date(d, key) {
	    return isFinite(d.valueOf()) ?
	        d.getUTCFullYear()     + '-' +
	        f(d.getUTCMonth() + 1) + '-' +
	        f(d.getUTCDate())      + 'T' +
	        f(d.getUTCHours())     + ':' +
	        f(d.getUTCMinutes())   + ':' +
	        f(d.getUTCSeconds())   + 'Z' : null;
	  };

	  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	      gap,
	      indent,
	      meta = {    // table of character substitutions
	          '\b': '\\b',
	          '\t': '\\t',
	          '\n': '\\n',
	          '\f': '\\f',
	          '\r': '\\r',
	          '"' : '\\"',
	          '\\': '\\\\'
	      },
	      rep;


	  function quote(string) {

	// If the string contains no control characters, no quote characters, and no
	// backslash characters, then we can safely slap some quotes around it.
	// Otherwise we must also replace the offending characters with safe escape
	// sequences.

	      escapable.lastIndex = 0;
	      return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
	          var c = meta[a];
	          return typeof c === 'string' ? c :
	              '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	      }) + '"' : '"' + string + '"';
	  }


	  function str(key, holder) {

	// Produce a string from holder[key].

	      var i,          // The loop counter.
	          k,          // The member key.
	          v,          // The member value.
	          length,
	          mind = gap,
	          partial,
	          value = holder[key];

	// If the value has a toJSON method, call it to obtain a replacement value.

	      if (value instanceof Date) {
	          value = date(key);
	      }

	// If we were called with a replacer function, then call the replacer to
	// obtain a replacement value.

	      if (typeof rep === 'function') {
	          value = rep.call(holder, key, value);
	      }

	// What happens next depends on the value's type.

	      switch (typeof value) {
	      case 'string':
	          return quote(value);

	      case 'number':

	// JSON numbers must be finite. Encode non-finite numbers as null.

	          return isFinite(value) ? String(value) : 'null';

	      case 'boolean':
	      case 'null':

	// If the value is a boolean or null, convert it to a string. Note:
	// typeof null does not produce 'null'. The case is included here in
	// the remote chance that this gets fixed someday.

	          return String(value);

	// If the type is 'object', we might be dealing with an object or an array or
	// null.

	      case 'object':

	// Due to a specification blunder in ECMAScript, typeof null is 'object',
	// so watch out for that case.

	          if (!value) {
	              return 'null';
	          }

	// Make an array to hold the partial results of stringifying this object value.

	          gap += indent;
	          partial = [];

	// Is the value an array?

	          if (Object.prototype.toString.apply(value) === '[object Array]') {

	// The value is an array. Stringify every element. Use null as a placeholder
	// for non-JSON values.

	              length = value.length;
	              for (i = 0; i < length; i += 1) {
	                  partial[i] = str(i, value) || 'null';
	              }

	// Join all of the elements together, separated with commas, and wrap them in
	// brackets.

	              v = partial.length === 0 ? '[]' : gap ?
	                  '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
	                  '[' + partial.join(',') + ']';
	              gap = mind;
	              return v;
	          }

	// If the replacer is an array, use it to select the members to be stringified.

	          if (rep && typeof rep === 'object') {
	              length = rep.length;
	              for (i = 0; i < length; i += 1) {
	                  if (typeof rep[i] === 'string') {
	                      k = rep[i];
	                      v = str(k, value);
	                      if (v) {
	                          partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                      }
	                  }
	              }
	          } else {

	// Otherwise, iterate through all of the keys in the object.

	              for (k in value) {
	                  if (Object.prototype.hasOwnProperty.call(value, k)) {
	                      v = str(k, value);
	                      if (v) {
	                          partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                      }
	                  }
	              }
	          }

	// Join all of the member texts together, separated with commas,
	// and wrap them in braces.

	          v = partial.length === 0 ? '{}' : gap ?
	              '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
	              '{' + partial.join(',') + '}';
	          gap = mind;
	          return v;
	      }
	  }

	// If the JSON object does not yet have a stringify method, give it one.

	  JSON.stringify = function (value, replacer, space) {

	// The stringify method takes a value and an optional replacer, and an optional
	// space parameter, and returns a JSON text. The replacer can be a function
	// that can replace values, or an array of strings that will select the keys.
	// A default replacer method can be provided. Use of the space parameter can
	// produce text that is more easily readable.

	      var i;
	      gap = '';
	      indent = '';

	// If the space parameter is a number, make an indent string containing that
	// many spaces.

	      if (typeof space === 'number') {
	          for (i = 0; i < space; i += 1) {
	              indent += ' ';
	          }

	// If the space parameter is a string, it will be used as the indent string.

	      } else if (typeof space === 'string') {
	          indent = space;
	      }

	// If there is a replacer, it must be a function or an array.
	// Otherwise, throw an error.

	      rep = replacer;
	      if (replacer && typeof replacer !== 'function' &&
	              (typeof replacer !== 'object' ||
	              typeof replacer.length !== 'number')) {
	          throw new Error('JSON.stringify');
	      }

	// Make a fake root object containing our value under the key of ''.
	// Return the result of stringifying the value.

	      return str('', {'': value});
	  };

	// If the JSON object does not yet have a parse method, give it one.

	  JSON.parse = function (text, reviver) {
	  // The parse method takes a text and an optional reviver function, and returns
	  // a JavaScript value if the text is a valid JSON text.

	      var j;

	      function walk(holder, key) {

	  // The walk method is used to recursively walk the resulting structure so
	  // that modifications can be made.

	          var k, v, value = holder[key];
	          if (value && typeof value === 'object') {
	              for (k in value) {
	                  if (Object.prototype.hasOwnProperty.call(value, k)) {
	                      v = walk(value, k);
	                      if (v !== undefined) {
	                          value[k] = v;
	                      } else {
	                          delete value[k];
	                      }
	                  }
	              }
	          }
	          return reviver.call(holder, key, value);
	      }


	  // Parsing happens in four stages. In the first stage, we replace certain
	  // Unicode characters with escape sequences. JavaScript handles many characters
	  // incorrectly, either silently deleting them, or treating them as line endings.

	      text = String(text);
	      cx.lastIndex = 0;
	      if (cx.test(text)) {
	          text = text.replace(cx, function (a) {
	              return '\\u' +
	                  ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	          });
	      }

	  // In the second stage, we run the text against regular expressions that look
	  // for non-JSON patterns. We are especially concerned with '()' and 'new'
	  // because they can cause invocation, and '=' because it can cause mutation.
	  // But just to be safe, we want to reject all unexpected forms.

	  // We split the second stage into 4 regexp operations in order to work around
	  // crippling inefficiencies in IE's and Safari's regexp engines. First we
	  // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
	  // replace all simple value tokens with ']' characters. Third, we delete all
	  // open brackets that follow a colon or comma or that begin the text. Finally,
	  // we look to see that the remaining characters are only whitespace or ']' or
	  // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

	      if (/^[\],:{}\s]*$/
	              .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
	                  .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
	                  .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

	  // In the third stage we use the eval function to compile the text into a
	  // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
	  // in JavaScript: it can begin a block or an object literal. We wrap the text
	  // in parens to eliminate the ambiguity.

	          j = eval('(' + text + ')');

	  // In the optional fourth stage, we recursively walk the new structure, passing
	  // each name/value pair to a reviver function for possible transformation.

	          return typeof reviver === 'function' ?
	              walk({'': j}, '') : j;
	      }

	  // If the text is not JSON parseable, then a SyntaxError is thrown.

	      throw new SyntaxError('JSON.parse');
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , typeof JSON !== 'undefined' ? JSON : undefined
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Parser namespace.
	   *
	   * @namespace
	   */

	  var parser = exports.parser = {};

	  /**
	   * Packet types.
	   */

	  var packets = parser.packets = [
	      'disconnect'
	    , 'connect'
	    , 'heartbeat'
	    , 'message'
	    , 'json'
	    , 'event'
	    , 'ack'
	    , 'error'
	    , 'noop'
	  ];

	  /**
	   * Errors reasons.
	   */

	  var reasons = parser.reasons = [
	      'transport not supported'
	    , 'client not handshaken'
	    , 'unauthorized'
	  ];

	  /**
	   * Errors advice.
	   */

	  var advice = parser.advice = [
	      'reconnect'
	  ];

	  /**
	   * Shortcuts.
	   */

	  var JSON = io.JSON
	    , indexOf = io.util.indexOf;

	  /**
	   * Encodes a packet.
	   *
	   * @api private
	   */

	  parser.encodePacket = function (packet) {
	    var type = indexOf(packets, packet.type)
	      , id = packet.id || ''
	      , endpoint = packet.endpoint || ''
	      , ack = packet.ack
	      , data = null;

	    switch (packet.type) {
	      case 'error':
	        var reason = packet.reason ? indexOf(reasons, packet.reason) : ''
	          , adv = packet.advice ? indexOf(advice, packet.advice) : '';

	        if (reason !== '' || adv !== '')
	          data = reason + (adv !== '' ? ('+' + adv) : '');

	        break;

	      case 'message':
	        if (packet.data !== '')
	          data = packet.data;
	        break;

	      case 'event':
	        var ev = { name: packet.name };

	        if (packet.args && packet.args.length) {
	          ev.args = packet.args;
	        }

	        data = JSON.stringify(ev);
	        break;

	      case 'json':
	        data = JSON.stringify(packet.data);
	        break;

	      case 'connect':
	        if (packet.qs)
	          data = packet.qs;
	        break;

	      case 'ack':
	        data = packet.ackId
	          + (packet.args && packet.args.length
	              ? '+' + JSON.stringify(packet.args) : '');
	        break;
	    }

	    // construct packet with required fragments
	    var encoded = [
	        type
	      , id + (ack == 'data' ? '+' : '')
	      , endpoint
	    ];

	    // data fragment is optional
	    if (data !== null && data !== undefined)
	      encoded.push(data);

	    return encoded.join(':');
	  };

	  /**
	   * Encodes multiple messages (payload).
	   *
	   * @param {Array} messages
	   * @api private
	   */

	  parser.encodePayload = function (packets) {
	    var decoded = '';

	    if (packets.length == 1)
	      return packets[0];

	    for (var i = 0, l = packets.length; i < l; i++) {
	      var packet = packets[i];
	      decoded += '\ufffd' + packet.length + '\ufffd' + packets[i];
	    }

	    return decoded;
	  };

	  /**
	   * Decodes a packet
	   *
	   * @api private
	   */

	  var regexp = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;

	  parser.decodePacket = function (data) {
	    var pieces = data.match(regexp);

	    if (!pieces) return {};

	    var id = pieces[2] || ''
	      , data = pieces[5] || ''
	      , packet = {
	            type: packets[pieces[1]]
	          , endpoint: pieces[4] || ''
	        };

	    // whether we need to acknowledge the packet
	    if (id) {
	      packet.id = id;
	      if (pieces[3])
	        packet.ack = 'data';
	      else
	        packet.ack = true;
	    }

	    // handle different packet types
	    switch (packet.type) {
	      case 'error':
	        var pieces = data.split('+');
	        packet.reason = reasons[pieces[0]] || '';
	        packet.advice = advice[pieces[1]] || '';
	        break;

	      case 'message':
	        packet.data = data || '';
	        break;

	      case 'event':
	        try {
	          var opts = JSON.parse(data);
	          packet.name = opts.name;
	          packet.args = opts.args;
	        } catch (e) { }

	        packet.args = packet.args || [];
	        break;

	      case 'json':
	        try {
	          packet.data = JSON.parse(data);
	        } catch (e) { }
	        break;

	      case 'connect':
	        packet.qs = data || '';
	        break;

	      case 'ack':
	        var pieces = data.match(/^([0-9]+)(\+)?(.*)/);
	        if (pieces) {
	          packet.ackId = pieces[1];
	          packet.args = [];

	          if (pieces[3]) {
	            try {
	              packet.args = pieces[3] ? JSON.parse(pieces[3]) : [];
	            } catch (e) { }
	          }
	        }
	        break;

	      case 'disconnect':
	      case 'heartbeat':
	        break;
	    };

	    return packet;
	  };

	  /**
	   * Decodes data payload. Detects multiple messages
	   *
	   * @return {Array} messages
	   * @api public
	   */

	  parser.decodePayload = function (data) {
	    // IE doesn't like data[i] for unicode chars, charAt works fine
	    if (data.charAt(0) == '\ufffd') {
	      var ret = [];

	      for (var i = 1, length = ''; i < data.length; i++) {
	        if (data.charAt(i) == '\ufffd') {
	          ret.push(parser.decodePacket(data.substr(i + 1).substr(0, length)));
	          i += Number(length) + 1;
	          length = '';
	        } else {
	          length += data.charAt(i);
	        }
	      }

	      return ret;
	    } else {
	      return [parser.decodePacket(data)];
	    }
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.Transport = Transport;

	  /**
	   * This is the transport template for all supported transport methods.
	   *
	   * @constructor
	   * @api public
	   */

	  function Transport (socket, sessid) {
	    this.socket = socket;
	    this.sessid = sessid;
	  };

	  /**
	   * Apply EventEmitter mixin.
	   */

	  io.util.mixin(Transport, io.EventEmitter);


	  /**
	   * Indicates whether heartbeats is enabled for this transport
	   *
	   * @api private
	   */

	  Transport.prototype.heartbeats = function () {
	    return true;
	  }

	  /**
	   * Handles the response from the server. When a new response is received
	   * it will automatically update the timeout, decode the message and
	   * forwards the response to the onMessage function for further processing.
	   *
	   * @param {String} data Response from the server.
	   * @api private
	   */

	  Transport.prototype.onData = function (data) {
	    this.clearCloseTimeout();
	    
	    // If the connection in currently open (or in a reopening state) reset the close 
	    // timeout since we have just received data. This check is necessary so
	    // that we don't reset the timeout on an explicitly disconnected connection.
	    if (this.socket.connected || this.socket.connecting || this.socket.reconnecting) {
	      this.setCloseTimeout();
	    }

	    if (data !== '') {
	      // todo: we should only do decodePayload for xhr transports
	      var msgs = io.parser.decodePayload(data);

	      if (msgs && msgs.length) {
	        for (var i = 0, l = msgs.length; i < l; i++) {
	          this.onPacket(msgs[i]);
	        }
	      }
	    }

	    return this;
	  };

	  /**
	   * Handles packets.
	   *
	   * @api private
	   */

	  Transport.prototype.onPacket = function (packet) {
	    this.socket.setHeartbeatTimeout();

	    if (packet.type == 'heartbeat') {
	      return this.onHeartbeat();
	    }

	    if (packet.type == 'connect' && packet.endpoint == '') {
	      this.onConnect();
	    }

	    if (packet.type == 'error' && packet.advice == 'reconnect') {
	      this.isOpen = false;
	    }

	    this.socket.onPacket(packet);

	    return this;
	  };

	  /**
	   * Sets close timeout
	   *
	   * @api private
	   */
	  
	  Transport.prototype.setCloseTimeout = function () {
	    if (!this.closeTimeout) {
	      var self = this;

	      this.closeTimeout = setTimeout(function () {
	        self.onDisconnect();
	      }, this.socket.closeTimeout);
	    }
	  };

	  /**
	   * Called when transport disconnects.
	   *
	   * @api private
	   */

	  Transport.prototype.onDisconnect = function () {
	    if (this.isOpen) this.close();
	    this.clearTimeouts();
	    this.socket.onDisconnect();
	    return this;
	  };

	  /**
	   * Called when transport connects
	   *
	   * @api private
	   */

	  Transport.prototype.onConnect = function () {
	    this.socket.onConnect();
	    return this;
	  }

	  /**
	   * Clears close timeout
	   *
	   * @api private
	   */

	  Transport.prototype.clearCloseTimeout = function () {
	    if (this.closeTimeout) {
	      clearTimeout(this.closeTimeout);
	      this.closeTimeout = null;
	    }
	  };

	  /**
	   * Clear timeouts
	   *
	   * @api private
	   */

	  Transport.prototype.clearTimeouts = function () {
	    this.clearCloseTimeout();

	    if (this.reopenTimeout) {
	      clearTimeout(this.reopenTimeout);
	    }
	  };

	  /**
	   * Sends a packet
	   *
	   * @param {Object} packet object.
	   * @api private
	   */

	  Transport.prototype.packet = function (packet) {
	    this.send(io.parser.encodePacket(packet));
	  };

	  /**
	   * Send the received heartbeat message back to server. So the server
	   * knows we are still connected.
	   *
	   * @param {String} heartbeat Heartbeat response from the server.
	   * @api private
	   */

	  Transport.prototype.onHeartbeat = function (heartbeat) {
	    this.packet({ type: 'heartbeat' });
	  };
	 
	  /**
	   * Called when the transport opens.
	   *
	   * @api private
	   */

	  Transport.prototype.onOpen = function () {
	    this.isOpen = true;
	    this.clearCloseTimeout();
	    this.socket.onOpen();
	  };

	  /**
	   * Notifies the base when the connection with the Socket.IO server
	   * has been disconnected.
	   *
	   * @api private
	   */

	  Transport.prototype.onClose = function () {
	    var self = this;

	    /* FIXME: reopen delay causing a infinit loop
	    this.reopenTimeout = setTimeout(function () {
	      self.open();
	    }, this.socket.options['reopen delay']);*/

	    this.isOpen = false;
	    this.socket.onClose();
	    this.onDisconnect();
	  };

	  /**
	   * Generates a connection url based on the Socket.IO URL Protocol.
	   * See <https://github.com/learnboost/socket.io-node/> for more details.
	   *
	   * @returns {String} Connection url
	   * @api private
	   */

	  Transport.prototype.prepareUrl = function () {
	    var options = this.socket.options;

	    return this.scheme() + '://'
	      + options.host + ':' + options.port + '/'
	      + options.resource + '/' + io.protocol
	      + '/' + this.name + '/' + this.sessid;
	  };

	  /**
	   * Checks if the transport is ready to start a connection.
	   *
	   * @param {Socket} socket The socket instance that needs a transport
	   * @param {Function} fn The callback
	   * @api private
	   */

	  Transport.prototype.ready = function (socket, fn) {
	    fn.call(this);
	  };
	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {

	  /**
	   * Expose constructor.
	   */

	  exports.Socket = Socket;

	  /**
	   * Create a new `Socket.IO client` which can establish a persistent
	   * connection with a Socket.IO enabled server.
	   *
	   * @api public
	   */

	  function Socket (options) {
	    this.options = {
	        port: 80
	      , secure: false
	      , document: 'document' in global ? document : false
	      , resource: 'socket.io'
	      , transports: io.transports
	      , 'connect timeout': 10000
	      , 'try multiple transports': true
	      , 'reconnect': true
	      , 'reconnection delay': 500
	      , 'reconnection limit': Infinity
	      , 'reopen delay': 3000
	      , 'max reconnection attempts': 10
	      , 'sync disconnect on unload': false
	      , 'auto connect': true
	      , 'flash policy port': 10843
	      , 'manualFlush': false
	    };

	    io.util.merge(this.options, options);

	    this.connected = false;
	    this.open = false;
	    this.connecting = false;
	    this.reconnecting = false;
	    this.namespaces = {};
	    this.buffer = [];
	    this.doBuffer = false;

	    if (this.options['sync disconnect on unload'] &&
	        (!this.isXDomain() || io.util.ua.hasCORS)) {
	      var self = this;
	      io.util.on(global, 'beforeunload', function () {
	        self.disconnectSync();
	      }, false);
	    }

	    if (this.options['auto connect']) {
	      this.connect();
	    }
	};

	  /**
	   * Apply EventEmitter mixin.
	   */

	  io.util.mixin(Socket, io.EventEmitter);

	  /**
	   * Returns a namespace listener/emitter for this socket
	   *
	   * @api public
	   */

	  Socket.prototype.of = function (name) {
	    if (!this.namespaces[name]) {
	      this.namespaces[name] = new io.SocketNamespace(this, name);

	      if (name !== '') {
	        this.namespaces[name].packet({ type: 'connect' });
	      }
	    }

	    return this.namespaces[name];
	  };

	  /**
	   * Emits the given event to the Socket and all namespaces
	   *
	   * @api private
	   */

	  Socket.prototype.publish = function () {
	    this.emit.apply(this, arguments);

	    var nsp;

	    for (var i in this.namespaces) {
	      if (this.namespaces.hasOwnProperty(i)) {
	        nsp = this.of(i);
	        nsp.$emit.apply(nsp, arguments);
	      }
	    }
	  };

	  /**
	   * Performs the handshake
	   *
	   * @api private
	   */

	  function empty () { };

	  Socket.prototype.handshake = function (fn) {
	    var self = this
	      , options = this.options;

	    function complete (data) {
	      if (data instanceof Error) {
	        self.connecting = false;
	        self.onError(data.message);
	      } else {
	        fn.apply(null, data.split(':'));
	      }
	    };

	    var url = [
	          'http' + (options.secure ? 's' : '') + ':/'
	        , options.host + ':' + options.port
	        , options.resource
	        , io.protocol
	        , io.util.query(this.options.query, 't=' + +new Date)
	      ].join('/');

	    if (this.isXDomain() && !io.util.ua.hasCORS) {
	      var insertAt = document.getElementsByTagName('script')[0]
	        , script = document.createElement('script');

	      script.src = url + '&jsonp=' + io.j.length;
	      insertAt.parentNode.insertBefore(script, insertAt);

	      io.j.push(function (data) {
	        complete(data);
	        script.parentNode.removeChild(script);
	      });
	    } else {
	      var xhr = io.util.request();

	      xhr.open('GET', url, true);
	      if (this.isXDomain()) {
	        xhr.withCredentials = true;
	      }
	      xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4) {
	          xhr.onreadystatechange = empty;

	          if (xhr.status == 200) {
	            complete(xhr.responseText);
	          } else if (xhr.status == 403) {
	            self.onError(xhr.responseText);
	          } else {
	            self.connecting = false;            
	            !self.reconnecting && self.onError(xhr.responseText);
	          }
	        }
	      };
	      xhr.send(null);
	    }
	  };

	  /**
	   * Find an available transport based on the options supplied in the constructor.
	   *
	   * @api private
	   */

	  Socket.prototype.getTransport = function (override) {
	    var transports = override || this.transports, match;

	    for (var i = 0, transport; transport = transports[i]; i++) {
	      if (io.Transport[transport]
	        && io.Transport[transport].check(this)
	        && (!this.isXDomain() || io.Transport[transport].xdomainCheck(this))) {
	        return new io.Transport[transport](this, this.sessionid);
	      }
	    }

	    return null;
	  };

	  /**
	   * Connects to the server.
	   *
	   * @param {Function} [fn] Callback.
	   * @returns {io.Socket}
	   * @api public
	   */

	  Socket.prototype.connect = function (fn) {
	    if (this.connecting) {
	      return this;
	    }

	    var self = this;
	    self.connecting = true;
	    
	    this.handshake(function (sid, heartbeat, close, transports) {
	      self.sessionid = sid;
	      self.closeTimeout = close * 1000;
	      self.heartbeatTimeout = heartbeat * 1000;
	      if(!self.transports)
	          self.transports = self.origTransports = (transports ? io.util.intersect(
	              transports.split(',')
	            , self.options.transports
	          ) : self.options.transports);

	      self.setHeartbeatTimeout();

	      function connect (transports){
	        if (self.transport) self.transport.clearTimeouts();

	        self.transport = self.getTransport(transports);
	        if (!self.transport) return self.publish('connect_failed');

	        // once the transport is ready
	        self.transport.ready(self, function () {
	          self.connecting = true;
	          self.publish('connecting', self.transport.name);
	          self.transport.open();

	          if (self.options['connect timeout']) {
	            self.connectTimeoutTimer = setTimeout(function () {
	              if (!self.connected) {
	                self.connecting = false;

	                if (self.options['try multiple transports']) {
	                  var remaining = self.transports;

	                  while (remaining.length > 0 && remaining.splice(0,1)[0] !=
	                         self.transport.name) {}

	                    if (remaining.length){
	                      connect(remaining);
	                    } else {
	                      self.publish('connect_failed');
	                    }
	                }
	              }
	            }, self.options['connect timeout']);
	          }
	        });
	      }

	      connect(self.transports);

	      self.once('connect', function (){
	        clearTimeout(self.connectTimeoutTimer);

	        fn && typeof fn == 'function' && fn();
	      });
	    });

	    return this;
	  };

	  /**
	   * Clears and sets a new heartbeat timeout using the value given by the
	   * server during the handshake.
	   *
	   * @api private
	   */

	  Socket.prototype.setHeartbeatTimeout = function () {
	    clearTimeout(this.heartbeatTimeoutTimer);
	    if(this.transport && !this.transport.heartbeats()) return;

	    var self = this;
	    this.heartbeatTimeoutTimer = setTimeout(function () {
	      self.transport.onClose();
	    }, this.heartbeatTimeout);
	  };

	  /**
	   * Sends a message.
	   *
	   * @param {Object} data packet.
	   * @returns {io.Socket}
	   * @api public
	   */

	  Socket.prototype.packet = function (data) {
	    if (this.connected && !this.doBuffer) {
	      this.transport.packet(data);
	    } else {
	      this.buffer.push(data);
	    }

	    return this;
	  };

	  /**
	   * Sets buffer state
	   *
	   * @api private
	   */

	  Socket.prototype.setBuffer = function (v) {
	    this.doBuffer = v;

	    if (!v && this.connected && this.buffer.length) {
	      if (!this.options['manualFlush']) {
	        this.flushBuffer();
	      }
	    }
	  };

	  /**
	   * Flushes the buffer data over the wire.
	   * To be invoked manually when 'manualFlush' is set to true.
	   *
	   * @api public
	   */

	  Socket.prototype.flushBuffer = function() {
	    this.transport.payload(this.buffer);
	    this.buffer = [];
	  };
	  

	  /**
	   * Disconnect the established connect.
	   *
	   * @returns {io.Socket}
	   * @api public
	   */

	  Socket.prototype.disconnect = function () {
	    if (this.connected || this.connecting) {
	      if (this.open) {
	        this.of('').packet({ type: 'disconnect' });
	      }

	      // handle disconnection immediately
	      this.onDisconnect('booted');
	    }

	    return this;
	  };

	  /**
	   * Disconnects the socket with a sync XHR.
	   *
	   * @api private
	   */

	  Socket.prototype.disconnectSync = function () {
	    // ensure disconnection
	    var xhr = io.util.request();
	    var uri = [
	        'http' + (this.options.secure ? 's' : '') + ':/'
	      , this.options.host + ':' + this.options.port
	      , this.options.resource
	      , io.protocol
	      , ''
	      , this.sessionid
	    ].join('/') + '/?disconnect=1';

	    xhr.open('GET', uri, false);
	    xhr.send(null);

	    // handle disconnection immediately
	    this.onDisconnect('booted');
	  };

	  /**
	   * Check if we need to use cross domain enabled transports. Cross domain would
	   * be a different port or different domain name.
	   *
	   * @returns {Boolean}
	   * @api private
	   */

	  Socket.prototype.isXDomain = function () {

	    var port = global.location.port ||
	      ('https:' == global.location.protocol ? 443 : 80);

	    return this.options.host !== global.location.hostname 
	      || this.options.port != port;
	  };

	  /**
	   * Called upon handshake.
	   *
	   * @api private
	   */

	  Socket.prototype.onConnect = function () {
	    if (!this.connected) {
	      this.connected = true;
	      this.connecting = false;
	      if (!this.doBuffer) {
	        // make sure to flush the buffer
	        this.setBuffer(false);
	      }
	      this.emit('connect');
	    }
	  };

	  /**
	   * Called when the transport opens
	   *
	   * @api private
	   */

	  Socket.prototype.onOpen = function () {
	    this.open = true;
	  };

	  /**
	   * Called when the transport closes.
	   *
	   * @api private
	   */

	  Socket.prototype.onClose = function () {
	    this.open = false;
	    clearTimeout(this.heartbeatTimeoutTimer);
	  };

	  /**
	   * Called when the transport first opens a connection
	   *
	   * @param text
	   */

	  Socket.prototype.onPacket = function (packet) {
	    this.of(packet.endpoint).onPacket(packet);
	  };

	  /**
	   * Handles an error.
	   *
	   * @api private
	   */

	  Socket.prototype.onError = function (err) {
	    if (err && err.advice) {
	      if (err.advice === 'reconnect' && (this.connected || this.connecting)) {
	        this.disconnect();
	        if (this.options.reconnect) {
	          this.reconnect();
	        }
	      }
	    }

	    this.publish('error', err && err.reason ? err.reason : err);
	  };

	  /**
	   * Called when the transport disconnects.
	   *
	   * @api private
	   */

	  Socket.prototype.onDisconnect = function (reason) {
	    var wasConnected = this.connected
	      , wasConnecting = this.connecting;

	    this.connected = false;
	    this.connecting = false;
	    this.open = false;

	    if (wasConnected || wasConnecting) {
	      this.transport.close();
	      this.transport.clearTimeouts();
	      if (wasConnected) {
	        this.publish('disconnect', reason);

	        if ('booted' != reason && this.options.reconnect && !this.reconnecting) {
	          this.reconnect();
	        }
	      }
	    }
	  };

	  /**
	   * Called upon reconnection.
	   *
	   * @api private
	   */

	  Socket.prototype.reconnect = function () {
	    this.reconnecting = true;
	    this.reconnectionAttempts = 0;
	    this.reconnectionDelay = this.options['reconnection delay'];

	    var self = this
	      , maxAttempts = this.options['max reconnection attempts']
	      , tryMultiple = this.options['try multiple transports']
	      , limit = this.options['reconnection limit'];

	    function reset () {
	      if (self.connected) {
	        for (var i in self.namespaces) {
	          if (self.namespaces.hasOwnProperty(i) && '' !== i) {
	              self.namespaces[i].packet({ type: 'connect' });
	          }
	        }
	        self.publish('reconnect', self.transport.name, self.reconnectionAttempts);
	      }

	      clearTimeout(self.reconnectionTimer);

	      self.removeListener('connect_failed', maybeReconnect);
	      self.removeListener('connect', maybeReconnect);

	      self.reconnecting = false;

	      delete self.reconnectionAttempts;
	      delete self.reconnectionDelay;
	      delete self.reconnectionTimer;
	      delete self.redoTransports;

	      self.options['try multiple transports'] = tryMultiple;
	    };

	    function maybeReconnect () {
	      if (!self.reconnecting) {
	        return;
	      }

	      if (self.connected) {
	        return reset();
	      };

	      if (self.connecting && self.reconnecting) {
	        return self.reconnectionTimer = setTimeout(maybeReconnect, 1000);
	      }

	      if (self.reconnectionAttempts++ >= maxAttempts) {
	        if (!self.redoTransports) {
	          self.on('connect_failed', maybeReconnect);
	          self.options['try multiple transports'] = true;
	          self.transports = self.origTransports;
	          self.transport = self.getTransport();
	          self.redoTransports = true;
	          self.connect();
	        } else {
	          self.publish('reconnect_failed');
	          reset();
	        }
	      } else {
	        if (self.reconnectionDelay < limit) {
	          self.reconnectionDelay *= 2; // exponential back off
	        }

	        self.connect();
	        self.publish('reconnecting', self.reconnectionDelay, self.reconnectionAttempts);
	        self.reconnectionTimer = setTimeout(maybeReconnect, self.reconnectionDelay);
	      }
	    };

	    this.options['try multiple transports'] = false;
	    this.reconnectionTimer = setTimeout(maybeReconnect, this.reconnectionDelay);

	    this.on('connect', maybeReconnect);
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.SocketNamespace = SocketNamespace;

	  /**
	   * Socket namespace constructor.
	   *
	   * @constructor
	   * @api public
	   */

	  function SocketNamespace (socket, name) {
	    this.socket = socket;
	    this.name = name || '';
	    this.flags = {};
	    this.json = new Flag(this, 'json');
	    this.ackPackets = 0;
	    this.acks = {};
	  };

	  /**
	   * Apply EventEmitter mixin.
	   */

	  io.util.mixin(SocketNamespace, io.EventEmitter);

	  /**
	   * Copies emit since we override it
	   *
	   * @api private
	   */

	  SocketNamespace.prototype.$emit = io.EventEmitter.prototype.emit;

	  /**
	   * Creates a new namespace, by proxying the request to the socket. This
	   * allows us to use the synax as we do on the server.
	   *
	   * @api public
	   */

	  SocketNamespace.prototype.of = function () {
	    return this.socket.of.apply(this.socket, arguments);
	  };

	  /**
	   * Sends a packet.
	   *
	   * @api private
	   */

	  SocketNamespace.prototype.packet = function (packet) {
	    packet.endpoint = this.name;
	    this.socket.packet(packet);
	    this.flags = {};
	    return this;
	  };

	  /**
	   * Sends a message
	   *
	   * @api public
	   */

	  SocketNamespace.prototype.send = function (data, fn) {
	    var packet = {
	        type: this.flags.json ? 'json' : 'message'
	      , data: data
	    };

	    if ('function' == typeof fn) {
	      packet.id = ++this.ackPackets;
	      packet.ack = true;
	      this.acks[packet.id] = fn;
	    }

	    return this.packet(packet);
	  };

	  /**
	   * Emits an event
	   *
	   * @api public
	   */
	  
	  SocketNamespace.prototype.emit = function (name) {
	    var args = Array.prototype.slice.call(arguments, 1)
	      , lastArg = args[args.length - 1]
	      , packet = {
	            type: 'event'
	          , name: name
	        };

	    if ('function' == typeof lastArg) {
	      packet.id = ++this.ackPackets;
	      packet.ack = 'data';
	      this.acks[packet.id] = lastArg;
	      args = args.slice(0, args.length - 1);
	    }

	    packet.args = args;

	    return this.packet(packet);
	  };

	  /**
	   * Disconnects the namespace
	   *
	   * @api private
	   */

	  SocketNamespace.prototype.disconnect = function () {
	    if (this.name === '') {
	      this.socket.disconnect();
	    } else {
	      this.packet({ type: 'disconnect' });
	      this.$emit('disconnect');
	    }

	    return this;
	  };

	  /**
	   * Handles a packet
	   *
	   * @api private
	   */

	  SocketNamespace.prototype.onPacket = function (packet) {
	    var self = this;

	    function ack () {
	      self.packet({
	          type: 'ack'
	        , args: io.util.toArray(arguments)
	        , ackId: packet.id
	      });
	    };

	    switch (packet.type) {
	      case 'connect':
	        this.$emit('connect');
	        break;

	      case 'disconnect':
	        if (this.name === '') {
	          this.socket.onDisconnect(packet.reason || 'booted');
	        } else {
	          this.$emit('disconnect', packet.reason);
	        }
	        break;

	      case 'message':
	      case 'json':
	        var params = ['message', packet.data];

	        if (packet.ack == 'data') {
	          params.push(ack);
	        } else if (packet.ack) {
	          this.packet({ type: 'ack', ackId: packet.id });
	        }

	        this.$emit.apply(this, params);
	        break;

	      case 'event':
	        var params = [packet.name].concat(packet.args);

	        if (packet.ack == 'data')
	          params.push(ack);

	        this.$emit.apply(this, params);
	        break;

	      case 'ack':
	        if (this.acks[packet.ackId]) {
	          this.acks[packet.ackId].apply(this, packet.args);
	          delete this.acks[packet.ackId];
	        }
	        break;

	      case 'error':
	        if (packet.advice){
	          this.socket.onError(packet);
	        } else {
	          if (packet.reason == 'unauthorized') {
	            this.$emit('connect_failed', packet.reason);
	          } else {
	            this.$emit('error', packet.reason);
	          }
	        }
	        break;
	    }
	  };

	  /**
	   * Flag interface.
	   *
	   * @api private
	   */

	  function Flag (nsp, name) {
	    this.namespace = nsp;
	    this.name = name;
	  };

	  /**
	   * Send a message
	   *
	   * @api public
	   */

	  Flag.prototype.send = function () {
	    this.namespace.flags[this.name] = true;
	    this.namespace.send.apply(this.namespace, arguments);
	  };

	  /**
	   * Emit an event
	   *
	   * @api public
	   */

	  Flag.prototype.emit = function () {
	    this.namespace.flags[this.name] = true;
	    this.namespace.emit.apply(this.namespace, arguments);
	  };

	})(
	    'undefined' != typeof io ? io : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {

	  /**
	   * Expose constructor.
	   */

	  exports.websocket = WS;

	  /**
	   * The WebSocket transport uses the HTML5 WebSocket API to establish an
	   * persistent connection with the Socket.IO server. This transport will also
	   * be inherited by the FlashSocket fallback as it provides a API compatible
	   * polyfill for the WebSockets.
	   *
	   * @constructor
	   * @extends {io.Transport}
	   * @api public
	   */

	  function WS (socket) {
	    io.Transport.apply(this, arguments);
	  };

	  /**
	   * Inherits from Transport.
	   */

	  io.util.inherit(WS, io.Transport);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  WS.prototype.name = 'websocket';

	  /**
	   * Initializes a new `WebSocket` connection with the Socket.IO server. We attach
	   * all the appropriate listeners to handle the responses from the server.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  WS.prototype.open = function () {
	    var query = io.util.query(this.socket.options.query)
	      , self = this
	      , Socket


	    if (!Socket) {
	      Socket = global.MozWebSocket || global.WebSocket;
	    }

	    this.websocket = new Socket(this.prepareUrl() + query);

	    this.websocket.onopen = function () {
	      self.onOpen();
	      self.socket.setBuffer(false);
	    };
	    this.websocket.onmessage = function (ev) {
	      self.onData(ev.data);
	    };
	    this.websocket.onclose = function () {
	      self.onClose();
	      self.socket.setBuffer(true);
	    };
	    this.websocket.onerror = function (e) {
	      self.onError(e);
	    };

	    return this;
	  };

	  /**
	   * Send a message to the Socket.IO server. The message will automatically be
	   * encoded in the correct message format.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  // Do to a bug in the current IDevices browser, we need to wrap the send in a 
	  // setTimeout, when they resume from sleeping the browser will crash if 
	  // we don't allow the browser time to detect the socket has been closed
	  if (io.util.ua.iDevice) {
	    WS.prototype.send = function (data) {
	      var self = this;
	      setTimeout(function() {
	         self.websocket.send(data);
	      },0);
	      return this;
	    };
	  } else {
	    WS.prototype.send = function (data) {
	      this.websocket.send(data);
	      return this;
	    };
	  }

	  /**
	   * Payload
	   *
	   * @api private
	   */

	  WS.prototype.payload = function (arr) {
	    for (var i = 0, l = arr.length; i < l; i++) {
	      this.packet(arr[i]);
	    }
	    return this;
	  };

	  /**
	   * Disconnect the established `WebSocket` connection.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  WS.prototype.close = function () {
	    this.websocket.close();
	    return this;
	  };

	  /**
	   * Handle the errors that `WebSocket` might be giving when we
	   * are attempting to connect or send messages.
	   *
	   * @param {Error} e The error.
	   * @api private
	   */

	  WS.prototype.onError = function (e) {
	    this.socket.onError(e);
	  };

	  /**
	   * Returns the appropriate scheme for the URI generation.
	   *
	   * @api private
	   */
	  WS.prototype.scheme = function () {
	    return this.socket.options.secure ? 'wss' : 'ws';
	  };

	  /**
	   * Checks if the browser has support for native `WebSockets` and that
	   * it's not the polyfill created for the FlashSocket transport.
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  WS.check = function () {
	    return ('WebSocket' in global && !('__addTask' in WebSocket))
	          || 'MozWebSocket' in global;
	  };

	  /**
	   * Check if the `WebSocket` transport support cross domain communications.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  WS.xdomainCheck = function () {
	    return true;
	  };

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('websocket');

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.flashsocket = Flashsocket;

	  /**
	   * The FlashSocket transport. This is a API wrapper for the HTML5 WebSocket
	   * specification. It uses a .swf file to communicate with the server. If you want
	   * to serve the .swf file from a other server than where the Socket.IO script is
	   * coming from you need to use the insecure version of the .swf. More information
	   * about this can be found on the github page.
	   *
	   * @constructor
	   * @extends {io.Transport.websocket}
	   * @api public
	   */

	  function Flashsocket () {
	    io.Transport.websocket.apply(this, arguments);
	  };

	  /**
	   * Inherits from Transport.
	   */

	  io.util.inherit(Flashsocket, io.Transport.websocket);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  Flashsocket.prototype.name = 'flashsocket';

	  /**
	   * Disconnect the established `FlashSocket` connection. This is done by adding a 
	   * new task to the FlashSocket. The rest will be handled off by the `WebSocket` 
	   * transport.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  Flashsocket.prototype.open = function () {
	    var self = this
	      , args = arguments;

	    WebSocket.__addTask(function () {
	      io.Transport.websocket.prototype.open.apply(self, args);
	    });
	    return this;
	  };
	  
	  /**
	   * Sends a message to the Socket.IO server. This is done by adding a new
	   * task to the FlashSocket. The rest will be handled off by the `WebSocket` 
	   * transport.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  Flashsocket.prototype.send = function () {
	    var self = this, args = arguments;
	    WebSocket.__addTask(function () {
	      io.Transport.websocket.prototype.send.apply(self, args);
	    });
	    return this;
	  };

	  /**
	   * Disconnects the established `FlashSocket` connection.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  Flashsocket.prototype.close = function () {
	    WebSocket.__tasks.length = 0;
	    io.Transport.websocket.prototype.close.call(this);
	    return this;
	  };

	  /**
	   * The WebSocket fall back needs to append the flash container to the body
	   * element, so we need to make sure we have access to it. Or defer the call
	   * until we are sure there is a body element.
	   *
	   * @param {Socket} socket The socket instance that needs a transport
	   * @param {Function} fn The callback
	   * @api private
	   */

	  Flashsocket.prototype.ready = function (socket, fn) {
	    function init () {
	      var options = socket.options
	        , port = options['flash policy port']
	        , path = [
	              'http' + (options.secure ? 's' : '') + ':/'
	            , options.host + ':' + options.port
	            , options.resource
	            , 'static/flashsocket'
	            , 'WebSocketMain' + (socket.isXDomain() ? 'Insecure' : '') + '.swf'
	          ];

	      // Only start downloading the swf file when the checked that this browser
	      // actually supports it
	      if (!Flashsocket.loaded) {
	        if (typeof WEB_SOCKET_SWF_LOCATION === 'undefined') {
	          // Set the correct file based on the XDomain settings
	          WEB_SOCKET_SWF_LOCATION = path.join('/');
	        }

	        if (port !== 843) {
	          WebSocket.loadFlashPolicyFile('xmlsocket://' + options.host + ':' + port);
	        }

	        WebSocket.__initialize();
	        Flashsocket.loaded = true;
	      }

	      fn.call(self);
	    }

	    var self = this;
	    if (document.body) return init();

	    io.util.load(init);
	  };

	  /**
	   * Check if the FlashSocket transport is supported as it requires that the Adobe
	   * Flash Player plug-in version `10.0.0` or greater is installed. And also check if
	   * the polyfill is correctly loaded.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  Flashsocket.check = function () {
	    if (
	        typeof WebSocket == 'undefined'
	      || !('__initialize' in WebSocket) || !swfobject
	    ) return false;

	    return swfobject.getFlashPlayerVersion().major >= 10;
	  };

	  /**
	   * Check if the FlashSocket transport can be used as cross domain / cross origin 
	   * transport. Because we can't see which type (secure or insecure) of .swf is used
	   * we will just return true.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  Flashsocket.xdomainCheck = function () {
	    return true;
	  };

	  /**
	   * Disable AUTO_INITIALIZATION
	   */

	  if (typeof window != 'undefined') {
	    WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = true;
	  }

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('flashsocket');
	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);
	/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
		is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
	*/
	if ('undefined' != typeof window) {
	var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O[(['Active'].concat('Object').join('X'))]!=D){try{var ad=new window[(['Active'].concat('Object').join('X'))](W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?(['Active'].concat('').join('X')):"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
	}
	// Copyright: Hiroshi Ichikawa <http://gimite.net/en/>
	// License: New BSD License
	// Reference: http://dev.w3.org/html5/websockets/
	// Reference: http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol

	(function() {
	  
	  if ('undefined' == typeof window || window.WebSocket) return;

	  var console = window.console;
	  if (!console || !console.log || !console.error) {
	    console = {log: function(){ }, error: function(){ }};
	  }
	  
	  if (!swfobject.hasFlashPlayerVersion("10.0.0")) {
	    console.error("Flash Player >= 10.0.0 is required.");
	    return;
	  }
	  if (location.protocol == "file:") {
	    console.error(
	      "WARNING: web-socket-js doesn't work in file:///... URL " +
	      "unless you set Flash Security Settings properly. " +
	      "Open the page via Web server i.e. http://...");
	  }

	  /**
	   * This class represents a faux web socket.
	   * @param {string} url
	   * @param {array or string} protocols
	   * @param {string} proxyHost
	   * @param {int} proxyPort
	   * @param {string} headers
	   */
	  WebSocket = function(url, protocols, proxyHost, proxyPort, headers) {
	    var self = this;
	    self.__id = WebSocket.__nextId++;
	    WebSocket.__instances[self.__id] = self;
	    self.readyState = WebSocket.CONNECTING;
	    self.bufferedAmount = 0;
	    self.__events = {};
	    if (!protocols) {
	      protocols = [];
	    } else if (typeof protocols == "string") {
	      protocols = [protocols];
	    }
	    // Uses setTimeout() to make sure __createFlash() runs after the caller sets ws.onopen etc.
	    // Otherwise, when onopen fires immediately, onopen is called before it is set.
	    setTimeout(function() {
	      WebSocket.__addTask(function() {
	        WebSocket.__flash.create(
	            self.__id, url, protocols, proxyHost || null, proxyPort || 0, headers || null);
	      });
	    }, 0);
	  };

	  /**
	   * Send data to the web socket.
	   * @param {string} data  The data to send to the socket.
	   * @return {boolean}  True for success, false for failure.
	   */
	  WebSocket.prototype.send = function(data) {
	    if (this.readyState == WebSocket.CONNECTING) {
	      throw "INVALID_STATE_ERR: Web Socket connection has not been established";
	    }
	    // We use encodeURIComponent() here, because FABridge doesn't work if
	    // the argument includes some characters. We don't use escape() here
	    // because of this:
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Functions#escape_and_unescape_Functions
	    // But it looks decodeURIComponent(encodeURIComponent(s)) doesn't
	    // preserve all Unicode characters either e.g. "\uffff" in Firefox.
	    // Note by wtritch: Hopefully this will not be necessary using ExternalInterface.  Will require
	    // additional testing.
	    var result = WebSocket.__flash.send(this.__id, encodeURIComponent(data));
	    if (result < 0) { // success
	      return true;
	    } else {
	      this.bufferedAmount += result;
	      return false;
	    }
	  };

	  /**
	   * Close this web socket gracefully.
	   */
	  WebSocket.prototype.close = function() {
	    if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) {
	      return;
	    }
	    this.readyState = WebSocket.CLOSING;
	    WebSocket.__flash.close(this.__id);
	  };

	  /**
	   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
	   *
	   * @param {string} type
	   * @param {function} listener
	   * @param {boolean} useCapture
	   * @return void
	   */
	  WebSocket.prototype.addEventListener = function(type, listener, useCapture) {
	    if (!(type in this.__events)) {
	      this.__events[type] = [];
	    }
	    this.__events[type].push(listener);
	  };

	  /**
	   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
	   *
	   * @param {string} type
	   * @param {function} listener
	   * @param {boolean} useCapture
	   * @return void
	   */
	  WebSocket.prototype.removeEventListener = function(type, listener, useCapture) {
	    if (!(type in this.__events)) return;
	    var events = this.__events[type];
	    for (var i = events.length - 1; i >= 0; --i) {
	      if (events[i] === listener) {
	        events.splice(i, 1);
	        break;
	      }
	    }
	  };

	  /**
	   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
	   *
	   * @param {Event} event
	   * @return void
	   */
	  WebSocket.prototype.dispatchEvent = function(event) {
	    var events = this.__events[event.type] || [];
	    for (var i = 0; i < events.length; ++i) {
	      events[i](event);
	    }
	    var handler = this["on" + event.type];
	    if (handler) handler(event);
	  };

	  /**
	   * Handles an event from Flash.
	   * @param {Object} flashEvent
	   */
	  WebSocket.prototype.__handleEvent = function(flashEvent) {
	    if ("readyState" in flashEvent) {
	      this.readyState = flashEvent.readyState;
	    }
	    if ("protocol" in flashEvent) {
	      this.protocol = flashEvent.protocol;
	    }
	    
	    var jsEvent;
	    if (flashEvent.type == "open" || flashEvent.type == "error") {
	      jsEvent = this.__createSimpleEvent(flashEvent.type);
	    } else if (flashEvent.type == "close") {
	      // TODO implement jsEvent.wasClean
	      jsEvent = this.__createSimpleEvent("close");
	    } else if (flashEvent.type == "message") {
	      var data = decodeURIComponent(flashEvent.message);
	      jsEvent = this.__createMessageEvent("message", data);
	    } else {
	      throw "unknown event type: " + flashEvent.type;
	    }
	    
	    this.dispatchEvent(jsEvent);
	  };
	  
	  WebSocket.prototype.__createSimpleEvent = function(type) {
	    if (document.createEvent && window.Event) {
	      var event = document.createEvent("Event");
	      event.initEvent(type, false, false);
	      return event;
	    } else {
	      return {type: type, bubbles: false, cancelable: false};
	    }
	  };
	  
	  WebSocket.prototype.__createMessageEvent = function(type, data) {
	    if (document.createEvent && window.MessageEvent && !window.opera) {
	      var event = document.createEvent("MessageEvent");
	      event.initMessageEvent("message", false, false, data, null, null, window, null);
	      return event;
	    } else {
	      // IE and Opera, the latter one truncates the data parameter after any 0x00 bytes.
	      return {type: type, data: data, bubbles: false, cancelable: false};
	    }
	  };
	  
	  /**
	   * Define the WebSocket readyState enumeration.
	   */
	  WebSocket.CONNECTING = 0;
	  WebSocket.OPEN = 1;
	  WebSocket.CLOSING = 2;
	  WebSocket.CLOSED = 3;

	  WebSocket.__flash = null;
	  WebSocket.__instances = {};
	  WebSocket.__tasks = [];
	  WebSocket.__nextId = 0;
	  
	  /**
	   * Load a new flash security policy file.
	   * @param {string} url
	   */
	  WebSocket.loadFlashPolicyFile = function(url){
	    WebSocket.__addTask(function() {
	      WebSocket.__flash.loadManualPolicyFile(url);
	    });
	  };

	  /**
	   * Loads WebSocketMain.swf and creates WebSocketMain object in Flash.
	   */
	  WebSocket.__initialize = function() {
	    if (WebSocket.__flash) return;
	    
	    if (WebSocket.__swfLocation) {
	      // For backword compatibility.
	      window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation;
	    }
	    if (!window.WEB_SOCKET_SWF_LOCATION) {
	      console.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
	      return;
	    }
	    var container = document.createElement("div");
	    container.id = "webSocketContainer";
	    // Hides Flash box. We cannot use display: none or visibility: hidden because it prevents
	    // Flash from loading at least in IE. So we move it out of the screen at (-100, -100).
	    // But this even doesn't work with Flash Lite (e.g. in Droid Incredible). So with Flash
	    // Lite, we put it at (0, 0). This shows 1x1 box visible at left-top corner but this is
	    // the best we can do as far as we know now.
	    container.style.position = "absolute";
	    if (WebSocket.__isFlashLite()) {
	      container.style.left = "0px";
	      container.style.top = "0px";
	    } else {
	      container.style.left = "-100px";
	      container.style.top = "-100px";
	    }
	    var holder = document.createElement("div");
	    holder.id = "webSocketFlash";
	    container.appendChild(holder);
	    document.body.appendChild(container);
	    // See this article for hasPriority:
	    // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
	    swfobject.embedSWF(
	      WEB_SOCKET_SWF_LOCATION,
	      "webSocketFlash",
	      "1" /* width */,
	      "1" /* height */,
	      "10.0.0" /* SWF version */,
	      null,
	      null,
	      {hasPriority: true, swliveconnect : true, allowScriptAccess: "always"},
	      null,
	      function(e) {
	        if (!e.success) {
	          console.error("[WebSocket] swfobject.embedSWF failed");
	        }
	      });
	  };
	  
	  /**
	   * Called by Flash to notify JS that it's fully loaded and ready
	   * for communication.
	   */
	  WebSocket.__onFlashInitialized = function() {
	    // We need to set a timeout here to avoid round-trip calls
	    // to flash during the initialization process.
	    setTimeout(function() {
	      WebSocket.__flash = document.getElementById("webSocketFlash");
	      WebSocket.__flash.setCallerUrl(location.href);
	      WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
	      for (var i = 0; i < WebSocket.__tasks.length; ++i) {
	        WebSocket.__tasks[i]();
	      }
	      WebSocket.__tasks = [];
	    }, 0);
	  };
	  
	  /**
	   * Called by Flash to notify WebSockets events are fired.
	   */
	  WebSocket.__onFlashEvent = function() {
	    setTimeout(function() {
	      try {
	        // Gets events using receiveEvents() instead of getting it from event object
	        // of Flash event. This is to make sure to keep message order.
	        // It seems sometimes Flash events don't arrive in the same order as they are sent.
	        var events = WebSocket.__flash.receiveEvents();
	        for (var i = 0; i < events.length; ++i) {
	          WebSocket.__instances[events[i].webSocketId].__handleEvent(events[i]);
	        }
	      } catch (e) {
	        console.error(e);
	      }
	    }, 0);
	    return true;
	  };
	  
	  // Called by Flash.
	  WebSocket.__log = function(message) {
	    console.log(decodeURIComponent(message));
	  };
	  
	  // Called by Flash.
	  WebSocket.__error = function(message) {
	    console.error(decodeURIComponent(message));
	  };
	  
	  WebSocket.__addTask = function(task) {
	    if (WebSocket.__flash) {
	      task();
	    } else {
	      WebSocket.__tasks.push(task);
	    }
	  };
	  
	  /**
	   * Test if the browser is running flash lite.
	   * @return {boolean} True if flash lite is running, false otherwise.
	   */
	  WebSocket.__isFlashLite = function() {
	    if (!window.navigator || !window.navigator.mimeTypes) {
	      return false;
	    }
	    var mimeType = window.navigator.mimeTypes["application/x-shockwave-flash"];
	    if (!mimeType || !mimeType.enabledPlugin || !mimeType.enabledPlugin.filename) {
	      return false;
	    }
	    return mimeType.enabledPlugin.filename.match(/flashlite/i) ? true : false;
	  };
	  
	  if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) {
	    if (window.addEventListener) {
	      window.addEventListener("load", function(){
	        WebSocket.__initialize();
	      }, false);
	    } else {
	      window.attachEvent("onload", function(){
	        WebSocket.__initialize();
	      });
	    }
	  }
	  
	})();

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {

	  /**
	   * Expose constructor.
	   *
	   * @api public
	   */

	  exports.XHR = XHR;

	  /**
	   * XHR constructor
	   *
	   * @costructor
	   * @api public
	   */

	  function XHR (socket) {
	    if (!socket) return;

	    io.Transport.apply(this, arguments);
	    this.sendBuffer = [];
	  };

	  /**
	   * Inherits from Transport.
	   */

	  io.util.inherit(XHR, io.Transport);

	  /**
	   * Establish a connection
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  XHR.prototype.open = function () {
	    this.socket.setBuffer(false);
	    this.onOpen();
	    this.get();

	    // we need to make sure the request succeeds since we have no indication
	    // whether the request opened or not until it succeeded.
	    this.setCloseTimeout();

	    return this;
	  };

	  /**
	   * Check if we need to send data to the Socket.IO server, if we have data in our
	   * buffer we encode it and forward it to the `post` method.
	   *
	   * @api private
	   */

	  XHR.prototype.payload = function (payload) {
	    var msgs = [];

	    for (var i = 0, l = payload.length; i < l; i++) {
	      msgs.push(io.parser.encodePacket(payload[i]));
	    }

	    this.send(io.parser.encodePayload(msgs));
	  };

	  /**
	   * Send data to the Socket.IO server.
	   *
	   * @param data The message
	   * @returns {Transport}
	   * @api public
	   */

	  XHR.prototype.send = function (data) {
	    this.post(data);
	    return this;
	  };

	  /**
	   * Posts a encoded message to the Socket.IO server.
	   *
	   * @param {String} data A encoded message.
	   * @api private
	   */

	  function empty () { };

	  XHR.prototype.post = function (data) {
	    var self = this;
	    this.socket.setBuffer(true);

	    function stateChange () {
	      if (this.readyState == 4) {
	        this.onreadystatechange = empty;
	        self.posting = false;

	        if (this.status == 200){
	          self.socket.setBuffer(false);
	        } else {
	          self.onClose();
	        }
	      }
	    }

	    function onload () {
	      this.onload = empty;
	      self.socket.setBuffer(false);
	    };

	    this.sendXHR = this.request('POST');

	    if (global.XDomainRequest && this.sendXHR instanceof XDomainRequest) {
	      this.sendXHR.onload = this.sendXHR.onerror = onload;
	    } else {
	      this.sendXHR.onreadystatechange = stateChange;
	    }

	    this.sendXHR.send(data);
	  };

	  /**
	   * Disconnects the established `XHR` connection.
	   *
	   * @returns {Transport}
	   * @api public
	   */

	  XHR.prototype.close = function () {
	    this.onClose();
	    return this;
	  };

	  /**
	   * Generates a configured XHR request
	   *
	   * @param {String} url The url that needs to be requested.
	   * @param {String} method The method the request should use.
	   * @returns {XMLHttpRequest}
	   * @api private
	   */

	  XHR.prototype.request = function (method) {
	    var req = io.util.request(this.socket.isXDomain())
	      , query = io.util.query(this.socket.options.query, 't=' + +new Date);

	    req.open(method || 'GET', this.prepareUrl() + query, true);

	    if (method == 'POST') {
	      try {
	        if (req.setRequestHeader) {
	          req.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
	        } else {
	          // XDomainRequest
	          req.contentType = 'text/plain';
	        }
	      } catch (e) {}
	    }

	    return req;
	  };

	  /**
	   * Returns the scheme to use for the transport URLs.
	   *
	   * @api private
	   */

	  XHR.prototype.scheme = function () {
	    return this.socket.options.secure ? 'https' : 'http';
	  };

	  /**
	   * Check if the XHR transports are supported
	   *
	   * @param {Boolean} xdomain Check if we support cross domain requests.
	   * @returns {Boolean}
	   * @api public
	   */

	  XHR.check = function (socket, xdomain) {
	    try {
	      var request = io.util.request(xdomain),
	          usesXDomReq = (global.XDomainRequest && request instanceof XDomainRequest),
	          socketProtocol = (socket && socket.options && socket.options.secure ? 'https:' : 'http:'),
	          isXProtocol = (socketProtocol != global.location.protocol);
	      if (request && !(usesXDomReq && isXProtocol)) {
	        return true;
	      }
	    } catch(e) {}

	    return false;
	  };

	  /**
	   * Check if the XHR transport supports cross domain requests.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  XHR.xdomainCheck = function (socket) {
	    return XHR.check(socket, true);
	  };

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);
	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io) {

	  /**
	   * Expose constructor.
	   */

	  exports.htmlfile = HTMLFile;

	  /**
	   * The HTMLFile transport creates a `forever iframe` based transport
	   * for Internet Explorer. Regular forever iframe implementations will 
	   * continuously trigger the browsers buzy indicators. If the forever iframe
	   * is created inside a `htmlfile` these indicators will not be trigged.
	   *
	   * @constructor
	   * @extends {io.Transport.XHR}
	   * @api public
	   */

	  function HTMLFile (socket) {
	    io.Transport.XHR.apply(this, arguments);
	  };

	  /**
	   * Inherits from XHR transport.
	   */

	  io.util.inherit(HTMLFile, io.Transport.XHR);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  HTMLFile.prototype.name = 'htmlfile';

	  /**
	   * Creates a new Ac...eX `htmlfile` with a forever loading iframe
	   * that can be used to listen to messages. Inside the generated
	   * `htmlfile` a reference will be made to the HTMLFile transport.
	   *
	   * @api private
	   */

	  HTMLFile.prototype.get = function () {
	    this.doc = new window[(['Active'].concat('Object').join('X'))]('htmlfile');
	    this.doc.open();
	    this.doc.write('<html></html>');
	    this.doc.close();
	    this.doc.parentWindow.s = this;

	    var iframeC = this.doc.createElement('div');
	    iframeC.className = 'socketio';

	    this.doc.body.appendChild(iframeC);
	    this.iframe = this.doc.createElement('iframe');

	    iframeC.appendChild(this.iframe);

	    var self = this
	      , query = io.util.query(this.socket.options.query, 't='+ +new Date);

	    this.iframe.src = this.prepareUrl() + query;

	    io.util.on(window, 'unload', function () {
	      self.destroy();
	    });
	  };

	  /**
	   * The Socket.IO server will write script tags inside the forever
	   * iframe, this function will be used as callback for the incoming
	   * information.
	   *
	   * @param {String} data The message
	   * @param {document} doc Reference to the context
	   * @api private
	   */

	  HTMLFile.prototype._ = function (data, doc) {
	    this.onData(data);
	    try {
	      var script = doc.getElementsByTagName('script')[0];
	      script.parentNode.removeChild(script);
	    } catch (e) { }
	  };

	  /**
	   * Destroy the established connection, iframe and `htmlfile`.
	   * And calls the `CollectGarbage` function of Internet Explorer
	   * to release the memory.
	   *
	   * @api private
	   */

	  HTMLFile.prototype.destroy = function () {
	    if (this.iframe){
	      try {
	        this.iframe.src = 'about:blank';
	      } catch(e){}

	      this.doc = null;
	      this.iframe.parentNode.removeChild(this.iframe);
	      this.iframe = null;

	      CollectGarbage();
	    }
	  };

	  /**
	   * Disconnects the established connection.
	   *
	   * @returns {Transport} Chaining.
	   * @api public
	   */

	  HTMLFile.prototype.close = function () {
	    this.destroy();
	    return io.Transport.XHR.prototype.close.call(this);
	  };

	  /**
	   * Checks if the browser supports this transport. The browser
	   * must have an `Ac...eXObject` implementation.
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  HTMLFile.check = function (socket) {
	    if (typeof window != "undefined" && (['Active'].concat('Object').join('X')) in window){
	      try {
	        var a = new window[(['Active'].concat('Object').join('X'))]('htmlfile');
	        return a && io.Transport.XHR.check(socket);
	      } catch(e){}
	    }
	    return false;
	  };

	  /**
	   * Check if cross domain requests are supported.
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  HTMLFile.xdomainCheck = function () {
	    // we can probably do handling for sub-domains, we should
	    // test that it's cross domain but a subdomain here
	    return false;
	  };

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('htmlfile');

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {

	  /**
	   * Expose constructor.
	   */

	  exports['xhr-polling'] = XHRPolling;

	  /**
	   * The XHR-polling transport uses long polling XHR requests to create a
	   * "persistent" connection with the server.
	   *
	   * @constructor
	   * @api public
	   */

	  function XHRPolling () {
	    io.Transport.XHR.apply(this, arguments);
	  };

	  /**
	   * Inherits from XHR transport.
	   */

	  io.util.inherit(XHRPolling, io.Transport.XHR);

	  /**
	   * Merge the properties from XHR transport
	   */

	  io.util.merge(XHRPolling, io.Transport.XHR);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  XHRPolling.prototype.name = 'xhr-polling';

	  /**
	   * Indicates whether heartbeats is enabled for this transport
	   *
	   * @api private
	   */

	  XHRPolling.prototype.heartbeats = function () {
	    return false;
	  };

	  /** 
	   * Establish a connection, for iPhone and Android this will be done once the page
	   * is loaded.
	   *
	   * @returns {Transport} Chaining.
	   * @api public
	   */

	  XHRPolling.prototype.open = function () {
	    var self = this;

	    io.Transport.XHR.prototype.open.call(self);
	    return false;
	  };

	  /**
	   * Starts a XHR request to wait for incoming messages.
	   *
	   * @api private
	   */

	  function empty () {};

	  XHRPolling.prototype.get = function () {
	    if (!this.isOpen) return;

	    var self = this;

	    function stateChange () {
	      if (this.readyState == 4) {
	        this.onreadystatechange = empty;

	        if (this.status == 200) {
	          self.onData(this.responseText);
	          self.get();
	        } else {
	          self.onClose();
	        }
	      }
	    };

	    function onload () {
	      this.onload = empty;
	      this.onerror = empty;
	      self.onData(this.responseText);
	      self.get();
	    };

	    function onerror () {
	      self.onClose();
	    };

	    this.xhr = this.request();

	    if (global.XDomainRequest && this.xhr instanceof XDomainRequest) {
	      this.xhr.onload = onload;
	      this.xhr.onerror = onerror;
	    } else {
	      this.xhr.onreadystatechange = stateChange;
	    }

	    this.xhr.send(null);
	  };

	  /**
	   * Handle the unclean close behavior.
	   *
	   * @api private
	   */

	  XHRPolling.prototype.onClose = function () {
	    io.Transport.XHR.prototype.onClose.call(this);

	    if (this.xhr) {
	      this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = empty;
	      try {
	        this.xhr.abort();
	      } catch(e){}
	      this.xhr = null;
	    }
	  };

	  /**
	   * Webkit based browsers show a infinit spinner when you start a XHR request
	   * before the browsers onload event is called so we need to defer opening of
	   * the transport until the onload event is called. Wrapping the cb in our
	   * defer method solve this.
	   *
	   * @param {Socket} socket The socket instance that needs a transport
	   * @param {Function} fn The callback
	   * @api private
	   */

	  XHRPolling.prototype.ready = function (socket, fn) {
	    var self = this;

	    io.util.defer(function () {
	      fn.call(self);
	    });
	  };

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('xhr-polling');

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);

	/**
	 * socket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	(function (exports, io, global) {
	  /**
	   * There is a way to hide the loading indicator in Firefox. If you create and
	   * remove a iframe it will stop showing the current loading indicator.
	   * Unfortunately we can't feature detect that and UA sniffing is evil.
	   *
	   * @api private
	   */

	  var indicator = global.document && "MozAppearance" in
	    global.document.documentElement.style;

	  /**
	   * Expose constructor.
	   */

	  exports['jsonp-polling'] = JSONPPolling;

	  /**
	   * The JSONP transport creates an persistent connection by dynamically
	   * inserting a script tag in the page. This script tag will receive the
	   * information of the Socket.IO server. When new information is received
	   * it creates a new script tag for the new data stream.
	   *
	   * @constructor
	   * @extends {io.Transport.xhr-polling}
	   * @api public
	   */

	  function JSONPPolling (socket) {
	    io.Transport['xhr-polling'].apply(this, arguments);

	    this.index = io.j.length;

	    var self = this;

	    io.j.push(function (msg) {
	      self._(msg);
	    });
	  };

	  /**
	   * Inherits from XHR polling transport.
	   */

	  io.util.inherit(JSONPPolling, io.Transport['xhr-polling']);

	  /**
	   * Transport name
	   *
	   * @api public
	   */

	  JSONPPolling.prototype.name = 'jsonp-polling';

	  /**
	   * Posts a encoded message to the Socket.IO server using an iframe.
	   * The iframe is used because script tags can create POST based requests.
	   * The iframe is positioned outside of the view so the user does not
	   * notice it's existence.
	   *
	   * @param {String} data A encoded message.
	   * @api private
	   */

	  JSONPPolling.prototype.post = function (data) {
	    var self = this
	      , query = io.util.query(
	             this.socket.options.query
	          , 't='+ (+new Date) + '&i=' + this.index
	        );

	    if (!this.form) {
	      var form = document.createElement('form')
	        , area = document.createElement('textarea')
	        , id = this.iframeId = 'socketio_iframe_' + this.index
	        , iframe;

	      form.className = 'socketio';
	      form.style.position = 'absolute';
	      form.style.top = '0px';
	      form.style.left = '0px';
	      form.style.display = 'none';
	      form.target = id;
	      form.method = 'POST';
	      form.setAttribute('accept-charset', 'utf-8');
	      area.name = 'd';
	      form.appendChild(area);
	      document.body.appendChild(form);

	      this.form = form;
	      this.area = area;
	    }

	    this.form.action = this.prepareUrl() + query;

	    function complete () {
	      initIframe();
	      self.socket.setBuffer(false);
	    };

	    function initIframe () {
	      if (self.iframe) {
	        self.form.removeChild(self.iframe);
	      }

	      try {
	        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	        iframe = document.createElement('<iframe name="'+ self.iframeId +'">');
	      } catch (e) {
	        iframe = document.createElement('iframe');
	        iframe.name = self.iframeId;
	      }

	      iframe.id = self.iframeId;

	      self.form.appendChild(iframe);
	      self.iframe = iframe;
	    };

	    initIframe();

	    // we temporarily stringify until we figure out how to prevent
	    // browsers from turning `\n` into `\r\n` in form inputs
	    this.area.value = io.JSON.stringify(data);

	    try {
	      this.form.submit();
	    } catch(e) {}

	    if (this.iframe.attachEvent) {
	      iframe.onreadystatechange = function () {
	        if (self.iframe.readyState == 'complete') {
	          complete();
	        }
	      };
	    } else {
	      this.iframe.onload = complete;
	    }

	    this.socket.setBuffer(true);
	  };
	  
	  /**
	   * Creates a new JSONP poll that can be used to listen
	   * for messages from the Socket.IO server.
	   *
	   * @api private
	   */

	  JSONPPolling.prototype.get = function () {
	    var self = this
	      , script = document.createElement('script')
	      , query = io.util.query(
	             this.socket.options.query
	          , 't='+ (+new Date) + '&i=' + this.index
	        );

	    if (this.script) {
	      this.script.parentNode.removeChild(this.script);
	      this.script = null;
	    }

	    script.async = true;
	    script.src = this.prepareUrl() + query;
	    script.onerror = function () {
	      self.onClose();
	    };

	    var insertAt = document.getElementsByTagName('script')[0]
	    insertAt.parentNode.insertBefore(script, insertAt);
	    this.script = script;

	    if (indicator) {
	      setTimeout(function () {
	        var iframe = document.createElement('iframe');
	        document.body.appendChild(iframe);
	        document.body.removeChild(iframe);
	      }, 100);
	    }
	  };

	  /**
	   * Callback function for the incoming message stream from the Socket.IO server.
	   *
	   * @param {String} data The message
	   * @api private
	   */

	  JSONPPolling.prototype._ = function (msg) {
	    this.onData(msg);
	    if (this.isOpen) {
	      this.get();
	    }
	    return this;
	  };

	  /**
	   * The indicator hack only works after onload
	   *
	   * @param {Socket} socket The socket instance that needs a transport
	   * @param {Function} fn The callback
	   * @api private
	   */

	  JSONPPolling.prototype.ready = function (socket, fn) {
	    var self = this;
	    if (!indicator) return fn.call(this);

	    io.util.load(function () {
	      fn.call(self);
	    });
	  };

	  /**
	   * Checks if browser supports this transport.
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  JSONPPolling.check = function () {
	    return 'document' in global;
	  };

	  /**
	   * Check if cross domain requests are supported
	   *
	   * @returns {Boolean}
	   * @api public
	   */

	  JSONPPolling.xdomainCheck = function () {
	    return true;
	  };

	  /**
	   * Add the transport to your public io.transports array.
	   *
	   * @api private
	   */

	  io.transports.push('jsonp-polling');

	})(
	    'undefined' != typeof io ? io.Transport : module.exports
	  , 'undefined' != typeof io ? io : module.parent.exports
	  , this
	);

	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)(module)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.1.1
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-05-01T17:11Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper window is present,
			// execute the factory and get jQuery
			// For environments that do not inherently posses a window with a document
			// (such as Node.js), expose a jQuery-making factory as module.exports
			// This accentuates the need for the creation of a real window
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Can't do this because several apps including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	// Support: Firefox 18+
	//

	var arr = [];

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		version = "2.1.1",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor(null);
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}

		// extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		// See test/unit/core.js for details concerning isFunction.
		// Since version 1.3, DOM methods and functions like alert
		// aren't supported. They return false on IE (#2968).
		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
		},

		isPlainObject: function( obj ) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
			// Support: Android < 4.0, iOS < 6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call(obj) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf("use strict") === 1 ) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval
					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		// args is for internal usage only
		each: function( obj, callback, args ) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike( obj );

			if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				}

			// A special, fast, case for the most common use of each
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArraylike( Object(arr) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});

	function isArraylike( obj ) {
		var length = obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.nodeType === 1 && length ) {
			return true;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v1.10.19
	 * http://sizzlejs.com/
	 *
	 * Copyright 2013 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-04-18
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + -(new Date()),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		strundefined = typeof undefined,
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf if we can't use a native one
		indexOf = arr.indexOf || function( elem ) {
			var i = 0,
				len = this.length;
			for ( ; i < len; i++ ) {
				if ( this[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
		// http://www.w3.org/TR/css3-syntax/#characters
		characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Loosely modeled on CSS identifier characters
		// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
		// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = characterEncoding.replace( "w", "w#" ),

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + characterEncoding + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + characterEncoding + ")" ),
			"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
			"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var match, elem, m, nodeType,
			// QSA vars
			i, groups, old, nid, newContext, newSelector;

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}

		context = context || document;
		results = results || [];

		if ( !selector || typeof selector !== "string" ) {
			return results;
		}

		if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
			return [];
		}

		if ( documentIsHTML && !seed ) {

			// Shortcuts
			if ( (match = rquickExpr.exec( selector )) ) {
				// Speed-up: Sizzle("#ID")
				if ( (m = match[1]) ) {
					if ( nodeType === 9 ) {
						elem = context.getElementById( m );
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document (jQuery #6963)
						if ( elem && elem.parentNode ) {
							// Handle the case where IE, Opera, and Webkit return items
							// by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						// Context is not a document
						if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
							contains( context, elem ) && elem.id === m ) {
							results.push( elem );
							return results;
						}
					}

				// Speed-up: Sizzle("TAG")
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Speed-up: Sizzle(".CLASS")
				} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// QSA path
			if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				nid = old = expando;
				newContext = context;
				newSelector = nodeType === 9 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + toSelector( groups[i] );
					}
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = attrs.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== strundefined && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare,
			doc = node ? node.ownerDocument || node : preferredDoc,
			parent = doc.defaultView;

		// If no document and documentElement is available, return
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Set our document
		document = doc;
		docElem = doc.documentElement;

		// Support tests
		documentIsHTML = !isXML( doc );

		// Support: IE>8
		// If iframe document is assigned to "document" variable and if iframe has been reloaded,
		// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
		// IE6-8 do not support the defaultView property so parent will be undefined
		if ( parent && parent !== parent.top ) {
			// IE11 does not have attachEvent, so all must suffer
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", function() {
					setDocument();
				}, false );
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", function() {
					setDocument();
				});
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( doc.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Check if getElementsByClassName can be trusted
		support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
			div.innerHTML = "<div class='a'></div><div class='a i'></div>";

			// Support: Safari<4
			// Catch class over-caching
			div.firstChild.className = "i";
			// Support: Opera<10
			// Catch gEBCN failure to find non-leading classes
			return div.getElementsByClassName("i").length === 2;
		});

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowclip^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = doc.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully does not implement inclusive descendent
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === doc ? -1 :
					b === doc ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return doc;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch(e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, outerCache, node, diff, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
								// Seek `elem` from a previously-cached index
								outerCache = parent[ expando ] || (parent[ expando ] = {});
								cache = outerCache[ type ] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										outerCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							// Use previously-cached element index if available
							} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
								diff = cache[1];

							// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
							} else {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
										// Cache the index of each encountered element
										if ( useCache ) {
											(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf.call( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
							if ( (oldCache = outerCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								outerCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf.call( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context !== document && context;
				}

				// Add elements passing elementMatchers directly to results
				// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context, xml ) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// Apply set filters to unmatched elements
				matchedCount += i;
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is no seed and only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome<14
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			});

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			});

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
		});
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	};

	jQuery.fn.extend({
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter(function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow(this, selector || [], false) );
		},
		not: function( selector ) {
			return this.pushStack( winnow(this, selector || [], true) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	});


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && (match[1] || !context) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;

						// scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[2] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return typeof rootjQuery.ready !== "undefined" ?
					rootjQuery.ready( selector ) :
					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		// methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.extend({
		dir: function( elem, dir, until ) {
			var matched = [],
				truncate = until !== undefined;

			while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
				if ( elem.nodeType === 1 ) {
					if ( truncate && jQuery( elem ).is( until ) ) {
						break;
					}
					matched.push( elem );
				}
			}
			return matched;
		},

		sibling: function( n, elem ) {
			var matched = [];

			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					matched.push( n );
				}
			}

			return matched;
		}
	});

	jQuery.fn.extend({
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter(function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
					// Always skip document fragments
					if ( cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector(cur, selectors)) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
		},

		// Determine the position of an element within
		// the matched set of elements
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.unique(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});

	function sibling( cur, dir ) {
		while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.unique( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	});
	var rnotwhite = (/\S+/g);



	// String to Object options format cache
	var optionsCache = {};

	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			( optionsCache[ options ] || createOptions( options ) ) :
			jQuery.extend( {}, options );

		var // Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to know if list is currently firing
			firing,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = !options.once && [],
			// Fire callbacks
			fire = function( data ) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( stack ) {
						if ( stack.length ) {
							fire( stack.shift() );
						}
					} else if ( memory ) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						// First, we save the current length
						var start = list.length;
						(function add( args ) {
							jQuery.each( args, function( _, arg ) {
								var type = jQuery.type( arg );
								if ( type === "function" ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && type !== "string" ) {
									// Inspect recursively
									add( arg );
								}
							});
						})( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
						// With memory, if we're not firing then
						// we should call right away
						} else if ( memory ) {
							firingStart = start;
							fire( memory );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );
								// Handle firing indexes
								if ( firing ) {
									if ( index <= firingLength ) {
										firingLength--;
									}
									if ( index <= firingIndex ) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( list && ( !fired || stack ) ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						if ( firing ) {
							stack.push( args );
						} else {
							fire( args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend({

		Deferred: function( func ) {
			var tuples = [
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[1] ](function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[1] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(function() {
						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[0] ] = function() {
					deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[0] + "With" ] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject )
							.progress( updateFunc( i, progressContexts, progressValues ) );
					} else {
						--remaining;
					}
				}
			}

			// if we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	});


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend({
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	});

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called after the browser event has already occurred.
			// we once tried to use readyState "interactive" here, but it caused issues like the one
			// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
			if ( document.readyState === "complete" ) {
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed, false );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed, false );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[0], key ) : emptyGet;
	};


	/**
	 * Determines whether an object can have data
	 */
	jQuery.acceptData = function( owner ) {
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};


	function Data() {
		// Support: Android < 4,
		// Old WebKit does not have Object.preventExtensions/freeze method,
		// return new empty object instead with no [[set]] accessor
		Object.defineProperty( this.cache = {}, 0, {
			get: function() {
				return {};
			}
		});

		this.expando = jQuery.expando + Math.random();
	}

	Data.uid = 1;
	Data.accepts = jQuery.acceptData;

	Data.prototype = {
		key: function( owner ) {
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return the key for a frozen object.
			if ( !Data.accepts( owner ) ) {
				return 0;
			}

			var descriptor = {},
				// Check if the owner object already has a cache key
				unlock = owner[ this.expando ];

			// If not, create one
			if ( !unlock ) {
				unlock = Data.uid++;

				// Secure it in a non-enumerable, non-writable property
				try {
					descriptor[ this.expando ] = { value: unlock };
					Object.defineProperties( owner, descriptor );

				// Support: Android < 4
				// Fallback to a less secure definition
				} catch ( e ) {
					descriptor[ this.expando ] = unlock;
					jQuery.extend( owner, descriptor );
				}
			}

			// Ensure the cache object
			if ( !this.cache[ unlock ] ) {
				this.cache[ unlock ] = {};
			}

			return unlock;
		},
		set: function( owner, data, value ) {
			var prop,
				// There may be an unlock assigned to this node,
				// if there is no entry for this "owner", create one inline
				// and set the unlock as though an owner entry had always existed
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {
				// Fresh assignments by object are shallow copied
				if ( jQuery.isEmptyObject( cache ) ) {
					jQuery.extend( this.cache[ unlock ], data );
				// Otherwise, copy the properties one-by-one to the cache object
				} else {
					for ( prop in data ) {
						cache[ prop ] = data[ prop ];
					}
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			// Either a valid cache is found, or will be created.
			// New caches will be created and the unlock returned,
			// allowing direct access to the newly created
			// empty data object. A valid owner object must be provided.
			var cache = this.cache[ this.key( owner ) ];

			return key === undefined ?
				cache : cache[ key ];
		},
		access: function( owner, key, value ) {
			var stored;
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					((key && typeof key === "string") && value === undefined) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase(key) );
			}

			// [*]When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			if ( key === undefined ) {
				this.cache[ unlock ] = {};

			} else {
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
		},
		hasData: function( owner ) {
			return !jQuery.isEmptyObject(
				this.cache[ owner[ this.expando ] ] || {}
			);
		},
		discard: function( owner ) {
			if ( owner[ this.expando ] ) {
				delete this.cache[ owner[ this.expando ] ];
			}
		}
	};
	var data_priv = new Data();

	var data_user = new Data();



	/*
		Implementation Summary

		1. Enforce API surface and semantic compatibility with 1.9.x branch
		2. Improve the module's maintainability by reducing the storage
			paths to a single mechanism.
		3. Use the same single mechanism to support "private" and "user" data.
		4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
		5. Avoid exposing implementation details on user objects (eg. expando properties)
		6. Provide a clear path for implementation upgrade to WeakMap in 2014
	*/
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch( e ) {}

				// Make sure we set the data so it isn't changed later
				data_user.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function( elem ) {
			return data_user.hasData( elem ) || data_priv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return data_user.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			data_user.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to data_priv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return data_priv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			data_priv.remove( elem, name );
		}
	});

	jQuery.fn.extend({
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = data_user.get( elem );

					if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice(5) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						data_priv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each(function() {
					data_user.set( this, key );
				});
			}

			return access( this, function( value ) {
				var data,
					camelKey = jQuery.camelCase( key );

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
					// Attempt to get data from the cache
					// with the key as-is
					data = data_user.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to get data from the cache
					// with the key camelized
					data = data_user.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function() {
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = data_user.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					data_user.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf("-") !== -1 && data !== undefined ) {
						data_user.set( this, key, value );
					}
				});
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each(function() {
				data_user.remove( this, key );
			});
		}
	});


	jQuery.extend({
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = data_priv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = data_priv.access( elem, type, jQuery.makeArray(data) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// not intended for public consumption - generates a queueHooks object, or returns the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return data_priv.get( elem, key ) || data_priv.access( elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					data_priv.remove( elem, [ type + "queue", key ] );
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[0], type );
			}

			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue( this, type, data );

					// ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[0] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				});
		},
		dequeue: function( type ) {
			return this.each(function() {
				jQuery.dequeue( this, type );
			});
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = data_priv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
		};

	var rcheckableType = (/^(?:checkbox|radio)$/i);



	(function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// #11217 - WebKit loses check when the name is after the checked attribute
		// Support: Windows Web Apps (WWA)
		// `name` and `type` need .setAttribute for WWA
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
		// old WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Make sure textarea (and checkbox) defaultValue is properly cloned
		// Support: IE9-IE11+
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	})();
	var strundefined = typeof undefined;



	support.focusinBubbles = "onfocusin" in window;


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !(events = elemData.events) ) {
				events = elemData.events = {};
			}
			if ( !(eventHandle = elemData.handle) ) {
				eventHandle = elemData.handle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !(handlers = events[ type ]) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.hasData( elem ) && data_priv.get( elem );

			if ( !elemData || !(events = elemData.events) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				delete elemData.handle;
				data_priv.remove( elem, "events" );
			}
		},

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf(".") >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === (elem.ownerDocument || document) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
					jQuery.acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or
					// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
								.apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( (event.result = ret) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.disabled !== true || event.type !== "click" ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) >= 0 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome < 28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},

		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	};

	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
					// Support: Android < 4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && e.preventDefault ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && e.stopPropagation ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && e.stopImmediatePropagation ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// Support: Chrome 15+
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});

	// Create "bubbling" focus and blur events
	// Support: Firefox, Chrome, Safari
	if ( !support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
				};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						data_priv.remove( doc, fix );

					} else {
						data_priv.access( doc, fix, attaches );
					}
				}
			};
		});
	}

	jQuery.fn.extend({

		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var origFn, type;

			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}

			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}

			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},

		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			var elem = this[0];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	});


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

		// We have to close these tags to support XHTML (#13200)
		wrapMap = {

			// Support: IE 9
			option: [ 1, "<select multiple='multiple'>", "</select>" ],

			thead: [ 1, "<table>", "</table>" ],
			col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

			_default: [ 0, "", "" ]
		};

	// Support: IE 9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	// Support: 1.x compatibility
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			data_priv.set(
				elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
			);
		}
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( data_priv.hasData( src ) ) {
			pdataOld = data_priv.access( src );
			pdataCur = data_priv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( data_user.hasData( src ) ) {
			udataOld = data_user.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			data_user.set( dest, udataCur );
		}
	}

	function getAll( context, tag ) {
		var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
				context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}

	// Support: IE >= 9
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Support: IE >= 9
			// Fix Cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		buildFragment: function( elems, context, scripts, selection ) {
			var elem, tmp, tag, wrap, contains, j,
				fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;

			for ( ; i < l; i++ ) {
				elem = elems[ i ];

				if ( elem || elem === 0 ) {

					// Add nodes directly
					if ( jQuery.type( elem ) === "object" ) {
						// Support: QtWebKit
						// jQuery.merge because push.apply(_, arraylike) throws
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

					// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );

					// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild( context.createElement("div") );

						// Deserialize a standard representation
						tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;
						tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

						// Descend through wrappers to the right content
						j = wrap[ 0 ];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}

						// Support: QtWebKit
						// jQuery.merge because push.apply(_, arraylike) throws
						jQuery.merge( nodes, tmp.childNodes );

						// Remember the top-level container
						tmp = fragment.firstChild;

						// Fixes #12346
						// Support: Webkit, IE
						tmp.textContent = "";
					}
				}
			}

			// Remove wrapper from fragment
			fragment.textContent = "";

			i = 0;
			while ( (elem = nodes[ i++ ]) ) {

				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
					continue;
				}

				contains = jQuery.contains( elem.ownerDocument, elem );

				// Append to fragment
				tmp = getAll( fragment.appendChild( elem ), "script" );

				// Preserve script evaluation history
				if ( contains ) {
					setGlobalEval( tmp );
				}

				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( (elem = tmp[ j++ ]) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}

			return fragment;
		},

		cleanData: function( elems ) {
			var data, elem, type, key,
				special = jQuery.event.special,
				i = 0;

			for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
				if ( jQuery.acceptData( elem ) ) {
					key = elem[ data_priv.expando ];

					if ( key && (data = data_priv.cache[ key ]) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
						if ( data_priv.cache[ key ] ) {
							// Discard any remaining `private` data
							delete data_priv.cache[ key ];
						}
					}
				}
				// Discard any remaining `user` data
				delete data_user.cache[ elem[ data_user.expando ] ];
			}
		}
	});

	jQuery.fn.extend({
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each(function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length );
		},

		append: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			});
		},

		prepend: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			});
		},

		before: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			});
		},

		after: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			});
		},

		remove: function( selector, keepData /* Internal Use Only */ ) {
			var elem,
				elems = selector ? jQuery.filter( selector, this ) : this,
				i = 0;

			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}

			return this;
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; (elem = this[i]) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = value.replace( rxhtmlTag, "<$1></$2>" );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var arg = arguments[ 0 ];

			// Make the changes, replacing each context element with the new content
			this.domManip( arguments, function( elem ) {
				arg = this.parentNode;

				jQuery.cleanData( getAll( this ) );

				if ( arg ) {
					arg.replaceChild( elem, this );
				}
			});

			// Force removal if there was no new content (e.g., from empty arguments)
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},

		detach: function( selector ) {
			return this.remove( selector, true );
		},

		domManip: function( args, callback ) {

			// Flatten any nested arrays
			args = concat.apply( [], args );

			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[ 0 ],
				isFunction = jQuery.isFunction( value );

			// We can't cloneNode fragments that contain checked, in WebKit
			if ( isFunction ||
					( l > 1 && typeof value === "string" &&
						!support.checkClone && rchecked.test( value ) ) ) {
				return this.each(function( index ) {
					var self = set.eq( index );
					if ( isFunction ) {
						args[ 0 ] = value.call( this, index, self.html() );
					}
					self.domManip( args, callback );
				});
			}

			if ( l ) {
				fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
				first = fragment.firstChild;

				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}

				if ( first ) {
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;

					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;

						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );

							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {
								// Support: QtWebKit
								// jQuery.merge because push.apply(_, arraylike) throws
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}

						callback.call( this[ i ], node, i );
					}

					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;

						// Reenable scripts
						jQuery.map( scripts, restoreScript );

						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

								if ( node.src ) {
									// Optional AJAX dependency, but won't run scripts if not present
									if ( jQuery._evalUrl ) {
										jQuery._evalUrl( node.src );
									}
								} else {
									jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
								}
							}
						}
					}
				}
			}

			return this;
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	});


	var iframe,
		elemdisplay = {};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var style,
			elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			// getDefaultComputedStyle might be reliably used only on attached element
			display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

				// Use of this method is a temporary fix (more like optmization) until something better comes along,
				// since it was removed from specification and supported only in FF
				style.display : jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = (/^margin/);

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		};



	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
		}

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// Support: iOS < 6
			// A tribute to the "awesome hack by Dean Edwards"
			// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?
			// Support: IE
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
					// Hook not needed (or it's not possible to use it due to missing dependency),
					// remove it.
					// Since there are no other hooks for marginRight, remove the whole object.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.

				return (this.get = hookFn).apply( this, arguments );
			}
		};
	}


	(function() {
		var pixelPositionVal, boxSizingReliableVal,
			docElem = document.documentElement,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		if ( !div.style ) {
			return;
		}

		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
			"position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computePixelPositionAndBoxSizingReliable() {
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
				"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
				"border:1px;padding:1px;width:4px;position:absolute";
			div.innerHTML = "";
			docElem.appendChild( container );

			var divStyle = window.getComputedStyle( div, null );
			pixelPositionVal = divStyle.top !== "1%";
			boxSizingReliableVal = divStyle.width === "4px";

			docElem.removeChild( container );
		}

		// Support: node.js jsdom
		// Don't assume that getComputedStyle is a property of the global object
		if ( window.getComputedStyle ) {
			jQuery.extend( support, {
				pixelPosition: function() {
					// This test is executed only once but we still do memoizing
					// since we can use the boxSizingReliable pre-computing.
					// No need to check if the test was already performed, though.
					computePixelPositionAndBoxSizingReliable();
					return pixelPositionVal;
				},
				boxSizingReliable: function() {
					if ( boxSizingReliableVal == null ) {
						computePixelPositionAndBoxSizingReliable();
					}
					return boxSizingReliableVal;
				},
				reliableMarginRight: function() {
					// Support: Android 2.3
					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// This support function is only executed once so no memoizing is needed.
					var ret,
						marginDiv = div.appendChild( document.createElement( "div" ) );

					// Reset CSS: box-sizing; display; margin; border; padding
					marginDiv.style.cssText = div.style.cssText =
						// Support: Firefox<29, Android 2.3
						// Vendor-prefix box-sizing
						"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
						"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					docElem.appendChild( container );

					ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

					docElem.removeChild( container );

					return ret;
				}
			});
		}
	})();


	// A method for quickly swapping in/out CSS properties to get correct calculations.
	jQuery.swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var
		// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
		// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
		rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

	// return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {

		// shortcut for names that are not vendor prefixed
		if ( name in style ) {
			return name;
		}

		// check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in style ) {
				return name;
			}
		}

		return origName;
	}

	function setPositiveNumber( elem, value, subtract ) {
		var matches = rnumsplit.exec( value );
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
			// If we already have the right measurement, avoid augmentation
			4 :
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {
			// both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// at this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
				// at this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// at this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test(val) ) {
				return val;
			}

			// we need the check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = data_priv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend({
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			// normalize float css property
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

			// gets hook for the prefixed version
			// followed by the unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// convert relative number strings (+= or -=) to relative numbers. #7345
				if ( type === "string" && (ret = rrelNum.exec( value )) ) {
					value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set. See: #7116
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add 'px' to the (except for certain CSS properties)
				if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
					value += "px";
				}

				// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
				// but it would mean to define eight (for every problematic property) identical functions
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
					style[ name ] = value;
				}

			} else {
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

			// gets hook for the prefixed version
			// followed by the unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			//convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Return, converting to number if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each([ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
					// certain elements can have dimension info if we invisibly show them
					// however, it must have a current display style that would benefit from this
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
						jQuery.swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						}) :
						getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var styles = extra && getStyles( elem );
				return setPositiveNumber( elem, value, extra ?
					augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					) : 0
				);
			}
		};
	});

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each(function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			});
		}
	});


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				if ( tween.elem[ tween.prop ] != null &&
					(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
					return tween.elem[ tween.prop ];
				}

				// passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails
				// so, simple values such as "10px" are parsed to Float.
				// complex values such as "rotate(1rad)" are returned as is.
				result = jQuery.css( tween.elem, tween.prop, "" );
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
				// use step hook for back compat - use cssHook if its there - use .style if its
				// available and use plain properties where available
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes

	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		}
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
		rrun = /queueHooks$/,
		animationPrefilters = [ defaultPrefilter ],
		tweeners = {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value ),
					target = tween.cur(),
					parts = rfxnum.exec( value ),
					unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

					// Starting value computation is required for potential unit mismatches
					start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
						rfxnum.exec( jQuery.css( tween.elem, prop ) ),
					scale = 1,
					maxIterations = 20;

				if ( start && start[ 3 ] !== unit ) {
					// Trust units reported by jQuery.css
					unit = unit || start[ 3 ];

					// Make sure we update the tween properties later on
					parts = parts || [];

					// Iteratively approximate from a nonzero starting point
					start = +target || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				// Update tween properties
				if ( parts ) {
					start = tween.start = +start || +target || 0;
					tween.unit = unit;
					// If a +=/-= token was provided, we're doing a relative animation
					tween.end = parts[ 1 ] ?
						start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
						+parts[ 2 ];
				}

				return tween;
			} ]
		};

	// Animations created synchronously will run synchronously
	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined;
		});
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// if we include width, step value is 1 to do all cssExpand values,
		// if we don't include width, step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( (tween = collection[ index ].call( animation, prop, value )) ) {

				// we're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = data_priv.get( elem, "fxshow" );

		// handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function() {
				// doing this makes sure that the complete handler will be called
				// before this completes
				anim.always(function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				});
			});
		}

		// height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = data_priv.access( elem, "fxshow", {} );
			}

			// store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done(function() {
					jQuery( elem ).hide();
				});
			}
			anim.done(function() {
				var prop;

				data_priv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			});
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// not quite $.extend, this wont overwrite keys already present.
				// also - reusing 'index' from above because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always( function() {
				// don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
					// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ]);

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, { specialEasing: {} }, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
						// if we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// resolve when we played the last frame
					// otherwise, reject
					if ( gotoEnd ) {
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			}),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.split(" ");
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				tweeners[ prop ] = tweeners[ prop ] || [];
				tweeners[ prop ].unshift( callback );
			}
		},

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				animationPrefilters.unshift( callback );
			} else {
				animationPrefilters.push( callback );
			}
		}
	});

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function( speed, to, easing, callback ) {

			// show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || data_priv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = data_priv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// start the next in the queue if the last step wasn't forced
				// timers currently will call their complete callbacks, which will dequeue
				// but only if they were gotoEnd
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			});
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each(function() {
				var index,
					data = data_priv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// enable finishing flag on private data
				data.finish = true;

				// empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;

	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		clearInterval( timerId );
		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	};


	(function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS 5.1, Android 4.x, Android 2.3
		// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
		support.checkOn = input.value !== "";

		// Must access the parent to make an option select properly
		// Support: IE9, IE10
		support.optSelected = opt.selected;

		// Make sure that the options inside disabled selects aren't marked as disabled
		// (WebKit marks them as disabled)
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Check if an input maintains its value after becoming a radio
		// Support: IE9, IE10
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();


	var nodeHook, boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		}
	});

	jQuery.extend({
		attr: function( elem, name, value ) {
			var hooks, ret,
				nType = elem.nodeType;

			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === strundefined ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
			}

			if ( value !== undefined ) {

				if ( value === null ) {
					jQuery.removeAttr( elem, name );

				} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;

				} else {
					elem.setAttribute( name, value + "" );
					return value;
				}

			} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				ret = jQuery.find.attr( elem, name );

				// Non-existent attributes return null, we normalize to undefined
				return ret == null ?
					undefined :
					ret;
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( (name = attrNames[i++]) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						// Setting the type on a radio button after the value resets the value in IE6-9
						// Reset value to default in case type is set after value during creation
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	});




	var rfocusable = /^(?:input|select|textarea|button)$/i;

	jQuery.fn.extend({
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each(function() {
				delete this[ jQuery.propFix[ name ] || name ];
			});
		}
	});

	jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},

		prop: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;

			// don't get/set properties on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

			if ( notxml ) {
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
					ret :
					( elem[ name ] = value );

			} else {
				return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
					ret :
					elem[ name ];
			}
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {
					return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
						elem.tabIndex :
						-1;
				}
			}
		}
	});

	// Support: IE9+
	// Selectedness for an option in an optgroup can be inaccurate
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}

	jQuery.each([
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	});




	var rclass = /[\t\r\n\f]/g;

	jQuery.fn.extend({
		addClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call( this, j, this.className ) );
				});
			}

			if ( proceed ) {
				// The disjunction here is for better compressibility (see removeClass)
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						" "
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = arguments.length === 0 || typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call( this, j, this.className ) );
				});
			}
			if ( proceed ) {
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						""
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// only assign if different to avoid unneeded rendering.
						finalValue = value ? jQuery.trim( cur ) : "";
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}

			return this.each(function() {
				if ( type === "string" ) {
					// toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						classNames = value.match( rnotwhite ) || [];

					while ( (className = classNames[ i++ ]) ) {
						// check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( type === strundefined || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						data_priv.set( this, "__className__", this.className );
					}

					// If the element has a class name or if we're passed "false",
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
				}
			});
		},

		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}

			return false;
		}
	});




	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[0];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?
						// handle most common string cases
						ret.replace(rreturn, "") :
						// handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each(function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function( elem ) {
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						jQuery.trim( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE6-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
							optionSet = true;
						}
					}

					// force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				// Support: Webkit
				// "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});




	// Return jQuery for attributes-only inclusion


	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	});

	jQuery.fn.extend({
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		},

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
		}
	});


	var nonce = jQuery.now();

	var rquery = (/\?/);



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		// Document location
		ajaxLocParts,
		ajaxLocation,

		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat("*");

	// #8138, IE may throw an exception when accessing
	// a field from window.location if document.domain has been set
	try {
		ajaxLocation = location.href;
	} catch( e ) {
		// Use the href attribute of an A element
		// since IE will modify it given document.location
		ajaxLocation = document.createElement( "a" );
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href;
	}

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {
				// For each dataType in the dataTypeExpression
				while ( (dataType = dataTypes[i++]) ) {
					// Prepend if requested
					if ( dataType[0] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

					// Otherwise append
					} else {
						(structure[ dataType ] = structure[ dataType ] || []).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			});
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s[ "throws" ] ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,
				// URL without anti-cache param
				cacheURL,
				// Response headers
				responseHeadersString,
				responseHeaders,
				// timeout handle
				timeoutTimer,
				// Cross-domain detection vars
				parts,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// The jqXHR state
				state = 0,
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( (match = rheaders.exec( responseHeadersString )) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
				.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
						( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
							( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
				);
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			fireGlobals = s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
					s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();
			}

			// aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// We extract error from statusText
					// then normalize statusText and status for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	});

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	});


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};


	jQuery.fn.extend({
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapAll( html.call(this, i) );
				});
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map(function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapInner( html.call(this, i) );
				});
			}

			return this.each(function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			});
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each(function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
			});
		},

		unwrap: function() {
			return this.parent().each(function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			}).end();
		}
	});


	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};
	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );

				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
				}
			});

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map(function() {
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			})
			.filter(function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			})
			.map(function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						}) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}).get();
		}
	});


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest();
		} catch( e ) {}
	};

	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			// file protocol always yields status code 0, assume 200
			0: 200,
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	// Support: IE9
	// Open requests must be manually aborted on unload (#5280)
	if ( window.ActiveXObject ) {
		jQuery( window ).on( "unload", function() {
			for ( var key in xhrCallbacks ) {
				xhrCallbacks[ key ]();
			}
		});
	}

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function( options ) {
		var callback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								delete xhrCallbacks[ id ];
								callback = xhr.onload = xhr.onerror = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
									complete(
										// file: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
										// Support: IE9
										// Accessing binary-data responseText throws an exception
										// (#11426)
										typeof xhr.responseText === "string" ? {
											text: xhr.responseText
										} : undefined,
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					xhr.onerror = callback("error");

					// Create the abort callback
					callback = xhrCallbacks[ id ] = callback("abort");

					try {
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery("<script>").prop({
						async: true,
						charset: s.scriptCharset,
						src: s.url
					}).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function() {
				// Restore preexisting value
				window[ callbackName ] = overwritten;

				// Save back as free
				if ( s[ callbackName ] ) {
					// make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});




	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf(" ");

		if ( off >= 0 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax({
				url: url,

				// if "type" variable is undefined, then "GET" method will be used
				type: type,
				dataType: "html",
				data: params
			}).done(function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			}).complete( callback && function( jqXHR, status ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			});
		}

		return this;
	};




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};




	var docElem = window.document.documentElement;

	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

			// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {
				options = options.call( elem, i, curOffset );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend({
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each(function( i ) {
						jQuery.offset.setOffset( this, options, i );
					});
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			// If we don't have gBCR, just use 0,0 rather than error
			// BlackBerry 5, iOS 3 (original iPhone)
			if ( typeof elem.getBoundingClientRect !== strundefined ) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
				// We assume that getBoundingClientRect is available when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {
				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;

				while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || docElem;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : window.pageXOffset,
						top ? val : window.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length, null );
		};
	});

	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
					// if curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	});


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
			// margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		});
	});


	// The number of elements contained in the matched element set
	jQuery.fn.size = function() {
		return this.length;
	};

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}




	var
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in
	// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( typeof noGlobal === strundefined ) {
		window.jQuery = window.$ = jQuery;
	}




	return jQuery;

	}));


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ])