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

var resetForm = function resetForm(wplfForm, params) {
  wplfForm.form.reset();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9XUExGL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9XUExGL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc2NyaXB0cy9jbGFzc2VzL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2NsYXNzZXMvd3BsZi1hZGRvbnMudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2NsYXNzZXMvd3BsZi1hZG1pbi5qcyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvY2xhc3Nlcy93cGxmLWVkaXRvci5qcyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvY2xhc3Nlcy93cGxmLWZvcm0udHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2NsYXNzZXMvd3BsZi1zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvY2xhc3Nlcy93cGxmLXRhYnMudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2NsYXNzZXMvd3BsZi50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvbGliL2FwaS1jbGllbnQudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2xpYi9lbnN1cmUtbnVtLnRzIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc2NyaXB0cy9saWIvZ2xvYmFsLWRhdGEudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL2xpYi9pcy1lbGVtZW50aXNoLnRzIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc2NyaXB0cy9saWIvbG9nLnRzIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc2NyaXB0cy9saWIvd2FpdC50cyIsIndlYnBhY2s6Ly9XUExGLy4vYXNzZXRzL3NjcmlwdHMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vV1BMRi8uL2Fzc2V0cy9zY3JpcHRzL3dwbGYtYWRtaW4tYnVuZGxlLnRzIiwid2VicGFjazovL1dQTEYvLi9hc3NldHMvc3R5bGVzL3dwbGYtYWRtaW4uc2Nzcz9kMzEwIiwid2VicGFjazovL1dQTEYvLi9ub2RlX21vZHVsZXMvYWJvcnQtY29udHJvbGxlci9icm93c2VyLmpzIiwid2VicGFjazovL1dQTEYvLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIl0sIm5hbWVzIjpbIldQTEZfQWRtaW4iLCJ3cGxmSW5zdGFuY2UiLCJ0YWJzIiwiQXJyYXkiLCJmcm9tIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibWFwIiwiZWwiLCJXUExGX1RhYnMiLCJnZXRBdHRyaWJ1dGUiLCJjbGFzc0xpc3QiLCJib2R5IiwiY29udGFpbnMiLCJlZGl0b3IiLCJXUExGX0VkaXRvciIsInNldHRpbmdzIiwiV1BMRl9TZXR0aW5ncyIsImFkZG9ucyIsIldQTEZfQWRkb25zIiwiY3JlYXRlQXBpQ2xpZW50IiwiYWJvcnQiLCJyZXF1ZXN0Iiwic2lnbmFsIiwiaTE4biIsImdsb2JhbERhdGEiLCIkIiwid2luZG93IiwialF1ZXJ5IiwiXyIsIndwIiwiZXh0cmFjdEZpZWxkRGF0YUZyb21FbGVtZW50IiwibmFtZSIsInJlcGxhY2UiLCJ0eXBlIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwicmVxdWlyZWQiLCJtdWx0aXBsZSIsImVuZHNXaXRoIiwiZmllbGRzIiwicXVlcnlTZWxlY3RvciIsImFkZGl0aW9uYWxGaWVsZHMiLCJuZXdGaWVsZHMiLCJkZWxldGVkRmllbGRzIiwiaGlzdG9yeUZpZWxkcyIsImFsbG93U2F2ZSIsImVkaXRvckVsIiwidGhhbmtZb3VFbCIsInByZXZpZXdFbCIsImluaXRpYWxTdGF0ZSIsIkpTT04iLCJwYXJzZSIsInZhbHVlIiwiY29uc29sZSIsImxvZyIsIndwbGYiLCJzdGF0ZSIsImlucHV0cyIsImZpZWxkVGVtcGxhdGUiLCJjbG9uZU5vZGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJwdWJsaXNoQnV0dG9uIiwiY29udGVudEVkaXRvciIsImNvZGVFZGl0b3IiLCJpbml0aWFsaXplIiwiY29kZU1pcnJvciIsInN1Y2Nlc3NNZXNzYWdlRWRpdG9yIiwiaGFuZGxlQ29udGVudENoYW5nZSIsImJpbmQiLCJjb2RlbWlycm9yIiwib24iLCJkZWJvdW5jZSIsImhhc1VuZmlsdGVyZWRIdG1sIiwidHJ5VG9QcmV2ZW50RWRpdCIsImZuIiwiY3VycmVudFN0YXRlIiwibmV3U3RhdGUiLCJhZnRlclN0YXRlQ2hhbmdlIiwiT2JqZWN0IiwiZW50cmllcyIsImZvckVhY2giLCJrZXkiLCJzdHJpbmdpZnkiLCJnZXRTdGF0ZSIsImsiLCJ2Iiwid3JpdGVTdGF0ZSIsInNldEF0dHJpYnV0ZSIsInByb3AiLCJyZW1vdmUiLCJmb3JtSW5zdGFuY2UiLCJjb250ZW50IiwiZ2V0VmFsdWUiLCJkZXRhY2giLCJzZXRTdGF0ZSIsInVwZGF0ZVByZXZpZXciLCJ1cGRhdGVGb3JtRmllbGRzRnJvbVByZXZpZXciLCJyZW1vdmVQcm9ibGVtYXRpY0F0dHJpYnV0ZXNGcm9tUHJldmlldyIsImF0dGFjaCIsImVycm9yIiwidG1wRWwiLCJjcmVhdGVFbGVtZW50IiwiZm9ybUlkIiwicGFyc2VJbnQiLCJGb3JtRGF0YSIsImFwcGVuZCIsImxhbmciLCJvYmplY3QiLCJtZXRob2QiLCJkYXRhIiwiaHRtbCIsImlubmVySFRNTCIsIndhaXRGb3JOZXh0VGljayIsIm5hbWVzIiwidW5pcXVlIiwiZmlsdGVyIiwibiIsImxlbmd0aCIsImZpZWxkIiwiZXJyb3JNZXNzYWdlIiwiZWxlbWVudCIsInQiLCJhbGVydCIsImlubmVyVGV4dCIsIm1lc3NhZ2VzIiwibWVzc2FnZSIsInByb2JsZW1zIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiZmllbGRDb250YWluZXIiLCJmaWVsZE5hbWVzIiwiZHVwbGljYXRlTmFtZXMiLCJnZXREdXBsaWNhdGVOYW1lcyIsImZpZWxkRXJyb3JzIiwiaGlzdG9yeUZpZWxkIiwidmFsdWVzIiwiZmluZCIsIm1hdGNoIiwiZ3JvdXBlZE5hbWVzTm90U3VwcG9ydGVkWWV0IiwiaW5jbHVkZXMiLCJkdXBsaWNhdGVGaWVsZE5hbWUiLCJpbGxlZ2FsTmFtZSIsImZpZWxkQWxyZWFkeUV4aXN0c0luRGIiLCJwdXNoIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVGaWVsZEVsZW1lbnQiLCJmaWVsZEluSW5pdGlhbERhdGEiLCJ4IiwicmVxdWlyZWRFbHMiLCJuYW1lRWxzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOztJQUdNLE87QUFHSixxQkFBMkI7QUFBQSxRQUFmLE1BQWUsdUVBQU4sTUFBTTs7QUFBQTs7QUFDekIs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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsS0FBMEIsb0JBQW9CLFNBQUU7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IndwbGYtYWRtaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJXUExGXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIldQTEZcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgbG9nIGZyb20gJy4uL2xpYi9sb2cnXG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi4vdHlwZXMnXG5cbmNsYXNzIFN0b3JhZ2Uge1xuICBwcmVmaXg6IHN0cmluZ1xuXG4gIGNvbnN0cnVjdG9yKHByZWZpeCA9ICd3cGxmJykge1xuICAgIHRoaXMucHJlZml4ID0gcHJlZml4XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogYW55KSB7XG4gICAgY29uc3QgZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMucHJlZml4ICsga2V5KVxuXG4gICAgaWYgKGRhdGEgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZGF0YSA/IEpTT04ucGFyc2UoZGF0YSkgOiBkYXRhXG5cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2cubm90aWNlKFxuICAgICAgICBgTm8gdmFsdWUgZm91bmQgZm9yICR7a2V5fSwgZmFsbGluZyBiYWNrIHRvIGRlZmF1bHRgLFxuICAgICAgICBkZWZhdWx0VmFsdWVcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICAgIH1cbiAgfVxuXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnByZWZpeCArIGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZy5lcnJvcihlLCBrZXksIHZhbHVlKVxuXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFN0b3JhZ2UoKVxuIiwiLy8gY29uc3QgJCA9IHdpbmRvdy5qUXVlcnlcbi8vIGNvbnN0IF8gPSB3aW5kb3cuX1xuLy8gY29uc3Qgd3AgPSB3aW5kb3cud3BcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1BMRl9BZGRvbnMge1xuICBjb25zdHJ1Y3RvcigpIHt9XG59XG4iLCJpbXBvcnQgV1BMRl9FZGl0b3IgZnJvbSAnLi93cGxmLWVkaXRvcidcbmltcG9ydCBXUExGX1NldHRpbmdzIGZyb20gJy4vd3BsZi1zZXR0aW5ncydcbmltcG9ydCBXUExGX0FkZG9ucyBmcm9tICcuL3dwbGYtYWRkb25zJ1xuaW1wb3J0IFdQTEZfVGFicyBmcm9tICcuL3dwbGYtdGFicydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1BMRl9BZG1pbiB7XG4gIGVkaXRvclxuICBhZGRvbnNcbiAgc2V0dGluZ3NcbiAgdGFic1xuXG4gIGNvbnN0cnVjdG9yKHdwbGZJbnN0YW5jZSkge1xuICAgIHRoaXMudGFicyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndwbGYtdGFicycpKS5tYXAoZWwgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBXUExGX1RhYnMoZWwsIGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnKSwgZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXJlbWVtYmVyJykpXG4gICAgfSlcblxuICAgIC8vIEluaXQgc3R1ZmYgYmFzZWQgb24gd2hhdCBwYWdlIHdlJ3JlIG9uXG4gICAgY29uc3QgY2xhc3NMaXN0ID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3RcblxuICAgIGlmIChjbGFzc0xpc3QuY29udGFpbnMoJ3Bvc3QtdHlwZS1saWJyZWZvcm0nKSAmJiAoY2xhc3NMaXN0LmNvbnRhaW5zKCdwb3N0LXBocCcpIHx8IGNsYXNzTGlzdC5jb250YWlucygncG9zdC1uZXctcGhwJykpKSB7XG4gICAgICB0aGlzLmVkaXRvciA9IG5ldyBXUExGX0VkaXRvcih3cGxmSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKCdsaWJyZWZvcm1fcGFnZV93cGxmU2V0dGluZ3MnKSkge1xuICAgICAgLy8gSW4gc2V0dGluZ3MgcGFnZVxuICAgICAgdGhpcy5zZXR0aW5ncyA9IG5ldyBXUExGX1NldHRpbmdzKHdwbGZJbnN0YW5jZSlcbiAgICB9IGVsc2UgaWYgKGNsYXNzTGlzdC5jb250YWlucygnbGlicmVmb3JtX3BhZ2Vfd3BsZkFkZG9ucycpKSB7XG4gICAgICB0aGlzLmFkZG9ucyA9IG5ldyBXUExGX0FkZG9ucyh3cGxmSW5zdGFuY2UpXG4gICAgfVxuICB9XG5cbiAgZ2V0RWRpdG9yKCkge1xuICAgIHJldHVybiB0aGlzLmVkaXRvclxuICB9XG5cbiAgZ2V0QWRkb25zKCkge1xuICAgIHJldHVybiB0aGlzLmFkZG9uc1xuICB9XG5cbiAgZ2V0U2V0dGluZ3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3NcbiAgfVxuXG4gIGdldFRhYnMoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFic1xuICB9XG59IiwiaW1wb3J0IGdsb2JhbERhdGEgZnJvbSAnLi4vbGliL2dsb2JhbC1kYXRhJ1xuaW1wb3J0IGNyZWF0ZUFwaUNsaWVudCBmcm9tICcuLi9saWIvYXBpLWNsaWVudCdcbmltcG9ydCBsb2cgZnJvbSAnLi4vbGliL2xvZydcbmltcG9ydCB7IHdhaXRGb3JOZXh0VGljayB9IGZyb20gJy4uL2xpYi93YWl0J1xuXG5jb25zdCB7IGFib3J0LCByZXF1ZXN0LCBzaWduYWwgfSA9IGNyZWF0ZUFwaUNsaWVudCgpXG5jb25zdCB7IGkxOG4gfSA9IGdsb2JhbERhdGFcblxuY29uc3QgJCA9IHdpbmRvdy5qUXVlcnlcbmNvbnN0IF8gPSB3aW5kb3cuX1xuY29uc3Qgd3AgPSB3aW5kb3cud3BcblxuY29uc3QgZXh0cmFjdEZpZWxkRGF0YUZyb21FbGVtZW50ID0gKGVsKSA9PiB7XG4gIC8qKlxuICAgKiBCcmFja2V0cyBpbiB0aGUgZmllbGQgbmFtZSBhcmUgZnVuLiBUaGV5IGFyZSBub3QgcHJlc2VudCBpbiB0aGUgc3VibWl0dGVkIGRhdGEsXG4gICAqIHdoaWNoIGNhdXNlcyB2YWxpZGF0aW9uIGVycm9ycy5cbiAgICovXG4gIGNvbnN0IG5hbWUgPSBlbC5nZXRBdHRyaWJ1dGUoJ25hbWUnKS5yZXBsYWNlKCdbXScsICcnKVxuICBjb25zdCB0eXBlID0gZWwuZ2V0QXR0cmlidXRlKCd0eXBlJykgfHwgZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gIGNvbnN0IHJlcXVpcmVkID0gZWwuZ2V0QXR0cmlidXRlKCdyZXF1aXJlZCcpICE9PSBudWxsID8gdHJ1ZSA6IGZhbHNlXG4gIGNvbnN0IG11bHRpcGxlID0gZWwuZ2V0QXR0cmlidXRlKCduYW1lJykuZW5kc1dpdGgoJ1tdJylcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgdHlwZSxcbiAgICByZXF1aXJlZCxcbiAgICBtdWx0aXBsZSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXUExGX0VkaXRvciB7XG4gIHdwbGZcbiAgc3RhdGVcbiAgY29udGVudEVkaXRvclxuICBzdWNjZXNzTWVzc2FnZUVkaXRvclxuICBmb3JtSW5zdGFuY2VcbiAgaW5wdXRzID0ge31cbiAgcHJldmlld0VsXG4gIHB1Ymxpc2hCdXR0b25cbiAgZmllbGRUZW1wbGF0ZVxuXG4gIGNvbnN0cnVjdG9yKHdwbGZJbnN0YW5jZSkge1xuICAgIGNvbnN0IGZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cGxmRmllbGRzJylcbiAgICBjb25zdCBhZGRpdGlvbmFsRmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dwbGZBZGRpdGlvbmFsRmllbGRzJylcbiAgICBjb25zdCBuZXdGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3BsZk5ld0ZpZWxkcycpXG4gICAgY29uc3QgZGVsZXRlZEZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cGxmRGVsZXRlZEZpZWxkcycpXG4gICAgY29uc3QgaGlzdG9yeUZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cGxmSGlzdG9yeUZpZWxkcycpXG4gICAgY29uc3QgYWxsb3dTYXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dwbGZBbGxvd1NhdmUnKVxuICAgIGNvbnN0IGVkaXRvckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwbGYtZWRpdG9yIC53cGxmLWNtRWRpdG9yJylcbiAgICBjb25zdCB0aGFua1lvdUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwbGYtYWZ0ZXJTdWJtaXNzaW9uIC53cGxmLWNtRWRpdG9yJylcbiAgICBjb25zdCBwcmV2aWV3RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BsZi1lZGl0b3JfX3ByZXZpZXcnKVxuXG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgaGlzdG9yeUZpZWxkczogSlNPTi5wYXJzZShoaXN0b3J5RmllbGRzLnZhbHVlKSwgLy8gXCJkb2VzIG5vdCBjaGFuZ2VcIlxuXG4gICAgICBmaWVsZHM6IEpTT04ucGFyc2UoZmllbGRzLnZhbHVlKSxcbiAgICAgIGFkZGl0aW9uYWxGaWVsZHM6IEpTT04ucGFyc2UoYWRkaXRpb25hbEZpZWxkcy52YWx1ZSksXG4gICAgICBuZXdGaWVsZHM6IFtdLFxuICAgICAgZGVsZXRlZEZpZWxkczogW10sXG4gICAgICBhbGxvd1NhdmU6IGZhbHNlLFxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGluaXRpYWxTdGF0ZSlcblxuICAgIHRoaXMud3BsZiA9IHdwbGZJbnN0YW5jZVxuICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGVcbiAgICB0aGlzLmlucHV0cyA9IHtcbiAgICAgIGZpZWxkcyxcbiAgICAgIGFkZGl0aW9uYWxGaWVsZHMsXG4gICAgICBuZXdGaWVsZHMsXG4gICAgICBkZWxldGVkRmllbGRzLFxuICAgICAgaGlzdG9yeUZpZWxkcyxcbiAgICAgIGFsbG93U2F2ZSxcbiAgICB9XG4gICAgdGhpcy5maWVsZFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwbGYtZm9ybUZpZWxkcyA+IC53cGxmLWZvcm1GaWVsZHNfX2ZpZWxkJykuY2xvbmVOb2RlKHRydWUpXG4gICAgdGhpcy5maWVsZFRlbXBsYXRlLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJylcblxuICAgIHRoaXMucHJldmlld0VsID0gcHJldmlld0VsXG4gICAgdGhpcy5wdWJsaXNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3B1Ymxpc2gnKVxuICAgIHRoaXMuY29udGVudEVkaXRvciA9IHdwLmNvZGVFZGl0b3IuaW5pdGlhbGl6ZSgkKGVkaXRvckVsKSwgZ2xvYmFsRGF0YS5jb2RlTWlycm9yKVxuICAgIHRoaXMuc3VjY2Vzc01lc3NhZ2VFZGl0b3IgPSB3cC5jb2RlRWRpdG9yLmluaXRpYWxpemUoJCh0aGFua1lvdUVsKSwgZ2xvYmFsRGF0YS5jb2RlTWlycm9yKVxuICAgIHRoaXMuaGFuZGxlQ29udGVudENoYW5nZSA9IHRoaXMuaGFuZGxlQ29udGVudENoYW5nZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5jb250ZW50RWRpdG9yLmNvZGVtaXJyb3Iub24oJ2NoYW5nZXMnLCBfLmRlYm91bmNlKHRoaXMuaGFuZGxlQ29udGVudENoYW5nZSwgMTAwMCkpXG4gICAgdGhpcy5oYW5kbGVDb250ZW50Q2hhbmdlKHRoaXMuY29udGVudEVkaXRvci5jb2RlbWlycm9yKSAvLyBUcmlnZ2VycyBwcmV2aWV3IGJ1aWxkXG5cbiAgICBpZiAoIWdsb2JhbERhdGEuc2V0dGluZ3MuaGFzVW5maWx0ZXJlZEh0bWwpIHtcbiAgICAgIHRoaXMudHJ5VG9QcmV2ZW50RWRpdCgpXG4gICAgfVxuICB9XG5cbiAgc2V0U3RhdGUoZm4gPSAoKSA9PiBudWxsKSB7XG4gICAgY29uc3QgY3VycmVudFN0YXRlID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IG5ld1N0YXRlID0gZm4oY3VycmVudFN0YXRlKVxuXG4gICAgaWYgKCFuZXdTdGF0ZSkge1xuICAgICAgLy8gbm8gb3BcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAuLi5jdXJyZW50U3RhdGUsXG4gICAgICAuLi5uZXdTdGF0ZSxcbiAgICB9XG5cbiAgICB0aGlzLmFmdGVyU3RhdGVDaGFuZ2UoKVxuICB9XG5cbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVcbiAgfVxuXG4gIHdyaXRlU3RhdGUoKSB7XG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5pbnB1dHMpLmZvckVhY2goKFtrZXksIGVsXSkgPT4ge1xuICAgICAgaWYgKHRoaXMuc3RhdGVba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc3RhdGVba2V5XVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWUgPyAnMScgOiAnMCdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGFmdGVyU3RhdGVDaGFuZ2UoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKClcblxuICAgIE9iamVjdC5lbnRyaWVzKHN0YXRlKS5mb3JFYWNoKChbaywgdl0pID0+IHtcbiAgICAgIHN3aXRjaCAoaykge1xuICAgICAgICBjYXNlICdhbGxvd1NhdmUnOiB7XG4gICAgICAgICAgdGhpcy53cml0ZVN0YXRlKClcblxuICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICB0aGlzLnB1Ymxpc2hCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHVibGlzaEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBubyBkZWZhdWx0LCB5ZXRcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIERpc2FibGUgYnVuY2ggb2YgdGhpbmdzIGFuZCByZW1vdmUgdGhlIHN1Ym1pdCBidXR0b24sXG4gICAqIGJhY2tlbmQgd2lsbCBoYW5kbGUgaXQgaWYgbmVjZXNzYXJ5IGJ1dCBpdCdzIG5vdCBwcmV0dHkuXG4gICAqIEJhY2tlbmQgc2hvdWxkIGFsc28gcHJpbnQgYSBub3RpY2UgYWJvdmUgdGhlIGZvcm0uXG4gICAqL1xuICB0cnlUb1ByZXZlbnRFZGl0KCkge1xuICAgIC8vIE1pZ2h0IGFzIHdlbGwgdXNlIHRoZSBqUXVlcnkgc2luY2UgaXQncyB3cC1hZG1pblxuICAgICQoJyN0aXRsZScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSlcbiAgICAkKCcjY29udGVudCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSlcbiAgICAkKCcjcHVibGlzaCcpLnJlbW92ZSgpXG4gICAgJCgnI3NhdmUtcG9zdCcpLnJlbW92ZSgpXG4gIH1cblxuICBhc3luYyBoYW5kbGVDb250ZW50Q2hhbmdlKGVkaXRvcikge1xuICAgIGxldCB7IHdwbGYsIGZvcm1JbnN0YW5jZSB9ID0gdGhpc1xuICAgIGNvbnN0IGNvbnRlbnQgPSBlZGl0b3IuZ2V0VmFsdWUoKVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmZvcm1JbnN0YW5jZSkge1xuICAgICAgICB3cGxmLmRldGFjaChmb3JtSW5zdGFuY2UpXG4gICAgICB9XG5cbiAgICAgIC8vIERpc2FibGUgc3VibWl0IGJ1dHRvbiB3aGVuIHRoZSBmaWVsZHMgY2hhbmdlXG4gICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7IGFsbG93U2F2ZTogZmFsc2UgfSkpXG5cbiAgICAgIGF3YWl0IHRoaXMudXBkYXRlUHJldmlldyhjb250ZW50KVxuICAgICAgYXdhaXQgdGhpcy51cGRhdGVGb3JtRmllbGRzRnJvbVByZXZpZXcoKVxuICAgICAgYXdhaXQgdGhpcy5yZW1vdmVQcm9ibGVtYXRpY0F0dHJpYnV0ZXNGcm9tUHJldmlldygpXG4gICAgICB0aGlzLndyaXRlU3RhdGUoKVxuICAgICAgZm9ybUluc3RhbmNlID0gd3BsZi5hdHRhY2godGhpcy5wcmV2aWV3RWwpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nLmVycm9yKCdGYWlsZWQgdG8gZ2V0IHByZXZpZXcnLCBlKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZVByZXZpZXcoY29udGVudCkge1xuICAgIGNvbnN0IHRtcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb25zdCBmb3JtSWQgPSBwYXJzZUludChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicG9zdF9JRFwiXScpLnZhbHVlLCAxMClcbiAgICBjb25zdCBib2R5ID0gbmV3IEZvcm1EYXRhKClcbiAgICBib2R5LmFwcGVuZCgnY29udGVudCcsIGNvbnRlbnQpXG4gICAgYm9keS5hcHBlbmQoJ2Zvcm1JZCcsIGZvcm1JZClcblxuICAgIGdsb2JhbERhdGEubGFuZyAmJiBib2R5LmFwcGVuZCgnbGFuZycsIGdsb2JhbERhdGEubGFuZylcblxuICAgIGxldCBvYmplY3QgPSB7fVxuICAgIGJvZHkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZVxuICAgIH0pXG5cbiAgICBjb25zb2xlLmxvZygncHJldmlldyByZXEgYm9keScsIG9iamVjdClcblxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcmVxdWVzdCgnL3JlbmRlcicsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keSxcbiAgICB9KVxuICAgIGNvbnN0IHsgaHRtbCB9ID0gZGF0YVxuXG4gICAgdG1wRWwuaW5uZXJIVE1MID0gaHRtbFxuXG4gICAgYXdhaXQgd2FpdEZvck5leHRUaWNrKClcblxuICAgIHRoaXMucHJldmlld0VsLmlubmVySFRNTCA9IHRtcEVsLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKS5pbm5lckhUTUxcblxuICAgIGF3YWl0IHdhaXRGb3JOZXh0VGljaygpXG4gIH1cblxuICBnZXREdXBsaWNhdGVOYW1lcyhuYW1lcykge1xuICAgIHJldHVybiBfLnVuaXF1ZShcbiAgICAgIG5hbWVzLmZpbHRlcigobmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gbmFtZXMuZmlsdGVyKChuKSA9PiBuID09PSBuYW1lKS5sZW5ndGggPiAxXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIGNyZWF0ZUZpZWxkRWxlbWVudChmaWVsZCwgZXJyb3JNZXNzYWdlKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZmllbGRUZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSlcbiAgICBjb25zdCB7IG5hbWUsIHR5cGUsIHJlcXVpcmVkIH0gPSBmaWVsZFxuICAgIGNvbnN0IG4gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0cm9uZycpXG4gICAgY29uc3QgdCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLndwbGYtZm9ybUZpZWxkc19fZmllbGRfX3R5cGUgZW0nKVxuICAgIGNvbnN0IGFsZXJ0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud3BsZi1mb3JtRmllbGRzX19maWVsZF9fYWxlcnQnKVxuXG4gICAgbi5pbm5lclRleHQgPSBuYW1lXG4gICAgdC5pbm5lclRleHQgPSByZXF1aXJlZCA/IGByZXF1aXJlZCAke3R5cGV9YCA6IHR5cGVcblxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIGFsZXJ0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCBlcnJvck1lc3NhZ2UpXG5cbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICBjb25zdCBtZXNzYWdlID0gYDxzdHJvbmc+JHtpMThuLnByb2JsZW1zfTwvc3Ryb25nPiR7ZXJyb3JNZXNzYWdlfWAucmVwbGFjZSgvKD86XFxyXFxufFxccnxcXG4pL2csICc8YnI+JylcbiAgICAgIG1lc3NhZ2VzLmlubmVySFRNTCA9IG1lc3NhZ2VcblxuICAgICAgYWxlcnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIG1lc3NhZ2VzKVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGFsZXJ0KVxuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50XG4gIH1cblxuICBhc3luYyB1cGRhdGVGb3JtRmllbGRzRnJvbVByZXZpZXcoKSB7XG4gICAgY29uc3QgeyBoaXN0b3J5RmllbGRzLCBhZGRpdGlvbmFsRmllbGRzIH0gPSB0aGlzLmdldFN0YXRlKClcbiAgICBjb25zdCBlbCA9IHRoaXMucHJldmlld0VsXG4gICAgY29uc3QgZmllbGRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BsZi1mb3JtRmllbGRzJylcblxuICAgIGxldCBhbGxvd1NhdmUgPSB0cnVlXG5cbiAgICAvLyBHZXQgYWxsIGlucHV0cyB3aXRoIGEgbmFtZSBhdHRyaWJ1dGUsIHllcywgZXZlbiBidXR0b24uXG4gICAgY29uc3QgZmllbGRzID0gQXJyYXkuZnJvbShlbC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYnV0dG9uJykpXG4gICAgICAuZmlsdGVyKChlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKCduYW1lJykpXG4gICAgICAubWFwKGV4dHJhY3RGaWVsZERhdGFGcm9tRWxlbWVudClcblxuICAgIGNvbnN0IGZpZWxkTmFtZXMgPSBmaWVsZHMubWFwKChmaWVsZCkgPT4gZmllbGQubmFtZSlcbiAgICBjb25zdCBkdXBsaWNhdGVOYW1lcyA9IHRoaXMuZ2V0RHVwbGljYXRlTmFtZXMoZmllbGROYW1lcylcblxuICAgIGZpZWxkQ29udGFpbmVyLmlubmVySFRNTCA9ICcnXG5cbiAgICBjb25zdCBmaWVsZEVycm9ycyA9IFtdXG4gICAgZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICBjb25zdCB7IG5hbWUsIHR5cGUgfSA9IGZpZWxkXG4gICAgICBjb25zdCBoaXN0b3J5RmllbGQgPSBPYmplY3QudmFsdWVzKGhpc3RvcnlGaWVsZHMpLmZpbmQoKGZpZWxkKSA9PiBmaWVsZC5uYW1lID09PSBuYW1lKVxuICAgICAgbGV0IGVycm9yTWVzc2FnZSA9ICcnXG5cbiAgICAgIC8vIG5hbWVzIGxpa2UgZmllbGRncm91cFtmaWVsZG5hbWVdIGFyZSBub3Qgc3VwcG9ydGVkIHlldFxuICAgICAgaWYgKG5hbWUubWF0Y2goL1xcdypcXFtcXHcqXFxdLykpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gYCR7ZXJyb3JNZXNzYWdlfSR7aTE4bi5ncm91cGVkTmFtZXNOb3RTdXBwb3J0ZWRZZXR9XFxuYFxuICAgICAgfVxuXG4gICAgICBpZiAoZHVwbGljYXRlTmFtZXMgJiYgZHVwbGljYXRlTmFtZXMuaW5jbHVkZXMobmFtZSkpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gYCR7ZXJyb3JNZXNzYWdlfSR7aTE4bi5kdXBsaWNhdGVGaWVsZE5hbWV9ICR7bmFtZX1cXG5gXG4gICAgICB9XG5cbiAgICAgIGlmIChhZGRpdGlvbmFsRmllbGRzLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IGAke2Vycm9yTWVzc2FnZX0ke2kxOG4uaWxsZWdhbE5hbWUucmVwbGFjZSgne25hbWV9JywgbmFtZSl9XFxuYFxuICAgICAgfVxuXG4gICAgICBpZiAoaGlzdG9yeUZpZWxkICYmIGhpc3RvcnlGaWVsZC50eXBlICE9PSB0eXBlKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IGAke2Vycm9yTWVzc2FnZX0ke2kxOG4uZmllbGRBbHJlYWR5RXhpc3RzSW5EYi5yZXBsYWNlKCd7dHlwZX0nLCBoaXN0b3J5RmllbGQudHlwZSl9XFxuYFxuICAgICAgfVxuXG4gICAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIGZpZWxkRXJyb3JzLnB1c2goZXJyb3JNZXNzYWdlKVxuICAgICAgfVxuXG4gICAgICBmaWVsZENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZUZpZWxkRWxlbWVudChmaWVsZCwgZXJyb3JNZXNzYWdlKSlcbiAgICB9KVxuXG4gICAgaWYgKCFmaWVsZEVycm9ycy5sZW5ndGgpIHtcbiAgICAgIGFsbG93U2F2ZSA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgYWxsb3dTYXZlID0gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBuZXdGaWVsZHMgPSBmaWVsZHMuZmlsdGVyKChmaWVsZCkgPT4ge1xuICAgICAgY29uc3QgZmllbGRJbkluaXRpYWxEYXRhID0gT2JqZWN0LnZhbHVlcyhoaXN0b3J5RmllbGRzKS5maW5kKCh4KSA9PiB4Lm5hbWUgPT09IGZpZWxkLm5hbWUpXG5cbiAgICAgIHJldHVybiBmaWVsZEluSW5pdGlhbERhdGEgPyBmYWxzZSA6IHRydWVcbiAgICB9KVxuXG4gICAgY29uc3QgZGVsZXRlZEZpZWxkcyA9IE9iamVjdC52YWx1ZXMoaGlzdG9yeUZpZWxkcykuZmlsdGVyKChmaWVsZCkgPT4ge1xuICAgICAgcmV0dXJuICFmaWVsZE5hbWVzLmluY2x1ZGVzKGZpZWxkLm5hbWUpXG4gICAgfSlcblxuICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcbiAgICAgIGZpZWxkcyxcbiAgICAgIG5ld0ZpZWxkcyxcbiAgICAgIGRlbGV0ZWRGaWVsZHMsXG4gICAgICBhbGxvd1NhdmUsXG4gICAgfSkpXG5cbiAgICBhd2FpdCB3YWl0Rm9yTmV4dFRpY2soKVxuICB9XG5cbiAgYXN5bmMgcmVtb3ZlUHJvYmxlbWF0aWNBdHRyaWJ1dGVzRnJvbVByZXZpZXcoKSB7XG4gICAgLy8gTmFtZXMgYW5kIHJlcXVpcmVkIGF0dHJpYnV0ZXMgY2F1c2UgcHJvYmxlbXMgd2hlbiBzYXZpbmcgdGhlIGZvcm0sIHJlbW92ZVxuICAgIGNvbnN0IHJlcXVpcmVkRWxzID0gQXJyYXkuZnJvbSh0aGlzLnByZXZpZXdFbC5xdWVyeVNlbGVjdG9yQWxsKCdbcmVxdWlyZWRdJykpXG4gICAgY29uc3QgbmFtZUVscyA9IEFycmF5LmZyb20odGhpcy5wcmV2aWV3RWwucXVlcnlTZWxlY3RvckFsbCgnW25hbWVdJykpXG5cbiAgICByZXF1aXJlZEVscy5mb3JFYWNoKChlbCkgPT4gZWwucmVtb3ZlQXR0cmlidXRlKCdyZXF1aXJlZCcpKVxuICAgIG5hbWVFbHMuZm9yRWFjaCgoZWwpID0+IGVsLnJlbW92ZUF0dHJpYnV0ZSgnbmFtZScpKVxuXG4gICAgYXdhaXQgd2FpdEZvck5leHRUaWNrKClcbiAgfVxufVxuIiwiaW1wb3J0IGdsb2JhbERhdGEgZnJvbSAnLi4vbGliL2dsb2JhbC1kYXRhJ1xuaW1wb3J0IGNyZWF0ZUFwaUNsaWVudCBmcm9tICcuLi9saWIvYXBpLWNsaWVudCdcbmltcG9ydCBsb2cgZnJvbSAnLi4vbGliL2xvZydcblxuaW1wb3J0IFdQTEZfVGFicyBmcm9tICcuL3dwbGYtdGFicydcblxuaW1wb3J0IHtcbiAgU3VibWl0U3RhdGUsXG4gIFN1Ym1pdEhhbmRsZXIsXG4gIEZvcm1DYWxsYmFjayxcbiAgLy8gRm9ybVN1Y2Nlc3NDYWxsYmFjayxcbiAgLy8gRm9ybUVycm9yQ2FsbGJhY2ssXG4gIExpc3QsXG4gIEFwaVJlc3BvbnNlS2luZCxcbn0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgaXNFbGVtZW50aXNoIGZyb20gJy4uL2xpYi9pcy1lbGVtZW50aXNoJ1xuaW1wb3J0IHdwbGZGcm9udGVuZCBmcm9tICcuLi8uLi8uLi9kaXN0L3dwbGYtZnJvbnRlbmQnXG5cbmNvbnN0IHsgcmVxdWVzdCB9ID0gY3JlYXRlQXBpQ2xpZW50KClcblxuY29uc3QgcmVzZXRGb3JtID0gKHdwbGZGb3JtOiBXUExGX0Zvcm0sIHBhcmFtczogTGlzdDxhbnk+KSA9PiB7XG4gIHdwbGZGb3JtLmZvcm0ucmVzZXQoKVxufVxuXG5jb25zdCBkZWZhdWx0QmVmb3JlU2VuZENhbGxiYWNrID0gKHdwbGZGb3JtOiBXUExGX0Zvcm0sIHBhcmFtczogTGlzdDxhbnk+KSA9PiB7XG4gIGlmIChpc0VsZW1lbnRpc2god3BsZkZvcm0uZm9ybS5wYXJlbnROb2RlKSkge1xuICAgIGNvbnN0IHBhcmVudE5vZGUgPSB3cGxmRm9ybS5mb3JtLnBhcmVudE5vZGVcblxuICAgIC8vIFJlc2V0IGVycm9yIGFuZCBzdWNjZXNzIG1lc3NhZ2VzLCBpZiB0aGVyZSB3ZXJlIGFueVxuICAgIGNvbnN0IG1lc3NhZ2VzID0gcGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgJy53cGxmLWVycm9yTWVzc2FnZSwgLndwbGYtc3VjY2Vzc01lc3NhZ2UnXG4gICAgKVxuXG4gICAgbWVzc2FnZXMuZm9yRWFjaCgoZWxlbWVudDogRWxlbWVudCkgPT4ge1xuICAgICAgaWYgKGlzRWxlbWVudGlzaChlbGVtZW50LnBhcmVudE5vZGUpKSB7XG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuY29uc3QgZGVmYXVsdFN1Y2Nlc3NDYWxsYmFjayA9ICh3cGxmRm9ybTogV1BMRl9Gb3JtLCBwYXJhbXM6IExpc3Q8YW55PikgPT4ge1xuICBjb25zdCB7IGRhdGEgfSA9IHBhcmFtc1xuICBjb25zdCB7IG1lc3NhZ2UgfSA9IGRhdGFcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBkaXYuY2xhc3NMaXN0LmFkZCgnd3BsZi1zdWNjZXNzTWVzc2FnZScpXG4gIGRpdi5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBtZXNzYWdlKVxuXG4gIHdwbGZGb3JtLmZvcm0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIGRpdilcbiAgd3BsZkZvcm0uZm9ybS5jbGFzc0xpc3QuYWRkKCdzdWJtaXR0ZWQnKVxuICB3cGxmRm9ybS5mb3JtLnJlc2V0KClcbn1cblxuY29uc3QgZGVmYXVsdEVycm9yU2VuZENhbGxiYWNrID0gKHdwbGZGb3JtOiBXUExGX0Zvcm0sIHBhcmFtczogTGlzdDxhbnk+KSA9PiB7XG4gIGNvbnN0IHsgZXJyb3IgfSA9IHBhcmFtc1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIGRpdi5jbGFzc0xpc3QuYWRkKCd3cGxmLWVycm9yTWVzc2FnZScpXG4gIGRpdi5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBlcnJvci5tZXNzYWdlKVxuICB3cGxmRm9ybS5mb3JtLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBkaXYpXG59XG5cbmV4cG9ydCBjbGFzcyBXUExGX0Zvcm0ge1xuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnRcbiAgc3VibWl0U3RhdGU6IFN1Ym1pdFN0YXRlID0gU3VibWl0U3RhdGUuVW5zdWJtaXR0ZWRcbiAgc3VibWl0SGFuZGxlcjogU3VibWl0SGFuZGxlclxuICBjYWxsYmFja3M6IHtcbiAgICBiZWZvcmVTZW5kOiBMaXN0PEZvcm1DYWxsYmFjaz5cbiAgICBzdWNjZXNzOiBMaXN0PEZvcm1DYWxsYmFjaz5cbiAgICBlcnJvcjogTGlzdDxGb3JtQ2FsbGJhY2s+XG4gIH0gPSB7XG4gICAgYmVmb3JlU2VuZDoge1xuICAgICAgZGVmYXVsdDogZGVmYXVsdEJlZm9yZVNlbmRDYWxsYmFjayxcbiAgICB9LFxuICAgIHN1Y2Nlc3M6IHtcbiAgICAgIGRlZmF1bHQ6IGRlZmF1bHRTdWNjZXNzQ2FsbGJhY2ssXG4gICAgICBjbGVhck9uU3VjY2VzczogcmVzZXRGb3JtLFxuICAgIH0sXG4gICAgZXJyb3I6IHtcbiAgICAgIGRlZmF1bHQ6IGRlZmF1bHRFcnJvclNlbmRDYWxsYmFjayxcbiAgICB9LFxuICB9XG5cbiAgdGFiczogV1BMRl9UYWJzW10gPSBbXVxuICBrZXkgPSAnJ1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxGb3JtRWxlbWVudCkge1xuICAgIC8vIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50ICE9PSB0cnVlKSB7XG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQgIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm9ybSBlbGVtZW50IGludmFsaWQgb3IgbWlzc2luZycpXG4gICAgfVxuICAgIGNvbnN0IGZhbGxiYWNrSW5wdXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiX25vanNcIl0nKVxuXG4gICAgdGhpcy5mb3JtID0gZWxlbWVudFxuICAgIHRoaXMua2V5ID0gJ18nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpXG4gICAgdGhpcy50YWJzID0gQXJyYXkuZnJvbSh0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLndwbGYtdGFicycpKS5tYXAoXG4gICAgICAoZWwpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBXUExGX1RhYnMoZWwpXG4gICAgICB9XG4gICAgKVxuXG4gICAgdGhpcy5zdWJtaXRIYW5kbGVyID0gdGhpcy5jcmVhdGVTdWJtaXRIYW5kbGVyKClcblxuICAgIHRoaXMuYXR0YWNoU3VibWl0SGFuZGxlcigpXG5cbiAgICAvLyBSZW1vdmUgaW5wdXQgdGhhdCB0cmlnZ2VycyB0aGUgZmFsbGJhY2sgc28gd2UgZ2V0IGEgSlNPTiByZXNwb25zZVxuICAgIGlmIChmYWxsYmFja0lucHV0ICYmIGlzRWxlbWVudGlzaChmYWxsYmFja0lucHV0LnBhcmVudE5vZGUpKSB7XG4gICAgICBmYWxsYmFja0lucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZmFsbGJhY2tJbnB1dClcbiAgICB9XG4gIH1cblxuICBhZGRDYWxsYmFjayhuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgY2FsbGJhY2s6IEZvcm1DYWxsYmFjaykge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzXG4gICAgY29uc3QgeyBiZWZvcmVTZW5kLCBzdWNjZXNzLCBlcnJvciB9ID0gY2FsbGJhY2tzXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2JlZm9yZVNlbmQnOiB7XG4gICAgICAgIGJlZm9yZVNlbmRbbmFtZV0gPSBjYWxsYmFja1xuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzdWNjZXNzJzoge1xuICAgICAgICBzdWNjZXNzW25hbWVdID0gY2FsbGJhY2tcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSAnZXJyb3InOiB7XG4gICAgICAgIGVycm9yW25hbWVdID0gY2FsbGJhY2tcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gY2FsbGJhY2sgdHlwZSAke3R5cGV9YClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVtb3ZlQ2FsbGJhY2sobmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLmNhbGxiYWNrc1xuICAgIGNvbnN0IHsgYmVmb3JlU2VuZCwgc3VjY2VzcywgZXJyb3IgfSA9IGNhbGxiYWNrc1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdiZWZvcmVTZW5kJzoge1xuICAgICAgICBkZWxldGUgYmVmb3JlU2VuZFtuYW1lXVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzdWNjZXNzJzoge1xuICAgICAgICBkZWxldGUgc3VjY2Vzc1tuYW1lXVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlICdlcnJvcic6IHtcbiAgICAgICAgZGVsZXRlIGVycm9yW25hbWVdXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGNhbGxiYWNrICR7bmFtZX0gJHt0eXBlfWApXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJ1bkNhbGxiYWNrKHR5cGU6IHN0cmluZywgcGFyYW1zOiBMaXN0PGFueT4gPSB7fSkge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzXG4gICAgY29uc3QgeyBiZWZvcmVTZW5kLCBzdWNjZXNzLCBlcnJvciB9ID0gY2FsbGJhY2tzXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2JlZm9yZVNlbmQnOiB7XG4gICAgICAgIE9iamVjdC52YWx1ZXMoYmVmb3JlU2VuZCkuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICBjYWxsYmFjayh0aGlzLCBwYXJhbXMpXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ3N1Y2Nlc3MnOiB7XG4gICAgICAgIE9iamVjdC52YWx1ZXMoc3VjY2VzcykuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICBjYWxsYmFjayh0aGlzLCBwYXJhbXMpXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2Vycm9yJzoge1xuICAgICAgICBPYmplY3QudmFsdWVzKGVycm9yKS5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrKHRoaXMsIHBhcmFtcylcbiAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gY2FsbGJhY2sgJHtuYW1lfSAke3R5cGV9YClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhdHRhY2hTdWJtaXRIYW5kbGVyKCkge1xuICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIsIHsgcGFzc2l2ZTogZmFsc2UgfSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBzdWJtaXQgaGFuZGxlciBmcm9tIHRoZSBmb3JtLCBidXQga2VlcHMgaXQgaW4gbWVtb3J5LlxuICAgKi9cbiAgcmVtb3ZlU3VibWl0SGFuZGxlcigpIHtcbiAgICB0aGlzLmZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRIYW5kbGVyKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGNyZWF0ZVN1Ym1pdEhhbmRsZXIoaGFuZGxlcj86IFN1Ym1pdEhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlcikge1xuICAgICAgcmV0dXJuIGhhbmRsZXJcbiAgICB9XG5cbiAgICByZXR1cm4gYXN5bmMgKGU6IEV2ZW50KSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgaWYgKHRoaXMuc3VibWl0U3RhdGUgPT09IFN1Ym1pdFN0YXRlLlN1Ym1pdHRpbmcpIHtcbiAgICAgICAgbG9nLm5vdGljZSgnUHJldmVudGluZyBkb3VibGUgZG91Ym1pc3Npb24nKVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB4ID0gYXdhaXQgdGhpcy5zZW5kKClcbiAgICAgICAgY29uc3QgeyBkYXRhLCBvayB9ID0geFxuXG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHRoaXMuc3VibWl0U3RhdGUgPSBTdWJtaXRTdGF0ZS5TdWNjZXNzXG4gICAgICAgICAgdGhpcy5ydW5DYWxsYmFjaygnc3VjY2VzcycsIHsgZGF0YSB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdub3Qgb2shJywgeClcblxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMuc3VibWl0U3RhdGUgPSBTdWJtaXRTdGF0ZS5FcnJvclxuICAgICAgICB0aGlzLnJ1bkNhbGxiYWNrKCdlcnJvcicsIHsgZXJyb3I6IHRoaXMuc3VibWl0U3RhdGUgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBzZW5kKCkge1xuICAgIGNvbnN0IGZvcm0gPSB0aGlzLmZvcm1cbiAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pXG5cbiAgICBnbG9iYWxEYXRhLmxhbmcgJiYgZGF0YS5hcHBlbmQoJ2xhbmcnLCBnbG9iYWxEYXRhLmxhbmcpXG4gICAgdGhpcy5zdWJtaXRTdGF0ZSA9IFN1Ym1pdFN0YXRlLlN1Ym1pdHRpbmdcblxuICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnc3VibWl0dGluZycpXG4gICAgdGhpcy5ydW5DYWxsYmFjaygnYmVmb3JlU2VuZCcsIHsgZm9ybURhdGE6IGRhdGEsIGZvcm0gfSlcblxuICAgIGNvbnN0IHJlcSA9IHJlcXVlc3QoXG4gICAgICAnL3N1Ym1pdCcsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgfSxcbiAgICAgIEFwaVJlc3BvbnNlS2luZC5TdWJtaXNzaW9uXG4gICAgKVxuXG4gICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdzdWJtaXR0aW5nJylcblxuICAgIHJldHVybiByZXFcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1BMRl9TZXR0aW5ncyB7XG5cbn0iLCJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnXG5pbXBvcnQgbG9nIGZyb20gJy4uL2xpYi9sb2cnXG5pbXBvcnQgaXNUYXJnZXRBbkVsZW1lbnQgZnJvbSAnLi4vbGliL2lzLWVsZW1lbnRpc2gnXG5pbXBvcnQgaXNFbGVtZW50aXNoIGZyb20gJy4uL2xpYi9pcy1lbGVtZW50aXNoJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXUExGX1RhYnMge1xuICAvLyByZW1lbWJlciA9IGZhbHNlXG4gIC8vIGFjdGl2ZVRhYiA9IG51bGxcbiAgLy8gcm9vdCA9IG51bGxcbiAgLy8gbmFtZSA9IG51bGxcblxuICByZW1lbWJlcjogYm9vbGVhbiA9IGZhbHNlXG4gIGFjdGl2ZVRhYjogc3RyaW5nXG4gIHJvb3Q6IEVsZW1lbnRcbiAgbmFtZTogc3RyaW5nID0gJydcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgLy8gaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50ICE9PSB0cnVlKSB7XG4gICAgLy8gdGhyb3cgbmV3IEVycm9yKCdUYWIgZWxlbWVudCBpbnZhbGlkIG9yIG1pc3NpbmcnKVxuICAgIC8vIH1cblxuICAgIHRoaXMucm9vdCA9IGVsZW1lbnRcbiAgICB0aGlzLm5hbWUgPSB0aGlzLnJvb3QuZ2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnKSB8fCAnJ1xuICAgIHRoaXMucmVtZW1iZXIgPSB0aGlzLnJvb3QuZ2V0QXR0cmlidXRlKCdkYXRhLXJlbWVtYmVyJykgIT09IG51bGxcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IHRoaXMucm9vdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGVmYXVsdCcpIHx8ICcnXG5cbiAgICBpZiAoIXRoaXMucm9vdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkb2VzIHRoaXMgd29yayBmb3IgdHMgKGl0IGRvZXMgbm90KScpXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm5hbWUgfHwgIXRoaXMuYWN0aXZlVGFiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVpcmVkIGF0dHJpYnV0ZXMgYXJlIG1pc3NpbmcnKVxuICAgIH1cblxuICAgIGlmICh0aGlzLnJlbWVtYmVyKSB7XG4gICAgICAvLyBHZXQgc2F2ZWQgdmFsdWUgb3Iga2VlcCB1c2luZyB0aGUgZGVmYXVsdFxuICAgICAgdGhpcy5hY3RpdmVUYWIgPSBTdG9yYWdlLmdldCh0aGlzLm5hbWUsIHRoaXMuYWN0aXZlVGFiKVxuICAgIH1cblxuICAgIHRoaXMucmVmcmVzaCgpXG4gIH1cblxuICBoYW5kbGVDbGljayA9IChlOiBFdmVudCkgPT4ge1xuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBlXG5cbiAgICBpZiAoaXNFbGVtZW50aXNoKHRhcmdldCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRhcmdldClcbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICBjb25zdCB4ID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IC8vIEknbSA5OS45JSBzdXJlIHRoZXJlIHdpbGwgYWx3YXlzIGJlIGEgdGFyZ2V0XG4gICAgICBjb25zdCB0YWJOYW1lID0geC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JylcblxuICAgICAgaWYgKHRhYk5hbWUpIHtcbiAgICAgICAgdGhpcy5zd2l0Y2hUYWIodGFiTmFtZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZy5ub3RpY2UoJ1VuYWJsZSB0byBzd2l0Y2ggdGFiIGFzIGRhdGEtdGFyZ2V0IHdhcyBlbXB0eScpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGV2ZW50IGxpc3RlbmVycyBhbmQgZW5zdXJlIHRoZSBjdXJyZW50IHRhYiBpcyB2aXNpYmxlLlxuICAgKiBDYWxsIGFmdGVyIGFkZGluZyBhIHRhYiBkeW5hbWljYWxseS5cbiAgICovXG4gIHJlZnJlc2goKSB7XG4gICAgdGhpcy5nZXRIYW5kbGVzKCkuZm9yRWFjaCgoaGFuZGxlKSA9PiB7XG4gICAgICAvLyBJdCdzIG5vdCBwb3NzaWJsZSB0byBhZGQgdGhlIHNhbWUgZXZlbnQgbGlzdGVuZXIgdHdpY2UuIElmIHRoZSBoYW5kbGUgYWxyZWFkeSBoYXMgdGhlIGxpc3RlbmVyLFxuICAgICAgLy8gdGhpcyBpcyBhIG5vLW9wLlxuICAgICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljaywgeyBwYXNzaXZlOiBmYWxzZSB9KVxuICAgIH0pXG5cbiAgICAvLyBJZiBhY3RpdmVUYWIgaXMgbnVsbCwgdGhpbmdzIHdpbGwgYnJlYWsuIEZhbGwgYmFjayB0byBmaXJzdCB0YWJcbiAgICAvLyBhY3RpdmVUYWIgY2FudCBiZSBudWxsIGFueW1vcmVcblxuICAgIC8qICAgICBpZiAodGhpcy5hY3RpdmVUYWIgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHRhYnMgPSB0aGlzLmdldFRhYnMoKVxuXG4gICAgICBpZiAodGFicy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZmlyc3QgPSB0YWJzWzBdXG4gICAgICAgIGNvbnN0IC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JylcblxuICAgICAgfVxuXG4gICAgICBsb2cubm90aWNlKCdhY3RpdmVUYWIgd2FzIG51bGwsIHNldHRpbmcgZmlyc3QgdGFiIGFzIGFjdGl2ZScsIGZpcnN0KVxuICAgICAgdGhpcy5hY3RpdmVUYWIgPSBmaXJzdFxuICAgIH0gKi9cblxuICAgIHRoaXMuc3dpdGNoVGFiKHRoaXMuYWN0aXZlVGFiKVxuICB9XG5cbiAgLyoqXG4gICAqIFZhbHVlcyBhcmUgbm90IGNhY2hlZCBhcyB0aGV5IGFyZSBwcmFjdGljYWxseSBmcmVlIHRvIHJlY29tcHV0ZSwgYnV0XG4gICAqIG1pZ2h0IGJlY29tZSBhIG1lbW9yeSBsZWFrIGlmIHN0b3JlZC5cbiAgICovXG4gIGdldFRhYnMoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oXG4gICAgICB0aGlzLnJvb3QucXVlcnlTZWxlY3RvckFsbChgLndwbGYtdGFic19fdGFiW2RhdGEtbmFtZT1cIiR7dGhpcy5uYW1lfVwiXWApXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFNlZSBnZXRUYWJzKClcbiAgICovXG4gIGdldEhhbmRsZXMoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oXG4gICAgICB0aGlzLnJvb3QucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgYC53cGxmLXRhYnNfX3RhYlN3aXRjaGVyW2RhdGEtbmFtZT1cIiR7dGhpcy5uYW1lfVwiXWBcbiAgICAgIClcbiAgICApXG4gIH1cblxuICBzd2l0Y2hUYWIobmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgdGFicyA9IHRoaXMuZ2V0VGFicygpXG4gICAgY29uc3QgYWxsSGFuZGxlcyA9IHRoaXMuZ2V0SGFuZGxlcygpXG5cbiAgICBjb25zdCBvcGVuID0gdGFicy5maWx0ZXIoKHRhYikgPT4gdGFiLmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKSA9PT0gbmFtZSlcbiAgICBjb25zdCBjbG9zZSA9IHRhYnMuZmlsdGVyKCh0YWIpID0+IHRhYi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJykgIT09IG5hbWUpXG5cbiAgICBvcGVuLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgY29uc3QgdGFiTmFtZSA9IHRhYi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJylcbiAgICAgIGNvbnN0IGhhbmRsZXMgPSBhbGxIYW5kbGVzLmZpbHRlcihcbiAgICAgICAgKGhhbmRsZSkgPT4gaGFuZGxlLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSA9PT0gdGFiTmFtZVxuICAgICAgKVxuXG4gICAgICB0YWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgIGhhbmRsZXMuZm9yRWFjaCgoaGFuZGxlKSA9PiB7XG4gICAgICAgIGhhbmRsZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgY2xvc2UuZm9yRWFjaCgodGFiKSA9PiB7XG4gICAgICBjb25zdCB0YWJOYW1lID0gdGFiLmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKVxuICAgICAgY29uc3QgaGFuZGxlcyA9IGFsbEhhbmRsZXMuZmlsdGVyKFxuICAgICAgICAoaGFuZGxlKSA9PiBoYW5kbGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpID09PSB0YWJOYW1lXG4gICAgICApXG5cbiAgICAgIHRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgaGFuZGxlcy5mb3JFYWNoKChoYW5kbGUpID0+IHtcbiAgICAgICAgaGFuZGxlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBpZiAodGhpcy5yZW1lbWJlcikge1xuICAgICAgU3RvcmFnZS5zZXQodGhpcy5uYW1lLCBuYW1lKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgV1BMRl9Gb3JtIH0gZnJvbSAnLi93cGxmLWZvcm0nXG5pbXBvcnQgZ2xvYmFsRGF0YSBmcm9tICcuLi9saWIvZ2xvYmFsLWRhdGEnXG5cbmltcG9ydCB7IExpc3QgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCBlbnN1cmVOdW0gZnJvbSAnLi4vbGliL2Vuc3VyZS1udW0nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdQTEYge1xuICAvLyBmb3JtcyA9IHtcbiAgLy8gICAvLyAnX2c2N2E4ejJrdyc6IFdQTEZfRm9ybVxuICAvLyB9XG4gIGZvcm1zOiBMaXN0PFdQTEZfRm9ybT4gPSB7fVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpXG4gIH1cblxuICAvLyBFeHBvc2UgV1BMRl9Gb3JtXG4gIC8vIEZvcm06IFdQTEZfRm9ybSA9IFdQTEZfRm9ybVxuICBGb3JtID0gV1BMRl9Gb3JtXG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICBpZiAoZ2xvYmFsRGF0YS5zZXR0aW5ncy5hdXRvaW5pdCkge1xuICAgICAgO1tdLmZvckVhY2guY2FsbChcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybS53cGxmJyksXG4gICAgICAgIChmb3JtOiBIVE1MRm9ybUVsZW1lbnQpID0+IHRoaXMuYXR0YWNoKGZvcm0pXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgZmluZEZvcm1zQnlJZChpZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZm9ybXMpLnJlZHVjZTxXUExGX0Zvcm1bXT4oKGFjYywga2V5KSA9PiB7XG4gICAgICBjb25zdCB3cGxmRm9ybSA9IHRoaXMuZm9ybXNba2V5XVxuXG4gICAgICBpZiAoIXdwbGZGb3JtKSB7XG4gICAgICAgIHJldHVybiBhY2NcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm9ybUVsID0gd3BsZkZvcm0uZm9ybVxuICAgICAgY29uc3QgZm9ybUVsSWQgPSBmb3JtRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWZvcm0taWQnKVxuXG4gICAgICBpZiAoZm9ybUVsSWQgJiYgZW5zdXJlTnVtKGZvcm1FbElkKSA9PT0gZW5zdXJlTnVtKGlkKSkge1xuICAgICAgICBhY2MucHVzaCh3cGxmRm9ybSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIFtdKVxuICB9XG5cbiAgYXR0YWNoKHg6IEhUTUxGb3JtRWxlbWVudCB8IFdQTEZfRm9ybSkge1xuICAgIGlmICh4IGluc3RhbmNlb2YgV1BMRl9Gb3JtKSB7XG4gICAgICBjb25zdCB3cGxmRm9ybSA9IHhcblxuICAgICAgdGhpcy5mb3Jtc1t3cGxmRm9ybS5rZXldID0gd3BsZkZvcm1cblxuICAgICAgcmV0dXJuIHdwbGZGb3JtXG4gICAgfVxuXG4gICAgY29uc3QgZWxlbWVudCA9IHhcblxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgIT09IHRydWUpIHtcbiAgICAgIC8vIGxvZy5jb25zb2xlLmVycm9yKCdVbmFibGUgdG8gYXR0YWNoIFdQTEYgdG8gZWxlbWVudCcpO1xuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBhdHRhY2ggV1BMRiB0byBlbGVtZW50JylcbiAgICB9XG5cbiAgICBjb25zdCB3cGxmRm9ybSA9IG5ldyBXUExGX0Zvcm0oZWxlbWVudClcbiAgICB0aGlzLmZvcm1zW3dwbGZGb3JtLmtleV0gPSB3cGxmRm9ybVxuXG4gICAgd3BsZkZvcm0uZm9ybS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4JylcbiAgICB3cGxmRm9ybS5mb3JtLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuXG4gICAgcmV0dXJuIHdwbGZGb3JtXG4gIH1cblxuICBkZXRhY2god3BsZkZvcm06IFdQTEZfRm9ybSkge1xuICAgIHRoaXMuZm9ybXNbd3BsZkZvcm0ua2V5XS5yZW1vdmVTdWJtaXRIYW5kbGVyKClcbiAgICBkZWxldGUgdGhpcy5mb3Jtc1t3cGxmRm9ybS5rZXldXG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG4iLCJpbXBvcnQgQWJvcnRDb250cm9sbGVyIGZyb20gJ2Fib3J0LWNvbnRyb2xsZXInXG5pbXBvcnQgZ2xvYmFsRGF0YSBmcm9tICcuL2dsb2JhbC1kYXRhJ1xuaW1wb3J0IHsgTGlzdCwgQXBpUmVzcG9uc2UsIEFwaVJlc3BvbnNlS2luZCB9IGZyb20gJy4uL3R5cGVzJ1xuXG4vKipcbiAqIEl0J3Mgb2sgdG8gY3JlYXRlIG11bHRpcGxlIEFQSSBjbGllbnRzXG4gKlxuICogVXNhZ2U6IGNvbnN0IHsgYWJvcnQsIHJlcXVlc3QsIGdldFNpZ25hbCB9ID0gY3JlYXRlQXBpQ2xpZW50KClcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXBpQ2xpZW50KCkge1xuICBsZXQgY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyIHwgbnVsbCA9IG51bGxcbiAgbGV0IHNpZ25hbDogQWJvcnRTaWduYWwgfCBudWxsID0gbnVsbFxuXG4gIGNvbnNvbGUubG9nKGdsb2JhbERhdGEpXG5cbiAgcmV0dXJuIHtcbiAgICAvLyBjb250cm9sbGVyOiBudWxsLFxuICAgIC8vIHNpZ25hbDogbnVsbCxcblxuICAgIGNvbnRyb2xsZXIsXG4gICAgc2lnbmFsLFxuXG4gICAgZ2V0U2lnbmFsKCkge1xuICAgICAgcmV0dXJuIHNpZ25hbFxuICAgIH0sXG5cbiAgICBhYm9ydCgpIHtcbiAgICAgIGlmIChjb250cm9sbGVyICYmIGNvbnRyb2xsZXIuYWJvcnQpIHtcbiAgICAgICAgY29udHJvbGxlci5hYm9ydCgpXG4gICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIHJlcXVlc3QoXG4gICAgICB0YXJnZXQ6IHN0cmluZyxcbiAgICAgIG9wdGlvbnM6IExpc3Q8c3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IEZvcm1EYXRhIHwgbnVsbD4gPSB7fSxcbiAgICAgIHJlc3BvbnNlS2luZDogQXBpUmVzcG9uc2VLaW5kXG4gICAgKTogUHJvbWlzZTxBcGlSZXNwb25zZT4ge1xuICAgICAgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxuICAgICAgc2lnbmFsID0gY29udHJvbGxlci5zaWduYWxcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goZ2xvYmFsRGF0YS5iYWNrZW5kVXJsICsgdGFyZ2V0LCB7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICBzaWduYWwsXG4gICAgICAgICAgY3JlZGVudGlhbHM6IGdsb2JhbERhdGEuZmV0Y2hDcmVkZW50aWFscyB8fCAnc2FtZS1vcmlnaW4nLFxuICAgICAgICAgIGhlYWRlcnM6IGdsb2JhbERhdGEucmVxdWVzdEhlYWRlcnMgfHwge30sXG4gICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgeyBoZWFkZXJzLCBzdGF0dXMsIHN0YXR1c1RleHQsIHVybCwgb2sgfSA9IHJlc1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKVxuXG4gICAgICAgIGNvbnRyb2xsZXIgPSBudWxsXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBraW5kOiByZXNwb25zZUtpbmQsXG4gICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dCxcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAgb2ssXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb250cm9sbGVyID0gbnVsbFxuXG4gICAgICAgIC8vIElmIHlvdSB3YW50IHRvIGRvIHNvbWV0aGluZyB3aGVuIHRoZSByZXF1ZXN0IGlzIGFib3J0ZWQsIHVzZVxuICAgICAgICAvLyBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCAuLi4pXG4gICAgICAgIGlmIChlLm5hbWUgIT09ICdBYm9ydEVycm9yJykge1xuICAgICAgICAgIHRocm93IGVcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlXG4gICAgICB9XG4gICAgfSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiBjcmVhdGVBcGlDbGllbnQoKVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5zdXJlTnVtKHg6IHN0cmluZyB8IG51bWJlciwgZmxvYXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICBpZiAodHlwZW9mIHggPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHhcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmxvYXQgPyBwYXJzZUZsb2F0KHgpIDogcGFyc2VJbnQoeCwgMTApXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0ICgod2luZG93KSA9PiAoe1xuICAuLi53aW5kb3cud3BsZkRhdGEgLy8gd3BfbG9jYWxpemVfc2NyaXB0IHdpbGwgY3JlYXRlIHRoaXMgb2JqZWN0XG59KSkod2luZG93KVxuIiwiLy8gZnVuY3Rpb24gaXNFbGVtZW50aXNoKGU6IG9iamVjdCB8IG51bGwgfCB1bmRlZmluZWQpOiBlIGlzIEVsZW1lbnQge1xuLy8gICByZXR1cm4gKGUgPyBlWyd0YWdOYW1lJ10gJiYgJ2dldEF0dHJpYnV0ZScgaW4gZSA6IGZhbHNlKTtcbi8vIH1cblxuZnVuY3Rpb24gaXNFbGVtZW50aXNoKGU6IG9iamVjdCB8IG51bGwgfCB1bmRlZmluZWQpOiBlIGlzIEVsZW1lbnQge1xuICByZXR1cm4gZSA/ICdnZXRBdHRyaWJ1dGUnIGluIGUgJiYgJ3RhZ05hbWUnIGluIGUgOiBmYWxzZVxufVxuXG5leHBvcnQgZGVmYXVsdCBpc0VsZW1lbnRpc2hcbiIsImltcG9ydCBnbG9iYWxEYXRhIGZyb20gJy4vZ2xvYmFsLWRhdGEnXG5cbmNvbnN0IHsgZGVidWdMZXZlbCB9ID0gZ2xvYmFsRGF0YS5zZXR0aW5nc1xuXG5jb25zdCBjb25zb2xlID0gd2luZG93LmNvbnNvbGUgfHwgeyBsb2coKSB7fSwgZXJyb3IoKSB7fSB9IC8vIG5vb3AgZmFsbGJhY2tcbmNvbnN0IG5vdGljZSA9IChtZXNzYWdlOiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pID0+XG4gIGRlYnVnTGV2ZWwgPT09ICdhbGwnICYmIGNvbnNvbGUubG9nKGBXUExGOiAke21lc3NhZ2V9YCwgcGFyYW1zKVxuY29uc3QgZXJyb3IgPSAobWVzc2FnZTogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKSA9PlxuICBkZWJ1Z0xldmVsICE9PSAnbm9uZScgJiYgY29uc29sZS5lcnJvcihgV1BMRiBlcnJvcjogJHttZXNzYWdlfWAsIHBhcmFtcylcblxuZXhwb3J0IGRlZmF1bHQge1xuICBub3RpY2UsXG4gIGVycm9yLFxufVxuIiwiLyoqXG4gKiBUcnlpbmcgdG8gcmVhZCB0aGUgRE9NIGltbWVkaWF0ZWx5IGFmdGVyIHNldHRpbmcgaXQgZG9lcyBub3Qgd29yay4gVHJ5aW5nIG9uIG5leHQgdGlja1xuICogZG9lcy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdhaXRGb3JOZXh0VGljayA9ICgpID0+XG4gIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUpKVxuXG5leHBvcnQgY29uc3Qgd2FpdCA9IChtcyA9IDUwMCkgPT5cbiAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKVxuIiwiaW1wb3J0IHsgV1BMRl9Gb3JtIH0gZnJvbSAnLi9jbGFzc2VzL3dwbGYtZm9ybSdcblxuZXhwb3J0IGVudW0gU3VibWl0U3RhdGUge1xuICBVbnN1Ym1pdHRlZCxcbiAgU3VibWl0dGluZyxcbiAgU3VjY2VzcyxcbiAgRXJyb3IsXG59XG5leHBvcnQgdHlwZSBTdWJtaXRIYW5kbGVyID0gKGV2ZW50OiBFdmVudCkgPT4gUHJvbWlzZTx2b2lkPlxuZXhwb3J0IHR5cGUgRm9ybUNhbGxiYWNrID0gKHdwbGZGb3JtOiBXUExGX0Zvcm0sIHBhcmFtczogTGlzdDxhbnk+KSA9PiB2b2lkXG5cbmV4cG9ydCBpbnRlcmZhY2UgV1BMRl9UYWJzIHtcbiAgcmVtZW1iZXI6IGJvb2xlYW5cbiAgYWN0aXZlVGFiOiBudWxsIHwgc3RyaW5nXG4gIHJvb3Q6IEhUTUxFbGVtZW50XG4gIG5hbWU6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExpc3Q8VD4ge1xuICBbazogc3RyaW5nXTogVFxufVxuXG5leHBvcnQgZW51bSBBcGlSZXNwb25zZUtpbmQge1xuICBTdWJtaXNzaW9uID0gJ3N1Ym1pc3Npb24nLFxuICBSZW5kZXIgPSAncmVuZGVyJyxcbiAgR2V0U3VibWlzc2lvbnMgPSAnZ2V0c3VibWlzc2lvbnMnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhd0FwaVJlc3BvbnNlIHtcbiAgaGVhZGVyczogSGVhZGVyc1xuICBzdGF0dXM6IG51bWJlclxuICBzdGF0dXNUZXh0OiBzdHJpbmdcbiAgdXJsOiBzdHJpbmdcbiAgb2s6IGJvb2xlYW5cbiAgZGF0YTogYW55XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VibWl0QXBpUmVzcG9uc2UgZXh0ZW5kcyBSYXdBcGlSZXNwb25zZSB7XG4gIGtpbmQ6IEFwaVJlc3BvbnNlS2luZC5TdWJtaXNzaW9uXG4gIGRhdGE6XG4gICAgfCB7IGVycm9yOiBzdHJpbmc7IGRhdGE6IHN0cmluZyB9XG4gICAgfCB7XG4gICAgICAgIHN1Ym1pc3Npb246IHtcbiAgICAgICAgICBJRDogbnVtYmVyXG4gICAgICAgIH1cbiAgICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZXRTdWJtaXNzaW9uc0FwaVJlc3BvbnNlIGV4dGVuZHMgUmF3QXBpUmVzcG9uc2Uge1xuICBraW5kOiBBcGlSZXNwb25zZUtpbmQuR2V0U3VibWlzc2lvbnNcbiAgZGF0YTpcbiAgICB8IHsgZXJyb3I6IHN0cmluZzsgZGF0YTogc3RyaW5nIH1cbiAgICB8IHtcbiAgICAgICAgc3VibWlzc2lvbjoge1xuICAgICAgICAgIElEOiBudW1iZXJcbiAgICAgICAgfVxuICAgICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlckFwaVJlc3BvbnNlIGV4dGVuZHMgUmF3QXBpUmVzcG9uc2Uge1xuICBraW5kOiBBcGlSZXNwb25zZUtpbmQuUmVuZGVyXG4gIGRhdGE6XG4gICAgfCB7IGVycm9yOiBzdHJpbmc7IGRhdGE6IHN0cmluZyB9XG4gICAgfCB7XG4gICAgICAgIGh0bWw6IHN0cmluZ1xuICAgICAgICBmb3JtOiB7XG4gICAgICAgICAgSUQ6IG51bWJlclxuICAgICAgICAgIHBvc3RDb250YWluc0ZpbGVJbnB1dHM6IHRydWVcbiAgICAgICAgICB0aXRsZTogc3RyaW5nXG4gICAgICAgIH1cbiAgICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgQXBpUmVzcG9uc2UgPVxuICB8IFN1Ym1pdEFwaVJlc3BvbnNlXG4gIHwgR2V0U3VibWlzc2lvbnNBcGlSZXNwb25zZVxuICB8IFJlbmRlckFwaVJlc3BvbnNlXG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgLy8gUmVhY3Q6IFJlYWN0LCAvLyBAdHlwZXMvcmVhY3QgaGFzIGl0IGhhbmRsZWQgYWxyZWFkeVxuICAgIC8vIFdQTEY6IFdQTEYgLy8gV2UncmUgbm90IGdvaW5nIHRvIHVzZSBvdXIgb3duIGxpYnJhcnkgZnJvbSB3aW5kb3dcblxuICAgIC8vIFRoaXMgY29tZXMgZnJvbSBXb3JkUHJlc3NcbiAgICB3cGxmRGF0YToge1xuICAgICAgYmFja2VuZFVybDogc3RyaW5nXG4gICAgICBhc3NldHNEaXI6IHN0cmluZ1xuICAgICAgLy8gZmV0Y2hDcmVkZW50aWFsczogc3RyaW5nXG4gICAgICBmZXRjaENyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nIHwgJ2luY2x1ZGUnIHwgJ29taXQnXG4gICAgICBpMThuOiBMaXN0PHN0cmluZz5cbiAgICAgIGxhbmc/OiBzdHJpbmdcbiAgICAgIHJlcXVlc3RIZWFkZXJzOiB7XG4gICAgICAgICdYLVdQLU5vbmNlJzogc3RyaW5nXG4gICAgICAgIFtrOiBzdHJpbmddOiBhbnlcbiAgICAgIH1cbiAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgIGF1dG9pbml0OiBib29sZWFuXG4gICAgICAgIGRlYnVnTGV2ZWw6IHN0cmluZ1xuICAgICAgICBoYXNVbmZpbHRlZEh0bWw6IG51bWJlclxuICAgICAgICBwYXJzZUxpYnJlZm9ybXNTaG9ydGNvZGVJblJlc3RBcGk6IGJvb2xlYW5cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBXUExGX0FkbWluIGZyb20gJy4vY2xhc3Nlcy93cGxmLWFkbWluJ1xuaW1wb3J0IFdQTEYgZnJvbSAnLi9jbGFzc2VzL3dwbGYnXG5pbXBvcnQgJy4uL3N0eWxlcy93cGxmLWFkbWluLnNjc3MnXG5cbi8vIFdlYnBhY2sgZXhwb3NlcyB0aGUgaW5zdGFuY2UgaW4gd2luZG93LldQTEYsIGRvIG5vdCBsb2FkIGFkbWluIGFuZCBmcm9udGVuZCBidW5kbGVzIGF0IHRoZSBzYW1lIHRpbWUuXG5leHBvcnQgZGVmYXVsdCBuZXcgV1BMRl9BZG1pbihuZXcgV1BMRigpKVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiLypnbG9iYWxzIHNlbGYsIHdpbmRvdyAqL1xuXCJ1c2Ugc3RyaWN0XCJcblxuLyplc2xpbnQtZGlzYWJsZSBAbXlzdGljYXRlYS9wcmV0dGllciAqL1xuY29uc3QgeyBBYm9ydENvbnRyb2xsZXIsIEFib3J0U2lnbmFsIH0gPVxuICAgIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6XG4gICAgLyogb3RoZXJ3aXNlICovIHVuZGVmaW5lZFxuLyplc2xpbnQtZW5hYmxlIEBteXN0aWNhdGVhL3ByZXR0aWVyICovXG5cbm1vZHVsZS5leHBvcnRzID0gQWJvcnRDb250cm9sbGVyXG5tb2R1bGUuZXhwb3J0cy5BYm9ydFNpZ25hbCA9IEFib3J0U2lnbmFsXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gQWJvcnRDb250cm9sbGVyXG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbihvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSxcbiAgICAgIFByb21pc2VJbXBsXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=