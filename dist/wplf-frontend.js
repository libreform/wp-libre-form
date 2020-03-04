(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WPLF"] = factory();
	else
		root["WPLF"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/scripts/classes/storage.js":
/*!*******************************************!*\
  !*** ./assets/scripts/classes/storage.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/log */ \"./assets/scripts/lib/log.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar Storage = /*#__PURE__*/function () {\n  function Storage() {\n    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'wplf';\n\n    _classCallCheck(this, Storage);\n\n    _defineProperty(this, \"prefix\", void 0);\n\n    this.prefix = prefix;\n  }\n\n  _createClass(Storage, [{\n    key: \"get\",\n    value: function get(key, defaultValue) {\n      var data = localStorage.getItem(this.prefix + key);\n\n      if (data !== null) {\n        var value = data ? JSON.parse(data) : data;\n        return value;\n      } else {\n        _lib_log__WEBPACK_IMPORTED_MODULE_0__[\"default\"].notice(\"No value found for \".concat(key, \", falling back to default\"), defaultValue);\n        return defaultValue;\n      }\n    }\n  }, {\n    key: \"set\",\n    value: function set(key, value) {\n      try {\n        localStorage.setItem(this.prefix + key, JSON.stringify(value));\n      } catch (e) {\n        _lib_log__WEBPACK_IMPORTED_MODULE_0__[\"default\"].error(e, key, value);\n        return false;\n      }\n    }\n  }]);\n\n  return Storage;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new Storage());\n\n//# sourceURL=webpack://WPLF/./assets/scripts/classes/storage.js?");

/***/ }),

/***/ "./assets/scripts/classes/wplf-form.js":
/*!*********************************************!*\
  !*** ./assets/scripts/classes/wplf-form.js ***!
  \*********************************************/
/*! exports provided: WPLF_Form */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WPLF_Form\", function() { return WPLF_Form; });\n/* harmony import */ var _lib_global_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/global-data */ \"./assets/scripts/lib/global-data.js\");\n/* harmony import */ var _lib_api_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/api-client */ \"./assets/scripts/lib/api-client.js\");\n/* harmony import */ var _lib_log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/log */ \"./assets/scripts/lib/log.js\");\n/* harmony import */ var _wplf_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wplf-tabs */ \"./assets/scripts/classes/wplf-tabs.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\n\nvar _createApiClient = Object(_lib_api_client__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(),\n    request = _createApiClient.request;\n\nvar WPLF_Form = /*#__PURE__*/function () {\n  function WPLF_Form(element) {\n    _classCallCheck(this, WPLF_Form);\n\n    // if (element instanceof HTMLFormElement !== true) {\n    if (element instanceof HTMLElement !== true) {\n      throw new Error('Form element invalid or missing');\n    }\n\n    this.form = element;\n    this.submitState = null; // null | 'submitting' | 'success' | new Error('error message')\n\n    this.submitHandler = null;\n    this.callbacks = {\n      beforeSend: {},\n      success: {},\n      error: {}\n    };\n    this.key = '_' + Math.random().toString(36).substr(2, 9);\n    this.tabs = Array.from(this.form.querySelectorAll('.wplf-tabs')).map(function (el) {\n      return new _wplf_tabs__WEBPACK_IMPORTED_MODULE_3__[\"default\"](el, el.getAttribute('data-active'), el.getAttribute('data-rememberas'));\n    });\n    this.addSubmitHandler(); // Remove input that triggers the fallback so we get a JSON response\n\n    var fallbackInput = element.querySelector('[name=\"_nojs\"]');\n\n    if (fallbackInput) {\n      fallbackInput.parentNode.removeChild(fallbackInput);\n    }\n  }\n\n  _createClass(WPLF_Form, [{\n    key: \"addCallback\",\n    value: function addCallback(name, type, callback) {\n      this.callbacks[type][name] = callback;\n      return this;\n    }\n  }, {\n    key: \"removeCallback\",\n    value: function removeCallback(name, type) {\n      delete this.callbacks[type][name];\n      return this;\n    }\n  }, {\n    key: \"runCallback\",\n    value: function runCallback(type) {\n      var _this = this;\n\n      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n        args[_key - 1] = arguments[_key];\n      }\n\n      if (this.callbacks[type]) {\n        Object.keys(this.callbacks[type]).forEach(function (key) {\n          var _this$callbacks$type;\n\n          (_this$callbacks$type = _this.callbacks[type])[key].apply(_this$callbacks$type, args);\n        });\n      } else {\n        throw new Error(\"Unknown callback \".concat(name, \" \").concat(type));\n      }\n    }\n  }, {\n    key: \"addSubmitHandler\",\n    value: function addSubmitHandler(handler) {\n      var _this2 = this;\n\n      console.log('test', handler);\n\n      this.submitHandler = handler || /*#__PURE__*/function () {\n        var _ref = _asyncToGenerator(function* (e) {\n          e.preventDefault();\n          console.log('handle', _this2.submitState); // Prevent double submissions\n\n          if (_this2.submitState === 'submitting') {\n            _lib_log__WEBPACK_IMPORTED_MODULE_2__[\"default\"].notice('Preventing double doubmission');\n            return;\n          } // Reset messages if there were any\n\n\n          [].forEach.call(_this2.form.parentNode.querySelectorAll(\".wplf-errorMessage, .wplf-successMessage\"), function (el) {\n            el.parentNode.removeChild(el);\n          });\n\n          try {\n            var _ref2 = yield _this2.send(),\n                data = _ref2.data,\n                ok = _ref2.ok;\n\n            if (ok) {\n              var message = data.message;\n              var div = document.createElement('div');\n              div.classList.add('wplf-successMessage');\n              div.insertAdjacentHTML('afterbegin', message);\n\n              _this2.form.insertAdjacentElement('beforebegin', div);\n\n              _this2.form.classList.add('submitted');\n\n              _this2.form.reset();\n\n              _this2.submitState = 'success';\n\n              _this2.runCallback('success', data, _this2);\n            } else {\n              var error = data.error;\n              throw new Error(error);\n            }\n          } catch (e) {\n            var _div = document.createElement('div');\n\n            _div.classList.add('wplf-errorMessage');\n\n            _div.insertAdjacentHTML('afterbegin', e.message);\n\n            _this2.submitState = e;\n            _lib_log__WEBPACK_IMPORTED_MODULE_2__[\"default\"].error(_this2.submitState);\n\n            _this2.form.classList.remove('sending');\n\n            _this2.form.insertAdjacentElement('beforebegin', _div);\n\n            _this2.runCallback('error', _this2.submitState, _this2);\n          }\n        });\n\n        return function (_x) {\n          return _ref.apply(this, arguments);\n        };\n      }();\n\n      this.form.addEventListener('submit', this.submitHandler);\n      return this;\n    }\n  }, {\n    key: \"removeSubmitHandler\",\n    value: function removeSubmitHandler() {\n      this.form.removeEventListener('submit', this.submitHandler);\n      this.submitHandler = null;\n      return this;\n    }\n  }, {\n    key: \"send\",\n    value: function () {\n      var _send = _asyncToGenerator(function* () {\n        var form = this.form;\n        var data = new FormData(form); // Pass language if it exists.\n\n        _lib_global_data__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lang && data.append('lang', _lib_global_data__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lang);\n        this.submitState = 'submitting';\n        form.classList.add('sending');\n        this.runCallback('beforeSend', form, this);\n        var req = request('/submit', {\n          method: 'POST',\n          body: data\n        });\n        form.classList.remove('sending');\n        return req;\n      });\n\n      function send() {\n        return _send.apply(this, arguments);\n      }\n\n      return send;\n    }()\n  }]);\n\n  return WPLF_Form;\n}();\n\n//# sourceURL=webpack://WPLF/./assets/scripts/classes/wplf-form.js?");

/***/ }),

/***/ "./assets/scripts/classes/wplf-tabs.js":
/*!*********************************************!*\
  !*** ./assets/scripts/classes/wplf-tabs.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return WPLF_Tabs; });\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./assets/scripts/classes/storage.js\");\n/* harmony import */ var _lib_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/log */ \"./assets/scripts/lib/log.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar WPLF_Tabs = /*#__PURE__*/function () {\n  function WPLF_Tabs(element) {\n    var _this = this;\n\n    _classCallCheck(this, WPLF_Tabs);\n\n    _defineProperty(this, \"remember\", false);\n\n    _defineProperty(this, \"activeTab\", null);\n\n    _defineProperty(this, \"element\", null);\n\n    _defineProperty(this, \"name\", null);\n\n    _defineProperty(this, \"handleClick\", function (e) {\n      var target = e.target;\n      var tabName = target.getAttribute('data-target');\n\n      _this.switchTab(tabName);\n\n      e.preventDefault();\n    });\n\n    if (element instanceof HTMLElement !== true) {\n      throw new Error('Tab element invalid or missing');\n    } // data-name=\"FormEditActiveTab\" data-default=\"<?=array_keys($metaSections)[0]?>\" data-remember\n\n\n    this.root = element;\n    this.name = this.root.getAttribute('data-name');\n    this.remember = this.root.getAttribute('data-remember') !== null;\n    this.activeTab = this.root.getAttribute('data-default');\n\n    if (!this.name || !this.activeTab) {\n      throw new Error('Required attributes are missing');\n    }\n\n    if (this.remember) {\n      // Get saved value or keep using the old one\n      this.activeTab = _storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(this.name, this.activeTab);\n    }\n\n    this.refresh();\n  }\n\n  _createClass(WPLF_Tabs, [{\n    key: \"refresh\",\n\n    /**\n     * Attach event listeners and ensure the current tab is visible.\n     * Call after adding a tab dynamically.\n     */\n    value: function refresh() {\n      var _this2 = this;\n\n      this.getHandles().forEach(function (handle) {\n        // It's not possible to add the same event listener twice. If the handle already has the listener,\n        // this is a no-op.\n        handle.addEventListener('click', _this2.handleClick, {\n          passive: false\n        });\n      }); // If activeTab is null, things will break. Fall back to first tab\n\n      if (this.activeTab === null) {\n        var first = this.getTabs()[0].getAttribute('data-target');\n        _lib_log__WEBPACK_IMPORTED_MODULE_1__[\"default\"].notice('activeTab was null, setting first tab as active', first);\n        this.activeTab = first;\n      }\n\n      this.switchTab(this.activeTab);\n    }\n    /**\n     * Values are not cached as they are practically free to recompute, but\n     * might become a memory leak if stored.\n     */\n\n  }, {\n    key: \"getTabs\",\n    value: function getTabs() {\n      return Array.from(this.root.querySelectorAll(\".wplf-tabs__tab[data-name=\\\"\".concat(this.name, \"\\\"]\")));\n    }\n    /**\n     * See getTabs()\n     */\n\n  }, {\n    key: \"getHandles\",\n    value: function getHandles() {\n      return Array.from(this.root.querySelectorAll(\".wplf-tabs__tabSwitcher[data-name=\\\"\".concat(this.name, \"\\\"]\")));\n    }\n  }, {\n    key: \"switchTab\",\n    value: function switchTab(name) {\n      var tabs = this.getTabs();\n      var allHandles = this.getHandles();\n      var open = tabs.filter(function (tab) {\n        return tab.getAttribute('data-tab') === name;\n      });\n      var close = tabs.filter(function (tab) {\n        return tab.getAttribute('data-tab') !== name;\n      });\n      open.forEach(function (tab) {\n        var tabName = tab.getAttribute('data-tab');\n        var handles = allHandles.filter(function (handle) {\n          return handle.getAttribute('data-target') === tabName;\n        });\n        tab.classList.add('active');\n        handles.forEach(function (handle) {\n          handle.classList.add('active');\n        });\n      });\n      close.forEach(function (tab) {\n        var tabName = tab.getAttribute('data-tab');\n        var handles = allHandles.filter(function (handle) {\n          return handle.getAttribute('data-target') === tabName;\n        });\n        tab.classList.remove('active');\n        handles.forEach(function (handle) {\n          handle.classList.remove('active');\n        });\n      });\n      _lib_log__WEBPACK_IMPORTED_MODULE_1__[\"default\"].notice('Switched tab to', name);\n\n      if (this.remember) {\n        _storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set(this.name, name);\n      } // allHandles.forEach(handle => {\n      //   handle.classList.remove('active')\n      // })\n      // tabs.forEach(tab => {\n      //   const target = tab.getAttribute('data-target')\n      //   if (target !== name) {\n      //     tab.classList.remove('active')\n      //   } else {\n      //     log.notice('Set active tab', name)\n      //     tab.classList.add('active')\n      //     handles.forEach(handle => {\n      //       handle.classList.add('active')\n      //     })\n      //   }\n      // })\n\n    }\n  }]);\n\n  return WPLF_Tabs;\n}();\n\n\n\n//# sourceURL=webpack://WPLF/./assets/scripts/classes/wplf-tabs.js?");

/***/ }),

/***/ "./assets/scripts/classes/wplf.js":
/*!****************************************!*\
  !*** ./assets/scripts/classes/wplf.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return WPLF; });\n/* harmony import */ var _wplf_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wplf-form */ \"./assets/scripts/classes/wplf-form.js\");\n/* harmony import */ var _lib_global_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/global-data */ \"./assets/scripts/lib/global-data.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar dependencies = [];\nvar depsLoaded = 0;\n\nfunction _isReady() {\n  return dependencies.length === depsLoaded;\n}\n\nfunction loadPolyfill(name) {\n  var script = document.createElement('script');\n  script.src = _lib_global_data__WEBPACK_IMPORTED_MODULE_1__[\"default\"].assetsDir + '/scripts/polyfills/' + name + '.js';\n  script.addEventListener('load', function () {\n    depsLoaded++;\n\n    if (_isReady()) {\n      window.postMessage('[WPLF] Polyfills loaded', '*');\n    }\n  });\n  document.body.appendChild(script);\n}\n\nif (!window.fetch) {\n  dependencies.push('fetch');\n}\n\nif (!window.Promise) {\n  dependencies.push('promise');\n}\n\nvar WPLF = /*#__PURE__*/function () {\n  function WPLF() {\n    var _this = this;\n\n    _classCallCheck(this, WPLF);\n\n    _defineProperty(this, \"forms\", {// '_g67a8z2kw': WPLF_Form\n    });\n\n    _defineProperty(this, \"Form\", _wplf_form__WEBPACK_IMPORTED_MODULE_0__[\"WPLF_Form\"]);\n\n    if (this.isReady()) {\n      this.initialize();\n    } else {\n      dependencies.forEach(loadPolyfill);\n      this.whenReady(function () {\n        return _this.initialize();\n      });\n    }\n  } // Expose WPLF_Form\n\n\n  _createClass(WPLF, [{\n    key: \"initialize\",\n    value: function initialize() {\n      var _this2 = this;\n\n      if (_lib_global_data__WEBPACK_IMPORTED_MODULE_1__[\"default\"].settings.autoinit) {\n        [].forEach.call(document.querySelectorAll(\"form.wplf\"), function (form) {\n          return _this2.attach(form);\n        });\n      }\n    }\n  }, {\n    key: \"isReady\",\n    value: function isReady() {\n      return _isReady();\n    }\n  }, {\n    key: \"_listenForWPLFMessage\",\n    value: function _listenForWPLFMessage(message) {\n      var _this3 = this;\n\n      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {\n        return null;\n      };\n      window.addEventListener('message', function (e) {\n        if (typeof e.data === 'string' && e.data.indexOf(\"[WPLF] \".concat(message)) === 0) {\n          cb(_this3);\n        }\n      });\n    }\n  }, {\n    key: \"whenReady\",\n    value: function whenReady() {\n      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {\n        return null;\n      };\n\n      this._listenForWPLFMessage('Polyfills loaded', cb);\n    }\n  }, {\n    key: \"findFormsById\",\n    value: function findFormsById(id) {\n      var _this4 = this;\n\n      return Object.keys(this.forms).reduce(function (acc, key) {\n        var wplfForm = _this4.forms[key];\n\n        if (parseInt(wplfForm.form.getAttribute('data-form-id'), 10) === parseInt(id, 10)) {\n          acc.push(wplfForm);\n        }\n\n        return acc;\n      }, []);\n    }\n  }, {\n    key: \"attach\",\n    value: function attach(elementOrWplfForm) {\n      if (elementOrWplfForm instanceof _wplf_form__WEBPACK_IMPORTED_MODULE_0__[\"WPLF_Form\"]) {\n        var _wplfForm = elementOrWplfForm;\n        this.forms[_wplfForm.key] = _wplfForm;\n        return _wplfForm;\n      }\n\n      var element = elementOrWplfForm;\n\n      if (element instanceof HTMLElement !== true) {\n        throw new Error('Unable to attach WPLF to element', element);\n      }\n\n      var wplfForm = new _wplf_form__WEBPACK_IMPORTED_MODULE_0__[\"WPLF_Form\"](element);\n      this.forms[wplfForm.key] = wplfForm;\n      wplfForm.form.removeAttribute('tabindex');\n      wplfForm.form.removeAttribute('style');\n      return wplfForm;\n    }\n  }, {\n    key: \"detach\",\n    value: function detach(elementOrWplfForm) {\n      if (elementOrWplfForm instanceof _wplf_form__WEBPACK_IMPORTED_MODULE_0__[\"WPLF_Form\"]) {\n        var wplfForm = elementOrWplfForm;\n        this.forms[wplfForm.key].removeSubmitHandler();\n        delete this.forms[wplfForm.key];\n        return true;\n      }\n\n      var element = elementOrWplfForm;\n\n      if (element instanceof HTMLElement !== true) {\n        throw new Error('Unable to detach WPLF from element', element);\n      }\n\n      this.forms[element].removeSubmitHandler();\n      delete this.forms[element];\n      return true;\n    }\n  }]);\n\n  return WPLF;\n}();\n\n\n\n//# sourceURL=webpack://WPLF/./assets/scripts/classes/wplf.js?");

/***/ }),

/***/ "./assets/scripts/lib/api-client.js":
/*!******************************************!*\
  !*** ./assets/scripts/lib/api-client.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var abort_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! abort-controller */ \"./node_modules/abort-controller/browser.js\");\n/* harmony import */ var abort_controller__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(abort_controller__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _global_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global-data */ \"./assets/scripts/lib/global-data.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n/**\n * It's ok to create multiple API clients\n *\n * Usage: const { abort, request, getSignal } = createApiClient()\n */\n\nfunction createApiClient() {\n  var controller, signal;\n  return {\n    controller: null,\n    signal: null,\n    getSignal: function getSignal() {\n      return signal;\n    },\n    abort: function abort() {\n      if (controller && controller.abort) {\n        controller.abort();\n      }\n    },\n    request: function request(target) {\n      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n      return _asyncToGenerator(function* () {\n        controller = new abort_controller__WEBPACK_IMPORTED_MODULE_0___default.a();\n        signal = controller.signal;\n\n        try {\n          var res = yield fetch(_global_data__WEBPACK_IMPORTED_MODULE_1__[\"default\"].backendUrl + target, _objectSpread({\n            method: 'GET',\n            signal: signal,\n            credentials: _global_data__WEBPACK_IMPORTED_MODULE_1__[\"default\"].fetchCredentials || 'same-origin',\n            headers: _global_data__WEBPACK_IMPORTED_MODULE_1__[\"default\"].requestHeaders || {}\n          }, options));\n          var headers = res.headers,\n              status = res.status,\n              statusText = res.statusText,\n              url = res.url,\n              ok = res.ok;\n          var data = yield res.json();\n          controller = null;\n          return {\n            headers: headers,\n            status: status,\n            statusText: statusText,\n            url: url,\n            ok: ok,\n            data: data\n          };\n        } catch (e) {\n          controller = null; // If you want to do something when the request is aborted, use\n          // signal.addEventListener('abort', ...)\n\n          if (e.name !== 'AbortError') {\n            throw e;\n          }\n        }\n      })();\n    }\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  return createApiClient();\n});\n\n//# sourceURL=webpack://WPLF/./assets/scripts/lib/api-client.js?");

/***/ }),

/***/ "./assets/scripts/lib/global-data.js":
/*!*******************************************!*\
  !*** ./assets/scripts/lib/global-data.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((function (window) {\n  return _objectSpread({}, window.wplfData);\n})(window)); // TODO: Maybe add Node compatibility?\n\n//# sourceURL=webpack://WPLF/./assets/scripts/lib/global-data.js?");

/***/ }),

/***/ "./assets/scripts/lib/log.js":
/*!***********************************!*\
  !*** ./assets/scripts/lib/log.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _global_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global-data */ \"./assets/scripts/lib/global-data.js\");\n\nvar debugLevel = _global_data__WEBPACK_IMPORTED_MODULE_0__[\"default\"].settings.debugLevel;\n\nvar notice = function notice(message) {\n  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n    params[_key - 1] = arguments[_key];\n  }\n\n  return debugLevel === 'all' && console.log(\"WPLF: \".concat(message), params);\n};\n\nvar error = function error(message) {\n  for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n    params[_key2 - 1] = arguments[_key2];\n  }\n\n  return debugLevel !== 'none' && console.error(\"WPLF error: \".concat(message), params);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  notice: notice,\n  error: error\n});\n\n//# sourceURL=webpack://WPLF/./assets/scripts/lib/log.js?");

/***/ }),

/***/ "./assets/scripts/wplf-frontend-bundle.js":
/*!************************************************!*\
  !*** ./assets/scripts/wplf-frontend-bundle.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_wplf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/wplf */ \"./assets/scripts/classes/wplf.js\");\n/* harmony import */ var _styles_wplf_frontend_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/wplf-frontend.scss */ \"./assets/styles/wplf-frontend.scss\");\n/* harmony import */ var _styles_wplf_frontend_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_wplf_frontend_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n // Webpack exposes the instance in window.WPLF\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new _classes_wplf__WEBPACK_IMPORTED_MODULE_0__[\"default\"]());\n\n//# sourceURL=webpack://WPLF/./assets/scripts/wplf-frontend-bundle.js?");

/***/ }),

/***/ "./assets/styles/wplf-frontend.scss":
/*!******************************************!*\
  !*** ./assets/styles/wplf-frontend.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://WPLF/./assets/styles/wplf-frontend.scss?");

/***/ }),

/***/ "./node_modules/abort-controller/browser.js":
/*!**************************************************!*\
  !*** ./node_modules/abort-controller/browser.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*globals self, window */\n\n\n/*eslint-disable @mysticatea/prettier */\nconst { AbortController, AbortSignal } =\n    typeof self !== \"undefined\" ? self :\n    typeof window !== \"undefined\" ? window :\n    /* otherwise */ undefined\n/*eslint-enable @mysticatea/prettier */\n\nmodule.exports = AbortController\nmodule.exports.AbortSignal = AbortSignal\nmodule.exports.default = AbortController\n\n\n//# sourceURL=webpack://WPLF/./node_modules/abort-controller/browser.js?");

/***/ }),

/***/ 1:
/*!******************************************************!*\
  !*** multi ./assets/scripts/wplf-frontend-bundle.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /home/k1sul1/Projects/libreform.local/htdocs/wp-content/plugins/wp-libre-form/assets/scripts/wplf-frontend-bundle.js */\"./assets/scripts/wplf-frontend-bundle.js\");\n\n\n//# sourceURL=webpack://WPLF/multi_./assets/scripts/wplf-frontend-bundle.js?");

/***/ })

/******/ })["default"];
});