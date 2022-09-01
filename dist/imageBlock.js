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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/blocks/imageBlock/index.js":
/*!******************************************************!*\
  !*** ./assets/javascript/blocks/imageBlock/index.js ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}




wp.blocks.registerBlockType("jeo-theme/custom-image-block-editor", {
  title: "Credited Image",
  icon: "format-image",
  category: "media",
  supports: {
    align: true
  },
  attributes: {
    mediaID: {
      type: "number"
    },
    mediaURL: {
      type: "string"
    }
  },
  edit: function edit(props) {
    var className = props.className,
        isSelected = props.isSelected,
        _props$attributes = props.attributes,
        mediaID = _props$attributes.mediaID,
        mediaURL = _props$attributes.mediaURL,
        setAttributes = props.setAttributes;

    var onChangeTitle = function onChangeTitle(value) {
      setAttributes({
        title: value
      });
    };

    var onSelectImage = function onSelectImage(media) {
      setAttributes({
        mediaURL: media.url,
        mediaID: media.id,
        updated: Date.now()
      });
    };

    var imageClasses = "left",
        textClasses = className,
        wrapClass = "image-block-container";
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: wrapClass,
      key: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "callout-image" + (!mediaID ? ' not-selected' : ' selected-image')
    }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["MediaUpload"], {
      onSelect: onSelectImage,
      type: "image",
      value: mediaID,
      render: function render(_ref) {
        var open = _ref.open;
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
          isPrimary: true,
          className: mediaID ? "image-button margin-auto" : "image-button button-large margin-auto",
          onClick: open
        }, !mediaID ? Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])("Upload Image", "jeo") : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])("Edit image", "jeo")));
      }
    })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Disabled"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["ServerSideRender"], {
      block: "jeo-theme/custom-image-block-editor",
      attributes: _objectSpread({}, props.attributes)
    }))));
  },
  save: function save(props) {
    var className = props.className,
        _props$attributes2 = props.attributes,
        mediaID = _props$attributes2.mediaID,
        mediaURL = _props$attributes2.mediaURL,
        title = _props$attributes2.title,
        mediaDescription = _props$attributes2.mediaDescription,
        align = _props$attributes2.align;
    return null;
  }
});

/***/ }),

/***/ 9:
/*!************************************************************!*\
  !*** multi ./assets/javascript/blocks/imageBlock/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/html/plenamata/code/wp-content/themes/jeo-theme/assets/javascript/blocks/imageBlock/index.js */"./assets/javascript/blocks/imageBlock/index.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvYmxvY2tzL2ltYWdlQmxvY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFtcIndwXCIsXCJibG9ja0VkaXRvclwiXSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgW1wid3BcIixcImNvbXBvbmVudHNcIl0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFtcIndwXCIsXCJpMThuXCJdIl0sIm5hbWVzIjpbIndwIiwidGl0bGUiLCJpY29uIiwiY2F0ZWdvcnkiLCJzdXBwb3J0cyIsImFsaWduIiwiYXR0cmlidXRlcyIsIm1lZGlhSUQiLCJ0eXBlIiwibWVkaWFVUkwiLCJlZGl0IiwiY2xhc3NOYW1lIiwicHJvcHMiLCJpc1NlbGVjdGVkIiwic2V0QXR0cmlidXRlcyIsIm9uQ2hhbmdlVGl0bGUiLCJ2YWx1ZSIsIm9uU2VsZWN0SW1hZ2UiLCJtZWRpYSIsInVwZGF0ZWQiLCJEYXRlIiwiaW1hZ2VDbGFzc2VzIiwidGV4dENsYXNzZXMiLCJ3cmFwQ2xhc3MiLCJvcGVuIiwiX18iLCJzYXZlIiwibWVkaWFEZXNjcmlwdGlvbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUZBLGdFQUFtRTtBQUMvREMsT0FBSyxFQUQwRDtBQUUvREMsTUFBSSxFQUYyRDtBQUcvREMsVUFBUSxFQUh1RDtBQUkvREMsVUFBUSxFQUFFO0FBQ05DLFNBQUssRUFBRTtBQURELEdBSnFEO0FBTy9EQyxZQUFVLEVBQUU7QUFDUkMsV0FBTyxFQUFFO0FBQ0xDLFVBQUksRUFBRTtBQURELEtBREQ7QUFJUkMsWUFBUSxFQUFFO0FBQ05ELFVBQUksRUFBRTtBQURBO0FBSkYsR0FQbUQ7QUFnQi9ERSxNQUFJLEVBQUUscUJBQVc7QUFBQSxRQUVUQyxTQUZTLEdBU1RDLEtBVFM7QUFBQSxRQUdUQyxVQUhTLEdBU1RELEtBVFM7QUFBQSw0QkFTVEEsS0FUUztBQUFBLFFBS0xMLE9BTEs7QUFBQSxRQU1MRSxRQU5LO0FBQUEsUUFRVEssYUFSUyxHQVNURixLQVRTOztBQVdiLFFBQU1HLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsUUFBVztBQUM3QkQsbUJBQWEsQ0FBQztBQUFFYixhQUFLLEVBQUVlO0FBQVQsT0FBRCxDQUFiRjtBQURKOztBQUlBLFFBQU1HLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsUUFBVztBQUM3QkgsbUJBQWEsQ0FBQztBQUNWTCxnQkFBUSxFQUFFUyxLQUFLLENBREw7QUFFVlgsZUFBTyxFQUFFVyxLQUFLLENBRko7QUFHVkMsZUFBTyxFQUFFQyxJQUFJLENBQUpBO0FBSEMsT0FBRCxDQUFiTjtBQURKOztBQWZhLFFBdUJOTyxZQXZCTTtBQUFBLFFBdUJRQyxXQXZCUjtBQUFBLFFBdUJxQkMsU0F2QnJCO0FBNkJiLHdCQUNJLHVEQUNJO0FBQUssZUFBUyxFQUFkO0FBQTJCLFNBQUcsRUFBQztBQUEvQixvQkFDSTtBQUFLLGVBQVMsRUFBRyxtQkFBbUIsNkJBQW5CO0FBQWpCLG9CQUNJO0FBQ0ksY0FBUSxFQURaO0FBRUksVUFBSSxFQUZSO0FBR0ksV0FBSyxFQUhUO0FBSUksWUFBTSxFQUFFO0FBQUEsWUFBR0MsSUFBSDtBQUFBLDRCQUNKLHVEQUNJO0FBQ0ksbUJBQVMsRUFEYjtBQUVJLG1CQUFTLEVBQ0xqQixPQUFPLGdDQUhmO0FBT0ksaUJBQU8sRUFBRWlCO0FBUGIsV0FTSyxXQUFXQywwREFBRSxpQkFBYixLQUFhLENBQWIsR0FBdUNBLDBEQUFFLGVBWDlDLEtBVzhDLENBVDlDLENBREosQ0FESTtBQUFBO0FBSlosTUFESixDQURKLGVBdUJJLHVHQUNJO0FBQ0ksV0FBSyxFQURUO0FBRUksZ0JBQVUsb0JBQU9iLEtBQUssQ0FBWjtBQUZkLE1BREosQ0F2QkosQ0FESixDQURKO0FBN0MyRDtBQW1GL0RjLE1BQUksRUFBRSxxQkFBVztBQUFBLFFBRVRmLFNBRlMsR0FVVEMsS0FWUztBQUFBLDZCQVVUQSxLQVZTO0FBQUEsUUFJTEwsT0FKSztBQUFBLFFBS0xFLFFBTEs7QUFBQSxRQU1MUixLQU5LO0FBQUEsUUFPTDBCLGdCQVBLO0FBQUEsUUFRTHRCLEtBUks7QUFZYjtBQUNIO0FBaEc4RCxDQUFuRUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQSxhQUFhLDhDQUE4QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTdELGFBQWEsNkNBQTZDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBNUQsYUFBYSx1Q0FBdUMsRUFBRSxJIiwiZmlsZSI6Ii9pbWFnZUJsb2NrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuLy9kaXN0XCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA5KTtcbiIsImltcG9ydCB7IE1lZGlhVXBsb2FkLCBSaWNoVGV4dCB9IGZyb20gXCJAd29yZHByZXNzL2Jsb2NrLWVkaXRvclwiO1xuaW1wb3J0IHsgQnV0dG9uLCBTZXJ2ZXJTaWRlUmVuZGVyLCBEaXNhYmxlZCB9IGZyb20gXCJAd29yZHByZXNzL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IF9fIH0gZnJvbSBcIkB3b3JkcHJlc3MvaTE4blwiO1xuXG53cC5ibG9ja3MucmVnaXN0ZXJCbG9ja1R5cGUoXCJqZW8tdGhlbWUvY3VzdG9tLWltYWdlLWJsb2NrLWVkaXRvclwiLCB7XG4gICAgdGl0bGU6IFwiQ3JlZGl0ZWQgSW1hZ2VcIixcbiAgICBpY29uOiBcImZvcm1hdC1pbWFnZVwiLFxuICAgIGNhdGVnb3J5OiBcIm1lZGlhXCIsXG4gICAgc3VwcG9ydHM6IHtcbiAgICAgICAgYWxpZ246IHRydWUsXG4gICAgfSxcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIG1lZGlhSUQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG1lZGlhVVJMOiB7XG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBlZGl0OiAocHJvcHMpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgaXNTZWxlY3RlZCxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBtZWRpYUlELFxuICAgICAgICAgICAgICAgIG1lZGlhVVJMLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZXMsXG4gICAgICAgIH0gPSBwcm9wcztcblxuICAgICAgICBjb25zdCBvbkNoYW5nZVRpdGxlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBzZXRBdHRyaWJ1dGVzKHsgdGl0bGU6IHZhbHVlIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uU2VsZWN0SW1hZ2UgPSAobWVkaWEpID0+IHtcbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgICAgIG1lZGlhVVJMOiBtZWRpYS51cmwsXG4gICAgICAgICAgICAgICAgbWVkaWFJRDogbWVkaWEuaWQsXG4gICAgICAgICAgICAgICAgdXBkYXRlZDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IFtpbWFnZUNsYXNzZXMsIHRleHRDbGFzc2VzLCB3cmFwQ2xhc3NdID0gW1xuICAgICAgICAgICAgXCJsZWZ0XCIsXG4gICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICBcImltYWdlLWJsb2NrLWNvbnRhaW5lclwiLFxuICAgICAgICBdO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt3cmFwQ2xhc3N9IGtleT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IFwiY2FsbG91dC1pbWFnZVwiICsgKCFtZWRpYUlEID8gJyBub3Qtc2VsZWN0ZWQnIDogJyBzZWxlY3RlZC1pbWFnZScpIH0gPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lZGlhVXBsb2FkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0SW1hZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImltYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bWVkaWFJRH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI9eyh7IG9wZW4gfSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJpbWFyeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lZGlhSURcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJpbWFnZS1idXR0b24gbWFyZ2luLWF1dG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImltYWdlLWJ1dHRvbiBidXR0b24tbGFyZ2UgbWFyZ2luLWF1dG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvcGVufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshbWVkaWFJRCA/IF9fKFwiVXBsb2FkIEltYWdlXCIsIFwiamVvXCIpIDogX18oXCJFZGl0IGltYWdlXCIsIFwiamVvXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPERpc2FibGVkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNlcnZlclNpZGVSZW5kZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9jaz1cImplby10aGVtZS9jdXN0b20taW1hZ2UtYmxvY2stZWRpdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzPXsgey4uLnByb3BzLmF0dHJpYnV0ZXMgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvRGlzYWJsZWQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvPlxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBzYXZlOiAocHJvcHMpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgIG1lZGlhSUQsXG4gICAgICAgICAgICAgICAgbWVkaWFVUkwsXG4gICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgbWVkaWFEZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBhbGlnbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0gPSBwcm9wcztcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxufSk7XG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wid3BcIl1bXCJibG9ja0VkaXRvclwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wid3BcIl1bXCJjb21wb25lbnRzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJ3cFwiXVtcImkxOG5cIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==