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

/***/ "./assets/scripts/wplf-admin.js":
/*!**************************************!*\
  !*** ./assets/scripts/wplf-admin.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_wplf_admin_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/wplf-admin.scss */ \"./assets/styles/wplf-admin.scss\");\n/* harmony import */ var _styles_wplf_admin_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_wplf_admin_scss__WEBPACK_IMPORTED_MODULE_0__);\n\nvar $ = window.jQuery; // No need to use a closure.\n\nvar _ = window._;\n\nfunction onPluginsPage() {\n  var menu = $('.wplf-plugins-menu');\n  var pages = $('.wplf-plugins-page');\n  var previousItem = localStorage.getItem('wplf-plugins-page-last-active-tab') || 'General';\n\n  if (!menu.length && !pages.length) {\n    return;\n  }\n\n  menu.on('click', '.nav-tab', function (e) {\n    var item = $(e.target);\n    var page = item.attr('data-page');\n    var target = $(\".wplf-plugins-page[data-page=\\\"\".concat(page, \"\\\"]\"));\n    item.siblings().removeClass('nav-tab-active');\n    item.addClass('nav-tab-active');\n    pages.hide();\n    target.show();\n\n    try {\n      localStorage.setItem('wplf-plugins-page-last-active-tab', page);\n    } catch (e) {\n      // No one cares. Safari just throws in PB.\n      // The tab remember feature just won't work.\n      console.error(e);\n    }\n\n    e.preventDefault();\n  });\n\n  if (previousItem) {\n    var target = $(\".wplf-plugins-menu [data-page=\\\"\".concat(previousItem, \"\\\"]\"));\n    target.click();\n  }\n}\n\nfunction parseFields() {\n  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#content';\n  // get editor content\n  // we don't allow the wysiwyg editor here, so it's fine to just get the textarea value\n  var content = $(element).val(); // create a html form from the content\n\n  var $form = $('<form>' + content + '</form>'); // get all fields from form\n\n  var $fields = $form.find('input, textarea, select'); // store input names in an array\n\n  var fields = [];\n  var required = [];\n  $('.wplf-form-field-container').html('');\n  $fields.each(function (e) {\n    if ($(this).prop('name')) {\n      // visual representation of the field in a meta box\n      var $fieldbox = $('<div class=\"wplf-form-field widget-top\"><div class=\"widget-title\"><h4>' + $(this).prop('name') + '</h4></div></div>');\n\n      if ($(this).prop('required')) {\n        // mark as required field for validation\n        $fieldbox.addClass('required');\n        $fieldbox.find('h4').append('*'); // add name to required array\n\n        required.push($(this).prop('name'));\n      } // add name to fields array\n\n\n      fields.push($(this).prop('name')); // display field names in a meta box\n\n      $('.wplf-form-field-container').append($fieldbox);\n    }\n  }); // save field array in a hidden input\n\n  $('input#wplf_fields').val(fields.join());\n  $('input#wplf_required').val(required.join());\n} // display email copy field if the feature is enabled\n\n\nfunction toggleEmailCopy() {\n  if ($('input[name=\"wplf_email_copy_enabled\"]:checked').length > 0) {\n    $('p.wplf-email-copy-to-field').show();\n  } else {\n    $('p.wplf-email-copy-to-field').hide();\n  }\n} // If prompted for a form version update, create a hidden field if necessary\n\n\nfunction toggleVersionUpdate() {\n  var hiddenField = $('input[name=\"wplf_update_plugin_version_to_meta\"]');\n\n  if (hiddenField.length) {\n    hiddenField.remove();\n    return;\n  }\n\n  var checkbox = document.createElement('input');\n  checkbox.type = 'hidden';\n  checkbox.name = 'wplf_update_plugin_version_to_meta';\n  checkbox.value = 1;\n  $('#content').after(checkbox);\n}\n\nfunction showDynamicValueInfo(e) {\n  var target = e.target;\n  var value = target.value;\n  var help = $('.wplf-dynamic-values-help');\n  var desc = help.find('.description');\n  var usage = help.find('.usage span');\n\n  if (value) {\n    var option = target.querySelector('option[value=\"' + value + '\"]');\n    var labels = JSON.parse(option.getAttribute('data-labels'));\n    desc.html(labels.description);\n    usage.text('%' + value + '%');\n    help.show();\n  } else {\n    help.hide();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((function () {\n  $(document).ready(function () {\n    var isProbablyAdmin = document && document.body && document.body.classList.contains('wp-admin');\n\n    if (isProbablyAdmin) {\n      $('#content').bind('input propertychange', _.debounce(parseFields, 300));\n      parseFields();\n      $('input[name=\"wplf_email_copy_enabled\"]').change(toggleEmailCopy);\n      toggleEmailCopy();\n      $('input[name=\"wplf_version_update_toggle\"]').change(toggleVersionUpdate);\n      $('select[name=\"wplf-dynamic-values\"]').change(showDynamicValueInfo);\n      onPluginsPage();\n    }\n  });\n  return {\n    parseFields: parseFields,\n    toggleVersionUpdate: toggleVersionUpdate,\n    showDynamicValueInfo: showDynamicValueInfo\n  };\n})());\n\n//# sourceURL=webpack://WPLF/./assets/scripts/wplf-admin.js?");

/***/ }),

/***/ "./assets/styles/wplf-admin.scss":
/*!***************************************!*\
  !*** ./assets/styles/wplf-admin.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://WPLF/./assets/styles/wplf-admin.scss?");

/***/ }),

/***/ 0:
/*!********************************************!*\
  !*** multi ./assets/scripts/wplf-admin.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /home/k1sul1/Documents/Projects/Hobby/crest.fi/htdocs/wp-content/plugins/wp-libre-form/assets/scripts/wplf-admin.js */\"./assets/scripts/wplf-admin.js\");\n\n\n//# sourceURL=webpack://WPLF/multi_./assets/scripts/wplf-admin.js?");

/***/ })

/******/ })["default"];
});