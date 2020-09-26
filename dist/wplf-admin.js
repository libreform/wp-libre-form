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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/scripts/classes/storage.ts":
/*!*******************************************!*\
  !*** ./assets/scripts/classes/storage.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/log */ "./assets/scripts/lib/log.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Storage = /*#__PURE__*/function () {
  function Storage() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'wplf';

    _classCallCheck(this, Storage);

    this.prefix = prefix;
  }

  _createClass(Storage, [{
    key: "get",
    value: function get(key, defaultValue) {
      var data = localStorage.getItem(this.prefix + key);

      if (data !== null) {
        var value = data ? JSON.parse(data) : data;
        return value;
      } else {
        _lib_log__WEBPACK_IMPORTED_MODULE_0__["default"].notice("No value found for ".concat(key, ", falling back to default"), defaultValue);
        return defaultValue;
      }
    }
  }, {
    key: "set",
    value: function set(key, value) {
      try {
        localStorage.setItem(this.prefix + key, JSON.stringify(value));
        return true;
      } catch (e) {
        _lib_log__WEBPACK_IMPORTED_MODULE_0__["default"].error(e, key, value);
        return false;
      }
    }
  }]);

  return Storage;
}();

/* harmony default export */ __webpack_exports__["default"] = (new Storage());

/***/ }),

/***/ "./assets/scripts/classes/wplf-addons.ts":
/*!***********************************************!*\
  !*** ./assets/scripts/classes/wplf-addons.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WPLF_Addons; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const $ = window.jQuery
// const _ = window._
// const wp = window.wp
var WPLF_Addons = function WPLF_Addons(wplfInstance) {
  _classCallCheck(this, WPLF_Addons);
};



/***/ }),

/***/ "./assets/scripts/classes/wplf-admin.ts":
/*!**********************************************!*\
  !*** ./assets/scripts/classes/wplf-admin.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WPLF_Admin; });
/* harmony import */ var _wplf_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wplf-editor */ "./assets/scripts/classes/wplf-editor.ts");
/* harmony import */ var _wplf_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wplf-settings */ "./assets/scripts/classes/wplf-settings.ts");
/* harmony import */ var _wplf_addons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wplf-addons */ "./assets/scripts/classes/wplf-addons.ts");
/* harmony import */ var _wplf_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wplf-tabs */ "./assets/scripts/classes/wplf-tabs.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var WPLF_Admin = /*#__PURE__*/function () {
  function WPLF_Admin(wplfInstance) {
    _classCallCheck(this, WPLF_Admin);

    this.tabs = Array.from(document.querySelectorAll('.wplf-tabs')).map(function (el) {
      return new _wplf_tabs__WEBPACK_IMPORTED_MODULE_3__["default"](el);
    }); // Init stuff based on what page we're on

    var classList = document.body.classList;

    if (classList.contains('post-type-libreform') && (classList.contains('post-php') || classList.contains('post-new-php'))) {
      this.editor = new _wplf_editor__WEBPACK_IMPORTED_MODULE_0__["default"](wplfInstance);
    } else if (classList.contains('libreform_page_wplfSettings')) {
      // In settings page
      this.settings = new _wplf_settings__WEBPACK_IMPORTED_MODULE_1__["default"](wplfInstance);
    } else if (classList.contains('libreform_page_wplfAddons')) {
      this.addons = new _wplf_addons__WEBPACK_IMPORTED_MODULE_2__["default"](wplfInstance);
    }
  }

  _createClass(WPLF_Admin, [{
    key: "getEditor",
    value: function getEditor() {
      return this.editor;
    }
  }, {
    key: "getAddons",
    value: function getAddons() {
      return this.addons;
    }
  }, {
    key: "getSettings",
    value: function getSettings() {
      return this.settings;
    }
  }, {
    key: "getTabs",
    value: function getTabs() {
      return this.tabs;
    }
  }]);

  return WPLF_Admin;
}();



/***/ }),

/***/ "./assets/scripts/classes/wplf-editor.ts":
/*!***********************************************!*\
  !*** ./assets/scripts/classes/wplf-editor.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WPLF_Editor; });
/* harmony import */ var _lib_global_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/global-data */ "./assets/scripts/lib/global-data.ts");
/* harmony import */ var _lib_api_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/api-client */ "./assets/scripts/lib/api-client.ts");
/* harmony import */ var _lib_log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/log */ "./assets/scripts/lib/log.ts");
/* harmony import */ var _lib_wait__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/wait */ "./assets/scripts/lib/wait.ts");
/* harmony import */ var _lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/is-elementish */ "./assets/scripts/lib/is-elementish.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../types */ "./assets/scripts/types.ts");
/* harmony import */ var _lib_get_attribute__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/get-attribute */ "./assets/scripts/lib/get-attribute.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }









var _createApiClient = Object(_lib_api_client__WEBPACK_IMPORTED_MODULE_1__["default"])(),
    abort = _createApiClient.abort,
    request = _createApiClient.request,
    signal = _createApiClient.signal;

var i18n = _lib_global_data__WEBPACK_IMPORTED_MODULE_0__["default"].i18n;
var $ = window.jQuery;
var _ = window._;
var wp = window.wp;

var WPLF_Editor = /*#__PURE__*/function () {
  function WPLF_Editor(wplfInstance) {
    _classCallCheck(this, WPLF_Editor);

    this.formInstance = null;
    var fields = document.querySelector('#wplfFields');
    var additionalFields = document.querySelector('#wplfAdditionalFields');
    var newFields = document.querySelector('#wplfNewFields');
    var deletedFields = document.querySelector('#wplfDeletedFields');
    var historyFields = document.querySelector('#wplfHistoryFields');
    var allowSave = document.querySelector('#wplfAllowSave');
    var editorEl = document.querySelector('.wplf-editor .wplf-cmEditor');
    var thankYouEl = document.querySelector('.wplf-afterSubmission .wplf-cmEditor');
    var previewEl = document.querySelector('.wplf-editor__preview');
    var publishButton = document.querySelector('#publish');
    var sidebarFieldTemplate = document.querySelector('.wplf-formFields > .wplf-formFields__field');

    if (Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(fields) && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(additionalFields) && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(newFields) && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(deletedFields) && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(historyFields) && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(allowSave) && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(editorEl) && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(thankYouEl) && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(previewEl) && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(publishButton) && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(sidebarFieldTemplate)) {
      console.log('all fine', fields);
      var initialState = {
        historyFields: JSON.parse( // (historyFields && historyFields.getAttribute('value')) || null
        Object(_lib_get_attribute__WEBPACK_IMPORTED_MODULE_6__["default"])(historyFields, 'value') || '{}'),
        fields: JSON.parse(Object(_lib_get_attribute__WEBPACK_IMPORTED_MODULE_6__["default"])(fields, 'value') || 'null'),
        additionalFields: JSON.parse(Object(_lib_get_attribute__WEBPACK_IMPORTED_MODULE_6__["default"])(additionalFields, 'value') || 'null'),
        newFields: [],
        deletedFields: [],
        allowSave: false
      };
      console.log(initialState);
      this.wplf = wplfInstance;
      this.state = initialState;
      this.inputs = {
        fields,
        additionalFields,
        newFields,
        deletedFields,
        historyFields,
        allowSave
      };
      this.fieldTemplate = sidebarFieldTemplate.cloneNode(true);
      this.fieldTemplate.removeAttribute('hidden');
      this.previewEl = previewEl;
      this.publishButton = publishButton;
      this.contentEditor = wp.codeEditor.initialize($(editorEl), _lib_global_data__WEBPACK_IMPORTED_MODULE_0__["default"].codeMirror);
      this.successMessageEditor = wp.codeEditor.initialize($(thankYouEl), _lib_global_data__WEBPACK_IMPORTED_MODULE_0__["default"].codeMirror);
      this.handleContentChange = this.handleContentChange.bind(this);
      this.contentEditor.codemirror.on('changes', _.debounce(this.handleContentChange, 1000));
      this.handleContentChange(this.contentEditor.codemirror); // Triggers preview build

      if (!_lib_global_data__WEBPACK_IMPORTED_MODULE_0__["default"].settings.hasUnfilteredHtml) {
        this.tryToPreventEdit();
      }
    } else {
      console.log('Something is terribly wrong, some WPLF elements are missing');
      throw new Error('WTF'); // return false
    }
  }

  _createClass(WPLF_Editor, [{
    key: "setState",
    value: function setState() {
      var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (currentState) {
        return {};
      };
      var currentState = this.state;
      var newState = fn(currentState);

      if (!newState) {
        // no op
        return;
      }

      this.state = _objectSpread(_objectSpread({}, currentState), newState);
      this.afterStateChange();
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }, {
    key: "writeState",
    value: function writeState() {
      var _this = this;

      Object.entries(this.inputs).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            el = _ref2[1];

        if (key in _this.state) {
          // if (this.state[key] !== null) {
          var value = _this.state[key];

          if (typeof value === 'boolean') {
            el.setAttribute('value', value ? '1' : '0');
          } else {
            // el.value = JSON.stringify(value)
            el.setAttribute('value', JSON.stringify(value));
          }
        }
      });
    }
  }, {
    key: "afterStateChange",
    value: function afterStateChange() {
      var _this2 = this;

      var state = this.getState();
      Object.entries(state).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        switch (k) {
          case 'allowSave':
            {
              _this2.writeState();

              if (v) {
                _this2.publishButton.removeAttribute('disabled');
              } else {
                _this2.publishButton.setAttribute('disabled', 'true');
              }
            }
          // no default, yet
        }
      });
    }
    /**
     * Disable bunch of things and remove the submit button,
     * backend will handle it if necessary but it's not pretty.
     * Backend should also print a notice above the form.
     */

  }, {
    key: "tryToPreventEdit",
    value: function tryToPreventEdit() {
      // Might as well use the jQuery since it's wp-admin
      $('#title').prop('disabled', true);
      $('#content').prop('disabled', true);
      $('#publish').remove();
      $('#save-post').remove();
    } // `editor` is a CodeMirror instance

  }, {
    key: "handleContentChange",
    value: function () {
      var _handleContentChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(editor) {
        var wplf, formInstance, content;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                wplf = this.wplf, formInstance = this.formInstance;
                content = editor.getValue();
                _context.prev = 2;

                if (formInstance) {
                  wplf.detach(formInstance);
                  formInstance = null;
                } // Disable submit button when the fields change


                this.setState(function () {
                  return {
                    allowSave: false
                  };
                });
                _context.next = 7;
                return this.updatePreview(content);

              case 7:
                _context.next = 9;
                return this.updateFormFieldsFromPreview();

              case 9:
                _context.next = 11;
                return this.removeProblematicAttributesFromPreview();

              case 11:
                this.writeState();
                formInstance = wplf.attach(this.previewEl);
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](2);
                _lib_log__WEBPACK_IMPORTED_MODULE_2__["default"].error('Failed to get preview', _context.t0);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 15]]);
      }));

      function handleContentChange(_x) {
        return _handleContentChange.apply(this, arguments);
      }

      return handleContentChange;
    }()
  }, {
    key: "updatePreview",
    value: function () {
      var _updatePreview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(content) {
        var idEl, formId, body, object, req, tmpEl, html, form;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                idEl = document.querySelector('input[name="post_ID"]');
                formId = parseInt(Object(_lib_get_attribute__WEBPACK_IMPORTED_MODULE_6__["default"])(idEl, 'value') || '0', 10);
                body = new FormData();
                body.append('content', content);
                body.append('formId', formId.toString());
                _lib_global_data__WEBPACK_IMPORTED_MODULE_0__["default"].lang && body.append('lang', _lib_global_data__WEBPACK_IMPORTED_MODULE_0__["default"].lang);
                object = {};
                body.forEach(function (value, key) {
                  object[key] = value;
                });
                console.log('preview req body', object);
                _context2.next = 11;
                return request('/render', {
                  method: 'POST',
                  body
                }, _types__WEBPACK_IMPORTED_MODULE_5__["ApiResponseKind"].Render);

              case 11:
                req = _context2.sent;

                if (!(req.kind === _types__WEBPACK_IMPORTED_MODULE_5__["ApiResponseKind"].Render)) {
                  _context2.next = 26;
                  break;
                }

                if (!('error' in req.data)) {
                  _context2.next = 17;
                  break;
                }

                this.previewEl.innerHTML = JSON.stringify(req.data);
                _context2.next = 26;
                break;

              case 17:
                if (!('html' in req.data)) {
                  _context2.next = 26;
                  break;
                }

                tmpEl = document.createElement('div');
                html = req.data.html;
                tmpEl.innerHTML = html;
                _context2.next = 23;
                return Object(_lib_wait__WEBPACK_IMPORTED_MODULE_3__["waitForNextTick"])();

              case 23:
                if (tmpEl) {
                  form = tmpEl.querySelector('form');
                  this.previewEl.innerHTML = form ? form.innerHTML : '';
                }

                _context2.next = 26;
                return Object(_lib_wait__WEBPACK_IMPORTED_MODULE_3__["waitForNextTick"])();

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updatePreview(_x2) {
        return _updatePreview.apply(this, arguments);
      }

      return updatePreview;
    }()
  }, {
    key: "getDuplicateNames",
    value: function getDuplicateNames(names) {
      return _.unique(names.filter(function (name) {
        return names.filter(function (n) {
          return n === name;
        }).length > 1;
      }));
    }
  }, {
    key: "createFieldElement",
    value: function createFieldElement(field) {
      var errorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var element = this.fieldTemplate.cloneNode(true);
      var name = field.name,
          type = field.type,
          required = field.required;
      var nameEl = element.querySelector('strong');
      var typeEl = element.querySelector('.wplf-formFields__field__type em');
      var alert = element.querySelector('.wplf-formFields__field__alert');

      if (Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(nameEl) && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(typeEl) && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(alert)) {
        nameEl.innerText = name;
        typeEl.innerText = required ? "required ".concat(type) : type;

        if (errorMessage) {
          alert.setAttribute('title', errorMessage);
          var messages = document.createElement('p');
          var message = "<strong>".concat(i18n.problems, "</strong>").concat(errorMessage).replace(/(?:\r\n|\r|\n)/g, '<br>');
          messages.innerHTML = message;
          alert.insertAdjacentElement('afterend', messages);
        } else {
          Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(alert.parentNode) && alert.parentNode.removeChild(alert);
        }
      }

      return element;
    }
  }, {
    key: "updateFormFieldsFromPreview",
    value: function () {
      var _updateFormFieldsFromPreview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this3 = this;

        var _this$getState, historyFields, additionalFields, el, fieldContainer, allowSave, fields, fieldNames, duplicateNames, fieldErrors, newFields, deletedFields, newState;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this$getState = this.getState(), historyFields = _this$getState.historyFields, additionalFields = _this$getState.additionalFields;
                el = this.previewEl;
                fieldContainer = document.querySelector('.wplf-formFields');

                if (Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(fieldContainer)) {
                  _context3.next = 6;
                  break;
                }

                console.warn('Field container does not exist');
                return _context3.abrupt("return");

              case 6:
                allowSave = true; // Get all inputs with a name attribute, yes, even button.

                fields = Array.from(el.querySelectorAll('input, textarea, select, button')).filter(function (el) {
                  return el.getAttribute('name');
                }).reduce(function (acc, el) {
                  if (el && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_4__["default"])(el)) {
                    var fieldName = el.getAttribute('name');

                    if (!fieldName) {
                      // return null
                      return acc;
                    }
                    /**
                     * Remove brackets from the name, because they cause us grief.
                     * The brackets are not visible in the actual data, which kinda breaks all comparisons.
                     */


                    var name = fieldName.replace('[]', '');
                    var type = el.getAttribute('type') || el.tagName.toLowerCase();
                    var required = el.getAttribute('required') !== null ? true : false;
                    var multiple = fieldName.endsWith('[]');
                    acc.push({
                      name,
                      type,
                      required,
                      multiple
                    });
                    return acc;
                  }

                  return acc;
                }, []); // .filter((n) => n !== null)

                fieldNames = fields.map(function (field) {
                  return field.name;
                });
                duplicateNames = this.getDuplicateNames(fieldNames);
                fieldContainer.innerHTML = '';
                fieldErrors = [];
                fields.forEach(function (field) {
                  if (!field) {
                    return;
                  }

                  var name = field.name,
                      type = field.type;
                  var historyField = Object.values(historyFields).find(function (field) {
                    return field.name === name;
                  });
                  var errorMessage = ''; // names like fieldgroup[fieldname] are not supported yet

                  if (name.match(/\w*\[\w*\]/)) {
                    errorMessage = "".concat(errorMessage).concat(i18n.groupedNamesNotSupportedYet, "\n");
                  }

                  if (duplicateNames && duplicateNames.includes(name)) {
                    errorMessage = "".concat(errorMessage).concat(i18n.duplicateFieldName, " ").concat(name, "\n");
                  }

                  if (additionalFields.includes(name)) {
                    errorMessage = "".concat(errorMessage).concat(i18n.illegalName.replace('{name}', name), "\n");
                  }

                  if (historyField && historyField.type !== type) {
                    errorMessage = "".concat(errorMessage).concat(i18n.fieldAlreadyExistsInDb.replace('{type}', historyField.type), "\n");
                  }

                  if (errorMessage) {
                    fieldErrors.push(errorMessage);
                  }

                  fieldContainer.appendChild(_this3.createFieldElement(field, errorMessage));
                });

                if (!fieldErrors.length) {
                  allowSave = true;
                } else {
                  allowSave = false;
                }

                newFields = fields.filter(function (field) {
                  if (!field) {
                    return false;
                  }

                  var fieldInInitialData = Object.values(historyFields).find(function (x) {
                    return x.name === field.name;
                  });
                  return fieldInInitialData ? false : true;
                });
                deletedFields = Object.values(historyFields).filter(function (field) {
                  return !fieldNames.includes(field.name);
                });
                newState = {
                  fields: fields,
                  newFields: newFields,
                  deletedFields,
                  allowSave
                };
                this.setState(function () {
                  return newState;
                });
                _context3.next = 20;
                return Object(_lib_wait__WEBPACK_IMPORTED_MODULE_3__["waitForNextTick"])();

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateFormFieldsFromPreview() {
        return _updateFormFieldsFromPreview.apply(this, arguments);
      }

      return updateFormFieldsFromPreview;
    }()
  }, {
    key: "removeProblematicAttributesFromPreview",
    value: function () {
      var _removeProblematicAttributesFromPreview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var requiredEls, nameEls;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // Names and required attributes cause problems when saving the form, remove
                requiredEls = Array.from(this.previewEl.querySelectorAll('[required]'));
                nameEls = Array.from(this.previewEl.querySelectorAll('[name]'));
                requiredEls.forEach(function (el) {
                  return el.removeAttribute('required');
                });
                nameEls.forEach(function (el) {
                  return el.removeAttribute('name');
                });
                _context4.next = 6;
                return Object(_lib_wait__WEBPACK_IMPORTED_MODULE_3__["waitForNextTick"])();

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function removeProblematicAttributesFromPreview() {
        return _removeProblematicAttributesFromPreview.apply(this, arguments);
      }

      return removeProblematicAttributesFromPreview;
    }()
  }]);

  return WPLF_Editor;
}();



/***/ }),

/***/ "./assets/scripts/classes/wplf-form.ts":
/*!*********************************************!*\
  !*** ./assets/scripts/classes/wplf-form.ts ***!
  \*********************************************/
/*! exports provided: WPLF_Form */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WPLF_Form", function() { return WPLF_Form; });
/* harmony import */ var _lib_global_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/global-data */ "./assets/scripts/lib/global-data.ts");
/* harmony import */ var _lib_api_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/api-client */ "./assets/scripts/lib/api-client.ts");
/* harmony import */ var _lib_log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/log */ "./assets/scripts/lib/log.ts");
/* harmony import */ var _wplf_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wplf-tabs */ "./assets/scripts/classes/wplf-tabs.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types */ "./assets/scripts/types.ts");
/* harmony import */ var _lib_is_elementish__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/is-elementish */ "./assets/scripts/lib/is-elementish.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }








var _createApiClient = Object(_lib_api_client__WEBPACK_IMPORTED_MODULE_1__["default"])(),
    request = _createApiClient.request;

var resetForm = function resetForm(wplfForm, params) {
  var form = wplfForm.form; // Since all type guarantees have been thrown out of the window,
  // it's necessary to check that the element indeed has this method.

  if (form.reset) {
    form.reset();
  }
};

var defaultBeforeSendCallback = function defaultBeforeSendCallback(wplfForm, params) {
  if (Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_5__["default"])(wplfForm.form.parentNode)) {
    var parentNode = wplfForm.form.parentNode; // Reset error and success messages, if there were any

    var messages = parentNode.querySelectorAll('.wplf-errorMessage, .wplf-successMessage');
    messages.forEach(function (element) {
      if (Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_5__["default"])(element.parentNode)) {
        element.parentNode.removeChild(element);
      }
    });
  }
};

var defaultSuccessCallback = function defaultSuccessCallback(wplfForm, params) {
  var data = params.data;
  var message = data.message;
  var div = document.createElement('div');
  div.classList.add('wplf-successMessage');
  div.insertAdjacentHTML('afterbegin', message);
  wplfForm.form.insertAdjacentElement('beforebegin', div);
  wplfForm.form.classList.add('submitted');
};

var defaultErrorSendCallback = function defaultErrorSendCallback(wplfForm, params) {
  var error = params.error;
  var div = document.createElement('div');
  div.classList.add('wplf-errorMessage');
  div.insertAdjacentHTML('afterbegin', error.message);
  wplfForm.form.insertAdjacentElement('beforebegin', div);
};

var WPLF_Form = /*#__PURE__*/function () {
  // constructor(element: HTMLFormElement) {
  function WPLF_Form(element) {
    _classCallCheck(this, WPLF_Form);

    this.submitState = _types__WEBPACK_IMPORTED_MODULE_4__["SubmitState"].Unsubmitted;
    this.callbacks = {
      beforeSend: {
        default: defaultBeforeSendCallback
      },
      success: {
        default: defaultSuccessCallback,
        clearOnSuccess: resetForm
      },
      error: {
        default: defaultErrorSendCallback
      }
    };
    this.tabs = [];
    this.key = '';

    if (element instanceof Element !== true) {
      // if (element instanceof HTMLFormElement !== true) {
      throw new Error('Form element invalid or missing');
    }

    var fallbackInput = element.querySelector('[name="_nojs"]');
    this.form = element;
    this.key = '_' + Math.random().toString(36).substr(2, 9);
    this.tabs = Array.from(this.form.querySelectorAll('.wplf-tabs')).map(function (el) {
      return new _wplf_tabs__WEBPACK_IMPORTED_MODULE_3__["default"](el);
    });
    this.submitHandler = this.createSubmitHandler();
    this.attachSubmitHandler(); // Remove input that triggers the fallback so we get a JSON response

    if (fallbackInput && Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_5__["default"])(fallbackInput.parentNode)) {
      fallbackInput.parentNode.removeChild(fallbackInput);
    }
  }

  _createClass(WPLF_Form, [{
    key: "addCallback",
    value: function addCallback(name, type, callback) {
      var callbacks = this.callbacks;
      var beforeSend = callbacks.beforeSend,
          success = callbacks.success,
          error = callbacks.error;

      switch (type) {
        case 'beforeSend':
          {
            beforeSend[name] = callback;
            break;
          }

        case 'success':
          {
            success[name] = callback;
            break;
          }

        case 'error':
          {
            error[name] = callback;
            break;
          }

        default:
          {
            throw new Error("Unknown callback type ".concat(type));
          }
      }

      return this;
    }
  }, {
    key: "removeCallback",
    value: function removeCallback(name, type) {
      var callbacks = this.callbacks;
      var beforeSend = callbacks.beforeSend,
          success = callbacks.success,
          error = callbacks.error;

      switch (type) {
        case 'beforeSend':
          {
            delete beforeSend[name];
            break;
          }

        case 'success':
          {
            delete success[name];
            break;
          }

        case 'error':
          {
            delete error[name];
            break;
          }

        default:
          {
            throw new Error("Unknown callback ".concat(name, " ").concat(type));
          }
      }

      return this;
    }
  }, {
    key: "runCallback",
    value: function runCallback(type) {
      var _this = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callbacks = this.callbacks;
      var beforeSend = callbacks.beforeSend,
          success = callbacks.success,
          error = callbacks.error;

      switch (type) {
        case 'beforeSend':
          {
            Object.values(beforeSend).forEach(function (callback) {
              callback(_this, params);
            });
            break;
          }

        case 'success':
          {
            Object.values(success).forEach(function (callback) {
              callback(_this, params);
            });
            break;
          }

        case 'error':
          {
            Object.values(error).forEach(function (callback) {
              callback(_this, params);
            });
            break;
          }

        default:
          {
            throw new Error("Unknown callback ".concat(name, " ").concat(type));
          }
      }
    }
  }, {
    key: "attachSubmitHandler",
    value: function attachSubmitHandler() {
      this.form.addEventListener('submit', this.submitHandler, {
        passive: false
      });
      return this;
    }
    /**
     * Removes submit handler from the form, but keeps it in memory.
     */

  }, {
    key: "removeSubmitHandler",
    value: function removeSubmitHandler() {
      this.form.removeEventListener('submit', this.submitHandler);
      return this;
    }
  }, {
    key: "createSubmitHandler",
    value: function createSubmitHandler(handler) {
      var _this2 = this;

      if (handler) {
        return handler;
      }

      return /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
          var x, data, ok;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  e.preventDefault();

                  if (!(_this2.submitState === _types__WEBPACK_IMPORTED_MODULE_4__["SubmitState"].Submitting)) {
                    _context.next = 4;
                    break;
                  }

                  _lib_log__WEBPACK_IMPORTED_MODULE_2__["default"].notice('Preventing double doubmission');
                  return _context.abrupt("return");

                case 4:
                  _context.prev = 4;
                  _context.next = 7;
                  return _this2.send();

                case 7:
                  x = _context.sent;
                  data = x.data, ok = x.ok;

                  if (!ok) {
                    _context.next = 14;
                    break;
                  }

                  _this2.submitState = _types__WEBPACK_IMPORTED_MODULE_4__["SubmitState"].Success;

                  _this2.runCallback('success', {
                    data
                  });

                  _context.next = 16;
                  break;

                case 14:
                  console.log('not ok!', x);
                  throw new Error('Something went wrong');

                case 16:
                  _context.next = 22;
                  break;

                case 18:
                  _context.prev = 18;
                  _context.t0 = _context["catch"](4);
                  _this2.submitState = _types__WEBPACK_IMPORTED_MODULE_4__["SubmitState"].Error;

                  _this2.runCallback('error', {
                    error: _this2.submitState
                  });

                case 22:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[4, 18]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();
    }
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var form, data, req;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                form = this.form;
                data = new FormData(form); // FormData can't be made from Element

                _lib_global_data__WEBPACK_IMPORTED_MODULE_0__["default"].lang && data.append('lang', _lib_global_data__WEBPACK_IMPORTED_MODULE_0__["default"].lang);
                this.submitState = _types__WEBPACK_IMPORTED_MODULE_4__["SubmitState"].Submitting;
                form.classList.add('submitting');
                this.runCallback('beforeSend', {
                  formData: data,
                  form
                });
                req = request('/submit', {
                  method: 'POST',
                  body: data
                }, _types__WEBPACK_IMPORTED_MODULE_4__["ApiResponseKind"].Submission);
                form.classList.remove('submitting');
                return _context2.abrupt("return", req);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function send() {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }]);

  return WPLF_Form;
}();

/***/ }),

/***/ "./assets/scripts/classes/wplf-settings.ts":
/*!*************************************************!*\
  !*** ./assets/scripts/classes/wplf-settings.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WPLF_Settings; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WPLF_Settings = function WPLF_Settings(wplfInstance) {
  _classCallCheck(this, WPLF_Settings);
};



/***/ }),

/***/ "./assets/scripts/classes/wplf-tabs.ts":
/*!*********************************************!*\
  !*** ./assets/scripts/classes/wplf-tabs.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WPLF_Tabs; });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./assets/scripts/classes/storage.ts");
/* harmony import */ var _lib_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/log */ "./assets/scripts/lib/log.ts");
/* harmony import */ var _lib_is_elementish__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/is-elementish */ "./assets/scripts/lib/is-elementish.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var WPLF_Tabs = /*#__PURE__*/function () {
  function WPLF_Tabs(element) {
    var _this = this;

    _classCallCheck(this, WPLF_Tabs);

    // if (element instanceof Element !== true) {
    // throw new Error('Tab element invalid or missing')
    // }
    // remember = false
    // activeTab = null
    // root = null
    // name = null
    this.remember = false;
    this.name = '';

    this.handleClick = function (e) {
      var target = e.target;

      if (Object(_lib_is_elementish__WEBPACK_IMPORTED_MODULE_2__["default"])(target)) {
        console.log(target); // }
        // if (target) {
        // const x = target as HTMLElement // I'm 99.9% sure there will always be a target

        var tabName = target.getAttribute('data-target');

        if (tabName) {
          _this.switchTab(tabName);
        } else {
          _lib_log__WEBPACK_IMPORTED_MODULE_1__["default"].notice('Unable to switch tab as data-target was empty');
        }
      }

      e.preventDefault();
    };

    this.root = element;
    this.name = this.root.getAttribute('data-name') || '';
    this.remember = this.root.getAttribute('data-remember') !== null;
    this.activeTab = this.root.getAttribute('data-default') || '';

    if (!this.root) {
      throw new Error('does this work for ts (it does not)');
    }

    if (!this.name || !this.activeTab) {
      throw new Error('Required attributes are missing');
    }

    if (this.remember) {
      // Get saved value or keep using the default
      this.activeTab = _storage__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.name, this.activeTab);
    }

    this.refresh();
  }
  /**
   * Attach event listeners and ensure the current tab is visible.
   * Call after adding a tab dynamically.
   */


  _createClass(WPLF_Tabs, [{
    key: "refresh",
    value: function refresh() {
      var _this2 = this;

      this.getHandles().forEach(function (handle) {
        // It's not possible to add the same event listener twice. If the handle already has the listener,
        // this is a no-op.
        handle.addEventListener('click', _this2.handleClick, {
          passive: false
        });
      }); // If activeTab is null, things will break. Fall back to first tab
      // activeTab cant be null anymore

      /*     if (this.activeTab === null) {
        const tabs = this.getTabs()
             if (tabs.length) {
          const first = tabs[0]
          const .getAttribute('data-target')
             }
             log.notice('activeTab was null, setting first tab as active', first)
        this.activeTab = first
      } */

      this.switchTab(this.activeTab);
    }
    /**
     * Values are not cached as they are practically free to recompute, but
     * might become a memory leak if stored.
     */

  }, {
    key: "getTabs",
    value: function getTabs() {
      return Array.from(this.root.querySelectorAll(".wplf-tabs__tab[data-name=\"".concat(this.name, "\"]")));
    }
    /**
     * See getTabs()
     */

  }, {
    key: "getHandles",
    value: function getHandles() {
      return Array.from(this.root.querySelectorAll(".wplf-tabs__tabSwitcher[data-name=\"".concat(this.name, "\"]")));
    }
  }, {
    key: "switchTab",
    value: function switchTab(name) {
      var tabs = this.getTabs();
      var allHandles = this.getHandles();
      var open = tabs.filter(function (tab) {
        return tab.getAttribute('data-tab') === name;
      });
      var close = tabs.filter(function (tab) {
        return tab.getAttribute('data-tab') !== name;
      });
      open.forEach(function (tab) {
        var tabName = tab.getAttribute('data-tab');
        var handles = allHandles.filter(function (handle) {
          return handle.getAttribute('data-target') === tabName;
        });
        tab.classList.add('active');
        handles.forEach(function (handle) {
          handle.classList.add('active');
        });
      });
      close.forEach(function (tab) {
        var tabName = tab.getAttribute('data-tab');
        var handles = allHandles.filter(function (handle) {
          return handle.getAttribute('data-target') === tabName;
        });
        tab.classList.remove('active');
        handles.forEach(function (handle) {
          handle.classList.remove('active');
        });
      });

      if (this.remember) {
        _storage__WEBPACK_IMPORTED_MODULE_0__["default"].set(this.name, name);
      }
    }
  }]);

  return WPLF_Tabs;
}();



/***/ }),

/***/ "./assets/scripts/classes/wplf.ts":
/*!****************************************!*\
  !*** ./assets/scripts/classes/wplf.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WPLF; });
/* harmony import */ var _wplf_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wplf-form */ "./assets/scripts/classes/wplf-form.ts");
/* harmony import */ var _lib_global_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/global-data */ "./assets/scripts/lib/global-data.ts");
/* harmony import */ var _lib_ensure_num__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/ensure-num */ "./assets/scripts/lib/ensure-num.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var WPLF = /*#__PURE__*/function () {
  function WPLF() {
    _classCallCheck(this, WPLF);

    // forms = {
    //   // '_g67a8z2kw': WPLF_Form
    // }
    this.forms = {}; // Expose WPLF_Form
    // Form: WPLF_Form = WPLF_Form

    this.Form = _wplf_form__WEBPACK_IMPORTED_MODULE_0__["WPLF_Form"];
    this.initialize();
  }

  _createClass(WPLF, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;

      if (_lib_global_data__WEBPACK_IMPORTED_MODULE_1__["default"].settings.autoinit) {
        ;
        [].forEach.call(document.querySelectorAll('form.wplf'), function (form) {
          return _this.attach(form);
        });
      }
    }
  }, {
    key: "findFormsById",
    value: function findFormsById(id) {
      var _this2 = this;

      return Object.keys(this.forms).reduce(function (acc, key) {
        var wplfForm = _this2.forms[key];

        if (!wplfForm) {
          return acc;
        }

        var formEl = wplfForm.form;
        var formElId = formEl.getAttribute('data-form-id');

        if (formElId && Object(_lib_ensure_num__WEBPACK_IMPORTED_MODULE_2__["default"])(formElId) === Object(_lib_ensure_num__WEBPACK_IMPORTED_MODULE_2__["default"])(id)) {
          acc.push(wplfForm);
        }

        return acc;
      }, []);
    }
  }, {
    key: "attach",
    value: function attach(x) {
      if (x instanceof _wplf_form__WEBPACK_IMPORTED_MODULE_0__["WPLF_Form"]) {
        var _wplfForm = x;
        this.forms[_wplfForm.key] = _wplfForm;
        return _wplfForm;
      }

      var element = x;

      if (element instanceof Element !== true) {
        // log.console.error('Unable to attach WPLF to element');
        throw new Error('Unable to attach WPLF to element');
      }

      var wplfForm = new _wplf_form__WEBPACK_IMPORTED_MODULE_0__["WPLF_Form"](element);
      this.forms[wplfForm.key] = wplfForm;
      wplfForm.form.removeAttribute('tabindex');
      wplfForm.form.removeAttribute('style');
      return wplfForm;
    }
  }, {
    key: "detach",
    value: function detach(wplfForm) {
      this.forms[wplfForm.key].removeSubmitHandler();
      delete this.forms[wplfForm.key];
      return true;
    }
  }]);

  return WPLF;
}();



/***/ }),

/***/ "./assets/scripts/lib/api-client.ts":
/*!******************************************!*\
  !*** ./assets/scripts/lib/api-client.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var abort_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! abort-controller */ "./node_modules/abort-controller/browser.js");
/* harmony import */ var abort_controller__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(abort_controller__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global-data */ "./assets/scripts/lib/global-data.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



/**
 * It's ok to create multiple API clients
 *
 * Usage: const { abort, request, getSignal } = createApiClient()
 */

function createApiClient() {
  var controller = null;
  var signal = null;
  console.log(_global_data__WEBPACK_IMPORTED_MODULE_1__["default"]);
  return {
    // controller: null,
    // signal: null,
    controller,
    signal,

    getSignal() {
      return signal;
    },

    abort() {
      if (controller && controller.abort) {
        controller.abort();
      }
    },

    request(target) {
      var _arguments = arguments;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var options, responseKind, res, headers, status, statusText, url, ok, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};
                responseKind = _arguments.length > 2 ? _arguments[2] : undefined;
                controller = new abort_controller__WEBPACK_IMPORTED_MODULE_0___default.a();
                signal = controller.signal;
                _context.prev = 4;
                _context.next = 7;
                return fetch(_global_data__WEBPACK_IMPORTED_MODULE_1__["default"].backendUrl + target, _objectSpread({
                  method: 'GET',
                  signal,
                  credentials: _global_data__WEBPACK_IMPORTED_MODULE_1__["default"].fetchCredentials || 'same-origin',
                  headers: _global_data__WEBPACK_IMPORTED_MODULE_1__["default"].requestHeaders || {}
                }, options));

              case 7:
                res = _context.sent;
                headers = res.headers, status = res.status, statusText = res.statusText, url = res.url, ok = res.ok;
                _context.next = 11;
                return res.json();

              case 11:
                data = _context.sent;
                controller = null;
                return _context.abrupt("return", {
                  kind: responseKind,
                  headers,
                  status,
                  statusText,
                  url,
                  ok,
                  data
                });

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](4);
                controller = null; // If you want to do something when the request is aborted, use
                // signal.addEventListener('abort', ...)

                if (!(_context.t0.name !== 'AbortError')) {
                  _context.next = 21;
                  break;
                }

                throw _context.t0;

              case 21:
                return _context.abrupt("return", _context.t0);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 16]]);
      }))();
    }

  };
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return createApiClient();
});

/***/ }),

/***/ "./assets/scripts/lib/ensure-num.ts":
/*!******************************************!*\
  !*** ./assets/scripts/lib/ensure-num.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ensureNum; });
function ensureNum(x) {
  var float = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (typeof x === 'number') {
    return x;
  } else {
    return float ? parseFloat(x) : parseInt(x, 10);
  }
}

/***/ }),

/***/ "./assets/scripts/lib/get-attribute.ts":
/*!*********************************************!*\
  !*** ./assets/scripts/lib/get-attribute.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getAttribute; });
function getAttribute(el, attribute) {
  var defaultVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var x = el.getAttribute(attribute);

  if (x === null) {
    return defaultVal;
  }

  return x;
}

/***/ }),

/***/ "./assets/scripts/lib/global-data.ts":
/*!*******************************************!*\
  !*** ./assets/scripts/lib/global-data.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ __webpack_exports__["default"] = ((function (window) {
  return _objectSpread({}, window.wplfData);
})(window));

/***/ }),

/***/ "./assets/scripts/lib/is-elementish.ts":
/*!*********************************************!*\
  !*** ./assets/scripts/lib/is-elementish.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isElementish(e) {
  return e ? 'getAttribute' in e && 'tagName' in e : false;
} // function isElementish(e: object | null | undefined): e is Element {
//   return (e ? e['tagName'] && 'getAttribute' in e : false);
// }


/* harmony default export */ __webpack_exports__["default"] = (isElementish);

/***/ }),

/***/ "./assets/scripts/lib/log.ts":
/*!***********************************!*\
  !*** ./assets/scripts/lib/log.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global-data */ "./assets/scripts/lib/global-data.ts");

var debugLevel = _global_data__WEBPACK_IMPORTED_MODULE_0__["default"].settings.debugLevel;
var console = window.console || {
  log() {},

  error() {}

}; // noop fallback

var notice = function notice(message) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return debugLevel === 'all' && console.log("WPLF: ".concat(message), params);
};

var error = function error(message) {
  for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    params[_key2 - 1] = arguments[_key2];
  }

  return debugLevel !== 'none' && console.error("WPLF error: ".concat(message), params);
};

/* harmony default export */ __webpack_exports__["default"] = ({
  notice,
  error
});

/***/ }),

/***/ "./assets/scripts/lib/wait.ts":
/*!************************************!*\
  !*** ./assets/scripts/lib/wait.ts ***!
  \************************************/
/*! exports provided: waitForNextTick, wait */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitForNextTick", function() { return waitForNextTick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wait", function() { return wait; });
/**
 * Trying to read the DOM immediately after setting it does not work. Trying on next tick
 * does.
 */
var waitForNextTick = function waitForNextTick() {
  return new Promise(function (resolve) {
    return setTimeout(resolve);
  });
};
var wait = function wait() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

/***/ }),

/***/ "./assets/scripts/types.ts":
/*!*********************************!*\
  !*** ./assets/scripts/types.ts ***!
  \*********************************/
/*! exports provided: SubmitState, ApiResponseKind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubmitState", function() { return SubmitState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiResponseKind", function() { return ApiResponseKind; });
var SubmitState;

(function (SubmitState) {
  SubmitState[SubmitState["Unsubmitted"] = 0] = "Unsubmitted";
  SubmitState[SubmitState["Submitting"] = 1] = "Submitting";
  SubmitState[SubmitState["Success"] = 2] = "Success";
  SubmitState[SubmitState["Error"] = 3] = "Error";
})(SubmitState || (SubmitState = {}));

var ApiResponseKind;

(function (ApiResponseKind) {
  ApiResponseKind["Submission"] = "submission";
  ApiResponseKind["Render"] = "render";
  ApiResponseKind["GetSubmissions"] = "getsubmissions";
})(ApiResponseKind || (ApiResponseKind = {}));

/***/ }),

/***/ "./assets/scripts/wplf-admin-bundle.ts":
/*!*********************************************!*\
  !*** ./assets/scripts/wplf-admin-bundle.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_wplf_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/wplf-admin */ "./assets/scripts/classes/wplf-admin.ts");
/* harmony import */ var _classes_wplf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/wplf */ "./assets/scripts/classes/wplf.ts");
/* harmony import */ var _styles_wplf_admin_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/wplf-admin.scss */ "./assets/styles/wplf-admin.scss");
/* harmony import */ var _styles_wplf_admin_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_wplf_admin_scss__WEBPACK_IMPORTED_MODULE_2__);


 // Webpack exposes the instance in window.WPLF, do not load admin and frontend bundles at the same time.

/* harmony default export */ __webpack_exports__["default"] = (new _classes_wplf_admin__WEBPACK_IMPORTED_MODULE_0__["default"](new _classes_wplf__WEBPACK_IMPORTED_MODULE_1__["default"]()));

/***/ }),

/***/ "./assets/styles/wplf-admin.scss":
/*!***************************************!*\
  !*** ./assets/styles/wplf-admin.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/abort-controller/browser.js":
/*!**************************************************!*\
  !*** ./node_modules/abort-controller/browser.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*globals self, window */


/*eslint-disable @mysticatea/prettier */
const { AbortController, AbortSignal } =
    typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window :
    /* otherwise */ undefined
/*eslint-enable @mysticatea/prettier */

module.exports = AbortController
module.exports.AbortSignal = AbortSignal
module.exports.default = AbortController


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ 0:
/*!***********************************************************************!*\
  !*** multi regenerator-runtime ./assets/scripts/wplf-admin-bundle.ts ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! regenerator-runtime */"./node_modules/regenerator-runtime/runtime.js");
module.exports = __webpack_require__(/*! /app/web/wp-content/plugins/wp-libre-form/assets/scripts/wplf-admin-bundle.ts */"./assets/scripts/wplf-admin-bundle.ts");


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9XUExGL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9XUExGL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc2NyaXB0cy9jbGFzc2VzL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2NsYXNzZXMvd3BsZi1hZGRvbnMudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2NsYXNzZXMvd3BsZi1hZG1pbi50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvY2xhc3Nlcy93cGxmLWVkaXRvci50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvY2xhc3Nlcy93cGxmLWZvcm0udHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2NsYXNzZXMvd3BsZi1zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvY2xhc3Nlcy93cGxmLXRhYnMudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2NsYXNzZXMvd3BsZi50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvbGliL2FwaS1jbGllbnQudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2xpYi9lbnN1cmUtbnVtLnRzIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc2NyaXB0cy9saWIvZ2V0LWF0dHJpYnV0ZS50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvbGliL2dsb2JhbC1kYXRhLnRzIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc2NyaXB0cy9saWIvaXMtZWxlbWVudGlzaC50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvbGliL2xvZy50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvbGliL3dhaXQudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL3R5cGVzLnRzIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc2NyaXB0cy93cGxmLWFkbWluLWJ1bmRsZS50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3N0eWxlcy93cGxmLWFkbWluLnNjc3MiLCJ3ZWJwYWNrOi8vV1BMRi8uL25vZGVfbW9kdWxlcy9hYm9ydC1jb250cm9sbGVyL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vV1BMRi8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7SUFHTSxPO0FBR0oscUJBQTJCO0FBQUEsUUFBZixN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Q0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLEtBQTBCLG9CQUFvQixTQUFFO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ3cGxmLWFkbWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiV1BMRlwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJXUExGXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IGxvZyBmcm9tICcuLi9saWIvbG9nJ1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4uL3R5cGVzJ1xuXG5jbGFzcyBTdG9yYWdlIHtcbiAgcHJlZml4OiBzdHJpbmdcblxuICBjb25zdHJ1Y3RvcihwcmVmaXggPSAnd3BsZicpIHtcbiAgICB0aGlzLnByZWZpeCA9IHByZWZpeFxuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IGFueSkge1xuICAgIGNvbnN0IGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnByZWZpeCArIGtleSlcblxuICAgIGlmIChkYXRhICE9PSBudWxsKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGRhdGEgPyBKU09OLnBhcnNlKGRhdGEpIDogZGF0YVxuXG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLm5vdGljZShcbiAgICAgICAgYE5vIHZhbHVlIGZvdW5kIGZvciAke2tleX0sIGZhbGxpbmcgYmFjayB0byBkZWZhdWx0YCxcbiAgICAgICAgZGVmYXVsdFZhbHVlXG4gICAgICApXG5cbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWVcbiAgICB9XG4gIH1cblxuICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5wcmVmaXggKyBrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSlcblxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2cuZXJyb3IoZSwga2V5LCB2YWx1ZSlcblxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBTdG9yYWdlKClcbiIsIi8vIGNvbnN0ICQgPSB3aW5kb3cualF1ZXJ5XG4vLyBjb25zdCBfID0gd2luZG93Ll9cbi8vIGNvbnN0IHdwID0gd2luZG93LndwXG5cbmltcG9ydCBXUExGIGZyb20gJy4vd3BsZidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1BMRl9BZGRvbnMge1xuICBjb25zdHJ1Y3Rvcih3cGxmSW5zdGFuY2U6IFdQTEYpIHt9XG59XG4iLCJpbXBvcnQgV1BMRl9FZGl0b3IgZnJvbSAnLi93cGxmLWVkaXRvcidcbmltcG9ydCBXUExGX1NldHRpbmdzIGZyb20gJy4vd3BsZi1zZXR0aW5ncydcbmltcG9ydCBXUExGX0FkZG9ucyBmcm9tICcuL3dwbGYtYWRkb25zJ1xuaW1wb3J0IFdQTEZfVGFicyBmcm9tICcuL3dwbGYtdGFicydcbmltcG9ydCBXUExGIGZyb20gJy4vd3BsZidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1BMRl9BZG1pbiB7XG4gIGVkaXRvcj86IFdQTEZfRWRpdG9yXG4gIGFkZG9ucz86IFdQTEZfQWRkb25zXG4gIHNldHRpbmdzPzogV1BMRl9TZXR0aW5nc1xuICB0YWJzOiBXUExGX1RhYnNbXVxuXG4gIGNvbnN0cnVjdG9yKHdwbGZJbnN0YW5jZTogV1BMRikge1xuICAgIHRoaXMudGFicyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndwbGYtdGFicycpKS5tYXAoXG4gICAgICAoZWwpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBXUExGX1RhYnMoZWwpXG4gICAgICB9XG4gICAgKVxuXG4gICAgLy8gSW5pdCBzdHVmZiBiYXNlZCBvbiB3aGF0IHBhZ2Ugd2UncmUgb25cbiAgICBjb25zdCBjbGFzc0xpc3QgPSBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdFxuXG4gICAgaWYgKFxuICAgICAgY2xhc3NMaXN0LmNvbnRhaW5zKCdwb3N0LXR5cGUtbGlicmVmb3JtJykgJiZcbiAgICAgIChjbGFzc0xpc3QuY29udGFpbnMoJ3Bvc3QtcGhwJykgfHwgY2xhc3NMaXN0LmNvbnRhaW5zKCdwb3N0LW5ldy1waHAnKSlcbiAgICApIHtcbiAgICAgIHRoaXMuZWRpdG9yID0gbmV3IFdQTEZfRWRpdG9yKHdwbGZJbnN0YW5jZSlcbiAgICB9IGVsc2UgaWYgKGNsYXNzTGlzdC5jb250YWlucygnbGlicmVmb3JtX3BhZ2Vfd3BsZlNldHRpbmdzJykpIHtcbiAgICAgIC8vIEluIHNldHRpbmdzIHBhZ2VcbiAgICAgIHRoaXMuc2V0dGluZ3MgPSBuZXcgV1BMRl9TZXR0aW5ncyh3cGxmSW5zdGFuY2UpXG4gICAgfSBlbHNlIGlmIChjbGFzc0xpc3QuY29udGFpbnMoJ2xpYnJlZm9ybV9wYWdlX3dwbGZBZGRvbnMnKSkge1xuICAgICAgdGhpcy5hZGRvbnMgPSBuZXcgV1BMRl9BZGRvbnMod3BsZkluc3RhbmNlKVxuICAgIH1cbiAgfVxuXG4gIGdldEVkaXRvcigpIHtcbiAgICByZXR1cm4gdGhpcy5lZGl0b3JcbiAgfVxuXG4gIGdldEFkZG9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGRvbnNcbiAgfVxuXG4gIGdldFNldHRpbmdzKCkge1xuICAgIHJldHVybiB0aGlzLnNldHRpbmdzXG4gIH1cblxuICBnZXRUYWJzKCkge1xuICAgIHJldHVybiB0aGlzLnRhYnNcbiAgfVxufVxuIiwiaW1wb3J0IGdsb2JhbERhdGEgZnJvbSAnLi4vbGliL2dsb2JhbC1kYXRhJ1xuaW1wb3J0IGNyZWF0ZUFwaUNsaWVudCBmcm9tICcuLi9saWIvYXBpLWNsaWVudCdcbmltcG9ydCBsb2cgZnJvbSAnLi4vbGliL2xvZydcbmltcG9ydCB7IHdhaXRGb3JOZXh0VGljayB9IGZyb20gJy4uL2xpYi93YWl0J1xuaW1wb3J0IHsgaXNFbGVtZW50IH0gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCBpc0VsZW1lbnRpc2ggZnJvbSAnLi4vbGliL2lzLWVsZW1lbnRpc2gnXG5pbXBvcnQgV1BMRiBmcm9tICcuL3dwbGYnXG5pbXBvcnQgeyBBcGlSZXNwb25zZUtpbmQsIEZpZWxkLCBMaXN0LCBXUExGX0VkaXRvclN0YXRlIH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgZ2V0QXR0cmlidXRlIGZyb20gJy4uL2xpYi9nZXQtYXR0cmlidXRlJ1xuaW1wb3J0IHsgV1BMRl9Gb3JtIH0gZnJvbSAnLi93cGxmLWZvcm0nXG5cbmNvbnN0IHsgYWJvcnQsIHJlcXVlc3QsIHNpZ25hbCB9ID0gY3JlYXRlQXBpQ2xpZW50KClcbmNvbnN0IHsgaTE4biB9ID0gZ2xvYmFsRGF0YVxuXG5jb25zdCAkID0gd2luZG93LmpRdWVyeVxuY29uc3QgXyA9IHdpbmRvdy5fXG5jb25zdCB3cCA9IHdpbmRvdy53cFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXUExGX0VkaXRvciB7XG4gIHdwbGY6IFdQTEZcbiAgc3RhdGU6IFdQTEZfRWRpdG9yU3RhdGVcblxuICBmb3JtSW5zdGFuY2U6IFdQTEZfRm9ybSB8IG51bGwgPSBudWxsXG4gIGlucHV0czogTGlzdDxFbGVtZW50PlxuICBwcmV2aWV3RWw6IEVsZW1lbnQgLy8gVGhpcyBTSE9VTEQgYmUgYSBIVE1MRm9ybUVsZW1lbnQgKGFzIHNob3VsZCB0aGUgZWxlbWVudCBpdHNlbGYpLCBidXQgdGhhdCB3b3VsZCBjYXVzZSBuZXN0ZWQgZm9ybXMgaW5zaWRlIHdwLWFkbWluLCBhbmQgdGhhdCB3b3VsZCBiZSBiYWQuXG4gIHB1Ymxpc2hCdXR0b246IEVsZW1lbnRcbiAgZmllbGRUZW1wbGF0ZTogRWxlbWVudFxuXG4gIC8vIENvZGVtaXJyb3IgaW5zdGFuY2VzOlxuICBjb250ZW50RWRpdG9yXG4gIHN1Y2Nlc3NNZXNzYWdlRWRpdG9yXG5cbiAgY29uc3RydWN0b3Iod3BsZkluc3RhbmNlOiBXUExGKSB7XG4gICAgY29uc3QgZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dwbGZGaWVsZHMnKVxuICAgIGNvbnN0IGFkZGl0aW9uYWxGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3BsZkFkZGl0aW9uYWxGaWVsZHMnKVxuICAgIGNvbnN0IG5ld0ZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cGxmTmV3RmllbGRzJylcbiAgICBjb25zdCBkZWxldGVkRmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dwbGZEZWxldGVkRmllbGRzJylcbiAgICBjb25zdCBoaXN0b3J5RmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dwbGZIaXN0b3J5RmllbGRzJylcbiAgICBjb25zdCBhbGxvd1NhdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3BsZkFsbG93U2F2ZScpXG4gICAgY29uc3QgZWRpdG9yRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BsZi1lZGl0b3IgLndwbGYtY21FZGl0b3InKVxuICAgIGNvbnN0IHRoYW5rWW91RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy53cGxmLWFmdGVyU3VibWlzc2lvbiAud3BsZi1jbUVkaXRvcidcbiAgICApXG4gICAgY29uc3QgcHJldmlld0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwbGYtZWRpdG9yX19wcmV2aWV3JylcbiAgICBjb25zdCBwdWJsaXNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3B1Ymxpc2gnKVxuICAgIGNvbnN0IHNpZGViYXJGaWVsZFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcud3BsZi1mb3JtRmllbGRzID4gLndwbGYtZm9ybUZpZWxkc19fZmllbGQnXG4gICAgKVxuXG4gICAgaWYgKFxuICAgICAgaXNFbGVtZW50aXNoKGZpZWxkcykgJiZcbiAgICAgIGlzRWxlbWVudGlzaChhZGRpdGlvbmFsRmllbGRzKSAmJlxuICAgICAgaXNFbGVtZW50aXNoKG5ld0ZpZWxkcykgJiZcbiAgICAgIGlzRWxlbWVudGlzaChkZWxldGVkRmllbGRzKSAmJlxuICAgICAgaXNFbGVtZW50aXNoKGhpc3RvcnlGaWVsZHMpICYmXG4gICAgICBpc0VsZW1lbnRpc2goYWxsb3dTYXZlKSAmJlxuICAgICAgaXNFbGVtZW50aXNoKGVkaXRvckVsKSAmJlxuICAgICAgaXNFbGVtZW50aXNoKHRoYW5rWW91RWwpICYmXG4gICAgICBpc0VsZW1lbnRpc2gocHJldmlld0VsKSAmJlxuICAgICAgaXNFbGVtZW50aXNoKHB1Ymxpc2hCdXR0b24pICYmXG4gICAgICBpc0VsZW1lbnRpc2goc2lkZWJhckZpZWxkVGVtcGxhdGUpXG4gICAgKSB7XG4gICAgICBjb25zb2xlLmxvZygnYWxsIGZpbmUnLCBmaWVsZHMpXG5cbiAgICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgICAgaGlzdG9yeUZpZWxkczogSlNPTi5wYXJzZShcbiAgICAgICAgICAvLyAoaGlzdG9yeUZpZWxkcyAmJiBoaXN0b3J5RmllbGRzLmdldEF0dHJpYnV0ZSgndmFsdWUnKSkgfHwgbnVsbFxuICAgICAgICAgIGdldEF0dHJpYnV0ZShoaXN0b3J5RmllbGRzLCAndmFsdWUnKSB8fCAne30nXG4gICAgICAgICksIC8vIFwiZG9lcyBub3QgY2hhbmdlXCJcblxuICAgICAgICBmaWVsZHM6IEpTT04ucGFyc2UoZ2V0QXR0cmlidXRlKGZpZWxkcywgJ3ZhbHVlJykgfHwgJ251bGwnKSxcbiAgICAgICAgYWRkaXRpb25hbEZpZWxkczogSlNPTi5wYXJzZShcbiAgICAgICAgICBnZXRBdHRyaWJ1dGUoYWRkaXRpb25hbEZpZWxkcywgJ3ZhbHVlJykgfHwgJ251bGwnXG4gICAgICAgICksXG4gICAgICAgIG5ld0ZpZWxkczogW10sXG4gICAgICAgIGRlbGV0ZWRGaWVsZHM6IFtdLFxuICAgICAgICBhbGxvd1NhdmU6IGZhbHNlLFxuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyhpbml0aWFsU3RhdGUpXG5cbiAgICAgIHRoaXMud3BsZiA9IHdwbGZJbnN0YW5jZVxuICAgICAgdGhpcy5zdGF0ZSA9IGluaXRpYWxTdGF0ZVxuICAgICAgdGhpcy5pbnB1dHMgPSB7XG4gICAgICAgIGZpZWxkcyxcbiAgICAgICAgYWRkaXRpb25hbEZpZWxkcyxcbiAgICAgICAgbmV3RmllbGRzLFxuICAgICAgICBkZWxldGVkRmllbGRzLFxuICAgICAgICBoaXN0b3J5RmllbGRzLFxuICAgICAgICBhbGxvd1NhdmUsXG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmllbGRUZW1wbGF0ZSA9IHNpZGViYXJGaWVsZFRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKSBhcyBFbGVtZW50XG4gICAgICB0aGlzLmZpZWxkVGVtcGxhdGUucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKVxuXG4gICAgICB0aGlzLnByZXZpZXdFbCA9IHByZXZpZXdFbFxuICAgICAgdGhpcy5wdWJsaXNoQnV0dG9uID0gcHVibGlzaEJ1dHRvblxuICAgICAgdGhpcy5jb250ZW50RWRpdG9yID0gd3AuY29kZUVkaXRvci5pbml0aWFsaXplKFxuICAgICAgICAkKGVkaXRvckVsKSxcbiAgICAgICAgZ2xvYmFsRGF0YS5jb2RlTWlycm9yXG4gICAgICApXG4gICAgICB0aGlzLnN1Y2Nlc3NNZXNzYWdlRWRpdG9yID0gd3AuY29kZUVkaXRvci5pbml0aWFsaXplKFxuICAgICAgICAkKHRoYW5rWW91RWwpLFxuICAgICAgICBnbG9iYWxEYXRhLmNvZGVNaXJyb3JcbiAgICAgIClcbiAgICAgIHRoaXMuaGFuZGxlQ29udGVudENoYW5nZSA9IHRoaXMuaGFuZGxlQ29udGVudENoYW5nZS5iaW5kKHRoaXMpXG4gICAgICB0aGlzLmNvbnRlbnRFZGl0b3IuY29kZW1pcnJvci5vbihcbiAgICAgICAgJ2NoYW5nZXMnLFxuICAgICAgICBfLmRlYm91bmNlKHRoaXMuaGFuZGxlQ29udGVudENoYW5nZSwgMTAwMClcbiAgICAgIClcbiAgICAgIHRoaXMuaGFuZGxlQ29udGVudENoYW5nZSh0aGlzLmNvbnRlbnRFZGl0b3IuY29kZW1pcnJvcikgLy8gVHJpZ2dlcnMgcHJldmlldyBidWlsZFxuXG4gICAgICBpZiAoIWdsb2JhbERhdGEuc2V0dGluZ3MuaGFzVW5maWx0ZXJlZEh0bWwpIHtcbiAgICAgICAgdGhpcy50cnlUb1ByZXZlbnRFZGl0KClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1NvbWV0aGluZyBpcyB0ZXJyaWJseSB3cm9uZywgc29tZSBXUExGIGVsZW1lbnRzIGFyZSBtaXNzaW5nJylcbiAgICAgIHRocm93IG5ldyBFcnJvcignV1RGJylcbiAgICAgIC8vIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHNldFN0YXRlKFxuICAgIGZuID0gKGN1cnJlbnRTdGF0ZTogV1BMRl9FZGl0b3JTdGF0ZSk6IFBhcnRpYWw8V1BMRl9FZGl0b3JTdGF0ZT4gPT4gKHt9KVxuICApIHtcbiAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgbmV3U3RhdGUgPSBmbihjdXJyZW50U3RhdGUpXG5cbiAgICBpZiAoIW5ld1N0YXRlKSB7XG4gICAgICAvLyBubyBvcFxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC4uLmN1cnJlbnRTdGF0ZSxcbiAgICAgIC4uLm5ld1N0YXRlLFxuICAgIH1cblxuICAgIHRoaXMuYWZ0ZXJTdGF0ZUNoYW5nZSgpXG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZVxuICB9XG5cbiAgd3JpdGVTdGF0ZSgpIHtcbiAgICBPYmplY3QuZW50cmllcyh0aGlzLmlucHV0cykuZm9yRWFjaCgoW2tleSwgZWxdKSA9PiB7XG4gICAgICBpZiAoa2V5IGluIHRoaXMuc3RhdGUpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMuc3RhdGVba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc3RhdGVba2V5XVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSA/ICcxJyA6ICcwJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlbC52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYWZ0ZXJTdGF0ZUNoYW5nZSgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKVxuXG4gICAgT2JqZWN0LmVudHJpZXMoc3RhdGUpLmZvckVhY2goKFtrLCB2XSkgPT4ge1xuICAgICAgc3dpdGNoIChrKSB7XG4gICAgICAgIGNhc2UgJ2FsbG93U2F2ZSc6IHtcbiAgICAgICAgICB0aGlzLndyaXRlU3RhdGUoKVxuXG4gICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgIHRoaXMucHVibGlzaEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wdWJsaXNoQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm8gZGVmYXVsdCwgeWV0XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIGJ1bmNoIG9mIHRoaW5ncyBhbmQgcmVtb3ZlIHRoZSBzdWJtaXQgYnV0dG9uLFxuICAgKiBiYWNrZW5kIHdpbGwgaGFuZGxlIGl0IGlmIG5lY2Vzc2FyeSBidXQgaXQncyBub3QgcHJldHR5LlxuICAgKiBCYWNrZW5kIHNob3VsZCBhbHNvIHByaW50IGEgbm90aWNlIGFib3ZlIHRoZSBmb3JtLlxuICAgKi9cbiAgdHJ5VG9QcmV2ZW50RWRpdCgpIHtcbiAgICAvLyBNaWdodCBhcyB3ZWxsIHVzZSB0aGUgalF1ZXJ5IHNpbmNlIGl0J3Mgd3AtYWRtaW5cbiAgICAkKCcjdGl0bGUnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpXG4gICAgJCgnI2NvbnRlbnQnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpXG4gICAgJCgnI3B1Ymxpc2gnKS5yZW1vdmUoKVxuICAgICQoJyNzYXZlLXBvc3QnKS5yZW1vdmUoKVxuICB9XG5cbiAgLy8gYGVkaXRvcmAgaXMgYSBDb2RlTWlycm9yIGluc3RhbmNlXG4gIGFzeW5jIGhhbmRsZUNvbnRlbnRDaGFuZ2UoZWRpdG9yOiBhbnkpIHtcbiAgICBsZXQgeyB3cGxmLCBmb3JtSW5zdGFuY2UgfSA9IHRoaXNcbiAgICBjb25zdCBjb250ZW50ID0gZWRpdG9yLmdldFZhbHVlKClcblxuICAgIHRyeSB7XG4gICAgICBpZiAoZm9ybUluc3RhbmNlKSB7XG4gICAgICAgIHdwbGYuZGV0YWNoKGZvcm1JbnN0YW5jZSlcbiAgICAgICAgZm9ybUluc3RhbmNlID0gbnVsbFxuICAgICAgfVxuXG4gICAgICAvLyBEaXNhYmxlIHN1Ym1pdCBidXR0b24gd2hlbiB0aGUgZmllbGRzIGNoYW5nZVxuICAgICAgdGhpcy5zZXRTdGF0ZSgoKSA9PiAoeyBhbGxvd1NhdmU6IGZhbHNlIH0pKVxuXG4gICAgICBhd2FpdCB0aGlzLnVwZGF0ZVByZXZpZXcoY29udGVudClcbiAgICAgIGF3YWl0IHRoaXMudXBkYXRlRm9ybUZpZWxkc0Zyb21QcmV2aWV3KClcbiAgICAgIGF3YWl0IHRoaXMucmVtb3ZlUHJvYmxlbWF0aWNBdHRyaWJ1dGVzRnJvbVByZXZpZXcoKVxuICAgICAgdGhpcy53cml0ZVN0YXRlKClcbiAgICAgIGZvcm1JbnN0YW5jZSA9IHdwbGYuYXR0YWNoKHRoaXMucHJldmlld0VsKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZy5lcnJvcignRmFpbGVkIHRvIGdldCBwcmV2aWV3JywgZSlcbiAgICB9XG4gIH1cblxuICBhc3luYyB1cGRhdGVQcmV2aWV3KGNvbnRlbnQ6IHN0cmluZykge1xuICAgIGNvbnN0IGlkRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicG9zdF9JRFwiXScpIGFzIEVsZW1lbnRcbiAgICBjb25zdCBmb3JtSWQgPSBwYXJzZUludChnZXRBdHRyaWJ1dGUoaWRFbCwgJ3ZhbHVlJykgfHwgJzAnLCAxMClcbiAgICBjb25zdCBib2R5ID0gbmV3IEZvcm1EYXRhKClcbiAgICBib2R5LmFwcGVuZCgnY29udGVudCcsIGNvbnRlbnQpXG4gICAgYm9keS5hcHBlbmQoJ2Zvcm1JZCcsIGZvcm1JZC50b1N0cmluZygpKVxuXG4gICAgZ2xvYmFsRGF0YS5sYW5nICYmIGJvZHkuYXBwZW5kKCdsYW5nJywgZ2xvYmFsRGF0YS5sYW5nKVxuXG4gICAgbGV0IG9iamVjdDogTGlzdDxhbnk+ID0ge31cbiAgICBib2R5LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIG9iamVjdFtrZXldID0gdmFsdWVcbiAgICB9KVxuXG4gICAgY29uc29sZS5sb2coJ3ByZXZpZXcgcmVxIGJvZHknLCBvYmplY3QpXG5cbiAgICBjb25zdCByZXEgPSBhd2FpdCByZXF1ZXN0KFxuICAgICAgJy9yZW5kZXInLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keSxcbiAgICAgIH0sXG4gICAgICBBcGlSZXNwb25zZUtpbmQuUmVuZGVyXG4gICAgKVxuXG4gICAgaWYgKHJlcS5raW5kID09PSBBcGlSZXNwb25zZUtpbmQuUmVuZGVyKSB7XG4gICAgICBpZiAoJ2Vycm9yJyBpbiByZXEuZGF0YSkge1xuICAgICAgICB0aGlzLnByZXZpZXdFbC5pbm5lckhUTUwgPSBKU09OLnN0cmluZ2lmeShyZXEuZGF0YSlcbiAgICAgIH0gZWxzZSBpZiAoJ2h0bWwnIGluIHJlcS5kYXRhKSB7XG4gICAgICAgIGNvbnN0IHRtcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3QgeyBodG1sIH0gPSByZXEuZGF0YVxuXG4gICAgICAgIHRtcEVsLmlubmVySFRNTCA9IGh0bWxcblxuICAgICAgICBhd2FpdCB3YWl0Rm9yTmV4dFRpY2soKVxuXG4gICAgICAgIGlmICh0bXBFbCkge1xuICAgICAgICAgIGNvbnN0IGZvcm0gPSB0bXBFbC5xdWVyeVNlbGVjdG9yKCdmb3JtJylcbiAgICAgICAgICB0aGlzLnByZXZpZXdFbC5pbm5lckhUTUwgPSBmb3JtID8gZm9ybS5pbm5lckhUTUwgOiAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgd2FpdEZvck5leHRUaWNrKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXREdXBsaWNhdGVOYW1lcyhuYW1lczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gXy51bmlxdWUoXG4gICAgICBuYW1lcy5maWx0ZXIoKG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICByZXR1cm4gbmFtZXMuZmlsdGVyKChuOiBzdHJpbmcpID0+IG4gPT09IG5hbWUpLmxlbmd0aCA+IDFcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgY3JlYXRlRmllbGRFbGVtZW50KGZpZWxkOiBGaWVsZCwgZXJyb3JNZXNzYWdlOiBzdHJpbmcgPSAnJykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmZpZWxkVGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpIGFzIEVsZW1lbnRcbiAgICBjb25zdCB7IG5hbWUsIHR5cGUsIHJlcXVpcmVkIH0gPSBmaWVsZFxuICAgIGNvbnN0IG5hbWVFbCA9IGVsZW1lbnQucXVlcnlTZWxlY3Rvcignc3Ryb25nJykgYXMgSFRNTEVsZW1lbnRcbiAgICBjb25zdCB0eXBlRWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLndwbGYtZm9ybUZpZWxkc19fZmllbGRfX3R5cGUgZW0nXG4gICAgKSBhcyBIVE1MRWxlbWVudFxuICAgIGNvbnN0IGFsZXJ0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud3BsZi1mb3JtRmllbGRzX19maWVsZF9fYWxlcnQnKVxuXG4gICAgaWYgKGlzRWxlbWVudGlzaChuYW1lRWwpICYmIGlzRWxlbWVudGlzaCh0eXBlRWwpICYmIGlzRWxlbWVudGlzaChhbGVydCkpIHtcbiAgICAgIG5hbWVFbC5pbm5lclRleHQgPSBuYW1lXG4gICAgICB0eXBlRWwuaW5uZXJUZXh0ID0gcmVxdWlyZWQgPyBgcmVxdWlyZWQgJHt0eXBlfWAgOiB0eXBlXG5cbiAgICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgYWxlcnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIGVycm9yTWVzc2FnZSlcblxuICAgICAgICBjb25zdCBtZXNzYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgICAgICBjb25zdCBtZXNzYWdlID0gYDxzdHJvbmc+JHtpMThuLnByb2JsZW1zfTwvc3Ryb25nPiR7ZXJyb3JNZXNzYWdlfWAucmVwbGFjZShcbiAgICAgICAgICAvKD86XFxyXFxufFxccnxcXG4pL2csXG4gICAgICAgICAgJzxicj4nXG4gICAgICAgIClcbiAgICAgICAgbWVzc2FnZXMuaW5uZXJIVE1MID0gbWVzc2FnZVxuXG4gICAgICAgIGFsZXJ0Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBtZXNzYWdlcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzRWxlbWVudGlzaChhbGVydC5wYXJlbnROb2RlKSAmJiBhbGVydC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGFsZXJ0KVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50XG4gIH1cblxuICBhc3luYyB1cGRhdGVGb3JtRmllbGRzRnJvbVByZXZpZXcoKSB7XG4gICAgY29uc3QgeyBoaXN0b3J5RmllbGRzLCBhZGRpdGlvbmFsRmllbGRzIH0gPSB0aGlzLmdldFN0YXRlKClcbiAgICBjb25zdCBlbCA9IHRoaXMucHJldmlld0VsXG4gICAgY29uc3QgZmllbGRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BsZi1mb3JtRmllbGRzJylcblxuICAgIGlmICghaXNFbGVtZW50aXNoKGZpZWxkQ29udGFpbmVyKSkge1xuICAgICAgY29uc29sZS53YXJuKCdGaWVsZCBjb250YWluZXIgZG9lcyBub3QgZXhpc3QnKVxuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgYWxsb3dTYXZlID0gdHJ1ZVxuXG4gICAgLy8gR2V0IGFsbCBpbnB1dHMgd2l0aCBhIG5hbWUgYXR0cmlidXRlLCB5ZXMsIGV2ZW4gYnV0dG9uLlxuICAgIGNvbnN0IGZpZWxkcyA9IEFycmF5LmZyb20oXG4gICAgICBlbC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYnV0dG9uJylcbiAgICApXG4gICAgICAuZmlsdGVyKChlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKCduYW1lJykpXG4gICAgICAucmVkdWNlPEZpZWxkW10+KChhY2MsIGVsOiBFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChlbCAmJiBpc0VsZW1lbnRpc2goZWwpKSB7XG4gICAgICAgICAgY29uc3QgZmllbGROYW1lID0gZWwuZ2V0QXR0cmlidXRlKCduYW1lJylcblxuICAgICAgICAgIGlmICghZmllbGROYW1lKSB7XG4gICAgICAgICAgICAvLyByZXR1cm4gbnVsbFxuICAgICAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFJlbW92ZSBicmFja2V0cyBmcm9tIHRoZSBuYW1lLCBiZWNhdXNlIHRoZXkgY2F1c2UgdXMgZ3JpZWYuXG4gICAgICAgICAgICogVGhlIGJyYWNrZXRzIGFyZSBub3QgdmlzaWJsZSBpbiB0aGUgYWN0dWFsIGRhdGEsIHdoaWNoIGtpbmRhIGJyZWFrcyBhbGwgY29tcGFyaXNvbnMuXG4gICAgICAgICAgICovXG4gICAgICAgICAgY29uc3QgbmFtZSA9IGZpZWxkTmFtZS5yZXBsYWNlKCdbXScsICcnKVxuICAgICAgICAgIGNvbnN0IHR5cGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSB8fCBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IGVsLmdldEF0dHJpYnV0ZSgncmVxdWlyZWQnKSAhPT0gbnVsbCA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgIGNvbnN0IG11bHRpcGxlID0gZmllbGROYW1lLmVuZHNXaXRoKCdbXScpXG5cbiAgICAgICAgICBhY2MucHVzaCh7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHJlcXVpcmVkLFxuICAgICAgICAgICAgbXVsdGlwbGUsXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIHJldHVybiBhY2NcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY2NcbiAgICAgIH0sIFtdKVxuICAgIC8vIC5maWx0ZXIoKG4pID0+IG4gIT09IG51bGwpXG5cbiAgICBjb25zdCBmaWVsZE5hbWVzID0gZmllbGRzLm1hcCgoZmllbGQpID0+IGZpZWxkLm5hbWUpXG4gICAgY29uc3QgZHVwbGljYXRlTmFtZXMgPSB0aGlzLmdldER1cGxpY2F0ZU5hbWVzKGZpZWxkTmFtZXMpXG5cbiAgICBmaWVsZENvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xuXG4gICAgY29uc3QgZmllbGRFcnJvcnMgPSBbXVxuICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgaWYgKCFmaWVsZCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBuYW1lLCB0eXBlIH0gPSBmaWVsZFxuICAgICAgY29uc3QgaGlzdG9yeUZpZWxkID0gT2JqZWN0LnZhbHVlcyhoaXN0b3J5RmllbGRzKS5maW5kKFxuICAgICAgICAoZmllbGQpID0+IGZpZWxkLm5hbWUgPT09IG5hbWVcbiAgICAgIClcbiAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAnJ1xuXG4gICAgICAvLyBuYW1lcyBsaWtlIGZpZWxkZ3JvdXBbZmllbGRuYW1lXSBhcmUgbm90IHN1cHBvcnRlZCB5ZXRcbiAgICAgIGlmIChuYW1lLm1hdGNoKC9cXHcqXFxbXFx3KlxcXS8pKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IGAke2Vycm9yTWVzc2FnZX0ke2kxOG4uZ3JvdXBlZE5hbWVzTm90U3VwcG9ydGVkWWV0fVxcbmBcbiAgICAgIH1cblxuICAgICAgaWYgKGR1cGxpY2F0ZU5hbWVzICYmIGR1cGxpY2F0ZU5hbWVzLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IGAke2Vycm9yTWVzc2FnZX0ke2kxOG4uZHVwbGljYXRlRmllbGROYW1lfSAke25hbWV9XFxuYFxuICAgICAgfVxuXG4gICAgICBpZiAoYWRkaXRpb25hbEZpZWxkcy5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSBgJHtlcnJvck1lc3NhZ2V9JHtpMThuLmlsbGVnYWxOYW1lLnJlcGxhY2UoXG4gICAgICAgICAgJ3tuYW1lfScsXG4gICAgICAgICAgbmFtZVxuICAgICAgICApfVxcbmBcbiAgICAgIH1cblxuICAgICAgaWYgKGhpc3RvcnlGaWVsZCAmJiBoaXN0b3J5RmllbGQudHlwZSAhPT0gdHlwZSkge1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSBgJHtlcnJvck1lc3NhZ2V9JHtpMThuLmZpZWxkQWxyZWFkeUV4aXN0c0luRGIucmVwbGFjZShcbiAgICAgICAgICAne3R5cGV9JyxcbiAgICAgICAgICBoaXN0b3J5RmllbGQudHlwZVxuICAgICAgICApfVxcbmBcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICBmaWVsZEVycm9ycy5wdXNoKGVycm9yTWVzc2FnZSlcbiAgICAgIH1cblxuICAgICAgZmllbGRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVGaWVsZEVsZW1lbnQoZmllbGQsIGVycm9yTWVzc2FnZSkpXG4gICAgfSlcblxuICAgIGlmICghZmllbGRFcnJvcnMubGVuZ3RoKSB7XG4gICAgICBhbGxvd1NhdmUgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsbG93U2F2ZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgbmV3RmllbGRzID0gZmllbGRzLmZpbHRlcigoZmllbGQpID0+IHtcbiAgICAgIGlmICghZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpZWxkSW5Jbml0aWFsRGF0YSA9IE9iamVjdC52YWx1ZXMoaGlzdG9yeUZpZWxkcykuZmluZChcbiAgICAgICAgKHgpID0+IHgubmFtZSA9PT0gZmllbGQubmFtZVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gZmllbGRJbkluaXRpYWxEYXRhID8gZmFsc2UgOiB0cnVlXG4gICAgfSlcblxuICAgIGNvbnN0IGRlbGV0ZWRGaWVsZHMgPSBPYmplY3QudmFsdWVzKGhpc3RvcnlGaWVsZHMpLmZpbHRlcigoZmllbGQpID0+IHtcbiAgICAgIHJldHVybiAhZmllbGROYW1lcy5pbmNsdWRlcyhmaWVsZC5uYW1lKVxuICAgIH0pXG5cbiAgICBjb25zdCBuZXdTdGF0ZTogUGFydGlhbDxXUExGX0VkaXRvclN0YXRlPiA9IHtcbiAgICAgIGZpZWxkczogZmllbGRzIGFzIEZpZWxkW10sXG4gICAgICBuZXdGaWVsZHM6IG5ld0ZpZWxkcyBhcyBGaWVsZFtdLFxuICAgICAgZGVsZXRlZEZpZWxkcyxcbiAgICAgIGFsbG93U2F2ZSxcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKCgpID0+IG5ld1N0YXRlKVxuXG4gICAgYXdhaXQgd2FpdEZvck5leHRUaWNrKClcbiAgfVxuXG4gIGFzeW5jIHJlbW92ZVByb2JsZW1hdGljQXR0cmlidXRlc0Zyb21QcmV2aWV3KCkge1xuICAgIC8vIE5hbWVzIGFuZCByZXF1aXJlZCBhdHRyaWJ1dGVzIGNhdXNlIHByb2JsZW1zIHdoZW4gc2F2aW5nIHRoZSBmb3JtLCByZW1vdmVcbiAgICBjb25zdCByZXF1aXJlZEVscyA9IEFycmF5LmZyb208RWxlbWVudD4oXG4gICAgICB0aGlzLnByZXZpZXdFbC5xdWVyeVNlbGVjdG9yQWxsKCdbcmVxdWlyZWRdJylcbiAgICApXG4gICAgY29uc3QgbmFtZUVscyA9IEFycmF5LmZyb208RWxlbWVudD4oXG4gICAgICB0aGlzLnByZXZpZXdFbC5xdWVyeVNlbGVjdG9yQWxsKCdbbmFtZV0nKVxuICAgIClcblxuICAgIHJlcXVpcmVkRWxzLmZvckVhY2goKGVsOiBFbGVtZW50KSA9PiBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3JlcXVpcmVkJykpXG4gICAgbmFtZUVscy5mb3JFYWNoKChlbDogRWxlbWVudCkgPT4gZWwucmVtb3ZlQXR0cmlidXRlKCduYW1lJykpXG5cbiAgICBhd2FpdCB3YWl0Rm9yTmV4dFRpY2soKVxuICB9XG59XG4iLCJpbXBvcnQgZ2xvYmFsRGF0YSBmcm9tICcuLi9saWIvZ2xvYmFsLWRhdGEnXG5pbXBvcnQgY3JlYXRlQXBpQ2xpZW50IGZyb20gJy4uL2xpYi9hcGktY2xpZW50J1xuaW1wb3J0IGxvZyBmcm9tICcuLi9saWIvbG9nJ1xuXG5pbXBvcnQgV1BMRl9UYWJzIGZyb20gJy4vd3BsZi10YWJzJ1xuXG5pbXBvcnQge1xuICBTdWJtaXRTdGF0ZSxcbiAgU3VibWl0SGFuZGxlcixcbiAgRm9ybUNhbGxiYWNrLFxuICAvLyBGb3JtU3VjY2Vzc0NhbGxiYWNrLFxuICAvLyBGb3JtRXJyb3JDYWxsYmFjayxcbiAgTGlzdCxcbiAgQXBpUmVzcG9uc2VLaW5kLFxufSBmcm9tICcuLi90eXBlcydcbmltcG9ydCBpc0VsZW1lbnRpc2ggZnJvbSAnLi4vbGliL2lzLWVsZW1lbnRpc2gnXG5pbXBvcnQgd3BsZkZyb250ZW5kIGZyb20gJy4uLy4uLy4uL2Rpc3Qvd3BsZi1mcm9udGVuZCdcblxuY29uc3QgeyByZXF1ZXN0IH0gPSBjcmVhdGVBcGlDbGllbnQoKVxuXG5jb25zdCByZXNldEZvcm0gPSAod3BsZkZvcm06IFdQTEZfRm9ybSwgcGFyYW1zOiBMaXN0PGFueT4pID0+IHtcbiAgY29uc3QgZm9ybSA9IHdwbGZGb3JtLmZvcm0gYXMgSFRNTEZvcm1FbGVtZW50XG5cbiAgLy8gU2luY2UgYWxsIHR5cGUgZ3VhcmFudGVlcyBoYXZlIGJlZW4gdGhyb3duIG91dCBvZiB0aGUgd2luZG93LFxuICAvLyBpdCdzIG5lY2Vzc2FyeSB0byBjaGVjayB0aGF0IHRoZSBlbGVtZW50IGluZGVlZCBoYXMgdGhpcyBtZXRob2QuXG4gIGlmIChmb3JtLnJlc2V0KSB7XG4gICAgZm9ybS5yZXNldCgpXG4gIH1cbn1cblxuY29uc3QgZGVmYXVsdEJlZm9yZVNlbmRDYWxsYmFjayA9ICh3cGxmRm9ybTogV1BMRl9Gb3JtLCBwYXJhbXM6IExpc3Q8YW55PikgPT4ge1xuICBpZiAoaXNFbGVtZW50aXNoKHdwbGZGb3JtLmZvcm0ucGFyZW50Tm9kZSkpIHtcbiAgICBjb25zdCBwYXJlbnROb2RlID0gd3BsZkZvcm0uZm9ybS5wYXJlbnROb2RlXG5cbiAgICAvLyBSZXNldCBlcnJvciBhbmQgc3VjY2VzcyBtZXNzYWdlcywgaWYgdGhlcmUgd2VyZSBhbnlcbiAgICBjb25zdCBtZXNzYWdlcyA9IHBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICcud3BsZi1lcnJvck1lc3NhZ2UsIC53cGxmLXN1Y2Nlc3NNZXNzYWdlJ1xuICAgIClcblxuICAgIG1lc3NhZ2VzLmZvckVhY2goKGVsZW1lbnQ6IEVsZW1lbnQpID0+IHtcbiAgICAgIGlmIChpc0VsZW1lbnRpc2goZWxlbWVudC5wYXJlbnROb2RlKSkge1xuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudClcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IGRlZmF1bHRTdWNjZXNzQ2FsbGJhY2sgPSAod3BsZkZvcm06IFdQTEZfRm9ybSwgcGFyYW1zOiBMaXN0PGFueT4pID0+IHtcbiAgY29uc3QgeyBkYXRhIH0gPSBwYXJhbXNcbiAgY29uc3QgeyBtZXNzYWdlIH0gPSBkYXRhXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgZGl2LmNsYXNzTGlzdC5hZGQoJ3dwbGYtc3VjY2Vzc01lc3NhZ2UnKVxuICBkaXYuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgbWVzc2FnZSlcblxuICB3cGxmRm9ybS5mb3JtLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBkaXYpXG4gIHdwbGZGb3JtLmZvcm0uY2xhc3NMaXN0LmFkZCgnc3VibWl0dGVkJylcbn1cblxuY29uc3QgZGVmYXVsdEVycm9yU2VuZENhbGxiYWNrID0gKHdwbGZGb3JtOiBXUExGX0Zvcm0sIHBhcmFtczogTGlzdDxhbnk+KSA9PiB7XG4gIGNvbnN0IHsgZXJyb3IgfSA9IHBhcmFtc1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIGRpdi5jbGFzc0xpc3QuYWRkKCd3cGxmLWVycm9yTWVzc2FnZScpXG4gIGRpdi5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBlcnJvci5tZXNzYWdlKVxuICB3cGxmRm9ybS5mb3JtLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBkaXYpXG59XG5cbmV4cG9ydCBjbGFzcyBXUExGX0Zvcm0ge1xuICBmb3JtOiBFbGVtZW50XG4gIHN1Ym1pdFN0YXRlOiBTdWJtaXRTdGF0ZSA9IFN1Ym1pdFN0YXRlLlVuc3VibWl0dGVkXG4gIHN1Ym1pdEhhbmRsZXI6IFN1Ym1pdEhhbmRsZXJcbiAgY2FsbGJhY2tzOiB7XG4gICAgYmVmb3JlU2VuZDogTGlzdDxGb3JtQ2FsbGJhY2s+XG4gICAgc3VjY2VzczogTGlzdDxGb3JtQ2FsbGJhY2s+XG4gICAgZXJyb3I6IExpc3Q8Rm9ybUNhbGxiYWNrPlxuICB9ID0ge1xuICAgIGJlZm9yZVNlbmQ6IHtcbiAgICAgIGRlZmF1bHQ6IGRlZmF1bHRCZWZvcmVTZW5kQ2FsbGJhY2ssXG4gICAgfSxcbiAgICBzdWNjZXNzOiB7XG4gICAgICBkZWZhdWx0OiBkZWZhdWx0U3VjY2Vzc0NhbGxiYWNrLFxuICAgICAgY2xlYXJPblN1Y2Nlc3M6IHJlc2V0Rm9ybSxcbiAgICB9LFxuICAgIGVycm9yOiB7XG4gICAgICBkZWZhdWx0OiBkZWZhdWx0RXJyb3JTZW5kQ2FsbGJhY2ssXG4gICAgfSxcbiAgfVxuXG4gIHRhYnM6IFdQTEZfVGFic1tdID0gW11cbiAga2V5ID0gJydcblxuICAvLyBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRm9ybUVsZW1lbnQpIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCAhPT0gdHJ1ZSkge1xuICAgICAgLy8gaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQgIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm9ybSBlbGVtZW50IGludmFsaWQgb3IgbWlzc2luZycpXG4gICAgfVxuICAgIGNvbnN0IGZhbGxiYWNrSW5wdXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiX25vanNcIl0nKVxuXG4gICAgdGhpcy5mb3JtID0gZWxlbWVudFxuICAgIHRoaXMua2V5ID0gJ18nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpXG4gICAgdGhpcy50YWJzID0gQXJyYXkuZnJvbSh0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLndwbGYtdGFicycpKS5tYXAoXG4gICAgICAoZWwpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBXUExGX1RhYnMoZWwpXG4gICAgICB9XG4gICAgKVxuXG4gICAgdGhpcy5zdWJtaXRIYW5kbGVyID0gdGhpcy5jcmVhdGVTdWJtaXRIYW5kbGVyKClcblxuICAgIHRoaXMuYXR0YWNoU3VibWl0SGFuZGxlcigpXG5cbiAgICAvLyBSZW1vdmUgaW5wdXQgdGhhdCB0cmlnZ2VycyB0aGUgZmFsbGJhY2sgc28gd2UgZ2V0IGEgSlNPTiByZXNwb25zZVxuICAgIGlmIChmYWxsYmFja0lucHV0ICYmIGlzRWxlbWVudGlzaChmYWxsYmFja0lucHV0LnBhcmVudE5vZGUpKSB7XG4gICAgICBmYWxsYmFja0lucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZmFsbGJhY2tJbnB1dClcbiAgICB9XG4gIH1cblxuICBhZGRDYWxsYmFjayhuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgY2FsbGJhY2s6IEZvcm1DYWxsYmFjaykge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzXG4gICAgY29uc3QgeyBiZWZvcmVTZW5kLCBzdWNjZXNzLCBlcnJvciB9ID0gY2FsbGJhY2tzXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2JlZm9yZVNlbmQnOiB7XG4gICAgICAgIGJlZm9yZVNlbmRbbmFtZV0gPSBjYWxsYmFja1xuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzdWNjZXNzJzoge1xuICAgICAgICBzdWNjZXNzW25hbWVdID0gY2FsbGJhY2tcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSAnZXJyb3InOiB7XG4gICAgICAgIGVycm9yW25hbWVdID0gY2FsbGJhY2tcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gY2FsbGJhY2sgdHlwZSAke3R5cGV9YClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVtb3ZlQ2FsbGJhY2sobmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLmNhbGxiYWNrc1xuICAgIGNvbnN0IHsgYmVmb3JlU2VuZCwgc3VjY2VzcywgZXJyb3IgfSA9IGNhbGxiYWNrc1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdiZWZvcmVTZW5kJzoge1xuICAgICAgICBkZWxldGUgYmVmb3JlU2VuZFtuYW1lXVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzdWNjZXNzJzoge1xuICAgICAgICBkZWxldGUgc3VjY2Vzc1tuYW1lXVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlICdlcnJvcic6IHtcbiAgICAgICAgZGVsZXRlIGVycm9yW25hbWVdXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGNhbGxiYWNrICR7bmFtZX0gJHt0eXBlfWApXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJ1bkNhbGxiYWNrKHR5cGU6IHN0cmluZywgcGFyYW1zOiBMaXN0PGFueT4gPSB7fSkge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzXG4gICAgY29uc3QgeyBiZWZvcmVTZW5kLCBzdWNjZXNzLCBlcnJvciB9ID0gY2FsbGJhY2tzXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2JlZm9yZVNlbmQnOiB7XG4gICAgICAgIE9iamVjdC52YWx1ZXMoYmVmb3JlU2VuZCkuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICBjYWxsYmFjayh0aGlzLCBwYXJhbXMpXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ3N1Y2Nlc3MnOiB7XG4gICAgICAgIE9iamVjdC52YWx1ZXMoc3VjY2VzcykuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICBjYWxsYmFjayh0aGlzLCBwYXJhbXMpXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2Vycm9yJzoge1xuICAgICAgICBPYmplY3QudmFsdWVzKGVycm9yKS5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKHRoaXMsIHBhcmFtcylcbiAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gY2FsbGJhY2sgJHtuYW1lfSAke3R5cGV9YClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhdHRhY2hTdWJtaXRIYW5kbGVyKCkge1xuICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIsIHsgcGFzc2l2ZTogZmFsc2UgfSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBzdWJtaXQgaGFuZGxlciBmcm9tIHRoZSBmb3JtLCBidXQga2VlcHMgaXQgaW4gbWVtb3J5LlxuICAgKi9cbiAgcmVtb3ZlU3VibWl0SGFuZGxlcigpIHtcbiAgICB0aGlzLmZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRIYW5kbGVyKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGNyZWF0ZVN1Ym1pdEhhbmRsZXIoaGFuZGxlcj86IFN1Ym1pdEhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlcikge1xuICAgICAgcmV0dXJuIGhhbmRsZXJcbiAgICB9XG5cbiAgICByZXR1cm4gYXN5bmMgKGU6IEV2ZW50KSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgaWYgKHRoaXMuc3VibWl0U3RhdGUgPT09IFN1Ym1pdFN0YXRlLlN1Ym1pdHRpbmcpIHtcbiAgICAgICAgbG9nLm5vdGljZSgnUHJldmVudGluZyBkb3VibGUgZG91Ym1pc3Npb24nKVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB4ID0gYXdhaXQgdGhpcy5zZW5kKClcbiAgICAgICAgY29uc3QgeyBkYXRhLCBvayB9ID0geFxuXG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHRoaXMuc3VibWl0U3RhdGUgPSBTdWJtaXRTdGF0ZS5TdWNjZXNzXG4gICAgICAgICAgdGhpcy5ydW5DYWxsYmFjaygnc3VjY2VzcycsIHsgZGF0YSB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub3Qgb2shJywgeClcblxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMuc3VibWl0U3RhdGUgPSBTdWJtaXRTdGF0ZS5FcnJvclxuICAgICAgICB0aGlzLnJ1bkNhbGxiYWNrKCdlcnJvcicsIHsgZXJyb3I6IHRoaXMuc3VibWl0U3RhdGUgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBzZW5kKCkge1xuICAgIGNvbnN0IGZvcm0gPSB0aGlzLmZvcm1cbiAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0gYXMgSFRNTEZvcm1FbGVtZW50KSAvLyBGb3JtRGF0YSBjYW4ndCBiZSBtYWRlIGZyb20gRWxlbWVudFxuXG4gICAgZ2xvYmFsRGF0YS5sYW5nICYmIGRhdGEuYXBwZW5kKCdsYW5nJywgZ2xvYmFsRGF0YS5sYW5nKVxuICAgIHRoaXMuc3VibWl0U3RhdGUgPSBTdWJtaXRTdGF0ZS5TdWJtaXR0aW5nXG5cbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ3N1Ym1pdHRpbmcnKVxuICAgIHRoaXMucnVuQ2FsbGJhY2soJ2JlZm9yZVNlbmQnLCB7IGZvcm1EYXRhOiBkYXRhLCBmb3JtIH0pXG5cbiAgICBjb25zdCByZXEgPSByZXF1ZXN0KFxuICAgICAgJy9zdWJtaXQnLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogZGF0YSxcbiAgICAgIH0sXG4gICAgICBBcGlSZXNwb25zZUtpbmQuU3VibWlzc2lvblxuICAgIClcblxuICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnc3VibWl0dGluZycpXG5cbiAgICByZXR1cm4gcmVxXG4gIH1cbn1cbiIsImltcG9ydCBXUExGIGZyb20gJy4vd3BsZidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1BMRl9TZXR0aW5ncyB7XG4gIGNvbnN0cnVjdG9yKHdwbGZJbnN0YW5jZTogV1BMRikge31cbn1cbiIsImltcG9ydCBTdG9yYWdlIGZyb20gJy4vc3RvcmFnZSdcbmltcG9ydCBsb2cgZnJvbSAnLi4vbGliL2xvZydcbmltcG9ydCBpc1RhcmdldEFuRWxlbWVudCBmcm9tICcuLi9saWIvaXMtZWxlbWVudGlzaCdcbmltcG9ydCBpc0VsZW1lbnRpc2ggZnJvbSAnLi4vbGliL2lzLWVsZW1lbnRpc2gnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdQTEZfVGFicyB7XG4gIC8vIHJlbWVtYmVyID0gZmFsc2VcbiAgLy8gYWN0aXZlVGFiID0gbnVsbFxuICAvLyByb290ID0gbnVsbFxuICAvLyBuYW1lID0gbnVsbFxuXG4gIHJlbWVtYmVyOiBib29sZWFuID0gZmFsc2VcbiAgYWN0aXZlVGFiOiBzdHJpbmdcbiAgcm9vdDogRWxlbWVudFxuICBuYW1lOiBzdHJpbmcgPSAnJ1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICAvLyBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQgIT09IHRydWUpIHtcbiAgICAvLyB0aHJvdyBuZXcgRXJyb3IoJ1RhYiBlbGVtZW50IGludmFsaWQgb3IgbWlzc2luZycpXG4gICAgLy8gfVxuXG4gICAgdGhpcy5yb290ID0gZWxlbWVudFxuICAgIHRoaXMubmFtZSA9IHRoaXMucm9vdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbmFtZScpIHx8ICcnXG4gICAgdGhpcy5yZW1lbWJlciA9IHRoaXMucm9vdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVtZW1iZXInKSAhPT0gbnVsbFxuICAgIHRoaXMuYWN0aXZlVGFiID0gdGhpcy5yb290LmdldEF0dHJpYnV0ZSgnZGF0YS1kZWZhdWx0JykgfHwgJydcblxuICAgIGlmICghdGhpcy5yb290KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RvZXMgdGhpcyB3b3JrIGZvciB0cyAoaXQgZG9lcyBub3QpJylcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMubmFtZSB8fCAhdGhpcy5hY3RpdmVUYWIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZWQgYXR0cmlidXRlcyBhcmUgbWlzc2luZycpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVtZW1iZXIpIHtcbiAgICAgIC8vIEdldCBzYXZlZCB2YWx1ZSBvciBrZWVwIHVzaW5nIHRoZSBkZWZhdWx0XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IFN0b3JhZ2UuZ2V0KHRoaXMubmFtZSwgdGhpcy5hY3RpdmVUYWIpXG4gICAgfVxuXG4gICAgdGhpcy5yZWZyZXNoKClcbiAgfVxuXG4gIGhhbmRsZUNsaWNrID0gKGU6IEV2ZW50KSA9PiB7XG4gICAgY29uc3QgeyB0YXJnZXQgfSA9IGVcblxuICAgIGlmIChpc0VsZW1lbnRpc2godGFyZ2V0KSkge1xuICAgICAgY29uc29sZS5sb2codGFyZ2V0KVxuICAgICAgLy8gfVxuXG4gICAgICAvLyBpZiAodGFyZ2V0KSB7XG4gICAgICAvLyBjb25zdCB4ID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IC8vIEknbSA5OS45JSBzdXJlIHRoZXJlIHdpbGwgYWx3YXlzIGJlIGEgdGFyZ2V0XG4gICAgICBjb25zdCB0YWJOYW1lID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKVxuXG4gICAgICBpZiAodGFiTmFtZSkge1xuICAgICAgICB0aGlzLnN3aXRjaFRhYih0YWJOYW1lKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nLm5vdGljZSgnVW5hYmxlIHRvIHN3aXRjaCB0YWIgYXMgZGF0YS10YXJnZXQgd2FzIGVtcHR5JylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggZXZlbnQgbGlzdGVuZXJzIGFuZCBlbnN1cmUgdGhlIGN1cnJlbnQgdGFiIGlzIHZpc2libGUuXG4gICAqIENhbGwgYWZ0ZXIgYWRkaW5nIGEgdGFiIGR5bmFtaWNhbGx5LlxuICAgKi9cbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLmdldEhhbmRsZXMoKS5mb3JFYWNoKChoYW5kbGUpID0+IHtcbiAgICAgIC8vIEl0J3Mgbm90IHBvc3NpYmxlIHRvIGFkZCB0aGUgc2FtZSBldmVudCBsaXN0ZW5lciB0d2ljZS4gSWYgdGhlIGhhbmRsZSBhbHJlYWR5IGhhcyB0aGUgbGlzdGVuZXIsXG4gICAgICAvLyB0aGlzIGlzIGEgbm8tb3AuXG4gICAgICBoYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrLCB7IHBhc3NpdmU6IGZhbHNlIH0pXG4gICAgfSlcblxuICAgIC8vIElmIGFjdGl2ZVRhYiBpcyBudWxsLCB0aGluZ3Mgd2lsbCBicmVhay4gRmFsbCBiYWNrIHRvIGZpcnN0IHRhYlxuICAgIC8vIGFjdGl2ZVRhYiBjYW50IGJlIG51bGwgYW55bW9yZVxuXG4gICAgLyogICAgIGlmICh0aGlzLmFjdGl2ZVRhYiA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgdGFicyA9IHRoaXMuZ2V0VGFicygpXG5cbiAgICAgIGlmICh0YWJzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBmaXJzdCA9IHRhYnNbMF1cbiAgICAgICAgY29uc3QgLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKVxuXG4gICAgICB9XG5cbiAgICAgIGxvZy5ub3RpY2UoJ2FjdGl2ZVRhYiB3YXMgbnVsbCwgc2V0dGluZyBmaXJzdCB0YWIgYXMgYWN0aXZlJywgZmlyc3QpXG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IGZpcnN0XG4gICAgfSAqL1xuXG4gICAgdGhpcy5zd2l0Y2hUYWIodGhpcy5hY3RpdmVUYWIpXG4gIH1cblxuICAvKipcbiAgICogVmFsdWVzIGFyZSBub3QgY2FjaGVkIGFzIHRoZXkgYXJlIHByYWN0aWNhbGx5IGZyZWUgdG8gcmVjb21wdXRlLCBidXRcbiAgICogbWlnaHQgYmVjb21lIGEgbWVtb3J5IGxlYWsgaWYgc3RvcmVkLlxuICAgKi9cbiAgZ2V0VGFicygpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShcbiAgICAgIHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yQWxsKGAud3BsZi10YWJzX190YWJbZGF0YS1uYW1lPVwiJHt0aGlzLm5hbWV9XCJdYClcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogU2VlIGdldFRhYnMoKVxuICAgKi9cbiAgZ2V0SGFuZGxlcygpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShcbiAgICAgIHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICBgLndwbGYtdGFic19fdGFiU3dpdGNoZXJbZGF0YS1uYW1lPVwiJHt0aGlzLm5hbWV9XCJdYFxuICAgICAgKVxuICAgIClcbiAgfVxuXG4gIHN3aXRjaFRhYihuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0YWJzID0gdGhpcy5nZXRUYWJzKClcbiAgICBjb25zdCBhbGxIYW5kbGVzID0gdGhpcy5nZXRIYW5kbGVzKClcblxuICAgIGNvbnN0IG9wZW4gPSB0YWJzLmZpbHRlcigodGFiKSA9PiB0YWIuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpID09PSBuYW1lKVxuICAgIGNvbnN0IGNsb3NlID0gdGFicy5maWx0ZXIoKHRhYikgPT4gdGFiLmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKSAhPT0gbmFtZSlcblxuICAgIG9wZW4uZm9yRWFjaCgodGFiKSA9PiB7XG4gICAgICBjb25zdCB0YWJOYW1lID0gdGFiLmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKVxuICAgICAgY29uc3QgaGFuZGxlcyA9IGFsbEhhbmRsZXMuZmlsdGVyKFxuICAgICAgICAoaGFuZGxlKSA9PiBoYW5kbGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpID09PSB0YWJOYW1lXG4gICAgICApXG5cbiAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgaGFuZGxlcy5mb3JFYWNoKChoYW5kbGUpID0+IHtcbiAgICAgICAgaGFuZGxlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBjbG9zZS5mb3JFYWNoKCh0YWIpID0+IHtcbiAgICAgIGNvbnN0IHRhYk5hbWUgPSB0YWIuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpXG4gICAgICBjb25zdCBoYW5kbGVzID0gYWxsSGFuZGxlcy5maWx0ZXIoXG4gICAgICAgIChoYW5kbGUpID0+IGhhbmRsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykgPT09IHRhYk5hbWVcbiAgICAgIClcblxuICAgICAgdGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICBoYW5kbGVzLmZvckVhY2goKGhhbmRsZSkgPT4ge1xuICAgICAgICBoYW5kbGUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGlmICh0aGlzLnJlbWVtYmVyKSB7XG4gICAgICBTdG9yYWdlLnNldCh0aGlzLm5hbWUsIG5hbWUpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBXUExGX0Zvcm0gfSBmcm9tICcuL3dwbGYtZm9ybSdcbmltcG9ydCBnbG9iYWxEYXRhIGZyb20gJy4uL2xpYi9nbG9iYWwtZGF0YSdcblxuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IGVuc3VyZU51bSBmcm9tICcuLi9saWIvZW5zdXJlLW51bSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1BMRiB7XG4gIC8vIGZvcm1zID0ge1xuICAvLyAgIC8vICdfZzY3YTh6Mmt3JzogV1BMRl9Gb3JtXG4gIC8vIH1cbiAgZm9ybXM6IExpc3Q8V1BMRl9Gb3JtPiA9IHt9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplKClcbiAgfVxuXG4gIC8vIEV4cG9zZSBXUExGX0Zvcm1cbiAgLy8gRm9ybTogV1BMRl9Gb3JtID0gV1BMRl9Gb3JtXG4gIEZvcm0gPSBXUExGX0Zvcm1cblxuICBpbml0aWFsaXplKCkge1xuICAgIGlmIChnbG9iYWxEYXRhLnNldHRpbmdzLmF1dG9pbml0KSB7XG4gICAgICA7W10uZm9yRWFjaC5jYWxsKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtLndwbGYnKSxcbiAgICAgICAgKGZvcm06IEhUTUxGb3JtRWxlbWVudCkgPT4gdGhpcy5hdHRhY2goZm9ybSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBmaW5kRm9ybXNCeUlkKGlkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5mb3JtcykucmVkdWNlPFdQTEZfRm9ybVtdPigoYWNjLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHdwbGZGb3JtID0gdGhpcy5mb3Jtc1trZXldXG5cbiAgICAgIGlmICghd3BsZkZvcm0pIHtcbiAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmb3JtRWwgPSB3cGxmRm9ybS5mb3JtXG4gICAgICBjb25zdCBmb3JtRWxJZCA9IGZvcm1FbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9ybS1pZCcpXG5cbiAgICAgIGlmIChmb3JtRWxJZCAmJiBlbnN1cmVOdW0oZm9ybUVsSWQpID09PSBlbnN1cmVOdW0oaWQpKSB7XG4gICAgICAgIGFjYy5wdXNoKHdwbGZGb3JtKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSwgW10pXG4gIH1cblxuICBhdHRhY2goeDogRWxlbWVudCB8IFdQTEZfRm9ybSkge1xuICAgIGlmICh4IGluc3RhbmNlb2YgV1BMRl9Gb3JtKSB7XG4gICAgICBjb25zdCB3cGxmRm9ybSA9IHhcblxuICAgICAgdGhpcy5mb3Jtc1t3cGxmRm9ybS5rZXldID0gd3BsZkZvcm1cblxuICAgICAgcmV0dXJuIHdwbGZGb3JtXG4gICAgfVxuXG4gICAgY29uc3QgZWxlbWVudCA9IHhcblxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCAhPT0gdHJ1ZSkge1xuICAgICAgLy8gbG9nLmNvbnNvbGUuZXJyb3IoJ1VuYWJsZSB0byBhdHRhY2ggV1BMRiB0byBlbGVtZW50Jyk7XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGF0dGFjaCBXUExGIHRvIGVsZW1lbnQnKVxuICAgIH1cblxuICAgIGNvbnN0IHdwbGZGb3JtID0gbmV3IFdQTEZfRm9ybShlbGVtZW50KVxuICAgIHRoaXMuZm9ybXNbd3BsZkZvcm0ua2V5XSA9IHdwbGZGb3JtXG5cbiAgICB3cGxmRm9ybS5mb3JtLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKVxuICAgIHdwbGZGb3JtLmZvcm0ucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG5cbiAgICByZXR1cm4gd3BsZkZvcm1cbiAgfVxuXG4gIGRldGFjaCh3cGxmRm9ybTogV1BMRl9Gb3JtKSB7XG4gICAgdGhpcy5mb3Jtc1t3cGxmRm9ybS5rZXldLnJlbW92ZVN1Ym1pdEhhbmRsZXIoKVxuICAgIGRlbGV0ZSB0aGlzLmZvcm1zW3dwbGZGb3JtLmtleV1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cbn1cbiIsImltcG9ydCBBYm9ydENvbnRyb2xsZXIgZnJvbSAnYWJvcnQtY29udHJvbGxlcidcbmltcG9ydCBnbG9iYWxEYXRhIGZyb20gJy4vZ2xvYmFsLWRhdGEnXG5pbXBvcnQgeyBMaXN0LCBBcGlSZXNwb25zZSwgQXBpUmVzcG9uc2VLaW5kIH0gZnJvbSAnLi4vdHlwZXMnXG5cbi8qKlxuICogSXQncyBvayB0byBjcmVhdGUgbXVsdGlwbGUgQVBJIGNsaWVudHNcbiAqXG4gKiBVc2FnZTogY29uc3QgeyBhYm9ydCwgcmVxdWVzdCwgZ2V0U2lnbmFsIH0gPSBjcmVhdGVBcGlDbGllbnQoKVxuICovXG5mdW5jdGlvbiBjcmVhdGVBcGlDbGllbnQoKSB7XG4gIGxldCBjb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIgfCBudWxsID0gbnVsbFxuICBsZXQgc2lnbmFsOiBBYm9ydFNpZ25hbCB8IG51bGwgPSBudWxsXG5cbiAgY29uc29sZS5sb2coZ2xvYmFsRGF0YSlcblxuICByZXR1cm4ge1xuICAgIC8vIGNvbnRyb2xsZXI6IG51bGwsXG4gICAgLy8gc2lnbmFsOiBudWxsLFxuXG4gICAgY29udHJvbGxlcixcbiAgICBzaWduYWwsXG5cbiAgICBnZXRTaWduYWwoKSB7XG4gICAgICByZXR1cm4gc2lnbmFsXG4gICAgfSxcblxuICAgIGFib3J0KCkge1xuICAgICAgaWYgKGNvbnRyb2xsZXIgJiYgY29udHJvbGxlci5hYm9ydCkge1xuICAgICAgICBjb250cm9sbGVyLmFib3J0KClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgcmVxdWVzdChcbiAgICAgIHRhcmdldDogc3RyaW5nLFxuICAgICAgb3B0aW9uczogTGlzdDxzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgRm9ybURhdGEgfCBudWxsPiA9IHt9LFxuICAgICAgcmVzcG9uc2VLaW5kOiBBcGlSZXNwb25zZUtpbmRcbiAgICApOiBQcm9taXNlPEFwaVJlc3BvbnNlPiB7XG4gICAgICBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpXG4gICAgICBzaWduYWwgPSBjb250cm9sbGVyLnNpZ25hbFxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChnbG9iYWxEYXRhLmJhY2tlbmRVcmwgKyB0YXJnZXQsIHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHNpZ25hbCxcbiAgICAgICAgICBjcmVkZW50aWFsczogZ2xvYmFsRGF0YS5mZXRjaENyZWRlbnRpYWxzIHx8ICdzYW1lLW9yaWdpbicsXG4gICAgICAgICAgaGVhZGVyczogZ2xvYmFsRGF0YS5yZXF1ZXN0SGVhZGVycyB8fCB7fSxcbiAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICB9KVxuICAgICAgICBjb25zdCB7IGhlYWRlcnMsIHN0YXR1cywgc3RhdHVzVGV4dCwgdXJsLCBvayB9ID0gcmVzXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXG5cbiAgICAgICAgY29udHJvbGxlciA9IG51bGxcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGtpbmQ6IHJlc3BvbnNlS2luZCxcbiAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0LFxuICAgICAgICAgIHVybCxcbiAgICAgICAgICBvayxcbiAgICAgICAgICBkYXRhLFxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnRyb2xsZXIgPSBudWxsXG5cbiAgICAgICAgLy8gSWYgeW91IHdhbnQgdG8gZG8gc29tZXRoaW5nIHdoZW4gdGhlIHJlcXVlc3QgaXMgYWJvcnRlZCwgdXNlXG4gICAgICAgIC8vIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIC4uLilcbiAgICAgICAgaWYgKGUubmFtZSAhPT0gJ0Fib3J0RXJyb3InKSB7XG4gICAgICAgICAgdGhyb3cgZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVcbiAgICAgIH1cbiAgICB9LFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IGNyZWF0ZUFwaUNsaWVudCgpXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbnN1cmVOdW0oeDogc3RyaW5nIHwgbnVtYmVyLCBmbG9hdDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4geFxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmbG9hdCA/IHBhcnNlRmxvYXQoeCkgOiBwYXJzZUludCh4LCAxMClcbiAgfVxufVxuIiwiaW1wb3J0IGlzRWxlbWVudGlzaCBmcm9tICcuL2lzLWVsZW1lbnRpc2gnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEF0dHJpYnV0ZShcbiAgZWw6IEVsZW1lbnQsXG4gIGF0dHJpYnV0ZTogc3RyaW5nLFxuICBkZWZhdWx0VmFsOiBzdHJpbmcgfCBudWxsID0gbnVsbFxuKSB7XG4gIGNvbnN0IHggPSBlbC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKVxuXG4gIGlmICh4ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRWYWxcbiAgfVxuXG4gIHJldHVybiB4XG59XG4iLCJleHBvcnQgZGVmYXVsdCAoKHdpbmRvdykgPT4gKHtcbiAgLi4ud2luZG93LndwbGZEYXRhIC8vIHdwX2xvY2FsaXplX3NjcmlwdCB3aWxsIGNyZWF0ZSB0aGlzIG9iamVjdFxufSkpKHdpbmRvdylcbiIsImZ1bmN0aW9uIGlzRWxlbWVudGlzaChlOiBvYmplY3QgfCBudWxsIHwgdW5kZWZpbmVkKTogZSBpcyBFbGVtZW50IHtcbiAgcmV0dXJuIGUgPyAnZ2V0QXR0cmlidXRlJyBpbiBlICYmICd0YWdOYW1lJyBpbiBlIDogZmFsc2Vcbn1cblxuLy8gZnVuY3Rpb24gaXNFbGVtZW50aXNoKGU6IG9iamVjdCB8IG51bGwgfCB1bmRlZmluZWQpOiBlIGlzIEVsZW1lbnQge1xuLy8gICByZXR1cm4gKGUgPyBlWyd0YWdOYW1lJ10gJiYgJ2dldEF0dHJpYnV0ZScgaW4gZSA6IGZhbHNlKTtcbi8vIH1cbmV4cG9ydCBkZWZhdWx0IGlzRWxlbWVudGlzaFxuIiwiaW1wb3J0IGdsb2JhbERhdGEgZnJvbSAnLi9nbG9iYWwtZGF0YSdcblxuY29uc3QgeyBkZWJ1Z0xldmVsIH0gPSBnbG9iYWxEYXRhLnNldHRpbmdzXG5cbmNvbnN0IGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZSB8fCB7IGxvZygpIHt9LCBlcnJvcigpIHt9IH0gLy8gbm9vcCBmYWxsYmFja1xuY29uc3Qgbm90aWNlID0gKG1lc3NhZ2U6IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSkgPT5cbiAgZGVidWdMZXZlbCA9PT0gJ2FsbCcgJiYgY29uc29sZS5sb2coYFdQTEY6ICR7bWVzc2FnZX1gLCBwYXJhbXMpXG5jb25zdCBlcnJvciA9IChtZXNzYWdlOiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pID0+XG4gIGRlYnVnTGV2ZWwgIT09ICdub25lJyAmJiBjb25zb2xlLmVycm9yKGBXUExGIGVycm9yOiAke21lc3NhZ2V9YCwgcGFyYW1zKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5vdGljZSxcbiAgZXJyb3IsXG59XG4iLCIvKipcbiAqIFRyeWluZyB0byByZWFkIHRoZSBET00gaW1tZWRpYXRlbHkgYWZ0ZXIgc2V0dGluZyBpdCBkb2VzIG5vdCB3b3JrLiBUcnlpbmcgb24gbmV4dCB0aWNrXG4gKiBkb2VzLlxuICovXG5leHBvcnQgY29uc3Qgd2FpdEZvck5leHRUaWNrID0gKCk6IFByb21pc2U8bnVtYmVyPiA9PlxuICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlKSlcblxuZXhwb3J0IGNvbnN0IHdhaXQgPSAobXMgPSA1MDApOiBQcm9taXNlPG51bWJlcj4gPT5cbiAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKVxuIiwiaW1wb3J0IHsgV1BMRl9Gb3JtIH0gZnJvbSAnLi9jbGFzc2VzL3dwbGYtZm9ybSdcblxuZXhwb3J0IGVudW0gU3VibWl0U3RhdGUge1xuICBVbnN1Ym1pdHRlZCxcbiAgU3VibWl0dGluZyxcbiAgU3VjY2VzcyxcbiAgRXJyb3IsXG59XG5leHBvcnQgdHlwZSBTdWJtaXRIYW5kbGVyID0gKGV2ZW50OiBFdmVudCkgPT4gUHJvbWlzZTx2b2lkPlxuZXhwb3J0IHR5cGUgRm9ybUNhbGxiYWNrID0gKHdwbGZGb3JtOiBXUExGX0Zvcm0sIHBhcmFtczogTGlzdDxhbnk+KSA9PiB2b2lkXG5cbmV4cG9ydCBpbnRlcmZhY2UgV1BMRl9UYWJzIHtcbiAgcmVtZW1iZXI6IGJvb2xlYW5cbiAgYWN0aXZlVGFiOiBudWxsIHwgc3RyaW5nXG4gIHJvb3Q6IEhUTUxFbGVtZW50XG4gIG5hbWU6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExpc3Q8VD4ge1xuICBbazogc3RyaW5nXTogVFxufVxuXG5leHBvcnQgZW51bSBBcGlSZXNwb25zZUtpbmQge1xuICBTdWJtaXNzaW9uID0gJ3N1Ym1pc3Npb24nLFxuICBSZW5kZXIgPSAncmVuZGVyJyxcbiAgR2V0U3VibWlzc2lvbnMgPSAnZ2V0c3VibWlzc2lvbnMnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhd0FwaVJlc3BvbnNlIHtcbiAgaGVhZGVyczogSGVhZGVyc1xuICBzdGF0dXM6IG51bWJlclxuICBzdGF0dXNUZXh0OiBzdHJpbmdcbiAgdXJsOiBzdHJpbmdcbiAgb2s6IGJvb2xlYW5cbiAgZGF0YTogYW55XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VibWl0QXBpUmVzcG9uc2UgZXh0ZW5kcyBSYXdBcGlSZXNwb25zZSB7XG4gIGtpbmQ6IEFwaVJlc3BvbnNlS2luZC5TdWJtaXNzaW9uXG4gIGRhdGE6XG4gICAgfCB7IGVycm9yOiBzdHJpbmc7IGRhdGE6IHN0cmluZyB9XG4gICAgfCB7XG4gICAgICAgIHN1Ym1pc3Npb246IHtcbiAgICAgICAgICBJRDogbnVtYmVyXG4gICAgICAgIH1cbiAgICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZXRTdWJtaXNzaW9uc0FwaVJlc3BvbnNlIGV4dGVuZHMgUmF3QXBpUmVzcG9uc2Uge1xuICBraW5kOiBBcGlSZXNwb25zZUtpbmQuR2V0U3VibWlzc2lvbnNcbiAgZGF0YTpcbiAgICB8IHsgZXJyb3I6IHN0cmluZzsgZGF0YTogc3RyaW5nIH1cbiAgICB8IHtcbiAgICAgICAgc3VibWlzc2lvbjoge1xuICAgICAgICAgIElEOiBudW1iZXJcbiAgICAgICAgfVxuICAgICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlckFwaVJlc3BvbnNlIGV4dGVuZHMgUmF3QXBpUmVzcG9uc2Uge1xuICBraW5kOiBBcGlSZXNwb25zZUtpbmQuUmVuZGVyXG4gIGRhdGE6XG4gICAgfCB7IGVycm9yOiBzdHJpbmc7IGRhdGE6IHN0cmluZyB9XG4gICAgfCB7XG4gICAgICAgIGh0bWw6IHN0cmluZ1xuICAgICAgICBmb3JtOiB7XG4gICAgICAgICAgSUQ6IG51bWJlclxuICAgICAgICAgIHBvc3RDb250YWluc0ZpbGVJbnB1dHM6IHRydWVcbiAgICAgICAgICB0aXRsZTogc3RyaW5nXG4gICAgICAgIH1cbiAgICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgQXBpUmVzcG9uc2UgPVxuICB8IFN1Ym1pdEFwaVJlc3BvbnNlXG4gIHwgR2V0U3VibWlzc2lvbnNBcGlSZXNwb25zZVxuICB8IFJlbmRlckFwaVJlc3BvbnNlXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGQge1xuICBuYW1lOiBzdHJpbmdcbiAgdHlwZTogc3RyaW5nXG4gIHJlcXVpcmVkOiBib29sZWFuXG4gIG11bHRpcGxlOiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV1BMRl9FZGl0b3JTdGF0ZSB7XG4gIGhpc3RvcnlGaWVsZHM6IExpc3Q8RmllbGQ+XG4gIGZpZWxkczogRmllbGRbXVxuICBhZGRpdGlvbmFsRmllbGRzOiBzdHJpbmdbXVxuICBuZXdGaWVsZHM6IEZpZWxkW11cbiAgZGVsZXRlZEZpZWxkczogRmllbGRbXVxuICBhbGxvd1NhdmU6IGJvb2xlYW5cbiAgW2s6IHN0cmluZ106IGFueSAvLyBhbmQgYW55dGhpbmcgZWxzZSB5b3VyIGhlYXJ0IG1heSBkZXNpcmVcbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICAvLyBSZWFjdDogUmVhY3QsIC8vIEB0eXBlcy9yZWFjdCBoYXMgaXQgaGFuZGxlZCBhbHJlYWR5XG4gICAgLy8gV1BMRjogV1BMRiAvLyBXZSdyZSBub3QgZ29pbmcgdG8gdXNlIG91ciBvd24gbGlicmFyeSBmcm9tIHdpbmRvd1xuXG4gICAgLy8gVGhpcyBjb21lcyBmcm9tIFdvcmRQcmVzc1xuICAgIHdwbGZEYXRhOiB7XG4gICAgICBiYWNrZW5kVXJsOiBzdHJpbmdcbiAgICAgIGFzc2V0c0Rpcjogc3RyaW5nXG4gICAgICAvLyBmZXRjaENyZWRlbnRpYWxzOiBzdHJpbmdcbiAgICAgIGZldGNoQ3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicgfCAnaW5jbHVkZScgfCAnb21pdCdcbiAgICAgIGkxOG46IExpc3Q8c3RyaW5nPlxuICAgICAgbGFuZz86IHN0cmluZ1xuICAgICAgcmVxdWVzdEhlYWRlcnM6IHtcbiAgICAgICAgJ1gtV1AtTm9uY2UnOiBzdHJpbmdcbiAgICAgICAgW2s6IHN0cmluZ106IGFueVxuICAgICAgfVxuICAgICAgY29kZU1pcnJvcjogYW55XG4gICAgICBzZXR0aW5nczoge1xuICAgICAgICBhdXRvaW5pdDogYm9vbGVhblxuICAgICAgICBkZWJ1Z0xldmVsOiBzdHJpbmdcbiAgICAgICAgaGFzVW5maWx0ZXJlZEh0bWw6IG51bWJlclxuICAgICAgICBwYXJzZUxpYnJlZm9ybXNTaG9ydGNvZGVJblJlc3RBcGk6IGJvb2xlYW5cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTb21lIFdQIGdsb2JhbHMgdGhhdCB3ZSBkb24ndCBoYXZlIHR5cGVzIGZvclxuICAgIGpRdWVyeTogYW55IC8vIFdQIHVzZXMgMS4xMi40LCB0aGVyZSdzIG5vIEB0eXBlcy9qcXVlcnlAMS4xMi40XG4gICAgLy8gXzogYW55LCAvLyBAdHlwZXMvdW5kZXJzY29yZUAxLjguM1xuICAgIHdwOiBhbnlcbiAgfVxufVxuIiwiaW1wb3J0IFdQTEZfQWRtaW4gZnJvbSAnLi9jbGFzc2VzL3dwbGYtYWRtaW4nXG5pbXBvcnQgV1BMRiBmcm9tICcuL2NsYXNzZXMvd3BsZidcbmltcG9ydCAnLi4vc3R5bGVzL3dwbGYtYWRtaW4uc2NzcydcblxuLy8gV2VicGFjayBleHBvc2VzIHRoZSBpbnN0YW5jZSBpbiB3aW5kb3cuV1BMRiwgZG8gbm90IGxvYWQgYWRtaW4gYW5kIGZyb250ZW5kIGJ1bmRsZXMgYXQgdGhlIHNhbWUgdGltZS5cbmV4cG9ydCBkZWZhdWx0IG5ldyBXUExGX0FkbWluKG5ldyBXUExGKCkpXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvKmdsb2JhbHMgc2VsZiwgd2luZG93ICovXG5cInVzZSBzdHJpY3RcIlxuXG4vKmVzbGludC1kaXNhYmxlIEBteXN0aWNhdGVhL3ByZXR0aWVyICovXG5jb25zdCB7IEFib3J0Q29udHJvbGxlciwgQWJvcnRTaWduYWwgfSA9XG4gICAgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDpcbiAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDpcbiAgICAvKiBvdGhlcndpc2UgKi8gdW5kZWZpbmVkXG4vKmVzbGludC1lbmFibGUgQG15c3RpY2F0ZWEvcHJldHRpZXIgKi9cblxubW9kdWxlLmV4cG9ydHMgPSBBYm9ydENvbnRyb2xsZXJcbm1vZHVsZS5leHBvcnRzLkFib3J0U2lnbmFsID0gQWJvcnRTaWduYWxcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBBYm9ydENvbnRyb2xsZXJcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==