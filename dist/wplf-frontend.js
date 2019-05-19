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

/***/ "./assets/scripts/classes/wplf-form.js":
/*!*********************************************!*\
  !*** ./assets/scripts/classes/wplf-form.js ***!
  \*********************************************/
/*! exports provided: WPLF_Form */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WPLF_Form\", function() { return WPLF_Form; });\n/* harmony import */ var _global_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global-data */ \"./assets/scripts/global-data.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nvar WPLF_Form =\n/*#__PURE__*/\nfunction () {\n  function WPLF_Form(element) {\n    _classCallCheck(this, WPLF_Form);\n\n    if (element instanceof HTMLFormElement !== true) {\n      throw new Error('Form element invalid or missing');\n    }\n\n    this.form = element;\n    this.submitState = null; // null | 'submitting' | 'success' | new Error('error message')\n\n    this.submitHandler = null;\n    this.callbacks = {\n      beforeSend: {},\n      success: {},\n      error: {}\n    };\n    this.key = '_' + Math.random().toString(36).substr(2, 9);\n    this.addSubmitHandler();\n  }\n\n  _createClass(WPLF_Form, [{\n    key: \"addCallback\",\n    value: function addCallback(name, type, callback) {\n      this.callbacks[type][name] = callback;\n      return this;\n    }\n  }, {\n    key: \"removeCallback\",\n    value: function removeCallback(name, type) {\n      delete this.callbacks[type][name];\n      return this;\n    }\n  }, {\n    key: \"runCallback\",\n    value: function runCallback(type) {\n      var _this = this;\n\n      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n        args[_key - 1] = arguments[_key];\n      }\n\n      var legacy = window.wplf;\n\n      if (legacy.successCallbacks.length || legacy.errorCallbacks.length || legacy.beforeSendCallbacks.length) {\n        console.warn('WP Libre Form 2.0 introduced breaking changes to window.wplf \"API\", please migrate to the new API ASAP.');\n        legacy.callbacks.beforeSend.forEach(function (cb) {\n          cb.apply(void 0, args);\n        });\n        legacy.callbacks.error.forEach(function (cb) {\n          cb.apply(void 0, args);\n        });\n        legacy.callbacks.success.forEach(function (cb) {\n          cb.apply(void 0, args);\n        });\n      }\n\n      if (this.callbacks[type]) {\n        Object.keys(this.callbacks[type]).forEach(function (key) {\n          var _this$callbacks$type;\n\n          (_this$callbacks$type = _this.callbacks[type])[key].apply(_this$callbacks$type, args);\n        });\n      } else {\n        throw new Error(\"Unknown callback \".concat(name, \" \").concat(type));\n      }\n    }\n  }, {\n    key: \"addSubmitHandler\",\n    value: function addSubmitHandler(handler) {\n      var _this2 = this;\n\n      this.submitHandler = handler || function (e) {\n        e.preventDefault(); // Prevent double submissions by blocking send if it's already in progress\n\n        if (_this2.form.submitState === 'sending') {\n          return;\n        } // add class to enable css changes to indicate ajax loading\n\n\n        _this2.form.classList.add('sending');\n\n        [].forEach.call(_this2.form.querySelectorAll(\".wplf-error\"), function (error) {\n          // reset errors\n          error.parentNode.removeChild(error);\n        });\n\n        _this2.send().then(function (r) {\n          return r.text();\n        }).then(function (r) {\n          var response = JSON.parse(r);\n\n          if ('success' in response) {\n            // show success message if one exists\n            var success = document.createElement(\"p\");\n            success.className = \"wplf-success\";\n            success.innerHTML = response.success;\n\n            _this2.form.parentNode.insertBefore(success, _this2.form.nextSibling);\n          }\n\n          if ('ok' in response && response.ok) {\n            // submit succesful!\n            _this2.form.parentNode.removeChild(_this2.form);\n\n            _this2.submitStatus = 'success';\n\n            _this2.runCallback('success', response, _this2);\n          }\n\n          if ('error' in response) {\n            // show error message in form\n            var error = document.createElement(\"p\");\n            error.className = \"wplf-error error\";\n            error.textContent = response.error;\n\n            _this2.form.appendChild(error);\n\n            _this2.submitStatus = new Error(response.error);\n\n            _this2.runCallback('error', _this2.submitStatus, _this2); // Object.keys(this.callbacks.error).forEach(key => {\n            //   this.callbacks.error[key](response, this);\n            // });\n\n          }\n\n          _this2.form.classList.remove('sending');\n        })[\"catch\"](function (error) {\n          _this2.form.classList.remove(\"sending\"); // if (this.callbacks.error.length > 0) {\n\n\n          _this2.runCallback('error', error, _this2); // } else {\n\n\n          console.warn(\"Fetch error: \", error); // }\n        });\n      };\n\n      this.form.addEventListener('submit', this.submitHandler);\n      return this;\n    }\n  }, {\n    key: \"removeSubmitHandler\",\n    value: function removeSubmitHandler() {\n      this.form.removeEventListener('submit', this.submitHandler);\n      this.submitHandler = null;\n      return this;\n    }\n  }, {\n    key: \"send\",\n    value: function send() {\n      var form = this.form;\n      var data = new FormData(form); // Pass language if it exists.\n\n      _global_data__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lang && data.append('lang', _global_data__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lang);\n      form.submitState = 'submitting';\n      this.runCallback('beforeSend', form, this);\n      return fetch(_global_data__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ajax_url, {\n        method: \"POST\",\n        credentials: _global_data__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ajax_credentials || 'same-origin',\n        body: data,\n        headers: _global_data__WEBPACK_IMPORTED_MODULE_0__[\"default\"].request_headers || {}\n      });\n    }\n  }]);\n\n  return WPLF_Form;\n}();\n\n//# sourceURL=webpack://WPLF/./assets/scripts/classes/wplf-form.js?");

/***/ }),

/***/ "./assets/scripts/classes/wplf.js":
/*!****************************************!*\
  !*** ./assets/scripts/classes/wplf.js ***!
  \****************************************/
/*! exports provided: WPLF */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WPLF\", function() { return WPLF; });\n/* harmony import */ var _wplf_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wplf-form */ \"./assets/scripts/classes/wplf-form.js\");\n/* harmony import */ var _global_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../global-data */ \"./assets/scripts/global-data.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar dependencies = [];\nvar depsLoaded = 0;\n\nfunction _isReady() {\n  return dependencies.length === depsLoaded;\n}\n\nfunction loadPolyfill(name) {\n  var script = document.createElement('script');\n  script.src = _global_data__WEBPACK_IMPORTED_MODULE_1__[\"default\"].wplf_assets_dir + '/scripts/polyfills/' + name + '.js';\n  script.addEventListener('load', function () {\n    depsLoaded++;\n\n    if (_isReady()) {\n      window.postMessage('[WPLF] Polyfills loaded', '*');\n    }\n  });\n  document.body.appendChild(script);\n}\n\nif (!window.fetch) {\n  dependencies.push('fetch');\n}\n\nif (!window.Promise) {\n  dependencies.push('promise');\n}\n\nvar WPLF =\n/*#__PURE__*/\nfunction () {\n  function WPLF() {\n    var _this = this;\n\n    _classCallCheck(this, WPLF);\n\n    _defineProperty(this, \"forms\", {// '_g67a8z2kw': WPLF_Form\n    });\n\n    _defineProperty(this, \"Form\", _wplf_form__WEBPACK_IMPORTED_MODULE_0__[\"WPLF_Form\"]);\n\n    if (this.isReady()) {\n      this.initialize();\n    } else {\n      dependencies.forEach(loadPolyfill);\n      this.whenReady(function () {\n        return _this.initialize();\n      });\n    }\n  } // Expose WPLF_Form\n\n\n  _createClass(WPLF, [{\n    key: \"initialize\",\n    value: function initialize() {\n      var _this2 = this;\n\n      var compatibilityLayer = {\n        beforeSendCallbacks: [],\n        errorCallbacks: [],\n        successCallbacks: [],\n        attach: function attach(form) {\n          return _this2.attach(form);\n        },\n        submitHandler: function submitHandler(event) {\n          // Too much work to support properly. I'd be surprised if anyone even used this.\n          event.preventDefault();\n          alert('Form can\\'t be submitted properly due to configuration error. WP Libre Form 2.0 doesn\\'t support the legacy wplf.submitHandler.');\n        }\n      }; // _listenForWPLFMessage('Legacy callback', () => {\n      // This isn't needed, just use runCallback in wplf-form\n      // })\n\n      window.wplf = compatibilityLayer; // Old \"API\" was in window.wplf\n\n      if (_global_data__WEBPACK_IMPORTED_MODULE_1__[\"default\"].settings.autoinit) {\n        [].forEach.call(document.querySelectorAll(\".libre-form\"), function (form) {\n          return _this2.attach(form);\n        });\n      }\n    }\n  }, {\n    key: \"isReady\",\n    value: function isReady() {\n      return _isReady();\n    }\n  }, {\n    key: \"_listenForWPLFMessage\",\n    value: function _listenForWPLFMessage(message) {\n      var _this3 = this;\n\n      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {\n        return null;\n      };\n      window.addEventListener('message', function (e) {\n        if (typeof e.data === 'string' && e.data.indexOf(\"[WPLF] \".concat(message)) === 0) {\n          cb(_this3);\n        }\n      });\n    }\n  }, {\n    key: \"whenReady\",\n    value: function whenReady() {\n      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {\n        return null;\n      };\n\n      this._listenForWPLFMessage('Polyfills loaded', cb);\n    }\n  }, {\n    key: \"findFormsById\",\n    value: function findFormsById(id) {\n      var _this4 = this;\n\n      return Object.keys(this.forms).reduce(function (acc, key) {\n        var wplfForm = _this4.forms[key];\n\n        if (parseInt(wplfForm.form.getAttribute('data-form-id'), 10) === parseInt(id, 10)) {\n          acc.push(wplfForm);\n        }\n\n        return acc;\n      }, []);\n    }\n  }, {\n    key: \"attach\",\n    value: function attach(elementOrWplfForm) {\n      if (elementOrWplfForm instanceof _wplf_form__WEBPACK_IMPORTED_MODULE_0__[\"WPLF_Form\"]) {\n        var _wplfForm = elementOrWplfForm;\n        this.forms[_wplfForm.key] = _wplfForm;\n        return _wplfForm;\n      }\n\n      var element = elementOrWplfForm;\n\n      if (element instanceof HTMLFormElement !== true) {\n        throw new Error('Unable to attach WPLF to element', element);\n      }\n\n      var wplfForm = new _wplf_form__WEBPACK_IMPORTED_MODULE_0__[\"WPLF_Form\"](element);\n      this.forms[wplfForm.key] = wplfForm;\n      return wplfForm;\n    }\n  }, {\n    key: \"detach\",\n    value: function detach(elementOrWplfForm) {\n      if (elementOrWplfForm instanceof _wplf_form__WEBPACK_IMPORTED_MODULE_0__[\"WPLF_Form\"]) {\n        var wplfForm = elementOrWplfForm;\n        this.forms[wplfForm.key].removeSubmitHandler();\n        delete this.forms[wplfForm.key];\n        return true;\n      }\n\n      var element = elementOrWplfForm;\n\n      if (element instanceof HTMLFormElement !== true) {\n        throw new Error('Unable to detach WPLF from element', element);\n      }\n\n      this.forms[element].removeSubmitHandler();\n      delete this.forms[element];\n      return true;\n    }\n  }]);\n\n  return WPLF;\n}();\n\n//# sourceURL=webpack://WPLF/./assets/scripts/classes/wplf.js?");

/***/ }),

/***/ "./assets/scripts/global-data.js":
/*!***************************************!*\
  !*** ./assets/scripts/global-data.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((function (window) {\n  return _objectSpread({}, window.WPLF_DATA);\n})(window)); // TODO: Maybe add Node compatibility?\n\n//# sourceURL=webpack://WPLF/./assets/scripts/global-data.js?");

/***/ }),

/***/ "./assets/scripts/wplf-frontend.js":
/*!*****************************************!*\
  !*** ./assets/scripts/wplf-frontend.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_wplf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/wplf */ \"./assets/scripts/classes/wplf.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new _classes_wplf__WEBPACK_IMPORTED_MODULE_0__[\"WPLF\"]());\n\n//# sourceURL=webpack://WPLF/./assets/scripts/wplf-frontend.js?");

/***/ }),

/***/ 1:
/*!***********************************************!*\
  !*** multi ./assets/scripts/wplf-frontend.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /home/k1sul1/Documents/Projects/Hobby/crest.fi/htdocs/wp-content/plugins/wp-libre-form/assets/scripts/wplf-frontend.js */\"./assets/scripts/wplf-frontend.js\");\n\n\n//# sourceURL=webpack://WPLF/multi_./assets/scripts/wplf-frontend.js?");

/***/ })

/******/ })["default"];
});