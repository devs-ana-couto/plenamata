/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = ".//dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/blocks/embedTemplate/index.js":
/*!*********************************************************!*\
  !*** ./assets/javascript/blocks/embedTemplate/index.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}



 //const {  } = wp.editor;

wp.blocks.registerBlockType("jeo-theme/embed-template", {
  title: "Embed Template",
  icon: "format-video",
  category: "common",
  supports: {
    align: false
  },
  attributes: {},
  edit: function edit(props) {
    var className = props.className,
        isSelected = props.isSelected;

    _objectDestructuringEmpty(props.attributes);

    var setAttributes = props.setAttributes;
    var TEMPLATE = [['core/paragraph', {
      placeholder: 'Embed title'
    }], ['core/paragraph', {
      placeholder: 'Author'
    }], ['core/embed']];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "embed-item-template",
      key: "container"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InnerBlocks"], {
      allowedBlocks: ['core/embed', 'core/paragraph'],
      template: TEMPLATE,
      templateLock: "all"
    }))));
  },
  save: function save(props) {
    var className = props.className,
        isSelected = props.isSelected,
        title = props.attributes.title,
        setAttributes = props.setAttributes;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "embed-template-block"
    }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InnerBlocks"].Content, null)));
  }
}); // [mc4wp_form id="65"]

/***/ }),

/***/ 5:
/*!***************************************************************!*\
  !*** multi ./assets/javascript/blocks/embedTemplate/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/html/plenamata/code/wp-content/themes/jeo-theme/assets/javascript/blocks/embedTemplate/index.js */"./assets/javascript/blocks/embedTemplate/index.js");


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blockEditor"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvYmxvY2tzL2VtYmVkVGVtcGxhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFtcIndwXCIsXCJibG9ja0VkaXRvclwiXSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgW1wid3BcIixcImNvbXBvbmVudHNcIl0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFtcIndwXCIsXCJpMThuXCJdIl0sIm5hbWVzIjpbIndwIiwidGl0bGUiLCJpY29uIiwiY2F0ZWdvcnkiLCJzdXBwb3J0cyIsImFsaWduIiwiYXR0cmlidXRlcyIsImVkaXQiLCJjbGFzc05hbWUiLCJwcm9wcyIsImlzU2VsZWN0ZWQiLCJzZXRBdHRyaWJ1dGVzIiwiVEVNUExBVEUiLCJwbGFjZWhvbGRlciIsInNhdmUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUVBO0NBRUE7O0FBRUFBLEVBQUUsQ0FBRkEscURBQXdEO0FBQ3ZEQyxPQUFLLEVBRGtEO0FBRXZEQyxNQUFJLEVBRm1EO0FBR3ZEQyxVQUFRLEVBSCtDO0FBSXZEQyxVQUFRLEVBQUU7QUFDVEMsU0FBSyxFQUFFO0FBREUsR0FKNkM7QUFPdkRDLFlBQVUsRUFQNkM7QUFXdkRDLE1BQUksRUFBRSxxQkFBVztBQUFBLFFBRWZDLFNBRmUsR0FPWkMsS0FQWTtBQUFBLFFBR2ZDLFVBSGUsR0FPWkQsS0FQWTs7QUFBQSw4QkFPWkEsS0FQWTs7QUFBQSxRQU1mRSxhQU5lLEdBT1pGLEtBUFk7QUFTaEIsUUFBTUcsUUFBUSxHQUFJLENBQ2hCLG1CQUFvQjtBQUFFQyxpQkFBVyxFQUFFO0FBQWYsS0FBcEIsQ0FEZ0IsRUFFaEIsbUJBQW9CO0FBQUVBLGlCQUFXLEVBQUU7QUFBZixLQUFwQixDQUZnQixFQUdoQixDQUhGLFlBR0UsQ0FIZ0IsQ0FBbEI7QUFNQSx3QkFDQyx1REFDQztBQUFLLGVBQVMsRUFBZDtBQUFxQyxTQUFHLEVBQUM7QUFBekMsb0JBQ0MsOENBQ0M7QUFDQyxtQkFBYSxFQUFFLGVBRGhCLGdCQUNnQixDQURoQjtBQUVDLGNBQVEsRUFGVDtBQUdDLGtCQUFZLEVBQUM7QUFIZCxNQURELENBREQsQ0FERCxDQUREO0FBMUJzRDtBQXlDdkRDLE1BQUksRUFBRSxxQkFBVztBQUFBLFFBRWZOLFNBRmUsR0FRVkMsS0FSVTtBQUFBLFFBR2ZDLFVBSGUsR0FRVkQsS0FSVTtBQUFBLFFBS2JSLEtBTGEsR0FRVlEsS0FSVSxXQVFWQSxDQVJVO0FBQUEsUUFPZkUsYUFQZSxHQVFWRixLQVJVO0FBV2hCLHdCQUNDLHVEQUNDO0FBQUssZUFBUyxFQUFDO0FBQWYsb0JBQ0Msb0JBQUMsbUVBQUQsVUFISCxJQUdHLENBREQsQ0FERCxDQUREO0FBT0E7QUEzRHNELENBQXhEVCxFLENBOERBLHVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BFQSxhQUFhLDhDQUE4QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTdELGFBQWEsNkNBQTZDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBNUQsYUFBYSx1Q0FBdUMsRUFBRSxJIiwiZmlsZSI6Ii9lbWJlZFRlbXBsYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuLy9kaXN0XCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcbiIsImltcG9ydCB7IFJpY2hUZXh0LCBJbm5lckJsb2NrcyB9IGZyb20gXCJAd29yZHByZXNzL2Jsb2NrLWVkaXRvclwiO1xuXG5pbXBvcnQgeyBfXyB9IGZyb20gXCJAd29yZHByZXNzL2kxOG5cIjtcbmltcG9ydCB7IEJ1dHRvbiwgU2VsZWN0Q29udHJvbCwgVGV4dENvbnRyb2wgfSBmcm9tIFwiQHdvcmRwcmVzcy9jb21wb25lbnRzXCI7XG4vL2NvbnN0IHsgIH0gPSB3cC5lZGl0b3I7XG5cbndwLmJsb2Nrcy5yZWdpc3RlckJsb2NrVHlwZShcImplby10aGVtZS9lbWJlZC10ZW1wbGF0ZVwiLCB7XG5cdHRpdGxlOiBcIkVtYmVkIFRlbXBsYXRlXCIsXG5cdGljb246IFwiZm9ybWF0LXZpZGVvXCIsXG5cdGNhdGVnb3J5OiBcImNvbW1vblwiLFxuXHRzdXBwb3J0czoge1xuXHRcdGFsaWduOiBmYWxzZSxcblx0fSxcblx0YXR0cmlidXRlczoge1xuXHRcdFxuXHR9LFxuXG5cdGVkaXQ6IChwcm9wcykgPT4ge1xuXHRcdGNvbnN0IHtcblx0XHRcdGNsYXNzTmFtZSxcblx0XHRcdGlzU2VsZWN0ZWQsXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHR9LFxuXHRcdFx0c2V0QXR0cmlidXRlcyxcblx0XHR9ID0gcHJvcHM7XG5cdFx0XG5cdFx0Y29uc3QgVEVNUExBVEUgPSAgWyBcblx0XHRcdFx0WyAnY29yZS9wYXJhZ3JhcGgnLCB7IHBsYWNlaG9sZGVyOiAnRW1iZWQgdGl0bGUnIH1dLFxuXHRcdFx0XHRbICdjb3JlL3BhcmFncmFwaCcsIHsgcGxhY2Vob2xkZXI6ICdBdXRob3InIH0gXSxcblx0XHRcdFx0WyAnY29yZS9lbWJlZCcgXSxcblx0XHRdO1xuXHRcdCAgXG5cdFx0cmV0dXJuIChcblx0XHRcdDw+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW1iZWQtaXRlbS10ZW1wbGF0ZVwiIGtleT1cImNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHQ8SW5uZXJCbG9ja3Ncblx0XHRcdFx0XHRcdFx0YWxsb3dlZEJsb2Nrcz17WyAnY29yZS9lbWJlZCcsICdjb3JlL3BhcmFncmFwaCcgXX1cblx0XHRcdFx0XHRcdFx0dGVtcGxhdGU9e1RFTVBMQVRFfVxuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZUxvY2s9XCJhbGxcIlxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8Lz5cblx0XHQpO1xuXHR9LFxuXG5cdHNhdmU6IChwcm9wcykgPT4ge1xuXHRcdGNvbnN0IHtcblx0XHRcdGNsYXNzTmFtZSxcblx0XHRcdGlzU2VsZWN0ZWQsXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHQgIHRpdGxlLFxuXHRcdFx0fSxcblx0XHRcdHNldEF0dHJpYnV0ZXMsXG5cdFx0ICB9ID0gcHJvcHM7XG5cdCAgXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PD5cdFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVtYmVkLXRlbXBsYXRlLWJsb2NrXCI+XG5cdFx0XHRcdFx0PElubmVyQmxvY2tzLkNvbnRlbnQvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvPlxuXHRcdCk7XG5cdH0sXG59KTtcblxuLy8gW21jNHdwX2Zvcm0gaWQ9XCI2NVwiXVxuIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIndwXCJdW1wiYmxvY2tFZGl0b3JcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIndwXCJdW1wiY29tcG9uZW50c1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wid3BcIl1bXCJpMThuXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=