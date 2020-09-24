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
var WPLF_Addons = function WPLF_Addons() {
  _classCallCheck(this, WPLF_Addons);
};



/***/ }),

/***/ "./assets/scripts/classes/wplf-admin.js":
/*!**********************************************!*\
  !*** ./assets/scripts/classes/wplf-admin.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WPLF_Admin; });
/* harmony import */ var _wplf_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wplf-editor */ "./assets/scripts/classes/wplf-editor.js");
/* harmony import */ var _wplf_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wplf-settings */ "./assets/scripts/classes/wplf-settings.ts");
/* harmony import */ var _wplf_addons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wplf-addons */ "./assets/scripts/classes/wplf-addons.ts");
/* harmony import */ var _wplf_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wplf-tabs */ "./assets/scripts/classes/wplf-tabs.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var WPLF_Admin = /*#__PURE__*/function () {
  function WPLF_Admin(wplfInstance) {
    _classCallCheck(this, WPLF_Admin);

    _defineProperty(this, "editor", void 0);

    _defineProperty(this, "addons", void 0);

    _defineProperty(this, "settings", void 0);

    _defineProperty(this, "tabs", void 0);

    this.tabs = Array.from(document.querySelectorAll('.wplf-tabs')).map(function (el) {
      return new _wplf_tabs__WEBPACK_IMPORTED_MODULE_3__["default"](el, el.getAttribute('data-active'), el.getAttribute('data-remember'));
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

/***/ "./assets/scripts/classes/wplf-editor.js":
/*!***********************************************!*\
  !*** ./assets/scripts/classes/wplf-editor.js ***!
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var _createApiClient = Object(_lib_api_client__WEBPACK_IMPORTED_MODULE_1__["default"])(),
    abort = _createApiClient.abort,
    request = _createApiClient.request,
    signal = _createApiClient.signal;

var i18n = _lib_global_data__WEBPACK_IMPORTED_MODULE_0__["default"].i18n;
var $ = window.jQuery;
var _ = window._;
var wp = window.wp;

var extractFieldDataFromElement = function extractFieldDataFromElement(el) {
  /**
   * Brackets in the field name are fun. They are not present in the submitted data,
   * which causes validation errors.
   */
  var name = el.getAttribute('name').replace('[]', '');
  var type = el.getAttribute('type') || el.tagName.toLowerCase();
  var required = el.getAttribute('required') !== null ? true : false;
  var multiple = el.getAttribute('name').endsWith('[]');
  return {
    name,
    type,
    required,
    multiple
  };
};

var WPLF_Editor = /*#__PURE__*/function () {
  function WPLF_Editor(wplfInstance) {
    _classCallCheck(this, WPLF_Editor);

    _defineProperty(this, "wplf", void 0);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "contentEditor", void 0);

    _defineProperty(this, "successMessageEditor", void 0);

    _defineProperty(this, "formInstance", void 0);

    _defineProperty(this, "inputs", {});

    _defineProperty(this, "previewEl", void 0);

    _defineProperty(this, "publishButton", void 0);

    _defineProperty(this, "fieldTemplate", void 0);

    var fields = document.querySelector('#wplfFields');
    var additionalFields = document.querySelector('#wplfAdditionalFields');
    var newFields = document.querySelector('#wplfNewFields');
    var deletedFields = document.querySelector('#wplfDeletedFields');
    var historyFields = document.querySelector('#wplfHistoryFields');
    var allowSave = document.querySelector('#wplfAllowSave');
    var editorEl = document.querySelector('.wplf-editor .wplf-cmEditor');
    var thankYouEl = document.querySelector('.wplf-afterSubmission .wplf-cmEditor');
    var previewEl = document.querySelector('.wplf-editor__preview');
    var initialState = {
      historyFields: JSON.parse(historyFields.value),
      // "does not change"
      fields: JSON.parse(fields.value),
      additionalFields: JSON.parse(additionalFields.value),
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
    this.fieldTemplate = document.querySelector('.wplf-formFields > .wplf-formFields__field').cloneNode(true);
    this.fieldTemplate.removeAttribute('hidden');
    this.previewEl = previewEl;
    this.publishButton = document.querySelector('#publish');
    this.contentEditor = wp.codeEditor.initialize($(editorEl), _lib_global_data__WEBPACK_IMPORTED_MODULE_0__["default"].codeMirror);
    this.successMessageEditor = wp.codeEditor.initialize($(thankYouEl), _lib_global_data__WEBPACK_IMPORTED_MODULE_0__["default"].codeMirror);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.contentEditor.codemirror.on('changes', _.debounce(this.handleContentChange, 1000));
    this.handleContentChange(this.contentEditor.codemirror); // Triggers preview build

    if (!_lib_global_data__WEBPACK_IMPORTED_MODULE_0__["default"].settings.hasUnfilteredHtml) {
      this.tryToPreventEdit();
    }
  }

  _createClass(WPLF_Editor, [{
    key: "setState",
    value: function setState() {
      var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return null;
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

        if (_this.state[key] !== null) {
          var value = _this.state[key];

          if (typeof value === 'boolean') {
            el.value = value ? '1' : '0';
          } else {
            el.value = JSON.stringify(value);
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
                _this2.publishButton.setAttribute('disabled', true);
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
    }
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

                if (this.formInstance) {
                  wplf.detach(formInstance);
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
        var tmpEl, formId, body, object, _yield$request, data, html;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                tmpEl = document.createElement('div');
                formId = parseInt(document.querySelector('input[name="post_ID"]').value, 10);
                body = new FormData();
                body.append('content', content);
                body.append('formId', formId);
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
                });

              case 11:
                _yield$request = _context2.sent;
                data = _yield$request.data;
                html = data.html;
                tmpEl.innerHTML = html;
                _context2.next = 17;
                return Object(_lib_wait__WEBPACK_IMPORTED_MODULE_3__["waitForNextTick"])();

              case 17:
                this.previewEl.innerHTML = tmpEl.querySelector('form').innerHTML;
                _context2.next = 20;
                return Object(_lib_wait__WEBPACK_IMPORTED_MODULE_3__["waitForNextTick"])();

              case 20:
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
    value: function createFieldElement(field, errorMessage) {
      var element = this.fieldTemplate.cloneNode(true);
      var name = field.name,
          type = field.type,
          required = field.required;
      var n = element.querySelector('strong');
      var t = element.querySelector('.wplf-formFields__field__type em');
      var alert = element.querySelector('.wplf-formFields__field__alert');
      n.innerText = name;
      t.innerText = required ? "required ".concat(type) : type;

      if (errorMessage) {
        alert.setAttribute('title', errorMessage);
        var messages = document.createElement('p');
        var message = "<strong>".concat(i18n.problems, "</strong>").concat(errorMessage).replace(/(?:\r\n|\r|\n)/g, '<br>');
        messages.innerHTML = message;
        alert.insertAdjacentElement('afterend', messages);
      } else {
        alert.parentNode.removeChild(alert);
      }

      return element;
    }
  }, {
    key: "updateFormFieldsFromPreview",
    value: function () {
      var _updateFormFieldsFromPreview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this3 = this;

        var _this$getState, historyFields, additionalFields, el, fieldContainer, allowSave, fields, fieldNames, duplicateNames, fieldErrors, newFields, deletedFields;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this$getState = this.getState(), historyFields = _this$getState.historyFields, additionalFields = _this$getState.additionalFields;
                el = this.previewEl;
                fieldContainer = document.querySelector('.wplf-formFields');
                allowSave = true; // Get all inputs with a name attribute, yes, even button.

                fields = Array.from(el.querySelectorAll('input, textarea, select, button')).filter(function (el) {
                  return el.getAttribute('name');
                }).map(extractFieldDataFromElement);
                fieldNames = fields.map(function (field) {
                  return field.name;
                });
                duplicateNames = this.getDuplicateNames(fieldNames);
                fieldContainer.innerHTML = '';
                fieldErrors = [];
                fields.forEach(function (field) {
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
                  var fieldInInitialData = Object.values(historyFields).find(function (x) {
                    return x.name === field.name;
                  });
                  return fieldInInitialData ? false : true;
                });
                deletedFields = Object.values(historyFields).filter(function (field) {
                  return !fieldNames.includes(field.name);
                });
                this.setState(function () {
                  return {
                    fields,
                    newFields,
                    deletedFields,
                    allowSave
                  };
                });
                _context3.next = 16;
                return Object(_lib_wait__WEBPACK_IMPORTED_MODULE_3__["waitForNextTick"])();

              case 16:
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
  wplfForm.form.reset();
};

var resetForm = function resetForm(wplfForm, params) {
  wplfForm.form.reset();
};

var defaultErrorSendCallback = function defaultErrorSendCallback(wplfForm, params) {
  var error = params.error;
  var div = document.createElement('div');
  div.classList.add('wplf-errorMessage');
  div.insertAdjacentHTML('afterbegin', error.message);
  wplfForm.form.insertAdjacentElement('beforebegin', div);
};

var WPLF_Form = /*#__PURE__*/function () {
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
    this.key = ''; // if (element instanceof HTMLFormElement !== true) {

    if (element instanceof HTMLFormElement !== true) {
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
                data = new FormData(form);
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

var WPLF_Settings = function WPLF_Settings() {
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
        console.log(target);
      }

      if (target) {
        var x = target; // I'm 99.9% sure there will always be a target

        var tabName = x.getAttribute('data-target');

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

      if (element instanceof HTMLElement !== true) {
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
// function isElementish(e: object | null | undefined): e is Element {
//   return (e ? e['tagName'] && 'getAttribute' in e : false);
// }
function isElementish(e) {
  return e ? 'getAttribute' in e && 'tagName' in e : false;
}

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
/* harmony import */ var _classes_wplf_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/wplf-admin */ "./assets/scripts/classes/wplf-admin.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9XUExGL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9XUExGL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc2NyaXB0cy9jbGFzc2VzL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2NsYXNzZXMvd3BsZi1hZGRvbnMudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2NsYXNzZXMvd3BsZi1hZG1pbi5qcyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvY2xhc3Nlcy93cGxmLWVkaXRvci5qcyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvY2xhc3Nlcy93cGxmLWZvcm0udHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2NsYXNzZXMvd3BsZi1zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvY2xhc3Nlcy93cGxmLXRhYnMudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2NsYXNzZXMvd3BsZi50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvbGliL2FwaS1jbGllbnQudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2xpYi9lbnN1cmUtbnVtLnRzIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc2NyaXB0cy9saWIvZ2xvYmFsLWRhdGEudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2xpYi9pcy1lbGVtZW50aXNoLnRzIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc2NyaXB0cy9saWIvbG9nLnRzIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc2NyaXB0cy9saWIvd2FpdC50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL3dwbGYtYWRtaW4tYnVuZGxlLnRzIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc3R5bGVzL3dwbGYtYWRtaW4uc2NzcyIsIndlYnBhY2s6Ly9XUExGLy4vbm9kZV9tb2R1bGVzL2Fib3J0LWNvbnRyb2xsZXIvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9XUExGLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyJdLCJuYW1lcyI6WyJXUExGX0FkbWluIiwid3BsZkluc3RhbmNlIiwidGFicyIsIkFycmF5IiwiZnJvbSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIm1hcCIsImVsIiwiV1BMRl9UYWJzIiwiZ2V0QXR0cmlidXRlIiwiY2xhc3NMaXN0IiwiYm9keSIsImNvbnRhaW5zIiwiZWRpdG9yIiwiV1BMRl9FZGl0b3IiLCJzZXR0aW5ncyIsIldQTEZfU2V0dGluZ3MiLCJhZGRvbnMiLCJXUExGX0FkZG9ucyIsImNyZWF0ZUFwaUNsaWVudCIsImFib3J0IiwicmVxdWVzdCIsInNpZ25hbCIsImkxOG4iLCJnbG9iYWxEYXRhIiwiJCIsIndpbmRvdyIsImpRdWVyeSIsIl8iLCJ3cCIsImV4dHJhY3RGaWVsZERhdGFGcm9tRWxlbWVudCIsIm5hbWUiLCJyZXBsYWNlIiwidHlwZSIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsInJlcXVpcmVkIiwibXVsdGlwbGUiLCJlbmRzV2l0aCIsImZpZWxkcyIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRpdGlvbmFsRmllbGRzIiwibmV3RmllbGRzIiwiZGVsZXRlZEZpZWxkcyIsImhpc3RvcnlGaWVsZHMiLCJhbGxvd1NhdmUiLCJlZGl0b3JFbCIsInRoYW5rWW91RWwiLCJwcmV2aWV3RWwiLCJpbml0aWFsU3RhdGUiLCJKU09OIiwicGFyc2UiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJ3cGxmIiwic3RhdGUiLCJpbnB1dHMiLCJmaWVsZFRlbXBsYXRlIiwiY2xvbmVOb2RlIiwicmVtb3ZlQXR0cmlidXRlIiwicHVibGlzaEJ1dHRvbiIsImNvbnRlbnRFZGl0b3IiLCJjb2RlRWRpdG9yIiwiaW5pdGlhbGl6ZSIsImNvZGVNaXJyb3IiLCJzdWNjZXNzTWVzc2FnZUVkaXRvciIsImhhbmRsZUNvbnRlbnRDaGFuZ2UiLCJiaW5kIiwiY29kZW1pcnJvciIsIm9uIiwiZGVib3VuY2UiLCJoYXNVbmZpbHRlcmVkSHRtbCIsInRyeVRvUHJldmVudEVkaXQiLCJmbiIsImN1cnJlbnRTdGF0ZSIsIm5ld1N0YXRlIiwiYWZ0ZXJTdGF0ZUNoYW5nZSIsIk9iamVjdCIsImVudHJpZXMiLCJmb3JFYWNoIiwia2V5Iiwic3RyaW5naWZ5IiwiZ2V0U3RhdGUiLCJrIiwidiIsIndyaXRlU3RhdGUiLCJzZXRBdHRyaWJ1dGUiLCJwcm9wIiwicmVtb3ZlIiwiZm9ybUluc3RhbmNlIiwiY29udGVudCIsImdldFZhbHVlIiwiZGV0YWNoIiwic2V0U3RhdGUiLCJ1cGRhdGVQcmV2aWV3IiwidXBkYXRlRm9ybUZpZWxkc0Zyb21QcmV2aWV3IiwicmVtb3ZlUHJvYmxlbWF0aWNBdHRyaWJ1dGVzRnJvbVByZXZpZXciLCJhdHRhY2giLCJlcnJvciIsInRtcEVsIiwiY3JlYXRlRWxlbWVudCIsImZvcm1JZCIsInBhcnNlSW50IiwiRm9ybURhdGEiLCJhcHBlbmQiLCJsYW5nIiwib2JqZWN0IiwibWV0aG9kIiwiZGF0YSIsImh0bWwiLCJpbm5lckhUTUwiLCJ3YWl0Rm9yTmV4dFRpY2siLCJuYW1lcyIsInVuaXF1ZSIsImZpbHRlciIsIm4iLCJsZW5ndGgiLCJmaWVsZCIsImVycm9yTWVzc2FnZSIsImVsZW1lbnQiLCJ0IiwiYWxlcnQiLCJpbm5lclRleHQiLCJtZXNzYWdlcyIsIm1lc3NhZ2UiLCJwcm9ibGVtcyIsImluc2VydEFkamFjZW50RWxlbWVudCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImZpZWxkQ29udGFpbmVyIiwiZmllbGROYW1lcyIsImR1cGxpY2F0ZU5hbWVzIiwiZ2V0RHVwbGljYXRlTmFtZXMiLCJmaWVsZEVycm9ycyIsImhpc3RvcnlGaWVsZCIsInZhbHVlcyIsImZpbmQiLCJtYXRjaCIsImdyb3VwZWROYW1lc05vdFN1cHBvcnRlZFlldCIsImluY2x1ZGVzIiwiZHVwbGljYXRlRmllbGROYW1lIiwiaWxsZWdhbE5hbWUiLCJmaWVsZEFscmVhZHlFeGlzdHNJbkRiIiwicHVzaCIsImFwcGVuZENoaWxkIiwiY3JlYXRlRmllbGRFbGVtZW50IiwiZmllbGRJbkluaXRpYWxEYXRhIiwieCIsInJlcXVpcmVkRWxzIiwibmFtZUVscyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7SUFHTSxPO0FBR0oscUJBQTJCO0FBQUEsUUFBZixNQUFlLHVFQUFOLE1BQU07O0FBQUE7O0FBQ3pCLFNBQUss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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLEtBQTBCLG9CQUFvQixTQUFFO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ3cGxmLWFkbWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiV1BMRlwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJXUExGXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IGxvZyBmcm9tICcuLi9saWIvbG9nJ1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4uL3R5cGVzJ1xuXG5jbGFzcyBTdG9yYWdlIHtcbiAgcHJlZml4OiBzdHJpbmdcblxuICBjb25zdHJ1Y3RvcihwcmVmaXggPSAnd3BsZicpIHtcbiAgICB0aGlzLnByZWZpeCA9IHByZWZpeFxuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IGFueSkge1xuICAgIGNvbnN0IGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnByZWZpeCArIGtleSlcblxuICAgIGlmIChkYXRhICE9PSBudWxsKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGRhdGEgPyBKU09OLnBhcnNlKGRhdGEpIDogZGF0YVxuXG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLm5vdGljZShcbiAgICAgICAgYE5vIHZhbHVlIGZvdW5kIGZvciAke2tleX0sIGZhbGxpbmcgYmFjayB0byBkZWZhdWx0YCxcbiAgICAgICAgZGVmYXVsdFZhbHVlXG4gICAgICApXG5cbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWVcbiAgICB9XG4gIH1cblxuICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5wcmVmaXggKyBrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSlcblxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2cuZXJyb3IoZSwga2V5LCB2YWx1ZSlcblxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBTdG9yYWdlKClcbiIsIi8vIGNvbnN0ICQgPSB3aW5kb3cualF1ZXJ5XG4vLyBjb25zdCBfID0gd2luZG93Ll9cbi8vIGNvbnN0IHdwID0gd2luZG93LndwXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdQTEZfQWRkb25zIHtcbiAgY29uc3RydWN0b3IoKSB7fVxufVxuIiwiaW1wb3J0IFdQTEZfRWRpdG9yIGZyb20gJy4vd3BsZi1lZGl0b3InXG5pbXBvcnQgV1BMRl9TZXR0aW5ncyBmcm9tICcuL3dwbGYtc2V0dGluZ3MnXG5pbXBvcnQgV1BMRl9BZGRvbnMgZnJvbSAnLi93cGxmLWFkZG9ucydcbmltcG9ydCBXUExGX1RhYnMgZnJvbSAnLi93cGxmLXRhYnMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdQTEZfQWRtaW4ge1xuICBlZGl0b3JcbiAgYWRkb25zXG4gIHNldHRpbmdzXG4gIHRhYnNcblxuICBjb25zdHJ1Y3Rvcih3cGxmSW5zdGFuY2UpIHtcbiAgICB0aGlzLnRhYnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGxmLXRhYnMnKSkubWFwKGVsID0+IHtcbiAgICAgIHJldHVybiBuZXcgV1BMRl9UYWJzKGVsLCBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlJyksIGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1yZW1lbWJlcicpKVxuICAgIH0pXG5cbiAgICAvLyBJbml0IHN0dWZmIGJhc2VkIG9uIHdoYXQgcGFnZSB3ZSdyZSBvblxuICAgIGNvbnN0IGNsYXNzTGlzdCA9IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0XG5cbiAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKCdwb3N0LXR5cGUtbGlicmVmb3JtJykgJiYgKGNsYXNzTGlzdC5jb250YWlucygncG9zdC1waHAnKSB8fCBjbGFzc0xpc3QuY29udGFpbnMoJ3Bvc3QtbmV3LXBocCcpKSkge1xuICAgICAgdGhpcy5lZGl0b3IgPSBuZXcgV1BMRl9FZGl0b3Iod3BsZkluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGNsYXNzTGlzdC5jb250YWlucygnbGlicmVmb3JtX3BhZ2Vfd3BsZlNldHRpbmdzJykpIHtcbiAgICAgIC8vIEluIHNldHRpbmdzIHBhZ2VcbiAgICAgIHRoaXMuc2V0dGluZ3MgPSBuZXcgV1BMRl9TZXR0aW5ncyh3cGxmSW5zdGFuY2UpXG4gICAgfSBlbHNlIGlmIChjbGFzc0xpc3QuY29udGFpbnMoJ2xpYnJlZm9ybV9wYWdlX3dwbGZBZGRvbnMnKSkge1xuICAgICAgdGhpcy5hZGRvbnMgPSBuZXcgV1BMRl9BZGRvbnMod3BsZkluc3RhbmNlKVxuICAgIH1cbiAgfVxuXG4gIGdldEVkaXRvcigpIHtcbiAgICByZXR1cm4gdGhpcy5lZGl0b3JcbiAgfVxuXG4gIGdldEFkZG9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGRvbnNcbiAgfVxuXG4gIGdldFNldHRpbmdzKCkge1xuICAgIHJldHVybiB0aGlzLnNldHRpbmdzXG4gIH1cblxuICBnZXRUYWJzKCkge1xuICAgIHJldHVybiB0aGlzLnRhYnNcbiAgfVxufSIsImltcG9ydCBnbG9iYWxEYXRhIGZyb20gJy4uL2xpYi9nbG9iYWwtZGF0YSdcbmltcG9ydCBjcmVhdGVBcGlDbGllbnQgZnJvbSAnLi4vbGliL2FwaS1jbGllbnQnXG5pbXBvcnQgbG9nIGZyb20gJy4uL2xpYi9sb2cnXG5pbXBvcnQgeyB3YWl0Rm9yTmV4dFRpY2sgfSBmcm9tICcuLi9saWIvd2FpdCdcblxuY29uc3QgeyBhYm9ydCwgcmVxdWVzdCwgc2lnbmFsIH0gPSBjcmVhdGVBcGlDbGllbnQoKVxuY29uc3QgeyBpMThuIH0gPSBnbG9iYWxEYXRhXG5cbmNvbnN0ICQgPSB3aW5kb3cualF1ZXJ5XG5jb25zdCBfID0gd2luZG93Ll9cbmNvbnN0IHdwID0gd2luZG93LndwXG5cbmNvbnN0IGV4dHJhY3RGaWVsZERhdGFGcm9tRWxlbWVudCA9IChlbCkgPT4ge1xuICAvKipcbiAgICogQnJhY2tldHMgaW4gdGhlIGZpZWxkIG5hbWUgYXJlIGZ1bi4gVGhleSBhcmUgbm90IHByZXNlbnQgaW4gdGhlIHN1Ym1pdHRlZCBkYXRhLFxuICAgKiB3aGljaCBjYXVzZXMgdmFsaWRhdGlvbiBlcnJvcnMuXG4gICAqL1xuICBjb25zdCBuYW1lID0gZWwuZ2V0QXR0cmlidXRlKCduYW1lJykucmVwbGFjZSgnW10nLCAnJylcbiAgY29uc3QgdHlwZSA9IGVsLmdldEF0dHJpYnV0ZSgndHlwZScpIHx8IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICBjb25zdCByZXF1aXJlZCA9IGVsLmdldEF0dHJpYnV0ZSgncmVxdWlyZWQnKSAhPT0gbnVsbCA/IHRydWUgOiBmYWxzZVxuICBjb25zdCBtdWx0aXBsZSA9IGVsLmdldEF0dHJpYnV0ZSgnbmFtZScpLmVuZHNXaXRoKCdbXScpXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIHR5cGUsXG4gICAgcmVxdWlyZWQsXG4gICAgbXVsdGlwbGUsXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1BMRl9FZGl0b3Ige1xuICB3cGxmXG4gIHN0YXRlXG4gIGNvbnRlbnRFZGl0b3JcbiAgc3VjY2Vzc01lc3NhZ2VFZGl0b3JcbiAgZm9ybUluc3RhbmNlXG4gIGlucHV0cyA9IHt9XG4gIHByZXZpZXdFbFxuICBwdWJsaXNoQnV0dG9uXG4gIGZpZWxkVGVtcGxhdGVcblxuICBjb25zdHJ1Y3Rvcih3cGxmSW5zdGFuY2UpIHtcbiAgICBjb25zdCBmaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3BsZkZpZWxkcycpXG4gICAgY29uc3QgYWRkaXRpb25hbEZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cGxmQWRkaXRpb25hbEZpZWxkcycpXG4gICAgY29uc3QgbmV3RmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dwbGZOZXdGaWVsZHMnKVxuICAgIGNvbnN0IGRlbGV0ZWRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3BsZkRlbGV0ZWRGaWVsZHMnKVxuICAgIGNvbnN0IGhpc3RvcnlGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3BsZkhpc3RvcnlGaWVsZHMnKVxuICAgIGNvbnN0IGFsbG93U2F2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cGxmQWxsb3dTYXZlJylcbiAgICBjb25zdCBlZGl0b3JFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGxmLWVkaXRvciAud3BsZi1jbUVkaXRvcicpXG4gICAgY29uc3QgdGhhbmtZb3VFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGxmLWFmdGVyU3VibWlzc2lvbiAud3BsZi1jbUVkaXRvcicpXG4gICAgY29uc3QgcHJldmlld0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwbGYtZWRpdG9yX19wcmV2aWV3JylcblxuICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgIGhpc3RvcnlGaWVsZHM6IEpTT04ucGFyc2UoaGlzdG9yeUZpZWxkcy52YWx1ZSksIC8vIFwiZG9lcyBub3QgY2hhbmdlXCJcblxuICAgICAgZmllbGRzOiBKU09OLnBhcnNlKGZpZWxkcy52YWx1ZSksXG4gICAgICBhZGRpdGlvbmFsRmllbGRzOiBKU09OLnBhcnNlKGFkZGl0aW9uYWxGaWVsZHMudmFsdWUpLFxuICAgICAgbmV3RmllbGRzOiBbXSxcbiAgICAgIGRlbGV0ZWRGaWVsZHM6IFtdLFxuICAgICAgYWxsb3dTYXZlOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhpbml0aWFsU3RhdGUpXG5cbiAgICB0aGlzLndwbGYgPSB3cGxmSW5zdGFuY2VcbiAgICB0aGlzLnN0YXRlID0gaW5pdGlhbFN0YXRlXG4gICAgdGhpcy5pbnB1dHMgPSB7XG4gICAgICBmaWVsZHMsXG4gICAgICBhZGRpdGlvbmFsRmllbGRzLFxuICAgICAgbmV3RmllbGRzLFxuICAgICAgZGVsZXRlZEZpZWxkcyxcbiAgICAgIGhpc3RvcnlGaWVsZHMsXG4gICAgICBhbGxvd1NhdmUsXG4gICAgfVxuICAgIHRoaXMuZmllbGRUZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGxmLWZvcm1GaWVsZHMgPiAud3BsZi1mb3JtRmllbGRzX19maWVsZCcpLmNsb25lTm9kZSh0cnVlKVxuICAgIHRoaXMuZmllbGRUZW1wbGF0ZS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpXG5cbiAgICB0aGlzLnByZXZpZXdFbCA9IHByZXZpZXdFbFxuICAgIHRoaXMucHVibGlzaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwdWJsaXNoJylcbiAgICB0aGlzLmNvbnRlbnRFZGl0b3IgPSB3cC5jb2RlRWRpdG9yLmluaXRpYWxpemUoJChlZGl0b3JFbCksIGdsb2JhbERhdGEuY29kZU1pcnJvcilcbiAgICB0aGlzLnN1Y2Nlc3NNZXNzYWdlRWRpdG9yID0gd3AuY29kZUVkaXRvci5pbml0aWFsaXplKCQodGhhbmtZb3VFbCksIGdsb2JhbERhdGEuY29kZU1pcnJvcilcbiAgICB0aGlzLmhhbmRsZUNvbnRlbnRDaGFuZ2UgPSB0aGlzLmhhbmRsZUNvbnRlbnRDaGFuZ2UuYmluZCh0aGlzKVxuICAgIHRoaXMuY29udGVudEVkaXRvci5jb2RlbWlycm9yLm9uKCdjaGFuZ2VzJywgXy5kZWJvdW5jZSh0aGlzLmhhbmRsZUNvbnRlbnRDaGFuZ2UsIDEwMDApKVxuICAgIHRoaXMuaGFuZGxlQ29udGVudENoYW5nZSh0aGlzLmNvbnRlbnRFZGl0b3IuY29kZW1pcnJvcikgLy8gVHJpZ2dlcnMgcHJldmlldyBidWlsZFxuXG4gICAgaWYgKCFnbG9iYWxEYXRhLnNldHRpbmdzLmhhc1VuZmlsdGVyZWRIdG1sKSB7XG4gICAgICB0aGlzLnRyeVRvUHJldmVudEVkaXQoKVxuICAgIH1cbiAgfVxuXG4gIHNldFN0YXRlKGZuID0gKCkgPT4gbnVsbCkge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCBuZXdTdGF0ZSA9IGZuKGN1cnJlbnRTdGF0ZSlcblxuICAgIGlmICghbmV3U3RhdGUpIHtcbiAgICAgIC8vIG5vIG9wXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4uY3VycmVudFN0YXRlLFxuICAgICAgLi4ubmV3U3RhdGUsXG4gICAgfVxuXG4gICAgdGhpcy5hZnRlclN0YXRlQ2hhbmdlKClcbiAgfVxuXG4gIGdldFN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlXG4gIH1cblxuICB3cml0ZVN0YXRlKCkge1xuICAgIE9iamVjdC5lbnRyaWVzKHRoaXMuaW5wdXRzKS5mb3JFYWNoKChba2V5LCBlbF0pID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXRlW2tleV0gIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnN0YXRlW2tleV1cblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICBlbC52YWx1ZSA9IHZhbHVlID8gJzEnIDogJzAnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwudmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBhZnRlclN0YXRlQ2hhbmdlKCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpXG5cbiAgICBPYmplY3QuZW50cmllcyhzdGF0ZSkuZm9yRWFjaCgoW2ssIHZdKSA9PiB7XG4gICAgICBzd2l0Y2ggKGspIHtcbiAgICAgICAgY2FzZSAnYWxsb3dTYXZlJzoge1xuICAgICAgICAgIHRoaXMud3JpdGVTdGF0ZSgpXG5cbiAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgdGhpcy5wdWJsaXNoQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnB1Ymxpc2hCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm8gZGVmYXVsdCwgeWV0XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIGJ1bmNoIG9mIHRoaW5ncyBhbmQgcmVtb3ZlIHRoZSBzdWJtaXQgYnV0dG9uLFxuICAgKiBiYWNrZW5kIHdpbGwgaGFuZGxlIGl0IGlmIG5lY2Vzc2FyeSBidXQgaXQncyBub3QgcHJldHR5LlxuICAgKiBCYWNrZW5kIHNob3VsZCBhbHNvIHByaW50IGEgbm90aWNlIGFib3ZlIHRoZSBmb3JtLlxuICAgKi9cbiAgdHJ5VG9QcmV2ZW50RWRpdCgpIHtcbiAgICAvLyBNaWdodCBhcyB3ZWxsIHVzZSB0aGUgalF1ZXJ5IHNpbmNlIGl0J3Mgd3AtYWRtaW5cbiAgICAkKCcjdGl0bGUnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpXG4gICAgJCgnI2NvbnRlbnQnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpXG4gICAgJCgnI3B1Ymxpc2gnKS5yZW1vdmUoKVxuICAgICQoJyNzYXZlLXBvc3QnKS5yZW1vdmUoKVxuICB9XG5cbiAgYXN5bmMgaGFuZGxlQ29udGVudENoYW5nZShlZGl0b3IpIHtcbiAgICBsZXQgeyB3cGxmLCBmb3JtSW5zdGFuY2UgfSA9IHRoaXNcbiAgICBjb25zdCBjb250ZW50ID0gZWRpdG9yLmdldFZhbHVlKClcblxuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5mb3JtSW5zdGFuY2UpIHtcbiAgICAgICAgd3BsZi5kZXRhY2goZm9ybUluc3RhbmNlKVxuICAgICAgfVxuXG4gICAgICAvLyBEaXNhYmxlIHN1Ym1pdCBidXR0b24gd2hlbiB0aGUgZmllbGRzIGNoYW5nZVxuICAgICAgdGhpcy5zZXRTdGF0ZSgoKSA9PiAoeyBhbGxvd1NhdmU6IGZhbHNlIH0pKVxuXG4gICAgICBhd2FpdCB0aGlzLnVwZGF0ZVByZXZpZXcoY29udGVudClcbiAgICAgIGF3YWl0IHRoaXMudXBkYXRlRm9ybUZpZWxkc0Zyb21QcmV2aWV3KClcbiAgICAgIGF3YWl0IHRoaXMucmVtb3ZlUHJvYmxlbWF0aWNBdHRyaWJ1dGVzRnJvbVByZXZpZXcoKVxuICAgICAgdGhpcy53cml0ZVN0YXRlKClcbiAgICAgIGZvcm1JbnN0YW5jZSA9IHdwbGYuYXR0YWNoKHRoaXMucHJldmlld0VsKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZy5lcnJvcignRmFpbGVkIHRvIGdldCBwcmV2aWV3JywgZSlcbiAgICB9XG4gIH1cblxuICBhc3luYyB1cGRhdGVQcmV2aWV3KGNvbnRlbnQpIHtcbiAgICBjb25zdCB0bXBFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29uc3QgZm9ybUlkID0gcGFyc2VJbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInBvc3RfSURcIl0nKS52YWx1ZSwgMTApXG4gICAgY29uc3QgYm9keSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgYm9keS5hcHBlbmQoJ2NvbnRlbnQnLCBjb250ZW50KVxuICAgIGJvZHkuYXBwZW5kKCdmb3JtSWQnLCBmb3JtSWQpXG5cbiAgICBnbG9iYWxEYXRhLmxhbmcgJiYgYm9keS5hcHBlbmQoJ2xhbmcnLCBnbG9iYWxEYXRhLmxhbmcpXG5cbiAgICBsZXQgb2JqZWN0ID0ge31cbiAgICBib2R5LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIG9iamVjdFtrZXldID0gdmFsdWVcbiAgICB9KVxuXG4gICAgY29uc29sZS5sb2coJ3ByZXZpZXcgcmVxIGJvZHknLCBvYmplY3QpXG5cbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHJlcXVlc3QoJy9yZW5kZXInLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHksXG4gICAgfSlcbiAgICBjb25zdCB7IGh0bWwgfSA9IGRhdGFcblxuICAgIHRtcEVsLmlubmVySFRNTCA9IGh0bWxcblxuICAgIGF3YWl0IHdhaXRGb3JOZXh0VGljaygpXG5cbiAgICB0aGlzLnByZXZpZXdFbC5pbm5lckhUTUwgPSB0bXBFbC5xdWVyeVNlbGVjdG9yKCdmb3JtJykuaW5uZXJIVE1MXG5cbiAgICBhd2FpdCB3YWl0Rm9yTmV4dFRpY2soKVxuICB9XG5cbiAgZ2V0RHVwbGljYXRlTmFtZXMobmFtZXMpIHtcbiAgICByZXR1cm4gXy51bmlxdWUoXG4gICAgICBuYW1lcy5maWx0ZXIoKG5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIG5hbWVzLmZpbHRlcigobikgPT4gbiA9PT0gbmFtZSkubGVuZ3RoID4gMVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBjcmVhdGVGaWVsZEVsZW1lbnQoZmllbGQsIGVycm9yTWVzc2FnZSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmZpZWxkVGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpXG4gICAgY29uc3QgeyBuYW1lLCB0eXBlLCByZXF1aXJlZCB9ID0gZmllbGRcbiAgICBjb25zdCBuID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzdHJvbmcnKVxuICAgIGNvbnN0IHQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGxmLWZvcm1GaWVsZHNfX2ZpZWxkX190eXBlIGVtJylcbiAgICBjb25zdCBhbGVydCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLndwbGYtZm9ybUZpZWxkc19fZmllbGRfX2FsZXJ0JylcblxuICAgIG4uaW5uZXJUZXh0ID0gbmFtZVxuICAgIHQuaW5uZXJUZXh0ID0gcmVxdWlyZWQgPyBgcmVxdWlyZWQgJHt0eXBlfWAgOiB0eXBlXG5cbiAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICBhbGVydC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgZXJyb3JNZXNzYWdlKVxuXG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgICAgY29uc3QgbWVzc2FnZSA9IGA8c3Ryb25nPiR7aTE4bi5wcm9ibGVtc308L3N0cm9uZz4ke2Vycm9yTWVzc2FnZX1gLnJlcGxhY2UoLyg/OlxcclxcbnxcXHJ8XFxuKS9nLCAnPGJyPicpXG4gICAgICBtZXNzYWdlcy5pbm5lckhUTUwgPSBtZXNzYWdlXG5cbiAgICAgIGFsZXJ0Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBtZXNzYWdlcylcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChhbGVydClcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudFxuICB9XG5cbiAgYXN5bmMgdXBkYXRlRm9ybUZpZWxkc0Zyb21QcmV2aWV3KCkge1xuICAgIGNvbnN0IHsgaGlzdG9yeUZpZWxkcywgYWRkaXRpb25hbEZpZWxkcyB9ID0gdGhpcy5nZXRTdGF0ZSgpXG4gICAgY29uc3QgZWwgPSB0aGlzLnByZXZpZXdFbFxuICAgIGNvbnN0IGZpZWxkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwbGYtZm9ybUZpZWxkcycpXG5cbiAgICBsZXQgYWxsb3dTYXZlID0gdHJ1ZVxuXG4gICAgLy8gR2V0IGFsbCBpbnB1dHMgd2l0aCBhIG5hbWUgYXR0cmlidXRlLCB5ZXMsIGV2ZW4gYnV0dG9uLlxuICAgIGNvbnN0IGZpZWxkcyA9IEFycmF5LmZyb20oZWwucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIGJ1dHRvbicpKVxuICAgICAgLmZpbHRlcigoZWwpID0+IGVsLmdldEF0dHJpYnV0ZSgnbmFtZScpKVxuICAgICAgLm1hcChleHRyYWN0RmllbGREYXRhRnJvbUVsZW1lbnQpXG5cbiAgICBjb25zdCBmaWVsZE5hbWVzID0gZmllbGRzLm1hcCgoZmllbGQpID0+IGZpZWxkLm5hbWUpXG4gICAgY29uc3QgZHVwbGljYXRlTmFtZXMgPSB0aGlzLmdldER1cGxpY2F0ZU5hbWVzKGZpZWxkTmFtZXMpXG5cbiAgICBmaWVsZENvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xuXG4gICAgY29uc3QgZmllbGRFcnJvcnMgPSBbXVxuICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgY29uc3QgeyBuYW1lLCB0eXBlIH0gPSBmaWVsZFxuICAgICAgY29uc3QgaGlzdG9yeUZpZWxkID0gT2JqZWN0LnZhbHVlcyhoaXN0b3J5RmllbGRzKS5maW5kKChmaWVsZCkgPT4gZmllbGQubmFtZSA9PT0gbmFtZSlcbiAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAnJ1xuXG4gICAgICAvLyBuYW1lcyBsaWtlIGZpZWxkZ3JvdXBbZmllbGRuYW1lXSBhcmUgbm90IHN1cHBvcnRlZCB5ZXRcbiAgICAgIGlmIChuYW1lLm1hdGNoKC9cXHcqXFxbXFx3KlxcXS8pKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IGAke2Vycm9yTWVzc2FnZX0ke2kxOG4uZ3JvdXBlZE5hbWVzTm90U3VwcG9ydGVkWWV0fVxcbmBcbiAgICAgIH1cblxuICAgICAgaWYgKGR1cGxpY2F0ZU5hbWVzICYmIGR1cGxpY2F0ZU5hbWVzLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IGAke2Vycm9yTWVzc2FnZX0ke2kxOG4uZHVwbGljYXRlRmllbGROYW1lfSAke25hbWV9XFxuYFxuICAgICAgfVxuXG4gICAgICBpZiAoYWRkaXRpb25hbEZpZWxkcy5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSBgJHtlcnJvck1lc3NhZ2V9JHtpMThuLmlsbGVnYWxOYW1lLnJlcGxhY2UoJ3tuYW1lfScsIG5hbWUpfVxcbmBcbiAgICAgIH1cblxuICAgICAgaWYgKGhpc3RvcnlGaWVsZCAmJiBoaXN0b3J5RmllbGQudHlwZSAhPT0gdHlwZSkge1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSBgJHtlcnJvck1lc3NhZ2V9JHtpMThuLmZpZWxkQWxyZWFkeUV4aXN0c0luRGIucmVwbGFjZSgne3R5cGV9JywgaGlzdG9yeUZpZWxkLnR5cGUpfVxcbmBcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICBmaWVsZEVycm9ycy5wdXNoKGVycm9yTWVzc2FnZSlcbiAgICAgIH1cblxuICAgICAgZmllbGRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVGaWVsZEVsZW1lbnQoZmllbGQsIGVycm9yTWVzc2FnZSkpXG4gICAgfSlcblxuICAgIGlmICghZmllbGRFcnJvcnMubGVuZ3RoKSB7XG4gICAgICBhbGxvd1NhdmUgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsbG93U2F2ZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgbmV3RmllbGRzID0gZmllbGRzLmZpbHRlcigoZmllbGQpID0+IHtcbiAgICAgIGNvbnN0IGZpZWxkSW5Jbml0aWFsRGF0YSA9IE9iamVjdC52YWx1ZXMoaGlzdG9yeUZpZWxkcykuZmluZCgoeCkgPT4geC5uYW1lID09PSBmaWVsZC5uYW1lKVxuXG4gICAgICByZXR1cm4gZmllbGRJbkluaXRpYWxEYXRhID8gZmFsc2UgOiB0cnVlXG4gICAgfSlcblxuICAgIGNvbnN0IGRlbGV0ZWRGaWVsZHMgPSBPYmplY3QudmFsdWVzKGhpc3RvcnlGaWVsZHMpLmZpbHRlcigoZmllbGQpID0+IHtcbiAgICAgIHJldHVybiAhZmllbGROYW1lcy5pbmNsdWRlcyhmaWVsZC5uYW1lKVxuICAgIH0pXG5cbiAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICBmaWVsZHMsXG4gICAgICBuZXdGaWVsZHMsXG4gICAgICBkZWxldGVkRmllbGRzLFxuICAgICAgYWxsb3dTYXZlLFxuICAgIH0pKVxuXG4gICAgYXdhaXQgd2FpdEZvck5leHRUaWNrKClcbiAgfVxuXG4gIGFzeW5jIHJlbW92ZVByb2JsZW1hdGljQXR0cmlidXRlc0Zyb21QcmV2aWV3KCkge1xuICAgIC8vIE5hbWVzIGFuZCByZXF1aXJlZCBhdHRyaWJ1dGVzIGNhdXNlIHByb2JsZW1zIHdoZW4gc2F2aW5nIHRoZSBmb3JtLCByZW1vdmVcbiAgICBjb25zdCByZXF1aXJlZEVscyA9IEFycmF5LmZyb20odGhpcy5wcmV2aWV3RWwucXVlcnlTZWxlY3RvckFsbCgnW3JlcXVpcmVkXScpKVxuICAgIGNvbnN0IG5hbWVFbHMgPSBBcnJheS5mcm9tKHRoaXMucHJldmlld0VsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuYW1lXScpKVxuXG4gICAgcmVxdWlyZWRFbHMuZm9yRWFjaCgoZWwpID0+IGVsLnJlbW92ZUF0dHJpYnV0ZSgncmVxdWlyZWQnKSlcbiAgICBuYW1lRWxzLmZvckVhY2goKGVsKSA9PiBlbC5yZW1vdmVBdHRyaWJ1dGUoJ25hbWUnKSlcblxuICAgIGF3YWl0IHdhaXRGb3JOZXh0VGljaygpXG4gIH1cbn1cbiIsImltcG9ydCBnbG9iYWxEYXRhIGZyb20gJy4uL2xpYi9nbG9iYWwtZGF0YSdcbmltcG9ydCBjcmVhdGVBcGlDbGllbnQgZnJvbSAnLi4vbGliL2FwaS1jbGllbnQnXG5pbXBvcnQgbG9nIGZyb20gJy4uL2xpYi9sb2cnXG5cbmltcG9ydCBXUExGX1RhYnMgZnJvbSAnLi93cGxmLXRhYnMnXG5cbmltcG9ydCB7XG4gIFN1Ym1pdFN0YXRlLFxuICBTdWJtaXRIYW5kbGVyLFxuICBGb3JtQ2FsbGJhY2ssXG4gIC8vIEZvcm1TdWNjZXNzQ2FsbGJhY2ssXG4gIC8vIEZvcm1FcnJvckNhbGxiYWNrLFxuICBMaXN0LFxuICBBcGlSZXNwb25zZUtpbmQsXG59IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IGlzRWxlbWVudGlzaCBmcm9tICcuLi9saWIvaXMtZWxlbWVudGlzaCdcbmltcG9ydCB3cGxmRnJvbnRlbmQgZnJvbSAnLi4vLi4vLi4vZGlzdC93cGxmLWZyb250ZW5kJ1xuXG5jb25zdCB7IHJlcXVlc3QgfSA9IGNyZWF0ZUFwaUNsaWVudCgpXG5cbmNvbnN0IGRlZmF1bHRCZWZvcmVTZW5kQ2FsbGJhY2sgPSAod3BsZkZvcm06IFdQTEZfRm9ybSwgcGFyYW1zOiBMaXN0PGFueT4pID0+IHtcbiAgaWYgKGlzRWxlbWVudGlzaCh3cGxmRm9ybS5mb3JtLnBhcmVudE5vZGUpKSB7XG4gICAgY29uc3QgcGFyZW50Tm9kZSA9IHdwbGZGb3JtLmZvcm0ucGFyZW50Tm9kZVxuXG4gICAgLy8gUmVzZXQgZXJyb3IgYW5kIHN1Y2Nlc3MgbWVzc2FnZXMsIGlmIHRoZXJlIHdlcmUgYW55XG4gICAgY29uc3QgbWVzc2FnZXMgPSBwYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAnLndwbGYtZXJyb3JNZXNzYWdlLCAud3BsZi1zdWNjZXNzTWVzc2FnZSdcbiAgICApXG5cbiAgICBtZXNzYWdlcy5mb3JFYWNoKChlbGVtZW50OiBFbGVtZW50KSA9PiB7XG4gICAgICBpZiAoaXNFbGVtZW50aXNoKGVsZW1lbnQucGFyZW50Tm9kZSkpIHtcbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG5jb25zdCBkZWZhdWx0U3VjY2Vzc0NhbGxiYWNrID0gKHdwbGZGb3JtOiBXUExGX0Zvcm0sIHBhcmFtczogTGlzdDxhbnk+KSA9PiB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gcGFyYW1zXG4gIGNvbnN0IHsgbWVzc2FnZSB9ID0gZGF0YVxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIGRpdi5jbGFzc0xpc3QuYWRkKCd3cGxmLXN1Y2Nlc3NNZXNzYWdlJylcbiAgZGl2Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIG1lc3NhZ2UpXG5cbiAgd3BsZkZvcm0uZm9ybS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgZGl2KVxuICB3cGxmRm9ybS5mb3JtLmNsYXNzTGlzdC5hZGQoJ3N1Ym1pdHRlZCcpXG4gIHdwbGZGb3JtLmZvcm0ucmVzZXQoKVxufVxuXG5jb25zdCByZXNldEZvcm0gPSAod3BsZkZvcm06IFdQTEZfRm9ybSwgcGFyYW1zOiBMaXN0PGFueT4pID0+IHtcbiAgd3BsZkZvcm0uZm9ybS5yZXNldCgpXG59XG5cbmNvbnN0IGRlZmF1bHRFcnJvclNlbmRDYWxsYmFjayA9ICh3cGxmRm9ybTogV1BMRl9Gb3JtLCBwYXJhbXM6IExpc3Q8YW55PikgPT4ge1xuICBjb25zdCB7IGVycm9yIH0gPSBwYXJhbXNcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBkaXYuY2xhc3NMaXN0LmFkZCgnd3BsZi1lcnJvck1lc3NhZ2UnKVxuICBkaXYuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgZXJyb3IubWVzc2FnZSlcbiAgd3BsZkZvcm0uZm9ybS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgZGl2KVxufVxuXG5leHBvcnQgY2xhc3MgV1BMRl9Gb3JtIHtcbiAgZm9ybTogSFRNTEZvcm1FbGVtZW50XG4gIHN1Ym1pdFN0YXRlOiBTdWJtaXRTdGF0ZSA9IFN1Ym1pdFN0YXRlLlVuc3VibWl0dGVkXG4gIHN1Ym1pdEhhbmRsZXI6IFN1Ym1pdEhhbmRsZXJcbiAgY2FsbGJhY2tzOiB7XG4gICAgYmVmb3JlU2VuZDogTGlzdDxGb3JtQ2FsbGJhY2s+XG4gICAgc3VjY2VzczogTGlzdDxGb3JtQ2FsbGJhY2s+XG4gICAgZXJyb3I6IExpc3Q8Rm9ybUNhbGxiYWNrPlxuICB9ID0ge1xuICAgIGJlZm9yZVNlbmQ6IHtcbiAgICAgIGRlZmF1bHQ6IGRlZmF1bHRCZWZvcmVTZW5kQ2FsbGJhY2ssXG4gICAgfSxcbiAgICBzdWNjZXNzOiB7XG4gICAgICBkZWZhdWx0OiBkZWZhdWx0U3VjY2Vzc0NhbGxiYWNrLFxuICAgICAgY2xlYXJPblN1Y2Nlc3M6IHJlc2V0Rm9ybSxcbiAgICB9LFxuICAgIGVycm9yOiB7XG4gICAgICBkZWZhdWx0OiBkZWZhdWx0RXJyb3JTZW5kQ2FsbGJhY2ssXG4gICAgfSxcbiAgfVxuXG4gIHRhYnM6IFdQTEZfVGFic1tdID0gW11cbiAga2V5ID0gJydcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRm9ybUVsZW1lbnQpIHtcbiAgICAvLyBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxGb3JtRWxlbWVudCAhPT0gdHJ1ZSkge1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50ICE9PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gZWxlbWVudCBpbnZhbGlkIG9yIG1pc3NpbmcnKVxuICAgIH1cbiAgICBjb25zdCBmYWxsYmFja0lucHV0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIl9ub2pzXCJdJylcblxuICAgIHRoaXMuZm9ybSA9IGVsZW1lbnRcbiAgICB0aGlzLmtleSA9ICdfJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KVxuICAgIHRoaXMudGFicyA9IEFycmF5LmZyb20odGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGxmLXRhYnMnKSkubWFwKFxuICAgICAgKGVsKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgV1BMRl9UYWJzKGVsKVxuICAgICAgfVxuICAgIClcblxuICAgIHRoaXMuc3VibWl0SGFuZGxlciA9IHRoaXMuY3JlYXRlU3VibWl0SGFuZGxlcigpXG5cbiAgICB0aGlzLmF0dGFjaFN1Ym1pdEhhbmRsZXIoKVxuXG4gICAgLy8gUmVtb3ZlIGlucHV0IHRoYXQgdHJpZ2dlcnMgdGhlIGZhbGxiYWNrIHNvIHdlIGdldCBhIEpTT04gcmVzcG9uc2VcbiAgICBpZiAoZmFsbGJhY2tJbnB1dCAmJiBpc0VsZW1lbnRpc2goZmFsbGJhY2tJbnB1dC5wYXJlbnROb2RlKSkge1xuICAgICAgZmFsbGJhY2tJbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGZhbGxiYWNrSW5wdXQpXG4gICAgfVxuICB9XG5cbiAgYWRkQ2FsbGJhY2sobmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIGNhbGxiYWNrOiBGb3JtQ2FsbGJhY2spIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLmNhbGxiYWNrc1xuICAgIGNvbnN0IHsgYmVmb3JlU2VuZCwgc3VjY2VzcywgZXJyb3IgfSA9IGNhbGxiYWNrc1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdiZWZvcmVTZW5kJzoge1xuICAgICAgICBiZWZvcmVTZW5kW25hbWVdID0gY2FsbGJhY2tcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSAnc3VjY2Vzcyc6IHtcbiAgICAgICAgc3VjY2Vzc1tuYW1lXSA9IGNhbGxiYWNrXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2Vycm9yJzoge1xuICAgICAgICBlcnJvcltuYW1lXSA9IGNhbGxiYWNrXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGNhbGxiYWNrIHR5cGUgJHt0eXBlfWApXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlbW92ZUNhbGxiYWNrKG5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nKSB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5jYWxsYmFja3NcbiAgICBjb25zdCB7IGJlZm9yZVNlbmQsIHN1Y2Nlc3MsIGVycm9yIH0gPSBjYWxsYmFja3NcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYmVmb3JlU2VuZCc6IHtcbiAgICAgICAgZGVsZXRlIGJlZm9yZVNlbmRbbmFtZV1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSAnc3VjY2Vzcyc6IHtcbiAgICAgICAgZGVsZXRlIHN1Y2Nlc3NbbmFtZV1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSAnZXJyb3InOiB7XG4gICAgICAgIGRlbGV0ZSBlcnJvcltuYW1lXVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBjYWxsYmFjayAke25hbWV9ICR7dHlwZX1gKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBydW5DYWxsYmFjayh0eXBlOiBzdHJpbmcsIHBhcmFtczogTGlzdDxhbnk+ID0ge30pIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLmNhbGxiYWNrc1xuICAgIGNvbnN0IHsgYmVmb3JlU2VuZCwgc3VjY2VzcywgZXJyb3IgfSA9IGNhbGxiYWNrc1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdiZWZvcmVTZW5kJzoge1xuICAgICAgICBPYmplY3QudmFsdWVzKGJlZm9yZVNlbmQpLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2sodGhpcywgcGFyYW1zKVxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzdWNjZXNzJzoge1xuICAgICAgICBPYmplY3QudmFsdWVzKHN1Y2Nlc3MpLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2sodGhpcywgcGFyYW1zKVxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlICdlcnJvcic6IHtcbiAgICAgICAgT2JqZWN0LnZhbHVlcyhlcnJvcikuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICBjYWxsYmFjayh0aGlzLCBwYXJhbXMpXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGNhbGxiYWNrICR7bmFtZX0gJHt0eXBlfWApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXR0YWNoU3VibWl0SGFuZGxlcigpIHtcbiAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRIYW5kbGVyLCB7IHBhc3NpdmU6IGZhbHNlIH0pXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgc3VibWl0IGhhbmRsZXIgZnJvbSB0aGUgZm9ybSwgYnV0IGtlZXBzIGl0IGluIG1lbW9yeS5cbiAgICovXG4gIHJlbW92ZVN1Ym1pdEhhbmRsZXIoKSB7XG4gICAgdGhpcy5mb3JtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0SGFuZGxlcilcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBjcmVhdGVTdWJtaXRIYW5kbGVyKGhhbmRsZXI/OiBTdWJtaXRIYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBoYW5kbGVyXG4gICAgfVxuXG4gICAgcmV0dXJuIGFzeW5jIChlOiBFdmVudCkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGlmICh0aGlzLnN1Ym1pdFN0YXRlID09PSBTdWJtaXRTdGF0ZS5TdWJtaXR0aW5nKSB7XG4gICAgICAgIGxvZy5ub3RpY2UoJ1ByZXZlbnRpbmcgZG91YmxlIGRvdWJtaXNzaW9uJylcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeCA9IGF3YWl0IHRoaXMuc2VuZCgpXG4gICAgICAgIGNvbnN0IHsgZGF0YSwgb2sgfSA9IHhcblxuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICB0aGlzLnN1Ym1pdFN0YXRlID0gU3VibWl0U3RhdGUuU3VjY2Vzc1xuICAgICAgICAgIHRoaXMucnVuQ2FsbGJhY2soJ3N1Y2Nlc3MnLCB7IGRhdGEgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm90IG9rIScsIHgpXG5cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nJylcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnN1Ym1pdFN0YXRlID0gU3VibWl0U3RhdGUuRXJyb3JcbiAgICAgICAgdGhpcy5ydW5DYWxsYmFjaygnZXJyb3InLCB7IGVycm9yOiB0aGlzLnN1Ym1pdFN0YXRlIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2VuZCgpIHtcbiAgICBjb25zdCBmb3JtID0gdGhpcy5mb3JtXG4gICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKVxuXG4gICAgZ2xvYmFsRGF0YS5sYW5nICYmIGRhdGEuYXBwZW5kKCdsYW5nJywgZ2xvYmFsRGF0YS5sYW5nKVxuICAgIHRoaXMuc3VibWl0U3RhdGUgPSBTdWJtaXRTdGF0ZS5TdWJtaXR0aW5nXG5cbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ3N1Ym1pdHRpbmcnKVxuICAgIHRoaXMucnVuQ2FsbGJhY2soJ2JlZm9yZVNlbmQnLCB7IGZvcm1EYXRhOiBkYXRhLCBmb3JtIH0pXG5cbiAgICBjb25zdCByZXEgPSByZXF1ZXN0KFxuICAgICAgJy9zdWJtaXQnLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogZGF0YSxcbiAgICAgIH0sXG4gICAgICBBcGlSZXNwb25zZUtpbmQuU3VibWlzc2lvblxuICAgIClcblxuICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnc3VibWl0dGluZycpXG5cbiAgICByZXR1cm4gcmVxXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFdQTEZfU2V0dGluZ3Mge1xuXG59IiwiaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlJ1xuaW1wb3J0IGxvZyBmcm9tICcuLi9saWIvbG9nJ1xuaW1wb3J0IGlzVGFyZ2V0QW5FbGVtZW50IGZyb20gJy4uL2xpYi9pcy1lbGVtZW50aXNoJ1xuaW1wb3J0IGlzRWxlbWVudGlzaCBmcm9tICcuLi9saWIvaXMtZWxlbWVudGlzaCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1BMRl9UYWJzIHtcbiAgLy8gcmVtZW1iZXIgPSBmYWxzZVxuICAvLyBhY3RpdmVUYWIgPSBudWxsXG4gIC8vIHJvb3QgPSBudWxsXG4gIC8vIG5hbWUgPSBudWxsXG5cbiAgcmVtZW1iZXI6IGJvb2xlYW4gPSBmYWxzZVxuICBhY3RpdmVUYWI6IHN0cmluZ1xuICByb290OiBFbGVtZW50XG4gIG5hbWU6IHN0cmluZyA9ICcnXG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudCkge1xuICAgIC8vIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCAhPT0gdHJ1ZSkge1xuICAgIC8vIHRocm93IG5ldyBFcnJvcignVGFiIGVsZW1lbnQgaW52YWxpZCBvciBtaXNzaW5nJylcbiAgICAvLyB9XG5cbiAgICB0aGlzLnJvb3QgPSBlbGVtZW50XG4gICAgdGhpcy5uYW1lID0gdGhpcy5yb290LmdldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJykgfHwgJydcbiAgICB0aGlzLnJlbWVtYmVyID0gdGhpcy5yb290LmdldEF0dHJpYnV0ZSgnZGF0YS1yZW1lbWJlcicpICE9PSBudWxsXG4gICAgdGhpcy5hY3RpdmVUYWIgPSB0aGlzLnJvb3QuZ2V0QXR0cmlidXRlKCdkYXRhLWRlZmF1bHQnKSB8fCAnJ1xuXG4gICAgaWYgKCF0aGlzLnJvb3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZG9lcyB0aGlzIHdvcmsgZm9yIHRzIChpdCBkb2VzIG5vdCknKVxuICAgIH1cblxuICAgIGlmICghdGhpcy5uYW1lIHx8ICF0aGlzLmFjdGl2ZVRhYikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlZCBhdHRyaWJ1dGVzIGFyZSBtaXNzaW5nJylcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZW1lbWJlcikge1xuICAgICAgLy8gR2V0IHNhdmVkIHZhbHVlIG9yIGtlZXAgdXNpbmcgdGhlIGRlZmF1bHRcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gU3RvcmFnZS5nZXQodGhpcy5uYW1lLCB0aGlzLmFjdGl2ZVRhYilcbiAgICB9XG5cbiAgICB0aGlzLnJlZnJlc2goKVxuICB9XG5cbiAgaGFuZGxlQ2xpY2sgPSAoZTogRXZlbnQpID0+IHtcbiAgICBjb25zdCB7IHRhcmdldCB9ID0gZVxuXG4gICAgaWYgKGlzRWxlbWVudGlzaCh0YXJnZXQpKSB7XG4gICAgICBjb25zb2xlLmxvZyh0YXJnZXQpXG4gICAgfVxuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgY29uc3QgeCA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCAvLyBJJ20gOTkuOSUgc3VyZSB0aGVyZSB3aWxsIGFsd2F5cyBiZSBhIHRhcmdldFxuICAgICAgY29uc3QgdGFiTmFtZSA9IHguZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpXG5cbiAgICAgIGlmICh0YWJOYW1lKSB7XG4gICAgICAgIHRoaXMuc3dpdGNoVGFiKHRhYk5hbWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2cubm90aWNlKCdVbmFibGUgdG8gc3dpdGNoIHRhYiBhcyBkYXRhLXRhcmdldCB3YXMgZW1wdHknKVxuICAgICAgfVxuICAgIH1cblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBldmVudCBsaXN0ZW5lcnMgYW5kIGVuc3VyZSB0aGUgY3VycmVudCB0YWIgaXMgdmlzaWJsZS5cbiAgICogQ2FsbCBhZnRlciBhZGRpbmcgYSB0YWIgZHluYW1pY2FsbHkuXG4gICAqL1xuICByZWZyZXNoKCkge1xuICAgIHRoaXMuZ2V0SGFuZGxlcygpLmZvckVhY2goKGhhbmRsZSkgPT4ge1xuICAgICAgLy8gSXQncyBub3QgcG9zc2libGUgdG8gYWRkIHRoZSBzYW1lIGV2ZW50IGxpc3RlbmVyIHR3aWNlLiBJZiB0aGUgaGFuZGxlIGFscmVhZHkgaGFzIHRoZSBsaXN0ZW5lcixcbiAgICAgIC8vIHRoaXMgaXMgYSBuby1vcC5cbiAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2ssIHsgcGFzc2l2ZTogZmFsc2UgfSlcbiAgICB9KVxuXG4gICAgLy8gSWYgYWN0aXZlVGFiIGlzIG51bGwsIHRoaW5ncyB3aWxsIGJyZWFrLiBGYWxsIGJhY2sgdG8gZmlyc3QgdGFiXG4gICAgLy8gYWN0aXZlVGFiIGNhbnQgYmUgbnVsbCBhbnltb3JlXG5cbiAgICAvKiAgICAgaWYgKHRoaXMuYWN0aXZlVGFiID09PSBudWxsKSB7XG4gICAgICBjb25zdCB0YWJzID0gdGhpcy5nZXRUYWJzKClcblxuICAgICAgaWYgKHRhYnMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gdGFic1swXVxuICAgICAgICBjb25zdCAuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpXG5cbiAgICAgIH1cblxuICAgICAgbG9nLm5vdGljZSgnYWN0aXZlVGFiIHdhcyBudWxsLCBzZXR0aW5nIGZpcnN0IHRhYiBhcyBhY3RpdmUnLCBmaXJzdClcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gZmlyc3RcbiAgICB9ICovXG5cbiAgICB0aGlzLnN3aXRjaFRhYih0aGlzLmFjdGl2ZVRhYilcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWx1ZXMgYXJlIG5vdCBjYWNoZWQgYXMgdGhleSBhcmUgcHJhY3RpY2FsbHkgZnJlZSB0byByZWNvbXB1dGUsIGJ1dFxuICAgKiBtaWdodCBiZWNvbWUgYSBtZW1vcnkgbGVhayBpZiBzdG9yZWQuXG4gICAqL1xuICBnZXRUYWJzKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKFxuICAgICAgdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3JBbGwoYC53cGxmLXRhYnNfX3RhYltkYXRhLW5hbWU9XCIke3RoaXMubmFtZX1cIl1gKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWUgZ2V0VGFicygpXG4gICAqL1xuICBnZXRIYW5kbGVzKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKFxuICAgICAgdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgIGAud3BsZi10YWJzX190YWJTd2l0Y2hlcltkYXRhLW5hbWU9XCIke3RoaXMubmFtZX1cIl1gXG4gICAgICApXG4gICAgKVxuICB9XG5cbiAgc3dpdGNoVGFiKG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHRhYnMgPSB0aGlzLmdldFRhYnMoKVxuICAgIGNvbnN0IGFsbEhhbmRsZXMgPSB0aGlzLmdldEhhbmRsZXMoKVxuXG4gICAgY29uc3Qgb3BlbiA9IHRhYnMuZmlsdGVyKCh0YWIpID0+IHRhYi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJykgPT09IG5hbWUpXG4gICAgY29uc3QgY2xvc2UgPSB0YWJzLmZpbHRlcigodGFiKSA9PiB0YWIuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpICE9PSBuYW1lKVxuXG4gICAgb3Blbi5mb3JFYWNoKCh0YWIpID0+IHtcbiAgICAgIGNvbnN0IHRhYk5hbWUgPSB0YWIuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpXG4gICAgICBjb25zdCBoYW5kbGVzID0gYWxsSGFuZGxlcy5maWx0ZXIoXG4gICAgICAgIChoYW5kbGUpID0+IGhhbmRsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykgPT09IHRhYk5hbWVcbiAgICAgIClcblxuICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICBoYW5kbGVzLmZvckVhY2goKGhhbmRsZSkgPT4ge1xuICAgICAgICBoYW5kbGUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGNsb3NlLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgY29uc3QgdGFiTmFtZSA9IHRhYi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJylcbiAgICAgIGNvbnN0IGhhbmRsZXMgPSBhbGxIYW5kbGVzLmZpbHRlcihcbiAgICAgICAgKGhhbmRsZSkgPT4gaGFuZGxlLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSA9PT0gdGFiTmFtZVxuICAgICAgKVxuXG4gICAgICB0YWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgIGhhbmRsZXMuZm9yRWFjaCgoaGFuZGxlKSA9PiB7XG4gICAgICAgIGhhbmRsZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgaWYgKHRoaXMucmVtZW1iZXIpIHtcbiAgICAgIFN0b3JhZ2Uuc2V0KHRoaXMubmFtZSwgbmFtZSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFdQTEZfRm9ybSB9IGZyb20gJy4vd3BsZi1mb3JtJ1xuaW1wb3J0IGdsb2JhbERhdGEgZnJvbSAnLi4vbGliL2dsb2JhbC1kYXRhJ1xuXG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgZW5zdXJlTnVtIGZyb20gJy4uL2xpYi9lbnN1cmUtbnVtJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXUExGIHtcbiAgLy8gZm9ybXMgPSB7XG4gIC8vICAgLy8gJ19nNjdhOHoya3cnOiBXUExGX0Zvcm1cbiAgLy8gfVxuICBmb3JtczogTGlzdDxXUExGX0Zvcm0+ID0ge31cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluaXRpYWxpemUoKVxuICB9XG5cbiAgLy8gRXhwb3NlIFdQTEZfRm9ybVxuICAvLyBGb3JtOiBXUExGX0Zvcm0gPSBXUExGX0Zvcm1cbiAgRm9ybSA9IFdQTEZfRm9ybVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgaWYgKGdsb2JhbERhdGEuc2V0dGluZ3MuYXV0b2luaXQpIHtcbiAgICAgIDtbXS5mb3JFYWNoLmNhbGwoXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0ud3BsZicpLFxuICAgICAgICAoZm9ybTogSFRNTEZvcm1FbGVtZW50KSA9PiB0aGlzLmF0dGFjaChmb3JtKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGZpbmRGb3Jtc0J5SWQoaWQ6IG51bWJlcikge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmZvcm1zKS5yZWR1Y2U8V1BMRl9Gb3JtW10+KChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3Qgd3BsZkZvcm0gPSB0aGlzLmZvcm1zW2tleV1cblxuICAgICAgaWYgKCF3cGxmRm9ybSkge1xuICAgICAgICByZXR1cm4gYWNjXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZvcm1FbCA9IHdwbGZGb3JtLmZvcm1cbiAgICAgIGNvbnN0IGZvcm1FbElkID0gZm9ybUVsLmdldEF0dHJpYnV0ZSgnZGF0YS1mb3JtLWlkJylcblxuICAgICAgaWYgKGZvcm1FbElkICYmIGVuc3VyZU51bShmb3JtRWxJZCkgPT09IGVuc3VyZU51bShpZCkpIHtcbiAgICAgICAgYWNjLnB1c2god3BsZkZvcm0pXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCBbXSlcbiAgfVxuXG4gIGF0dGFjaCh4OiBIVE1MRm9ybUVsZW1lbnQgfCBXUExGX0Zvcm0pIHtcbiAgICBpZiAoeCBpbnN0YW5jZW9mIFdQTEZfRm9ybSkge1xuICAgICAgY29uc3Qgd3BsZkZvcm0gPSB4XG5cbiAgICAgIHRoaXMuZm9ybXNbd3BsZkZvcm0ua2V5XSA9IHdwbGZGb3JtXG5cbiAgICAgIHJldHVybiB3cGxmRm9ybVxuICAgIH1cblxuICAgIGNvbnN0IGVsZW1lbnQgPSB4XG5cbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICE9PSB0cnVlKSB7XG4gICAgICAvLyBsb2cuY29uc29sZS5lcnJvcignVW5hYmxlIHRvIGF0dGFjaCBXUExGIHRvIGVsZW1lbnQnKTtcblxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gYXR0YWNoIFdQTEYgdG8gZWxlbWVudCcpXG4gICAgfVxuXG4gICAgY29uc3Qgd3BsZkZvcm0gPSBuZXcgV1BMRl9Gb3JtKGVsZW1lbnQpXG4gICAgdGhpcy5mb3Jtc1t3cGxmRm9ybS5rZXldID0gd3BsZkZvcm1cblxuICAgIHdwbGZGb3JtLmZvcm0ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpXG4gICAgd3BsZkZvcm0uZm9ybS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJylcblxuICAgIHJldHVybiB3cGxmRm9ybVxuICB9XG5cbiAgZGV0YWNoKHdwbGZGb3JtOiBXUExGX0Zvcm0pIHtcbiAgICB0aGlzLmZvcm1zW3dwbGZGb3JtLmtleV0ucmVtb3ZlU3VibWl0SGFuZGxlcigpXG4gICAgZGVsZXRlIHRoaXMuZm9ybXNbd3BsZkZvcm0ua2V5XVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxufVxuIiwiaW1wb3J0IEFib3J0Q29udHJvbGxlciBmcm9tICdhYm9ydC1jb250cm9sbGVyJ1xuaW1wb3J0IGdsb2JhbERhdGEgZnJvbSAnLi9nbG9iYWwtZGF0YSdcbmltcG9ydCB7IExpc3QsIEFwaVJlc3BvbnNlLCBBcGlSZXNwb25zZUtpbmQgfSBmcm9tICcuLi90eXBlcydcblxuLyoqXG4gKiBJdCdzIG9rIHRvIGNyZWF0ZSBtdWx0aXBsZSBBUEkgY2xpZW50c1xuICpcbiAqIFVzYWdlOiBjb25zdCB7IGFib3J0LCByZXF1ZXN0LCBnZXRTaWduYWwgfSA9IGNyZWF0ZUFwaUNsaWVudCgpXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFwaUNsaWVudCgpIHtcbiAgbGV0IGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlciB8IG51bGwgPSBudWxsXG4gIGxldCBzaWduYWw6IEFib3J0U2lnbmFsIHwgbnVsbCA9IG51bGxcblxuICBjb25zb2xlLmxvZyhnbG9iYWxEYXRhKVxuXG4gIHJldHVybiB7XG4gICAgLy8gY29udHJvbGxlcjogbnVsbCxcbiAgICAvLyBzaWduYWw6IG51bGwsXG5cbiAgICBjb250cm9sbGVyLFxuICAgIHNpZ25hbCxcblxuICAgIGdldFNpZ25hbCgpIHtcbiAgICAgIHJldHVybiBzaWduYWxcbiAgICB9LFxuXG4gICAgYWJvcnQoKSB7XG4gICAgICBpZiAoY29udHJvbGxlciAmJiBjb250cm9sbGVyLmFib3J0KSB7XG4gICAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyByZXF1ZXN0KFxuICAgICAgdGFyZ2V0OiBzdHJpbmcsXG4gICAgICBvcHRpb25zOiBMaXN0PHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBGb3JtRGF0YSB8IG51bGw+ID0ge30sXG4gICAgICByZXNwb25zZUtpbmQ6IEFwaVJlc3BvbnNlS2luZFxuICAgICk6IFByb21pc2U8QXBpUmVzcG9uc2U+IHtcbiAgICAgIGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKClcbiAgICAgIHNpZ25hbCA9IGNvbnRyb2xsZXIuc2lnbmFsXG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGdsb2JhbERhdGEuYmFja2VuZFVybCArIHRhcmdldCwge1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgc2lnbmFsLFxuICAgICAgICAgIGNyZWRlbnRpYWxzOiBnbG9iYWxEYXRhLmZldGNoQ3JlZGVudGlhbHMgfHwgJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgICBoZWFkZXJzOiBnbG9iYWxEYXRhLnJlcXVlc3RIZWFkZXJzIHx8IHt9LFxuICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IHsgaGVhZGVycywgc3RhdHVzLCBzdGF0dXNUZXh0LCB1cmwsIG9rIH0gPSByZXNcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcblxuICAgICAgICBjb250cm9sbGVyID0gbnVsbFxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAga2luZDogcmVzcG9uc2VLaW5kLFxuICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQsXG4gICAgICAgICAgdXJsLFxuICAgICAgICAgIG9rLFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29udHJvbGxlciA9IG51bGxcblxuICAgICAgICAvLyBJZiB5b3Ugd2FudCB0byBkbyBzb21ldGhpbmcgd2hlbiB0aGUgcmVxdWVzdCBpcyBhYm9ydGVkLCB1c2VcbiAgICAgICAgLy8gc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgLi4uKVxuICAgICAgICBpZiAoZS5uYW1lICE9PSAnQWJvcnRFcnJvcicpIHtcbiAgICAgICAgICB0aHJvdyBlXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZVxuICAgICAgfVxuICAgIH0sXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4gY3JlYXRlQXBpQ2xpZW50KClcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVuc3VyZU51bSh4OiBzdHJpbmcgfCBudW1iZXIsIGZsb2F0OiBib29sZWFuID0gZmFsc2UpIHtcbiAgaWYgKHR5cGVvZiB4ID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB4XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZsb2F0ID8gcGFyc2VGbG9hdCh4KSA6IHBhcnNlSW50KHgsIDEwKVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCAoKHdpbmRvdykgPT4gKHtcbiAgLi4ud2luZG93LndwbGZEYXRhIC8vIHdwX2xvY2FsaXplX3NjcmlwdCB3aWxsIGNyZWF0ZSB0aGlzIG9iamVjdFxufSkpKHdpbmRvdylcbiIsIi8vIGZ1bmN0aW9uIGlzRWxlbWVudGlzaChlOiBvYmplY3QgfCBudWxsIHwgdW5kZWZpbmVkKTogZSBpcyBFbGVtZW50IHtcbi8vICAgcmV0dXJuIChlID8gZVsndGFnTmFtZSddICYmICdnZXRBdHRyaWJ1dGUnIGluIGUgOiBmYWxzZSk7XG4vLyB9XG5cbmZ1bmN0aW9uIGlzRWxlbWVudGlzaChlOiBvYmplY3QgfCBudWxsIHwgdW5kZWZpbmVkKTogZSBpcyBFbGVtZW50IHtcbiAgcmV0dXJuIGUgPyAnZ2V0QXR0cmlidXRlJyBpbiBlICYmICd0YWdOYW1lJyBpbiBlIDogZmFsc2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNFbGVtZW50aXNoXG4iLCJpbXBvcnQgZ2xvYmFsRGF0YSBmcm9tICcuL2dsb2JhbC1kYXRhJ1xuXG5jb25zdCB7IGRlYnVnTGV2ZWwgfSA9IGdsb2JhbERhdGEuc2V0dGluZ3NcblxuY29uc3QgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlIHx8IHsgbG9nKCkge30sIGVycm9yKCkge30gfSAvLyBub29wIGZhbGxiYWNrXG5jb25zdCBub3RpY2UgPSAobWVzc2FnZTogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKSA9PlxuICBkZWJ1Z0xldmVsID09PSAnYWxsJyAmJiBjb25zb2xlLmxvZyhgV1BMRjogJHttZXNzYWdlfWAsIHBhcmFtcylcbmNvbnN0IGVycm9yID0gKG1lc3NhZ2U6IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSkgPT5cbiAgZGVidWdMZXZlbCAhPT0gJ25vbmUnICYmIGNvbnNvbGUuZXJyb3IoYFdQTEYgZXJyb3I6ICR7bWVzc2FnZX1gLCBwYXJhbXMpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbm90aWNlLFxuICBlcnJvcixcbn1cbiIsIi8qKlxuICogVHJ5aW5nIHRvIHJlYWQgdGhlIERPTSBpbW1lZGlhdGVseSBhZnRlciBzZXR0aW5nIGl0IGRvZXMgbm90IHdvcmsuIFRyeWluZyBvbiBuZXh0IHRpY2tcbiAqIGRvZXMuXG4gKi9cbmV4cG9ydCBjb25zdCB3YWl0Rm9yTmV4dFRpY2sgPSAoKSA9PlxuICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlKSlcblxuZXhwb3J0IGNvbnN0IHdhaXQgPSAobXMgPSA1MDApID0+XG4gIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSlcbiIsImltcG9ydCB7IFdQTEZfRm9ybSB9IGZyb20gJy4vY2xhc3Nlcy93cGxmLWZvcm0nXG5cbmV4cG9ydCBlbnVtIFN1Ym1pdFN0YXRlIHtcbiAgVW5zdWJtaXR0ZWQsXG4gIFN1Ym1pdHRpbmcsXG4gIFN1Y2Nlc3MsXG4gIEVycm9yLFxufVxuZXhwb3J0IHR5cGUgU3VibWl0SGFuZGxlciA9IChldmVudDogRXZlbnQpID0+IFByb21pc2U8dm9pZD5cbmV4cG9ydCB0eXBlIEZvcm1DYWxsYmFjayA9ICh3cGxmRm9ybTogV1BMRl9Gb3JtLCBwYXJhbXM6IExpc3Q8YW55PikgPT4gdm9pZFxuXG5leHBvcnQgaW50ZXJmYWNlIFdQTEZfVGFicyB7XG4gIHJlbWVtYmVyOiBib29sZWFuXG4gIGFjdGl2ZVRhYjogbnVsbCB8IHN0cmluZ1xuICByb290OiBIVE1MRWxlbWVudFxuICBuYW1lOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMaXN0PFQ+IHtcbiAgW2s6IHN0cmluZ106IFRcbn1cblxuZXhwb3J0IGVudW0gQXBpUmVzcG9uc2VLaW5kIHtcbiAgU3VibWlzc2lvbiA9ICdzdWJtaXNzaW9uJyxcbiAgUmVuZGVyID0gJ3JlbmRlcicsXG4gIEdldFN1Ym1pc3Npb25zID0gJ2dldHN1Ym1pc3Npb25zJyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSYXdBcGlSZXNwb25zZSB7XG4gIGhlYWRlcnM6IEhlYWRlcnNcbiAgc3RhdHVzOiBudW1iZXJcbiAgc3RhdHVzVGV4dDogc3RyaW5nXG4gIHVybDogc3RyaW5nXG4gIG9rOiBib29sZWFuXG4gIGRhdGE6IGFueVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1Ym1pdEFwaVJlc3BvbnNlIGV4dGVuZHMgUmF3QXBpUmVzcG9uc2Uge1xuICBraW5kOiBBcGlSZXNwb25zZUtpbmQuU3VibWlzc2lvblxuICBkYXRhOlxuICAgIHwgeyBlcnJvcjogc3RyaW5nOyBkYXRhOiBzdHJpbmcgfVxuICAgIHwge1xuICAgICAgICBzdWJtaXNzaW9uOiB7XG4gICAgICAgICAgSUQ6IG51bWJlclxuICAgICAgICB9XG4gICAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0U3VibWlzc2lvbnNBcGlSZXNwb25zZSBleHRlbmRzIFJhd0FwaVJlc3BvbnNlIHtcbiAga2luZDogQXBpUmVzcG9uc2VLaW5kLkdldFN1Ym1pc3Npb25zXG4gIGRhdGE6XG4gICAgfCB7IGVycm9yOiBzdHJpbmc7IGRhdGE6IHN0cmluZyB9XG4gICAgfCB7XG4gICAgICAgIHN1Ym1pc3Npb246IHtcbiAgICAgICAgICBJRDogbnVtYmVyXG4gICAgICAgIH1cbiAgICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJBcGlSZXNwb25zZSBleHRlbmRzIFJhd0FwaVJlc3BvbnNlIHtcbiAga2luZDogQXBpUmVzcG9uc2VLaW5kLlJlbmRlclxuICBkYXRhOlxuICAgIHwgeyBlcnJvcjogc3RyaW5nOyBkYXRhOiBzdHJpbmcgfVxuICAgIHwge1xuICAgICAgICBodG1sOiBzdHJpbmdcbiAgICAgICAgZm9ybToge1xuICAgICAgICAgIElEOiBudW1iZXJcbiAgICAgICAgICBwb3N0Q29udGFpbnNGaWxlSW5wdXRzOiB0cnVlXG4gICAgICAgICAgdGl0bGU6IHN0cmluZ1xuICAgICAgICB9XG4gICAgICB9XG59XG5cbmV4cG9ydCB0eXBlIEFwaVJlc3BvbnNlID1cbiAgfCBTdWJtaXRBcGlSZXNwb25zZVxuICB8IEdldFN1Ym1pc3Npb25zQXBpUmVzcG9uc2VcbiAgfCBSZW5kZXJBcGlSZXNwb25zZVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIC8vIFJlYWN0OiBSZWFjdCwgLy8gQHR5cGVzL3JlYWN0IGhhcyBpdCBoYW5kbGVkIGFscmVhZHlcbiAgICAvLyBXUExGOiBXUExGIC8vIFdlJ3JlIG5vdCBnb2luZyB0byB1c2Ugb3VyIG93biBsaWJyYXJ5IGZyb20gd2luZG93XG5cbiAgICAvLyBUaGlzIGNvbWVzIGZyb20gV29yZFByZXNzXG4gICAgd3BsZkRhdGE6IHtcbiAgICAgIGJhY2tlbmRVcmw6IHN0cmluZ1xuICAgICAgYXNzZXRzRGlyOiBzdHJpbmdcbiAgICAgIC8vIGZldGNoQ3JlZGVudGlhbHM6IHN0cmluZ1xuICAgICAgZmV0Y2hDcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyB8ICdpbmNsdWRlJyB8ICdvbWl0J1xuICAgICAgaTE4bjogTGlzdDxzdHJpbmc+XG4gICAgICBsYW5nPzogc3RyaW5nXG4gICAgICByZXF1ZXN0SGVhZGVyczoge1xuICAgICAgICAnWC1XUC1Ob25jZSc6IHN0cmluZ1xuICAgICAgICBbazogc3RyaW5nXTogYW55XG4gICAgICB9XG4gICAgICBzZXR0aW5nczoge1xuICAgICAgICBhdXRvaW5pdDogYm9vbGVhblxuICAgICAgICBkZWJ1Z0xldmVsOiBzdHJpbmdcbiAgICAgICAgaGFzVW5maWx0ZWRIdG1sOiBudW1iZXJcbiAgICAgICAgcGFyc2VMaWJyZWZvcm1zU2hvcnRjb2RlSW5SZXN0QXBpOiBib29sZWFuXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgV1BMRl9BZG1pbiBmcm9tICcuL2NsYXNzZXMvd3BsZi1hZG1pbidcbmltcG9ydCBXUExGIGZyb20gJy4vY2xhc3Nlcy93cGxmJ1xuaW1wb3J0ICcuLi9zdHlsZXMvd3BsZi1hZG1pbi5zY3NzJ1xuXG4vLyBXZWJwYWNrIGV4cG9zZXMgdGhlIGluc3RhbmNlIGluIHdpbmRvdy5XUExGLCBkbyBub3QgbG9hZCBhZG1pbiBhbmQgZnJvbnRlbmQgYnVuZGxlcyBhdCB0aGUgc2FtZSB0aW1lLlxuZXhwb3J0IGRlZmF1bHQgbmV3IFdQTEZfQWRtaW4obmV3IFdQTEYoKSlcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8qZ2xvYmFscyBzZWxmLCB3aW5kb3cgKi9cblwidXNlIHN0cmljdFwiXG5cbi8qZXNsaW50LWRpc2FibGUgQG15c3RpY2F0ZWEvcHJldHRpZXIgKi9cbmNvbnN0IHsgQWJvcnRDb250cm9sbGVyLCBBYm9ydFNpZ25hbCB9ID1cbiAgICB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOlxuICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOlxuICAgIC8qIG90aGVyd2lzZSAqLyB1bmRlZmluZWRcbi8qZXNsaW50LWVuYWJsZSBAbXlzdGljYXRlYS9wcmV0dGllciAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFib3J0Q29udHJvbGxlclxubW9kdWxlLmV4cG9ydHMuQWJvcnRTaWduYWwgPSBBYm9ydFNpZ25hbFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IEFib3J0Q29udHJvbGxlclxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9