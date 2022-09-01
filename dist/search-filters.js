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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/functionalities/search-filters.js":
/*!*************************************************************!*\
  !*** ./assets/javascript/functionalities/search-filters.js ***!
  \*************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

window.addEventListener("DOMContentLoaded", function () {
  var topicsLabel = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Topics', 'jeo');

  var regionsLabel = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Regions', 'jeo');

  var clearLabel = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Clear', 'jeo');

  var applyLabel = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Apply', 'jeo');

  if (document.querySelector('body').classList.contains('search')) {
    jQuery('.filters select#topics').select2({
      placeholder: topicsLabel
    });
    jQuery('.filters select#regions').select2({
      placeholder: regionsLabel
    });
    jQuery('input[name="daterange"]').daterangepicker({
      minDate: "01/01/2010",
      maxDate: new Date(),
      autoUpdateInput: false,
      locale: {
        cancelLabel: clearLabel,
        applyLabel: applyLabel
      }
    }); // Search fields

    jQuery('input[name="daterange"]').on("apply.daterangepicker", function (ev, picker) {
      jQuery(this).val(picker.startDate.format("MM/DD/YYYY") + " - " + picker.endDate.format("MM/DD/YYYY"));
      jQuery(this).closest('form').submit();
    });
    jQuery('input[name="daterange"]').on("cancel.daterangepicker", function (ev, picker) {
      jQuery(this).val("");
    });

    if (jQuery('input[name="daterange"]').attr("replace-empty") === "true") {
      jQuery('input[name="daterange"]').val("");
    }

    if (jQuery(".sorting-method").length) {
      jQuery(".sorting-method .current").click(function () {
        jQuery(".sorting-method .options").toggleClass("active");
        jQuery("#sorting").attr("value", jQuery(".sorting-method .options button").attr("value"));
      });
      jQuery(".sorting-option").click(function () {
        jQuery("#sorting").attr("value", jQuery(this).attr("value"));
        jQuery(this).closest("form").submit();
      });
    }
  }
});

/***/ }),

/***/ 1:
/*!*******************************************************************!*\
  !*** multi ./assets/javascript/functionalities/search-filters.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/html/plenamata/code/wp-content/themes/jeo-theme/assets/javascript/functionalities/search-filters.js */"./assets/javascript/functionalities/search-filters.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvZnVuY3Rpb25hbGl0aWVzL3NlYXJjaC1maWx0ZXJzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBbXCJ3cFwiLFwiaTE4blwiXSJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJ0b3BpY3NMYWJlbCIsIl9fIiwicmVnaW9uc0xhYmVsIiwiY2xlYXJMYWJlbCIsImFwcGx5TGFiZWwiLCJkb2N1bWVudCIsImpRdWVyeSIsInBsYWNlaG9sZGVyIiwibWluRGF0ZSIsIm1heERhdGUiLCJhdXRvVXBkYXRlSW5wdXQiLCJsb2NhbGUiLCJjYW5jZWxMYWJlbCIsInBpY2tlciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUVBQSxNQUFNLENBQU5BLHFDQUE0QyxZQUFZO0FBQ3BELE1BQU1DLFdBQVcsR0FBR0MsMERBQUUsV0FBdEIsS0FBc0IsQ0FBdEI7O0FBQ0EsTUFBTUMsWUFBWSxHQUFHRCwwREFBRSxZQUF2QixLQUF1QixDQUF2Qjs7QUFDQSxNQUFNRSxVQUFVLEdBQUdGLDBEQUFFLFVBQXJCLEtBQXFCLENBQXJCOztBQUNBLE1BQU1HLFVBQVUsR0FBR0gsMERBQUUsVUFBckIsS0FBcUIsQ0FBckI7O0FBR0EsTUFBSUksUUFBUSxDQUFSQSx5Q0FBSixRQUFJQSxDQUFKLEVBQWlFO0FBQzdEQyxVQUFNLENBQU5BLHdCQUFNLENBQU5BLFNBQXlDO0FBQ3JDQyxpQkFBVyxFQUFFUDtBQUR3QixLQUF6Q007QUFJQUEsVUFBTSxDQUFOQSx5QkFBTSxDQUFOQSxTQUEwQztBQUN0Q0MsaUJBQVcsRUFBRUw7QUFEeUIsS0FBMUNJO0FBSUFBLFVBQU0sQ0FBTkEseUJBQU0sQ0FBTkEsaUJBQWtEO0FBQzlDRSxhQUFPLEVBRHVDO0FBRTlDQyxhQUFPLEVBQUUsSUFGcUMsSUFFckMsRUFGcUM7QUFHOUNDLHFCQUFlLEVBSCtCO0FBSTlDQyxZQUFNLEVBQUU7QUFDSkMsbUJBQVcsRUFEUDtBQUVKUixrQkFBVSxFQUFWQTtBQUZJO0FBSnNDLEtBQWxERSxFQVQ2RCxDQW1CN0Q7O0FBQ0FBLFVBQU0sQ0FBTkEseUJBQU0sQ0FBTkEsNkJBQThELHNCQUc1RDtBQUNFQSxZQUFNLENBQU5BLElBQU0sQ0FBTkEsS0FDSU8sTUFBTSxDQUFOQSx5Q0FFQUEsTUFBTSxDQUFOQSxlQUhKUCxZQUdJTyxDQUhKUDtBQU1BQSxZQUFNLENBQU5BLElBQU0sQ0FBTkE7QUFWSkE7QUFhQUEsVUFBTSxDQUFOQSx5QkFBTSxDQUFOQSw4QkFBK0Qsc0JBRzdEO0FBQ0VBLFlBQU0sQ0FBTkEsSUFBTSxDQUFOQTtBQUpKQTs7QUFPQSxRQUFJQSxNQUFNLENBQU5BLHlCQUFNLENBQU5BLDJCQUFKLFFBQXdFO0FBQ3BFQSxZQUFNLENBQU5BLHlCQUFNLENBQU5BO0FBQ0g7O0FBRUQsUUFBSUEsTUFBTSxDQUFOQSxpQkFBTSxDQUFOQSxDQUFKLFFBQXNDO0FBQ2xDQSxZQUFNLENBQU5BLDBCQUFNLENBQU5BLE9BQXlDLFlBQVk7QUFDakRBLGNBQU0sQ0FBTkEsMEJBQU0sQ0FBTkE7QUFDQUEsY0FBTSxDQUFOQSxVQUFNLENBQU5BLGVBRUlBLE1BQU0sQ0FBTkEsaUNBQU0sQ0FBTkEsTUFGSkEsT0FFSUEsQ0FGSkE7QUFGSkE7QUFRQUEsWUFBTSxDQUFOQSxpQkFBTSxDQUFOQSxPQUFnQyxZQUFZO0FBQ3hDQSxjQUFNLENBQU5BLFVBQU0sQ0FBTkEsZUFBaUNBLE1BQU0sQ0FBTkEsSUFBTSxDQUFOQSxNQUFqQ0EsT0FBaUNBLENBQWpDQTtBQUNBQSxjQUFNLENBQU5BLElBQU0sQ0FBTkE7QUFGSkE7QUFJSDtBQUNKO0FBakVMUCxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBLGFBQWEsdUNBQXVDLEVBQUUsSSIsImZpbGUiOiIvc2VhcmNoLWZpbHRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4vL2Rpc3RcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuIiwiaW1wb3J0IHsgX18gfSBmcm9tICdAd29yZHByZXNzL2kxOG4nO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRvcGljc0xhYmVsID0gX18oICdUb3BpY3MnLCAnamVvJyApO1xuICAgIGNvbnN0IHJlZ2lvbnNMYWJlbCA9IF9fKCAnUmVnaW9ucycsICdqZW8nICk7XG4gICAgY29uc3QgY2xlYXJMYWJlbCA9IF9fKCAnQ2xlYXInLCAnamVvJyApO1xuICAgIGNvbnN0IGFwcGx5TGFiZWwgPSBfXyggJ0FwcGx5JywgJ2plbycgKTtcblxuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlYXJjaCcpKSB7XG4gICAgICAgIGpRdWVyeSgnLmZpbHRlcnMgc2VsZWN0I3RvcGljcycpLnNlbGVjdDIoe1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRvcGljc0xhYmVsLFxuICAgICAgICB9KTtcblxuICAgICAgICBqUXVlcnkoJy5maWx0ZXJzIHNlbGVjdCNyZWdpb25zJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogcmVnaW9uc0xhYmVsLFxuICAgICAgICB9KTtcblxuICAgICAgICBqUXVlcnkoJ2lucHV0W25hbWU9XCJkYXRlcmFuZ2VcIl0nKS5kYXRlcmFuZ2VwaWNrZXIoe1xuICAgICAgICAgICAgbWluRGF0ZTogXCIwMS8wMS8yMDEwXCIsXG4gICAgICAgICAgICBtYXhEYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgYXV0b1VwZGF0ZUlucHV0OiBmYWxzZSxcbiAgICAgICAgICAgIGxvY2FsZToge1xuICAgICAgICAgICAgICAgIGNhbmNlbExhYmVsOiBjbGVhckxhYmVsLFxuICAgICAgICAgICAgICAgIGFwcGx5TGFiZWwsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTZWFyY2ggZmllbGRzXG4gICAgICAgIGpRdWVyeSgnaW5wdXRbbmFtZT1cImRhdGVyYW5nZVwiXScpLm9uKFwiYXBwbHkuZGF0ZXJhbmdlcGlja2VyXCIsIGZ1bmN0aW9uIChcbiAgICAgICAgICAgIGV2LFxuICAgICAgICAgICAgcGlja2VyXG4gICAgICAgICkge1xuICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLnZhbChcbiAgICAgICAgICAgICAgICBwaWNrZXIuc3RhcnREYXRlLmZvcm1hdChcIk1NL0REL1lZWVlcIikgK1xuICAgICAgICAgICAgICAgIFwiIC0gXCIgK1xuICAgICAgICAgICAgICAgIHBpY2tlci5lbmREYXRlLmZvcm1hdChcIk1NL0REL1lZWVlcIilcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGpRdWVyeSh0aGlzKS5jbG9zZXN0KCdmb3JtJykuc3VibWl0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGpRdWVyeSgnaW5wdXRbbmFtZT1cImRhdGVyYW5nZVwiXScpLm9uKFwiY2FuY2VsLmRhdGVyYW5nZXBpY2tlclwiLCBmdW5jdGlvbiAoXG4gICAgICAgICAgICBldixcbiAgICAgICAgICAgIHBpY2tlclxuICAgICAgICApIHtcbiAgICAgICAgICAgIGpRdWVyeSh0aGlzKS52YWwoXCJcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChqUXVlcnkoJ2lucHV0W25hbWU9XCJkYXRlcmFuZ2VcIl0nKS5hdHRyKFwicmVwbGFjZS1lbXB0eVwiKSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgIGpRdWVyeSgnaW5wdXRbbmFtZT1cImRhdGVyYW5nZVwiXScpLnZhbChcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChqUXVlcnkoXCIuc29ydGluZy1tZXRob2RcIikubGVuZ3RoKSB7XG4gICAgICAgICAgICBqUXVlcnkoXCIuc29ydGluZy1tZXRob2QgLmN1cnJlbnRcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGpRdWVyeShcIi5zb3J0aW5nLW1ldGhvZCAub3B0aW9uc1wiKS50b2dnbGVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICBqUXVlcnkoXCIjc29ydGluZ1wiKS5hdHRyKFxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCIsXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeShcIi5zb3J0aW5nLW1ldGhvZCAub3B0aW9ucyBidXR0b25cIikuYXR0cihcInZhbHVlXCIpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBqUXVlcnkoXCIuc29ydGluZy1vcHRpb25cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGpRdWVyeShcIiNzb3J0aW5nXCIpLmF0dHIoXCJ2YWx1ZVwiLCBqUXVlcnkodGhpcykuYXR0cihcInZhbHVlXCIpKTtcbiAgICAgICAgICAgICAgICBqUXVlcnkodGhpcykuY2xvc2VzdChcImZvcm1cIikuc3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIndwXCJdW1wiaTE4blwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9