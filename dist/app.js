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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/app.js":
/*!**********************************!*\
  !*** ./assets/javascript/app.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functionalities_ajax_pv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functionalities/ajax-pv */ "./assets/javascript/functionalities/ajax-pv.js");
/* harmony import */ var _functionalities_ajax_pv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_functionalities_ajax_pv__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functionalities_dark_mode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functionalities/dark-mode */ "./assets/javascript/functionalities/dark-mode.js");
/* harmony import */ var _functionalities_hash_ajust__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functionalities/hash-ajust */ "./assets/javascript/functionalities/hash-ajust.js");
/* harmony import */ var _functionalities_hash_ajust__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_functionalities_hash_ajust__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _functionalities_audio_player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functionalities/audio-player */ "./assets/javascript/functionalities/audio-player.js");
/* harmony import */ var _functionalities_audio_player__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_functionalities_audio_player__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _functionalities_video_repositioning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./functionalities/video-repositioning */ "./assets/javascript/functionalities/video-repositioning.js");
/* harmony import */ var _functionalities_video_repositioning__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_functionalities_video_repositioning__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _functionalities_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./functionalities/header */ "./assets/javascript/functionalities/header.js");
/* harmony import */ var _functionalities_cover_block__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./functionalities/cover-block */ "./assets/javascript/functionalities/cover-block.js");
/* harmony import */ var _functionalities_cover_block__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_functionalities_cover_block__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _functionalities_video_gallery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./functionalities/video-gallery */ "./assets/javascript/functionalities/video-gallery.js");
/* harmony import */ var _functionalities_video_gallery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_functionalities_video_gallery__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _functionalities_credited_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./functionalities/credited-image */ "./assets/javascript/functionalities/credited-image.js");
/* harmony import */ var _functionalities_credited_image__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_functionalities_credited_image__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _functionalities_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./functionalities/tooltip */ "./assets/javascript/functionalities/tooltip.js");
/* harmony import */ var _functionalities_tooltip__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_functionalities_tooltip__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _functionalities_link_dropdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./functionalities/link-dropdown */ "./assets/javascript/functionalities/link-dropdown.js");
/* harmony import */ var _functionalities_link_dropdown__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_functionalities_link_dropdown__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _functionalities_project_single__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./functionalities/project-single */ "./assets/javascript/functionalities/project-single.js");
/* harmony import */ var _functionalities_project_single__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_functionalities_project_single__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _functionalities_republish_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./functionalities/republish-modal */ "./assets/javascript/functionalities/republish-modal.js");
/* harmony import */ var _functionalities_republish_modal__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_functionalities_republish_modal__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _functionalities_storymap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./functionalities/storymap */ "./assets/javascript/functionalities/storymap.js");
/* harmony import */ var _functionalities_storymap__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_functionalities_storymap__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _cookies__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./cookies */ "./assets/javascript/cookies.js");
/* harmony import */ var _cookies__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_cookies__WEBPACK_IMPORTED_MODULE_14__);
// Functionalities








 // import "./functionalities/search-filters";





 // Other options

 // Vendors
// import './../vendor/selectric/selectric.min';

window.addEventListener("DOMContentLoaded", function () {
  // External source post API magic <3
  var siteLinks = document.querySelectorAll("article .entry-title > a").forEach(function (element) {
    var targetLink = element.getAttribute("href"); // console.log(element);

    try {
      var targetLinkSource = new URL(targetLink).origin;

      if (document.location.origin !== targetLinkSource) {
        element.setAttribute("target", "_blank");

        try {
          element.closest('article').querySelector('figure.post-thumbnail a').setAttribute("target", "_blank");
        } catch (_unused) {// console.log('post has no image')
        }

        var externalSourceLink = document.createElement("a");
        externalSourceLink.classList.add("external-link");
        externalSourceLink.setAttribute("href", targetLink);
        externalSourceLink.setAttribute("target", "_blank");
        externalSourceLink.setAttribute("href", targetLink);
        var external_link_api = document.location.origin + "/wp-json/api/external-link/?target_link=" + encodeURIComponent(targetLink);
        jQuery.ajax({
          type: "GET",
          url: external_link_api,
          success: function success(data) {
            // console.log(data);
            externalSourceLink.innerHTML = "<i class=\"fas fa-external-link-alt\"></i> <span class=\"target-title\">".concat(data, "</span>");
          }
        });
        var metaarea = element.closest("article").querySelector(".entry-meta");

        if (!metaarea) {
          metaarea = document.createElement("div");
          metaarea.classList.add("entry-meta");
          element.closest("article").querySelector(".entry-wrapper").appendChild(metaarea);
        }

        metaarea.insertBefore(externalSourceLink, metaarea.firstChild);
      }
    } catch (err) {
      console.log(err); // console.log("Invalid link: ", targetLink);
    }
  });
});

(function ($) {
  jQuery(document).ready(function () {
    if (jQuery(".single .featured-image-behind").length) {
      jQuery(".featured-image-behind .image-info i").click(function () {
        jQuery(".featured-image-behind .image-info-container").toggleClass("active");
        jQuery(".featured-image-behind .image-info i").toggleClass("fa-info-circle fa-times-circle ");
      });
    }

    if (jQuery(".single .featured-image-large").length) {
      jQuery(".featured-image-large .image-info i").click(function () {
        jQuery(".featured-image-large .image-info-container").toggleClass("active");
        jQuery(".featured-image-large .image-info i").toggleClass("fa-info-circle fa-times");
      });
    }

    if (jQuery(".single .featured-image-small").length) {
      jQuery(".featured-image-small .image-info i").click(function () {
        jQuery(".featured-image-small .image-info-container").toggleClass("active");
        jQuery(".featured-image-small .image-info i").toggleClass("fa-info-circle fa-times");
      });
    } // prevents comments from hiding when a direct comment hash is set


    if (!(document.location.hash.length && document.location.hash.slice(1, 8) == 'comment')) {
      jQuery(".toggable-comments-form").hide();
    }

    if (jQuery(".toggable-comments-area").length) {
      jQuery(".toggable-comments-area").click(function () {
        jQuery(".toggable-comments-form").toggle("fast");
      });
    }
  });
})(jQuery);

/***/ }),

/***/ "./assets/javascript/cookies.js":
/*!**************************************!*\
  !*** ./assets/javascript/cookies.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", function () {
  // Only apply cookie banner js if it isn't an embed page
  if (!window.location.pathname.includes('/embed')) {
    var parent = document.querySelector('.cc-window');
    var hasChild = document.querySelector('.cc-window .jeo');
    var acceptAllBtn = document.querySelector('.cc-accept-all');

    if (parent && !hasChild) {
      var content = parent.innerHTML;
      var additionalElement = document.createElement('div');
      additionalElement.classList.add('jeo');
      additionalElement.innerHTML = content;
      parent.innerHTML = "";
      parent.appendChild(additionalElement);
      parent.style.zIndex = '9999999999999';
    }

    var darkerScreen = document.createElement('div');
    darkerScreen.classList.add('darker-screen');
    darkerScreen.style.position = 'fixed';
    darkerScreen.style.width = '100vw';
    darkerScreen.style.height = '100vh';
    darkerScreen.style.background = 'black';
    darkerScreen.style.opacity = '0.5';
    darkerScreen.style.display = 'none';
    darkerScreen.style.zIndex = '99999999';
    darkerScreen.style.top = '0';
    document.querySelector('body').appendChild(darkerScreen);

    if (parent) {
      if (!parent.classList.contains('cc-invisible') || parent.style.display != 'none') {
        darkerScreen.style.display = 'block';
      }
    }

    var buttons = document.querySelectorAll('.cc-compliance .cc-btn');
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        if (!button.classList.contains('cc-show-settings')) {
          darkerScreen.style.display = 'none';
        }
      });
    });

    if (document.querySelector('.cc-bottom')) {
      document.querySelector('.cc-bottom').onclick = function () {
        darkerScreen.style.display = 'block';
      };
    }
  } else {
    //Hide cookie banner in embed pages
    document.querySelector('.cc-revoke').style.display = 'none';
    document.querySelector('#cc-window.cc-window').style.display = 'none';
  }
});

/***/ }),

/***/ "./assets/javascript/functionalities/ajax-pv.js":
/*!******************************************************!*\
  !*** ./assets/javascript/functionalities/ajax-pv.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

setTimeout(function () {
  (function ($) {
    if (typeof ajaxurl !== 'undefined') {
      $(function () {
        if (document.querySelector('.single')) {
          $.post(ajaxurl, {
            action: 'ajaxpv',
            ajaxpv: ajaxpv,
            ajaxpt: ajaxpt
          });
        }
      });
    }
  })(jQuery);
}, 2000);

/***/ }),

/***/ "./assets/javascript/functionalities/audio-player.js":
/*!***********************************************************!*\
  !*** ./assets/javascript/functionalities/audio-player.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", function () {
  var zeroPad = function zeroPad(num, places) {
    return String(num).padStart(places, '0');
  };

  function reskinTime(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - hr * 3600) / 60);
    var sec = Math.floor(secs - hr * 3600 - min * 60);

    if (sec < 10) {
      sec = "0" + sec;
    }

    return min + ':' + sec;
  }

  function numberMap(n, start1, stop1, start2, stop2) {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  }

  ;
  document.querySelectorAll(".category-audio .wp-block-audio").forEach(function (audio_wrapper, index) {
    // Build fake player structure
    audio_wrapper.insertAdjacentHTML("afterbegin", '<div class="audio-fake-player"> <div class="player-meta"> <span class="current-time">0:00</span> <div class="audio-bar"><div class="fill-bar"></div></div> <span class="total-time">1:15</span> </div> <button class="play-button"> <i class="fas fa-play"></i> </button> </div>');

    if (!index) {
      audio_wrapper.querySelector('.audio-fake-player').classList.add('first-fake-audio-element');
    }

    var player = audio_wrapper.querySelector("audio");
    player.classList.add('hide');
    player.addEventListener('loadedmetadata', function () {
      audio_wrapper.querySelector('.total-time').innerHTML = reskinTime(player.duration);

      audio_wrapper.querySelector('button.play-button').onclick = function () {
        player[player.paused ? 'play' : 'pause']();

        if (this.querySelector('i').classList.contains('fa-undo')) {
          this.querySelector('i').classList.remove("fa-undo");
          this.querySelector('i').classList.toggle("fa-pause");
          return;
        }

        this.querySelector('i').classList.toggle("fa-pause");
        this.querySelector('i').classList.toggle("fa-play");
      };

      audio_wrapper.querySelector('.audio-bar').onclick = function (e) {
        player.currentTime = numberMap(e.offsetX, 0, this.offsetWidth, 0, player.duration).toString();
      }; //https://www.w3schools.com/howto/howto_js_draggable.asp

    });
    player.addEventListener('ended', function () {
      audio_wrapper.querySelector('i').classList.toggle("fa-undo");
      audio_wrapper.querySelector('i').classList.toggle("fa-pause");
    });
    player.addEventListener("timeupdate", function (e) {
      audio_wrapper.querySelector('.fill-bar').style.width = player.currentTime / player.duration * 100 + '%';
      audio_wrapper.querySelector('.current-time').innerHTML = reskinTime(player.currentTime.toString());
    }, false);
  });
});

/***/ }),

/***/ "./assets/javascript/functionalities/cover-block.js":
/*!**********************************************************!*\
  !*** ./assets/javascript/functionalities/cover-block.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// this is supposed to fix gallery-image block inside cover block
window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.wp-block-cover').forEach(function (element) {
    if (element.querySelector('.wp-block-jeo-theme-custom-image-gallery-block')) {
      element.classList.add('has-image-gallery');
    }
  });
});

/***/ }),

/***/ "./assets/javascript/functionalities/credited-image.js":
/*!*************************************************************!*\
  !*** ./assets/javascript/functionalities/credited-image.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.credited-image-block').forEach(function (imageBlock) {
    imageBlock.querySelector('.image-description-toggle').addEventListener('click', function () {
      imageBlock.classList.toggle('active');
    });
  });
});

/***/ }),

/***/ "./assets/javascript/functionalities/dark-mode.js":
/*!********************************************************!*\
  !*** ./assets/javascript/functionalities/dark-mode.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

window.addEventListener("DOMContentLoaded", function () {
  if (typeof window.jeo_theme_config !== 'undefined' && !window.jeo_theme_config.enable_dark_mode) {
    return;
  }

  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') == "dark") {
      jQuery('body').addClass('dark-theme');
      jQuery('button[action="dark-mode"] i:last-child').toggleClass("fa-toggle-off fa-toggle-on");
    }
  } else {
    var userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

    if (userPrefersDark) {
      jQuery('body').addClass('dark-theme');
      localStorage.setItem('theme', "dark");
    }

    if (userPrefersLight || !userPrefersDark && !userPrefersLight) {
      if (jQuery('body').hasClass('dark-theme')) {
        jQuery('body').removeClass('dark-theme');
      }

      localStorage.setItem('theme', "light");
    }
  }

  jQuery('button[action="dark-mode"]').click(function () {
    jQuery("body").toggleClass("dark-theme");
    jQuery(this.querySelector("i:last-child")).toggleClass("fa-toggle-off fa-toggle-on");
    localStorage.setItem('theme', localStorage.getItem('theme') == "dark" ? "light" : "dark");

    var lightLabel = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Light mode', 'jeo');

    var darkLabel = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Dark mode', 'jeo');

    if (localStorage.getItem('theme') == "dark") {
      try {
        if (this.querySelector('.item--title').innerHTML) {
          this.querySelector('.item--title').innerHTML = lightLabel;
        }
      } catch (_unused) {}

      ;
    } else {
      try {
        if (this.querySelector('.item--title').innerHTML) {
          this.querySelector('.item--title').innerHTML = darkLabel;
        }
      } catch (_unused2) {}

      ;
    }
  });
});

/***/ }),

/***/ "./assets/javascript/functionalities/font-size.js":
/*!********************************************************!*\
  !*** ./assets/javascript/functionalities/font-size.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", function () {
  jQuery('button[action="increase-size"]').click(function () {
    var fontSize = jQuery('html').css('font-size');
    var newFontSize = parseInt(fontSize) + 1;

    if (checkSize(newFontSize)) {
      jQuery('html').css('font-size', newFontSize);
      localStorage.setItem('fontSizeAccessibility', newFontSize);
    }
  });
  jQuery('button[action="decrease-size"]').click(function () {
    var fontSize = jQuery('html').css('font-size');
    var newFontSize = parseInt(fontSize) - 1;

    if (checkSize(newFontSize)) {
      jQuery('html').css('font-size', newFontSize);
      localStorage.setItem('fontSizeAccessibility', newFontSize);
    }
  });

  if (localStorage.getItem('fontSizeAccessibility')) {
    jQuery('html').css('font-size', localStorage.getItem('fontSizeAccessibility') + 'px');
  }

  function checkSize(newFontSize) {
    return newFontSize <= 10 || newFontSize >= 26 ? false : true;
  }
});

/***/ }),

/***/ "./assets/javascript/functionalities/hash-ajust.js":
/*!*********************************************************!*\
  !*** ./assets/javascript/functionalities/hash-ajust.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function ($, window) {
  var adjustAnchor = function adjustAnchor() {
    var $anchor = $(':target'),
        fixedElementHeight = 100;

    if ($anchor.length > 0) {
      $('html, body').stop().animate({
        scrollTop: $anchor.offset().top - fixedElementHeight
      }, 200);
    }
  };

  $(window).on('hashchange load', function () {
    adjustAnchor();
  });
})(jQuery, window);

/***/ }),

/***/ "./assets/javascript/functionalities/header.js":
/*!*****************************************************!*\
  !*** ./assets/javascript/functionalities/header.js ***!
  \*****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _font_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./font-size */ "./assets/javascript/functionalities/font-size.js");
/* harmony import */ var _font_size__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_font_size__WEBPACK_IMPORTED_MODULE_0__);

window.addEventListener("DOMContentLoaded", function () {
  jQuery(window).scroll(function () {
    if (!document.querySelector(".bottom-header-contain.desktop-only")) {
      return;
    }

    var headerHeight = document.querySelector(".bottom-header-contain.desktop-only").offsetTop; // console.log(headerHeight);

    if (jQuery(this).scrollTop() > headerHeight) {
      jQuery(".bottom-header-contain.post-header").addClass("active");

      if (!jQuery("header #header-search").hasClass("fixed")) {
        jQuery("header #header-search").addClass("fixed");
        jQuery("header #header-search").css("top", 0 + "px");
        jQuery("header #header-search").css("padding-top", 50 + "px");
        jQuery("header #header-search").css("height", jQuery(window).height());
      }
    } else {
      if (!jQuery("body").hasClass("mobile-menu-opened")) {
        jQuery(".bottom-header-contain.post-header").removeClass("active");
      }

      if (jQuery("header #header-search").hasClass("fixed")) {
        jQuery("header #header-search").removeClass("fixed");

        if (!jQuery("body").hasClass("logged-in")) {
          jQuery("header #header-search").css("top", document.querySelector(".bottom-header-contain.desktop-only").offsetTop + 45 + "px");
        } else {
          jQuery("header #header-search").css("top", document.querySelector(".bottom-header-contain.desktop-only").offsetTop + 77 + "px");
        }
      }
    }
  });
  jQuery("button.search-toggle").click(function (e) {
    jQuery("header#masthead").toggleClass("hide-header-search");
  });

  if (document.querySelector(".bottom-header-contain.desktop-only")) {
    jQuery("header #header-search").css("top", document.querySelector(".bottom-header-contain.desktop-only").offsetTop + 50 + "px");
    jQuery("header #header-search").css("height", jQuery(window).height() - document.querySelector(".bottom-header-contain.desktop-only").offsetTop + "px");
    document.getElementById("mobile-sidebar-fallback").style.setProperty("--padding-left", jQuery(".bottom-header-contain.post-header .mobile-menu-toggle.left-menu-toggle").offset().left + "px");
    jQuery(".more-menu--content").css("left", jQuery("aside#mobile-sidebar-fallback").offset().left + jQuery("aside#mobile-sidebar-fallback").width() + jQuery(".bottom-header-contain.post-header .mobile-menu-toggle.left-menu-toggle").offset().left);
  }

  if (document.querySelectorAll('.page-template-discovery').length) {
    document.querySelector('.page-template-discovery').style.setProperty("--padding-left", jQuery(".bottom-header-contain.post-header .mobile-menu-toggle.left-menu-toggle").offset().left + "px");
  }

  jQuery("button.mobile-menu-toggle").click(function () {
    jQuery(".more-menu--content").css("left", jQuery("aside#mobile-sidebar-fallback").width());
  });
  jQuery('button[action="toggle-options"]').click(function () {
    jQuery(this.parentNode.querySelector(".toggle-options")).toggleClass('active');
  });
  document.addEventListener('click', function (event) {
    var isClickInsideElement = document.querySelector('button[action="toggle-options"]').contains(event.target);

    if (!isClickInsideElement && !['increase-size', 'decrease-size'].includes(event.target.getAttribute('action'))) {
      if (document.querySelector(".toggle-options").classList.contains('active')) {
        document.querySelector(".toggle-options").classList.remove('active');
      }
    }
  });
  jQuery('button.menu-btn').click(function () {
    var headerHeight = document.querySelector(".bottom-header-contain.desktop-only").offsetTop;

    if (jQuery(window).scrollTop() <= headerHeight && jQuery(window).width() > 829) {
      jQuery(".bottom-header-contain.post-header").removeClass("active");
      jQuery("body").removeClass("mobile-menu-opened");
    }
  });
  jQuery('button[action="language-options"]').click(function () {
    jQuery(this.parentNode.querySelector(".toggle-language-options")).toggleClass("active");
  });
  var shareData = {
    title: document.title,
    text: "",
    url: document.location.href
  };
  var btn = document.querySelector('button[action="share-navigator"]');
  var resultPara = document.querySelector("body");

  if (document.location.protocol != 'http:') {
    btn.addEventListener("click", function () {
      try {
        navigator.share(shareData);
      } catch (err) {
        resultPara.textContent = "Error: " + err;
      }
    });
  } else {
    console.log("Native share is not allowed over HTTP protocol.");
  }

  document.querySelector('.more-menu').addEventListener("mouseover", function () {
    jQuery(".more-menu--content").addClass('permahover');
  });
  document.querySelector('.mobile-sidebar').childNodes.forEach(function (childNode) {
    childNode.addEventListener("mouseover", function () {
      if (childNode.className != 'more-menu') {
        jQuery(".more-menu--content").removeClass('permahover');
      }
    });
  });
  window.addEventListener('click', function (e) {
    if (!document.querySelector('.more-menu--content').contains(e.target) && !document.querySelector('.more-menu').contains(e.target)) {
      jQuery(".more-menu--content").removeClass('permahover');
    }
  });
});

/***/ }),

/***/ "./assets/javascript/functionalities/link-dropdown.js":
/*!************************************************************!*\
  !*** ./assets/javascript/functionalities/link-dropdown.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", function () {
  var isMobile = function isMobile() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth >= 830) return false;
    return true;
  };

  if (document.querySelector('.link-dropdown') && isMobile()) {
    document.querySelector('.link-dropdown .controls.saved-block').onclick = function () {
      var sections = document.querySelector('.link-dropdown .sections');
      var arrowIcon = document.querySelector('.link-dropdown .arrow-icon');
      sections.style.transition = 'all 0.2s ease-in';

      if (sections.style.opacity == 1) {
        arrowIcon.className = 'arrow-icon fas fa-angle-down';
        sections.style.opacity = 0;
        sections.style.height = 0;
      } else {
        arrowIcon.className = 'arrow-icon fas fa-angle-up';
        sections.style.opacity = 1;
        sections.style.height = 'auto';
      }
    };
  }
});

/***/ }),

/***/ "./assets/javascript/functionalities/project-single.js":
/*!*************************************************************!*\
  !*** ./assets/javascript/functionalities/project-single.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll('.single-project .main-content a.project-link');

  if (buttons.length) {
    var target = document.querySelector('.entry-content');
    target.insertBefore(buttons[0], target.querySelector('.team-members'));
  }
});

/***/ }),

/***/ "./assets/javascript/functionalities/republish-modal.js":
/*!**************************************************************!*\
  !*** ./assets/javascript/functionalities/republish-modal.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", function () {
  var isRepublishablePost = document.querySelector('.republish-post');

  if (isRepublishablePost) {
    // Open and close modal
    var modal = document.querySelector('.republish-post-modal');
    var modalContainer = document.querySelector('.modal-container');
    modal.classList.add("hideModal");

    document.querySelector('.republish-post-label').onclick = function () {
      modal.classList.add("showModal");
      modalContainer.style.display = 'block';
    };

    document.querySelector('.close-button').onclick = function () {
      modal.classList.remove("showModal");
    }; // Modal tabs (HTML/TEXT)


    htmlButton = document.querySelector('.controls .html-button');
    textButton = document.querySelector('.controls .text-button');
    htmlText = document.querySelector('.wrapper-html-text');
    rawText = document.querySelector('.wrapper-raw-text');

    htmlButton.onclick = function () {
      rawText.style.display = 'none';
      htmlText.style.display = 'block';
      htmlButton.style.backgroundColor = '#cccccc';
      htmlButton.style.color = '#555D66';
      textButton.style.backgroundColor = '#555D66';
      textButton.style.color = 'white';
    };

    textButton.onclick = function () {
      rawText.style.display = 'block';
      htmlText.style.display = 'none';
      htmlButton.style.backgroundColor = '#555D66';
      htmlButton.style.color = 'white';
      textButton.style.backgroundColor = '#cccccc';
      textButton.style.color = '#555D66';
    }; // Copy button


    copyButton = document.querySelector('.copy-button');

    copyButton.onclick = function () {
      if (rawText.style.display != 'none') {
        var text = document.querySelector('.wrapper-raw-text p').innerText;
        var elem = document.createElement("textarea");
        document.body.appendChild(elem);
        elem.value = text;
        elem.select();
        document.execCommand("copy");
        document.body.removeChild(elem);
      } else {
        var _text = document.querySelector('.wrapper-html-text p').innerText;

        var _elem = document.createElement("textarea");

        document.body.appendChild(_elem);
        _elem.value = _text;

        _elem.select();

        document.execCommand("copy");
        document.body.removeChild(_elem);
      }
    }; // Hide bullets introductions if there is no bullet


    if (!document.querySelector('.bullet-description')) {
      document.querySelector('.bullets-introduction').style.display = 'none';
    }
  }
});

/***/ }),

/***/ "./assets/javascript/functionalities/storymap.js":
/*!*******************************************************!*\
  !*** ./assets/javascript/functionalities/storymap.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", function () {
  var isSingleStorymap = document.querySelector('.single-storymap');

  if (isSingleStorymap) {
    var notNavigatingMap = document.querySelector('.not-navigating-map .mapboxgl-map');
    var headerHeight = document.querySelector('header').offsetHeight;
    notNavigatingMap.style.top = "".concat(headerHeight, "px");
    window.addEventListener('scroll', function (e) {
      var scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (window.scrollY > headerHeight) {
        notNavigatingMap.style.top = '50px';
      } else {
        var newTop = headerHeight - scrollTop;

        if (newTop < 50) {
          newTop = 50;
        }

        notNavigatingMap.style.top = "".concat(newTop, "px");
      }
    });
  }
});

/***/ }),

/***/ "./assets/javascript/functionalities/tooltip.js":
/*!******************************************************!*\
  !*** ./assets/javascript/functionalities/tooltip.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", function () {
  // This fixes inner tooltip ": " to prevent recursive strategy
  var stringAcumulator = function stringAcumulator(finalString, item) {
    return finalString + ': ' + item;
  };

  document.addEventListener('click', function (event) {
    var isClickInsideElement = event.target.classList.contains('tooltip-block');

    if (!isClickInsideElement) {
      document.querySelectorAll('.tooltip-block').forEach(function (tooltip) {
        return tooltip.classList.remove('active');
      });
    }
  });
  document.querySelectorAll('.tooltip-block').forEach(function (tooltip) {
    var splitResult = tooltip.innerText.split(': ');

    if (splitResult.length == 1 || !splitResult.length) {
      tooltip.classList.remove('tooltip-block');
      return;
    }

    var referenceWord = splitResult[0];
    var contentTooltip = splitResult.length >= 1 ? splitResult.splice(1).reduce(stringAcumulator) : '';
    var tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip-block--content');
    tooltipElement.innerText = contentTooltip;
    tooltip.innerText = referenceWord;
    tooltip.appendChild(tooltipElement);

    tooltip.onclick = function () {
      var _this = this;

      this.classList.toggle('active');
      document.querySelectorAll('.tooltip-block.active').forEach(function (item) {
        if (item != _this) item.classList.remove('active');
      });
    };
  });
});

/***/ }),

/***/ "./assets/javascript/functionalities/video-gallery.js":
/*!************************************************************!*\
  !*** ./assets/javascript/functionalities/video-gallery.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.video-gallery-wrapper').forEach(function (videoGallery) {
    var videoItens = videoGallery.querySelectorAll('.embed-template-block');

    if (videoItens.length > 0) {
      videoCopyPolicyFix = videoItens[0].cloneNode(true);

      if (document.querySelector('body').classList.contains('cmplz-status-allow')) {
        // plugin cmplz postprocessing fix.
        videoCopyPolicyFix.querySelector('figure > div').classList.remove('cmplz-blocked-content-container', 'cmplz-placeholder-1');
        videoCopyPolicyFix.querySelector('figure .wp-block-embed__wrapper iframe').classList.remove('cmplz-video', 'cmplz-hidden');
      }

      videoGallery.insertBefore(videoCopyPolicyFix, videoItens[1]);
    }

    videoItens = videoGallery.querySelectorAll('.embed-template-block'); //console.log(videoItens);

    if (videoItens.length > 1) {
      var groupedItens = _toConsumableArray(videoItens);

      groupedItens.splice(0, 1); //console.log(groupedItens);

      var groupedItensWrapper = document.createElement('div');
      groupedItensWrapper.classList.add('sidebar-itens');
      var gridScrollLimiter = document.createElement('div');
      gridScrollLimiter.classList.add('scroll-ratio');
      var lastClicked = "";
      groupedItens.forEach(function (video) {
        var clickableVideoArea = document.createElement('button');
        clickableVideoArea.setAttribute('action', 'expand-main-area');
        clickableVideoArea.appendChild(video);

        clickableVideoArea.onclick = function (e) {
          if (lastClicked != this) {
            this.closest('.video-gallery-wrapper').querySelector('.embed-template-block').remove();
            this.closest('.video-gallery-wrapper').insertBefore(this.querySelector('.embed-template-block').cloneNode(true), gridScrollLimiter);
          }

          lastClicked = this;
        };

        groupedItensWrapper.appendChild(clickableVideoArea);
      });
      gridScrollLimiter.appendChild(groupedItensWrapper);
      videoGallery.appendChild(gridScrollLimiter);
    }
  });
});

/***/ }),

/***/ "./assets/javascript/functionalities/video-repositioning.js":
/*!******************************************************************!*\
  !*** ./assets/javascript/functionalities/video-repositioning.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", function () {
  var allYoutubeBlocks = document.querySelectorAll('.video .wp-block-embed-youtube, .video .wp-block-video');

  if (allYoutubeBlocks.length) {
    var target = document.querySelector('.entry-header');
    target.appendChild(allYoutubeBlocks[0]);
  }
});

/***/ }),

/***/ "./assets/scss/app.scss":
/*!******************************!*\
  !*** ./assets/scss/app.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************************!*\
  !*** multi ./assets/javascript/app.js ./assets/scss/app.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /var/www/html/plenamata/code/wp-content/themes/jeo-theme/assets/javascript/app.js */"./assets/javascript/app.js");
module.exports = __webpack_require__(/*! /var/www/html/plenamata/code/wp-content/themes/jeo-theme/assets/scss/app.scss */"./assets/scss/app.scss");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qYXZhc2NyaXB0L2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvZnVuY3Rpb25hbGl0aWVzL2FqYXgtcHYuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvZnVuY3Rpb25hbGl0aWVzL2F1ZGlvLXBsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvamF2YXNjcmlwdC9mdW5jdGlvbmFsaXRpZXMvY292ZXItYmxvY2suanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvZnVuY3Rpb25hbGl0aWVzL2NyZWRpdGVkLWltYWdlLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qYXZhc2NyaXB0L2Z1bmN0aW9uYWxpdGllcy9kYXJrLW1vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvZnVuY3Rpb25hbGl0aWVzL2ZvbnQtc2l6ZS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvamF2YXNjcmlwdC9mdW5jdGlvbmFsaXRpZXMvaGFzaC1hanVzdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvamF2YXNjcmlwdC9mdW5jdGlvbmFsaXRpZXMvaGVhZGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qYXZhc2NyaXB0L2Z1bmN0aW9uYWxpdGllcy9saW5rLWRyb3Bkb3duLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qYXZhc2NyaXB0L2Z1bmN0aW9uYWxpdGllcy9wcm9qZWN0LXNpbmdsZS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvamF2YXNjcmlwdC9mdW5jdGlvbmFsaXRpZXMvcmVwdWJsaXNoLW1vZGFsLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qYXZhc2NyaXB0L2Z1bmN0aW9uYWxpdGllcy9zdG9yeW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvamF2YXNjcmlwdC9mdW5jdGlvbmFsaXRpZXMvdG9vbHRpcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvamF2YXNjcmlwdC9mdW5jdGlvbmFsaXRpZXMvdmlkZW8tZ2FsbGVyeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvamF2YXNjcmlwdC9mdW5jdGlvbmFsaXRpZXMvdmlkZW8tcmVwb3NpdGlvbmluZy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2Nzcy9hcHAuc2Nzcz9kNTAyIiwid2VicGFjazovLy9leHRlcm5hbCBbXCJ3cFwiLFwiaTE4blwiXSJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJzaXRlTGlua3MiLCJ0YXJnZXRMaW5rIiwiZWxlbWVudCIsInRhcmdldExpbmtTb3VyY2UiLCJkb2N1bWVudCIsImV4dGVybmFsU291cmNlTGluayIsImV4dGVybmFsX2xpbmtfYXBpIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwialF1ZXJ5IiwidHlwZSIsInVybCIsInN1Y2Nlc3MiLCJtZXRhYXJlYSIsImNvbnNvbGUiLCJwYXJlbnQiLCJoYXNDaGlsZCIsImFjY2VwdEFsbEJ0biIsImNvbnRlbnQiLCJhZGRpdGlvbmFsRWxlbWVudCIsImRhcmtlclNjcmVlbiIsImJ1dHRvbnMiLCJidXR0b24iLCJzZXRUaW1lb3V0IiwiJCIsImFjdGlvbiIsImFqYXhwdiIsImFqYXhwdCIsInplcm9QYWQiLCJTdHJpbmciLCJociIsIk1hdGgiLCJzZWNzIiwibWluIiwic2VjIiwibiIsInN0b3AxIiwic3RvcDIiLCJhdWRpb193cmFwcGVyIiwicGxheWVyIiwicmVza2luVGltZSIsIm51bWJlck1hcCIsImUiLCJpbWFnZUJsb2NrIiwibG9jYWxTdG9yYWdlIiwidXNlclByZWZlcnNEYXJrIiwidXNlclByZWZlcnNMaWdodCIsImxpZ2h0TGFiZWwiLCJfXyIsImRhcmtMYWJlbCIsImZvbnRTaXplIiwibmV3Rm9udFNpemUiLCJwYXJzZUludCIsImNoZWNrU2l6ZSIsImFkanVzdEFuY2hvciIsIiRhbmNob3IiLCJmaXhlZEVsZW1lbnRIZWlnaHQiLCJzY3JvbGxUb3AiLCJoZWFkZXJIZWlnaHQiLCJpc0NsaWNrSW5zaWRlRWxlbWVudCIsImV2ZW50Iiwic2hhcmVEYXRhIiwidGl0bGUiLCJ0ZXh0IiwiaHJlZiIsImJ0biIsInJlc3VsdFBhcmEiLCJuYXZpZ2F0b3IiLCJjaGlsZE5vZGUiLCJpc01vYmlsZSIsImRldmljZVdpZHRoIiwic2VjdGlvbnMiLCJhcnJvd0ljb24iLCJ0YXJnZXQiLCJpc1JlcHVibGlzaGFibGVQb3N0IiwibW9kYWwiLCJtb2RhbENvbnRhaW5lciIsImh0bWxCdXR0b24iLCJ0ZXh0QnV0dG9uIiwiaHRtbFRleHQiLCJyYXdUZXh0IiwiY29weUJ1dHRvbiIsImVsZW0iLCJpc1NpbmdsZVN0b3J5bWFwIiwibm90TmF2aWdhdGluZ01hcCIsIm5ld1RvcCIsInN0cmluZ0FjdW11bGF0b3IiLCJmaW5hbFN0cmluZyIsInRvb2x0aXAiLCJzcGxpdFJlc3VsdCIsInJlZmVyZW5jZVdvcmQiLCJjb250ZW50VG9vbHRpcCIsInRvb2x0aXBFbGVtZW50IiwiaXRlbSIsInZpZGVvSXRlbnMiLCJ2aWRlb0dhbGxlcnkiLCJ2aWRlb0NvcHlQb2xpY3lGaXgiLCJncm91cGVkSXRlbnMiLCJncm91cGVkSXRlbnNXcmFwcGVyIiwiZ3JpZFNjcm9sbExpbWl0ZXIiLCJsYXN0Q2xpY2tlZCIsImNsaWNrYWJsZVZpZGVvQXJlYSIsImFsbFlvdXR1YmVCbG9ja3MiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FB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Q0FBWkEsUUFBcUIsaUJBQVM7QUFDMUIsWUFBTUksa0JBQWtCLEdBQUdoRyxRQUFRLENBQVJBLGNBQTNCLFFBQTJCQSxDQUEzQjtBQUNBZ0csMEJBQWtCLENBQWxCQTtBQUNBQSwwQkFBa0IsQ0FBbEJBOztBQUVBQSwwQkFBa0IsQ0FBbEJBLFVBQTZCLGFBQVk7QUFDckMsY0FBR0QsV0FBVyxJQUFkLE1BQXdCO0FBQ3BCO0FBQ0EsZ0VBQW9ELHNEQUFwRCxJQUFvRCxDQUFwRDtBQUNIOztBQUVEQSxxQkFBVyxHQUFYQTtBQU5KQzs7QUFVQUgsMkJBQW1CLENBQW5CQTtBQWZKRDtBQWtCQUUsdUJBQWlCLENBQWpCQTtBQUNBSixrQkFBWSxDQUFaQTtBQUNIO0FBbkRMMUY7QUFESkwsRzs7Ozs7Ozs7Ozs7QUNBQUEsTUFBTSxDQUFOQSxxQ0FBNEMsWUFBWTtBQUNwRCxNQUFNc0csZ0JBQWdCLEdBQUdqRyxRQUFRLENBQVJBLGlCQUF6Qix3REFBeUJBLENBQXpCOztBQUVBLE1BQUdpRyxnQkFBZ0IsQ0FBbkIsUUFBNEI7QUFDeEIsUUFBTTdCLE1BQU0sR0FBR3BFLFFBQVEsQ0FBUkEsY0FBZixlQUFlQSxDQUFmO0FBQ0FvRSxVQUFNLENBQU5BLFlBQW1CNkIsZ0JBQWdCLENBQW5DN0IsQ0FBbUMsQ0FBbkNBO0FBQ0g7QUFOTHpFLEc7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLGFBQWEsdUNBQXVDLEVBQUUsSSIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuLy9kaXN0XCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8vIEZ1bmN0aW9uYWxpdGllc1xuaW1wb3J0IFwiLi9mdW5jdGlvbmFsaXRpZXMvYWpheC1wdlwiO1xuaW1wb3J0IFwiLi9mdW5jdGlvbmFsaXRpZXMvZGFyay1tb2RlXCI7XG5pbXBvcnQgXCIuL2Z1bmN0aW9uYWxpdGllcy9oYXNoLWFqdXN0XCI7XG5pbXBvcnQgXCIuL2Z1bmN0aW9uYWxpdGllcy9hdWRpby1wbGF5ZXJcIjtcbmltcG9ydCBcIi4vZnVuY3Rpb25hbGl0aWVzL3ZpZGVvLXJlcG9zaXRpb25pbmdcIjtcbmltcG9ydCBcIi4vZnVuY3Rpb25hbGl0aWVzL2hlYWRlclwiO1xuaW1wb3J0IFwiLi9mdW5jdGlvbmFsaXRpZXMvY292ZXItYmxvY2tcIjtcbmltcG9ydCBcIi4vZnVuY3Rpb25hbGl0aWVzL3ZpZGVvLWdhbGxlcnlcIjtcbmltcG9ydCBcIi4vZnVuY3Rpb25hbGl0aWVzL2NyZWRpdGVkLWltYWdlXCI7XG4vLyBpbXBvcnQgXCIuL2Z1bmN0aW9uYWxpdGllcy9zZWFyY2gtZmlsdGVyc1wiO1xuaW1wb3J0IFwiLi9mdW5jdGlvbmFsaXRpZXMvdG9vbHRpcFwiO1xuaW1wb3J0IFwiLi9mdW5jdGlvbmFsaXRpZXMvbGluay1kcm9wZG93blwiO1xuaW1wb3J0IFwiLi9mdW5jdGlvbmFsaXRpZXMvcHJvamVjdC1zaW5nbGVcIjtcbmltcG9ydCBcIi4vZnVuY3Rpb25hbGl0aWVzL3JlcHVibGlzaC1tb2RhbFwiO1xuaW1wb3J0IFwiLi9mdW5jdGlvbmFsaXRpZXMvc3RvcnltYXBcIjtcblxuLy8gT3RoZXIgb3B0aW9uc1xuaW1wb3J0IFwiLi9jb29raWVzXCI7XG5cbi8vIFZlbmRvcnNcbi8vIGltcG9ydCAnLi8uLi92ZW5kb3Ivc2VsZWN0cmljL3NlbGVjdHJpYy5taW4nO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIC8vIEV4dGVybmFsIHNvdXJjZSBwb3N0IEFQSSBtYWdpYyA8M1xuICAgIGNvbnN0IHNpdGVMaW5rcyA9IGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiYXJ0aWNsZSAuZW50cnktdGl0bGUgPiBhXCIpXG4gICAgICAgIC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRMaW5rID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZWxlbWVudCk7XG5cblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldExpbmtTb3VyY2UgPSBuZXcgVVJMKHRhcmdldExpbmspLm9yaWdpbjtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luICE9PSB0YXJnZXRMaW5rU291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwidGFyZ2V0XCIsIFwiX2JsYW5rXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJ2FydGljbGUnKS5xdWVyeVNlbGVjdG9yKCdmaWd1cmUucG9zdC10aHVtYm5haWwgYScpLnNldEF0dHJpYnV0ZShcInRhcmdldFwiLCBcIl9ibGFua1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncG9zdCBoYXMgbm8gaW1hZ2UnKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXh0ZXJuYWxTb3VyY2VMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgICAgICAgICAgICAgIGV4dGVybmFsU291cmNlTGluay5jbGFzc0xpc3QuYWRkKFwiZXh0ZXJuYWwtbGlua1wiKTtcbiAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxTb3VyY2VMaW5rLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdGFyZ2V0TGluayk7XG4gICAgICAgICAgICAgICAgICAgIGV4dGVybmFsU291cmNlTGluay5zZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIiwgXCJfYmxhbmtcIik7XG4gICAgICAgICAgICAgICAgICAgIGV4dGVybmFsU291cmNlTGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHRhcmdldExpbmspO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4dGVybmFsX2xpbmtfYXBpID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi93cC1qc29uL2FwaS9leHRlcm5hbC1saW5rLz90YXJnZXRfbGluaz1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQodGFyZ2V0TGluayk7XG5cbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogZXh0ZXJuYWxfbGlua19hcGksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVybmFsU291cmNlTGluay5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtZXh0ZXJuYWwtbGluay1hbHRcIj48L2k+IDxzcGFuIGNsYXNzPVwidGFyZ2V0LXRpdGxlXCI+JHtkYXRhfTwvc3Bhbj5gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG1ldGFhcmVhID0gZWxlbWVudC5jbG9zZXN0KFwiYXJ0aWNsZVwiKS5xdWVyeVNlbGVjdG9yKFwiLmVudHJ5LW1ldGFcIik7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoIW1ldGFhcmVhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhYXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhYXJlYS5jbGFzc0xpc3QuYWRkKFwiZW50cnktbWV0YVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbG9zZXN0KFwiYXJ0aWNsZVwiKS5xdWVyeVNlbGVjdG9yKFwiLmVudHJ5LXdyYXBwZXJcIikuYXBwZW5kQ2hpbGQobWV0YWFyZWEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbWV0YWFyZWEuaW5zZXJ0QmVmb3JlKGV4dGVybmFsU291cmNlTGluaywgbWV0YWFyZWEuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkludmFsaWQgbGluazogXCIsIHRhcmdldExpbmspO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn0pO1xuXG4oZnVuY3Rpb24gKCQpIHtcbiAgICBqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGpRdWVyeShcIi5zaW5nbGUgLmZlYXR1cmVkLWltYWdlLWJlaGluZFwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGpRdWVyeShcIi5mZWF0dXJlZC1pbWFnZS1iZWhpbmQgLmltYWdlLWluZm8gaVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KFwiLmZlYXR1cmVkLWltYWdlLWJlaGluZCAuaW1hZ2UtaW5mby1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGpRdWVyeShcIi5mZWF0dXJlZC1pbWFnZS1iZWhpbmQgLmltYWdlLWluZm8gaVwiKS50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICAgICAgXCJmYS1pbmZvLWNpcmNsZSBmYS10aW1lcy1jaXJjbGUgXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoalF1ZXJ5KFwiLnNpbmdsZSAuZmVhdHVyZWQtaW1hZ2UtbGFyZ2VcIikubGVuZ3RoKSB7XG4gICAgICAgICAgICBqUXVlcnkoXCIuZmVhdHVyZWQtaW1hZ2UtbGFyZ2UgLmltYWdlLWluZm8gaVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KFwiLmZlYXR1cmVkLWltYWdlLWxhcmdlIC5pbWFnZS1pbmZvLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RpdmVcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KFwiLmZlYXR1cmVkLWltYWdlLWxhcmdlIC5pbWFnZS1pbmZvIGlcIikudG9nZ2xlQ2xhc3MoXG4gICAgICAgICAgICAgICAgICAgIFwiZmEtaW5mby1jaXJjbGUgZmEtdGltZXNcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChqUXVlcnkoXCIuc2luZ2xlIC5mZWF0dXJlZC1pbWFnZS1zbWFsbFwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGpRdWVyeShcIi5mZWF0dXJlZC1pbWFnZS1zbWFsbCAuaW1hZ2UtaW5mbyBpXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBqUXVlcnkoXCIuZmVhdHVyZWQtaW1hZ2Utc21hbGwgLmltYWdlLWluZm8tY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFxuICAgICAgICAgICAgICAgICAgICBcImFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBqUXVlcnkoXCIuZmVhdHVyZWQtaW1hZ2Utc21hbGwgLmltYWdlLWluZm8gaVwiKS50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICAgICAgXCJmYS1pbmZvLWNpcmNsZSBmYS10aW1lc1wiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJldmVudHMgY29tbWVudHMgZnJvbSBoaWRpbmcgd2hlbiBhIGRpcmVjdCBjb21tZW50IGhhc2ggaXMgc2V0XG4gICAgICAgIGlmICghKGRvY3VtZW50LmxvY2F0aW9uLmhhc2gubGVuZ3RoICYmIGRvY3VtZW50LmxvY2F0aW9uLmhhc2guc2xpY2UoMSwgOCkgPT0gJ2NvbW1lbnQnKSkge1xuICAgICAgICAgICAgalF1ZXJ5KFwiLnRvZ2dhYmxlLWNvbW1lbnRzLWZvcm1cIikuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGpRdWVyeShcIi50b2dnYWJsZS1jb21tZW50cy1hcmVhXCIpLmxlbmd0aCkge1xuICAgICAgICAgICAgalF1ZXJ5KFwiLnRvZ2dhYmxlLWNvbW1lbnRzLWFyZWFcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGpRdWVyeShcIi50b2dnYWJsZS1jb21tZW50cy1mb3JtXCIpLnRvZ2dsZShcImZhc3RcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufSkoalF1ZXJ5KTtcbiIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gT25seSBhcHBseSBjb29raWUgYmFubmVyIGpzIGlmIGl0IGlzbid0IGFuIGVtYmVkIHBhZ2VcbiAgICBpZighd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKCcvZW1iZWQnKSkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2Mtd2luZG93Jyk7XG4gICAgICAgIGNvbnN0IGhhc0NoaWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNjLXdpbmRvdyAuamVvJyk7XG4gICAgICAgIGNvbnN0IGFjY2VwdEFsbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYy1hY2NlcHQtYWxsJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAocGFyZW50ICYmICFoYXNDaGlsZCkge1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHBhcmVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb25zdCBhZGRpdGlvbmFsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYWRkaXRpb25hbEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnamVvJyk7XG4gICAgICAgICAgICBhZGRpdGlvbmFsRWxlbWVudC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgICAgICAgICAgcGFyZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYWRkaXRpb25hbEVsZW1lbnQpO1xuICAgICAgICAgICAgcGFyZW50LnN0eWxlLnpJbmRleCA9ICc5OTk5OTk5OTk5OTk5JztcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBkYXJrZXJTY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGFya2VyU2NyZWVuLmNsYXNzTGlzdC5hZGQoJ2Rhcmtlci1zY3JlZW4nKTtcbiAgICAgICAgZGFya2VyU2NyZWVuLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgZGFya2VyU2NyZWVuLnN0eWxlLndpZHRoID0gJzEwMHZ3JztcbiAgICAgICAgZGFya2VyU2NyZWVuLnN0eWxlLmhlaWdodCA9ICcxMDB2aCc7XG4gICAgICAgIGRhcmtlclNjcmVlbi5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJztcbiAgICAgICAgZGFya2VyU2NyZWVuLnN0eWxlLm9wYWNpdHkgPSAnMC41JztcbiAgICAgICAgZGFya2VyU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRhcmtlclNjcmVlbi5zdHlsZS56SW5kZXggPSAnOTk5OTk5OTknO1xuICAgICAgICBkYXJrZXJTY3JlZW4uc3R5bGUudG9wID0gJzAnO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQoZGFya2VyU2NyZWVuKTtcbiAgICBcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgaWYgKCFwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYy1pbnZpc2libGUnKSB8fCBwYXJlbnQuc3R5bGUuZGlzcGxheSAhPSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICBkYXJrZXJTY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYy1jb21wbGlhbmNlIC5jYy1idG4nKTtcbiAgICBcbiAgICAgICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZighYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnY2Mtc2hvdy1zZXR0aW5ncycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhcmtlclNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2MtYm90dG9tJykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYy1ib3R0b20nKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRhcmtlclNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vSGlkZSBjb29raWUgYmFubmVyIGluIGVtYmVkIHBhZ2VzXG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNjLXJldm9rZScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYy13aW5kb3cuY2Mtd2luZG93Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbn0pIiwic2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIChmdW5jdGlvbigkKXtcbiAgICAgICAgaWYodHlwZW9mIGFqYXh1cmwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpbmdsZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICQucG9zdChhamF4dXJsLCB7YWN0aW9uOiAnYWpheHB2JywgYWpheHB2OiBhamF4cHYsIGFqYXhwdDogYWpheHB0fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KShqUXVlcnkpO1xufSwyMDAwKSIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgemVyb1BhZCA9IChudW0sIHBsYWNlcykgPT4gU3RyaW5nKG51bSkucGFkU3RhcnQocGxhY2VzLCAnMCcpO1xuXG4gICAgZnVuY3Rpb24gcmVza2luVGltZShzZWNzKSB7XG4gICAgICAgIHZhciBociA9IE1hdGguZmxvb3Ioc2VjcyAvIDM2MDApO1xuICAgICAgICB2YXIgbWluID0gTWF0aC5mbG9vcigoc2VjcyAtIChociAqIDM2MDApKSAvIDYwKTtcbiAgICAgICAgdmFyIHNlYyA9IE1hdGguZmxvb3Ioc2VjcyAtIChociAqIDM2MDApIC0gKG1pbiAqIDYwKSk7XG4gICAgICAgIGlmIChzZWMgPCAxMCkge1xuICAgICAgICAgICAgICAgIHNlYyA9IFwiMFwiICsgc2VjO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW4gKyAnOicgKyBzZWM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbnVtYmVyTWFwKG4sIHN0YXJ0MSwgc3RvcDEsIHN0YXJ0Miwgc3RvcDIpIHtcbiAgICAgICAgcmV0dXJuICgobi1zdGFydDEpLyhzdG9wMS1zdGFydDEpKSooc3RvcDItc3RhcnQyKStzdGFydDI7XG4gICAgfTtcblxuXG4gICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2F0ZWdvcnktYXVkaW8gLndwLWJsb2NrLWF1ZGlvXCIpXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChhdWRpb193cmFwcGVyLCBpbmRleCkge1xuICAgICAgICAgICAgLy8gQnVpbGQgZmFrZSBwbGF5ZXIgc3RydWN0dXJlXG4gICAgICAgICAgICBhdWRpb193cmFwcGVyLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICAgICAgICAgICBcImFmdGVyYmVnaW5cIixcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImF1ZGlvLWZha2UtcGxheWVyXCI+IDxkaXYgY2xhc3M9XCJwbGF5ZXItbWV0YVwiPiA8c3BhbiBjbGFzcz1cImN1cnJlbnQtdGltZVwiPjA6MDA8L3NwYW4+IDxkaXYgY2xhc3M9XCJhdWRpby1iYXJcIj48ZGl2IGNsYXNzPVwiZmlsbC1iYXJcIj48L2Rpdj48L2Rpdj4gPHNwYW4gY2xhc3M9XCJ0b3RhbC10aW1lXCI+MToxNTwvc3Bhbj4gPC9kaXY+IDxidXR0b24gY2xhc3M9XCJwbGF5LWJ1dHRvblwiPiA8aSBjbGFzcz1cImZhcyBmYS1wbGF5XCI+PC9pPiA8L2J1dHRvbj4gPC9kaXY+J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYoIWluZGV4KXtcbiAgICAgICAgICAgICAgICBhdWRpb193cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5hdWRpby1mYWtlLXBsYXllcicpLmNsYXNzTGlzdC5hZGQoJ2ZpcnN0LWZha2UtYXVkaW8tZWxlbWVudCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBwbGF5ZXIgPSBhdWRpb193cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCJhdWRpb1wiKTtcbiAgICAgICAgICAgIHBsYXllci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGF1ZGlvX3dyYXBwZXIucXVlcnlTZWxlY3RvcignLnRvdGFsLXRpbWUnKS5pbm5lckhUTUwgPSByZXNraW5UaW1lKHBsYXllci5kdXJhdGlvbik7ICAgXG4gICAgICAgICAgICAgICAgYXVkaW9fd3JhcHBlci5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheS1idXR0b24nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllcltwbGF5ZXIucGF1c2VkID8gJ3BsYXknIDogJ3BhdXNlJ10oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucXVlcnlTZWxlY3RvcignaScpLmNsYXNzTGlzdC5jb250YWlucygnZmEtdW5kbycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2knKS5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtdW5kb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucXVlcnlTZWxlY3RvcignaScpLmNsYXNzTGlzdC50b2dnbGUoXCJmYS1wYXVzZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2knKS5jbGFzc0xpc3QudG9nZ2xlKFwiZmEtcGF1c2VcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVlcnlTZWxlY3RvcignaScpLmNsYXNzTGlzdC50b2dnbGUoXCJmYS1wbGF5XCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGF1ZGlvX3dyYXBwZXIucXVlcnlTZWxlY3RvcignLmF1ZGlvLWJhcicpLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5jdXJyZW50VGltZSA9IG51bWJlck1hcChlLm9mZnNldFgsIDAsIHRoaXMub2Zmc2V0V2lkdGgsIDAsIHBsYXllci5kdXJhdGlvbikudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2h0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vaG93dG8vaG93dG9fanNfZHJhZ2dhYmxlLmFzcFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGF1ZGlvX3dyYXBwZXIucXVlcnlTZWxlY3RvcignaScpLmNsYXNzTGlzdC50b2dnbGUoXCJmYS11bmRvXCIpO1xuICAgICAgICAgICAgICAgIGF1ZGlvX3dyYXBwZXIucXVlcnlTZWxlY3RvcignaScpLmNsYXNzTGlzdC50b2dnbGUoXCJmYS1wYXVzZVwiKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgYXVkaW9fd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuZmlsbC1iYXInKS5zdHlsZS53aWR0aCA9IChwbGF5ZXIuY3VycmVudFRpbWUgLyBwbGF5ZXIuZHVyYXRpb24pKjEwMCArICclJztcbiAgICAgICAgICAgICAgICBhdWRpb193cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXRpbWUnKS5pbm5lckhUTUwgPSByZXNraW5UaW1lKHBsYXllci5jdXJyZW50VGltZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSk7XG59KTtcblxuIiwiLy8gdGhpcyBpcyBzdXBwb3NlZCB0byBmaXggZ2FsbGVyeS1pbWFnZSBibG9jayBpbnNpZGUgY292ZXIgYmxvY2tcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndwLWJsb2NrLWNvdmVyJykuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGlmKGVsZW1lbnQucXVlcnlTZWxlY3RvcignLndwLWJsb2NrLWplby10aGVtZS1jdXN0b20taW1hZ2UtZ2FsbGVyeS1ibG9jaycpKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hhcy1pbWFnZS1nYWxsZXJ5Jyk7XG4gICAgICAgIH1cbiAgICB9KVxufSkiLCJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jcmVkaXRlZC1pbWFnZS1ibG9jaycpLmZvckVhY2goaW1hZ2VCbG9jayA9PiB7XG4gICAgICAgIGltYWdlQmxvY2sucXVlcnlTZWxlY3RvcignLmltYWdlLWRlc2NyaXB0aW9uLXRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpbWFnZUJsb2NrLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICB9KVxuICAgIH0pXG59KSIsImltcG9ydCB7IF9fIH0gZnJvbSAnQHdvcmRwcmVzcy9pMThuJztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIHR5cGVvZiB3aW5kb3cuamVvX3RoZW1lX2NvbmZpZyAhPT0gJ3VuZGVmaW5lZCcgJiYgISB3aW5kb3cuamVvX3RoZW1lX2NvbmZpZy5lbmFibGVfZGFya19tb2RlICkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVtZScpKSB7XG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVtZScpID09IFwiZGFya1wiKSB7XG4gICAgICAgICAgICBqUXVlcnkoJ2JvZHknKS5hZGRDbGFzcygnZGFyay10aGVtZScpO1xuICAgICAgICAgICAgalF1ZXJ5KCdidXR0b25bYWN0aW9uPVwiZGFyay1tb2RlXCJdIGk6bGFzdC1jaGlsZCcpLnRvZ2dsZUNsYXNzKFxuICAgICAgICAgICAgICAgIFwiZmEtdG9nZ2xlLW9mZiBmYS10b2dnbGUtb25cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdXNlclByZWZlcnNEYXJrID0gd2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzO1xuICAgICAgICBjb25zdCB1c2VyUHJlZmVyc0xpZ2h0ID0gd2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpJykubWF0Y2hlcztcblxuICAgICAgICBpZih1c2VyUHJlZmVyc0Rhcmspe1xuICAgICAgICAgICAgalF1ZXJ5KCdib2R5JykuYWRkQ2xhc3MoJ2RhcmstdGhlbWUnKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aGVtZScsIFwiZGFya1wiKTtcbiAgICAgICAgfSBcbiAgICAgICAgXG4gICAgICAgIGlmKHVzZXJQcmVmZXJzTGlnaHQgfHwgIXVzZXJQcmVmZXJzRGFyayAmJiAhdXNlclByZWZlcnNMaWdodCl7XG4gICAgICAgICAgICBpZihqUXVlcnkoJ2JvZHknKS5oYXNDbGFzcygnZGFyay10aGVtZScpKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCdib2R5JykucmVtb3ZlQ2xhc3MoJ2RhcmstdGhlbWUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RoZW1lJywgXCJsaWdodFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgalF1ZXJ5KCdidXR0b25bYWN0aW9uPVwiZGFyay1tb2RlXCJdJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBqUXVlcnkoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKFwiZGFyay10aGVtZVwiKTtcbiAgICAgICAgalF1ZXJ5KHRoaXMucXVlcnlTZWxlY3RvcihcImk6bGFzdC1jaGlsZFwiKSkudG9nZ2xlQ2xhc3MoXG4gICAgICAgICAgICBcImZhLXRvZ2dsZS1vZmYgZmEtdG9nZ2xlLW9uXCJcbiAgICAgICAgKTtcblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGhlbWUnLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGhlbWUnKSA9PSBcImRhcmtcIj8gXCJsaWdodFwiIDogXCJkYXJrXCIpO1xuXG4gICAgICAgIGNvbnN0IGxpZ2h0TGFiZWwgPSBfXyggJ0xpZ2h0IG1vZGUnLCAnamVvJyApO1xuICAgICAgICBjb25zdCBkYXJrTGFiZWwgPSBfXyggJ0RhcmsgbW9kZScsICdqZW8nICk7XG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVtZScpID09IFwiZGFya1wiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucXVlcnlTZWxlY3RvcignLml0ZW0tLXRpdGxlJykuaW5uZXJIVE1MKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVlcnlTZWxlY3RvcignLml0ZW0tLXRpdGxlJykuaW5uZXJIVE1MID0gbGlnaHRMYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHt9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucXVlcnlTZWxlY3RvcignLml0ZW0tLXRpdGxlJykuaW5uZXJIVE1MKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVlcnlTZWxlY3RvcignLml0ZW0tLXRpdGxlJykuaW5uZXJIVE1MID0gZGFya0xhYmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2gge307XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgalF1ZXJ5KCdidXR0b25bYWN0aW9uPVwiaW5jcmVhc2Utc2l6ZVwiXScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBmb250U2l6ZSA9IGpRdWVyeSgnaHRtbCcpLmNzcygnZm9udC1zaXplJyk7XG4gICAgICAgIGNvbnN0IG5ld0ZvbnRTaXplID0gcGFyc2VJbnQoZm9udFNpemUpICsgMTtcbiAgICBcbiAgICAgICAgaWYgKGNoZWNrU2l6ZShuZXdGb250U2l6ZSkpIHtcbiAgICAgICAgICAgIGpRdWVyeSgnaHRtbCcpLmNzcygnZm9udC1zaXplJywgbmV3Rm9udFNpemUpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2ZvbnRTaXplQWNjZXNzaWJpbGl0eScsIG5ld0ZvbnRTaXplKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGpRdWVyeSgnYnV0dG9uW2FjdGlvbj1cImRlY3JlYXNlLXNpemVcIl0nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSBqUXVlcnkoJ2h0bWwnKS5jc3MoJ2ZvbnQtc2l6ZScpO1xuICAgICAgICBjb25zdCBuZXdGb250U2l6ZSA9IHBhcnNlSW50KGZvbnRTaXplKSAtIDE7XG4gICAgXG4gICAgICAgIGlmIChjaGVja1NpemUobmV3Rm9udFNpemUpKSB7XG4gICAgICAgICAgICBqUXVlcnkoJ2h0bWwnKS5jc3MoJ2ZvbnQtc2l6ZScsIG5ld0ZvbnRTaXplKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmb250U2l6ZUFjY2Vzc2liaWxpdHknLCBuZXdGb250U2l6ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZm9udFNpemVBY2Nlc3NpYmlsaXR5JykpIHtcbiAgICAgICAgalF1ZXJ5KCdodG1sJykuY3NzKCdmb250LXNpemUnLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZm9udFNpemVBY2Nlc3NpYmlsaXR5JykgKyAncHgnKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gY2hlY2tTaXplKG5ld0ZvbnRTaXplKSB7XG4gICAgICAgIHJldHVybiBuZXdGb250U2l6ZSA8PSAxMCB8fCBuZXdGb250U2l6ZSA+PSAyNj8gZmFsc2UgOiB0cnVlO1xuICAgIH1cbn0pOyIsIihmdW5jdGlvbigkLCB3aW5kb3cpIHtcbiAgICB2YXIgYWRqdXN0QW5jaG9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyICRhbmNob3IgPSAkKCc6dGFyZ2V0JyksXG4gICAgICAgICAgICAgICAgZml4ZWRFbGVtZW50SGVpZ2h0ID0gMTAwO1xuXG4gICAgICAgIGlmICgkYW5jaG9yLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpXG4gICAgICAgICAgICAgICAgLnN0b3AoKVxuICAgICAgICAgICAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkYW5jaG9yLm9mZnNldCgpLnRvcCAtIGZpeGVkRWxlbWVudEhlaWdodFxuICAgICAgICAgICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQod2luZG93KS5vbignaGFzaGNoYW5nZSBsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFkanVzdEFuY2hvcigpO1xuICAgIH0pO1xuXG59KShqUXVlcnksIHdpbmRvdyk7IiwiaW1wb3J0IFwiLi9mb250LXNpemVcIjtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBqUXVlcnkod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoICEgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggXCIuYm90dG9tLWhlYWRlci1jb250YWluLmRlc2t0b3Atb25seVwiICkgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhlYWRlckhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBcIi5ib3R0b20taGVhZGVyLWNvbnRhaW4uZGVza3RvcC1vbmx5XCJcbiAgICAgICAgKS5vZmZzZXRUb3A7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGhlYWRlckhlaWdodCk7XG4gICAgICAgIGlmIChqUXVlcnkodGhpcykuc2Nyb2xsVG9wKCkgPiBoZWFkZXJIZWlnaHQpIHtcbiAgICAgICAgICAgIGpRdWVyeShcIi5ib3R0b20taGVhZGVyLWNvbnRhaW4ucG9zdC1oZWFkZXJcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICAgICAgICAgIGlmICghalF1ZXJ5KFwiaGVhZGVyICNoZWFkZXItc2VhcmNoXCIpLmhhc0NsYXNzKFwiZml4ZWRcIikpIHtcbiAgICAgICAgICAgICAgICBqUXVlcnkoXCJoZWFkZXIgI2hlYWRlci1zZWFyY2hcIikuYWRkQ2xhc3MoXCJmaXhlZFwiKTtcbiAgICAgICAgICAgICAgICBqUXVlcnkoXCJoZWFkZXIgI2hlYWRlci1zZWFyY2hcIikuY3NzKFwidG9wXCIsIDAgKyBcInB4XCIpO1xuICAgICAgICAgICAgICAgIGpRdWVyeShcImhlYWRlciAjaGVhZGVyLXNlYXJjaFwiKS5jc3MoXCJwYWRkaW5nLXRvcFwiLCA1MCArIFwicHhcIik7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KFwiaGVhZGVyICNoZWFkZXItc2VhcmNoXCIpLmNzcyhcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KHdpbmRvdykuaGVpZ2h0KClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFqUXVlcnkoXCJib2R5XCIpLmhhc0NsYXNzKFwibW9iaWxlLW1lbnUtb3BlbmVkXCIpKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KFwiLmJvdHRvbS1oZWFkZXItY29udGFpbi5wb3N0LWhlYWRlclwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGpRdWVyeShcImhlYWRlciAjaGVhZGVyLXNlYXJjaFwiKS5oYXNDbGFzcyhcImZpeGVkXCIpKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KFwiaGVhZGVyICNoZWFkZXItc2VhcmNoXCIpLnJlbW92ZUNsYXNzKFwiZml4ZWRcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWpRdWVyeShcImJvZHlcIikuaGFzQ2xhc3MoXCJsb2dnZWQtaW5cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KFwiaGVhZGVyICNoZWFkZXItc2VhcmNoXCIpLmNzcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvdHRvbS1oZWFkZXItY29udGFpbi5kZXNrdG9wLW9ubHlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2Zmc2V0VG9wICtcbiAgICAgICAgICAgICAgICAgICAgICAgIDQ1ICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHhcIlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeShcImhlYWRlciAjaGVhZGVyLXNlYXJjaFwiKS5jc3MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib3R0b20taGVhZGVyLWNvbnRhaW4uZGVza3RvcC1vbmx5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9mZnNldFRvcCArXG4gICAgICAgICAgICAgICAgICAgICAgICA3NyArXG4gICAgICAgICAgICAgICAgICAgICAgICBcInB4XCJcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGpRdWVyeShcImJ1dHRvbi5zZWFyY2gtdG9nZ2xlXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGpRdWVyeShcImhlYWRlciNtYXN0aGVhZFwiKS50b2dnbGVDbGFzcyhcImhpZGUtaGVhZGVyLXNlYXJjaFwiKTtcbiAgICB9KTtcblxuICAgIGlmICggZG9jdW1lbnQucXVlcnlTZWxlY3RvciggXCIuYm90dG9tLWhlYWRlci1jb250YWluLmRlc2t0b3Atb25seVwiICkgKSB7XG4gICAgICAgIGpRdWVyeShcImhlYWRlciAjaGVhZGVyLXNlYXJjaFwiKS5jc3MoXG4gICAgICAgICAgICBcInRvcFwiLFxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib3R0b20taGVhZGVyLWNvbnRhaW4uZGVza3RvcC1vbmx5XCIpLm9mZnNldFRvcCArXG4gICAgICAgICAgICA1MCArXG4gICAgICAgICAgICBcInB4XCJcbiAgICAgICAgKTtcbiAgICBcbiAgICBcbiAgICAgICAgalF1ZXJ5KFwiaGVhZGVyICNoZWFkZXItc2VhcmNoXCIpLmNzcyhcbiAgICAgICAgICAgIFwiaGVpZ2h0XCIsXG4gICAgICAgICAgICBqUXVlcnkod2luZG93KS5oZWlnaHQoKSAtXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvdHRvbS1oZWFkZXItY29udGFpbi5kZXNrdG9wLW9ubHlcIikub2Zmc2V0VG9wICtcbiAgICAgICAgICAgIFwicHhcIlxuICAgICAgICApO1xuICAgIFxuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgLmdldEVsZW1lbnRCeUlkKFwibW9iaWxlLXNpZGViYXItZmFsbGJhY2tcIilcbiAgICAgICAgICAgIC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICBcIi0tcGFkZGluZy1sZWZ0XCIsXG4gICAgICAgICAgICAgICAgalF1ZXJ5KFxuICAgICAgICAgICAgICAgICAgICBcIi5ib3R0b20taGVhZGVyLWNvbnRhaW4ucG9zdC1oZWFkZXIgLm1vYmlsZS1tZW51LXRvZ2dsZS5sZWZ0LW1lbnUtdG9nZ2xlXCJcbiAgICAgICAgICAgICAgICApLm9mZnNldCgpLmxlZnQgKyBcInB4XCJcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgalF1ZXJ5KFwiLm1vcmUtbWVudS0tY29udGVudFwiKS5jc3MoXG4gICAgICAgICAgICAgICAgXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgalF1ZXJ5KFwiYXNpZGUjbW9iaWxlLXNpZGViYXItZmFsbGJhY2tcIikub2Zmc2V0KCkubGVmdCArXG4gICAgICAgICAgICAgICAgalF1ZXJ5KFwiYXNpZGUjbW9iaWxlLXNpZGViYXItZmFsbGJhY2tcIikud2lkdGgoKSArXG4gICAgICAgICAgICAgICAgalF1ZXJ5KFxuICAgICAgICAgICAgICAgICAgICBcIi5ib3R0b20taGVhZGVyLWNvbnRhaW4ucG9zdC1oZWFkZXIgLm1vYmlsZS1tZW51LXRvZ2dsZS5sZWZ0LW1lbnUtdG9nZ2xlXCJcbiAgICAgICAgICAgICAgICApLm9mZnNldCgpLmxlZnRcbiAgICAgICAgKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2UtdGVtcGxhdGUtZGlzY292ZXJ5JykubGVuZ3RoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLXRlbXBsYXRlLWRpc2NvdmVyeScpLnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgXCItLXBhZGRpbmctbGVmdFwiLFxuICAgICAgICAgICAgalF1ZXJ5KFxuICAgICAgICAgICAgICAgIFwiLmJvdHRvbS1oZWFkZXItY29udGFpbi5wb3N0LWhlYWRlciAubW9iaWxlLW1lbnUtdG9nZ2xlLmxlZnQtbWVudS10b2dnbGVcIlxuICAgICAgICAgICAgKS5vZmZzZXQoKS5sZWZ0ICsgXCJweFwiXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICBqUXVlcnkoXCJidXR0b24ubW9iaWxlLW1lbnUtdG9nZ2xlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgalF1ZXJ5KFwiLm1vcmUtbWVudS0tY29udGVudFwiKS5jc3MoXG4gICAgICAgICAgICBcImxlZnRcIixcbiAgICAgICAgICAgIGpRdWVyeShcImFzaWRlI21vYmlsZS1zaWRlYmFyLWZhbGxiYWNrXCIpLndpZHRoKClcbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIGpRdWVyeSgnYnV0dG9uW2FjdGlvbj1cInRvZ2dsZS1vcHRpb25zXCJdJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBqUXVlcnkodGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoXCIudG9nZ2xlLW9wdGlvbnNcIikpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGlzQ2xpY2tJbnNpZGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW2FjdGlvbj1cInRvZ2dsZS1vcHRpb25zXCJdJykuY29udGFpbnMoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgaWYgKCFpc0NsaWNrSW5zaWRlRWxlbWVudCAmJiAhWydpbmNyZWFzZS1zaXplJywgJ2RlY3JlYXNlLXNpemUnXS5pbmNsdWRlcyhldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdhY3Rpb24nKSkpIHtcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9nZ2xlLW9wdGlvbnNcIikuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9nZ2xlLW9wdGlvbnNcIikuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCdidXR0b24ubWVudS1idG4nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgXCIuYm90dG9tLWhlYWRlci1jb250YWluLmRlc2t0b3Atb25seVwiXG4gICAgICAgICkub2Zmc2V0VG9wO1xuXG4gICAgICAgIGlmKGpRdWVyeSh3aW5kb3cpLnNjcm9sbFRvcCgpIDw9IGhlYWRlckhlaWdodCAmJiBqUXVlcnkod2luZG93KS53aWR0aCgpID4gODI5KSB7XG4gICAgICAgICAgICBqUXVlcnkoXCIuYm90dG9tLWhlYWRlci1jb250YWluLnBvc3QtaGVhZGVyXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgalF1ZXJ5KFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcIm1vYmlsZS1tZW51LW9wZW5lZFwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgalF1ZXJ5KCdidXR0b25bYWN0aW9uPVwibGFuZ3VhZ2Utb3B0aW9uc1wiXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLnRvZ2dsZS1sYW5ndWFnZS1vcHRpb25zXCIpKS50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgIFwiYWN0aXZlXCJcbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHNoYXJlRGF0YSA9IHtcbiAgICAgICAgdGl0bGU6IGRvY3VtZW50LnRpdGxlLFxuICAgICAgICB0ZXh0OiBcIlwiLFxuICAgICAgICB1cmw6IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYsXG4gICAgfTtcblxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblthY3Rpb249XCJzaGFyZS1uYXZpZ2F0b3JcIl0nKTtcbiAgICBjb25zdCByZXN1bHRQYXJhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgICBpZihkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCAhPSAnaHR0cDonKSB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3Iuc2hhcmUoc2hhcmVEYXRhKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlc3VsdFBhcmEudGV4dENvbnRlbnQgPSBcIkVycm9yOiBcIiArIGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJOYXRpdmUgc2hhcmUgaXMgbm90IGFsbG93ZWQgb3ZlciBIVFRQIHByb3RvY29sLlwiKVxuICAgIH1cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3JlLW1lbnUnKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgICAgalF1ZXJ5KFwiLm1vcmUtbWVudS0tY29udGVudFwiKS5hZGRDbGFzcygncGVybWFob3ZlcicpO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYmlsZS1zaWRlYmFyJykuY2hpbGROb2Rlcy5mb3JFYWNoKCBjaGlsZE5vZGUgPT4ge1xuICAgICAgICBjaGlsZE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZihjaGlsZE5vZGUuY2xhc3NOYW1lICE9ICdtb3JlLW1lbnUnKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KFwiLm1vcmUtbWVudS0tY29udGVudFwiKS5yZW1vdmVDbGFzcygncGVybWFob3ZlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0gKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpeyAgIFxuICAgICAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3JlLW1lbnUtLWNvbnRlbnQnKS5jb250YWlucyhlLnRhcmdldCkgJiZcbiAgICAgICAgIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3JlLW1lbnUnKS5jb250YWlucyhlLnRhcmdldClcbiAgICAgICAgKXtcbiAgICAgICAgICAgIGpRdWVyeShcIi5tb3JlLW1lbnUtLWNvbnRlbnRcIikucmVtb3ZlQ2xhc3MoJ3Blcm1haG92ZXInKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG59KTtcbiIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaXNNb2JpbGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRldmljZVdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgICAgIGlmIChkZXZpY2VXaWR0aCA+PSA4MzApIHJldHVybiBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBcblxuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5rLWRyb3Bkb3duJykgJiYgaXNNb2JpbGUoKSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluay1kcm9wZG93biAuY29udHJvbHMuc2F2ZWQtYmxvY2snKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluay1kcm9wZG93biAuc2VjdGlvbnMnKTtcbiAgICAgICAgICAgIGNvbnN0IGFycm93SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5rLWRyb3Bkb3duIC5hcnJvdy1pY29uJyk7XG4gICAgICAgICBcbiAgICAgICAgICAgIHNlY3Rpb25zLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuMnMgZWFzZS1pbic7XG4gICAgXG4gICAgICAgICAgICBpZihzZWN0aW9ucy5zdHlsZS5vcGFjaXR5ID09IDEpIHtcbiAgICAgICAgICAgICAgICBhcnJvd0ljb24uY2xhc3NOYW1lID0gJ2Fycm93LWljb24gZmFzIGZhLWFuZ2xlLWRvd24nO1xuICAgICAgICAgICAgICAgIHNlY3Rpb25zLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgICAgIHNlY3Rpb25zLnN0eWxlLmhlaWdodCA9IDA7XG4gICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFycm93SWNvbi5jbGFzc05hbWUgPSAnYXJyb3ctaWNvbiBmYXMgZmEtYW5nbGUtdXAnO1xuICAgICAgICAgICAgICAgIHNlY3Rpb25zLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgICAgIHNlY3Rpb25zLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcbiAgICBcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4iLCJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2luZ2xlLXByb2plY3QgLm1haW4tY29udGVudCBhLnByb2plY3QtbGluaycpO1xuICAgIFxuICAgIGlmKGJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbnRyeS1jb250ZW50Jyk7XG4gICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUoYnV0dG9uc1swXSwgdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy50ZWFtLW1lbWJlcnMnKSk7XG4gICAgfVxufSkiLCJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGlzUmVwdWJsaXNoYWJsZVBvc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVwdWJsaXNoLXBvc3QnKTtcblxuICAgIGlmKGlzUmVwdWJsaXNoYWJsZVBvc3QpIHtcbiAgICAgICAgLy8gT3BlbiBhbmQgY2xvc2UgbW9kYWxcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVwdWJsaXNoLXBvc3QtbW9kYWwnKTtcbiAgICAgICAgY29uc3QgbW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29udGFpbmVyJylcbiAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcImhpZGVNb2RhbFwiKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVwdWJsaXNoLXBvc3QtbGFiZWwnKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcInNob3dNb2RhbFwiKTtcbiAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLWJ1dHRvbicpLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd01vZGFsXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTW9kYWwgdGFicyAoSFRNTC9URVhUKVxuICAgICAgICBodG1sQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2xzIC5odG1sLWJ1dHRvbicpO1xuICAgICAgICB0ZXh0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2xzIC50ZXh0LWJ1dHRvbicpO1xuXG4gICAgICAgIGh0bWxUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXItaHRtbC10ZXh0Jyk7XG4gICAgICAgIHJhd1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlci1yYXctdGV4dCcpO1xuXG4gICAgICAgIGh0bWxCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHJhd1RleHQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGh0bWxUZXh0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICBodG1sQnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjY2NjY2NjJztcbiAgICAgICAgICAgIGh0bWxCdXR0b24uc3R5bGUuY29sb3IgPSAnIzU1NUQ2Nic7XG5cbiAgICAgICAgICAgIHRleHRCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyM1NTVENjYnO1xuICAgICAgICAgICAgdGV4dEJ1dHRvbi5zdHlsZS5jb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgIH1cblxuICAgICAgICB0ZXh0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICByYXdUZXh0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgaHRtbFRleHQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICAgICAgaHRtbEJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzU1NUQ2Nic7XG4gICAgICAgICAgICBodG1sQnV0dG9uLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgICAgIHRleHRCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNjY2NjY2MnXG4gICAgICAgICAgICB0ZXh0QnV0dG9uLnN0eWxlLmNvbG9yID0gJyM1NTVENjYnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29weSBidXR0b25cbiAgICAgICAgY29weUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3B5LWJ1dHRvbicpO1xuICAgICAgICBcbiAgICAgICAgY29weUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYocmF3VGV4dC5zdHlsZS5kaXNwbGF5ICE9ICdub25lJykge1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXItcmF3LXRleHQgcCcpLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW0pO1xuICAgICAgICAgICAgICAgIGVsZW0udmFsdWUgPSB0ZXh0O1xuICAgICAgICAgICAgICAgIGVsZW0uc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXItaHRtbC10ZXh0IHAnKS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgICAgICAgICBlbGVtLnZhbHVlID0gdGV4dDtcbiAgICAgICAgICAgICAgICBlbGVtLnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGlkZSBidWxsZXRzIGludHJvZHVjdGlvbnMgaWYgdGhlcmUgaXMgbm8gYnVsbGV0XG4gICAgICAgIGlmKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnVsbGV0LWRlc2NyaXB0aW9uJykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idWxsZXRzLWludHJvZHVjdGlvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuIiwid2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBpc1NpbmdsZVN0b3J5bWFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpbmdsZS1zdG9yeW1hcCcpO1xuXG4gICAgaWYoaXNTaW5nbGVTdG9yeW1hcCkge1xuICAgICAgICBjb25zdCBub3ROYXZpZ2F0aW5nTWFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5ub3QtbmF2aWdhdGluZy1tYXAgLm1hcGJveGdsLW1hcCcgKTtcbiAgICAgICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIG5vdE5hdmlnYXRpbmdNYXAuc3R5bGUudG9wID0gYCR7IGhlYWRlckhlaWdodCB9cHhgO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0ICE9PSB1bmRlZmluZWQpID8gd2luZG93LnBhZ2VZT2Zmc2V0IDogKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUgfHwgZG9jdW1lbnQuYm9keSkuc2Nyb2xsVG9wO1xuXG4gICAgICAgICAgICBpZih3aW5kb3cuc2Nyb2xsWSA+IGhlYWRlckhlaWdodCkge1xuICAgICAgICAgICAgICAgbm90TmF2aWdhdGluZ01hcC5zdHlsZS50b3AgPSAnNTBweCc7IFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3VG9wID0gaGVhZGVySGVpZ2h0IC0gc2Nyb2xsVG9wO1xuICAgICAgICAgICAgICAgIGlmKG5ld1RvcCA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1RvcCA9IDUwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5vdE5hdmlnYXRpbmdNYXAuc3R5bGUudG9wID0gYCR7IG5ld1RvcCB9cHhgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuIiwid2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUaGlzIGZpeGVzIGlubmVyIHRvb2x0aXAgXCI6IFwiIHRvIHByZXZlbnQgcmVjdXJzaXZlIHN0cmF0ZWd5XG4gICAgY29uc3Qgc3RyaW5nQWN1bXVsYXRvciA9IChmaW5hbFN0cmluZywgaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gZmluYWxTdHJpbmcgKyAnOiAnICsgaXRlbTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgaXNDbGlja0luc2lkZUVsZW1lbnQgPSBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b29sdGlwLWJsb2NrJyk7XG4gICAgICAgIGlmICghaXNDbGlja0luc2lkZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29sdGlwLWJsb2NrJykuZm9yRWFjaCh0b29sdGlwID0+IHRvb2x0aXAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vbHRpcC1ibG9jaycpLmZvckVhY2godG9vbHRpcCA9PiB7XG4gICAgICAgIGNvbnN0IHNwbGl0UmVzdWx0ID0gdG9vbHRpcC5pbm5lclRleHQuc3BsaXQoJzogJyk7XG5cbiAgICAgICAgaWYoc3BsaXRSZXN1bHQubGVuZ3RoID09IDEgfHwgIXNwbGl0UmVzdWx0Lmxlbmd0aCApIHtcbiAgICAgICAgICAgIHRvb2x0aXAuY2xhc3NMaXN0LnJlbW92ZSgndG9vbHRpcC1ibG9jaycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVmZXJlbmNlV29yZCA9IHNwbGl0UmVzdWx0WzBdO1xuICAgICAgICBjb25zdCBjb250ZW50VG9vbHRpcCA9IHNwbGl0UmVzdWx0Lmxlbmd0aCA+PSAxPyBzcGxpdFJlc3VsdC5zcGxpY2UoMSkucmVkdWNlKHN0cmluZ0FjdW11bGF0b3IpOiAnJztcblxuICAgICAgICBjb25zdCB0b29sdGlwRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b29sdGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0b29sdGlwLWJsb2NrLS1jb250ZW50Jyk7XG4gICAgICAgIHRvb2x0aXBFbGVtZW50LmlubmVyVGV4dCA9IGNvbnRlbnRUb29sdGlwO1xuXG5cbiAgICAgICAgdG9vbHRpcC5pbm5lclRleHQgPSByZWZlcmVuY2VXb3JkO1xuICAgICAgICB0b29sdGlwLmFwcGVuZENoaWxkKHRvb2x0aXBFbGVtZW50KTtcblxuICAgICAgICB0b29sdGlwLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vbHRpcC1ibG9jay5hY3RpdmUnKS5mb3JFYWNoKGl0ZW0gPT4geyBpZihpdGVtICE9IHRoaXMpIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyl9KVxuICAgICAgICB9XG4gICAgfSlcbn0pIiwid2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudmlkZW8tZ2FsbGVyeS13cmFwcGVyJykuZm9yRWFjaCggdmlkZW9HYWxsZXJ5ID0+IHtcbiAgICAgICAgbGV0IHZpZGVvSXRlbnMgPSB2aWRlb0dhbGxlcnkucXVlcnlTZWxlY3RvckFsbCgnLmVtYmVkLXRlbXBsYXRlLWJsb2NrJyk7XG4gICAgICAgIFxuICAgICAgICBpZih2aWRlb0l0ZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZpZGVvQ29weVBvbGljeUZpeCA9IHZpZGVvSXRlbnNbMF0uY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbXBsei1zdGF0dXMtYWxsb3cnKSl7XG4gICAgICAgICAgICAgICAgLy8gcGx1Z2luIGNtcGx6IHBvc3Rwcm9jZXNzaW5nIGZpeC5cbiAgICAgICAgICAgICAgICB2aWRlb0NvcHlQb2xpY3lGaXgucXVlcnlTZWxlY3RvcignZmlndXJlID4gZGl2JykuY2xhc3NMaXN0LnJlbW92ZSgnY21wbHotYmxvY2tlZC1jb250ZW50LWNvbnRhaW5lcicsICdjbXBsei1wbGFjZWhvbGRlci0xJyk7XG4gICAgICAgICAgICAgICAgdmlkZW9Db3B5UG9saWN5Rml4LnF1ZXJ5U2VsZWN0b3IoJ2ZpZ3VyZSAud3AtYmxvY2stZW1iZWRfX3dyYXBwZXIgaWZyYW1lJykuY2xhc3NMaXN0LnJlbW92ZSgnY21wbHotdmlkZW8nLCAnY21wbHotaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZpZGVvR2FsbGVyeS5pbnNlcnRCZWZvcmUodmlkZW9Db3B5UG9saWN5Rml4LCB2aWRlb0l0ZW5zWzFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZpZGVvSXRlbnMgPSB2aWRlb0dhbGxlcnkucXVlcnlTZWxlY3RvckFsbCgnLmVtYmVkLXRlbXBsYXRlLWJsb2NrJyk7XG4gICAgICAgIC8vY29uc29sZS5sb2codmlkZW9JdGVucyk7XG5cbiAgICAgICAgaWYodmlkZW9JdGVucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cGVkSXRlbnMgPSBbLi4udmlkZW9JdGVuc107XG4gICAgICAgICAgICBncm91cGVkSXRlbnMuc3BsaWNlKDAsIDEpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhncm91cGVkSXRlbnMpO1xuXG4gICAgICAgICAgICBjb25zdCBncm91cGVkSXRlbnNXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBncm91cGVkSXRlbnNXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXItaXRlbnMnKTtcblxuICAgICAgICAgICAgY29uc3QgZ3JpZFNjcm9sbExpbWl0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGdyaWRTY3JvbGxMaW1pdGVyLmNsYXNzTGlzdC5hZGQoJ3Njcm9sbC1yYXRpbycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgbGFzdENsaWNrZWQgPSBcIlwiO1xuXG4gICAgICAgICAgICBncm91cGVkSXRlbnMuZm9yRWFjaCh2aWRlbyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xpY2thYmxlVmlkZW9BcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgY2xpY2thYmxlVmlkZW9BcmVhLnNldEF0dHJpYnV0ZSgnYWN0aW9uJywgJ2V4cGFuZC1tYWluLWFyZWEnKTtcbiAgICAgICAgICAgICAgICBjbGlja2FibGVWaWRlb0FyZWEuYXBwZW5kQ2hpbGQodmlkZW8pO1xuXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlVmlkZW9BcmVhLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGxhc3RDbGlja2VkICE9IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VzdCgnLnZpZGVvLWdhbGxlcnktd3JhcHBlcicpLnF1ZXJ5U2VsZWN0b3IoJy5lbWJlZC10ZW1wbGF0ZS1ibG9jaycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZXN0KCcudmlkZW8tZ2FsbGVyeS13cmFwcGVyJykuaW5zZXJ0QmVmb3JlKHRoaXMucXVlcnlTZWxlY3RvcignLmVtYmVkLXRlbXBsYXRlLWJsb2NrJykuY2xvbmVOb2RlKHRydWUpLCBncmlkU2Nyb2xsTGltaXRlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsYXN0Q2xpY2tlZCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBncm91cGVkSXRlbnNXcmFwcGVyLmFwcGVuZENoaWxkKGNsaWNrYWJsZVZpZGVvQXJlYSk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBncmlkU2Nyb2xsTGltaXRlci5hcHBlbmRDaGlsZChncm91cGVkSXRlbnNXcmFwcGVyKTtcbiAgICAgICAgICAgIHZpZGVvR2FsbGVyeS5hcHBlbmRDaGlsZChncmlkU2Nyb2xsTGltaXRlcik7XG4gICAgICAgIH1cbiAgICB9KVxufSkiLCJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFsbFlvdXR1YmVCbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudmlkZW8gLndwLWJsb2NrLWVtYmVkLXlvdXR1YmUsIC52aWRlbyAud3AtYmxvY2stdmlkZW8nKTtcbiAgICBcbiAgICBpZihhbGxZb3V0dWJlQmxvY2tzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW50cnktaGVhZGVyJyk7XG4gICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChhbGxZb3V0dWJlQmxvY2tzWzBdKTtcbiAgICB9XG59KSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIndwXCJdW1wiaTE4blwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9