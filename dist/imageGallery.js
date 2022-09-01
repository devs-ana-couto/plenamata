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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascript/blocks/imageGallery/index.js":
/*!********************************************************!*\
  !*** ./assets/javascript/blocks/imageGallery/index.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_sortable_hoc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-sortable-hoc */ "./node_modules/react-sortable-hoc/dist/react-sortable-hoc.esm.js");
/* harmony import */ var array_move__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! array-move */ "./node_modules/array-move/index.js");
/* harmony import */ var array_move__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(array_move__WEBPACK_IMPORTED_MODULE_3__);
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





var DraggableImage = Object(react_sortable_hoc__WEBPACK_IMPORTED_MODULE_2__["SortableElement"])(function (_ref) {
  var credits = _ref.credits,
      description = _ref.description,
      image = _ref.image,
      removeImage = _ref.removeImage,
      setDescription = _ref.setDescription,
      setCredits = _ref.setCredits;
  return /*#__PURE__*/React.createElement("div", {
    className: "gallery-item-container"
  }, /*#__PURE__*/React.createElement("img", {
    className: "gallery-item",
    src: image.url,
    key: image.id
  }), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"], {
    tagName: "span",
    className: "description-field",
    value: description,
    allowedFormats: ['core/bold', 'core/italic'],
    onChange: setDescription,
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Type here your description', 'jeo')
  }), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"], {
    tagName: "span",
    className: "credit-field",
    value: credits,
    allowedFormats: ['core/bold', 'core/italic'],
    onChange: setCredits,
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Type the credits here', 'jeo')
  }), /*#__PURE__*/React.createElement("div", {
    className: "remove-item",
    onClick: removeImage
  }, /*#__PURE__*/React.createElement("span", {
    "class": "dashicons dashicons-trash"
  })));
});
var ImageGallery = Object(react_sortable_hoc__WEBPACK_IMPORTED_MODULE_2__["SortableContainer"])(function (_ref2) {
  var images = _ref2.images,
      imagesCredits = _ref2.imagesCredits,
      imagesDescriptions = _ref2.imagesDescriptions,
      setAttributes = _ref2.setAttributes;

  var removeImage = function removeImage(index) {
    return function () {
      var newImages = images.filter(function (image, i) {
        if (i != index) {
          return image;
        }
      });
      imagesDescriptions.splice(index, 1);
      imagesCredits.splice(index, 1);
      setAttributes({
        images: newImages,
        imagesDescriptions: imagesDescriptions,
        imagesCredits: imagesCredits
      });
    };
  };

  var updateItem = function updateItem(key, collection, index) {
    return function (content) {
      setAttributes(_defineProperty({}, key, collection.map(function (item, i) {
        if (i == index) {
          return content;
        } else {
          return item;
        }
      })));
    };
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "gallery-grid"
  }, images.map(function (image, index) {
    return /*#__PURE__*/React.createElement(DraggableImage, {
      collection: images,
      credits: imagesCredits[index],
      description: imagesDescriptions[index],
      image: image,
      index: index,
      key: image.id,
      removeImage: removeImage(index),
      setCredits: updateItem('imagesCredits', imagesCredits, index),
      setDescription: updateItem('imagesDescriptions', imagesDescriptions, index)
    });
  }), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["MediaUpload"], {
    onSelect: function onSelect(media) {
      setAttributes({
        images: [].concat(_toConsumableArray(images), _toConsumableArray(media))
      });
    },
    type: "image",
    multiple: true,
    value: images,
    render: function render(_ref3) {
      var open = _ref3.open;
      return /*#__PURE__*/React.createElement("div", {
        className: "select-images-button is-button is-default is-large",
        onClick: open
      }, /*#__PURE__*/React.createElement("span", {
        "class": "dashicons dashicons-plus"
      }));
    }
  }));
});
wp.blocks.registerBlockType('jeo-theme/custom-image-gallery-block', {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Image Gallery', 'jeo'),
  icon: 'format-gallery',
  category: 'media',
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('materialtheme', 'jeo'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('photos', 'jeo'), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('images', 'jeo')],
  attributes: {
    galleryTitle: {
      type: 'string'
    },
    images: {
      type: 'array'
    },
    imagesDescriptions: {
      type: 'array'
    },
    imagesCredits: {
      type: 'array'
    }
  },
  edit: function edit(_ref4) {
    var attributes = _ref4.attributes,
        className = _ref4.className,
        setAttributes = _ref4.setAttributes;
    var _attributes$galleryTi = attributes.galleryTitle,
        galleryTitle = _attributes$galleryTi === void 0 ? "" : _attributes$galleryTi,
        _attributes$images = attributes.images,
        images = _attributes$images === void 0 ? [] : _attributes$images,
        _attributes$imagesDes = attributes.imagesDescriptions,
        imagesDescriptions = _attributes$imagesDes === void 0 ? [] : _attributes$imagesDes,
        _attributes$imagesCre = attributes.imagesCredits,
        imagesCredits = _attributes$imagesCre === void 0 ? [] : _attributes$imagesCre;
    images.forEach(function (image, index) {
      if (!imagesDescriptions[index] && imagesDescriptions[index] != '') {
        imagesDescriptions[index] = image.description;
      }

      if (!imagesCredits[index] && imagesCredits[index] != '') {
        imagesCredits[index] = image.caption;
      }
    });

    var onSortEnd = function onSortEnd(_ref5) {
      var newIndex = _ref5.newIndex,
          oldIndex = _ref5.oldIndex;
      setAttributes({
        images: array_move__WEBPACK_IMPORTED_MODULE_3___default()(images, oldIndex, newIndex),
        imagesCredits: array_move__WEBPACK_IMPORTED_MODULE_3___default()(imagesCredits, oldIndex, newIndex),
        imagesDescriptions: array_move__WEBPACK_IMPORTED_MODULE_3___default()(imagesDescriptions, oldIndex, newIndex)
      });
    };

    if (imagesCredits != attributes.imagesCredits) {
      setAttributes(_objectSpread(_objectSpread({}, attributes), {}, {
        imagesCredits: imagesCredits
      }));
    }

    if (imagesDescriptions != attributes.imagesDescriptions) {
      setAttributes(_objectSpread(_objectSpread({}, attributes), {}, {
        imagesDescriptions: imagesDescriptions
      }));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "image-gallery"
    }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"], {
      tagName: "h2",
      className: "gallery-title",
      value: galleryTitle,
      formattingControls: ['bold', 'italic'],
      onChange: function onChange(galleryTitle) {
        setAttributes({
          galleryTitle: galleryTitle
        });
      },
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Type a title', 'jeo')
    }), /*#__PURE__*/React.createElement(ImageGallery, {
      axis: "xy",
      helperClass: "moving",
      helperContainer: document.querySelector('.gallery-grid'),
      images: images,
      imagesCredits: imagesCredits,
      imagesDescriptions: imagesDescriptions,
      onSortEnd: onSortEnd,
      pressDelay: 200,
      setAttributes: setAttributes
    }));
  },
  save: function save(_ref6) {
    var attributes = _ref6.attributes;
    var _attributes$galleryTi2 = attributes.galleryTitle,
        galleryTitle = _attributes$galleryTi2 === void 0 ? "" : _attributes$galleryTi2,
        _attributes$images2 = attributes.images,
        images = _attributes$images2 === void 0 ? [] : _attributes$images2,
        _attributes$imagesDes2 = attributes.imagesDescriptions,
        imagesDescriptions = _attributes$imagesDes2 === void 0 ? [] : _attributes$imagesDes2,
        _attributes$imagesCre2 = attributes.imagesCredits,
        imagesCredits = _attributes$imagesCre2 === void 0 ? [] : _attributes$imagesCre2;

    var displayImages = function displayImages(images) {
      return images.map(function (image, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "gallery-item-container"
        }, /*#__PURE__*/React.createElement("div", {
          className: "gallery-item-wrap"
        }, /*#__PURE__*/React.createElement("img", {
          className: "gallery-item",
          key: images.id,
          src: image.url,
          alt: image.alt
        })), /*#__PURE__*/React.createElement("div", {
          "class": "image-meta"
        }, /*#__PURE__*/React.createElement("div", {
          "class": "image-description"
        }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"].Content, {
          tagName: "span",
          value: imagesDescriptions[index]
        })), /*#__PURE__*/React.createElement("div", {
          "class": "image-credit"
        }, /*#__PURE__*/React.createElement("i", {
          "class": "fas fa-camera"
        }), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"].Content, {
          tagName: "span",
          value: imagesCredits[index]
        }), "\\")));
      });
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "image-gallery"
    }, /*#__PURE__*/React.createElement("div", {
      className: "image-gallery-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "gallery-title"
    }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["RichText"].Content, {
      tagName: "h2",
      value: galleryTitle
    })), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement("button", {
      action: "display-grid"
    }, /*#__PURE__*/React.createElement("i", {
      "class": "fas fa-th"
    })), /*#__PURE__*/React.createElement("button", {
      action: "fullsreen"
    }, /*#__PURE__*/React.createElement("i", {
      "class": "fas fa-expand"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "gallery-grid",
      "data-total-slides": images.length
    }, displayImages(images))));
  }
});

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arrayLikeToArray; });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arrayWithHoles; });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arrayWithoutHoles; });
/* harmony import */ var _arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _createClass; });
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

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
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

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _getPrototypeOf; });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inherits; });
/* harmony import */ var _setPrototypeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object(_setPrototypeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _iterableToArray; });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _iterableToArrayLimit; });
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _nonIterableRest; });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _nonIterableSpread; });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectSpread.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectSpread.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _objectSpread; });
/* harmony import */ var _defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      Object(_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]);
    });
  }

  return target;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _possibleConstructorReturn; });
/* harmony import */ var _helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && (Object(_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  }

  return Object(_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _setPrototypeOf; });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _slicedToArray; });
/* harmony import */ var _arrayWithHoles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return Object(_arrayWithHoles__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || Object(_iterableToArrayLimit__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || Object(_unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || Object(_nonIterableRest__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _toConsumableArray; });
/* harmony import */ var _arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return Object(_arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || Object(_iterableToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || Object(_unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || Object(_nonIterableSpread__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _typeof; });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _unsupportedIterableToArray; });
/* harmony import */ var _arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ }),

/***/ "./node_modules/array-move/index.js":
/*!******************************************!*\
  !*** ./node_modules/array-move/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const arrayMoveMutate = (array, from, to) => {
	const startIndex = from < 0 ? array.length + from : from;

	if (startIndex >= 0 && startIndex < array.length) {
		const endIndex = to < 0 ? array.length + to : to;

		const [item] = array.splice(from, 1);
		array.splice(endIndex, 0, item);
	}
};

const arrayMove = (array, from, to) => {
	array = [...array];
	arrayMoveMutate(array, from, to);
	return array;
};

module.exports = arrayMove;
module.exports.mutate = arrayMoveMutate;


/***/ }),

/***/ "./node_modules/invariant/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/invariant/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react-sortable-hoc/dist/react-sortable-hoc.esm.js":
/*!************************************************************************!*\
  !*** ./node_modules/react-sortable-hoc/dist/react-sortable-hoc.esm.js ***!
  \************************************************************************/
/*! exports provided: SortableContainer, sortableContainer, SortableElement, sortableElement, SortableHandle, sortableHandle, arrayMove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortableContainer", function() { return sortableContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortableContainer", function() { return sortableContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortableElement", function() { return sortableElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortableElement", function() { return sortableElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortableHandle", function() { return sortableHandle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortableHandle", function() { return sortableHandle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayMove", function() { return arrayMove; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread */ "./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
















var Manager = function () {
  function Manager() {
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Manager);

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(this, "refs", {});
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(Manager, [{
    key: "add",
    value: function add(collection, ref) {
      if (!this.refs[collection]) {
        this.refs[collection] = [];
      }

      this.refs[collection].push(ref);
    }
  }, {
    key: "remove",
    value: function remove(collection, ref) {
      var index = this.getIndex(collection, ref);

      if (index !== -1) {
        this.refs[collection].splice(index, 1);
      }
    }
  }, {
    key: "isActive",
    value: function isActive() {
      return this.active;
    }
  }, {
    key: "getActive",
    value: function getActive() {
      var _this = this;

      return this.refs[this.active.collection].find(function (_ref) {
        var node = _ref.node;
        return node.sortableInfo.index == _this.active.index;
      });
    }
  }, {
    key: "getIndex",
    value: function getIndex(collection, ref) {
      return this.refs[collection].indexOf(ref);
    }
  }, {
    key: "getOrderedRefs",
    value: function getOrderedRefs() {
      var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.active.collection;
      return this.refs[collection].sort(sortByIndex);
    }
  }]);

  return Manager;
}();

function sortByIndex(_ref2, _ref3) {
  var index1 = _ref2.node.sortableInfo.index;
  var index2 = _ref3.node.sortableInfo.index;
  return index1 - index2;
}

function arrayMove(array, from, to) {
  if (true) {
    if (typeof console !== 'undefined') {
      console.warn("Deprecation warning: arrayMove will no longer be exported by 'react-sortable-hoc' in the next major release. Please install the `array-move` package locally instead. https://www.npmjs.com/package/array-move");
    }
  }

  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}
function omit(obj, keysToOmit) {
  return Object.keys(obj).reduce(function (acc, key) {
    if (keysToOmit.indexOf(key) === -1) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}
var events = {
  end: ['touchend', 'touchcancel', 'mouseup'],
  move: ['touchmove', 'mousemove'],
  start: ['touchstart', 'mousedown']
};
var vendorPrefix = function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return '';
  }

  var styles = window.getComputedStyle(document.documentElement, '') || ['-moz-hidden-iframe'];
  var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];

  switch (pre) {
    case 'ms':
      return 'ms';

    default:
      return pre && pre.length ? pre[0].toUpperCase() + pre.substr(1) : '';
  }
}();
function setInlineStyles(node, styles) {
  Object.keys(styles).forEach(function (key) {
    node.style[key] = styles[key];
  });
}
function setTranslate3d(node, translate) {
  node.style["".concat(vendorPrefix, "Transform")] = translate == null ? '' : "translate3d(".concat(translate.x, "px,").concat(translate.y, "px,0)");
}
function setTransitionDuration(node, duration) {
  node.style["".concat(vendorPrefix, "TransitionDuration")] = duration == null ? '' : "".concat(duration, "ms");
}
function closest(el, fn) {
  while (el) {
    if (fn(el)) {
      return el;
    }

    el = el.parentNode;
  }

  return null;
}
function limit(min, max, value) {
  return Math.max(min, Math.min(value, max));
}

function getPixelValue(stringValue) {
  if (stringValue.substr(-2) === 'px') {
    return parseFloat(stringValue);
  }

  return 0;
}

function getElementMargin(element) {
  var style = window.getComputedStyle(element);
  return {
    bottom: getPixelValue(style.marginBottom),
    left: getPixelValue(style.marginLeft),
    right: getPixelValue(style.marginRight),
    top: getPixelValue(style.marginTop)
  };
}
function provideDisplayName(prefix, Component$$1) {
  var componentName = Component$$1.displayName || Component$$1.name;
  return componentName ? "".concat(prefix, "(").concat(componentName, ")") : prefix;
}
function getScrollAdjustedBoundingClientRect(node, scrollDelta) {
  var boundingClientRect = node.getBoundingClientRect();
  return {
    top: boundingClientRect.top + scrollDelta.top,
    left: boundingClientRect.left + scrollDelta.left
  };
}
function getPosition(event) {
  if (event.touches && event.touches.length) {
    return {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY
    };
  } else if (event.changedTouches && event.changedTouches.length) {
    return {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY
    };
  } else {
    return {
      x: event.pageX,
      y: event.pageY
    };
  }
}
function isTouchEvent(event) {
  return event.touches && event.touches.length || event.changedTouches && event.changedTouches.length;
}
function getEdgeOffset(node, parent) {
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    left: 0,
    top: 0
  };

  if (!node) {
    return undefined;
  }

  var nodeOffset = {
    left: offset.left + node.offsetLeft,
    top: offset.top + node.offsetTop
  };

  if (node.parentNode === parent) {
    return nodeOffset;
  }

  return getEdgeOffset(node.parentNode, parent, nodeOffset);
}
function getTargetIndex(newIndex, prevIndex, oldIndex) {
  if (newIndex < oldIndex && newIndex > prevIndex) {
    return newIndex - 1;
  } else if (newIndex > oldIndex && newIndex < prevIndex) {
    return newIndex + 1;
  } else {
    return newIndex;
  }
}
function getLockPixelOffset(_ref) {
  var lockOffset = _ref.lockOffset,
      width = _ref.width,
      height = _ref.height;
  var offsetX = lockOffset;
  var offsetY = lockOffset;
  var unit = 'px';

  if (typeof lockOffset === 'string') {
    var match = /^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(lockOffset);
    invariant__WEBPACK_IMPORTED_MODULE_13___default()(match !== null, 'lockOffset value should be a number or a string of a ' + 'number followed by "px" or "%". Given %s', lockOffset);
    offsetX = parseFloat(lockOffset);
    offsetY = parseFloat(lockOffset);
    unit = match[1];
  }

  invariant__WEBPACK_IMPORTED_MODULE_13___default()(isFinite(offsetX) && isFinite(offsetY), 'lockOffset value should be a finite. Given %s', lockOffset);

  if (unit === '%') {
    offsetX = offsetX * width / 100;
    offsetY = offsetY * height / 100;
  }

  return {
    x: offsetX,
    y: offsetY
  };
}
function getLockPixelOffsets(_ref2) {
  var height = _ref2.height,
      width = _ref2.width,
      lockOffset = _ref2.lockOffset;
  var offsets = Array.isArray(lockOffset) ? lockOffset : [lockOffset, lockOffset];
  invariant__WEBPACK_IMPORTED_MODULE_13___default()(offsets.length === 2, 'lockOffset prop of SortableContainer should be a single ' + 'value or an array of exactly two values. Given %s', lockOffset);

  var _offsets = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(offsets, 2),
      minLockOffset = _offsets[0],
      maxLockOffset = _offsets[1];

  return [getLockPixelOffset({
    height: height,
    lockOffset: minLockOffset,
    width: width
  }), getLockPixelOffset({
    height: height,
    lockOffset: maxLockOffset,
    width: width
  })];
}

function isScrollable(el) {
  var computedStyle = window.getComputedStyle(el);
  var overflowRegex = /(auto|scroll)/;
  var properties = ['overflow', 'overflowX', 'overflowY'];
  return properties.find(function (property) {
    return overflowRegex.test(computedStyle[property]);
  });
}

function getScrollingParent(el) {
  if (!(el instanceof HTMLElement)) {
    return null;
  } else if (isScrollable(el)) {
    return el;
  } else {
    return getScrollingParent(el.parentNode);
  }
}
function getContainerGridGap(element) {
  var style = window.getComputedStyle(element);

  if (style.display === 'grid') {
    return {
      x: getPixelValue(style.gridColumnGap),
      y: getPixelValue(style.gridRowGap)
    };
  }

  return {
    x: 0,
    y: 0
  };
}
var KEYCODE = {
  TAB: 9,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};
var NodeType = {
  Anchor: 'A',
  Button: 'BUTTON',
  Canvas: 'CANVAS',
  Input: 'INPUT',
  Option: 'OPTION',
  Textarea: 'TEXTAREA',
  Select: 'SELECT'
};
function cloneNode(node) {
  var selector = 'input, textarea, select, canvas, [contenteditable]';
  var fields = node.querySelectorAll(selector);
  var clonedNode = node.cloneNode(true);

  var clonedFields = Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_14__["default"])(clonedNode.querySelectorAll(selector));

  clonedFields.forEach(function (field, i) {
    if (field.type !== 'file') {
      field.value = fields[i].value;
    }

    if (field.type === 'radio' && field.name) {
      field.name = "__sortableClone__".concat(field.name);
    }

    if (field.tagName === NodeType.Canvas && fields[i].width > 0 && fields[i].height > 0) {
      var destCtx = field.getContext('2d');
      destCtx.drawImage(fields[i], 0, 0);
    }
  });
  return clonedNode;
}

function sortableHandle(WrappedComponent) {
  var _class, _temp;

  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    withRef: false
  };
  return _temp = _class = function (_React$Component) {
    Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(WithSortableHandle, _React$Component);

    function WithSortableHandle() {
      Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, WithSortableHandle);

      return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(WithSortableHandle).apply(this, arguments));
    }

    Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(WithSortableHandle, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var node = Object(react_dom__WEBPACK_IMPORTED_MODULE_12__["findDOMNode"])(this);
        node.sortableHandle = true;
      }
    }, {
      key: "getWrappedInstance",
      value: function getWrappedInstance() {
        invariant__WEBPACK_IMPORTED_MODULE_13___default()(config.withRef, 'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableHandle() call');
        return this.refs.wrappedInstance;
      }
    }, {
      key: "render",
      value: function render() {
        var ref = config.withRef ? 'wrappedInstance' : null;
        return Object(react__WEBPACK_IMPORTED_MODULE_10__["createElement"])(WrappedComponent, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          ref: ref
        }, this.props));
      }
    }]);

    return WithSortableHandle;
  }(react__WEBPACK_IMPORTED_MODULE_10__["Component"]), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "displayName", provideDisplayName('sortableHandle', WrappedComponent)), _temp;
}
function isSortableHandle(node) {
  return node.sortableHandle != null;
}

var AutoScroller = function () {
  function AutoScroller(container, onScrollCallback) {
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, AutoScroller);

    this.container = container;
    this.onScrollCallback = onScrollCallback;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(AutoScroller, [{
    key: "clear",
    value: function clear() {
      if (this.interval == null) {
        return;
      }

      clearInterval(this.interval);
      this.interval = null;
    }
  }, {
    key: "update",
    value: function update(_ref) {
      var _this = this;

      var translate = _ref.translate,
          minTranslate = _ref.minTranslate,
          maxTranslate = _ref.maxTranslate,
          width = _ref.width,
          height = _ref.height;
      var direction = {
        x: 0,
        y: 0
      };
      var speed = {
        x: 1,
        y: 1
      };
      var acceleration = {
        x: 10,
        y: 10
      };
      var _this$container = this.container,
          scrollTop = _this$container.scrollTop,
          scrollLeft = _this$container.scrollLeft,
          scrollHeight = _this$container.scrollHeight,
          scrollWidth = _this$container.scrollWidth,
          clientHeight = _this$container.clientHeight,
          clientWidth = _this$container.clientWidth;
      var isTop = scrollTop === 0;
      var isBottom = scrollHeight - scrollTop - clientHeight === 0;
      var isLeft = scrollLeft === 0;
      var isRight = scrollWidth - scrollLeft - clientWidth === 0;

      if (translate.y >= maxTranslate.y - height / 2 && !isBottom) {
        direction.y = 1;
        speed.y = acceleration.y * Math.abs((maxTranslate.y - height / 2 - translate.y) / height);
      } else if (translate.x >= maxTranslate.x - width / 2 && !isRight) {
        direction.x = 1;
        speed.x = acceleration.x * Math.abs((maxTranslate.x - width / 2 - translate.x) / width);
      } else if (translate.y <= minTranslate.y + height / 2 && !isTop) {
        direction.y = -1;
        speed.y = acceleration.y * Math.abs((translate.y - height / 2 - minTranslate.y) / height);
      } else if (translate.x <= minTranslate.x + width / 2 && !isLeft) {
        direction.x = -1;
        speed.x = acceleration.x * Math.abs((translate.x - width / 2 - minTranslate.x) / width);
      }

      if (this.interval) {
        this.clear();
        this.isAutoScrolling = false;
      }

      if (direction.x !== 0 || direction.y !== 0) {
        this.interval = setInterval(function () {
          _this.isAutoScrolling = true;
          var offset = {
            left: speed.x * direction.x,
            top: speed.y * direction.y
          };
          _this.container.scrollTop += offset.top;
          _this.container.scrollLeft += offset.left;

          _this.onScrollCallback(offset);
        }, 5);
      }
    }
  }]);

  return AutoScroller;
}();

function defaultGetHelperDimensions(_ref) {
  var node = _ref.node;
  return {
    height: node.offsetHeight,
    width: node.offsetWidth
  };
}

function defaultShouldCancelStart(event) {
  var interactiveElements = [NodeType.Input, NodeType.Textarea, NodeType.Select, NodeType.Option, NodeType.Button];

  if (interactiveElements.indexOf(event.target.tagName) !== -1) {
    return true;
  }

  if (closest(event.target, function (el) {
    return el.contentEditable === 'true';
  })) {
    return true;
  }

  return false;
}

var propTypes = {
  axis: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.oneOf(['x', 'y', 'xy']),
  contentWindow: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.any,
  disableAutoscroll: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool,
  distance: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number,
  getContainer: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func,
  getHelperDimensions: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func,
  helperClass: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,
  helperContainer: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func, typeof HTMLElement === 'undefined' ? prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.any : prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.instanceOf(HTMLElement)]),
  hideSortableGhost: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool,
  keyboardSortingTransitionDuration: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number,
  lockAxis: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,
  lockOffset: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string]))]),
  lockToContainerEdges: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool,
  onSortEnd: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func,
  onSortMove: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func,
  onSortOver: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func,
  onSortStart: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func,
  pressDelay: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number,
  pressThreshold: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number,
  keyCodes: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.shape({
    lift: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number),
    drop: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number),
    cancel: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number),
    up: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number),
    down: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number)
  }),
  shouldCancelStart: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func,
  transitionDuration: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number,
  updateBeforeSortStart: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func,
  useDragHandle: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool,
  useWindowAsScrollContainer: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool
};
var defaultKeyCodes = {
  lift: [KEYCODE.SPACE],
  drop: [KEYCODE.SPACE],
  cancel: [KEYCODE.ESC],
  up: [KEYCODE.UP, KEYCODE.LEFT],
  down: [KEYCODE.DOWN, KEYCODE.RIGHT]
};
var defaultProps = {
  axis: 'y',
  disableAutoscroll: false,
  distance: 0,
  getHelperDimensions: defaultGetHelperDimensions,
  hideSortableGhost: true,
  lockOffset: '50%',
  lockToContainerEdges: false,
  pressDelay: 0,
  pressThreshold: 5,
  keyCodes: defaultKeyCodes,
  shouldCancelStart: defaultShouldCancelStart,
  transitionDuration: 300,
  useWindowAsScrollContainer: false
};
var omittedProps = Object.keys(propTypes);
function validateProps(props) {
  invariant__WEBPACK_IMPORTED_MODULE_13___default()(!(props.distance && props.pressDelay), 'Attempted to set both `pressDelay` and `distance` on SortableContainer, you may only use one or the other, not both at the same time.');
}

function _finallyRethrows(body, finalizer) {
  try {
    var result = body();
  } catch (e) {
    return finalizer(true, e);
  }

  if (result && result.then) {
    return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
  }

  return finalizer(false, value);
}
function sortableContainer(WrappedComponent) {
  var _class, _temp;

  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    withRef: false
  };
  return _temp = _class = function (_React$Component) {
    Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(WithSortableContainer, _React$Component);

    function WithSortableContainer(props) {
      var _this;

      Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, WithSortableContainer);

      _this = Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(WithSortableContainer).call(this, props));

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "state", {});

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleStart", function (event) {
        var _this$props = _this.props,
            distance = _this$props.distance,
            shouldCancelStart = _this$props.shouldCancelStart;

        if (event.button === 2 || shouldCancelStart(event)) {
          return;
        }

        _this.touched = true;
        _this.position = getPosition(event);
        var node = closest(event.target, function (el) {
          return el.sortableInfo != null;
        });

        if (node && node.sortableInfo && _this.nodeIsChild(node) && !_this.state.sorting) {
          var useDragHandle = _this.props.useDragHandle;
          var _node$sortableInfo = node.sortableInfo,
              index = _node$sortableInfo.index,
              collection = _node$sortableInfo.collection,
              disabled = _node$sortableInfo.disabled;

          if (disabled) {
            return;
          }

          if (useDragHandle && !closest(event.target, isSortableHandle)) {
            return;
          }

          _this.manager.active = {
            collection: collection,
            index: index
          };

          if (!isTouchEvent(event) && event.target.tagName === NodeType.Anchor) {
            event.preventDefault();
          }

          if (!distance) {
            if (_this.props.pressDelay === 0) {
              _this.handlePress(event);
            } else {
              _this.pressTimer = setTimeout(function () {
                return _this.handlePress(event);
              }, _this.props.pressDelay);
            }
          }
        }
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "nodeIsChild", function (node) {
        return node.sortableInfo.manager === _this.manager;
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleMove", function (event) {
        var _this$props2 = _this.props,
            distance = _this$props2.distance,
            pressThreshold = _this$props2.pressThreshold;

        if (!_this.state.sorting && _this.touched && !_this._awaitingUpdateBeforeSortStart) {
          var position = getPosition(event);
          var delta = {
            x: _this.position.x - position.x,
            y: _this.position.y - position.y
          };
          var combinedDelta = Math.abs(delta.x) + Math.abs(delta.y);
          _this.delta = delta;

          if (!distance && (!pressThreshold || combinedDelta >= pressThreshold)) {
            clearTimeout(_this.cancelTimer);
            _this.cancelTimer = setTimeout(_this.cancel, 0);
          } else if (distance && combinedDelta >= distance && _this.manager.isActive()) {
            _this.handlePress(event);
          }
        }
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleEnd", function () {
        _this.touched = false;

        _this.cancel();
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "cancel", function () {
        var distance = _this.props.distance;
        var sorting = _this.state.sorting;

        if (!sorting) {
          if (!distance) {
            clearTimeout(_this.pressTimer);
          }

          _this.manager.active = null;
        }
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handlePress", function (event) {
        try {
          var active = _this.manager.getActive();

          var _temp6 = function () {
            if (active) {
              var _temp7 = function _temp7() {
                var index = _node.sortableInfo.index;
                var margin = getElementMargin(_node);
                var gridGap = getContainerGridGap(_this.container);

                var containerBoundingRect = _this.scrollContainer.getBoundingClientRect();

                var dimensions = _getHelperDimensions({
                  index: index,
                  node: _node,
                  collection: _collection
                });

                _this.node = _node;
                _this.margin = margin;
                _this.gridGap = gridGap;
                _this.width = dimensions.width;
                _this.height = dimensions.height;
                _this.marginOffset = {
                  x: _this.margin.left + _this.margin.right + _this.gridGap.x,
                  y: Math.max(_this.margin.top, _this.margin.bottom, _this.gridGap.y)
                };
                _this.boundingClientRect = _node.getBoundingClientRect();
                _this.containerBoundingRect = containerBoundingRect;
                _this.index = index;
                _this.newIndex = index;
                _this.axis = {
                  x: _axis.indexOf('x') >= 0,
                  y: _axis.indexOf('y') >= 0
                };
                _this.offsetEdge = getEdgeOffset(_node, _this.container);

                if (_isKeySorting) {
                  _this.initialOffset = getPosition(Object(_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, event, {
                    pageX: _this.boundingClientRect.left,
                    pageY: _this.boundingClientRect.top
                  }));
                } else {
                  _this.initialOffset = getPosition(event);
                }

                _this.initialScroll = {
                  left: _this.scrollContainer.scrollLeft,
                  top: _this.scrollContainer.scrollTop
                };
                _this.initialWindowScroll = {
                  left: window.pageXOffset,
                  top: window.pageYOffset
                };
                _this.helper = _this.helperContainer.appendChild(cloneNode(_node));
                setInlineStyles(_this.helper, {
                  boxSizing: 'border-box',
                  height: "".concat(_this.height, "px"),
                  left: "".concat(_this.boundingClientRect.left - margin.left, "px"),
                  pointerEvents: 'none',
                  position: 'fixed',
                  top: "".concat(_this.boundingClientRect.top - margin.top, "px"),
                  width: "".concat(_this.width, "px")
                });

                if (_isKeySorting) {
                  _this.helper.focus();
                }

                if (_hideSortableGhost) {
                  _this.sortableGhost = _node;
                  setInlineStyles(_node, {
                    opacity: 0,
                    visibility: 'hidden'
                  });
                }

                _this.minTranslate = {};
                _this.maxTranslate = {};

                if (_isKeySorting) {
                  var _ref = _useWindowAsScrollContainer ? {
                    top: 0,
                    left: 0,
                    width: _this.contentWindow.innerWidth,
                    height: _this.contentWindow.innerHeight
                  } : _this.containerBoundingRect,
                      containerTop = _ref.top,
                      containerLeft = _ref.left,
                      containerWidth = _ref.width,
                      containerHeight = _ref.height;

                  var containerBottom = containerTop + containerHeight;
                  var containerRight = containerLeft + containerWidth;

                  if (_this.axis.x) {
                    _this.minTranslate.x = containerLeft - _this.boundingClientRect.left;
                    _this.maxTranslate.x = containerRight - (_this.boundingClientRect.left + _this.width);
                  }

                  if (_this.axis.y) {
                    _this.minTranslate.y = containerTop - _this.boundingClientRect.top;
                    _this.maxTranslate.y = containerBottom - (_this.boundingClientRect.top + _this.height);
                  }
                } else {
                  if (_this.axis.x) {
                    _this.minTranslate.x = (_useWindowAsScrollContainer ? 0 : containerBoundingRect.left) - _this.boundingClientRect.left - _this.width / 2;
                    _this.maxTranslate.x = (_useWindowAsScrollContainer ? _this.contentWindow.innerWidth : containerBoundingRect.left + containerBoundingRect.width) - _this.boundingClientRect.left - _this.width / 2;
                  }

                  if (_this.axis.y) {
                    _this.minTranslate.y = (_useWindowAsScrollContainer ? 0 : containerBoundingRect.top) - _this.boundingClientRect.top - _this.height / 2;
                    _this.maxTranslate.y = (_useWindowAsScrollContainer ? _this.contentWindow.innerHeight : containerBoundingRect.top + containerBoundingRect.height) - _this.boundingClientRect.top - _this.height / 2;
                  }
                }

                if (_helperClass) {
                  _helperClass.split(' ').forEach(function (className) {
                    return _this.helper.classList.add(className);
                  });
                }

                _this.listenerNode = event.touches ? _node : _this.contentWindow;

                if (_isKeySorting) {
                  _this.listenerNode.addEventListener('wheel', _this.handleKeyEnd, true);

                  _this.listenerNode.addEventListener('mousedown', _this.handleKeyEnd, true);

                  _this.listenerNode.addEventListener('keydown', _this.handleKeyDown);
                } else {
                  events.move.forEach(function (eventName) {
                    return _this.listenerNode.addEventListener(eventName, _this.handleSortMove, false);
                  });
                  events.end.forEach(function (eventName) {
                    return _this.listenerNode.addEventListener(eventName, _this.handleSortEnd, false);
                  });
                }

                _this.setState({
                  sorting: true,
                  sortingIndex: index
                });

                if (_onSortStart) {
                  _onSortStart({
                    node: _node,
                    index: index,
                    collection: _collection,
                    isKeySorting: _isKeySorting,
                    nodes: _this.manager.getOrderedRefs(),
                    helper: _this.helper
                  }, event);
                }

                if (_isKeySorting) {
                  _this.keyMove(0);
                }
              };

              var _this$props3 = _this.props,
                  _axis = _this$props3.axis,
                  _getHelperDimensions = _this$props3.getHelperDimensions,
                  _helperClass = _this$props3.helperClass,
                  _hideSortableGhost = _this$props3.hideSortableGhost,
                  updateBeforeSortStart = _this$props3.updateBeforeSortStart,
                  _onSortStart = _this$props3.onSortStart,
                  _useWindowAsScrollContainer = _this$props3.useWindowAsScrollContainer;
              var _node = active.node,
                  _collection = active.collection;
              var _isKeySorting = _this.manager.isKeySorting;

              var _temp8 = function () {
                if (typeof updateBeforeSortStart === 'function') {
                  _this._awaitingUpdateBeforeSortStart = true;

                  var _temp9 = _finallyRethrows(function () {
                    var index = _node.sortableInfo.index;
                    return Promise.resolve(updateBeforeSortStart({
                      collection: _collection,
                      index: index,
                      node: _node,
                      isKeySorting: _isKeySorting
                    }, event)).then(function () {});
                  }, function (_wasThrown, _result) {
                    _this._awaitingUpdateBeforeSortStart = false;
                    if (_wasThrown) throw _result;
                    return _result;
                  });

                  if (_temp9 && _temp9.then) return _temp9.then(function () {});
                }
              }();

              return _temp8 && _temp8.then ? _temp8.then(_temp7) : _temp7(_temp8);
            }
          }();

          return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function () {}) : void 0);
        } catch (e) {
          return Promise.reject(e);
        }
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleSortMove", function (event) {
        var onSortMove = _this.props.onSortMove;

        if (typeof event.preventDefault === 'function') {
          event.preventDefault();
        }

        _this.updateHelperPosition(event);

        _this.animateNodes();

        _this.autoscroll();

        if (onSortMove) {
          onSortMove(event);
        }
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleSortEnd", function (event) {
        var _this$props4 = _this.props,
            hideSortableGhost = _this$props4.hideSortableGhost,
            onSortEnd = _this$props4.onSortEnd;
        var _this$manager = _this.manager,
            collection = _this$manager.active.collection,
            isKeySorting = _this$manager.isKeySorting;

        var nodes = _this.manager.getOrderedRefs();

        if (_this.listenerNode) {
          if (isKeySorting) {
            _this.listenerNode.removeEventListener('wheel', _this.handleKeyEnd, true);

            _this.listenerNode.removeEventListener('mousedown', _this.handleKeyEnd, true);

            _this.listenerNode.removeEventListener('keydown', _this.handleKeyDown);
          } else {
            events.move.forEach(function (eventName) {
              return _this.listenerNode.removeEventListener(eventName, _this.handleSortMove);
            });
            events.end.forEach(function (eventName) {
              return _this.listenerNode.removeEventListener(eventName, _this.handleSortEnd);
            });
          }
        }

        _this.helper.parentNode.removeChild(_this.helper);

        if (hideSortableGhost && _this.sortableGhost) {
          setInlineStyles(_this.sortableGhost, {
            opacity: '',
            visibility: ''
          });
        }

        for (var i = 0, len = nodes.length; i < len; i++) {
          var _node2 = nodes[i];
          var el = _node2.node;
          _node2.edgeOffset = null;
          _node2.boundingClientRect = null;
          setTranslate3d(el, null);
          setTransitionDuration(el, null);
          _node2.translate = null;
        }

        _this.autoScroller.clear();

        _this.manager.active = null;
        _this.manager.isKeySorting = false;

        _this.setState({
          sorting: false,
          sortingIndex: null
        });

        if (typeof onSortEnd === 'function') {
          onSortEnd({
            collection: collection,
            newIndex: _this.newIndex,
            oldIndex: _this.index,
            isKeySorting: isKeySorting,
            nodes: nodes
          }, event);
        }

        _this.touched = false;
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "autoscroll", function () {
        var disableAutoscroll = _this.props.disableAutoscroll;
        var isKeySorting = _this.manager.isKeySorting;

        if (disableAutoscroll) {
          _this.autoScroller.clear();

          return;
        }

        if (isKeySorting) {
          var translate = Object(_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, _this.translate);

          var scrollX = 0;
          var scrollY = 0;

          if (_this.axis.x) {
            translate.x = Math.min(_this.maxTranslate.x, Math.max(_this.minTranslate.x, _this.translate.x));
            scrollX = _this.translate.x - translate.x;
          }

          if (_this.axis.y) {
            translate.y = Math.min(_this.maxTranslate.y, Math.max(_this.minTranslate.y, _this.translate.y));
            scrollY = _this.translate.y - translate.y;
          }

          _this.translate = translate;
          setTranslate3d(_this.helper, _this.translate);
          _this.scrollContainer.scrollLeft += scrollX;
          _this.scrollContainer.scrollTop += scrollY;
          return;
        }

        _this.autoScroller.update({
          height: _this.height,
          maxTranslate: _this.maxTranslate,
          minTranslate: _this.minTranslate,
          translate: _this.translate,
          width: _this.width
        });
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "onAutoScroll", function (offset) {
        _this.translate.x += offset.left;
        _this.translate.y += offset.top;

        _this.animateNodes();
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleKeyDown", function (event) {
        var keyCode = event.keyCode;
        var _this$props5 = _this.props,
            shouldCancelStart = _this$props5.shouldCancelStart,
            _this$props5$keyCodes = _this$props5.keyCodes,
            customKeyCodes = _this$props5$keyCodes === void 0 ? {} : _this$props5$keyCodes;

        var keyCodes = Object(_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, defaultKeyCodes, customKeyCodes);

        if (_this.manager.active && !_this.manager.isKeySorting || !_this.manager.active && (!keyCodes.lift.includes(keyCode) || shouldCancelStart(event) || !_this.isValidSortingTarget(event))) {
          return;
        }

        event.stopPropagation();
        event.preventDefault();

        if (keyCodes.lift.includes(keyCode) && !_this.manager.active) {
          _this.keyLift(event);
        } else if (keyCodes.drop.includes(keyCode) && _this.manager.active) {
          _this.keyDrop(event);
        } else if (keyCodes.cancel.includes(keyCode)) {
          _this.newIndex = _this.manager.active.index;

          _this.keyDrop(event);
        } else if (keyCodes.up.includes(keyCode)) {
          _this.keyMove(-1);
        } else if (keyCodes.down.includes(keyCode)) {
          _this.keyMove(1);
        }
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "keyLift", function (event) {
        var target = event.target;
        var node = closest(target, function (el) {
          return el.sortableInfo != null;
        });
        var _node$sortableInfo2 = node.sortableInfo,
            index = _node$sortableInfo2.index,
            collection = _node$sortableInfo2.collection;
        _this.initialFocusedNode = target;
        _this.manager.isKeySorting = true;
        _this.manager.active = {
          index: index,
          collection: collection
        };

        _this.handlePress(event);
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "keyMove", function (shift) {
        var nodes = _this.manager.getOrderedRefs();

        var lastIndex = nodes[nodes.length - 1].node.sortableInfo.index;
        var newIndex = _this.newIndex + shift;
        var prevIndex = _this.newIndex;

        if (newIndex < 0 || newIndex > lastIndex) {
          return;
        }

        _this.prevIndex = prevIndex;
        _this.newIndex = newIndex;
        var targetIndex = getTargetIndex(_this.newIndex, _this.prevIndex, _this.index);
        var target = nodes.find(function (_ref2) {
          var node = _ref2.node;
          return node.sortableInfo.index === targetIndex;
        });
        var targetNode = target.node;
        var scrollDelta = _this.containerScrollDelta;
        var targetBoundingClientRect = target.boundingClientRect || getScrollAdjustedBoundingClientRect(targetNode, scrollDelta);
        var targetTranslate = target.translate || {
          x: 0,
          y: 0
        };
        var targetPosition = {
          top: targetBoundingClientRect.top + targetTranslate.y - scrollDelta.top,
          left: targetBoundingClientRect.left + targetTranslate.x - scrollDelta.left
        };
        var shouldAdjustForSize = prevIndex < newIndex;
        var sizeAdjustment = {
          x: shouldAdjustForSize && _this.axis.x ? targetNode.offsetWidth - _this.width : 0,
          y: shouldAdjustForSize && _this.axis.y ? targetNode.offsetHeight - _this.height : 0
        };

        _this.handleSortMove({
          pageX: targetPosition.left + sizeAdjustment.x,
          pageY: targetPosition.top + sizeAdjustment.y,
          ignoreTransition: shift === 0
        });
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "keyDrop", function (event) {
        _this.handleSortEnd(event);

        if (_this.initialFocusedNode) {
          _this.initialFocusedNode.focus();
        }
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "handleKeyEnd", function (event) {
        if (_this.manager.active) {
          _this.keyDrop(event);
        }
      });

      Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__["default"])(_this)), "isValidSortingTarget", function (event) {
        var useDragHandle = _this.props.useDragHandle;
        var target = event.target;
        var node = closest(target, function (el) {
          return el.sortableInfo != null;
        });
        return node && node.sortableInfo && !node.sortableInfo.disabled && (useDragHandle ? isSortableHandle(target) : target.sortableInfo);
      });

      validateProps(props);
      _this.manager = new Manager();
      _this.events = {
        end: _this.handleEnd,
        move: _this.handleMove,
        start: _this.handleStart
      };
      return _this;
    }

    Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(WithSortableContainer, [{
      key: "getChildContext",
      value: function getChildContext() {
        return {
          manager: this.manager
        };
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var useWindowAsScrollContainer = this.props.useWindowAsScrollContainer;
        var container = this.getContainer();
        Promise.resolve(container).then(function (containerNode) {
          _this2.container = containerNode;
          _this2.document = _this2.container.ownerDocument || document;
          var contentWindow = _this2.props.contentWindow || _this2.document.defaultView || window;
          _this2.contentWindow = typeof contentWindow === 'function' ? contentWindow() : contentWindow;
          _this2.scrollContainer = useWindowAsScrollContainer ? _this2.document.scrollingElement || _this2.document.documentElement : getScrollingParent(_this2.container) || _this2.container;
          _this2.autoScroller = new AutoScroller(_this2.scrollContainer, _this2.onAutoScroll);
          Object.keys(_this2.events).forEach(function (key) {
            return events[key].forEach(function (eventName) {
              return _this2.container.addEventListener(eventName, _this2.events[key], false);
            });
          });

          _this2.container.addEventListener('keydown', _this2.handleKeyDown);
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this3 = this;

        if (this.helper && this.helper.parentNode) {
          this.helper.parentNode.removeChild(this.helper);
        }

        if (!this.container) {
          return;
        }

        Object.keys(this.events).forEach(function (key) {
          return events[key].forEach(function (eventName) {
            return _this3.container.removeEventListener(eventName, _this3.events[key]);
          });
        });
        this.container.removeEventListener('keydown', this.handleKeyDown);
      }
    }, {
      key: "updateHelperPosition",
      value: function updateHelperPosition(event) {
        var _this$props6 = this.props,
            lockAxis = _this$props6.lockAxis,
            lockOffset = _this$props6.lockOffset,
            lockToContainerEdges = _this$props6.lockToContainerEdges,
            transitionDuration = _this$props6.transitionDuration,
            _this$props6$keyboard = _this$props6.keyboardSortingTransitionDuration,
            keyboardSortingTransitionDuration = _this$props6$keyboard === void 0 ? transitionDuration : _this$props6$keyboard;
        var isKeySorting = this.manager.isKeySorting;
        var ignoreTransition = event.ignoreTransition;
        var offset = getPosition(event);
        var translate = {
          x: offset.x - this.initialOffset.x,
          y: offset.y - this.initialOffset.y
        };
        translate.y -= window.pageYOffset - this.initialWindowScroll.top;
        translate.x -= window.pageXOffset - this.initialWindowScroll.left;
        this.translate = translate;

        if (lockToContainerEdges) {
          var _getLockPixelOffsets = getLockPixelOffsets({
            height: this.height,
            lockOffset: lockOffset,
            width: this.width
          }),
              _getLockPixelOffsets2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_getLockPixelOffsets, 2),
              minLockOffset = _getLockPixelOffsets2[0],
              maxLockOffset = _getLockPixelOffsets2[1];

          var minOffset = {
            x: this.width / 2 - minLockOffset.x,
            y: this.height / 2 - minLockOffset.y
          };
          var maxOffset = {
            x: this.width / 2 - maxLockOffset.x,
            y: this.height / 2 - maxLockOffset.y
          };
          translate.x = limit(this.minTranslate.x + minOffset.x, this.maxTranslate.x - maxOffset.x, translate.x);
          translate.y = limit(this.minTranslate.y + minOffset.y, this.maxTranslate.y - maxOffset.y, translate.y);
        }

        if (lockAxis === 'x') {
          translate.y = 0;
        } else if (lockAxis === 'y') {
          translate.x = 0;
        }

        if (isKeySorting && keyboardSortingTransitionDuration && !ignoreTransition) {
          setTransitionDuration(this.helper, keyboardSortingTransitionDuration);
        }

        setTranslate3d(this.helper, translate);
      }
    }, {
      key: "animateNodes",
      value: function animateNodes() {
        var _this$props7 = this.props,
            transitionDuration = _this$props7.transitionDuration,
            hideSortableGhost = _this$props7.hideSortableGhost,
            onSortOver = _this$props7.onSortOver;
        var containerScrollDelta = this.containerScrollDelta,
            windowScrollDelta = this.windowScrollDelta;
        var nodes = this.manager.getOrderedRefs();
        var sortingOffset = {
          left: this.offsetEdge.left + this.translate.x + containerScrollDelta.left,
          top: this.offsetEdge.top + this.translate.y + containerScrollDelta.top
        };
        var isKeySorting = this.manager.isKeySorting;
        var prevIndex = this.newIndex;
        this.newIndex = null;

        for (var i = 0, len = nodes.length; i < len; i++) {
          var _node3 = nodes[i].node;
          var index = _node3.sortableInfo.index;
          var width = _node3.offsetWidth;
          var height = _node3.offsetHeight;
          var offset = {
            height: this.height > height ? height / 2 : this.height / 2,
            width: this.width > width ? width / 2 : this.width / 2
          };
          var mustShiftBackward = isKeySorting && index > this.index && index <= prevIndex;
          var mustShiftForward = isKeySorting && index < this.index && index >= prevIndex;
          var translate = {
            x: 0,
            y: 0
          };
          var edgeOffset = nodes[i].edgeOffset;

          if (!edgeOffset) {
            edgeOffset = getEdgeOffset(_node3, this.container);
            nodes[i].edgeOffset = edgeOffset;

            if (isKeySorting) {
              nodes[i].boundingClientRect = getScrollAdjustedBoundingClientRect(_node3, containerScrollDelta);
            }
          }

          var nextNode = i < nodes.length - 1 && nodes[i + 1];
          var prevNode = i > 0 && nodes[i - 1];

          if (nextNode && !nextNode.edgeOffset) {
            nextNode.edgeOffset = getEdgeOffset(nextNode.node, this.container);

            if (isKeySorting) {
              nextNode.boundingClientRect = getScrollAdjustedBoundingClientRect(nextNode.node, containerScrollDelta);
            }
          }

          if (index === this.index) {
            if (hideSortableGhost) {
              this.sortableGhost = _node3;
              setInlineStyles(_node3, {
                opacity: 0,
                visibility: 'hidden'
              });
            }

            continue;
          }

          if (transitionDuration) {
            setTransitionDuration(_node3, transitionDuration);
          }

          if (this.axis.x) {
            if (this.axis.y) {
              if (mustShiftForward || index < this.index && (sortingOffset.left + windowScrollDelta.left - offset.width <= edgeOffset.left && sortingOffset.top + windowScrollDelta.top <= edgeOffset.top + offset.height || sortingOffset.top + windowScrollDelta.top + offset.height <= edgeOffset.top)) {
                translate.x = this.width + this.marginOffset.x;

                if (edgeOffset.left + translate.x > this.containerBoundingRect.width - offset.width) {
                  if (nextNode) {
                    translate.x = nextNode.edgeOffset.left - edgeOffset.left;
                    translate.y = nextNode.edgeOffset.top - edgeOffset.top;
                  }
                }

                if (this.newIndex === null) {
                  this.newIndex = index;
                }
              } else if (mustShiftBackward || index > this.index && (sortingOffset.left + windowScrollDelta.left + offset.width >= edgeOffset.left && sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top || sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top + height)) {
                translate.x = -(this.width + this.marginOffset.x);

                if (edgeOffset.left + translate.x < this.containerBoundingRect.left + offset.width) {
                  if (prevNode) {
                    translate.x = prevNode.edgeOffset.left - edgeOffset.left;
                    translate.y = prevNode.edgeOffset.top - edgeOffset.top;
                  }
                }

                this.newIndex = index;
              }
            } else {
              if (mustShiftBackward || index > this.index && sortingOffset.left + windowScrollDelta.left + offset.width >= edgeOffset.left) {
                translate.x = -(this.width + this.marginOffset.x);
                this.newIndex = index;
              } else if (mustShiftForward || index < this.index && sortingOffset.left + windowScrollDelta.left <= edgeOffset.left + offset.width) {
                translate.x = this.width + this.marginOffset.x;

                if (this.newIndex == null) {
                  this.newIndex = index;
                }
              }
            }
          } else if (this.axis.y) {
            if (mustShiftBackward || index > this.index && sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top) {
              translate.y = -(this.height + this.marginOffset.y);
              this.newIndex = index;
            } else if (mustShiftForward || index < this.index && sortingOffset.top + windowScrollDelta.top <= edgeOffset.top + offset.height) {
              translate.y = this.height + this.marginOffset.y;

              if (this.newIndex == null) {
                this.newIndex = index;
              }
            }
          }

          setTranslate3d(_node3, translate);
          nodes[i].translate = translate;
        }

        if (this.newIndex == null) {
          this.newIndex = this.index;
        }

        if (isKeySorting) {
          this.newIndex = prevIndex;
        }

        var oldIndex = isKeySorting ? this.prevIndex : prevIndex;

        if (onSortOver && this.newIndex !== oldIndex) {
          onSortOver({
            collection: this.manager.active.collection,
            index: this.index,
            newIndex: this.newIndex,
            oldIndex: oldIndex,
            isKeySorting: isKeySorting,
            nodes: nodes,
            helper: this.helper
          });
        }
      }
    }, {
      key: "getWrappedInstance",
      value: function getWrappedInstance() {
        invariant__WEBPACK_IMPORTED_MODULE_13___default()(config.withRef, 'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableContainer() call');
        return this.refs.wrappedInstance;
      }
    }, {
      key: "getContainer",
      value: function getContainer() {
        var getContainer = this.props.getContainer;

        if (typeof getContainer !== 'function') {
          return Object(react_dom__WEBPACK_IMPORTED_MODULE_12__["findDOMNode"])(this);
        }

        return getContainer(config.withRef ? this.getWrappedInstance() : undefined);
      }
    }, {
      key: "render",
      value: function render() {
        var ref = config.withRef ? 'wrappedInstance' : null;
        return Object(react__WEBPACK_IMPORTED_MODULE_10__["createElement"])(WrappedComponent, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          ref: ref
        }, omit(this.props, omittedProps)));
      }
    }, {
      key: "helperContainer",
      get: function get() {
        var helperContainer = this.props.helperContainer;

        if (typeof helperContainer === 'function') {
          return helperContainer();
        }

        return this.props.helperContainer || this.document.body;
      }
    }, {
      key: "containerScrollDelta",
      get: function get() {
        var useWindowAsScrollContainer = this.props.useWindowAsScrollContainer;

        if (useWindowAsScrollContainer) {
          return {
            left: 0,
            top: 0
          };
        }

        return {
          left: this.scrollContainer.scrollLeft - this.initialScroll.left,
          top: this.scrollContainer.scrollTop - this.initialScroll.top
        };
      }
    }, {
      key: "windowScrollDelta",
      get: function get() {
        return {
          left: this.contentWindow.pageXOffset - this.initialWindowScroll.left,
          top: this.contentWindow.pageYOffset - this.initialWindowScroll.top
        };
      }
    }]);

    return WithSortableContainer;
  }(react__WEBPACK_IMPORTED_MODULE_10__["Component"]), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "displayName", provideDisplayName('sortableList', WrappedComponent)), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "defaultProps", defaultProps), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "propTypes", propTypes), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "childContextTypes", {
    manager: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.object.isRequired
  }), _temp;
}

var propTypes$1 = {
  index: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number.isRequired,
  collection: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string]),
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool
};
var omittedProps$1 = Object.keys(propTypes$1);
function sortableElement(WrappedComponent) {
  var _class, _temp;

  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    withRef: false
  };
  return _temp = _class = function (_React$Component) {
    Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(WithSortableElement, _React$Component);

    function WithSortableElement() {
      Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, WithSortableElement);

      return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(WithSortableElement).apply(this, arguments));
    }

    Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(WithSortableElement, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.register();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.node) {
          if (prevProps.index !== this.props.index) {
            this.node.sortableInfo.index = this.props.index;
          }

          if (prevProps.disabled !== this.props.disabled) {
            this.node.sortableInfo.disabled = this.props.disabled;
          }
        }

        if (prevProps.collection !== this.props.collection) {
          this.unregister(prevProps.collection);
          this.register();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unregister();
      }
    }, {
      key: "register",
      value: function register() {
        var _this$props = this.props,
            collection = _this$props.collection,
            disabled = _this$props.disabled,
            index = _this$props.index;
        var node = Object(react_dom__WEBPACK_IMPORTED_MODULE_12__["findDOMNode"])(this);
        node.sortableInfo = {
          collection: collection,
          disabled: disabled,
          index: index,
          manager: this.context.manager
        };
        this.node = node;
        this.ref = {
          node: node
        };
        this.context.manager.add(collection, this.ref);
      }
    }, {
      key: "unregister",
      value: function unregister() {
        var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.collection;
        this.context.manager.remove(collection, this.ref);
      }
    }, {
      key: "getWrappedInstance",
      value: function getWrappedInstance() {
        invariant__WEBPACK_IMPORTED_MODULE_13___default()(config.withRef, 'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableElement() call');
        return this.refs.wrappedInstance;
      }
    }, {
      key: "render",
      value: function render() {
        var ref = config.withRef ? 'wrappedInstance' : null;
        return Object(react__WEBPACK_IMPORTED_MODULE_10__["createElement"])(WrappedComponent, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          ref: ref
        }, omit(this.props, omittedProps$1)));
      }
    }]);

    return WithSortableElement;
  }(react__WEBPACK_IMPORTED_MODULE_10__["Component"]), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "displayName", provideDisplayName('sortableElement', WrappedComponent)), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "contextTypes", {
    manager: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.object.isRequired
  }), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "propTypes", propTypes$1), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(_class, "defaultProps", {
    collection: 0
  }), _temp;
}




/***/ }),

/***/ 7:
/*!**************************************************************!*\
  !*** multi ./assets/javascript/blocks/imageGallery/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/html/plenamata/code/wp-content/themes/jeo-theme/assets/javascript/blocks/imageGallery/index.js */"./assets/javascript/blocks/imageGallery/index.js");


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blockEditor"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["React"]; }());

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["ReactDOM"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2phdmFzY3JpcHQvYmxvY2tzL2ltYWdlR2FsbGVyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2dldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0U3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FycmF5LW1vdmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ludmFyaWFudC9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc29ydGFibGUtaG9jL2Rpc3QvcmVhY3Qtc29ydGFibGUtaG9jLmVzbS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgW1wid3BcIixcImJsb2NrRWRpdG9yXCJdIiwid2VicGFjazovLy9leHRlcm5hbCBbXCJ3cFwiLFwiaTE4blwiXSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCIiXSwibmFtZXMiOlsiRHJhZ2dhYmxlSW1hZ2UiLCJTb3J0YWJsZUVsZW1lbnQiLCJjcmVkaXRzIiwiZGVzY3JpcHRpb24iLCJpbWFnZSIsInJlbW92ZUltYWdlIiwic2V0RGVzY3JpcHRpb24iLCJzZXRDcmVkaXRzIiwiaWQiLCJfXyIsIkltYWdlR2FsbGVyeSIsIlNvcnRhYmxlQ29udGFpbmVyIiwiaW1hZ2VzIiwiaW1hZ2VzQ3JlZGl0cyIsImltYWdlc0Rlc2NyaXB0aW9ucyIsInNldEF0dHJpYnV0ZXMiLCJuZXdJbWFnZXMiLCJpIiwidXBkYXRlSXRlbSIsIm9wZW4iLCJ3cCIsInRpdGxlIiwiaWNvbiIsImNhdGVnb3J5Iiwia2V5d29yZHMiLCJhdHRyaWJ1dGVzIiwiZ2FsbGVyeVRpdGxlIiwidHlwZSIsImVkaXQiLCJjbGFzc05hbWUiLCJvblNvcnRFbmQiLCJuZXdJbmRleCIsIm9sZEluZGV4IiwiYXJyYXlNb3ZlIiwiZG9jdW1lbnQiLCJzYXZlIiwiZGlzcGxheUltYWdlcyIsImFsdCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsY0FBYyxHQUFHQywwRUFBZSxDQUFDLGdCQUE4RTtBQUFBLE1BQTNFQyxPQUEyRSxRQUEzRUEsT0FBMkU7QUFBQSxNQUFsRUMsV0FBa0UsUUFBbEVBLFdBQWtFO0FBQUEsTUFBckRDLEtBQXFELFFBQXJEQSxLQUFxRDtBQUFBLE1BQTlDQyxXQUE4QyxRQUE5Q0EsV0FBOEM7QUFBQSxNQUFqQ0MsY0FBaUMsUUFBakNBLGNBQWlDO0FBQUEsTUFBakJDLFVBQWlCLFFBQWpCQSxVQUFpQjtBQUNqSCxzQkFDSTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNJO0FBQUssYUFBUyxFQUFkO0FBQThCLE9BQUcsRUFBRUgsS0FBSyxDQUF4QztBQUE4QyxPQUFHLEVBQUVBLEtBQUssQ0FBQ0k7QUFBekQsSUFESixlQUVJO0FBQ0ksV0FBTyxFQURYO0FBRUksYUFBUyxFQUZiO0FBR0ksU0FBSyxFQUhUO0FBSUksa0JBQWMsRUFBRSxjQUpwQixhQUlvQixDQUpwQjtBQUtJLFlBQVEsRUFMWjtBQU1JLGVBQVcsRUFBRUMsMERBQUU7QUFObkIsSUFGSixlQVVJO0FBQ0ksV0FBTyxFQURYO0FBRUksYUFBUyxFQUZiO0FBR0ksU0FBSyxFQUhUO0FBSUksa0JBQWMsRUFBRSxjQUpwQixhQUlvQixDQUpwQjtBQUtJLFlBQVEsRUFMWjtBQU1JLGVBQVcsRUFBRUEsMERBQUU7QUFObkIsSUFWSixlQWtCSTtBQUFLLGFBQVMsRUFBZDtBQUE2QixXQUFPLEVBQUVKO0FBQXRDLGtCQUFtRDtBQUFNLGFBQU07QUFBWixJQUFuRCxDQWxCSixDQURKO0FBREosQ0FBc0MsQ0FBdEM7QUF5QkEsSUFBTUssWUFBWSxHQUFHQyw0RUFBaUIsQ0FBQyxpQkFBa0U7QUFBQSxNQUEvREMsTUFBK0QsU0FBL0RBLE1BQStEO0FBQUEsTUFBdkRDLGFBQXVELFNBQXZEQSxhQUF1RDtBQUFBLE1BQXhDQyxrQkFBd0MsU0FBeENBLGtCQUF3QztBQUFBLE1BQXBCQyxhQUFvQixTQUFwQkEsYUFBb0I7O0FBQ3JHLE1BQU1WLFdBQVcsR0FBRyxTQUFkQSxXQUFjLFFBQVc7QUFDM0IsV0FBTyxZQUFNO0FBQ1QsVUFBTVcsU0FBUyxHQUFHLE1BQU0sQ0FBTixPQUFjLG9CQUFjO0FBQzFDLFlBQUlDLENBQUMsSUFBTCxPQUFnQjtBQUNaO0FBQ0g7QUFITCxPQUFrQixDQUFsQjtBQU1BSCx3QkFBa0IsQ0FBbEJBO0FBQ0FELG1CQUFhLENBQWJBO0FBRUFFLG1CQUFhLENBQUM7QUFDVkgsY0FBTSxFQURJO0FBRVZFLDBCQUFrQixFQUZSO0FBR1ZELHFCQUFhLEVBQWJBO0FBSFUsT0FBRCxDQUFiRTtBQVZKO0FBREo7O0FBbUJBLE1BQU1HLFVBQVUsR0FBRyxTQUFiQSxVQUFhLHlCQUE0QjtBQUMzQyxXQUFPLG1CQUFhO0FBQ2hCSCxtQkFBYSwwQkFDRixVQUFVLENBQVYsSUFBZSxtQkFBYTtBQUMvQixZQUFJRSxDQUFDLElBQUwsT0FBZ0I7QUFDWjtBQURKLGVBRU87QUFDSDtBQUNIO0FBTlRGLE9BQ1csQ0FERSxFQUFiQTtBQURKO0FBREo7O0FBY0Esc0JBQ0k7QUFBSyxhQUFTLEVBQUM7QUFBZixLQUNLLE1BQU0sQ0FBTixJQUFXLHdCQUFrQjtBQUMxQix3QkFDSTtBQUNJLGdCQUFVLEVBRGQ7QUFFSSxhQUFPLEVBQUVGLGFBQWEsQ0FGMUIsS0FFMEIsQ0FGMUI7QUFHSSxpQkFBVyxFQUFFQyxrQkFBa0IsQ0FIbkMsS0FHbUMsQ0FIbkM7QUFJSSxXQUFLLEVBSlQ7QUFLSSxXQUFLLEVBTFQ7QUFNSSxTQUFHLEVBQUVWLEtBQUssQ0FOZDtBQU9JLGlCQUFXLEVBQUVDLFdBQVcsQ0FQNUIsS0FPNEIsQ0FQNUI7QUFRSSxnQkFBVSxFQUFFYSxVQUFVLGlDQVIxQixLQVEwQixDQVIxQjtBQVNJLG9CQUFjLEVBQUVBLFVBQVU7QUFUOUIsTUFESjtBQUZSLEdBQ0ssQ0FETCxlQWdCSTtBQUNJLFlBQVEsRUFBRSx5QkFBVztBQUFFSCxtQkFBYSxDQUFDO0FBQUVILGNBQU07QUFBUixPQUFELENBQWJHO0FBRDNCO0FBRUksUUFBSSxFQUZSO0FBR0ksWUFBUSxFQUhaO0FBSUksU0FBSyxFQUpUO0FBS0ksVUFBTSxFQUFFO0FBQUEsVUFBR0ksSUFBSDtBQUFBLDBCQUNKO0FBQUssaUJBQVMsRUFBZDtBQUFvRSxlQUFPLEVBQUVBO0FBQTdFLHNCQUNJO0FBQU0saUJBQU07QUFBWixRQURKLENBREk7QUFBQTtBQUxaLElBaEJKLENBREo7QUFsQ0osQ0FBc0MsQ0FBdEM7QUFrRUFDLEVBQUUsQ0FBRkEsaUVBQW9FO0FBQ2hFQyxPQUFLLEVBQUVaLDBEQUFFLGtCQUR1RCxLQUN2RCxDQUR1RDtBQUVoRWEsTUFBSSxFQUY0RDtBQUdoRUMsVUFBUSxFQUh3RDtBQUloRUMsVUFBUSxFQUFFLENBQ05mLDBEQUFFLGtCQURJLEtBQ0osQ0FESSxFQUVOQSwwREFBRSxXQUZJLEtBRUosQ0FGSSxFQUdOQSwwREFBRSxXQVAwRCxLQU8xRCxDQUhJLENBSnNEO0FBU2hFZ0IsWUFBVSxFQUFFO0FBQ1JDLGdCQUFZLEVBQUU7QUFDVkMsVUFBSSxFQUFFO0FBREksS0FETjtBQUtSZixVQUFNLEVBQUU7QUFDSmUsVUFBSSxFQUFFO0FBREYsS0FMQTtBQVNSYixzQkFBa0IsRUFBRTtBQUNoQmEsVUFBSSxFQUFFO0FBRFUsS0FUWjtBQWFSZCxpQkFBYSxFQUFFO0FBQ1hjLFVBQUksRUFBRTtBQURLO0FBYlAsR0FUb0Q7QUEyQmhFQyxNQTNCZ0UsdUJBMkJqQjtBQUFBLFFBQXhDSCxVQUF3QyxTQUF4Q0EsVUFBd0M7QUFBQSxRQUE1QkksU0FBNEIsU0FBNUJBLFNBQTRCO0FBQUEsUUFBakJkLGFBQWlCLFNBQWpCQSxhQUFpQjtBQUFBLGdDQUM2Q1UsVUFEN0M7QUFBQSxRQUNuQ0MsWUFEbUM7QUFBQSw2QkFDNkNELFVBRDdDO0FBQUEsUUFDaEJiLE1BRGdCO0FBQUEsZ0NBQzZDYSxVQUQ3QztBQUFBLFFBQ0hYLGtCQURHO0FBQUEsZ0NBQzZDVyxVQUQ3QztBQUFBLFFBQ3NCWixhQUR0QjtBQUczQ0QsVUFBTSxDQUFOQSxRQUFlLHdCQUFrQjtBQUM3QixVQUFLLENBQUVFLGtCQUFrQixDQUFwQixLQUFvQixDQUFwQixJQUErQkEsa0JBQWtCLENBQWxCQSxLQUFrQixDQUFsQkEsSUFBcEMsSUFBc0U7QUFDbEVBLDBCQUFrQixDQUFsQkEsS0FBa0IsQ0FBbEJBLEdBQTRCVixLQUFLLENBQWpDVTtBQUNIOztBQUVELFVBQUssQ0FBRUQsYUFBYSxDQUFmLEtBQWUsQ0FBZixJQUEwQkEsYUFBYSxDQUFiQSxLQUFhLENBQWJBLElBQS9CLElBQTJEO0FBQ3ZEQSxxQkFBYSxDQUFiQSxLQUFhLENBQWJBLEdBQXVCVCxLQUFLLENBQTVCUztBQUNIO0FBUExEOztBQVVBLFFBQU1rQixTQUFTLEdBQUcsU0FBWkEsU0FBWSxRQUE0QjtBQUFBLFVBQXpCQyxRQUF5QixTQUF6QkEsUUFBeUI7QUFBQSxVQUFmQyxRQUFlLFNBQWZBLFFBQWU7QUFDMUNqQixtQkFBYSxDQUFDO0FBQ1ZILGNBQU0sRUFBRXFCLGlEQUFTLG1CQURQLFFBQ08sQ0FEUDtBQUVWcEIscUJBQWEsRUFBRW9CLGlEQUFTLDBCQUZkLFFBRWMsQ0FGZDtBQUdWbkIsMEJBQWtCLEVBQUVtQixpREFBUztBQUhuQixPQUFELENBQWJsQjtBQURKOztBQVFBLFFBQUtGLGFBQWEsSUFBSVksVUFBVSxDQUFoQyxlQUFpRDtBQUM3Q1YsbUJBQWE7QUFBbUJGLHFCQUFhLEVBQWJBO0FBQW5CLFNBQWJFO0FBQ0g7O0FBRUQsUUFBS0Qsa0JBQWtCLElBQUlXLFVBQVUsQ0FBckMsb0JBQTJEO0FBQ3ZEVixtQkFBYTtBQUFtQkQsMEJBQWtCLEVBQWxCQTtBQUFuQixTQUFiQztBQUNIOztBQUVELHdCQUNJO0FBQUssZUFBUyxFQUFDO0FBQWYsb0JBQ0k7QUFDSSxhQUFPLEVBRFg7QUFFSSxlQUFTLEVBRmI7QUFHSSxXQUFLLEVBSFQ7QUFJSSx3QkFBa0IsRUFBRSxTQUp4QixRQUl3QixDQUp4QjtBQUtJLGNBQVEsRUFBRSxnQ0FBa0I7QUFBQ0EscUJBQWEsQ0FBQztBQUFFVyxzQkFBWSxFQUFaQTtBQUFGLFNBQUQsQ0FBYlg7QUFMakM7QUFNSSxpQkFBVyxFQUFFTiwwREFBRTtBQU5uQixNQURKLGVBU0k7QUFDSSxVQUFJLEVBRFI7QUFFSSxpQkFBVyxFQUZmO0FBR0kscUJBQWUsRUFBRXlCLFFBQVEsQ0FBUkEsY0FIckIsZUFHcUJBLENBSHJCO0FBSUksWUFBTSxFQUpWO0FBS0ksbUJBQWEsRUFMakI7QUFNSSx3QkFBa0IsRUFOdEI7QUFPSSxlQUFTLEVBUGI7QUFRSSxnQkFBVSxFQVJkO0FBU0ksbUJBQWEsRUFBRW5CO0FBVG5CLE1BVEosQ0FESjtBQXhENEQ7QUFpRmhFb0IsTUFBSSxFQUFFLHFCQUFvQjtBQUFBLFFBQWpCVixVQUFpQixTQUFqQkEsVUFBaUI7QUFBQSxpQ0FDa0VBLFVBRGxFO0FBQUEsUUFDZEMsWUFEYztBQUFBLDhCQUNrRUQsVUFEbEU7QUFBQSxRQUNLYixNQURMO0FBQUEsaUNBQ2tFYSxVQURsRTtBQUFBLFFBQ2tCWCxrQkFEbEI7QUFBQSxpQ0FDa0VXLFVBRGxFO0FBQUEsUUFDMkNaLGFBRDNDOztBQUd0QixRQUFNdUIsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixTQUFZO0FBQzlCLGFBQ0ksTUFBTSxDQUFOLElBQVcsd0JBQWtCO0FBRXpCLDRCQUNJO0FBQUssbUJBQVMsRUFBQztBQUFmLHdCQUNJO0FBQUssbUJBQVMsRUFBQztBQUFmLHdCQUNJO0FBQ0ksbUJBQVMsRUFEYjtBQUVJLGFBQUcsRUFBRXhCLE1BQU0sQ0FGZjtBQUdJLGFBQUcsRUFBRVIsS0FBSyxDQUhkO0FBSUksYUFBRyxFQUFFQSxLQUFLLENBQUNpQztBQUpmLFVBREosQ0FESixlQVVJO0FBQUssbUJBQU07QUFBWCx3QkFDSTtBQUFLLG1CQUFNO0FBQVgsd0JBQ0ksb0JBQUMsZ0VBQUQ7QUFBa0IsaUJBQU8sRUFBekI7QUFBaUMsZUFBSyxFQUFFdkIsa0JBQWtCO0FBQTFELFVBREosQ0FESixlQUlJO0FBQUssbUJBQU07QUFBWCx3QkFDSTtBQUFHLG1CQUFNO0FBQVQsVUFESixlQUVJLG9CQUFDLGdFQUFEO0FBQWtCLGlCQUFPLEVBQXpCO0FBQWlDLGVBQUssRUFBRUQsYUFBYTtBQUFyRCxVQUZKLEVBZlosSUFlWSxDQUpKLENBVkosQ0FESjtBQUhSLE9BQ0ksQ0FESjtBQURKOztBQStCQSx3QkFDSTtBQUFLLGVBQVMsRUFBQztBQUFmLG9CQUNJO0FBQUssZUFBUyxFQUFDO0FBQWYsb0JBQ0k7QUFBSyxlQUFTLEVBQUM7QUFBZixvQkFDSSxvQkFBQyxnRUFBRDtBQUFrQixhQUFPLEVBQXpCO0FBQStCLFdBQUssRUFBRWE7QUFBdEMsTUFESixDQURKLGVBSUk7QUFBSyxlQUFTLEVBQUM7QUFBZixvQkFDSTtBQUFRLFlBQU0sRUFBQztBQUFmLG9CQUNJO0FBQUcsZUFBTTtBQUFULE1BREosQ0FESixlQUtJO0FBQVEsWUFBTSxFQUFDO0FBQWYsb0JBQ0k7QUFBRyxlQUFNO0FBQVQsTUFESixDQUxKLENBSkosZUFjSTtBQUFLLGVBQVMsRUFBZDtBQUE4QiwyQkFBbUJkLE1BQU0sQ0FBQzBCO0FBQXhELE9BQ0tGLGFBQWEsQ0FqQjlCLE1BaUI4QixDQURsQixDQWRKLENBREosQ0FESjtBQXVCSDtBQTFJK0QsQ0FBcEVoQixFOzs7Ozs7Ozs7Ozs7QUNoR0E7QUFBQTtBQUFlO0FBQ2Y7O0FBRUEsd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTs7QUFFQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBZTtBQUNmO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDRkE7QUFBQTtBQUFBO0FBQWtEO0FBQ25DO0FBQ2YsaUNBQWlDLGlFQUFnQjtBQUNqRCxDOzs7Ozs7Ozs7Ozs7QUNIQTtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNOQTtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNKQTtBQUFBO0FBQUE7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDZEE7QUFBQTtBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDYkE7QUFBQTtBQUFlO0FBQ2Y7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQUE7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDTEE7QUFBQTtBQUFBO0FBQThDO0FBQy9CO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxrQkFBa0IsK0RBQWM7QUFDaEMsQzs7Ozs7Ozs7Ozs7O0FDZEE7QUFBQTtBQUFlO0FBQ2Y7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNGQTtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLCtCQUErQjtBQUM1RTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUN6QkE7QUFBQTtBQUFlO0FBQ2Y7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNGQTtBQUFBO0FBQWU7QUFDZjtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQUE7QUFBQTtBQUE4QztBQUMvQjtBQUNmLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxNQUFNLCtEQUFjO0FBQ3BCLEtBQUs7QUFDTDs7QUFFQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUFBO0FBQUE7QUFBQTtBQUErQztBQUNhO0FBQzdDO0FBQ2YsZUFBZSxtRUFBTztBQUN0QjtBQUNBOztBQUVBLFNBQVMsc0VBQXFCO0FBQzlCLEM7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDUEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThDO0FBQ1k7QUFDWTtBQUN0QjtBQUNqQztBQUNmLFNBQVMsK0RBQWMsU0FBUyxxRUFBb0IsWUFBWSwyRUFBMEIsWUFBWSxnRUFBZTtBQUNySCxDOzs7Ozs7Ozs7Ozs7QUNOQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0Q7QUFDSjtBQUNzQjtBQUNsQjtBQUNyQztBQUNmLFNBQVMsa0VBQWlCLFNBQVMsZ0VBQWUsU0FBUywyRUFBMEIsU0FBUyxrRUFBaUI7QUFDL0csQzs7Ozs7Ozs7Ozs7O0FDTkE7QUFBQTtBQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNkQTtBQUFBO0FBQUE7QUFBa0Q7QUFDbkM7QUFDZjtBQUNBLG9DQUFvQyxpRUFBZ0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0Esc0ZBQXNGLGlFQUFnQjtBQUN0RyxDOzs7Ozs7Ozs7Ozs7QUNSYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU0sSUFBcUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMseUJBQXlCLEVBQUU7QUFDckU7QUFDQTtBQUNBOztBQUVBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLHNCQUFzQjtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0Isb0JBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjs7QUFFQSxJQUFJLElBQXFDO0FBQ3pDLDZCQUE2QixtQkFBTyxDQUFDLHlGQUE0QjtBQUNqRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLE1BQU0sSUFBcUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRHQUE0RztBQUM1RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sSUFBcUM7QUFDM0M7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixjQUFjLG1CQUFPLENBQUMsa0RBQVU7QUFDaEMsYUFBYSxtQkFBTyxDQUFDLDREQUFlOztBQUVwQywyQkFBMkIsbUJBQU8sQ0FBQyx5RkFBNEI7QUFDL0QscUJBQXFCLG1CQUFPLENBQUMscUVBQWtCOztBQUUvQztBQUNBOztBQUVBLElBQUksSUFBcUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsNkJBQTZCO0FBQzdCLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixLQUFLO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsNEJBQTRCO0FBQzVCLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsSUFBcUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxVQUFVLEtBQXFDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsSUFBcUM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEOztBQUVoRDtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7O0FBRWpEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7O0FDcExhOztBQUViLElBQUksS0FBcUMsRUFBRSxFQUUxQztBQUNELG1CQUFtQixtQkFBTyxDQUFDLDBGQUErQjtBQUMxRDs7Ozs7Ozs7Ozs7OztBQ05BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwRDtBQUNZO0FBQ0Y7QUFDSTtBQUNOO0FBQzRCO0FBQ3RCO0FBQ1o7QUFDMEI7QUFDZDtBQUN2QjtBQUNkO0FBQ0s7QUFDTjtBQUM0Qzs7QUFFOUU7QUFDQTtBQUNBLElBQUkseUZBQWU7O0FBRW5CLElBQUkseUZBQWUsaUJBQWlCO0FBQ3BDOztBQUVBLEVBQUUsc0ZBQVk7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLElBQXFDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUcsSUFBSTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksaURBQVM7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLGlEQUFTOztBQUVYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxpREFBUzs7QUFFWCxpQkFBaUIsd0ZBQWM7QUFDL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLDZGQUFrQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLHNGQUFZO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFdBQVc7O0FBRVg7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsc0NBQXNDLHdGQUFjO0FBQ3BEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkNBQTJDLFNBQVM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtB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RCxhQUFhLHVDQUF1QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXRELGFBQWEsa0NBQWtDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBakQsYUFBYSxxQ0FBcUMsRUFBRSxJIiwiZmlsZSI6Ii9pbWFnZUdhbGxlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4vL2Rpc3RcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuIiwiaW1wb3J0IHsgTWVkaWFVcGxvYWQsIFJpY2hUZXh0IH0gZnJvbSBcIkB3b3JkcHJlc3MvYmxvY2stZWRpdG9yXCI7XG5pbXBvcnQgeyBfXyB9IGZyb20gXCJAd29yZHByZXNzL2kxOG5cIjtcbmltcG9ydCB7IFNvcnRhYmxlQ29udGFpbmVyLCBTb3J0YWJsZUVsZW1lbnQgfSBmcm9tICdyZWFjdC1zb3J0YWJsZS1ob2MnO1xuaW1wb3J0IGFycmF5TW92ZSBmcm9tICdhcnJheS1tb3ZlJztcblxuY29uc3QgRHJhZ2dhYmxlSW1hZ2UgPSBTb3J0YWJsZUVsZW1lbnQoKHsgY3JlZGl0cywgZGVzY3JpcHRpb24sIGltYWdlLCByZW1vdmVJbWFnZSwgc2V0RGVzY3JpcHRpb24sIHNldENyZWRpdHMgfSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2FsbGVyeS1pdGVtLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9J2dhbGxlcnktaXRlbScgc3JjPXtpbWFnZS51cmx9IGtleT17aW1hZ2UuaWR9IC8+XG4gICAgICAgICAgICA8UmljaFRleHRcbiAgICAgICAgICAgICAgICB0YWdOYW1lPVwic3BhblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb24tZmllbGRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICBhbGxvd2VkRm9ybWF0cz17Wydjb3JlL2JvbGQnLCAnY29yZS9pdGFsaWMnXX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17c2V0RGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e19fKCdUeXBlIGhlcmUgeW91ciBkZXNjcmlwdGlvbicsICdqZW8nKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8UmljaFRleHRcbiAgICAgICAgICAgICAgICB0YWdOYW1lPVwic3BhblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY3JlZGl0LWZpZWxkXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17Y3JlZGl0c31cbiAgICAgICAgICAgICAgICBhbGxvd2VkRm9ybWF0cz17Wydjb3JlL2JvbGQnLCAnY29yZS9pdGFsaWMnXX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17c2V0Q3JlZGl0c31cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17X18oJ1R5cGUgdGhlIGNyZWRpdHMgaGVyZScsICdqZW8nKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbW92ZS1pdGVtXCIgb25DbGljaz17cmVtb3ZlSW1hZ2V9PjxzcGFuIGNsYXNzPVwiZGFzaGljb25zIGRhc2hpY29ucy10cmFzaFwiPjwvc3Bhbj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn0pO1xuXG5jb25zdCBJbWFnZUdhbGxlcnkgPSBTb3J0YWJsZUNvbnRhaW5lcigoeyBpbWFnZXMsIGltYWdlc0NyZWRpdHMsIGltYWdlc0Rlc2NyaXB0aW9ucywgc2V0QXR0cmlidXRlcyB9KSA9PiB7XG4gICAgY29uc3QgcmVtb3ZlSW1hZ2UgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0ltYWdlcyA9IGltYWdlcy5maWx0ZXIoKGltYWdlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGltYWdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpbWFnZXNEZXNjcmlwdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGltYWdlc0NyZWRpdHMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBuZXdJbWFnZXMsXG4gICAgICAgICAgICAgICAgaW1hZ2VzRGVzY3JpcHRpb25zLFxuICAgICAgICAgICAgICAgIGltYWdlc0NyZWRpdHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVJdGVtID0gKGtleSwgY29sbGVjdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuIChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICBzZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgICAgICBba2V5XTogY29sbGVjdGlvbi5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2FsbGVyeS1ncmlkXCI+XG4gICAgICAgICAgICB7aW1hZ2VzLm1hcCgoaW1hZ2UsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPERyYWdnYWJsZUltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uPXtpbWFnZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVkaXRzPXtpbWFnZXNDcmVkaXRzW2luZGV4XX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPXtpbWFnZXNEZXNjcmlwdGlvbnNbaW5kZXhdfVxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2U9e2ltYWdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbWFnZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUltYWdlPXtyZW1vdmVJbWFnZShpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDcmVkaXRzPXt1cGRhdGVJdGVtKCdpbWFnZXNDcmVkaXRzJywgaW1hZ2VzQ3JlZGl0cywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RGVzY3JpcHRpb249e3VwZGF0ZUl0ZW0oJ2ltYWdlc0Rlc2NyaXB0aW9ucycsIGltYWdlc0Rlc2NyaXB0aW9ucywgaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDxNZWRpYVVwbG9hZFxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXsobWVkaWEpID0+IHsgc2V0QXR0cmlidXRlcyh7IGltYWdlczogWy4uLmltYWdlcywgLi4ubWVkaWFdIH0pOyB9fVxuICAgICAgICAgICAgICAgIHR5cGU9XCJpbWFnZVwiXG4gICAgICAgICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgICAgICAgdmFsdWU9e2ltYWdlc31cbiAgICAgICAgICAgICAgICByZW5kZXI9eyh7IG9wZW4gfSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1pbWFnZXMtYnV0dG9uIGlzLWJ1dHRvbiBpcy1kZWZhdWx0IGlzLWxhcmdlXCIgb25DbGljaz17b3Blbn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhc2hpY29ucyBkYXNoaWNvbnMtcGx1c1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59KTtcblxud3AuYmxvY2tzLnJlZ2lzdGVyQmxvY2tUeXBlKCdqZW8tdGhlbWUvY3VzdG9tLWltYWdlLWdhbGxlcnktYmxvY2snLCB7XG4gICAgdGl0bGU6IF9fKCdJbWFnZSBHYWxsZXJ5JywgJ2plbycpLFxuICAgIGljb246ICdmb3JtYXQtZ2FsbGVyeScsXG4gICAgY2F0ZWdvcnk6ICdtZWRpYScsXG4gICAga2V5d29yZHM6IFtcbiAgICAgICAgX18oJ21hdGVyaWFsdGhlbWUnLCAnamVvJyksXG4gICAgICAgIF9fKCdwaG90b3MnLCAnamVvJyksXG4gICAgICAgIF9fKCdpbWFnZXMnLCAnamVvJylcbiAgICBdLFxuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgZ2FsbGVyeVRpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgfSxcblxuICAgICAgICBpbWFnZXM6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW1hZ2VzRGVzY3JpcHRpb25zOiB7XG4gICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICB9LFxuXG4gICAgICAgIGltYWdlc0NyZWRpdHM6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZWRpdCh7IGF0dHJpYnV0ZXMsIGNsYXNzTmFtZSwgc2V0QXR0cmlidXRlcyB9KSB7XG4gICAgICAgIGNvbnN0IHsgZ2FsbGVyeVRpdGxlID0gXCJcIiwgaW1hZ2VzID0gW10sIGltYWdlc0Rlc2NyaXB0aW9ucyA9IFtdLCBpbWFnZXNDcmVkaXRzID0gW10gfSA9IGF0dHJpYnV0ZXM7XG5cbiAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKCAhIGltYWdlc0Rlc2NyaXB0aW9uc1tpbmRleF0gJiYgaW1hZ2VzRGVzY3JpcHRpb25zW2luZGV4XSAhPSAnJyApIHtcbiAgICAgICAgICAgICAgICBpbWFnZXNEZXNjcmlwdGlvbnNbaW5kZXhdID0gaW1hZ2UuZGVzY3JpcHRpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggISBpbWFnZXNDcmVkaXRzW2luZGV4XSAmJiBpbWFnZXNDcmVkaXRzW2luZGV4XSAhPSAnJykge1xuICAgICAgICAgICAgICAgIGltYWdlc0NyZWRpdHNbaW5kZXhdID0gaW1hZ2UuY2FwdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb25Tb3J0RW5kID0gKHsgbmV3SW5kZXgsIG9sZEluZGV4IH0pID0+IHtcbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgICAgIGltYWdlczogYXJyYXlNb3ZlKGltYWdlcywgb2xkSW5kZXgsIG5ld0luZGV4KSxcbiAgICAgICAgICAgICAgICBpbWFnZXNDcmVkaXRzOiBhcnJheU1vdmUoaW1hZ2VzQ3JlZGl0cywgb2xkSW5kZXgsIG5ld0luZGV4KSxcbiAgICAgICAgICAgICAgICBpbWFnZXNEZXNjcmlwdGlvbnM6IGFycmF5TW92ZShpbWFnZXNEZXNjcmlwdGlvbnMsIG9sZEluZGV4LCBuZXdJbmRleCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIGltYWdlc0NyZWRpdHMgIT0gYXR0cmlidXRlcy5pbWFnZXNDcmVkaXRzICkge1xuICAgICAgICAgICAgc2V0QXR0cmlidXRlcyggeyAuLi5hdHRyaWJ1dGVzLCBpbWFnZXNDcmVkaXRzIH0gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggaW1hZ2VzRGVzY3JpcHRpb25zICE9IGF0dHJpYnV0ZXMuaW1hZ2VzRGVzY3JpcHRpb25zICkge1xuICAgICAgICAgICAgc2V0QXR0cmlidXRlcyggeyAuLi5hdHRyaWJ1dGVzLCBpbWFnZXNEZXNjcmlwdGlvbnMgfSApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW1hZ2UtZ2FsbGVyeVwiPlxuICAgICAgICAgICAgICAgIDxSaWNoVGV4dFxuICAgICAgICAgICAgICAgICAgICB0YWdOYW1lPVwiaDJcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJnYWxsZXJ5LXRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2dhbGxlcnlUaXRsZX1cbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGluZ0NvbnRyb2xzPXtbJ2JvbGQnLCAnaXRhbGljJ119XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZ2FsbGVyeVRpdGxlKSA9PiB7c2V0QXR0cmlidXRlcyh7IGdhbGxlcnlUaXRsZSB9KX19XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtfXygnVHlwZSBhIHRpdGxlJywgJ2plbycpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEltYWdlR2FsbGVyeVxuICAgICAgICAgICAgICAgICAgICBheGlzPVwieHlcIlxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJDbGFzcz1cIm1vdmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbnRhaW5lcj17ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGxlcnktZ3JpZCcpfVxuICAgICAgICAgICAgICAgICAgICBpbWFnZXM9e2ltYWdlc31cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzQ3JlZGl0cz17aW1hZ2VzQ3JlZGl0c31cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzRGVzY3JpcHRpb25zPXtpbWFnZXNEZXNjcmlwdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIG9uU29ydEVuZD17b25Tb3J0RW5kfVxuICAgICAgICAgICAgICAgICAgICBwcmVzc0RlbGF5PXsyMDB9XG4gICAgICAgICAgICAgICAgICAgIHNldEF0dHJpYnV0ZXM9e3NldEF0dHJpYnV0ZXN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBzYXZlOiAoeyBhdHRyaWJ1dGVzIH0pID0+IHtcbiAgICAgICAgY29uc3QgeyBnYWxsZXJ5VGl0bGUgPSBcIlwiLCBpbWFnZXMgPSBbXSwgaW1hZ2VzRGVzY3JpcHRpb25zID0gW10sIGltYWdlc0NyZWRpdHMgPSBbXSB9ID0gYXR0cmlidXRlcztcblxuICAgICAgICBjb25zdCBkaXNwbGF5SW1hZ2VzID0gKGltYWdlcykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICBpbWFnZXMubWFwKChpbWFnZSwgaW5kZXgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnYWxsZXJ5LWl0ZW0tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnYWxsZXJ5LWl0ZW0td3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2dhbGxlcnktaXRlbSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW1hZ2VzLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtpbWFnZS51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2ltYWdlLmFsdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1tZXRhXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJpY2hUZXh0LkNvbnRlbnQgdGFnTmFtZT1cInNwYW5cIiB2YWx1ZT17aW1hZ2VzRGVzY3JpcHRpb25zW2luZGV4XX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1jcmVkaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNhbWVyYVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSaWNoVGV4dC5Db250ZW50IHRhZ05hbWU9XCJzcGFuXCIgdmFsdWU9e2ltYWdlc0NyZWRpdHNbaW5kZXhdfSAvPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbWFnZS1nYWxsZXJ5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbWFnZS1nYWxsZXJ5LXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnYWxsZXJ5LXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmljaFRleHQuQ29udGVudCB0YWdOYW1lPVwiaDJcIiB2YWx1ZT17Z2FsbGVyeVRpdGxlfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGFjdGlvbj1cImRpc3BsYXktZ3JpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRoXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gYWN0aW9uPVwiZnVsbHNyZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZXhwYW5kXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2FsbGVyeS1ncmlkXCIgZGF0YS10b3RhbC1zbGlkZXM9e2ltYWdlcy5sZW5ndGh9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2Rpc3BsYXlJbWFnZXMoaW1hZ2VzKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcblxuICAgIH0sXG59KTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXlcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufSIsImltcG9ydCBzZXRQcm90b3R5cGVPZiBmcm9tIFwiLi9zZXRQcm90b3R5cGVPZlwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tIFwiLi9kZWZpbmVQcm9wZXJ0eVwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBPYmplY3QoYXJndW1lbnRzW2ldKSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4uLy4uL2hlbHBlcnMvZXNtL3R5cGVvZlwiO1xuaW1wb3J0IGFzc2VydFRoaXNJbml0aWFsaXplZCBmcm9tIFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59IiwiaW1wb3J0IGFycmF5V2l0aEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aEhvbGVzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5TGltaXQgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5TGltaXRcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheVwiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlUmVzdCBmcm9tIFwiLi9ub25JdGVyYWJsZVJlc3RcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheVwiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5XCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWRcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5XCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufSIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXJyYXlNb3ZlTXV0YXRlID0gKGFycmF5LCBmcm9tLCB0bykgPT4ge1xuXHRjb25zdCBzdGFydEluZGV4ID0gZnJvbSA8IDAgPyBhcnJheS5sZW5ndGggKyBmcm9tIDogZnJvbTtcblxuXHRpZiAoc3RhcnRJbmRleCA+PSAwICYmIHN0YXJ0SW5kZXggPCBhcnJheS5sZW5ndGgpIHtcblx0XHRjb25zdCBlbmRJbmRleCA9IHRvIDwgMCA/IGFycmF5Lmxlbmd0aCArIHRvIDogdG87XG5cblx0XHRjb25zdCBbaXRlbV0gPSBhcnJheS5zcGxpY2UoZnJvbSwgMSk7XG5cdFx0YXJyYXkuc3BsaWNlKGVuZEluZGV4LCAwLCBpdGVtKTtcblx0fVxufTtcblxuY29uc3QgYXJyYXlNb3ZlID0gKGFycmF5LCBmcm9tLCB0bykgPT4ge1xuXHRhcnJheSA9IFsuLi5hcnJheV07XG5cdGFycmF5TW92ZU11dGF0ZShhcnJheSwgZnJvbSwgdG8pO1xuXHRyZXR1cm4gYXJyYXk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TW92ZTtcbm1vZHVsZS5leHBvcnRzLm11dGF0ZSA9IGFycmF5TW92ZU11dGF0ZTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbiAgdmFyIGhhcyA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcblxuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAoaGFzKHR5cGVTcGVjcywgdHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpZiAodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgZXJyID0gRXJyb3IoXG4gICAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogJyArIGxvY2F0aW9uICsgJyB0eXBlIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgJyArXG4gICAgICAgICAgICAgICdpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJyArIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSArICdgLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciAmJiAhKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJyArXG4gICAgICAgICAgICBsb2NhdGlvbiArICcgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICcgKyB0eXBlb2YgZXJyb3IgKyAnLiAnICtcbiAgICAgICAgICAgICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgK1xuICAgICAgICAgICAgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ZhaWxlZCAnICsgbG9jYXRpb24gKyAnIHR5cGU6ICcgKyBlcnJvci5tZXNzYWdlICsgKHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXNldHMgd2FybmluZyBjYWNoZSB3aGVuIHRlc3RpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2hlY2tQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbnZhciBoYXMgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgZWxlbWVudFR5cGU6IGNyZWF0ZUVsZW1lbnRUeXBlVHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJyArIHByb3BGdWxsTmFtZSArICdgIHByb3Agb24gYCcgKyBjb21wb25lbnROYW1lICArICdgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZVR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghUmVhY3RJcy5pc1ZhbGlkRWxlbWVudFR5cGUocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQgdHlwZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50cyBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXksIGdvdCAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgYXJndW1lbnRzLiAnICtcbiAgICAgICAgICAgICdBIGNvbW1vbiBtaXN0YWtlIGlzIHRvIHdyaXRlIG9uZU9mKHgsIHksIHopIGluc3RlYWQgb2Ygb25lT2YoW3gsIHksIHpdKS4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGFycmF5LicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcywgZnVuY3Rpb24gcmVwbGFjZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgU3RyaW5nKHByb3BWYWx1ZSkgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKGhhcyhwcm9wVmFsdWUsIGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZS4gRXhwZWN0ZWQgYW4gYXJyYXkgb2YgY2hlY2sgZnVuY3Rpb25zLCBidXQgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkICcgKyBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlcikgKyAnIGF0IGluZGV4ICcgKyBpICsgJy4nXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgYWxsIGtleXMgaW4gY2FzZSBzb21lIGFyZSByZXF1aXJlZCBidXQgbWlzc2luZyBmcm9tXG4gICAgICAvLyBwcm9wcy5cbiAgICAgIHZhciBhbGxLZXlzID0gYXNzaWduKHt9LCBwcm9wc1twcm9wTmFtZV0sIHNoYXBlVHlwZXMpO1xuICAgICAgZm9yICh2YXIga2V5IGluIGFsbEtleXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBrZXkgYCcgKyBrZXkgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nICtcbiAgICAgICAgICAgICdcXG5CYWQgb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcHNbcHJvcE5hbWVdLCBudWxsLCAnICAnKSArXG4gICAgICAgICAgICAnXFxuVmFsaWQga2V5czogJyArICBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhzaGFwZVR5cGVzKSwgbnVsbCwgJyAgJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gICAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBmYWxzeSB2YWx1ZSBjYW4ndCBiZSBhIFN5bWJvbFxuICAgIGlmICghcHJvcFZhbHVlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGUgPSBjaGVja1Byb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZTtcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoUmVhY3RJcy5pc0VsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuIiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi4xMy4xXG4gKiByZWFjdC1pcy5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcbnZhciBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKSA6IDB4ZWFjYztcbnZhciBSRUFDVF9QUk9GSUxFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKSA6IDB4ZWFkMjtcbnZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKSA6IDB4ZWFjZDtcbnZhciBSRUFDVF9DT05URVhUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0JykgOiAweGVhY2U7IC8vIFRPRE86IFdlIGRvbid0IHVzZSBBc3luY01vZGUgb3IgQ29uY3VycmVudE1vZGUgYW55bW9yZS4gVGhleSB3ZXJlIHRlbXBvcmFyeVxuLy8gKHVuc3RhYmxlKSBBUElzIHRoYXQgaGF2ZSBiZWVuIHJlbW92ZWQuIENhbiB3ZSByZW1vdmUgdGhlIHN5bWJvbHM/XG5cbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb25jdXJyZW50X21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSA6IDB4ZWFkMDtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbnZhciBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZV9saXN0JykgOiAweGVhZDg7XG52YXIgUkVBQ1RfTUVNT19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubWVtbycpIDogMHhlYWQzO1xudmFyIFJFQUNUX0xBWllfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKSA6IDB4ZWFkNDtcbnZhciBSRUFDVF9CTE9DS19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuYmxvY2snKSA6IDB4ZWFkOTtcbnZhciBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnVuZGFtZW50YWwnKSA6IDB4ZWFkNTtcbnZhciBSRUFDVF9SRVNQT05ERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnJlc3BvbmRlcicpIDogMHhlYWQ2O1xudmFyIFJFQUNUX1NDT1BFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zY29wZScpIDogMHhlYWQ3O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9SRVNQT05ERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9TQ09QRV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0JMT0NLX1RZUEUpO1xufVxuXG5mdW5jdGlvbiB0eXBlT2Yob2JqZWN0KSB7XG4gIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwpIHtcbiAgICB2YXIgJCR0eXBlb2YgPSBvYmplY3QuJCR0eXBlb2Y7XG5cbiAgICBzd2l0Y2ggKCQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0VMRU1FTlRfVFlQRTpcbiAgICAgICAgdmFyIHR5cGUgPSBvYmplY3QudHlwZTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0FTWU5DX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZlR5cGU7XG5cbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn0gLy8gQXN5bmNNb2RlIGlzIGRlcHJlY2F0ZWQgYWxvbmcgd2l0aCBpc0FzeW5jTW9kZVxuXG52YXIgQXN5bmNNb2RlID0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xudmFyIENvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG52YXIgQ29udGV4dENvbnN1bWVyID0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xudmFyIENvbnRleHRQcm92aWRlciA9IFJFQUNUX1BST1ZJREVSX1RZUEU7XG52YXIgRWxlbWVudCA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcbnZhciBGb3J3YXJkUmVmID0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbnZhciBGcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG52YXIgTGF6eSA9IFJFQUNUX0xBWllfVFlQRTtcbnZhciBNZW1vID0gUkVBQ1RfTUVNT19UWVBFO1xudmFyIFBvcnRhbCA9IFJFQUNUX1BPUlRBTF9UWVBFO1xudmFyIFByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbnZhciBTdHJpY3RNb2RlID0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbnZhciBTdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG52YXIgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSBmYWxzZTsgLy8gQXN5bmNNb2RlIHNob3VsZCBiZSBkZXByZWNhdGVkXG5cbmZ1bmN0aW9uIGlzQXN5bmNNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSkge1xuICAgICAgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSB0cnVlOyAvLyBVc2luZyBjb25zb2xlWyd3YXJuJ10gdG8gZXZhZGUgQmFiZWwgYW5kIEVTTGludFxuXG4gICAgICBjb25zb2xlWyd3YXJuJ10oJ1RoZSBSZWFjdElzLmlzQXN5bmNNb2RlKCkgYWxpYXMgaGFzIGJlZW4gZGVwcmVjYXRlZCwgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGluIFJlYWN0IDE3Ky4gVXBkYXRlIHlvdXIgY29kZSB0byB1c2UgJyArICdSZWFjdElzLmlzQ29uY3VycmVudE1vZGUoKSBpbnN0ZWFkLiBJdCBoYXMgdGhlIGV4YWN0IHNhbWUgQVBJLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkgfHwgdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRDb25zdW1lcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05URVhUX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRQcm92aWRlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9WSURFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNGb3J3YXJkUmVmKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZyYWdtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0xhenkob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTEFaWV9UWVBFO1xufVxuZnVuY3Rpb24gaXNNZW1vKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX01FTU9fVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUG9ydGFsKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BPUlRBTF9UWVBFO1xufVxuZnVuY3Rpb24gaXNQcm9maWxlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdHJpY3RNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N1c3BlbnNlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG59XG5cbmV4cG9ydHMuQXN5bmNNb2RlID0gQXN5bmNNb2RlO1xuZXhwb3J0cy5Db25jdXJyZW50TW9kZSA9IENvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5Db250ZXh0Q29uc3VtZXIgPSBDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLkNvbnRleHRQcm92aWRlciA9IENvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuRWxlbWVudCA9IEVsZW1lbnQ7XG5leHBvcnRzLkZvcndhcmRSZWYgPSBGb3J3YXJkUmVmO1xuZXhwb3J0cy5GcmFnbWVudCA9IEZyYWdtZW50O1xuZXhwb3J0cy5MYXp5ID0gTGF6eTtcbmV4cG9ydHMuTWVtbyA9IE1lbW87XG5leHBvcnRzLlBvcnRhbCA9IFBvcnRhbDtcbmV4cG9ydHMuUHJvZmlsZXIgPSBQcm9maWxlcjtcbmV4cG9ydHMuU3RyaWN0TW9kZSA9IFN0cmljdE1vZGU7XG5leHBvcnRzLlN1c3BlbnNlID0gU3VzcGVuc2U7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbmV4cG9ydHMuaXNWYWxpZEVsZW1lbnRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlO1xuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG4gIH0pKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsImltcG9ydCBfZXh0ZW5kcyBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzJztcbmltcG9ydCBfc2xpY2VkVG9BcnJheSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5JztcbmltcG9ydCBfb2JqZWN0U3ByZWFkIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFNwcmVhZCc7XG5pbXBvcnQgX2NsYXNzQ2FsbENoZWNrIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrJztcbmltcG9ydCBfY3JlYXRlQ2xhc3MgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MnO1xuaW1wb3J0IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nO1xuaW1wb3J0IF9nZXRQcm90b3R5cGVPZiBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9nZXRQcm90b3R5cGVPZic7XG5pbXBvcnQgX2luaGVyaXRzIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2luaGVyaXRzJztcbmltcG9ydCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2Fzc2VydFRoaXNJbml0aWFsaXplZCc7XG5pbXBvcnQgX2RlZmluZVByb3BlcnR5IGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5JztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgX3RvQ29uc3VtYWJsZUFycmF5IGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5JztcblxudmFyIE1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1hbmFnZXIoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1hbmFnZXIpO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KHRoaXMsIFwicmVmc1wiLCB7fSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTWFuYWdlciwgW3tcbiAgICBrZXk6IFwiYWRkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZChjb2xsZWN0aW9uLCByZWYpIHtcbiAgICAgIGlmICghdGhpcy5yZWZzW2NvbGxlY3Rpb25dKSB7XG4gICAgICAgIHRoaXMucmVmc1tjb2xsZWN0aW9uXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlZnNbY29sbGVjdGlvbl0ucHVzaChyZWYpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlKGNvbGxlY3Rpb24sIHJlZikge1xuICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChjb2xsZWN0aW9uLCByZWYpO1xuXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMucmVmc1tjb2xsZWN0aW9uXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpc0FjdGl2ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmFjdGl2ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0QWN0aXZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEFjdGl2ZSgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiB0aGlzLnJlZnNbdGhpcy5hY3RpdmUuY29sbGVjdGlvbl0uZmluZChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICB2YXIgbm9kZSA9IF9yZWYubm9kZTtcbiAgICAgICAgcmV0dXJuIG5vZGUuc29ydGFibGVJbmZvLmluZGV4ID09IF90aGlzLmFjdGl2ZS5pbmRleDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRJbmRleFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRJbmRleChjb2xsZWN0aW9uLCByZWYpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZnNbY29sbGVjdGlvbl0uaW5kZXhPZihyZWYpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRPcmRlcmVkUmVmc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRPcmRlcmVkUmVmcygpIHtcbiAgICAgIHZhciBjb2xsZWN0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLmFjdGl2ZS5jb2xsZWN0aW9uO1xuICAgICAgcmV0dXJuIHRoaXMucmVmc1tjb2xsZWN0aW9uXS5zb3J0KHNvcnRCeUluZGV4KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTWFuYWdlcjtcbn0oKTtcblxuZnVuY3Rpb24gc29ydEJ5SW5kZXgoX3JlZjIsIF9yZWYzKSB7XG4gIHZhciBpbmRleDEgPSBfcmVmMi5ub2RlLnNvcnRhYmxlSW5mby5pbmRleDtcbiAgdmFyIGluZGV4MiA9IF9yZWYzLm5vZGUuc29ydGFibGVJbmZvLmluZGV4O1xuICByZXR1cm4gaW5kZXgxIC0gaW5kZXgyO1xufVxuXG5mdW5jdGlvbiBhcnJheU1vdmUoYXJyYXksIGZyb20sIHRvKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKFwiRGVwcmVjYXRpb24gd2FybmluZzogYXJyYXlNb3ZlIHdpbGwgbm8gbG9uZ2VyIGJlIGV4cG9ydGVkIGJ5ICdyZWFjdC1zb3J0YWJsZS1ob2MnIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuIFBsZWFzZSBpbnN0YWxsIHRoZSBgYXJyYXktbW92ZWAgcGFja2FnZSBsb2NhbGx5IGluc3RlYWQuIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2FycmF5LW1vdmVcIik7XG4gICAgfVxuICB9XG5cbiAgYXJyYXkgPSBhcnJheS5zbGljZSgpO1xuICBhcnJheS5zcGxpY2UodG8gPCAwID8gYXJyYXkubGVuZ3RoICsgdG8gOiB0bywgMCwgYXJyYXkuc3BsaWNlKGZyb20sIDEpWzBdKTtcbiAgcmV0dXJuIGFycmF5O1xufVxuZnVuY3Rpb24gb21pdChvYmosIGtleXNUb09taXQpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgIGlmIChrZXlzVG9PbWl0LmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgIGFjY1trZXldID0gb2JqW2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufVxudmFyIGV2ZW50cyA9IHtcbiAgZW5kOiBbJ3RvdWNoZW5kJywgJ3RvdWNoY2FuY2VsJywgJ21vdXNldXAnXSxcbiAgbW92ZTogWyd0b3VjaG1vdmUnLCAnbW91c2Vtb3ZlJ10sXG4gIHN0YXJ0OiBbJ3RvdWNoc3RhcnQnLCAnbW91c2Vkb3duJ11cbn07XG52YXIgdmVuZG9yUHJlZml4ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHZhciBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICcnKSB8fCBbJy1tb3otaGlkZGVuLWlmcmFtZSddO1xuICB2YXIgcHJlID0gKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHN0eWxlcykuam9pbignJykubWF0Y2goLy0obW96fHdlYmtpdHxtcyktLykgfHwgc3R5bGVzLk9MaW5rID09PSAnJyAmJiBbJycsICdvJ10pWzFdO1xuXG4gIHN3aXRjaCAocHJlKSB7XG4gICAgY2FzZSAnbXMnOlxuICAgICAgcmV0dXJuICdtcyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHByZSAmJiBwcmUubGVuZ3RoID8gcHJlWzBdLnRvVXBwZXJDYXNlKCkgKyBwcmUuc3Vic3RyKDEpIDogJyc7XG4gIH1cbn0oKTtcbmZ1bmN0aW9uIHNldElubGluZVN0eWxlcyhub2RlLCBzdHlsZXMpIHtcbiAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBub2RlLnN0eWxlW2tleV0gPSBzdHlsZXNba2V5XTtcbiAgfSk7XG59XG5mdW5jdGlvbiBzZXRUcmFuc2xhdGUzZChub2RlLCB0cmFuc2xhdGUpIHtcbiAgbm9kZS5zdHlsZVtcIlwiLmNvbmNhdCh2ZW5kb3JQcmVmaXgsIFwiVHJhbnNmb3JtXCIpXSA9IHRyYW5zbGF0ZSA9PSBudWxsID8gJycgOiBcInRyYW5zbGF0ZTNkKFwiLmNvbmNhdCh0cmFuc2xhdGUueCwgXCJweCxcIikuY29uY2F0KHRyYW5zbGF0ZS55LCBcInB4LDApXCIpO1xufVxuZnVuY3Rpb24gc2V0VHJhbnNpdGlvbkR1cmF0aW9uKG5vZGUsIGR1cmF0aW9uKSB7XG4gIG5vZGUuc3R5bGVbXCJcIi5jb25jYXQodmVuZG9yUHJlZml4LCBcIlRyYW5zaXRpb25EdXJhdGlvblwiKV0gPSBkdXJhdGlvbiA9PSBudWxsID8gJycgOiBcIlwiLmNvbmNhdChkdXJhdGlvbiwgXCJtc1wiKTtcbn1cbmZ1bmN0aW9uIGNsb3Nlc3QoZWwsIGZuKSB7XG4gIHdoaWxlIChlbCkge1xuICAgIGlmIChmbihlbCkpIHtcbiAgICAgIHJldHVybiBlbDtcbiAgICB9XG5cbiAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIGxpbWl0KG1pbiwgbWF4LCB2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5tYXgobWluLCBNYXRoLm1pbih2YWx1ZSwgbWF4KSk7XG59XG5cbmZ1bmN0aW9uIGdldFBpeGVsVmFsdWUoc3RyaW5nVmFsdWUpIHtcbiAgaWYgKHN0cmluZ1ZhbHVlLnN1YnN0cigtMikgPT09ICdweCcpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHJpbmdWYWx1ZSk7XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuZnVuY3Rpb24gZ2V0RWxlbWVudE1hcmdpbihlbGVtZW50KSB7XG4gIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICByZXR1cm4ge1xuICAgIGJvdHRvbTogZ2V0UGl4ZWxWYWx1ZShzdHlsZS5tYXJnaW5Cb3R0b20pLFxuICAgIGxlZnQ6IGdldFBpeGVsVmFsdWUoc3R5bGUubWFyZ2luTGVmdCksXG4gICAgcmlnaHQ6IGdldFBpeGVsVmFsdWUoc3R5bGUubWFyZ2luUmlnaHQpLFxuICAgIHRvcDogZ2V0UGl4ZWxWYWx1ZShzdHlsZS5tYXJnaW5Ub3ApXG4gIH07XG59XG5mdW5jdGlvbiBwcm92aWRlRGlzcGxheU5hbWUocHJlZml4LCBDb21wb25lbnQkJDEpIHtcbiAgdmFyIGNvbXBvbmVudE5hbWUgPSBDb21wb25lbnQkJDEuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50JCQxLm5hbWU7XG4gIHJldHVybiBjb21wb25lbnROYW1lID8gXCJcIi5jb25jYXQocHJlZml4LCBcIihcIikuY29uY2F0KGNvbXBvbmVudE5hbWUsIFwiKVwiKSA6IHByZWZpeDtcbn1cbmZ1bmN0aW9uIGdldFNjcm9sbEFkanVzdGVkQm91bmRpbmdDbGllbnRSZWN0KG5vZGUsIHNjcm9sbERlbHRhKSB7XG4gIHZhciBib3VuZGluZ0NsaWVudFJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4ge1xuICAgIHRvcDogYm91bmRpbmdDbGllbnRSZWN0LnRvcCArIHNjcm9sbERlbHRhLnRvcCxcbiAgICBsZWZ0OiBib3VuZGluZ0NsaWVudFJlY3QubGVmdCArIHNjcm9sbERlbHRhLmxlZnRcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldFBvc2l0aW9uKGV2ZW50KSB7XG4gIGlmIChldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsXG4gICAgICB5OiBldmVudC50b3VjaGVzWzBdLnBhZ2VZXG4gICAgfTtcbiAgfSBlbHNlIGlmIChldmVudC5jaGFuZ2VkVG91Y2hlcyAmJiBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVgsXG4gICAgICB5OiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGV2ZW50LnBhZ2VYLFxuICAgICAgeTogZXZlbnQucGFnZVlcbiAgICB9O1xuICB9XG59XG5mdW5jdGlvbiBpc1RvdWNoRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoO1xufVxuZnVuY3Rpb24gZ2V0RWRnZU9mZnNldChub2RlLCBwYXJlbnQpIHtcbiAgdmFyIG9mZnNldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge1xuICAgIGxlZnQ6IDAsXG4gICAgdG9wOiAwXG4gIH07XG5cbiAgaWYgKCFub2RlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciBub2RlT2Zmc2V0ID0ge1xuICAgIGxlZnQ6IG9mZnNldC5sZWZ0ICsgbm9kZS5vZmZzZXRMZWZ0LFxuICAgIHRvcDogb2Zmc2V0LnRvcCArIG5vZGUub2Zmc2V0VG9wXG4gIH07XG5cbiAgaWYgKG5vZGUucGFyZW50Tm9kZSA9PT0gcGFyZW50KSB7XG4gICAgcmV0dXJuIG5vZGVPZmZzZXQ7XG4gIH1cblxuICByZXR1cm4gZ2V0RWRnZU9mZnNldChub2RlLnBhcmVudE5vZGUsIHBhcmVudCwgbm9kZU9mZnNldCk7XG59XG5mdW5jdGlvbiBnZXRUYXJnZXRJbmRleChuZXdJbmRleCwgcHJldkluZGV4LCBvbGRJbmRleCkge1xuICBpZiAobmV3SW5kZXggPCBvbGRJbmRleCAmJiBuZXdJbmRleCA+IHByZXZJbmRleCkge1xuICAgIHJldHVybiBuZXdJbmRleCAtIDE7XG4gIH0gZWxzZSBpZiAobmV3SW5kZXggPiBvbGRJbmRleCAmJiBuZXdJbmRleCA8IHByZXZJbmRleCkge1xuICAgIHJldHVybiBuZXdJbmRleCArIDE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ld0luZGV4O1xuICB9XG59XG5mdW5jdGlvbiBnZXRMb2NrUGl4ZWxPZmZzZXQoX3JlZikge1xuICB2YXIgbG9ja09mZnNldCA9IF9yZWYubG9ja09mZnNldCxcbiAgICAgIHdpZHRoID0gX3JlZi53aWR0aCxcbiAgICAgIGhlaWdodCA9IF9yZWYuaGVpZ2h0O1xuICB2YXIgb2Zmc2V0WCA9IGxvY2tPZmZzZXQ7XG4gIHZhciBvZmZzZXRZID0gbG9ja09mZnNldDtcbiAgdmFyIHVuaXQgPSAncHgnO1xuXG4gIGlmICh0eXBlb2YgbG9ja09mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgbWF0Y2ggPSAvXlsrLV0/XFxkKig/OlxcLlxcZCopPyhweHwlKSQvLmV4ZWMobG9ja09mZnNldCk7XG4gICAgaW52YXJpYW50KG1hdGNoICE9PSBudWxsLCAnbG9ja09mZnNldCB2YWx1ZSBzaG91bGQgYmUgYSBudW1iZXIgb3IgYSBzdHJpbmcgb2YgYSAnICsgJ251bWJlciBmb2xsb3dlZCBieSBcInB4XCIgb3IgXCIlXCIuIEdpdmVuICVzJywgbG9ja09mZnNldCk7XG4gICAgb2Zmc2V0WCA9IHBhcnNlRmxvYXQobG9ja09mZnNldCk7XG4gICAgb2Zmc2V0WSA9IHBhcnNlRmxvYXQobG9ja09mZnNldCk7XG4gICAgdW5pdCA9IG1hdGNoWzFdO1xuICB9XG5cbiAgaW52YXJpYW50KGlzRmluaXRlKG9mZnNldFgpICYmIGlzRmluaXRlKG9mZnNldFkpLCAnbG9ja09mZnNldCB2YWx1ZSBzaG91bGQgYmUgYSBmaW5pdGUuIEdpdmVuICVzJywgbG9ja09mZnNldCk7XG5cbiAgaWYgKHVuaXQgPT09ICclJykge1xuICAgIG9mZnNldFggPSBvZmZzZXRYICogd2lkdGggLyAxMDA7XG4gICAgb2Zmc2V0WSA9IG9mZnNldFkgKiBoZWlnaHQgLyAxMDA7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHg6IG9mZnNldFgsXG4gICAgeTogb2Zmc2V0WVxuICB9O1xufVxuZnVuY3Rpb24gZ2V0TG9ja1BpeGVsT2Zmc2V0cyhfcmVmMikge1xuICB2YXIgaGVpZ2h0ID0gX3JlZjIuaGVpZ2h0LFxuICAgICAgd2lkdGggPSBfcmVmMi53aWR0aCxcbiAgICAgIGxvY2tPZmZzZXQgPSBfcmVmMi5sb2NrT2Zmc2V0O1xuICB2YXIgb2Zmc2V0cyA9IEFycmF5LmlzQXJyYXkobG9ja09mZnNldCkgPyBsb2NrT2Zmc2V0IDogW2xvY2tPZmZzZXQsIGxvY2tPZmZzZXRdO1xuICBpbnZhcmlhbnQob2Zmc2V0cy5sZW5ndGggPT09IDIsICdsb2NrT2Zmc2V0IHByb3Agb2YgU29ydGFibGVDb250YWluZXIgc2hvdWxkIGJlIGEgc2luZ2xlICcgKyAndmFsdWUgb3IgYW4gYXJyYXkgb2YgZXhhY3RseSB0d28gdmFsdWVzLiBHaXZlbiAlcycsIGxvY2tPZmZzZXQpO1xuXG4gIHZhciBfb2Zmc2V0cyA9IF9zbGljZWRUb0FycmF5KG9mZnNldHMsIDIpLFxuICAgICAgbWluTG9ja09mZnNldCA9IF9vZmZzZXRzWzBdLFxuICAgICAgbWF4TG9ja09mZnNldCA9IF9vZmZzZXRzWzFdO1xuXG4gIHJldHVybiBbZ2V0TG9ja1BpeGVsT2Zmc2V0KHtcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICBsb2NrT2Zmc2V0OiBtaW5Mb2NrT2Zmc2V0LFxuICAgIHdpZHRoOiB3aWR0aFxuICB9KSwgZ2V0TG9ja1BpeGVsT2Zmc2V0KHtcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICBsb2NrT2Zmc2V0OiBtYXhMb2NrT2Zmc2V0LFxuICAgIHdpZHRoOiB3aWR0aFxuICB9KV07XG59XG5cbmZ1bmN0aW9uIGlzU2Nyb2xsYWJsZShlbCkge1xuICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcbiAgdmFyIG92ZXJmbG93UmVnZXggPSAvKGF1dG98c2Nyb2xsKS87XG4gIHZhciBwcm9wZXJ0aWVzID0gWydvdmVyZmxvdycsICdvdmVyZmxvd1gnLCAnb3ZlcmZsb3dZJ107XG4gIHJldHVybiBwcm9wZXJ0aWVzLmZpbmQoZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIG92ZXJmbG93UmVnZXgudGVzdChjb21wdXRlZFN0eWxlW3Byb3BlcnR5XSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxpbmdQYXJlbnQoZWwpIHtcbiAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIGlmIChpc1Njcm9sbGFibGUoZWwpKSB7XG4gICAgcmV0dXJuIGVsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBnZXRTY3JvbGxpbmdQYXJlbnQoZWwucGFyZW50Tm9kZSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldENvbnRhaW5lckdyaWRHYXAoZWxlbWVudCkge1xuICB2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcblxuICBpZiAoc3R5bGUuZGlzcGxheSA9PT0gJ2dyaWQnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGdldFBpeGVsVmFsdWUoc3R5bGUuZ3JpZENvbHVtbkdhcCksXG4gICAgICB5OiBnZXRQaXhlbFZhbHVlKHN0eWxlLmdyaWRSb3dHYXApXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG59XG52YXIgS0VZQ09ERSA9IHtcbiAgVEFCOiA5LFxuICBFU0M6IDI3LFxuICBTUEFDRTogMzIsXG4gIExFRlQ6IDM3LFxuICBVUDogMzgsXG4gIFJJR0hUOiAzOSxcbiAgRE9XTjogNDBcbn07XG52YXIgTm9kZVR5cGUgPSB7XG4gIEFuY2hvcjogJ0EnLFxuICBCdXR0b246ICdCVVRUT04nLFxuICBDYW52YXM6ICdDQU5WQVMnLFxuICBJbnB1dDogJ0lOUFVUJyxcbiAgT3B0aW9uOiAnT1BUSU9OJyxcbiAgVGV4dGFyZWE6ICdURVhUQVJFQScsXG4gIFNlbGVjdDogJ1NFTEVDVCdcbn07XG5mdW5jdGlvbiBjbG9uZU5vZGUobm9kZSkge1xuICB2YXIgc2VsZWN0b3IgPSAnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIGNhbnZhcywgW2NvbnRlbnRlZGl0YWJsZV0nO1xuICB2YXIgZmllbGRzID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgdmFyIGNsb25lZE5vZGUgPSBub2RlLmNsb25lTm9kZSh0cnVlKTtcblxuICB2YXIgY2xvbmVkRmllbGRzID0gX3RvQ29uc3VtYWJsZUFycmF5KGNsb25lZE5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuXG4gIGNsb25lZEZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCwgaSkge1xuICAgIGlmIChmaWVsZC50eXBlICE9PSAnZmlsZScpIHtcbiAgICAgIGZpZWxkLnZhbHVlID0gZmllbGRzW2ldLnZhbHVlO1xuICAgIH1cblxuICAgIGlmIChmaWVsZC50eXBlID09PSAncmFkaW8nICYmIGZpZWxkLm5hbWUpIHtcbiAgICAgIGZpZWxkLm5hbWUgPSBcIl9fc29ydGFibGVDbG9uZV9fXCIuY29uY2F0KGZpZWxkLm5hbWUpO1xuICAgIH1cblxuICAgIGlmIChmaWVsZC50YWdOYW1lID09PSBOb2RlVHlwZS5DYW52YXMgJiYgZmllbGRzW2ldLndpZHRoID4gMCAmJiBmaWVsZHNbaV0uaGVpZ2h0ID4gMCkge1xuICAgICAgdmFyIGRlc3RDdHggPSBmaWVsZC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgZGVzdEN0eC5kcmF3SW1hZ2UoZmllbGRzW2ldLCAwLCAwKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY2xvbmVkTm9kZTtcbn1cblxuZnVuY3Rpb24gc29ydGFibGVIYW5kbGUoV3JhcHBlZENvbXBvbmVudCkge1xuICB2YXIgX2NsYXNzLCBfdGVtcDtcblxuICB2YXIgY29uZmlnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7XG4gICAgd2l0aFJlZjogZmFsc2VcbiAgfTtcbiAgcmV0dXJuIF90ZW1wID0gX2NsYXNzID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoV2l0aFNvcnRhYmxlSGFuZGxlLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFdpdGhTb3J0YWJsZUhhbmRsZSgpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXaXRoU29ydGFibGVIYW5kbGUpO1xuXG4gICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKFdpdGhTb3J0YWJsZUhhbmRsZSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFdpdGhTb3J0YWJsZUhhbmRsZSwgW3tcbiAgICAgIGtleTogXCJjb21wb25lbnREaWRNb3VudFwiLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB2YXIgbm9kZSA9IGZpbmRET01Ob2RlKHRoaXMpO1xuICAgICAgICBub2RlLnNvcnRhYmxlSGFuZGxlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6IFwiZ2V0V3JhcHBlZEluc3RhbmNlXCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0V3JhcHBlZEluc3RhbmNlKCkge1xuICAgICAgICBpbnZhcmlhbnQoY29uZmlnLndpdGhSZWYsICdUbyBhY2Nlc3MgdGhlIHdyYXBwZWQgaW5zdGFuY2UsIHlvdSBuZWVkIHRvIHBhc3MgaW4ge3dpdGhSZWY6IHRydWV9IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgb2YgdGhlIFNvcnRhYmxlSGFuZGxlKCkgY2FsbCcpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzLndyYXBwZWRJbnN0YW5jZTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgcmVmID0gY29uZmlnLndpdGhSZWYgPyAnd3JhcHBlZEluc3RhbmNlJyA6IG51bGw7XG4gICAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFdyYXBwZWRDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICAgICAgICByZWY6IHJlZlxuICAgICAgICB9LCB0aGlzLnByb3BzKSk7XG4gICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFdpdGhTb3J0YWJsZUhhbmRsZTtcbiAgfShDb21wb25lbnQpLCBfZGVmaW5lUHJvcGVydHkoX2NsYXNzLCBcImRpc3BsYXlOYW1lXCIsIHByb3ZpZGVEaXNwbGF5TmFtZSgnc29ydGFibGVIYW5kbGUnLCBXcmFwcGVkQ29tcG9uZW50KSksIF90ZW1wO1xufVxuZnVuY3Rpb24gaXNTb3J0YWJsZUhhbmRsZShub2RlKSB7XG4gIHJldHVybiBub2RlLnNvcnRhYmxlSGFuZGxlICE9IG51bGw7XG59XG5cbnZhciBBdXRvU2Nyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEF1dG9TY3JvbGxlcihjb250YWluZXIsIG9uU2Nyb2xsQ2FsbGJhY2spIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXV0b1Njcm9sbGVyKTtcblxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMub25TY3JvbGxDYWxsYmFjayA9IG9uU2Nyb2xsQ2FsbGJhY2s7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQXV0b1Njcm9sbGVyLCBbe1xuICAgIGtleTogXCJjbGVhclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIGlmICh0aGlzLmludGVydmFsID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoX3JlZikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIHRyYW5zbGF0ZSA9IF9yZWYudHJhbnNsYXRlLFxuICAgICAgICAgIG1pblRyYW5zbGF0ZSA9IF9yZWYubWluVHJhbnNsYXRlLFxuICAgICAgICAgIG1heFRyYW5zbGF0ZSA9IF9yZWYubWF4VHJhbnNsYXRlLFxuICAgICAgICAgIHdpZHRoID0gX3JlZi53aWR0aCxcbiAgICAgICAgICBoZWlnaHQgPSBfcmVmLmhlaWdodDtcbiAgICAgIHZhciBkaXJlY3Rpb24gPSB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH07XG4gICAgICB2YXIgc3BlZWQgPSB7XG4gICAgICAgIHg6IDEsXG4gICAgICAgIHk6IDFcbiAgICAgIH07XG4gICAgICB2YXIgYWNjZWxlcmF0aW9uID0ge1xuICAgICAgICB4OiAxMCxcbiAgICAgICAgeTogMTBcbiAgICAgIH07XG4gICAgICB2YXIgX3RoaXMkY29udGFpbmVyID0gdGhpcy5jb250YWluZXIsXG4gICAgICAgICAgc2Nyb2xsVG9wID0gX3RoaXMkY29udGFpbmVyLnNjcm9sbFRvcCxcbiAgICAgICAgICBzY3JvbGxMZWZ0ID0gX3RoaXMkY29udGFpbmVyLnNjcm9sbExlZnQsXG4gICAgICAgICAgc2Nyb2xsSGVpZ2h0ID0gX3RoaXMkY29udGFpbmVyLnNjcm9sbEhlaWdodCxcbiAgICAgICAgICBzY3JvbGxXaWR0aCA9IF90aGlzJGNvbnRhaW5lci5zY3JvbGxXaWR0aCxcbiAgICAgICAgICBjbGllbnRIZWlnaHQgPSBfdGhpcyRjb250YWluZXIuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgIGNsaWVudFdpZHRoID0gX3RoaXMkY29udGFpbmVyLmNsaWVudFdpZHRoO1xuICAgICAgdmFyIGlzVG9wID0gc2Nyb2xsVG9wID09PSAwO1xuICAgICAgdmFyIGlzQm90dG9tID0gc2Nyb2xsSGVpZ2h0IC0gc2Nyb2xsVG9wIC0gY2xpZW50SGVpZ2h0ID09PSAwO1xuICAgICAgdmFyIGlzTGVmdCA9IHNjcm9sbExlZnQgPT09IDA7XG4gICAgICB2YXIgaXNSaWdodCA9IHNjcm9sbFdpZHRoIC0gc2Nyb2xsTGVmdCAtIGNsaWVudFdpZHRoID09PSAwO1xuXG4gICAgICBpZiAodHJhbnNsYXRlLnkgPj0gbWF4VHJhbnNsYXRlLnkgLSBoZWlnaHQgLyAyICYmICFpc0JvdHRvbSkge1xuICAgICAgICBkaXJlY3Rpb24ueSA9IDE7XG4gICAgICAgIHNwZWVkLnkgPSBhY2NlbGVyYXRpb24ueSAqIE1hdGguYWJzKChtYXhUcmFuc2xhdGUueSAtIGhlaWdodCAvIDIgLSB0cmFuc2xhdGUueSkgLyBoZWlnaHQpO1xuICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGUueCA+PSBtYXhUcmFuc2xhdGUueCAtIHdpZHRoIC8gMiAmJiAhaXNSaWdodCkge1xuICAgICAgICBkaXJlY3Rpb24ueCA9IDE7XG4gICAgICAgIHNwZWVkLnggPSBhY2NlbGVyYXRpb24ueCAqIE1hdGguYWJzKChtYXhUcmFuc2xhdGUueCAtIHdpZHRoIC8gMiAtIHRyYW5zbGF0ZS54KSAvIHdpZHRoKTtcbiAgICAgIH0gZWxzZSBpZiAodHJhbnNsYXRlLnkgPD0gbWluVHJhbnNsYXRlLnkgKyBoZWlnaHQgLyAyICYmICFpc1RvcCkge1xuICAgICAgICBkaXJlY3Rpb24ueSA9IC0xO1xuICAgICAgICBzcGVlZC55ID0gYWNjZWxlcmF0aW9uLnkgKiBNYXRoLmFicygodHJhbnNsYXRlLnkgLSBoZWlnaHQgLyAyIC0gbWluVHJhbnNsYXRlLnkpIC8gaGVpZ2h0KTtcbiAgICAgIH0gZWxzZSBpZiAodHJhbnNsYXRlLnggPD0gbWluVHJhbnNsYXRlLnggKyB3aWR0aCAvIDIgJiYgIWlzTGVmdCkge1xuICAgICAgICBkaXJlY3Rpb24ueCA9IC0xO1xuICAgICAgICBzcGVlZC54ID0gYWNjZWxlcmF0aW9uLnggKiBNYXRoLmFicygodHJhbnNsYXRlLnggLSB3aWR0aCAvIDIgLSBtaW5UcmFuc2xhdGUueCkgLyB3aWR0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmludGVydmFsKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5pc0F1dG9TY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRpcmVjdGlvbi54ICE9PSAwIHx8IGRpcmVjdGlvbi55ICE9PSAwKSB7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuaXNBdXRvU2Nyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgb2Zmc2V0ID0ge1xuICAgICAgICAgICAgbGVmdDogc3BlZWQueCAqIGRpcmVjdGlvbi54LFxuICAgICAgICAgICAgdG9wOiBzcGVlZC55ICogZGlyZWN0aW9uLnlcbiAgICAgICAgICB9O1xuICAgICAgICAgIF90aGlzLmNvbnRhaW5lci5zY3JvbGxUb3AgKz0gb2Zmc2V0LnRvcDtcbiAgICAgICAgICBfdGhpcy5jb250YWluZXIuc2Nyb2xsTGVmdCArPSBvZmZzZXQubGVmdDtcblxuICAgICAgICAgIF90aGlzLm9uU2Nyb2xsQ2FsbGJhY2sob2Zmc2V0KTtcbiAgICAgICAgfSwgNSk7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEF1dG9TY3JvbGxlcjtcbn0oKTtcblxuZnVuY3Rpb24gZGVmYXVsdEdldEhlbHBlckRpbWVuc2lvbnMoX3JlZikge1xuICB2YXIgbm9kZSA9IF9yZWYubm9kZTtcbiAgcmV0dXJuIHtcbiAgICBoZWlnaHQ6IG5vZGUub2Zmc2V0SGVpZ2h0LFxuICAgIHdpZHRoOiBub2RlLm9mZnNldFdpZHRoXG4gIH07XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRTaG91bGRDYW5jZWxTdGFydChldmVudCkge1xuICB2YXIgaW50ZXJhY3RpdmVFbGVtZW50cyA9IFtOb2RlVHlwZS5JbnB1dCwgTm9kZVR5cGUuVGV4dGFyZWEsIE5vZGVUeXBlLlNlbGVjdCwgTm9kZVR5cGUuT3B0aW9uLCBOb2RlVHlwZS5CdXR0b25dO1xuXG4gIGlmIChpbnRlcmFjdGl2ZUVsZW1lbnRzLmluZGV4T2YoZXZlbnQudGFyZ2V0LnRhZ05hbWUpICE9PSAtMSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKGNsb3Nlc3QoZXZlbnQudGFyZ2V0LCBmdW5jdGlvbiAoZWwpIHtcbiAgICByZXR1cm4gZWwuY29udGVudEVkaXRhYmxlID09PSAndHJ1ZSc7XG4gIH0pKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbnZhciBwcm9wVHlwZXMgPSB7XG4gIGF4aXM6IFByb3BUeXBlcy5vbmVPZihbJ3gnLCAneScsICd4eSddKSxcbiAgY29udGVudFdpbmRvdzogUHJvcFR5cGVzLmFueSxcbiAgZGlzYWJsZUF1dG9zY3JvbGw6IFByb3BUeXBlcy5ib29sLFxuICBkaXN0YW5jZTogUHJvcFR5cGVzLm51bWJlcixcbiAgZ2V0Q29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0SGVscGVyRGltZW5zaW9uczogUHJvcFR5cGVzLmZ1bmMsXG4gIGhlbHBlckNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBoZWxwZXJDb250YWluZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCB0eXBlb2YgSFRNTEVsZW1lbnQgPT09ICd1bmRlZmluZWQnID8gUHJvcFR5cGVzLmFueSA6IFByb3BUeXBlcy5pbnN0YW5jZU9mKEhUTUxFbGVtZW50KV0pLFxuICBoaWRlU29ydGFibGVHaG9zdDogUHJvcFR5cGVzLmJvb2wsXG4gIGtleWJvYXJkU29ydGluZ1RyYW5zaXRpb25EdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcbiAgbG9ja0F4aXM6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGxvY2tPZmZzZXQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKSldKSxcbiAgbG9ja1RvQ29udGFpbmVyRWRnZXM6IFByb3BUeXBlcy5ib29sLFxuICBvblNvcnRFbmQ6IFByb3BUeXBlcy5mdW5jLFxuICBvblNvcnRNb3ZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25Tb3J0T3ZlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU29ydFN0YXJ0OiBQcm9wVHlwZXMuZnVuYyxcbiAgcHJlc3NEZWxheTogUHJvcFR5cGVzLm51bWJlcixcbiAgcHJlc3NUaHJlc2hvbGQ6IFByb3BUeXBlcy5udW1iZXIsXG4gIGtleUNvZGVzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGxpZnQ6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxuICAgIGRyb3A6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxuICAgIGNhbmNlbDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXG4gICAgdXA6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxuICAgIGRvd246IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpXG4gIH0pLFxuICBzaG91bGRDYW5jZWxTdGFydDogUHJvcFR5cGVzLmZ1bmMsXG4gIHRyYW5zaXRpb25EdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcbiAgdXBkYXRlQmVmb3JlU29ydFN0YXJ0OiBQcm9wVHlwZXMuZnVuYyxcbiAgdXNlRHJhZ0hhbmRsZTogUHJvcFR5cGVzLmJvb2wsXG4gIHVzZVdpbmRvd0FzU2Nyb2xsQ29udGFpbmVyOiBQcm9wVHlwZXMuYm9vbFxufTtcbnZhciBkZWZhdWx0S2V5Q29kZXMgPSB7XG4gIGxpZnQ6IFtLRVlDT0RFLlNQQUNFXSxcbiAgZHJvcDogW0tFWUNPREUuU1BBQ0VdLFxuICBjYW5jZWw6IFtLRVlDT0RFLkVTQ10sXG4gIHVwOiBbS0VZQ09ERS5VUCwgS0VZQ09ERS5MRUZUXSxcbiAgZG93bjogW0tFWUNPREUuRE9XTiwgS0VZQ09ERS5SSUdIVF1cbn07XG52YXIgZGVmYXVsdFByb3BzID0ge1xuICBheGlzOiAneScsXG4gIGRpc2FibGVBdXRvc2Nyb2xsOiBmYWxzZSxcbiAgZGlzdGFuY2U6IDAsXG4gIGdldEhlbHBlckRpbWVuc2lvbnM6IGRlZmF1bHRHZXRIZWxwZXJEaW1lbnNpb25zLFxuICBoaWRlU29ydGFibGVHaG9zdDogdHJ1ZSxcbiAgbG9ja09mZnNldDogJzUwJScsXG4gIGxvY2tUb0NvbnRhaW5lckVkZ2VzOiBmYWxzZSxcbiAgcHJlc3NEZWxheTogMCxcbiAgcHJlc3NUaHJlc2hvbGQ6IDUsXG4gIGtleUNvZGVzOiBkZWZhdWx0S2V5Q29kZXMsXG4gIHNob3VsZENhbmNlbFN0YXJ0OiBkZWZhdWx0U2hvdWxkQ2FuY2VsU3RhcnQsXG4gIHRyYW5zaXRpb25EdXJhdGlvbjogMzAwLFxuICB1c2VXaW5kb3dBc1Njcm9sbENvbnRhaW5lcjogZmFsc2Vcbn07XG52YXIgb21pdHRlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcFR5cGVzKTtcbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcHMocHJvcHMpIHtcbiAgaW52YXJpYW50KCEocHJvcHMuZGlzdGFuY2UgJiYgcHJvcHMucHJlc3NEZWxheSksICdBdHRlbXB0ZWQgdG8gc2V0IGJvdGggYHByZXNzRGVsYXlgIGFuZCBgZGlzdGFuY2VgIG9uIFNvcnRhYmxlQ29udGFpbmVyLCB5b3UgbWF5IG9ubHkgdXNlIG9uZSBvciB0aGUgb3RoZXIsIG5vdCBib3RoIGF0IHRoZSBzYW1lIHRpbWUuJyk7XG59XG5cbmZ1bmN0aW9uIF9maW5hbGx5UmV0aHJvd3MoYm9keSwgZmluYWxpemVyKSB7XG4gIHRyeSB7XG4gICAgdmFyIHJlc3VsdCA9IGJvZHkoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmaW5hbGl6ZXIodHJ1ZSwgZSk7XG4gIH1cblxuICBpZiAocmVzdWx0ICYmIHJlc3VsdC50aGVuKSB7XG4gICAgcmV0dXJuIHJlc3VsdC50aGVuKGZpbmFsaXplci5iaW5kKG51bGwsIGZhbHNlKSwgZmluYWxpemVyLmJpbmQobnVsbCwgdHJ1ZSkpO1xuICB9XG5cbiAgcmV0dXJuIGZpbmFsaXplcihmYWxzZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gc29ydGFibGVDb250YWluZXIoV3JhcHBlZENvbXBvbmVudCkge1xuICB2YXIgX2NsYXNzLCBfdGVtcDtcblxuICB2YXIgY29uZmlnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7XG4gICAgd2l0aFJlZjogZmFsc2VcbiAgfTtcbiAgcmV0dXJuIF90ZW1wID0gX2NsYXNzID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoV2l0aFNvcnRhYmxlQ29udGFpbmVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFdpdGhTb3J0YWJsZUNvbnRhaW5lcihwcm9wcykge1xuICAgICAgdmFyIF90aGlzO1xuXG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2l0aFNvcnRhYmxlQ29udGFpbmVyKTtcblxuICAgICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoV2l0aFNvcnRhYmxlQ29udGFpbmVyKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSwgXCJzdGF0ZVwiLCB7fSk7XG5cbiAgICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSwgXCJoYW5kbGVTdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgICBkaXN0YW5jZSA9IF90aGlzJHByb3BzLmRpc3RhbmNlLFxuICAgICAgICAgICAgc2hvdWxkQ2FuY2VsU3RhcnQgPSBfdGhpcyRwcm9wcy5zaG91bGRDYW5jZWxTdGFydDtcblxuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAyIHx8IHNob3VsZENhbmNlbFN0YXJ0KGV2ZW50KSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzLnRvdWNoZWQgPSB0cnVlO1xuICAgICAgICBfdGhpcy5wb3NpdGlvbiA9IGdldFBvc2l0aW9uKGV2ZW50KTtcbiAgICAgICAgdmFyIG5vZGUgPSBjbG9zZXN0KGV2ZW50LnRhcmdldCwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgcmV0dXJuIGVsLnNvcnRhYmxlSW5mbyAhPSBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobm9kZSAmJiBub2RlLnNvcnRhYmxlSW5mbyAmJiBfdGhpcy5ub2RlSXNDaGlsZChub2RlKSAmJiAhX3RoaXMuc3RhdGUuc29ydGluZykge1xuICAgICAgICAgIHZhciB1c2VEcmFnSGFuZGxlID0gX3RoaXMucHJvcHMudXNlRHJhZ0hhbmRsZTtcbiAgICAgICAgICB2YXIgX25vZGUkc29ydGFibGVJbmZvID0gbm9kZS5zb3J0YWJsZUluZm8sXG4gICAgICAgICAgICAgIGluZGV4ID0gX25vZGUkc29ydGFibGVJbmZvLmluZGV4LFxuICAgICAgICAgICAgICBjb2xsZWN0aW9uID0gX25vZGUkc29ydGFibGVJbmZvLmNvbGxlY3Rpb24sXG4gICAgICAgICAgICAgIGRpc2FibGVkID0gX25vZGUkc29ydGFibGVJbmZvLmRpc2FibGVkO1xuXG4gICAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHVzZURyYWdIYW5kbGUgJiYgIWNsb3Nlc3QoZXZlbnQudGFyZ2V0LCBpc1NvcnRhYmxlSGFuZGxlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF90aGlzLm1hbmFnZXIuYWN0aXZlID0ge1xuICAgICAgICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvbixcbiAgICAgICAgICAgIGluZGV4OiBpbmRleFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoIWlzVG91Y2hFdmVudChldmVudCkgJiYgZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09IE5vZGVUeXBlLkFuY2hvcikge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWRpc3RhbmNlKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMucHJvcHMucHJlc3NEZWxheSA9PT0gMCkge1xuICAgICAgICAgICAgICBfdGhpcy5oYW5kbGVQcmVzcyhldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfdGhpcy5wcmVzc1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmhhbmRsZVByZXNzKGV2ZW50KTtcbiAgICAgICAgICAgICAgfSwgX3RoaXMucHJvcHMucHJlc3NEZWxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpLCBcIm5vZGVJc0NoaWxkXCIsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHJldHVybiBub2RlLnNvcnRhYmxlSW5mby5tYW5hZ2VyID09PSBfdGhpcy5tYW5hZ2VyO1xuICAgICAgfSk7XG5cbiAgICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSwgXCJoYW5kbGVNb3ZlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMkcHJvcHMyID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgICBkaXN0YW5jZSA9IF90aGlzJHByb3BzMi5kaXN0YW5jZSxcbiAgICAgICAgICAgIHByZXNzVGhyZXNob2xkID0gX3RoaXMkcHJvcHMyLnByZXNzVGhyZXNob2xkO1xuXG4gICAgICAgIGlmICghX3RoaXMuc3RhdGUuc29ydGluZyAmJiBfdGhpcy50b3VjaGVkICYmICFfdGhpcy5fYXdhaXRpbmdVcGRhdGVCZWZvcmVTb3J0U3RhcnQpIHtcbiAgICAgICAgICB2YXIgcG9zaXRpb24gPSBnZXRQb3NpdGlvbihldmVudCk7XG4gICAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgeDogX3RoaXMucG9zaXRpb24ueCAtIHBvc2l0aW9uLngsXG4gICAgICAgICAgICB5OiBfdGhpcy5wb3NpdGlvbi55IC0gcG9zaXRpb24ueVxuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIGNvbWJpbmVkRGVsdGEgPSBNYXRoLmFicyhkZWx0YS54KSArIE1hdGguYWJzKGRlbHRhLnkpO1xuICAgICAgICAgIF90aGlzLmRlbHRhID0gZGVsdGE7XG5cbiAgICAgICAgICBpZiAoIWRpc3RhbmNlICYmICghcHJlc3NUaHJlc2hvbGQgfHwgY29tYmluZWREZWx0YSA+PSBwcmVzc1RocmVzaG9sZCkpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGhpcy5jYW5jZWxUaW1lcik7XG4gICAgICAgICAgICBfdGhpcy5jYW5jZWxUaW1lciA9IHNldFRpbWVvdXQoX3RoaXMuY2FuY2VsLCAwKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGRpc3RhbmNlICYmIGNvbWJpbmVkRGVsdGEgPj0gZGlzdGFuY2UgJiYgX3RoaXMubWFuYWdlci5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICBfdGhpcy5oYW5kbGVQcmVzcyhldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpLCBcImhhbmRsZUVuZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzLnRvdWNoZWQgPSBmYWxzZTtcblxuICAgICAgICBfdGhpcy5jYW5jZWwoKTtcbiAgICAgIH0pO1xuXG4gICAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSksIFwiY2FuY2VsXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gX3RoaXMucHJvcHMuZGlzdGFuY2U7XG4gICAgICAgIHZhciBzb3J0aW5nID0gX3RoaXMuc3RhdGUuc29ydGluZztcblxuICAgICAgICBpZiAoIXNvcnRpbmcpIHtcbiAgICAgICAgICBpZiAoIWRpc3RhbmNlKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMucHJlc3NUaW1lcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXMubWFuYWdlci5hY3RpdmUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpLCBcImhhbmRsZVByZXNzXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBhY3RpdmUgPSBfdGhpcy5tYW5hZ2VyLmdldEFjdGl2ZSgpO1xuXG4gICAgICAgICAgdmFyIF90ZW1wNiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICAgICAgdmFyIF90ZW1wNyA9IGZ1bmN0aW9uIF90ZW1wNygpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBfbm9kZS5zb3J0YWJsZUluZm8uaW5kZXg7XG4gICAgICAgICAgICAgICAgdmFyIG1hcmdpbiA9IGdldEVsZW1lbnRNYXJnaW4oX25vZGUpO1xuICAgICAgICAgICAgICAgIHZhciBncmlkR2FwID0gZ2V0Q29udGFpbmVyR3JpZEdhcChfdGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lckJvdW5kaW5nUmVjdCA9IF90aGlzLnNjcm9sbENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgICAgIHZhciBkaW1lbnNpb25zID0gX2dldEhlbHBlckRpbWVuc2lvbnMoe1xuICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgbm9kZTogX25vZGUsXG4gICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uOiBfY29sbGVjdGlvblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMubm9kZSA9IF9ub2RlO1xuICAgICAgICAgICAgICAgIF90aGlzLm1hcmdpbiA9IG1hcmdpbjtcbiAgICAgICAgICAgICAgICBfdGhpcy5ncmlkR2FwID0gZ3JpZEdhcDtcbiAgICAgICAgICAgICAgICBfdGhpcy53aWR0aCA9IGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGVpZ2h0ID0gZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgX3RoaXMubWFyZ2luT2Zmc2V0ID0ge1xuICAgICAgICAgICAgICAgICAgeDogX3RoaXMubWFyZ2luLmxlZnQgKyBfdGhpcy5tYXJnaW4ucmlnaHQgKyBfdGhpcy5ncmlkR2FwLngsXG4gICAgICAgICAgICAgICAgICB5OiBNYXRoLm1heChfdGhpcy5tYXJnaW4udG9wLCBfdGhpcy5tYXJnaW4uYm90dG9tLCBfdGhpcy5ncmlkR2FwLnkpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBfdGhpcy5ib3VuZGluZ0NsaWVudFJlY3QgPSBfbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5jb250YWluZXJCb3VuZGluZ1JlY3QgPSBjb250YWluZXJCb3VuZGluZ1JlY3Q7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICBfdGhpcy5uZXdJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIF90aGlzLmF4aXMgPSB7XG4gICAgICAgICAgICAgICAgICB4OiBfYXhpcy5pbmRleE9mKCd4JykgPj0gMCxcbiAgICAgICAgICAgICAgICAgIHk6IF9heGlzLmluZGV4T2YoJ3knKSA+PSAwXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBfdGhpcy5vZmZzZXRFZGdlID0gZ2V0RWRnZU9mZnNldChfbm9kZSwgX3RoaXMuY29udGFpbmVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChfaXNLZXlTb3J0aW5nKSB7XG4gICAgICAgICAgICAgICAgICBfdGhpcy5pbml0aWFsT2Zmc2V0ID0gZ2V0UG9zaXRpb24oX29iamVjdFNwcmVhZCh7fSwgZXZlbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZVg6IF90aGlzLmJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICBwYWdlWTogX3RoaXMuYm91bmRpbmdDbGllbnRSZWN0LnRvcFxuICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBfdGhpcy5pbml0aWFsT2Zmc2V0ID0gZ2V0UG9zaXRpb24oZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF90aGlzLmluaXRpYWxTY3JvbGwgPSB7XG4gICAgICAgICAgICAgICAgICBsZWZ0OiBfdGhpcy5zY3JvbGxDb250YWluZXIuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICAgIHRvcDogX3RoaXMuc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5pdGlhbFdpbmRvd1Njcm9sbCA9IHtcbiAgICAgICAgICAgICAgICAgIGxlZnQ6IHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgICAgIHRvcDogd2luZG93LnBhZ2VZT2Zmc2V0XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBfdGhpcy5oZWxwZXIgPSBfdGhpcy5oZWxwZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvbmVOb2RlKF9ub2RlKSk7XG4gICAgICAgICAgICAgICAgc2V0SW5saW5lU3R5bGVzKF90aGlzLmhlbHBlciwge1xuICAgICAgICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiXCIuY29uY2F0KF90aGlzLmhlaWdodCwgXCJweFwiKSxcbiAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiXCIuY29uY2F0KF90aGlzLmJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0IC0gbWFyZ2luLmxlZnQsIFwicHhcIiksXG4gICAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICAgICAgICAgIHRvcDogXCJcIi5jb25jYXQoX3RoaXMuYm91bmRpbmdDbGllbnRSZWN0LnRvcCAtIG1hcmdpbi50b3AsIFwicHhcIiksXG4gICAgICAgICAgICAgICAgICB3aWR0aDogXCJcIi5jb25jYXQoX3RoaXMud2lkdGgsIFwicHhcIilcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChfaXNLZXlTb3J0aW5nKSB7XG4gICAgICAgICAgICAgICAgICBfdGhpcy5oZWxwZXIuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoX2hpZGVTb3J0YWJsZUdob3N0KSB7XG4gICAgICAgICAgICAgICAgICBfdGhpcy5zb3J0YWJsZUdob3N0ID0gX25vZGU7XG4gICAgICAgICAgICAgICAgICBzZXRJbmxpbmVTdHlsZXMoX25vZGUsIHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbidcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF90aGlzLm1pblRyYW5zbGF0ZSA9IHt9O1xuICAgICAgICAgICAgICAgIF90aGlzLm1heFRyYW5zbGF0ZSA9IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKF9pc0tleVNvcnRpbmcpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVmID0gX3VzZVdpbmRvd0FzU2Nyb2xsQ29udGFpbmVyID8ge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBfdGhpcy5jb250ZW50V2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogX3RoaXMuY29udGVudFdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgICAgICAgfSA6IF90aGlzLmNvbnRhaW5lckJvdW5kaW5nUmVjdCxcbiAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXJUb3AgPSBfcmVmLnRvcCxcbiAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXJMZWZ0ID0gX3JlZi5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcldpZHRoID0gX3JlZi53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXJIZWlnaHQgPSBfcmVmLmhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lckJvdHRvbSA9IGNvbnRhaW5lclRvcCArIGNvbnRhaW5lckhlaWdodDtcbiAgICAgICAgICAgICAgICAgIHZhciBjb250YWluZXJSaWdodCA9IGNvbnRhaW5lckxlZnQgKyBjb250YWluZXJXaWR0aDtcblxuICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5taW5UcmFuc2xhdGUueCA9IGNvbnRhaW5lckxlZnQgLSBfdGhpcy5ib3VuZGluZ0NsaWVudFJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubWF4VHJhbnNsYXRlLnggPSBjb250YWluZXJSaWdodCAtIChfdGhpcy5ib3VuZGluZ0NsaWVudFJlY3QubGVmdCArIF90aGlzLndpZHRoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5taW5UcmFuc2xhdGUueSA9IGNvbnRhaW5lclRvcCAtIF90aGlzLmJvdW5kaW5nQ2xpZW50UmVjdC50b3A7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1heFRyYW5zbGF0ZS55ID0gY29udGFpbmVyQm90dG9tIC0gKF90aGlzLmJvdW5kaW5nQ2xpZW50UmVjdC50b3AgKyBfdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy54KSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1pblRyYW5zbGF0ZS54ID0gKF91c2VXaW5kb3dBc1Njcm9sbENvbnRhaW5lciA/IDAgOiBjb250YWluZXJCb3VuZGluZ1JlY3QubGVmdCkgLSBfdGhpcy5ib3VuZGluZ0NsaWVudFJlY3QubGVmdCAtIF90aGlzLndpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubWF4VHJhbnNsYXRlLnggPSAoX3VzZVdpbmRvd0FzU2Nyb2xsQ29udGFpbmVyID8gX3RoaXMuY29udGVudFdpbmRvdy5pbm5lcldpZHRoIDogY29udGFpbmVyQm91bmRpbmdSZWN0LmxlZnQgKyBjb250YWluZXJCb3VuZGluZ1JlY3Qud2lkdGgpIC0gX3RoaXMuYm91bmRpbmdDbGllbnRSZWN0LmxlZnQgLSBfdGhpcy53aWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubWluVHJhbnNsYXRlLnkgPSAoX3VzZVdpbmRvd0FzU2Nyb2xsQ29udGFpbmVyID8gMCA6IGNvbnRhaW5lckJvdW5kaW5nUmVjdC50b3ApIC0gX3RoaXMuYm91bmRpbmdDbGllbnRSZWN0LnRvcCAtIF90aGlzLmhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1heFRyYW5zbGF0ZS55ID0gKF91c2VXaW5kb3dBc1Njcm9sbENvbnRhaW5lciA/IF90aGlzLmNvbnRlbnRXaW5kb3cuaW5uZXJIZWlnaHQgOiBjb250YWluZXJCb3VuZGluZ1JlY3QudG9wICsgY29udGFpbmVyQm91bmRpbmdSZWN0LmhlaWdodCkgLSBfdGhpcy5ib3VuZGluZ0NsaWVudFJlY3QudG9wIC0gX3RoaXMuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoX2hlbHBlckNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICBfaGVscGVyQ2xhc3Muc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmhlbHBlci5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfdGhpcy5saXN0ZW5lck5vZGUgPSBldmVudC50b3VjaGVzID8gX25vZGUgOiBfdGhpcy5jb250ZW50V2luZG93O1xuXG4gICAgICAgICAgICAgICAgaWYgKF9pc0tleVNvcnRpbmcpIHtcbiAgICAgICAgICAgICAgICAgIF90aGlzLmxpc3RlbmVyTm9kZS5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIF90aGlzLmhhbmRsZUtleUVuZCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgIF90aGlzLmxpc3RlbmVyTm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBfdGhpcy5oYW5kbGVLZXlFbmQsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICBfdGhpcy5saXN0ZW5lck5vZGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIF90aGlzLmhhbmRsZUtleURvd24pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBldmVudHMubW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmxpc3RlbmVyTm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgX3RoaXMuaGFuZGxlU29ydE1vdmUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgZXZlbnRzLmVuZC5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmxpc3RlbmVyTm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgX3RoaXMuaGFuZGxlU29ydEVuZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgc29ydGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIHNvcnRpbmdJbmRleDogaW5kZXhcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChfb25Tb3J0U3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgIF9vblNvcnRTdGFydCh7XG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IF9ub2RlLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb246IF9jb2xsZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBpc0tleVNvcnRpbmc6IF9pc0tleVNvcnRpbmcsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVzOiBfdGhpcy5tYW5hZ2VyLmdldE9yZGVyZWRSZWZzKCksXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcjogX3RoaXMuaGVscGVyXG4gICAgICAgICAgICAgICAgICB9LCBldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF9pc0tleVNvcnRpbmcpIHtcbiAgICAgICAgICAgICAgICAgIF90aGlzLmtleU1vdmUoMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIHZhciBfdGhpcyRwcm9wczMgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICAgICAgICAgIF9heGlzID0gX3RoaXMkcHJvcHMzLmF4aXMsXG4gICAgICAgICAgICAgICAgICBfZ2V0SGVscGVyRGltZW5zaW9ucyA9IF90aGlzJHByb3BzMy5nZXRIZWxwZXJEaW1lbnNpb25zLFxuICAgICAgICAgICAgICAgICAgX2hlbHBlckNsYXNzID0gX3RoaXMkcHJvcHMzLmhlbHBlckNsYXNzLFxuICAgICAgICAgICAgICAgICAgX2hpZGVTb3J0YWJsZUdob3N0ID0gX3RoaXMkcHJvcHMzLmhpZGVTb3J0YWJsZUdob3N0LFxuICAgICAgICAgICAgICAgICAgdXBkYXRlQmVmb3JlU29ydFN0YXJ0ID0gX3RoaXMkcHJvcHMzLnVwZGF0ZUJlZm9yZVNvcnRTdGFydCxcbiAgICAgICAgICAgICAgICAgIF9vblNvcnRTdGFydCA9IF90aGlzJHByb3BzMy5vblNvcnRTdGFydCxcbiAgICAgICAgICAgICAgICAgIF91c2VXaW5kb3dBc1Njcm9sbENvbnRhaW5lciA9IF90aGlzJHByb3BzMy51c2VXaW5kb3dBc1Njcm9sbENvbnRhaW5lcjtcbiAgICAgICAgICAgICAgdmFyIF9ub2RlID0gYWN0aXZlLm5vZGUsXG4gICAgICAgICAgICAgICAgICBfY29sbGVjdGlvbiA9IGFjdGl2ZS5jb2xsZWN0aW9uO1xuICAgICAgICAgICAgICB2YXIgX2lzS2V5U29ydGluZyA9IF90aGlzLm1hbmFnZXIuaXNLZXlTb3J0aW5nO1xuXG4gICAgICAgICAgICAgIHZhciBfdGVtcDggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB1cGRhdGVCZWZvcmVTb3J0U3RhcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgIF90aGlzLl9hd2FpdGluZ1VwZGF0ZUJlZm9yZVNvcnRTdGFydCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgIHZhciBfdGVtcDkgPSBfZmluYWxseVJldGhyb3dzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gX25vZGUuc29ydGFibGVJbmZvLmluZGV4O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVwZGF0ZUJlZm9yZVNvcnRTdGFydCh7XG4gICAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbjogX2NvbGxlY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgIG5vZGU6IF9ub2RlLFxuICAgICAgICAgICAgICAgICAgICAgIGlzS2V5U29ydGluZzogX2lzS2V5U29ydGluZ1xuICAgICAgICAgICAgICAgICAgICB9LCBldmVudCkpLnRoZW4oZnVuY3Rpb24gKCkge30pO1xuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKF93YXNUaHJvd24sIF9yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2F3YWl0aW5nVXBkYXRlQmVmb3JlU29ydFN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfd2FzVGhyb3duKSB0aHJvdyBfcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Jlc3VsdDtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoX3RlbXA5ICYmIF90ZW1wOS50aGVuKSByZXR1cm4gX3RlbXA5LnRoZW4oZnVuY3Rpb24gKCkge30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSgpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBfdGVtcDggJiYgX3RlbXA4LnRoZW4gPyBfdGVtcDgudGhlbihfdGVtcDcpIDogX3RlbXA3KF90ZW1wOCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSgpO1xuXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShfdGVtcDYgJiYgX3RlbXA2LnRoZW4gPyBfdGVtcDYudGhlbihmdW5jdGlvbiAoKSB7fSkgOiB2b2lkIDApO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpLCBcImhhbmRsZVNvcnRNb3ZlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgb25Tb3J0TW92ZSA9IF90aGlzLnByb3BzLm9uU29ydE1vdmU7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBldmVudC5wcmV2ZW50RGVmYXVsdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpcy51cGRhdGVIZWxwZXJQb3NpdGlvbihldmVudCk7XG5cbiAgICAgICAgX3RoaXMuYW5pbWF0ZU5vZGVzKCk7XG5cbiAgICAgICAgX3RoaXMuYXV0b3Njcm9sbCgpO1xuXG4gICAgICAgIGlmIChvblNvcnRNb3ZlKSB7XG4gICAgICAgICAgb25Tb3J0TW92ZShldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSksIFwiaGFuZGxlU29ydEVuZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIF90aGlzJHByb3BzNCA9IF90aGlzLnByb3BzLFxuICAgICAgICAgICAgaGlkZVNvcnRhYmxlR2hvc3QgPSBfdGhpcyRwcm9wczQuaGlkZVNvcnRhYmxlR2hvc3QsXG4gICAgICAgICAgICBvblNvcnRFbmQgPSBfdGhpcyRwcm9wczQub25Tb3J0RW5kO1xuICAgICAgICB2YXIgX3RoaXMkbWFuYWdlciA9IF90aGlzLm1hbmFnZXIsXG4gICAgICAgICAgICBjb2xsZWN0aW9uID0gX3RoaXMkbWFuYWdlci5hY3RpdmUuY29sbGVjdGlvbixcbiAgICAgICAgICAgIGlzS2V5U29ydGluZyA9IF90aGlzJG1hbmFnZXIuaXNLZXlTb3J0aW5nO1xuXG4gICAgICAgIHZhciBub2RlcyA9IF90aGlzLm1hbmFnZXIuZ2V0T3JkZXJlZFJlZnMoKTtcblxuICAgICAgICBpZiAoX3RoaXMubGlzdGVuZXJOb2RlKSB7XG4gICAgICAgICAgaWYgKGlzS2V5U29ydGluZykge1xuICAgICAgICAgICAgX3RoaXMubGlzdGVuZXJOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgX3RoaXMuaGFuZGxlS2V5RW5kLCB0cnVlKTtcblxuICAgICAgICAgICAgX3RoaXMubGlzdGVuZXJOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF90aGlzLmhhbmRsZUtleUVuZCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIF90aGlzLmxpc3RlbmVyTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgX3RoaXMuaGFuZGxlS2V5RG93bik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50cy5tb3ZlLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gX3RoaXMubGlzdGVuZXJOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBfdGhpcy5oYW5kbGVTb3J0TW92ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV2ZW50cy5lbmQuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpcy5saXN0ZW5lck5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIF90aGlzLmhhbmRsZVNvcnRFbmQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMuaGVscGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoX3RoaXMuaGVscGVyKTtcblxuICAgICAgICBpZiAoaGlkZVNvcnRhYmxlR2hvc3QgJiYgX3RoaXMuc29ydGFibGVHaG9zdCkge1xuICAgICAgICAgIHNldElubGluZVN0eWxlcyhfdGhpcy5zb3J0YWJsZUdob3N0LCB7XG4gICAgICAgICAgICBvcGFjaXR5OiAnJyxcbiAgICAgICAgICAgIHZpc2liaWxpdHk6ICcnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbm9kZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICB2YXIgX25vZGUyID0gbm9kZXNbaV07XG4gICAgICAgICAgdmFyIGVsID0gX25vZGUyLm5vZGU7XG4gICAgICAgICAgX25vZGUyLmVkZ2VPZmZzZXQgPSBudWxsO1xuICAgICAgICAgIF9ub2RlMi5ib3VuZGluZ0NsaWVudFJlY3QgPSBudWxsO1xuICAgICAgICAgIHNldFRyYW5zbGF0ZTNkKGVsLCBudWxsKTtcbiAgICAgICAgICBzZXRUcmFuc2l0aW9uRHVyYXRpb24oZWwsIG51bGwpO1xuICAgICAgICAgIF9ub2RlMi50cmFuc2xhdGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMuYXV0b1Njcm9sbGVyLmNsZWFyKCk7XG5cbiAgICAgICAgX3RoaXMubWFuYWdlci5hY3RpdmUgPSBudWxsO1xuICAgICAgICBfdGhpcy5tYW5hZ2VyLmlzS2V5U29ydGluZyA9IGZhbHNlO1xuXG4gICAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBzb3J0aW5nOiBmYWxzZSxcbiAgICAgICAgICBzb3J0aW5nSW5kZXg6IG51bGxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvblNvcnRFbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBvblNvcnRFbmQoe1xuICAgICAgICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvbixcbiAgICAgICAgICAgIG5ld0luZGV4OiBfdGhpcy5uZXdJbmRleCxcbiAgICAgICAgICAgIG9sZEluZGV4OiBfdGhpcy5pbmRleCxcbiAgICAgICAgICAgIGlzS2V5U29ydGluZzogaXNLZXlTb3J0aW5nLFxuICAgICAgICAgICAgbm9kZXM6IG5vZGVzXG4gICAgICAgICAgfSwgZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMudG91Y2hlZCA9IGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSwgXCJhdXRvc2Nyb2xsXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpc2FibGVBdXRvc2Nyb2xsID0gX3RoaXMucHJvcHMuZGlzYWJsZUF1dG9zY3JvbGw7XG4gICAgICAgIHZhciBpc0tleVNvcnRpbmcgPSBfdGhpcy5tYW5hZ2VyLmlzS2V5U29ydGluZztcblxuICAgICAgICBpZiAoZGlzYWJsZUF1dG9zY3JvbGwpIHtcbiAgICAgICAgICBfdGhpcy5hdXRvU2Nyb2xsZXIuY2xlYXIoKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0tleVNvcnRpbmcpIHtcbiAgICAgICAgICB2YXIgdHJhbnNsYXRlID0gX29iamVjdFNwcmVhZCh7fSwgX3RoaXMudHJhbnNsYXRlKTtcblxuICAgICAgICAgIHZhciBzY3JvbGxYID0gMDtcbiAgICAgICAgICB2YXIgc2Nyb2xsWSA9IDA7XG5cbiAgICAgICAgICBpZiAoX3RoaXMuYXhpcy54KSB7XG4gICAgICAgICAgICB0cmFuc2xhdGUueCA9IE1hdGgubWluKF90aGlzLm1heFRyYW5zbGF0ZS54LCBNYXRoLm1heChfdGhpcy5taW5UcmFuc2xhdGUueCwgX3RoaXMudHJhbnNsYXRlLngpKTtcbiAgICAgICAgICAgIHNjcm9sbFggPSBfdGhpcy50cmFuc2xhdGUueCAtIHRyYW5zbGF0ZS54O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfdGhpcy5heGlzLnkpIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZS55ID0gTWF0aC5taW4oX3RoaXMubWF4VHJhbnNsYXRlLnksIE1hdGgubWF4KF90aGlzLm1pblRyYW5zbGF0ZS55LCBfdGhpcy50cmFuc2xhdGUueSkpO1xuICAgICAgICAgICAgc2Nyb2xsWSA9IF90aGlzLnRyYW5zbGF0ZS55IC0gdHJhbnNsYXRlLnk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXMudHJhbnNsYXRlID0gdHJhbnNsYXRlO1xuICAgICAgICAgIHNldFRyYW5zbGF0ZTNkKF90aGlzLmhlbHBlciwgX3RoaXMudHJhbnNsYXRlKTtcbiAgICAgICAgICBfdGhpcy5zY3JvbGxDb250YWluZXIuc2Nyb2xsTGVmdCArPSBzY3JvbGxYO1xuICAgICAgICAgIF90aGlzLnNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AgKz0gc2Nyb2xsWTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpcy5hdXRvU2Nyb2xsZXIudXBkYXRlKHtcbiAgICAgICAgICBoZWlnaHQ6IF90aGlzLmhlaWdodCxcbiAgICAgICAgICBtYXhUcmFuc2xhdGU6IF90aGlzLm1heFRyYW5zbGF0ZSxcbiAgICAgICAgICBtaW5UcmFuc2xhdGU6IF90aGlzLm1pblRyYW5zbGF0ZSxcbiAgICAgICAgICB0cmFuc2xhdGU6IF90aGlzLnRyYW5zbGF0ZSxcbiAgICAgICAgICB3aWR0aDogX3RoaXMud2lkdGhcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpLCBcIm9uQXV0b1Njcm9sbFwiLCBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgIF90aGlzLnRyYW5zbGF0ZS54ICs9IG9mZnNldC5sZWZ0O1xuICAgICAgICBfdGhpcy50cmFuc2xhdGUueSArPSBvZmZzZXQudG9wO1xuXG4gICAgICAgIF90aGlzLmFuaW1hdGVOb2RlcygpO1xuICAgICAgfSk7XG5cbiAgICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSwgXCJoYW5kbGVLZXlEb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgICAgIHZhciBfdGhpcyRwcm9wczUgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHNob3VsZENhbmNlbFN0YXJ0ID0gX3RoaXMkcHJvcHM1LnNob3VsZENhbmNlbFN0YXJ0LFxuICAgICAgICAgICAgX3RoaXMkcHJvcHM1JGtleUNvZGVzID0gX3RoaXMkcHJvcHM1LmtleUNvZGVzLFxuICAgICAgICAgICAgY3VzdG9tS2V5Q29kZXMgPSBfdGhpcyRwcm9wczUka2V5Q29kZXMgPT09IHZvaWQgMCA/IHt9IDogX3RoaXMkcHJvcHM1JGtleUNvZGVzO1xuXG4gICAgICAgIHZhciBrZXlDb2RlcyA9IF9vYmplY3RTcHJlYWQoe30sIGRlZmF1bHRLZXlDb2RlcywgY3VzdG9tS2V5Q29kZXMpO1xuXG4gICAgICAgIGlmIChfdGhpcy5tYW5hZ2VyLmFjdGl2ZSAmJiAhX3RoaXMubWFuYWdlci5pc0tleVNvcnRpbmcgfHwgIV90aGlzLm1hbmFnZXIuYWN0aXZlICYmICgha2V5Q29kZXMubGlmdC5pbmNsdWRlcyhrZXlDb2RlKSB8fCBzaG91bGRDYW5jZWxTdGFydChldmVudCkgfHwgIV90aGlzLmlzVmFsaWRTb3J0aW5nVGFyZ2V0KGV2ZW50KSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoa2V5Q29kZXMubGlmdC5pbmNsdWRlcyhrZXlDb2RlKSAmJiAhX3RoaXMubWFuYWdlci5hY3RpdmUpIHtcbiAgICAgICAgICBfdGhpcy5rZXlMaWZ0KGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2Rlcy5kcm9wLmluY2x1ZGVzKGtleUNvZGUpICYmIF90aGlzLm1hbmFnZXIuYWN0aXZlKSB7XG4gICAgICAgICAgX3RoaXMua2V5RHJvcChldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZXMuY2FuY2VsLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgX3RoaXMubmV3SW5kZXggPSBfdGhpcy5tYW5hZ2VyLmFjdGl2ZS5pbmRleDtcblxuICAgICAgICAgIF90aGlzLmtleURyb3AoZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGVzLnVwLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgICAgX3RoaXMua2V5TW92ZSgtMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZXMuZG93bi5pbmNsdWRlcyhrZXlDb2RlKSkge1xuICAgICAgICAgIF90aGlzLmtleU1vdmUoMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSksIFwia2V5TGlmdFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdmFyIG5vZGUgPSBjbG9zZXN0KHRhcmdldCwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgcmV0dXJuIGVsLnNvcnRhYmxlSW5mbyAhPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIF9ub2RlJHNvcnRhYmxlSW5mbzIgPSBub2RlLnNvcnRhYmxlSW5mbyxcbiAgICAgICAgICAgIGluZGV4ID0gX25vZGUkc29ydGFibGVJbmZvMi5pbmRleCxcbiAgICAgICAgICAgIGNvbGxlY3Rpb24gPSBfbm9kZSRzb3J0YWJsZUluZm8yLmNvbGxlY3Rpb247XG4gICAgICAgIF90aGlzLmluaXRpYWxGb2N1c2VkTm9kZSA9IHRhcmdldDtcbiAgICAgICAgX3RoaXMubWFuYWdlci5pc0tleVNvcnRpbmcgPSB0cnVlO1xuICAgICAgICBfdGhpcy5tYW5hZ2VyLmFjdGl2ZSA9IHtcbiAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvblxuICAgICAgICB9O1xuXG4gICAgICAgIF90aGlzLmhhbmRsZVByZXNzKGV2ZW50KTtcbiAgICAgIH0pO1xuXG4gICAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSksIFwia2V5TW92ZVwiLCBmdW5jdGlvbiAoc2hpZnQpIHtcbiAgICAgICAgdmFyIG5vZGVzID0gX3RoaXMubWFuYWdlci5nZXRPcmRlcmVkUmVmcygpO1xuXG4gICAgICAgIHZhciBsYXN0SW5kZXggPSBub2Rlc1tub2Rlcy5sZW5ndGggLSAxXS5ub2RlLnNvcnRhYmxlSW5mby5pbmRleDtcbiAgICAgICAgdmFyIG5ld0luZGV4ID0gX3RoaXMubmV3SW5kZXggKyBzaGlmdDtcbiAgICAgICAgdmFyIHByZXZJbmRleCA9IF90aGlzLm5ld0luZGV4O1xuXG4gICAgICAgIGlmIChuZXdJbmRleCA8IDAgfHwgbmV3SW5kZXggPiBsYXN0SW5kZXgpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpcy5wcmV2SW5kZXggPSBwcmV2SW5kZXg7XG4gICAgICAgIF90aGlzLm5ld0luZGV4ID0gbmV3SW5kZXg7XG4gICAgICAgIHZhciB0YXJnZXRJbmRleCA9IGdldFRhcmdldEluZGV4KF90aGlzLm5ld0luZGV4LCBfdGhpcy5wcmV2SW5kZXgsIF90aGlzLmluZGV4KTtcbiAgICAgICAgdmFyIHRhcmdldCA9IG5vZGVzLmZpbmQoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgICAgdmFyIG5vZGUgPSBfcmVmMi5ub2RlO1xuICAgICAgICAgIHJldHVybiBub2RlLnNvcnRhYmxlSW5mby5pbmRleCA9PT0gdGFyZ2V0SW5kZXg7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdGFyZ2V0Tm9kZSA9IHRhcmdldC5ub2RlO1xuICAgICAgICB2YXIgc2Nyb2xsRGVsdGEgPSBfdGhpcy5jb250YWluZXJTY3JvbGxEZWx0YTtcbiAgICAgICAgdmFyIHRhcmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9IHRhcmdldC5ib3VuZGluZ0NsaWVudFJlY3QgfHwgZ2V0U2Nyb2xsQWRqdXN0ZWRCb3VuZGluZ0NsaWVudFJlY3QodGFyZ2V0Tm9kZSwgc2Nyb2xsRGVsdGEpO1xuICAgICAgICB2YXIgdGFyZ2V0VHJhbnNsYXRlID0gdGFyZ2V0LnRyYW5zbGF0ZSB8fCB7XG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICB5OiAwXG4gICAgICAgIH07XG4gICAgICAgIHZhciB0YXJnZXRQb3NpdGlvbiA9IHtcbiAgICAgICAgICB0b3A6IHRhcmdldEJvdW5kaW5nQ2xpZW50UmVjdC50b3AgKyB0YXJnZXRUcmFuc2xhdGUueSAtIHNjcm9sbERlbHRhLnRvcCxcbiAgICAgICAgICBsZWZ0OiB0YXJnZXRCb3VuZGluZ0NsaWVudFJlY3QubGVmdCArIHRhcmdldFRyYW5zbGF0ZS54IC0gc2Nyb2xsRGVsdGEubGVmdFxuICAgICAgICB9O1xuICAgICAgICB2YXIgc2hvdWxkQWRqdXN0Rm9yU2l6ZSA9IHByZXZJbmRleCA8IG5ld0luZGV4O1xuICAgICAgICB2YXIgc2l6ZUFkanVzdG1lbnQgPSB7XG4gICAgICAgICAgeDogc2hvdWxkQWRqdXN0Rm9yU2l6ZSAmJiBfdGhpcy5heGlzLnggPyB0YXJnZXROb2RlLm9mZnNldFdpZHRoIC0gX3RoaXMud2lkdGggOiAwLFxuICAgICAgICAgIHk6IHNob3VsZEFkanVzdEZvclNpemUgJiYgX3RoaXMuYXhpcy55ID8gdGFyZ2V0Tm9kZS5vZmZzZXRIZWlnaHQgLSBfdGhpcy5oZWlnaHQgOiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgX3RoaXMuaGFuZGxlU29ydE1vdmUoe1xuICAgICAgICAgIHBhZ2VYOiB0YXJnZXRQb3NpdGlvbi5sZWZ0ICsgc2l6ZUFkanVzdG1lbnQueCxcbiAgICAgICAgICBwYWdlWTogdGFyZ2V0UG9zaXRpb24udG9wICsgc2l6ZUFkanVzdG1lbnQueSxcbiAgICAgICAgICBpZ25vcmVUcmFuc2l0aW9uOiBzaGlmdCA9PT0gMFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSksIFwia2V5RHJvcFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgX3RoaXMuaGFuZGxlU29ydEVuZChldmVudCk7XG5cbiAgICAgICAgaWYgKF90aGlzLmluaXRpYWxGb2N1c2VkTm9kZSkge1xuICAgICAgICAgIF90aGlzLmluaXRpYWxGb2N1c2VkTm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpLCBcImhhbmRsZUtleUVuZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKF90aGlzLm1hbmFnZXIuYWN0aXZlKSB7XG4gICAgICAgICAgX3RoaXMua2V5RHJvcChldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSksIFwiaXNWYWxpZFNvcnRpbmdUYXJnZXRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciB1c2VEcmFnSGFuZGxlID0gX3RoaXMucHJvcHMudXNlRHJhZ0hhbmRsZTtcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdmFyIG5vZGUgPSBjbG9zZXN0KHRhcmdldCwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgcmV0dXJuIGVsLnNvcnRhYmxlSW5mbyAhPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vZGUgJiYgbm9kZS5zb3J0YWJsZUluZm8gJiYgIW5vZGUuc29ydGFibGVJbmZvLmRpc2FibGVkICYmICh1c2VEcmFnSGFuZGxlID8gaXNTb3J0YWJsZUhhbmRsZSh0YXJnZXQpIDogdGFyZ2V0LnNvcnRhYmxlSW5mbyk7XG4gICAgICB9KTtcblxuICAgICAgdmFsaWRhdGVQcm9wcyhwcm9wcyk7XG4gICAgICBfdGhpcy5tYW5hZ2VyID0gbmV3IE1hbmFnZXIoKTtcbiAgICAgIF90aGlzLmV2ZW50cyA9IHtcbiAgICAgICAgZW5kOiBfdGhpcy5oYW5kbGVFbmQsXG4gICAgICAgIG1vdmU6IF90aGlzLmhhbmRsZU1vdmUsXG4gICAgICAgIHN0YXJ0OiBfdGhpcy5oYW5kbGVTdGFydFxuICAgICAgfTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoV2l0aFNvcnRhYmxlQ29udGFpbmVyLCBbe1xuICAgICAga2V5OiBcImdldENoaWxkQ29udGV4dFwiLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtYW5hZ2VyOiB0aGlzLm1hbmFnZXJcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6IFwiY29tcG9uZW50RGlkTW91bnRcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHVzZVdpbmRvd0FzU2Nyb2xsQ29udGFpbmVyID0gdGhpcy5wcm9wcy51c2VXaW5kb3dBc1Njcm9sbENvbnRhaW5lcjtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuZ2V0Q29udGFpbmVyKCk7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZShjb250YWluZXIpLnRoZW4oZnVuY3Rpb24gKGNvbnRhaW5lck5vZGUpIHtcbiAgICAgICAgICBfdGhpczIuY29udGFpbmVyID0gY29udGFpbmVyTm9kZTtcbiAgICAgICAgICBfdGhpczIuZG9jdW1lbnQgPSBfdGhpczIuY29udGFpbmVyLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgICAgdmFyIGNvbnRlbnRXaW5kb3cgPSBfdGhpczIucHJvcHMuY29udGVudFdpbmRvdyB8fCBfdGhpczIuZG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93O1xuICAgICAgICAgIF90aGlzMi5jb250ZW50V2luZG93ID0gdHlwZW9mIGNvbnRlbnRXaW5kb3cgPT09ICdmdW5jdGlvbicgPyBjb250ZW50V2luZG93KCkgOiBjb250ZW50V2luZG93O1xuICAgICAgICAgIF90aGlzMi5zY3JvbGxDb250YWluZXIgPSB1c2VXaW5kb3dBc1Njcm9sbENvbnRhaW5lciA/IF90aGlzMi5kb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IF90aGlzMi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgOiBnZXRTY3JvbGxpbmdQYXJlbnQoX3RoaXMyLmNvbnRhaW5lcikgfHwgX3RoaXMyLmNvbnRhaW5lcjtcbiAgICAgICAgICBfdGhpczIuYXV0b1Njcm9sbGVyID0gbmV3IEF1dG9TY3JvbGxlcihfdGhpczIuc2Nyb2xsQ29udGFpbmVyLCBfdGhpczIub25BdXRvU2Nyb2xsKTtcbiAgICAgICAgICBPYmplY3Qua2V5cyhfdGhpczIuZXZlbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudHNba2V5XS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIF90aGlzMi5ldmVudHNba2V5XSwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBfdGhpczIuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBfdGhpczIuaGFuZGxlS2V5RG93bik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogXCJjb21wb25lbnRXaWxsVW5tb3VudFwiLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy5oZWxwZXIgJiYgdGhpcy5oZWxwZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgIHRoaXMuaGVscGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5oZWxwZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZXZlbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICByZXR1cm4gZXZlbnRzW2tleV0uZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgX3RoaXMzLmV2ZW50c1trZXldKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogXCJ1cGRhdGVIZWxwZXJQb3NpdGlvblwiLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZUhlbHBlclBvc2l0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyRwcm9wczYgPSB0aGlzLnByb3BzLFxuICAgICAgICAgICAgbG9ja0F4aXMgPSBfdGhpcyRwcm9wczYubG9ja0F4aXMsXG4gICAgICAgICAgICBsb2NrT2Zmc2V0ID0gX3RoaXMkcHJvcHM2LmxvY2tPZmZzZXQsXG4gICAgICAgICAgICBsb2NrVG9Db250YWluZXJFZGdlcyA9IF90aGlzJHByb3BzNi5sb2NrVG9Db250YWluZXJFZGdlcyxcbiAgICAgICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbiA9IF90aGlzJHByb3BzNi50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgICAgICBfdGhpcyRwcm9wczYka2V5Ym9hcmQgPSBfdGhpcyRwcm9wczYua2V5Ym9hcmRTb3J0aW5nVHJhbnNpdGlvbkR1cmF0aW9uLFxuICAgICAgICAgICAga2V5Ym9hcmRTb3J0aW5nVHJhbnNpdGlvbkR1cmF0aW9uID0gX3RoaXMkcHJvcHM2JGtleWJvYXJkID09PSB2b2lkIDAgPyB0cmFuc2l0aW9uRHVyYXRpb24gOiBfdGhpcyRwcm9wczYka2V5Ym9hcmQ7XG4gICAgICAgIHZhciBpc0tleVNvcnRpbmcgPSB0aGlzLm1hbmFnZXIuaXNLZXlTb3J0aW5nO1xuICAgICAgICB2YXIgaWdub3JlVHJhbnNpdGlvbiA9IGV2ZW50Lmlnbm9yZVRyYW5zaXRpb247XG4gICAgICAgIHZhciBvZmZzZXQgPSBnZXRQb3NpdGlvbihldmVudCk7XG4gICAgICAgIHZhciB0cmFuc2xhdGUgPSB7XG4gICAgICAgICAgeDogb2Zmc2V0LnggLSB0aGlzLmluaXRpYWxPZmZzZXQueCxcbiAgICAgICAgICB5OiBvZmZzZXQueSAtIHRoaXMuaW5pdGlhbE9mZnNldC55XG4gICAgICAgIH07XG4gICAgICAgIHRyYW5zbGF0ZS55IC09IHdpbmRvdy5wYWdlWU9mZnNldCAtIHRoaXMuaW5pdGlhbFdpbmRvd1Njcm9sbC50b3A7XG4gICAgICAgIHRyYW5zbGF0ZS54IC09IHdpbmRvdy5wYWdlWE9mZnNldCAtIHRoaXMuaW5pdGlhbFdpbmRvd1Njcm9sbC5sZWZ0O1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSA9IHRyYW5zbGF0ZTtcblxuICAgICAgICBpZiAobG9ja1RvQ29udGFpbmVyRWRnZXMpIHtcbiAgICAgICAgICB2YXIgX2dldExvY2tQaXhlbE9mZnNldHMgPSBnZXRMb2NrUGl4ZWxPZmZzZXRzKHtcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgICAgICBsb2NrT2Zmc2V0OiBsb2NrT2Zmc2V0LFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGhcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2dldExvY2tQaXhlbE9mZnNldHMyID0gX3NsaWNlZFRvQXJyYXkoX2dldExvY2tQaXhlbE9mZnNldHMsIDIpLFxuICAgICAgICAgICAgICBtaW5Mb2NrT2Zmc2V0ID0gX2dldExvY2tQaXhlbE9mZnNldHMyWzBdLFxuICAgICAgICAgICAgICBtYXhMb2NrT2Zmc2V0ID0gX2dldExvY2tQaXhlbE9mZnNldHMyWzFdO1xuXG4gICAgICAgICAgdmFyIG1pbk9mZnNldCA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMud2lkdGggLyAyIC0gbWluTG9ja09mZnNldC54LFxuICAgICAgICAgICAgeTogdGhpcy5oZWlnaHQgLyAyIC0gbWluTG9ja09mZnNldC55XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgbWF4T2Zmc2V0ID0ge1xuICAgICAgICAgICAgeDogdGhpcy53aWR0aCAvIDIgLSBtYXhMb2NrT2Zmc2V0LngsXG4gICAgICAgICAgICB5OiB0aGlzLmhlaWdodCAvIDIgLSBtYXhMb2NrT2Zmc2V0LnlcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRyYW5zbGF0ZS54ID0gbGltaXQodGhpcy5taW5UcmFuc2xhdGUueCArIG1pbk9mZnNldC54LCB0aGlzLm1heFRyYW5zbGF0ZS54IC0gbWF4T2Zmc2V0LngsIHRyYW5zbGF0ZS54KTtcbiAgICAgICAgICB0cmFuc2xhdGUueSA9IGxpbWl0KHRoaXMubWluVHJhbnNsYXRlLnkgKyBtaW5PZmZzZXQueSwgdGhpcy5tYXhUcmFuc2xhdGUueSAtIG1heE9mZnNldC55LCB0cmFuc2xhdGUueSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9ja0F4aXMgPT09ICd4Jykge1xuICAgICAgICAgIHRyYW5zbGF0ZS55ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChsb2NrQXhpcyA9PT0gJ3knKSB7XG4gICAgICAgICAgdHJhbnNsYXRlLnggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzS2V5U29ydGluZyAmJiBrZXlib2FyZFNvcnRpbmdUcmFuc2l0aW9uRHVyYXRpb24gJiYgIWlnbm9yZVRyYW5zaXRpb24pIHtcbiAgICAgICAgICBzZXRUcmFuc2l0aW9uRHVyYXRpb24odGhpcy5oZWxwZXIsIGtleWJvYXJkU29ydGluZ1RyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUcmFuc2xhdGUzZCh0aGlzLmhlbHBlciwgdHJhbnNsYXRlKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6IFwiYW5pbWF0ZU5vZGVzXCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gYW5pbWF0ZU5vZGVzKCkge1xuICAgICAgICB2YXIgX3RoaXMkcHJvcHM3ID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbiA9IF90aGlzJHByb3BzNy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgICAgICBoaWRlU29ydGFibGVHaG9zdCA9IF90aGlzJHByb3BzNy5oaWRlU29ydGFibGVHaG9zdCxcbiAgICAgICAgICAgIG9uU29ydE92ZXIgPSBfdGhpcyRwcm9wczcub25Tb3J0T3ZlcjtcbiAgICAgICAgdmFyIGNvbnRhaW5lclNjcm9sbERlbHRhID0gdGhpcy5jb250YWluZXJTY3JvbGxEZWx0YSxcbiAgICAgICAgICAgIHdpbmRvd1Njcm9sbERlbHRhID0gdGhpcy53aW5kb3dTY3JvbGxEZWx0YTtcbiAgICAgICAgdmFyIG5vZGVzID0gdGhpcy5tYW5hZ2VyLmdldE9yZGVyZWRSZWZzKCk7XG4gICAgICAgIHZhciBzb3J0aW5nT2Zmc2V0ID0ge1xuICAgICAgICAgIGxlZnQ6IHRoaXMub2Zmc2V0RWRnZS5sZWZ0ICsgdGhpcy50cmFuc2xhdGUueCArIGNvbnRhaW5lclNjcm9sbERlbHRhLmxlZnQsXG4gICAgICAgICAgdG9wOiB0aGlzLm9mZnNldEVkZ2UudG9wICsgdGhpcy50cmFuc2xhdGUueSArIGNvbnRhaW5lclNjcm9sbERlbHRhLnRvcFxuICAgICAgICB9O1xuICAgICAgICB2YXIgaXNLZXlTb3J0aW5nID0gdGhpcy5tYW5hZ2VyLmlzS2V5U29ydGluZztcbiAgICAgICAgdmFyIHByZXZJbmRleCA9IHRoaXMubmV3SW5kZXg7XG4gICAgICAgIHRoaXMubmV3SW5kZXggPSBudWxsO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBub2Rlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIHZhciBfbm9kZTMgPSBub2Rlc1tpXS5ub2RlO1xuICAgICAgICAgIHZhciBpbmRleCA9IF9ub2RlMy5zb3J0YWJsZUluZm8uaW5kZXg7XG4gICAgICAgICAgdmFyIHdpZHRoID0gX25vZGUzLm9mZnNldFdpZHRoO1xuICAgICAgICAgIHZhciBoZWlnaHQgPSBfbm9kZTMub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIHZhciBvZmZzZXQgPSB7XG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0ID4gaGVpZ2h0ID8gaGVpZ2h0IC8gMiA6IHRoaXMuaGVpZ2h0IC8gMixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoID4gd2lkdGggPyB3aWR0aCAvIDIgOiB0aGlzLndpZHRoIC8gMlxuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIG11c3RTaGlmdEJhY2t3YXJkID0gaXNLZXlTb3J0aW5nICYmIGluZGV4ID4gdGhpcy5pbmRleCAmJiBpbmRleCA8PSBwcmV2SW5kZXg7XG4gICAgICAgICAgdmFyIG11c3RTaGlmdEZvcndhcmQgPSBpc0tleVNvcnRpbmcgJiYgaW5kZXggPCB0aGlzLmluZGV4ICYmIGluZGV4ID49IHByZXZJbmRleDtcbiAgICAgICAgICB2YXIgdHJhbnNsYXRlID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBlZGdlT2Zmc2V0ID0gbm9kZXNbaV0uZWRnZU9mZnNldDtcblxuICAgICAgICAgIGlmICghZWRnZU9mZnNldCkge1xuICAgICAgICAgICAgZWRnZU9mZnNldCA9IGdldEVkZ2VPZmZzZXQoX25vZGUzLCB0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBub2Rlc1tpXS5lZGdlT2Zmc2V0ID0gZWRnZU9mZnNldDtcblxuICAgICAgICAgICAgaWYgKGlzS2V5U29ydGluZykge1xuICAgICAgICAgICAgICBub2Rlc1tpXS5ib3VuZGluZ0NsaWVudFJlY3QgPSBnZXRTY3JvbGxBZGp1c3RlZEJvdW5kaW5nQ2xpZW50UmVjdChfbm9kZTMsIGNvbnRhaW5lclNjcm9sbERlbHRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbmV4dE5vZGUgPSBpIDwgbm9kZXMubGVuZ3RoIC0gMSAmJiBub2Rlc1tpICsgMV07XG4gICAgICAgICAgdmFyIHByZXZOb2RlID0gaSA+IDAgJiYgbm9kZXNbaSAtIDFdO1xuXG4gICAgICAgICAgaWYgKG5leHROb2RlICYmICFuZXh0Tm9kZS5lZGdlT2Zmc2V0KSB7XG4gICAgICAgICAgICBuZXh0Tm9kZS5lZGdlT2Zmc2V0ID0gZ2V0RWRnZU9mZnNldChuZXh0Tm9kZS5ub2RlLCB0aGlzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIGlmIChpc0tleVNvcnRpbmcpIHtcbiAgICAgICAgICAgICAgbmV4dE5vZGUuYm91bmRpbmdDbGllbnRSZWN0ID0gZ2V0U2Nyb2xsQWRqdXN0ZWRCb3VuZGluZ0NsaWVudFJlY3QobmV4dE5vZGUubm9kZSwgY29udGFpbmVyU2Nyb2xsRGVsdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5pbmRleCkge1xuICAgICAgICAgICAgaWYgKGhpZGVTb3J0YWJsZUdob3N0KSB7XG4gICAgICAgICAgICAgIHRoaXMuc29ydGFibGVHaG9zdCA9IF9ub2RlMztcbiAgICAgICAgICAgICAgc2V0SW5saW5lU3R5bGVzKF9ub2RlMywge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbidcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0cmFuc2l0aW9uRHVyYXRpb24pIHtcbiAgICAgICAgICAgIHNldFRyYW5zaXRpb25EdXJhdGlvbihfbm9kZTMsIHRyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuYXhpcy54KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5heGlzLnkpIHtcbiAgICAgICAgICAgICAgaWYgKG11c3RTaGlmdEZvcndhcmQgfHwgaW5kZXggPCB0aGlzLmluZGV4ICYmIChzb3J0aW5nT2Zmc2V0LmxlZnQgKyB3aW5kb3dTY3JvbGxEZWx0YS5sZWZ0IC0gb2Zmc2V0LndpZHRoIDw9IGVkZ2VPZmZzZXQubGVmdCAmJiBzb3J0aW5nT2Zmc2V0LnRvcCArIHdpbmRvd1Njcm9sbERlbHRhLnRvcCA8PSBlZGdlT2Zmc2V0LnRvcCArIG9mZnNldC5oZWlnaHQgfHwgc29ydGluZ09mZnNldC50b3AgKyB3aW5kb3dTY3JvbGxEZWx0YS50b3AgKyBvZmZzZXQuaGVpZ2h0IDw9IGVkZ2VPZmZzZXQudG9wKSkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZS54ID0gdGhpcy53aWR0aCArIHRoaXMubWFyZ2luT2Zmc2V0Lng7XG5cbiAgICAgICAgICAgICAgICBpZiAoZWRnZU9mZnNldC5sZWZ0ICsgdHJhbnNsYXRlLnggPiB0aGlzLmNvbnRhaW5lckJvdW5kaW5nUmVjdC53aWR0aCAtIG9mZnNldC53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgaWYgKG5leHROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZS54ID0gbmV4dE5vZGUuZWRnZU9mZnNldC5sZWZ0IC0gZWRnZU9mZnNldC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUueSA9IG5leHROb2RlLmVkZ2VPZmZzZXQudG9wIC0gZWRnZU9mZnNldC50b3A7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmV3SW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubmV3SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAobXVzdFNoaWZ0QmFja3dhcmQgfHwgaW5kZXggPiB0aGlzLmluZGV4ICYmIChzb3J0aW5nT2Zmc2V0LmxlZnQgKyB3aW5kb3dTY3JvbGxEZWx0YS5sZWZ0ICsgb2Zmc2V0LndpZHRoID49IGVkZ2VPZmZzZXQubGVmdCAmJiBzb3J0aW5nT2Zmc2V0LnRvcCArIHdpbmRvd1Njcm9sbERlbHRhLnRvcCArIG9mZnNldC5oZWlnaHQgPj0gZWRnZU9mZnNldC50b3AgfHwgc29ydGluZ09mZnNldC50b3AgKyB3aW5kb3dTY3JvbGxEZWx0YS50b3AgKyBvZmZzZXQuaGVpZ2h0ID49IGVkZ2VPZmZzZXQudG9wICsgaGVpZ2h0KSkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZS54ID0gLSh0aGlzLndpZHRoICsgdGhpcy5tYXJnaW5PZmZzZXQueCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZWRnZU9mZnNldC5sZWZ0ICsgdHJhbnNsYXRlLnggPCB0aGlzLmNvbnRhaW5lckJvdW5kaW5nUmVjdC5sZWZ0ICsgb2Zmc2V0LndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocHJldk5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlLnggPSBwcmV2Tm9kZS5lZGdlT2Zmc2V0LmxlZnQgLSBlZGdlT2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZS55ID0gcHJldk5vZGUuZWRnZU9mZnNldC50b3AgLSBlZGdlT2Zmc2V0LnRvcDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5ld0luZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChtdXN0U2hpZnRCYWNrd2FyZCB8fCBpbmRleCA+IHRoaXMuaW5kZXggJiYgc29ydGluZ09mZnNldC5sZWZ0ICsgd2luZG93U2Nyb2xsRGVsdGEubGVmdCArIG9mZnNldC53aWR0aCA+PSBlZGdlT2Zmc2V0LmxlZnQpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUueCA9IC0odGhpcy53aWR0aCArIHRoaXMubWFyZ2luT2Zmc2V0LngpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChtdXN0U2hpZnRGb3J3YXJkIHx8IGluZGV4IDwgdGhpcy5pbmRleCAmJiBzb3J0aW5nT2Zmc2V0LmxlZnQgKyB3aW5kb3dTY3JvbGxEZWx0YS5sZWZ0IDw9IGVkZ2VPZmZzZXQubGVmdCArIG9mZnNldC53aWR0aCkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZS54ID0gdGhpcy53aWR0aCArIHRoaXMubWFyZ2luT2Zmc2V0Lng7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXdJbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm5ld0luZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmF4aXMueSkge1xuICAgICAgICAgICAgaWYgKG11c3RTaGlmdEJhY2t3YXJkIHx8IGluZGV4ID4gdGhpcy5pbmRleCAmJiBzb3J0aW5nT2Zmc2V0LnRvcCArIHdpbmRvd1Njcm9sbERlbHRhLnRvcCArIG9mZnNldC5oZWlnaHQgPj0gZWRnZU9mZnNldC50b3ApIHtcbiAgICAgICAgICAgICAgdHJhbnNsYXRlLnkgPSAtKHRoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW5PZmZzZXQueSk7XG4gICAgICAgICAgICAgIHRoaXMubmV3SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobXVzdFNoaWZ0Rm9yd2FyZCB8fCBpbmRleCA8IHRoaXMuaW5kZXggJiYgc29ydGluZ09mZnNldC50b3AgKyB3aW5kb3dTY3JvbGxEZWx0YS50b3AgPD0gZWRnZU9mZnNldC50b3AgKyBvZmZzZXQuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgIHRyYW5zbGF0ZS55ID0gdGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpbk9mZnNldC55O1xuXG4gICAgICAgICAgICAgIGlmICh0aGlzLm5ld0luZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0luZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRUcmFuc2xhdGUzZChfbm9kZTMsIHRyYW5zbGF0ZSk7XG4gICAgICAgICAgbm9kZXNbaV0udHJhbnNsYXRlID0gdHJhbnNsYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubmV3SW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMubmV3SW5kZXggPSB0aGlzLmluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzS2V5U29ydGluZykge1xuICAgICAgICAgIHRoaXMubmV3SW5kZXggPSBwcmV2SW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb2xkSW5kZXggPSBpc0tleVNvcnRpbmcgPyB0aGlzLnByZXZJbmRleCA6IHByZXZJbmRleDtcblxuICAgICAgICBpZiAob25Tb3J0T3ZlciAmJiB0aGlzLm5ld0luZGV4ICE9PSBvbGRJbmRleCkge1xuICAgICAgICAgIG9uU29ydE92ZXIoe1xuICAgICAgICAgICAgY29sbGVjdGlvbjogdGhpcy5tYW5hZ2VyLmFjdGl2ZS5jb2xsZWN0aW9uLFxuICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgICAgICBuZXdJbmRleDogdGhpcy5uZXdJbmRleCxcbiAgICAgICAgICAgIG9sZEluZGV4OiBvbGRJbmRleCxcbiAgICAgICAgICAgIGlzS2V5U29ydGluZzogaXNLZXlTb3J0aW5nLFxuICAgICAgICAgICAgbm9kZXM6IG5vZGVzLFxuICAgICAgICAgICAgaGVscGVyOiB0aGlzLmhlbHBlclxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcImdldFdyYXBwZWRJbnN0YW5jZVwiLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFdyYXBwZWRJbnN0YW5jZSgpIHtcbiAgICAgICAgaW52YXJpYW50KGNvbmZpZy53aXRoUmVmLCAnVG8gYWNjZXNzIHRoZSB3cmFwcGVkIGluc3RhbmNlLCB5b3UgbmVlZCB0byBwYXNzIGluIHt3aXRoUmVmOiB0cnVlfSBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IG9mIHRoZSBTb3J0YWJsZUNvbnRhaW5lcigpIGNhbGwnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy53cmFwcGVkSW5zdGFuY2U7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcImdldENvbnRhaW5lclwiLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvbnRhaW5lcigpIHtcbiAgICAgICAgdmFyIGdldENvbnRhaW5lciA9IHRoaXMucHJvcHMuZ2V0Q29udGFpbmVyO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZ2V0Q29udGFpbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGZpbmRET01Ob2RlKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdldENvbnRhaW5lcihjb25maWcud2l0aFJlZiA/IHRoaXMuZ2V0V3JhcHBlZEluc3RhbmNlKCkgOiB1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogXCJyZW5kZXJcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciByZWYgPSBjb25maWcud2l0aFJlZiA/ICd3cmFwcGVkSW5zdGFuY2UnIDogbnVsbDtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoV3JhcHBlZENvbXBvbmVudCwgX2V4dGVuZHMoe1xuICAgICAgICAgIHJlZjogcmVmXG4gICAgICAgIH0sIG9taXQodGhpcy5wcm9wcywgb21pdHRlZFByb3BzKSkpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogXCJoZWxwZXJDb250YWluZXJcIixcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICB2YXIgaGVscGVyQ29udGFpbmVyID0gdGhpcy5wcm9wcy5oZWxwZXJDb250YWluZXI7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBoZWxwZXJDb250YWluZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gaGVscGVyQ29udGFpbmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5oZWxwZXJDb250YWluZXIgfHwgdGhpcy5kb2N1bWVudC5ib2R5O1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogXCJjb250YWluZXJTY3JvbGxEZWx0YVwiLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHZhciB1c2VXaW5kb3dBc1Njcm9sbENvbnRhaW5lciA9IHRoaXMucHJvcHMudXNlV2luZG93QXNTY3JvbGxDb250YWluZXI7XG5cbiAgICAgICAgaWYgKHVzZVdpbmRvd0FzU2Nyb2xsQ29udGFpbmVyKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICB0b3A6IDBcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsZWZ0OiB0aGlzLnNjcm9sbENvbnRhaW5lci5zY3JvbGxMZWZ0IC0gdGhpcy5pbml0aWFsU2Nyb2xsLmxlZnQsXG4gICAgICAgICAgdG9wOiB0aGlzLnNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AgLSB0aGlzLmluaXRpYWxTY3JvbGwudG9wXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcIndpbmRvd1Njcm9sbERlbHRhXCIsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsZWZ0OiB0aGlzLmNvbnRlbnRXaW5kb3cucGFnZVhPZmZzZXQgLSB0aGlzLmluaXRpYWxXaW5kb3dTY3JvbGwubGVmdCxcbiAgICAgICAgICB0b3A6IHRoaXMuY29udGVudFdpbmRvdy5wYWdlWU9mZnNldCAtIHRoaXMuaW5pdGlhbFdpbmRvd1Njcm9sbC50b3BcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gV2l0aFNvcnRhYmxlQ29udGFpbmVyO1xuICB9KENvbXBvbmVudCksIF9kZWZpbmVQcm9wZXJ0eShfY2xhc3MsIFwiZGlzcGxheU5hbWVcIiwgcHJvdmlkZURpc3BsYXlOYW1lKCdzb3J0YWJsZUxpc3QnLCBXcmFwcGVkQ29tcG9uZW50KSksIF9kZWZpbmVQcm9wZXJ0eShfY2xhc3MsIFwiZGVmYXVsdFByb3BzXCIsIGRlZmF1bHRQcm9wcyksIF9kZWZpbmVQcm9wZXJ0eShfY2xhc3MsIFwicHJvcFR5cGVzXCIsIHByb3BUeXBlcyksIF9kZWZpbmVQcm9wZXJ0eShfY2xhc3MsIFwiY2hpbGRDb250ZXh0VHlwZXNcIiwge1xuICAgIG1hbmFnZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9KSwgX3RlbXA7XG59XG5cbnZhciBwcm9wVHlwZXMkMSA9IHtcbiAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgY29sbGVjdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLm51bWJlciwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2xcbn07XG52YXIgb21pdHRlZFByb3BzJDEgPSBPYmplY3Qua2V5cyhwcm9wVHlwZXMkMSk7XG5mdW5jdGlvbiBzb3J0YWJsZUVsZW1lbnQoV3JhcHBlZENvbXBvbmVudCkge1xuICB2YXIgX2NsYXNzLCBfdGVtcDtcblxuICB2YXIgY29uZmlnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7XG4gICAgd2l0aFJlZjogZmFsc2VcbiAgfTtcbiAgcmV0dXJuIF90ZW1wID0gX2NsYXNzID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoV2l0aFNvcnRhYmxlRWxlbWVudCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBXaXRoU29ydGFibGVFbGVtZW50KCkge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdpdGhTb3J0YWJsZUVsZW1lbnQpO1xuXG4gICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKFdpdGhTb3J0YWJsZUVsZW1lbnQpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhXaXRoU29ydGFibGVFbGVtZW50LCBbe1xuICAgICAga2V5OiBcImNvbXBvbmVudERpZE1vdW50XCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6IFwiY29tcG9uZW50RGlkVXBkYXRlXCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgICAgICBpZiAodGhpcy5ub2RlKSB7XG4gICAgICAgICAgaWYgKHByZXZQcm9wcy5pbmRleCAhPT0gdGhpcy5wcm9wcy5pbmRleCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNvcnRhYmxlSW5mby5pbmRleCA9IHRoaXMucHJvcHMuaW5kZXg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHByZXZQcm9wcy5kaXNhYmxlZCAhPT0gdGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNvcnRhYmxlSW5mby5kaXNhYmxlZCA9IHRoaXMucHJvcHMuZGlzYWJsZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZQcm9wcy5jb2xsZWN0aW9uICE9PSB0aGlzLnByb3BzLmNvbGxlY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLnVucmVnaXN0ZXIocHJldlByb3BzLmNvbGxlY3Rpb24pO1xuICAgICAgICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogXCJjb21wb25lbnRXaWxsVW5tb3VudFwiLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnVucmVnaXN0ZXIoKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6IFwicmVnaXN0ZXJcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWdpc3RlcigpIHtcbiAgICAgICAgdmFyIF90aGlzJHByb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGNvbGxlY3Rpb24gPSBfdGhpcyRwcm9wcy5jb2xsZWN0aW9uLFxuICAgICAgICAgICAgZGlzYWJsZWQgPSBfdGhpcyRwcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgIGluZGV4ID0gX3RoaXMkcHJvcHMuaW5kZXg7XG4gICAgICAgIHZhciBub2RlID0gZmluZERPTU5vZGUodGhpcyk7XG4gICAgICAgIG5vZGUuc29ydGFibGVJbmZvID0ge1xuICAgICAgICAgIGNvbGxlY3Rpb246IGNvbGxlY3Rpb24sXG4gICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkLFxuICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICBtYW5hZ2VyOiB0aGlzLmNvbnRleHQubWFuYWdlclxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgICAgICB0aGlzLnJlZiA9IHtcbiAgICAgICAgICBub2RlOiBub2RlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udGV4dC5tYW5hZ2VyLmFkZChjb2xsZWN0aW9uLCB0aGlzLnJlZik7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiBcInVucmVnaXN0ZXJcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiB1bnJlZ2lzdGVyKCkge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5wcm9wcy5jb2xsZWN0aW9uO1xuICAgICAgICB0aGlzLmNvbnRleHQubWFuYWdlci5yZW1vdmUoY29sbGVjdGlvbiwgdGhpcy5yZWYpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogXCJnZXRXcmFwcGVkSW5zdGFuY2VcIixcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRXcmFwcGVkSW5zdGFuY2UoKSB7XG4gICAgICAgIGludmFyaWFudChjb25maWcud2l0aFJlZiwgJ1RvIGFjY2VzcyB0aGUgd3JhcHBlZCBpbnN0YW5jZSwgeW91IG5lZWQgdG8gcGFzcyBpbiB7d2l0aFJlZjogdHJ1ZX0gYXMgdGhlIHNlY29uZCBhcmd1bWVudCBvZiB0aGUgU29ydGFibGVFbGVtZW50KCkgY2FsbCcpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZzLndyYXBwZWRJbnN0YW5jZTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgcmVmID0gY29uZmlnLndpdGhSZWYgPyAnd3JhcHBlZEluc3RhbmNlJyA6IG51bGw7XG4gICAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFdyYXBwZWRDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICAgICAgICByZWY6IHJlZlxuICAgICAgICB9LCBvbWl0KHRoaXMucHJvcHMsIG9taXR0ZWRQcm9wcyQxKSkpO1xuICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBXaXRoU29ydGFibGVFbGVtZW50O1xuICB9KENvbXBvbmVudCksIF9kZWZpbmVQcm9wZXJ0eShfY2xhc3MsIFwiZGlzcGxheU5hbWVcIiwgcHJvdmlkZURpc3BsYXlOYW1lKCdzb3J0YWJsZUVsZW1lbnQnLCBXcmFwcGVkQ29tcG9uZW50KSksIF9kZWZpbmVQcm9wZXJ0eShfY2xhc3MsIFwiY29udGV4dFR5cGVzXCIsIHtcbiAgICBtYW5hZ2VyOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgfSksIF9kZWZpbmVQcm9wZXJ0eShfY2xhc3MsIFwicHJvcFR5cGVzXCIsIHByb3BUeXBlcyQxKSwgX2RlZmluZVByb3BlcnR5KF9jbGFzcywgXCJkZWZhdWx0UHJvcHNcIiwge1xuICAgIGNvbGxlY3Rpb246IDBcbiAgfSksIF90ZW1wO1xufVxuXG5leHBvcnQgeyBzb3J0YWJsZUNvbnRhaW5lciBhcyBTb3J0YWJsZUNvbnRhaW5lciwgc29ydGFibGVDb250YWluZXIsIHNvcnRhYmxlRWxlbWVudCBhcyBTb3J0YWJsZUVsZW1lbnQsIHNvcnRhYmxlRWxlbWVudCwgc29ydGFibGVIYW5kbGUgYXMgU29ydGFibGVIYW5kbGUsIHNvcnRhYmxlSGFuZGxlLCBhcnJheU1vdmUgfTtcbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJ3cFwiXVtcImJsb2NrRWRpdG9yXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJ3cFwiXVtcImkxOG5cIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIlJlYWN0XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJSZWFjdERPTVwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9