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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/blocks/linkDropdown/index.js":
/*!********************************************************!*\
  !*** ./assets/javascript/blocks/linkDropdown/index.js ***!
  \********************************************************/
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
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
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





Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__["registerBlockType"])('jeo-theme/custom-link-dropdown', {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Link Dropdown', 'jeo'),
  icon: 'editor-ul',
  category: 'common',
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('link', 'jeo'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('dropdown', 'jeo')],
  supports: {
    align: ['left', 'right']
  },
  attributes: {
    option: {
      type: 'string'
    },
    dropdownTitle: {
      type: 'string'
    },
    newSectionTitle: {
      type: 'string'
    },
    newSectionURL: {
      type: 'string'
    },
    sections: {
      type: 'array'
    },
    sectionsLinks: {
      type: 'array'
    }
  },
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes;
    var _attributes$dropdownT = attributes.dropdownTitle,
        dropdownTitle = _attributes$dropdownT === void 0 ? "" : _attributes$dropdownT,
        _attributes$sections = attributes.sections,
        sections = _attributes$sections === void 0 ? [] : _attributes$sections,
        _attributes$sectionsL = attributes.sectionsLinks,
        sectionsLinks = _attributes$sectionsL === void 0 ? [] : _attributes$sectionsL,
        _attributes$newSectio = attributes.newSectionTitle,
        newSectionTitle = _attributes$newSectio === void 0 ? '' : _attributes$newSectio,
        _attributes$newSectio2 = attributes.newSectionURL,
        newSectionURL = _attributes$newSectio2 === void 0 ? '' : _attributes$newSectio2,
        _attributes$option = attributes.option,
        option = _attributes$option === void 0 ? 's' : _attributes$option;
    sections.forEach(function (element, index) {
      if (!sectionsLinks[index]) {
        sectionsLinks[index] = "";
      }
    });

    var removeSection = function removeSection(removeSectionIndex) {
      var newSections = sections.filter(function (section, index) {
        if (index != removeSectionIndex) {
          return section;
        }
      });
      sectionsLinks.splice(removeSectionIndex, 1);
      setAttributes({
        sections: newSections,
        sectionsLinks: sectionsLinks
      });
    };

    var displaySections = function displaySections(sections) {
      return sections.map(function (section, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "section"
        }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"], {
          tagName: "p",
          className: "section-url",
          value: section,
          formattingControls: ['bold', 'italic'],
          onChange: function onChange(updatedSectionTitle) {
            setAttributes({
              sections: sections.map(function (item, i) {
                if (i == index) {
                  return updatedSectionTitle;
                } else {
                  return item;
                }
              })
            });
          }
        }), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"], {
          tagName: "p",
          className: "section-url",
          value: sectionsLinks[index],
          formattingControls: ['bold', 'italic'],
          onChange: function onChange(content) {
            setAttributes({
              sectionsLinks: sectionsLinks.map(function (item, i) {
                if (i == index) {
                  return content;
                } else {
                  return item;
                }
              })
            });
          }
        }), /*#__PURE__*/React.createElement("div", {
          className: "remove-item",
          onClick: function onClick() {
            return removeSection(index);
          }
        }, /*#__PURE__*/React.createElement("span", {
          "class": "dashicons dashicons-trash"
        })));
      });
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "link-dropdown"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["RadioControl"], {
      label: "Target",
      selected: option,
      options: [{
        label: 'New page',
        value: 'n'
      }, {
        label: 'Same page',
        value: 's'
      }],
      onChange: function onChange(option) {
        setAttributes({
          option: option
        });
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "controls"
    }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"], {
      tagName: "h2",
      className: "dropdown-title",
      value: dropdownTitle,
      formattingControls: ['bold', 'italic'],
      onChange: function onChange(dropdownTitle) {
        setAttributes({
          dropdownTitle: dropdownTitle
        });
      },
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Type a title', 'jeo')
    }), /*#__PURE__*/React.createElement("i", {
      "class": "arrow-icon fas fa-angle-down"
    })), /*#__PURE__*/React.createElement("div", {
      className: "sections"
    }, displaySections(sections)), /*#__PURE__*/React.createElement("div", {
      "class": "inputs"
    }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"], {
      tagName: "p",
      className: "title-input",
      value: newSectionTitle,
      formattingControls: ['bold', 'italic'],
      onChange: function onChange(newSectionTitle) {
        setAttributes({
          newSectionTitle: newSectionTitle
        });
      },
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Section title', 'jeo')
    }), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"], {
      tagName: "p",
      className: "url-input",
      value: newSectionURL,
      formattingControls: ['bold', 'italic'],
      onChange: function onChange(newSectionURL) {
        setAttributes({
          newSectionURL: newSectionURL
        });
      },
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Section URL (requires HTTPS)', 'jeo')
    })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      onClick: function onClick() {
        if (!newSectionURL || !newSectionTitle) {
          alert(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Please, fill all the fields.', 'jeo'));
          return;
        }

        var newSections = [].concat(_toConsumableArray(sections), [newSectionTitle]);
        var newSectionsLinks = [].concat(_toConsumableArray(sectionsLinks), [newSectionURL]);
        setAttributes({
          sections: newSections,
          sectionsLinks: newSectionsLinks,
          newSectionTitle: '',
          newSectionURL: ''
        });
      },
      isSecondary: true
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Add new section', 'jeo')));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    var _attributes$dropdownT2 = attributes.dropdownTitle,
        dropdownTitle = _attributes$dropdownT2 === void 0 ? "" : _attributes$dropdownT2,
        _attributes$sections2 = attributes.sections,
        sections = _attributes$sections2 === void 0 ? [] : _attributes$sections2,
        _attributes$sectionsL2 = attributes.sectionsLinks,
        sectionsLinks = _attributes$sectionsL2 === void 0 ? [] : _attributes$sectionsL2,
        _attributes$option2 = attributes.option,
        option = _attributes$option2 === void 0 ? "s" : _attributes$option2;
    var isBlank = option === "n";

    var displaySections = function displaySections(sections) {
      return sections.map(function (section, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "section"
        }, /*#__PURE__*/React.createElement("a", {
          href: sectionsLinks[index],
          target: isBlank && '_blank' // Initial test
          ,
          rel: isBlank && 'noopener noreferrer' // Add this to fix

        }, sections[index]));
      });
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "link-dropdown"
    }, /*#__PURE__*/React.createElement("div", {
      className: "controls saved-block"
    }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"].Content, {
      className: "dropdown-title",
      tagName: "h2",
      value: dropdownTitle
    }), /*#__PURE__*/React.createElement("i", {
      "class": "arrow-icon fas fa-angle-down"
    })), /*#__PURE__*/React.createElement("div", {
      className: "sections saved-block"
    }, displaySections(sections)));
  }
});

/***/ }),

/***/ 11:
/*!**************************************************************!*\
  !*** multi ./assets/javascript/blocks/linkDropdown/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/html/plenamata/code/wp-content/themes/jeo-theme/assets/javascript/blocks/linkDropdown/index.js */"./assets/javascript/blocks/linkDropdown/index.js");


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blockEditor"]; }());

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blocks"]; }());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvYmxvY2tzL2xpbmtEcm9wZG93bi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgW1wid3BcIixcImJsb2NrRWRpdG9yXCJdIiwid2VicGFjazovLy9leHRlcm5hbCBbXCJ3cFwiLFwiYmxvY2tzXCJdIiwid2VicGFjazovLy9leHRlcm5hbCBbXCJ3cFwiLFwiY29tcG9uZW50c1wiXSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgW1wid3BcIixcImkxOG5cIl0iXSwibmFtZXMiOlsicmVnaXN0ZXJCbG9ja1R5cGUiLCJ0aXRsZSIsIl9fIiwiaWNvbiIsImNhdGVnb3J5Iiwia2V5d29yZHMiLCJzdXBwb3J0cyIsImFsaWduIiwiYXR0cmlidXRlcyIsIm9wdGlvbiIsInR5cGUiLCJkcm9wZG93blRpdGxlIiwibmV3U2VjdGlvblRpdGxlIiwibmV3U2VjdGlvblVSTCIsInNlY3Rpb25zIiwic2VjdGlvbnNMaW5rcyIsImVkaXQiLCJzZXRBdHRyaWJ1dGVzIiwicmVtb3ZlU2VjdGlvbiIsIm5ld1NlY3Rpb25zIiwiaW5kZXgiLCJkaXNwbGF5U2VjdGlvbnMiLCJpIiwibGFiZWwiLCJ2YWx1ZSIsImFsZXJ0IiwibmV3U2VjdGlvbnNMaW5rcyIsInNhdmUiLCJpc0JsYW5rIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7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Ozs7Ozs7Ozs7QUNBeEQsYUFBYSw2Q0FBNkMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E1RCxhQUFhLHVDQUF1QyxFQUFFLEkiLCJmaWxlIjoiL2xpbmtEcm9wZG93bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi8vZGlzdFwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuIiwiaW1wb3J0IHsgTWVkaWFVcGxvYWQsIFJpY2hUZXh0IH0gZnJvbSBcIkB3b3JkcHJlc3MvYmxvY2stZWRpdG9yXCI7XG5pbXBvcnQgeyBCdXR0b24sIFJhZGlvQ29udHJvbCB9IGZyb20gXCJAd29yZHByZXNzL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IF9fIH0gZnJvbSBcIkB3b3JkcHJlc3MvaTE4blwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSBmcm9tIFwiQHdvcmRwcmVzcy9ibG9ja3NcIjtcblxucmVnaXN0ZXJCbG9ja1R5cGUoJ2plby10aGVtZS9jdXN0b20tbGluay1kcm9wZG93bicsIHtcbiAgICB0aXRsZTogX18oJ0xpbmsgRHJvcGRvd24nLCAnamVvJyksXG4gICAgaWNvbjogJ2VkaXRvci11bCcsXG4gICAgY2F0ZWdvcnk6ICdjb21tb24nLFxuICAgIGtleXdvcmRzOiBbXG4gICAgICAgIF9fKCdsaW5rJywgJ2plbycpLFxuICAgICAgICBfXygnZHJvcGRvd24nLCAnamVvJyksXG5cdF0sXG5cdHN1cHBvcnRzOiB7XG5cdFx0YWxpZ246IFsnbGVmdCcsICdyaWdodCddLFxuXHR9LFxuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgb3B0aW9uOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcblx0XHR9LFxuICAgICAgICBkcm9wZG93blRpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcblx0XHR9LFxuXHRcdG5ld1NlY3Rpb25UaXRsZToge1xuXHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0fSxcblx0XHRuZXdTZWN0aW9uVVJMOiB7XG5cdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHR9LFxuICAgICAgICBzZWN0aW9uczoge1xuICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgfSwgICBcblxuICAgICAgICBzZWN0aW9uc0xpbmtzOiB7XG4gICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBlZGl0KHsgYXR0cmlidXRlcywgc2V0QXR0cmlidXRlc30pIHtcbiAgICAgICAgY29uc3QgeyBkcm9wZG93blRpdGxlID0gXCJcIiwgc2VjdGlvbnMgPSBbXSwgc2VjdGlvbnNMaW5rcyA9IFtdLCBuZXdTZWN0aW9uVGl0bGUgPSAnJywgbmV3U2VjdGlvblVSTCA9ICcnLCBvcHRpb24gPSAncyd9ID0gYXR0cmlidXRlcztcblxuICAgICAgICBzZWN0aW9ucy5mb3JFYWNoKCAoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmKCFzZWN0aW9uc0xpbmtzW2luZGV4XSkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb25zTGlua3NbaW5kZXhdID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlU2VjdGlvbiA9IChyZW1vdmVTZWN0aW9uSW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1NlY3Rpb25zID0gc2VjdGlvbnMuZmlsdGVyKChzZWN0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPSByZW1vdmVTZWN0aW9uSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlY3Rpb25zTGlua3Muc3BsaWNlKHJlbW92ZVNlY3Rpb25JbmRleCwgMSk7XG5cbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgICAgIHNlY3Rpb25zOiBuZXdTZWN0aW9ucyxcbiAgICAgICAgICAgICAgICBzZWN0aW9uc0xpbmtzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkaXNwbGF5U2VjdGlvbnMgPSAoc2VjdGlvbnMpID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICBzZWN0aW9ucy5tYXAoKHNlY3Rpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmljaFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnTmFtZT1cInBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzZWN0aW9uLXVybFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgc2VjdGlvbiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRpbmdDb250cm9scz17IFsgJ2JvbGQnLCAnaXRhbGljJyBdIH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgKCB1cGRhdGVkU2VjdGlvblRpdGxlICkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXR0cmlidXRlcyggeyBzZWN0aW9uczogc2VjdGlvbnMubWFwKCAoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVkU2VjdGlvblRpdGxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIH0gKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSaWNoVGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdOYW1lPVwicFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNlY3Rpb24tdXJsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyBzZWN0aW9uc0xpbmtzW2luZGV4XSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRpbmdDb250cm9scz17IFsgJ2JvbGQnLCAnaXRhbGljJyBdIH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgKCBjb250ZW50ICkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXR0cmlidXRlcyggeyBzZWN0aW9uc0xpbmtzOiBzZWN0aW9uc0xpbmtzLm1hcCggKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSB9IClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVtb3ZlLWl0ZW0nIG9uQ2xpY2s9eygpID0+IHJlbW92ZVNlY3Rpb24oaW5kZXgpfT48c3BhbiBjbGFzcz1cImRhc2hpY29ucyBkYXNoaWNvbnMtdHJhc2hcIj48L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pXG5cdFx0XHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGluay1kcm9wZG93blwiPlxuICAgICAgICAgICAgICAgIDxSYWRpb0NvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJUYXJnZXRcIlxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17IG9wdGlvbiB9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9eyBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGxhYmVsOiAnTmV3IHBhZ2UnLCB2YWx1ZTogJ24nIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGxhYmVsOiAnU2FtZSBwYWdlJywgdmFsdWU6ICdzJyB9LFxuICAgICAgICAgICAgICAgICAgICBdIH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyAob3B0aW9uKSA9PiB7IHNldEF0dHJpYnV0ZXMoIHsgb3B0aW9uOiBvcHRpb24gfSApIH0gfVxuXG4gICAgICAgICAgICAgICAgLz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250cm9sc1wiPlxuXHRcdFx0XHRcdDxSaWNoVGV4dFxuXHRcdFx0XHRcdFx0dGFnTmFtZT1cImgyXCJcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImRyb3Bkb3duLXRpdGxlXCJcblx0XHRcdFx0XHRcdHZhbHVlPXsgZHJvcGRvd25UaXRsZSB9XG5cdFx0XHRcdFx0XHRmb3JtYXR0aW5nQ29udHJvbHM9eyBbICdib2xkJywgJ2l0YWxpYycgXSB9IFxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyAoIGRyb3Bkb3duVGl0bGUgKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoIHsgZHJvcGRvd25UaXRsZSB9IClcblx0XHRcdFx0XHRcdH0gfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9eyBfXyggJ1R5cGUgYSB0aXRsZScsICdqZW8nICkgfSBcblx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDxpIGNsYXNzPVwiYXJyb3ctaWNvbiBmYXMgZmEtYW5nbGUtZG93blwiPjwvaT5cblx0XHRcdFx0PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICB7ZGlzcGxheVNlY3Rpb25zKHNlY3Rpb25zKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImlucHV0c1wiPlxuXHRcdFx0XHRcdDxSaWNoVGV4dFxuXHRcdFx0XHRcdFx0dGFnTmFtZT1cInBcIlxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwidGl0bGUtaW5wdXRcIlxuXHRcdFx0XHRcdFx0dmFsdWU9eyBuZXdTZWN0aW9uVGl0bGUgfVxuXHRcdFx0XHRcdFx0Zm9ybWF0dGluZ0NvbnRyb2xzPXsgWyAnYm9sZCcsICdpdGFsaWMnIF0gfSBcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsgKCBuZXdTZWN0aW9uVGl0bGUgKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoIHsgbmV3U2VjdGlvblRpdGxlIH0gKVxuXHRcdFx0XHRcdFx0fSB9XG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17IF9fKCAnU2VjdGlvbiB0aXRsZScsICdqZW8nICkgfSBcblx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDxSaWNoVGV4dFxuXHRcdFx0XHRcdFx0dGFnTmFtZT1cInBcIlxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwidXJsLWlucHV0XCJcblx0XHRcdFx0XHRcdHZhbHVlPXsgbmV3U2VjdGlvblVSTCB9XG5cdFx0XHRcdFx0XHRmb3JtYXR0aW5nQ29udHJvbHM9eyBbICdib2xkJywgJ2l0YWxpYycgXSB9IFxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyAoIG5ld1NlY3Rpb25VUkwgKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoIHsgbmV3U2VjdGlvblVSTCB9IClcblx0XHRcdFx0XHRcdH0gfVxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9eyBfXyggJ1NlY3Rpb24gVVJMIChyZXF1aXJlcyBIVFRQUyknLCAnamVvJyApIH0gXG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxCdXR0b25cblx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoICFuZXdTZWN0aW9uVVJMIHx8ICFuZXdTZWN0aW9uVGl0bGUgKSB7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KF9fKCdQbGVhc2UsIGZpbGwgYWxsIHRoZSBmaWVsZHMuJywgJ2plbycpKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRsZXQgbmV3U2VjdGlvbnMgPSBbLi4uc2VjdGlvbnMsIG5ld1NlY3Rpb25UaXRsZV07XG5cdFx0XHRcdFx0XHRsZXQgbmV3U2VjdGlvbnNMaW5rcyA9IFsuLi5zZWN0aW9uc0xpbmtzLCBuZXdTZWN0aW9uVVJMXTtcblx0XHRcdFx0XHRcdHNldEF0dHJpYnV0ZXMoe1xuXHRcdFx0XHRcdFx0XHRzZWN0aW9uczogbmV3U2VjdGlvbnMsXG5cdFx0XHRcdFx0XHRcdHNlY3Rpb25zTGlua3M6IG5ld1NlY3Rpb25zTGlua3MsXG5cdFx0XHRcdFx0XHRcdG5ld1NlY3Rpb25UaXRsZTogJycsXG5cdFx0XHRcdFx0XHRcdG5ld1NlY3Rpb25VUkw6ICcnLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRpc1NlY29uZGFyeVxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0e19fKCdBZGQgbmV3IHNlY3Rpb24nLCAnamVvJyl9XG5cdFx0XHRcdDwvQnV0dG9uPlxuXG5cdFx0XHQ8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgc2F2ZTogKHsgYXR0cmlidXRlcyB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgZHJvcGRvd25UaXRsZSA9IFwiXCIsIHNlY3Rpb25zID0gW10sIHNlY3Rpb25zTGlua3MgPSBbXSwgb3B0aW9uPVwic1wifSA9IGF0dHJpYnV0ZXM7XG4gICAgICAgIGNvbnN0IGlzQmxhbmsgPSBvcHRpb24gPT09IFwiblwiO1xuICAgICAgICBjb25zdCBkaXNwbGF5U2VjdGlvbnMgPSAoc2VjdGlvbnMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgc2VjdGlvbnMubWFwKChzZWN0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPXtzZWN0aW9uc0xpbmtzW2luZGV4XX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9e2lzQmxhbmsgJiYgJ19ibGFuayd9IC8vIEluaXRpYWwgdGVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbD17aXNCbGFuayAmJiAnbm9vcGVuZXIgbm9yZWZlcnJlcid9ICAvLyBBZGQgdGhpcyB0byBmaXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWN0aW9uc1tpbmRleF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGluay1kcm9wZG93blwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRyb2xzIHNhdmVkLWJsb2NrXCI+XG5cdFx0XHRcdFx0PFJpY2hUZXh0LkNvbnRlbnQgY2xhc3NOYW1lPVwiZHJvcGRvd24tdGl0bGVcIiB0YWdOYW1lPVwiaDJcIiB2YWx1ZT17IGRyb3Bkb3duVGl0bGUgfSAvPlxuXHRcdFx0XHRcdDxpIGNsYXNzPVwiYXJyb3ctaWNvbiBmYXMgZmEtYW5nbGUtZG93blwiPjwvaT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvbnMgc2F2ZWQtYmxvY2tcIj5cblx0XHRcdFx0XHR7ZGlzcGxheVNlY3Rpb25zKHNlY3Rpb25zKX1cblx0XHRcdFx0PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblx0XHQpO1xuICAgIH0sXG59KTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wid3BcIl1bXCJibG9ja0VkaXRvclwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wid3BcIl1bXCJibG9ja3NcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIndwXCJdW1wiY29tcG9uZW50c1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wid3BcIl1bXCJpMThuXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=