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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/functionalities/image-gallery.js":
/*!************************************************************!*\
  !*** ./assets/javascript/functionalities/image-gallery.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendor_sss_sss_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../vendor/sss/sss.min */ "./assets/vendor/sss/sss.min.js");

window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.image-gallery .gallery-grid').forEach(function (slider, index) {
    var sss = new _vendor_sss_sss_min__WEBPACK_IMPORTED_MODULE_0__["default"](slider, {
      slideShow: false,
      startOn: 0,
      transition: 0,
      speed: 0,
      showNav: true
    });
    var dotsArray = Array.from({
      length: slider.getAttribute('data-total-slides')
    }, function (v, i) {
      var dot = document.createElement('div');
      dot.classList.add('dot');
      dot.setAttribute('target', i);

      if (i == 0) {
        dot.classList.add('active');
      }

      return dot;
    });
    dotsArray.forEach(function (dot, index) {
      dot.onclick = function () {
        jQuery(dotsArray).removeClass('active');
        dot.classList.toggle('active');
        sss.go_to_slide(index);
      };
    });
    var dotsWrapper = document.createElement('div');
    dotsWrapper.classList.add('dots-wrapper');
    dotsArray.forEach(function (dot) {
      return dotsWrapper.appendChild(dot);
    });
    slider.parentNode.appendChild(dotsWrapper);
    slider.querySelector('.sssprev').addEventListener('click', function () {
      jQuery(dotsWrapper.querySelectorAll('.dot')).removeClass('active');
      jQuery(dotsWrapper.querySelectorAll('.dot')).eq(sss.target).toggleClass('active');
    });
    slider.querySelector('.sssnext').addEventListener('click', function () {
      jQuery(dotsWrapper.querySelectorAll('.dot')).removeClass('active');
      jQuery(dotsWrapper.querySelectorAll('.dot')).eq(sss.target).toggleClass('active');
    });

    slider.parentNode.querySelector('button[action="fullsreen"]').onclick = function () {
      slider.parentNode.parentNode.classList.toggle('fullscreen');
      this.querySelector('i').classList.toggle('fa-expand');
      this.querySelector('i').classList.toggle('fa-compress');
    };

    slider.parentNode.querySelector('button[action="display-grid"]').onclick = function () {
      slider.parentNode.parentNode.classList.toggle('grid-display');
      this.querySelector('i').classList.toggle('fa-th');
      this.querySelector('i').classList.toggle('fas');
      this.querySelector('i').classList.toggle('far');
      this.querySelector('i').classList.toggle('fa-square');
    };

    slider.querySelectorAll('.gallery-item-container img').forEach(function (element, slide_index) {
      element.onclick = function () {
        if (slider.parentNode.parentNode.classList.contains('grid-display')) {
          slider.parentNode.parentNode.classList.toggle('grid-display');
          slider.querySelectorAll('.gallery-item-container').forEach(function (element) {
            return element.style.display = "none";
          });
          this.parentNode.style.display = "block";
          jQuery(dotsWrapper.querySelectorAll('.dot')).removeClass('active');
          jQuery(dotsWrapper.querySelectorAll('.dot')).eq(slide_index).toggleClass('active');
          sss.go_to_slide(slide_index);
          slider.parentNode.querySelector('button[action="display-grid"]').querySelector('i').classList.toggle('fa-th');
          slider.parentNode.querySelector('button[action="display-grid"]').querySelector('i').classList.toggle('fas');
          slider.parentNode.querySelector('button[action="display-grid"]').querySelector('i').classList.toggle('far');
          slider.parentNode.querySelector('button[action="display-grid"]').querySelector('i').classList.toggle('fa-square');
        }
      };
    });
  });
});

/***/ }),

/***/ "./assets/vendor/sss/sss.min.js":
/*!**************************************!*\
  !*** ./assets/vendor/sss/sss.min.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SSS; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
/** Super Simple Slider by @intllgnt **/
// ; (function ($, window, document, undefined) {
//     $.fn.sss = function (options) {
//         // Options
//         var settings = $.extend({
//             slideShow: true,
//             startOn: 0,
//             speed: 3500,
//             transition: 400,
//             arrows: true,
//         }, options);
//         console.log(this);
//         return this.each(function () {
//             // Variables
//             var
//                 wrapper = $(this),
//                 slides = wrapper.children().wrapAll('<div class="sss"/>').addClass('ssslide'),
//                 slider = wrapper.find('.sss'),
//                 slide_count = slides.length,
//                 transition = settings.transition,
//                 starting_slide = settings.startOn,
//                 target = starting_slide > slide_count - 1 ? 0 : starting_slide,
//                 animating = false,
//                 clicked,
//                 timer,
//                 key,
//                 prev,
//                 next,
//                 // Reset Slideshow
//                 reset_timer = settings.slideShow ? function () {
//                     clearTimeout(timer);
//                     timer = setTimeout(next_slide, settings.speed);
//                 } : $.noop;
//             // Animate Slider
//             function get_height(target) {
//                 return ((slides.eq(target).height() / slider.width()) * 100) + '%';
//             }
//             function animate_slide(target) {
//                 if (!animating) {
//                     animating = true;
//                     var target_slide = slides.eq(target);
//                     target_slide.fadeIn(transition);
//                     slides.not(target_slide).fadeOut(transition);
//                     slider.animate({ PaddingBottom: get_height(target) }, transition, function () {
//                         animating = false;
//                     });
//                     reset_timer();
//                 }
//             };
//             // Next Slide
//             function next_slide() {
//                 target = target === slide_count - 1 ? 0 : target + 1;
//                 animate_slide(target);
//             }
//             // Prev Slide
//             function prev_slide() {
//                 target = target === 0 ? slide_count - 1 : target - 1;
//                 animate_slide(target);
//             }
//             if (settings.arrows) {
//                 slider.append('<div class="sssprev"/>', '<div class="sssnext"/>');
//             }
//             next = slider.find('.sssnext'),
//             prev = slider.find('.sssprev');
//             $(window).load(function () {
//                 slider.css({ PaddingBottom: get_height(target) }).click(function (e) {
//                     clicked = $(e.target);
//                     if (clicked.is(next)) { next_slide() }
//                     else if (clicked.is(prev)) { prev_slide() }
//                 });
//                 animate_slide(target);
//                 $(document).keydown(function (e) {
//                     key = e.keyCode;
//                     if (key === 39) { next_slide() }
//                     else if (key === 37) { prev_slide() }
//                 });
//             });
//             // End
//         });
//     };
// })(jQuery, window, document);


var SSS = /*#__PURE__*/function () {
  function SSS(element, options) {
    var _this = this;

    _classCallCheck(this, SSS);

    var settings = jQuery.extend({
      slideShow: true,
      startOn: 0,
      speed: 3500,
      transition: 400,
      arrows: true
    }, options);
    this.wrapper = jQuery(element);
    this.slides = this.wrapper.children().wrapAll('<div class="sss"/>').addClass('ssslide');
    this.slider = this.wrapper.find('.sss');
    this.slide_count = this.slides.length;
    this.transition = settings.transition;
    this.starting_slide = settings.startOn;
    this.target = this.starting_slide > this.slide_count - 1 ? 0 : this.starting_slide;
    this.animating = false;
    this.clicked;
    this.timer;
    this.key;
    this.prev;
    this.next; // Reset Slideshow

    this.reset_timer = settings.slideShow ? function () {
      clearTimeout(this.timer);
      this.timer = setTimeout(next_slide, settings.speed);
    } : function () {};

    if (settings.arrows) {
      this.slider.append('<div class="sssprev"/>', '<div class="sssnext"/>');
    }

    this.next = this.slider.find('.sssnext'), this.prev = this.slider.find('.sssprev');

    this.prev[0].onclick = function () {
      _this.prev_slide();
    };

    this.next[0].onclick = function () {
      _this.next_slide();
    };

    this.animate_slide(this.target);
  } // Animate Slider


  _createClass(SSS, [{
    key: "get_height",
    value: function get_height(target) {
      return this.slides.eq(target).height() / this.slider.width() * 100 + '%';
    }
  }, {
    key: "animate_slide",
    value: function animate_slide(target) {
      this.animating = true;
      var target_slide = this.slides.eq(target);
      target_slide.fadeIn(this.transition);
      this.slides.not(target_slide).fadeOut(this.transition);
      this.slider.animate({
        PaddingBottom: this.get_height(target)
      }, this.transition, function () {
        this.animating = false;
      });
      this.reset_timer();
    }
  }, {
    key: "next_slide",
    // Next Slide
    value: function next_slide() {
      this.target = this.target === this.slide_count - 1 ? 0 : this.target + 1;
      this.animate_slide(this.target);
    } // Prev Slide

  }, {
    key: "prev_slide",
    value: function prev_slide() {
      this.target = this.target - 1;

      if (this.target < 0) {
        this.target = this.slide_count - 1;
      }

      this.animate_slide(this.target);
    }
  }, {
    key: "go_to_slide",
    value: function go_to_slide(target) {
      this.target = target;
      this.animate_slide(target);
    }
  }]);

  return SSS;
}();



/***/ }),

/***/ 3:
/*!******************************************************************!*\
  !*** multi ./assets/javascript/functionalities/image-gallery.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/html/plenamata/code/wp-content/themes/jeo-theme/assets/javascript/functionalities/image-gallery.js */"./assets/javascript/functionalities/image-gallery.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvZnVuY3Rpb25hbGl0aWVzL2ltYWdlLWdhbGxlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3ZlbmRvci9zc3Mvc3NzLm1pbi5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJkb2N1bWVudCIsInNzcyIsInNsaWRlU2hvdyIsInN0YXJ0T24iLCJ0cmFuc2l0aW9uIiwic3BlZWQiLCJzaG93TmF2IiwiZG90c0FycmF5IiwibGVuZ3RoIiwic2xpZGVyIiwiZG90IiwiaSIsImpRdWVyeSIsImRvdHNXcmFwcGVyIiwiZWxlbWVudCIsIlNTUyIsInNldHRpbmdzIiwiYXJyb3dzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInRhcmdldCIsInRhcmdldF9zbGlkZSIsIlBhZGRpbmdCb3R0b20iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7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OztBQUVELGdCQUFZLGlCQUFaLFVBQVksQ0FBWixFQUNBLFlBQVksaUJBRFosVUFDWSxDQURaOztBQUlBLDJCQUF1QixZQUFNO0FBQ3pCLFdBQUksQ0FBSjtBQURKOztBQUlBLDJCQUF1QixZQUFNO0FBQ3pCLFdBQUksQ0FBSjtBQURKOztBQUlBLHVCQUFtQixLQUFuQjtJQUtKOzs7OzsrQkFFV0ksTSxFQUFRO0FBQ2YsYUFBUyxrQ0FBa0MsWUFBbkMsS0FBbUMsRUFBbEMsR0FBRixHQUFFLEdBQVQ7QUFDSDs7O2tDQUVhQSxNLEVBQVE7QUFDbEI7QUFDQSxVQUFJQyxZQUFZLEdBQUcsZUFBbkIsTUFBbUIsQ0FBbkI7QUFDQUEsa0JBQVksQ0FBWkEsT0FBb0IsS0FBcEJBO0FBQ0EsNENBQXNDLEtBQXRDO0FBRUEsMEJBQW9CO0FBQUVDLHFCQUFhLEVBQUU7QUFBakIsT0FBcEIsRUFBZ0UsS0FBaEUsWUFBaUYsWUFBWTtBQUN6RjtBQURKO0FBSUE7QUFDSDs7O0FBRUQ7aUNBRWE7QUFDVCxvQkFBYyxnQkFBZ0IsbUJBQWhCLFFBQTJDLGNBQXpEO0FBQ0EseUJBQW1CLEtBQW5CO01BR0o7Ozs7aUNBRWE7QUFDVCxvQkFBYyxjQUFkOztBQUNBLFVBQUksY0FBSixHQUFxQjtBQUNqQixzQkFBYyxtQkFBZDtBQUNIOztBQUVELHlCQUFtQixLQUFuQjtBQUNIOzs7Z0NBRVdGLE0sRUFBUTtBQUNoQjtBQUNBO0FBQ0giLCJmaWxlIjoiL2ltYWdlLWdhbGxlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4vL2Rpc3RcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuIiwiaW1wb3J0IFNTUyBmcm9tICcuLy4uLy4uL3ZlbmRvci9zc3Mvc3NzLm1pbic7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmltYWdlLWdhbGxlcnkgLmdhbGxlcnktZ3JpZCcpLmZvckVhY2goZnVuY3Rpb24oc2xpZGVyLCBpbmRleCkge1xuICAgICAgICBjb25zdCBzc3MgPSBuZXcgU1NTKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVTaG93IDogZmFsc2UsIFxuICAgICAgICAgICAgc3RhcnRPbiA6IDAsIFxuICAgICAgICAgICAgdHJhbnNpdGlvbiA6IDAsXG4gICAgICAgICAgICBzcGVlZCA6IDAsIFxuICAgICAgICAgICAgc2hvd05hdiA6IHRydWVcbiAgICAgICAgfSApO1xuXG4gICAgICAgIGNvbnN0IGRvdHNBcnJheSA9IEFycmF5LmZyb20oe2xlbmd0aDogc2xpZGVyLmdldEF0dHJpYnV0ZSgnZGF0YS10b3RhbC1zbGlkZXMnKX0sICh2LCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRvdC5jbGFzc0xpc3QuYWRkKCdkb3QnKTtcbiAgICAgICAgICAgIGRvdC5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIGkpO1xuXG4gICAgICAgICAgICBpZihpID09IDApIHtcbiAgICAgICAgICAgICAgICBkb3QuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkb3Q7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvdHNBcnJheS5mb3JFYWNoKChkb3QsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBkb3Qub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGpRdWVyeShkb3RzQXJyYXkpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBkb3QuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgc3NzLmdvX3RvX3NsaWRlKGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZG90c1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZG90c1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZG90cy13cmFwcGVyJyk7XG4gICAgICAgIGRvdHNBcnJheS5mb3JFYWNoKGRvdCA9PiBkb3RzV3JhcHBlci5hcHBlbmRDaGlsZChkb3QpKVxuICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChkb3RzV3JhcHBlcik7XG5cbiAgICAgICAgc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zc3NwcmV2JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGpRdWVyeShkb3RzV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcuZG90JykpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGpRdWVyeShkb3RzV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcuZG90JykpLmVxKHNzcy50YXJnZXQpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zc3NuZXh0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGpRdWVyeShkb3RzV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcuZG90JykpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGpRdWVyeShkb3RzV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcuZG90JykpLmVxKHNzcy50YXJnZXQpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdidXR0b25bYWN0aW9uPVwiZnVsbHNyZWVuXCJdJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2xpZGVyLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdmdWxsc2NyZWVuJyk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2knKS5jbGFzc0xpc3QudG9nZ2xlKCdmYS1leHBhbmQnKTtcbiAgICAgICAgICAgIHRoaXMucXVlcnlTZWxlY3RvcignaScpLmNsYXNzTGlzdC50b2dnbGUoJ2ZhLWNvbXByZXNzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdidXR0b25bYWN0aW9uPVwiZGlzcGxheS1ncmlkXCJdJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2xpZGVyLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdncmlkLWRpc3BsYXknKTtcbiAgICAgICAgICAgIHRoaXMucXVlcnlTZWxlY3RvcignaScpLmNsYXNzTGlzdC50b2dnbGUoJ2ZhLXRoJyk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2knKS5jbGFzc0xpc3QudG9nZ2xlKCdmYXMnKTtcbiAgICAgICAgICAgIHRoaXMucXVlcnlTZWxlY3RvcignaScpLmNsYXNzTGlzdC50b2dnbGUoJ2ZhcicpO1xuICAgICAgICAgICAgdGhpcy5xdWVyeVNlbGVjdG9yKCdpJykuY2xhc3NMaXN0LnRvZ2dsZSgnZmEtc3F1YXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnktaXRlbS1jb250YWluZXIgaW1nJykuZm9yRWFjaCgoZWxlbWVudCwgc2xpZGVfaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKHNsaWRlci5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWRpc3BsYXknKSkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC50b2dnbGUoJ2dyaWQtZGlzcGxheScpO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnktaXRlbS1jb250YWluZXInKS5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KGRvdHNXcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kb3QnKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoZG90c1dyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnLmRvdCcpKS5lcShzbGlkZV9pbmRleCkudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNzcy5nb190b19zbGlkZShzbGlkZV9pbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignYnV0dG9uW2FjdGlvbj1cImRpc3BsYXktZ3JpZFwiXScpLnF1ZXJ5U2VsZWN0b3IoJ2knKS5jbGFzc0xpc3QudG9nZ2xlKCdmYS10aCcpO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdidXR0b25bYWN0aW9uPVwiZGlzcGxheS1ncmlkXCJdJykucXVlcnlTZWxlY3RvcignaScpLmNsYXNzTGlzdC50b2dnbGUoJ2ZhcycpO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdidXR0b25bYWN0aW9uPVwiZGlzcGxheS1ncmlkXCJdJykucXVlcnlTZWxlY3RvcignaScpLmNsYXNzTGlzdC50b2dnbGUoJ2ZhcicpO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdidXR0b25bYWN0aW9uPVwiZGlzcGxheS1ncmlkXCJdJykucXVlcnlTZWxlY3RvcignaScpLmNsYXNzTGlzdC50b2dnbGUoJ2ZhLXNxdWFyZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufSkiLCIvKiogU3VwZXIgU2ltcGxlIFNsaWRlciBieSBAaW50bGxnbnQgKiovXG5cbi8vIDsgKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcblxuLy8gICAgICQuZm4uc3NzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbi8vICAgICAgICAgLy8gT3B0aW9uc1xuXG4vLyAgICAgICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHtcbi8vICAgICAgICAgICAgIHNsaWRlU2hvdzogdHJ1ZSxcbi8vICAgICAgICAgICAgIHN0YXJ0T246IDAsXG4vLyAgICAgICAgICAgICBzcGVlZDogMzUwMCxcbi8vICAgICAgICAgICAgIHRyYW5zaXRpb246IDQwMCxcbi8vICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbi8vICAgICAgICAgfSwgb3B0aW9ucyk7XG5cbi8vICAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG5cbi8vICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAgICAgICAgIC8vIFZhcmlhYmxlc1xuXG4vLyAgICAgICAgICAgICB2YXJcbi8vICAgICAgICAgICAgICAgICB3cmFwcGVyID0gJCh0aGlzKSxcbi8vICAgICAgICAgICAgICAgICBzbGlkZXMgPSB3cmFwcGVyLmNoaWxkcmVuKCkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNzc1wiLz4nKS5hZGRDbGFzcygnc3NzbGlkZScpLFxuLy8gICAgICAgICAgICAgICAgIHNsaWRlciA9IHdyYXBwZXIuZmluZCgnLnNzcycpLFxuLy8gICAgICAgICAgICAgICAgIHNsaWRlX2NvdW50ID0gc2xpZGVzLmxlbmd0aCxcbi8vICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uID0gc2V0dGluZ3MudHJhbnNpdGlvbixcbi8vICAgICAgICAgICAgICAgICBzdGFydGluZ19zbGlkZSA9IHNldHRpbmdzLnN0YXJ0T24sXG4vLyAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gc3RhcnRpbmdfc2xpZGUgPiBzbGlkZV9jb3VudCAtIDEgPyAwIDogc3RhcnRpbmdfc2xpZGUsXG4vLyAgICAgICAgICAgICAgICAgYW5pbWF0aW5nID0gZmFsc2UsXG4vLyAgICAgICAgICAgICAgICAgY2xpY2tlZCxcbi8vICAgICAgICAgICAgICAgICB0aW1lcixcbi8vICAgICAgICAgICAgICAgICBrZXksXG4vLyAgICAgICAgICAgICAgICAgcHJldixcbi8vICAgICAgICAgICAgICAgICBuZXh0LFxuXG4vLyAgICAgICAgICAgICAgICAgLy8gUmVzZXQgU2xpZGVzaG93XG5cbi8vICAgICAgICAgICAgICAgICByZXNldF90aW1lciA9IHNldHRpbmdzLnNsaWRlU2hvdyA/IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbi8vICAgICAgICAgICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KG5leHRfc2xpZGUsIHNldHRpbmdzLnNwZWVkKTtcbi8vICAgICAgICAgICAgICAgICB9IDogJC5ub29wO1xuXG4vLyAgICAgICAgICAgICAvLyBBbmltYXRlIFNsaWRlclxuXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiBnZXRfaGVpZ2h0KHRhcmdldCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAoKHNsaWRlcy5lcSh0YXJnZXQpLmhlaWdodCgpIC8gc2xpZGVyLndpZHRoKCkpICogMTAwKSArICclJztcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gYW5pbWF0ZV9zbGlkZSh0YXJnZXQpIHtcbi8vICAgICAgICAgICAgICAgICBpZiAoIWFuaW1hdGluZykge1xuLy8gICAgICAgICAgICAgICAgICAgICBhbmltYXRpbmcgPSB0cnVlO1xuLy8gICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0X3NsaWRlID0gc2xpZGVzLmVxKHRhcmdldCk7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0X3NsaWRlLmZhZGVJbih0cmFuc2l0aW9uKTtcbi8vICAgICAgICAgICAgICAgICAgICAgc2xpZGVzLm5vdCh0YXJnZXRfc2xpZGUpLmZhZGVPdXQodHJhbnNpdGlvbik7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgc2xpZGVyLmFuaW1hdGUoeyBQYWRkaW5nQm90dG9tOiBnZXRfaGVpZ2h0KHRhcmdldCkgfSwgdHJhbnNpdGlvbiwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW5nID0gZmFsc2U7XG4vLyAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc2V0X3RpbWVyKCk7XG5cbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9O1xuXG4vLyAgICAgICAgICAgICAvLyBOZXh0IFNsaWRlXG5cbi8vICAgICAgICAgICAgIGZ1bmN0aW9uIG5leHRfc2xpZGUoKSB7XG4vLyAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID09PSBzbGlkZV9jb3VudCAtIDEgPyAwIDogdGFyZ2V0ICsgMTtcbi8vICAgICAgICAgICAgICAgICBhbmltYXRlX3NsaWRlKHRhcmdldCk7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIFByZXYgU2xpZGVcblxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gcHJldl9zbGlkZSgpIHtcbi8vICAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPT09IDAgPyBzbGlkZV9jb3VudCAtIDEgOiB0YXJnZXQgLSAxO1xuLy8gICAgICAgICAgICAgICAgIGFuaW1hdGVfc2xpZGUodGFyZ2V0KTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgaWYgKHNldHRpbmdzLmFycm93cykge1xuLy8gICAgICAgICAgICAgICAgIHNsaWRlci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJzc3NwcmV2XCIvPicsICc8ZGl2IGNsYXNzPVwic3NzbmV4dFwiLz4nKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgbmV4dCA9IHNsaWRlci5maW5kKCcuc3NzbmV4dCcpLFxuLy8gICAgICAgICAgICAgcHJldiA9IHNsaWRlci5maW5kKCcuc3NzcHJldicpO1xuXG4vLyAgICAgICAgICAgICAkKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAgICAgICAgICAgICBzbGlkZXIuY3NzKHsgUGFkZGluZ0JvdHRvbTogZ2V0X2hlaWdodCh0YXJnZXQpIH0pLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNsaWNrZWQgPSAkKGUudGFyZ2V0KTtcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrZWQuaXMobmV4dCkpIHsgbmV4dF9zbGlkZSgpIH1cbi8vICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2xpY2tlZC5pcyhwcmV2KSkgeyBwcmV2X3NsaWRlKCkgfVxuLy8gICAgICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICAgICAgICAgYW5pbWF0ZV9zbGlkZSh0YXJnZXQpO1xuXG4vLyAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkua2V5ZG93bihmdW5jdGlvbiAoZSkge1xuLy8gICAgICAgICAgICAgICAgICAgICBrZXkgPSBlLmtleUNvZGU7XG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IDM5KSB7IG5leHRfc2xpZGUoKSB9XG4vLyAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleSA9PT0gMzcpIHsgcHJldl9zbGlkZSgpIH1cbi8vICAgICAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgICAgIC8vIEVuZFxuXG4vLyAgICAgICAgIH0pO1xuICAgICAgICBcblxuLy8gICAgIH07XG4vLyB9KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNTUyB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgc2V0dGluZ3MgPSBqUXVlcnkuZXh0ZW5kKHtcbiAgICAgICAgICAgIHNsaWRlU2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIHN0YXJ0T246IDAsXG4gICAgICAgICAgICBzcGVlZDogMzUwMCxcbiAgICAgICAgICAgIHRyYW5zaXRpb246IDQwMCxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgfSwgb3B0aW9ucyk7ICBcbiAgICBcbiAgICAgICAgdGhpcy53cmFwcGVyID0galF1ZXJ5KGVsZW1lbnQpO1xuICAgICAgICB0aGlzLnNsaWRlcyA9IHRoaXMud3JhcHBlci5jaGlsZHJlbigpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzc3NcIi8+JykuYWRkQ2xhc3MoJ3Nzc2xpZGUnKTtcbiAgICAgICAgdGhpcy5zbGlkZXIgPSB0aGlzLndyYXBwZXIuZmluZCgnLnNzcycpO1xuICAgICAgICB0aGlzLnNsaWRlX2NvdW50ID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAgICAgICB0aGlzLnRyYW5zaXRpb24gPSBzZXR0aW5ncy50cmFuc2l0aW9uO1xuICAgICAgICB0aGlzLnN0YXJ0aW5nX3NsaWRlID0gc2V0dGluZ3Muc3RhcnRPbjtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLnN0YXJ0aW5nX3NsaWRlID4gdGhpcy5zbGlkZV9jb3VudCAtIDEgPyAwIDogdGhpcy5zdGFydGluZ19zbGlkZTtcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jbGlja2VkO1xuICAgICAgICB0aGlzLnRpbWVyO1xuICAgICAgICB0aGlzLmtleTtcbiAgICAgICAgdGhpcy5wcmV2O1xuICAgICAgICB0aGlzLm5leHQ7XG5cbiAgICAgICAgLy8gUmVzZXQgU2xpZGVzaG93XG5cbiAgICAgICAgdGhpcy5yZXNldF90aW1lciA9IHNldHRpbmdzLnNsaWRlU2hvdyA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KG5leHRfc2xpZGUsIHNldHRpbmdzLnNwZWVkKTtcbiAgICAgICAgfSA6ICgpID0+IHt9O1xuXG5cbiAgICAgICAgaWYgKHNldHRpbmdzLmFycm93cykge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwic3NzcHJldlwiLz4nLCAnPGRpdiBjbGFzcz1cInNzc25leHRcIi8+Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5leHQgPSB0aGlzLnNsaWRlci5maW5kKCcuc3NzbmV4dCcpLFxuICAgICAgICB0aGlzLnByZXYgPSB0aGlzLnNsaWRlci5maW5kKCcuc3NzcHJldicpO1xuXG5cbiAgICAgICAgdGhpcy5wcmV2WzBdLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByZXZfc2xpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmV4dFswXS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5uZXh0X3NsaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuaW1hdGVfc2xpZGUodGhpcy50YXJnZXQpO1xuXG4gICAgfVxuXG5cbiAgICAvLyBBbmltYXRlIFNsaWRlclxuXG4gICAgZ2V0X2hlaWdodCh0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuICgodGhpcy5zbGlkZXMuZXEodGFyZ2V0KS5oZWlnaHQoKSAvIHRoaXMuc2xpZGVyLndpZHRoKCkpICogMTAwKSArICclJztcbiAgICB9XG5cbiAgICBhbmltYXRlX3NsaWRlKHRhcmdldCkge1xuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIGxldCB0YXJnZXRfc2xpZGUgPSB0aGlzLnNsaWRlcy5lcSh0YXJnZXQpO1xuICAgICAgICB0YXJnZXRfc2xpZGUuZmFkZUluKHRoaXMudHJhbnNpdGlvbik7XG4gICAgICAgIHRoaXMuc2xpZGVzLm5vdCh0YXJnZXRfc2xpZGUpLmZhZGVPdXQodGhpcy50cmFuc2l0aW9uKTtcblxuICAgICAgICB0aGlzLnNsaWRlci5hbmltYXRlKHsgUGFkZGluZ0JvdHRvbTogdGhpcy5nZXRfaGVpZ2h0KHRhcmdldCkgfSwgdGhpcy50cmFuc2l0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlc2V0X3RpbWVyKCk7XG4gICAgfTtcblxuICAgIC8vIE5leHQgU2xpZGVcblxuICAgIG5leHRfc2xpZGUoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy50YXJnZXQgPT09IHRoaXMuc2xpZGVfY291bnQgLSAxID8gMCA6IHRoaXMudGFyZ2V0ICsgMTtcbiAgICAgICAgdGhpcy5hbmltYXRlX3NsaWRlKHRoaXMudGFyZ2V0KTtcbiAgICB9XG5cbiAgICAvLyBQcmV2IFNsaWRlXG5cbiAgICBwcmV2X3NsaWRlKCkge1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMudGFyZ2V0IC0gMTtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0IDwgMCkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLnNsaWRlX2NvdW50IC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYW5pbWF0ZV9zbGlkZSh0aGlzLnRhcmdldCk7XG4gICAgfVxuXG4gICAgZ29fdG9fc2xpZGUodGFyZ2V0KSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB0aGlzLmFuaW1hdGVfc2xpZGUodGFyZ2V0KTtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==