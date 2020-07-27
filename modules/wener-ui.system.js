System.register(['react', 'styled-components', 'lodash', 'rxjs'], function (exports) {
  'use strict';
  var React, useRef, useEffect, useMemo, useReducer, useState, useContext, styled, debounce, BehaviorSubject;
  return {
    setters: [function (module) {
      React = module.default;
      useRef = module.useRef;
      useEffect = module.useEffect;
      useMemo = module.useMemo;
      useReducer = module.useReducer;
      useState = module.useState;
      useContext = module.useContext;
    }, function (module) {
      styled = module.default;
    }, function (module) {
      debounce = module.debounce;
    }, function (module) {
      BehaviorSubject = module.BehaviorSubject;
    }],
    execute: function () {

      exports({
        NamedThemeProvider: NamedThemeProvider,
        createContainer: createContainer,
        createSubscriptionContainer: createSubscriptionContainer,
        useAsyncEffect: useAsyncEffect,
        useConstant: useConstant,
        useContainer: useContainer,
        useDebounceEffect: useDebounceEffect,
        useEffectOnce: useEffectOnce,
        useFetchEffect: useFetchEffect,
        useForceRender: useForceRender,
        useInterval: useInterval,
        useMounted: useMounted,
        useNamedTheme: useNamedTheme,
        useOnlineEffect: useOnlineEffect,
        usePromiseEffect: usePromiseEffect,
        withProps: withProps
      });

      function _typeof(obj) {
        "@babel/helpers - typeof";

        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function (obj) {
            return typeof obj;
          };
        } else {
          _typeof = function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          };
        }

        return _typeof(obj);
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

      function _objectSpread2(target) {
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

      function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }

        return Object.freeze(Object.defineProperties(strings, {
          raw: {
            value: Object.freeze(raw)
          }
        }));
      }

      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }

      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }

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

      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }

      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;

        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

        return arr2;
      }

      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      function _templateObject5() {
        var data = _taggedTemplateLiteral(["\n  .leo {\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-radius: 50%;\n  }\n\n  .blue-orbit {\n    width: 165px;\n    height: 165px;\n    border: 1px solid #91daffa5;\n    -webkit-animation: spin3D 3s linear 0.2s infinite;\n  }\n\n  .green-orbit {\n    width: 120px;\n    height: 120px;\n    border: 1px solid #91ffbfa5;\n    -webkit-animation: spin3D 2s linear 0s infinite;\n  }\n\n  .red-orbit {\n    width: 90px;\n    height: 90px;\n    border: 1px solid #ffca91a5;\n    -webkit-animation: spin3D 1s linear 0s infinite;\n  }\n\n  .white-orbit {\n    width: 60px;\n    height: 60px;\n    border: 2px solid #ffffff;\n    -webkit-animation: spin3D 10s linear 0s infinite;\n  }\n\n  .w1 {\n    transform: rotate3D(1, 1, 1, 90deg);\n  }\n\n  .w2 {\n    transform: rotate3D(1, 2, 0.5, 90deg);\n  }\n\n  .w3 {\n    transform: rotate3D(0.5, 1, 2, 90deg);\n  }\n\n  @keyframes spin {\n    from {\n      transform: rotate(0);\n    }\n    to {\n      transform: rotate(359deg);\n    }\n  }\n\n  @keyframes spin3D {\n    from {\n      transform: rotate3d(0.5, 0.5, 0.5, 360deg);\n    }\n    to {\n      transform: rotate3d(0deg);\n    }\n  }\n"]);

        _templateObject5 = function _templateObject5() {
          return data;
        };

        return data;
      }

      function _templateObject4() {
        var data = _taggedTemplateLiteral(["\n  .solar-system {\n    width: 250px;\n    height: 250px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .orbit {\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1px solid #ffffffa5;\n    border-radius: 50%;\n  }\n\n  .earth-orbit {\n    width: 165px;\n    height: 165px;\n    animation: spin 12s linear 0s infinite;\n  }\n\n  .venus-orbit {\n    width: 120px;\n    height: 120px;\n    animation: spin 7.4s linear 0s infinite;\n  }\n\n  .mercury-orbit {\n    width: 90px;\n    height: 90px;\n    animation: spin 3s linear 0s infinite;\n  }\n\n  .planet {\n    position: absolute;\n    top: -5px;\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #3ff9dc;\n  }\n\n  .sun {\n    width: 35px;\n    height: 35px;\n    border-radius: 50%;\n    background-color: #ffab91;\n  }\n"]);

        _templateObject4 = function _templateObject4() {
          return data;
        };

        return data;
      }

      function _templateObject3() {
        var data = _taggedTemplateLiteral(["\n  .pulse-container {\n    width: 120px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n\n  .pulse-bubble {\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    background-color: #3ff9dc;\n  }\n\n  .pulse-bubble-1 {\n    animation: pulse 0.4s ease 0s infinite alternate;\n  }\n  .pulse-bubble-2 {\n    animation: pulse 0.4s ease 0.2s infinite alternate;\n  }\n  .pulse-bubble-3 {\n    animation: pulse 0.4s ease 0.4s infinite alternate;\n  }\n  @keyframes pulse {\n    from {\n      opacity: 1;\n      transform: scale(1);\n    }\n    to {\n      opacity: 0.25;\n      transform: scale(0.75);\n    }\n  }\n"]);

        _templateObject3 = function _templateObject3() {
          return data;
        };

        return data;
      }

      function _templateObject2() {
        var data = _taggedTemplateLiteral(["\n  .circle-border {\n    width: 150px;\n    height: 150px;\n    padding: 3px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-radius: 50%;\n    background: rgb(63, 249, 220);\n    background: linear-gradient(0deg, rgba(63, 249, 220, 0.1) 33%, rgba(63, 249, 220, 1) 100%);\n    animation: spin 0.8s linear 0s infinite;\n  }\n\n  .circle-core {\n    width: 100%;\n    height: 100%;\n    background-color: #37474f;\n    border-radius: 50%;\n  }\n\n  @keyframes spin {\n    from {\n      transform: rotate(0);\n    }\n    to {\n      transform: rotate(359deg);\n    }\n  }\n"]);

        _templateObject2 = function _templateObject2() {
          return data;
        };

        return data;
      }

      function _templateObject() {
        var data = _taggedTemplateLiteral(["\n  width: 300px;\n  height: 300px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: transparent;\n"]);

        _templateObject = function _templateObject() {
          return data;
        };

        return data;
      }

      var SpinnerBox = styled.div(_templateObject());
      var GradientSpinnerBox = styled(SpinnerBox)(_templateObject2());
      var PulseBubbleBox = styled(SpinnerBox)(_templateObject3());
      var GradientSpinner = exports('GradientSpinner', function GradientSpinner() {
        return /*#__PURE__*/React.createElement(GradientSpinnerBox, null, /*#__PURE__*/React.createElement("div", {
          className: "circle-border"
        }, /*#__PURE__*/React.createElement("div", {
          className: "circle-core"
        })));
      });
      var PulseBubble = exports('PulseBubble', function PulseBubble() {
        return /*#__PURE__*/React.createElement(PulseBubbleBox, null, /*#__PURE__*/React.createElement("div", {
          className: "pulse-container"
        }, /*#__PURE__*/React.createElement("div", {
          className: "pulse-bubble pulse-bubble-1"
        }), /*#__PURE__*/React.createElement("div", {
          className: "pulse-bubble pulse-bubble-2"
        }), /*#__PURE__*/React.createElement("div", {
          className: "pulse-bubble pulse-bubble-3"
        })));
      });
      var SolarSystemBox = styled(SpinnerBox)(_templateObject4());
      var SolarSystemSpinner = exports('SolarSystemSpinner', function SolarSystemSpinner() {
        return /*#__PURE__*/React.createElement(SolarSystemBox, null, /*#__PURE__*/React.createElement("div", {
          className: "solar-system"
        }, /*#__PURE__*/React.createElement("div", {
          className: "earth-orbit orbit"
        }, /*#__PURE__*/React.createElement("div", {
          className: "planet earth"
        }), /*#__PURE__*/React.createElement("div", {
          className: "venus-orbit orbit"
        }, /*#__PURE__*/React.createElement("div", {
          className: "planet venus"
        }), /*#__PURE__*/React.createElement("div", {
          className: "mercury-orbit orbit"
        }, /*#__PURE__*/React.createElement("div", {
          className: "planet mercury"
        }), /*#__PURE__*/React.createElement("div", {
          className: "sun"
        }))))));
      });
      var PlanetRotatingBox = exports('PlanetRotatingBox', styled(SpinnerBox)(_templateObject5()));
      var PlantRotating = exports('PlantRotating', function PlantRotating() {
        return /*#__PURE__*/React.createElement(PlanetRotatingBox, null, /*#__PURE__*/React.createElement("div", {
          className: "blue-orbit leo"
        }), /*#__PURE__*/React.createElement("div", {
          className: "green-orbit leo"
        }), /*#__PURE__*/React.createElement("div", {
          className: "red-orbit leo"
        }), /*#__PURE__*/React.createElement("div", {
          className: "white-orbit w1 leo"
        }), /*#__PURE__*/React.createElement("div", {
          className: "white-orbit w2 leo"
        }), /*#__PURE__*/React.createElement("div", {
          className: "white-orbit w3 leo"
        }));
      });

      function _templateObject$1() {
        var data = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 35px;\n  height: 35px;\n  left: 50%;\n  top: 50%;\n  & > div {\n    position: absolute;\n    width: 2px;\n    height: 8px;\n    background-color: #25363f;\n    opacity: 0.05;\n    animation: fadeit 0.8s linear infinite;\n  }\n\n  ", "\n\n  @keyframes fadeit {\n    0% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n"]);

        _templateObject$1 = function _templateObject() {
          return data;
        };

        return data;
      }

      var BarsSpinnerBox = styled.div(_templateObject$1(), function (_ref) {
        var bars = _ref.bars;
        return Array(bars).fill(null).map(function (_, i) {
          return "\n  & > div:nth-child(".concat(i + 1, ") {\n    transform: rotate(").concat((360 / bars * i).toFixed(2), "deg) translate(0, -12px);\n    animation-delay:").concat((0.8 / bars * (i + 1)).toFixed(2), "s;\n  }\n  ");
        });
      });
      var BarsSpinner = exports('BarsSpinner', function BarsSpinner(_ref2) {
        var _ref2$bars = _ref2.bars,
            bars = _ref2$bars === void 0 ? 16 : _ref2$bars;
        return /*#__PURE__*/React.createElement(BarsSpinnerBox, {
          bars: bars
        }, Array(bars).fill(null).map(function (_, i) {
          return /*#__PURE__*/React.createElement("div", {
            key: i
          });
        }));
      });

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

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
      }

      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };

        return _setPrototypeOf(o, p);
      }

      function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf("[native code]") !== -1;
      }

      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;

        try {
          Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
          return true;
        } catch (e) {
          return false;
        }
      }

      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct;
        } else {
          _construct = function _construct(Parent, args, Class) {
            var a = [null];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
          };
        }

        return _construct.apply(null, arguments);
      }

      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? new Map() : undefined;

        _wrapNativeSuper = function _wrapNativeSuper(Class) {
          if (Class === null || !_isNativeFunction(Class)) return Class;

          if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }

          if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);

            _cache.set(Class, Wrapper);
          }

          function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
          }

          Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
              value: Wrapper,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          return _setPrototypeOf(Wrapper, Class);
        };

        return _wrapNativeSuper(Class);
      }

      /**
       * Parse errors.md and turn it into a simple hash of code: message
       * @private
       */

      var ERRORS = {
        "1": "Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).\n\n",
        "2": "Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).\n\n",
        "3": "Passed an incorrect argument to a color function, please pass a string representation of a color.\n\n",
        "4": "Couldn't generate valid rgb string from %s, it returned %s.\n\n",
        "5": "Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.\n\n",
        "6": "Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).\n\n",
        "7": "Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).\n\n",
        "8": "Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.\n\n",
        "9": "Please provide a number of steps to the modularScale helper.\n\n",
        "10": "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
        "11": "Invalid value passed as base to modularScale, expected number or em string but got \"%s\"\n\n",
        "12": "Expected a string ending in \"px\" or a number passed as the first argument to %s(), got \"%s\" instead.\n\n",
        "13": "Expected a string ending in \"px\" or a number passed as the second argument to %s(), got \"%s\" instead.\n\n",
        "14": "Passed invalid pixel value (\"%s\") to %s(), please pass a value like \"12px\" or 12.\n\n",
        "15": "Passed invalid base value (\"%s\") to %s(), please pass a value like \"12px\" or 12.\n\n",
        "16": "You must provide a template to this method.\n\n",
        "17": "You passed an unsupported selector state to this method.\n\n",
        "18": "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
        "19": "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
        "20": "expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
        "21": "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
        "22": "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
        "23": "fontFace expects a name of a font-family.\n\n",
        "24": "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
        "25": "fontFace expects localFonts to be an array.\n\n",
        "26": "fontFace expects fileFormats to be an array.\n\n",
        "27": "radialGradient requries at least 2 color-stops to properly render.\n\n",
        "28": "Please supply a filename to retinaImage() as the first argument.\n\n",
        "29": "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
        "30": "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
        "31": "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation\n\n",
        "32": "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')\n\n",
        "33": "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation\n\n",
        "34": "borderRadius expects a radius value as a string or number as the second argument.\n\n",
        "35": "borderRadius expects one of \"top\", \"bottom\", \"left\" or \"right\" as the first argument.\n\n",
        "36": "Property must be a string value.\n\n",
        "37": "Syntax Error at %s.\n\n",
        "38": "Formula contains a function that needs parentheses at %s.\n\n",
        "39": "Formula is missing closing parenthesis at %s.\n\n",
        "40": "Formula has too many closing parentheses at %s.\n\n",
        "41": "All values in a formula must have the same unit or be unitless.\n\n",
        "42": "Please provide a number of steps to the modularScale helper.\n\n",
        "43": "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
        "44": "Invalid value passed as base to modularScale, expected number or em/rem string but got %s.\n\n",
        "45": "Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.\n\n",
        "46": "Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.\n\n",
        "47": "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
        "48": "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
        "49": "Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
        "50": "Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.\n\n",
        "51": "Expects the first argument object to have the properties prop, fromSize, and toSize.\n\n",
        "52": "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
        "53": "fontFace expects localFonts to be an array.\n\n",
        "54": "fontFace expects fileFormats to be an array.\n\n",
        "55": "fontFace expects a name of a font-family.\n\n",
        "56": "linearGradient requries at least 2 color-stops to properly render.\n\n",
        "57": "radialGradient requries at least 2 color-stops to properly render.\n\n",
        "58": "Please supply a filename to retinaImage() as the first argument.\n\n",
        "59": "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
        "60": "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
        "61": "Property must be a string value.\n\n",
        "62": "borderRadius expects a radius value as a string or number as the second argument.\n\n",
        "63": "borderRadius expects one of \"top\", \"bottom\", \"left\" or \"right\" as the first argument.\n\n",
        "64": "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.\n\n",
        "65": "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').\n\n",
        "66": "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.\n\n",
        "67": "You must provide a template to this method.\n\n",
        "68": "You passed an unsupported selector state to this method.\n\n",
        "69": "Expected a string ending in \"px\" or a number passed as the first argument to %s(), got %s instead.\n\n",
        "70": "Expected a string ending in \"px\" or a number passed as the second argument to %s(), got %s instead.\n\n",
        "71": "Passed invalid pixel value %s to %s(), please pass a value like \"12px\" or 12.\n\n",
        "72": "Passed invalid base value %s to %s(), please pass a value like \"12px\" or 12.\n\n",
        "73": "Please provide a valid CSS variable.\n\n",
        "74": "CSS variable not found.\n"
      };
      /**
       * super basic version of sprintf
       * @private
       */

      function format() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var a = args[0];
        var b = [];
        var c;

        for (c = 1; c < args.length; c += 1) {
          b.push(args[c]);
        }

        b.forEach(function (d) {
          a = a.replace(/%[a-z]/, d);
        });
        return a;
      }
      /**
       * Create an error file out of errors.md for development and a simple web link to the full errors
       * in production mode.
       * @private
       */


      var PolishedError = /*#__PURE__*/function (_Error) {
        _inheritsLoose(PolishedError, _Error);

        function PolishedError(code) {
          var _this;

          if (process.env.NODE_ENV === 'production') {
            _this = _Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/master/src/internalHelpers/errors.md#" + code + " for more information.") || this;
          } else {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            _this = _Error.call(this, format.apply(void 0, [ERRORS[code]].concat(args))) || this;
          }

          return _assertThisInitialized(_this);
        }

        return PolishedError;
      }( /*#__PURE__*/_wrapNativeSuper(Error));

      function colorToInt(color) {
        return Math.round(color * 255);
      }

      function convertToInt(red, green, blue) {
        return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
      }

      function hslToRgb(hue, saturation, lightness, convert) {
        if (convert === void 0) {
          convert = convertToInt;
        }

        if (saturation === 0) {
          // achromatic
          return convert(lightness, lightness, lightness);
        } // formulae from https://en.wikipedia.org/wiki/HSL_and_HSV


        var huePrime = (hue % 360 + 360) % 360 / 60;
        var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
        var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
        var red = 0;
        var green = 0;
        var blue = 0;

        if (huePrime >= 0 && huePrime < 1) {
          red = chroma;
          green = secondComponent;
        } else if (huePrime >= 1 && huePrime < 2) {
          red = secondComponent;
          green = chroma;
        } else if (huePrime >= 2 && huePrime < 3) {
          green = chroma;
          blue = secondComponent;
        } else if (huePrime >= 3 && huePrime < 4) {
          green = secondComponent;
          blue = chroma;
        } else if (huePrime >= 4 && huePrime < 5) {
          red = secondComponent;
          blue = chroma;
        } else if (huePrime >= 5 && huePrime < 6) {
          red = chroma;
          blue = secondComponent;
        }

        var lightnessModification = lightness - chroma / 2;
        var finalRed = red + lightnessModification;
        var finalGreen = green + lightnessModification;
        var finalBlue = blue + lightnessModification;
        return convert(finalRed, finalGreen, finalBlue);
      }

      var namedColorMap = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkgrey: 'a9a9a9',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkslategrey: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dimgrey: '696969',
        dodgerblue: '1e90ff',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        grey: '808080',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred: 'cd5c5c',
        indigo: '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgray: 'd3d3d3',
        lightgreen: '90ee90',
        lightgrey: 'd3d3d3',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslategray: '789',
        lightslategrey: '789',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '0f0',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'f0f',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370db',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'db7093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        rebeccapurple: '639',
        red: 'f00',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        slategrey: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        wheat: 'f5deb3',
        white: 'fff',
        whitesmoke: 'f5f5f5',
        yellow: 'ff0',
        yellowgreen: '9acd32'
      };
      /**
       * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
       * @private
       */

      function nameToHex(color) {
        if (typeof color !== 'string') return color;
        var normalizedColorName = color.toLowerCase();
        return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
      }

      var hexRegex = /^#[a-fA-F0-9]{6}$/;
      var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
      var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
      var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
      var rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;
      var rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;
      var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i;
      var hslaRegex = /^hsla\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;
      /**
       * Returns an RgbColor or RgbaColor object. This utility function is only useful
       * if want to extract a color component. With the color util `toColorString` you
       * can convert a RgbColor or RgbaColor object back to a string.
       *
       * @example
       * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
       * const color1 = parseToRgb('rgb(255, 0, 0)');
       * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
       * const color2 = parseToRgb('hsla(210, 10%, 40%, 0.75)');
       */

      function parseToRgb(color) {
        if (typeof color !== 'string') {
          throw new PolishedError(3);
        }

        var normalizedColor = nameToHex(color);

        if (normalizedColor.match(hexRegex)) {
          return {
            red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
            green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
            blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
          };
        }

        if (normalizedColor.match(hexRgbaRegex)) {
          var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
          return {
            red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
            green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
            blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
            alpha: alpha
          };
        }

        if (normalizedColor.match(reducedHexRegex)) {
          return {
            red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
            green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
            blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
          };
        }

        if (normalizedColor.match(reducedRgbaHexRegex)) {
          var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));

          return {
            red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
            green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
            blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
            alpha: _alpha
          };
        }

        var rgbMatched = rgbRegex.exec(normalizedColor);

        if (rgbMatched) {
          return {
            red: parseInt("" + rgbMatched[1], 10),
            green: parseInt("" + rgbMatched[2], 10),
            blue: parseInt("" + rgbMatched[3], 10)
          };
        }

        var rgbaMatched = rgbaRegex.exec(normalizedColor);

        if (rgbaMatched) {
          return {
            red: parseInt("" + rgbaMatched[1], 10),
            green: parseInt("" + rgbaMatched[2], 10),
            blue: parseInt("" + rgbaMatched[3], 10),
            alpha: parseFloat("" + rgbaMatched[4])
          };
        }

        var hslMatched = hslRegex.exec(normalizedColor);

        if (hslMatched) {
          var hue = parseInt("" + hslMatched[1], 10);
          var saturation = parseInt("" + hslMatched[2], 10) / 100;
          var lightness = parseInt("" + hslMatched[3], 10) / 100;
          var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
          var hslRgbMatched = rgbRegex.exec(rgbColorString);

          if (!hslRgbMatched) {
            throw new PolishedError(4, normalizedColor, rgbColorString);
          }

          return {
            red: parseInt("" + hslRgbMatched[1], 10),
            green: parseInt("" + hslRgbMatched[2], 10),
            blue: parseInt("" + hslRgbMatched[3], 10)
          };
        }

        var hslaMatched = hslaRegex.exec(normalizedColor);

        if (hslaMatched) {
          var _hue = parseInt("" + hslaMatched[1], 10);

          var _saturation = parseInt("" + hslaMatched[2], 10) / 100;

          var _lightness = parseInt("" + hslaMatched[3], 10) / 100;

          var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";

          var _hslRgbMatched = rgbRegex.exec(_rgbColorString);

          if (!_hslRgbMatched) {
            throw new PolishedError(4, normalizedColor, _rgbColorString);
          }

          return {
            red: parseInt("" + _hslRgbMatched[1], 10),
            green: parseInt("" + _hslRgbMatched[2], 10),
            blue: parseInt("" + _hslRgbMatched[3], 10),
            alpha: parseFloat("" + hslaMatched[4])
          };
        }

        throw new PolishedError(5);
      }

      function rgbToHsl(color) {
        // make sure rgb are contained in a set of [0, 255]
        var red = color.red / 255;
        var green = color.green / 255;
        var blue = color.blue / 255;
        var max = Math.max(red, green, blue);
        var min = Math.min(red, green, blue);
        var lightness = (max + min) / 2;

        if (max === min) {
          // achromatic
          if (color.alpha !== undefined) {
            return {
              hue: 0,
              saturation: 0,
              lightness: lightness,
              alpha: color.alpha
            };
          } else {
            return {
              hue: 0,
              saturation: 0,
              lightness: lightness
            };
          }
        }

        var hue;
        var delta = max - min;
        var saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

        switch (max) {
          case red:
            hue = (green - blue) / delta + (green < blue ? 6 : 0);
            break;

          case green:
            hue = (blue - red) / delta + 2;
            break;

          default:
            // blue case
            hue = (red - green) / delta + 4;
            break;
        }

        hue *= 60;

        if (color.alpha !== undefined) {
          return {
            hue: hue,
            saturation: saturation,
            lightness: lightness,
            alpha: color.alpha
          };
        }

        return {
          hue: hue,
          saturation: saturation,
          lightness: lightness
        };
      }
      /**
       * Returns an HslColor or HslaColor object. This utility function is only useful
       * if want to extract a color component. With the color util `toColorString` you
       * can convert a HslColor or HslaColor object back to a string.
       *
       * @example
       * // Assigns `{ hue: 0, saturation: 1, lightness: 0.5 }` to color1
       * const color1 = parseToHsl('rgb(255, 0, 0)');
       * // Assigns `{ hue: 128, saturation: 1, lightness: 0.5, alpha: 0.75 }` to color2
       * const color2 = parseToHsl('hsla(128, 100%, 50%, 0.75)');
       */


      function parseToHsl(color) {
        // Note: At a later stage we can optimize this function as right now a hsl
        // color would be parsed converted to rgb values and converted back to hsl.
        return rgbToHsl(parseToRgb(color));
      }
      /**
       * Reduces hex values if possible e.g. #ff8866 to #f86
       * @private
       */


      var reduceHexValue = function reduceHexValue(value) {
        if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
          return "#" + value[1] + value[3] + value[5];
        }

        return value;
      };

      function numberToHex(value) {
        var hex = value.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      }

      function colorToHex(color) {
        return numberToHex(Math.round(color * 255));
      }

      function convertToHex(red, green, blue) {
        return reduceHexValue("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
      }

      function hslToHex(hue, saturation, lightness) {
        return hslToRgb(hue, saturation, lightness, convertToHex);
      }
      /**
       * Returns a string value for the color. The returned result is the smallest possible hex notation.
       *
       * @example
       * // Styles as object usage
       * const styles = {
       *   background: hsl(359, 0.75, 0.4),
       *   background: hsl({ hue: 360, saturation: 0.75, lightness: 0.4 }),
       * }
       *
       * // styled-components usage
       * const div = styled.div`
       *   background: ${hsl(359, 0.75, 0.4)};
       *   background: ${hsl({ hue: 360, saturation: 0.75, lightness: 0.4 })};
       * `
       *
       * // CSS in JS Output
       *
       * element {
       *   background: "#b3191c";
       *   background: "#b3191c";
       * }
       */


      function hsl(value, saturation, lightness) {
        if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number') {
          return hslToHex(value, saturation, lightness);
        } else if (_typeof(value) === 'object' && saturation === undefined && lightness === undefined) {
          return hslToHex(value.hue, value.saturation, value.lightness);
        }

        throw new PolishedError(1);
      }
      /**
       * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
       *
       * @example
       * // Styles as object usage
       * const styles = {
       *   background: hsla(359, 0.75, 0.4, 0.7),
       *   background: hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 }),
       *   background: hsla(359, 0.75, 0.4, 1),
       * }
       *
       * // styled-components usage
       * const div = styled.div`
       *   background: ${hsla(359, 0.75, 0.4, 0.7)};
       *   background: ${hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 })};
       *   background: ${hsla(359, 0.75, 0.4, 1)};
       * `
       *
       * // CSS in JS Output
       *
       * element {
       *   background: "rgba(179,25,28,0.7)";
       *   background: "rgba(179,25,28,0.7)";
       *   background: "#b3191c";
       * }
       */


      function hsla(value, saturation, lightness, alpha) {
        if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number' && typeof alpha === 'number') {
          return alpha >= 1 ? hslToHex(value, saturation, lightness) : "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
        } else if (_typeof(value) === 'object' && saturation === undefined && lightness === undefined && alpha === undefined) {
          return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
        }

        throw new PolishedError(2);
      }
      /**
       * Returns a string value for the color. The returned result is the smallest possible hex notation.
       *
       * @example
       * // Styles as object usage
       * const styles = {
       *   background: rgb(255, 205, 100),
       *   background: rgb({ red: 255, green: 205, blue: 100 }),
       * }
       *
       * // styled-components usage
       * const div = styled.div`
       *   background: ${rgb(255, 205, 100)};
       *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
       * `
       *
       * // CSS in JS Output
       *
       * element {
       *   background: "#ffcd64";
       *   background: "#ffcd64";
       * }
       */


      function rgb(value, green, blue) {
        if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
          return reduceHexValue("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
        } else if (_typeof(value) === 'object' && green === undefined && blue === undefined) {
          return reduceHexValue("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
        }

        throw new PolishedError(6);
      }
      /**
       * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
       *
       * Can also be used to fade a color by passing a hex value or named CSS color along with an alpha value.
       *
       * @example
       * // Styles as object usage
       * const styles = {
       *   background: rgba(255, 205, 100, 0.7),
       *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
       *   background: rgba(255, 205, 100, 1),
       *   background: rgba('#ffffff', 0.4),
       *   background: rgba('black', 0.7),
       * }
       *
       * // styled-components usage
       * const div = styled.div`
       *   background: ${rgba(255, 205, 100, 0.7)};
       *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
       *   background: ${rgba(255, 205, 100, 1)};
       *   background: ${rgba('#ffffff', 0.4)};
       *   background: ${rgba('black', 0.7)};
       * `
       *
       * // CSS in JS Output
       *
       * element {
       *   background: "rgba(255,205,100,0.7)";
       *   background: "rgba(255,205,100,0.7)";
       *   background: "#ffcd64";
       *   background: "rgba(255,255,255,0.4)";
       *   background: "rgba(0,0,0,0.7)";
       * }
       */


      function rgba(firstValue, secondValue, thirdValue, fourthValue) {
        if (typeof firstValue === 'string' && typeof secondValue === 'number') {
          var rgbValue = parseToRgb(firstValue);
          return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
        } else if (typeof firstValue === 'number' && typeof secondValue === 'number' && typeof thirdValue === 'number' && typeof fourthValue === 'number') {
          return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
        } else if (_typeof(firstValue) === 'object' && secondValue === undefined && thirdValue === undefined && fourthValue === undefined) {
          return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
        }

        throw new PolishedError(7);
      }

      var isRgb = function isRgb(color) {
        return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
      };

      var isRgba = function isRgba(color) {
        return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && typeof color.alpha === 'number';
      };

      var isHsl = function isHsl(color) {
        return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
      };

      var isHsla = function isHsla(color) {
        return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && typeof color.alpha === 'number';
      };
      /**
       * Converts a RgbColor, RgbaColor, HslColor or HslaColor object to a color string.
       * This util is useful in case you only know on runtime which color object is
       * used. Otherwise we recommend to rely on `rgb`, `rgba`, `hsl` or `hsla`.
       *
       * @example
       * // Styles as object usage
       * const styles = {
       *   background: toColorString({ red: 255, green: 205, blue: 100 }),
       *   background: toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
       *   background: toColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
       *   background: toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
       * }
       *
       * // styled-components usage
       * const div = styled.div`
       *   background: ${toColorString({ red: 255, green: 205, blue: 100 })};
       *   background: ${toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
       *   background: ${toColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
       *   background: ${toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
       * `
       *
       * // CSS in JS Output
       * element {
       *   background: "#ffcd64";
       *   background: "rgba(255,205,100,0.72)";
       *   background: "#00f";
       *   background: "rgba(179,25,25,0.72)";
       * }
       */


      function toColorString(color) {
        if (_typeof(color) !== 'object') throw new PolishedError(8);
        if (isRgba(color)) return rgba(color);
        if (isRgb(color)) return rgb(color);
        if (isHsla(color)) return hsla(color);
        if (isHsl(color)) return hsl(color);
        throw new PolishedError(8);
      } // Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line no-redeclare


      function curried(f, length, acc) {
        return function fn() {
          // eslint-disable-next-line prefer-rest-params
          var combined = acc.concat(Array.prototype.slice.call(arguments));
          return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
        };
      } // eslint-disable-next-line no-redeclare


      function curry(f) {
        // eslint-disable-line no-redeclare
        return curried(f, f.length, []);
      }

      function guard(lowerBoundary, upperBoundary, value) {
        return Math.max(lowerBoundary, Math.min(upperBoundary, value));
      }
      /**
       * Returns a string value for the darkened color.
       *
       * @example
       * // Styles as object usage
       * const styles = {
       *   background: darken(0.2, '#FFCD64'),
       *   background: darken('0.2', 'rgba(255,205,100,0.7)'),
       * }
       *
       * // styled-components usage
       * const div = styled.div`
       *   background: ${darken(0.2, '#FFCD64')};
       *   background: ${darken('0.2', 'rgba(255,205,100,0.7)')};
       * `
       *
       * // CSS in JS Output
       *
       * element {
       *   background: "#ffbd31";
       *   background: "rgba(255,189,49,0.7)";
       * }
       */


      function darken(amount, color) {
        if (color === 'transparent') return color;
        var hslColor = parseToHsl(color);
        return toColorString(_extends({}, hslColor, {
          lightness: guard(0, 1, hslColor.lightness - parseFloat(amount))
        }));
      } // prettier-ignore


      var curriedDarken = /*#__PURE__*/curry
      /* ::<number | string, string, string> */
      (darken);

      function _templateObject$2() {
        var data = _taggedTemplateLiteral(["\n  --size: ", ";\n\n  .container {\n    ", ";\n    transform-style: preserve-3d;\n    perspective: 2000px;\n    transform: rotateX(-30deg) rotateY(-45deg);\n\n    *,\n    *:before,\n    *:after {\n      box-sizing: border-box;\n    }\n  }\n\n  .holder {\n    ", ";\n    transform-style: preserve-3d;\n    transform: translate3d(0em, var(--size), calc(var(--size) * 0.5));\n    &:nth-child(3) {\n      transform: rotateY(-90deg) rotateX(90deg) translate3d(0, var(--size), calc(var(--size) * 0.5));\n    }\n    &:first-child {\n      transform: rotateZ(-90deg) rotateX(-90deg) translate3d(0, var(--size), calc(var(--size) * 0.5));\n    }\n  }\n\n  ", "\n\n  .info {\n    ", ";\n    padding-top: 180px;\n\n    .title {\n      font-size: 20px;\n      font-weight: 400;\n      text-align: center;\n      color: #212121;\n    }\n\n    .detail {\n      font-size: 14px;\n      font-weight: 200;\n      text-align: center;\n    }\n  }\n\n  .box {\n    ", ";\n    transform-style: preserve-3d;\n    animation: ani-box 6s infinite;\n    width: var(--size);\n    height: var(--size);\n    //opacity: .9;\n    &:before,\n    &:after {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      content: '';\n    }\n    &:before {\n      left: 100%;\n      bottom: 0;\n      transform: rotateY(90deg);\n      transform-origin: 0 50%;\n    }\n    &:after {\n      left: 0;\n      bottom: 100%;\n      transform: rotateX(90deg);\n      transform-origin: 0 100%;\n    }\n  }\n\n  @keyframes ani-box {\n    8.33% {\n      transform: translate3d(-50%, -50%, 0) scaleZ(2);\n    }\n    16.7% {\n      transform: translate3d(-50%, -50%, calc(-1 * var(--size))) scaleZ(1);\n    }\n    25% {\n      transform: translate3d(-50%, -100%, calc(-1 * var(--size))) scaleY(2);\n    }\n    33.3% {\n      transform: translate3d(-50%, -150%, calc(-1 * var(--size))) scaleY(1);\n    }\n    41.7% {\n      transform: translate3d(-100%, -150%, calc(-1 * var(--size))) scaleX(2);\n    }\n    50% {\n      transform: translate3d(-150%, -150%, calc(-1 * var(--size))) scaleX(1);\n    }\n    58.3% {\n      transform: translate3d(-150%, -150%, 0) scaleZ(2);\n    }\n    66.7% {\n      transform: translate3d(-150%, -150%, 0) scaleZ(1);\n    }\n    75% {\n      transform: translate3d(-150%, -100%, 0) scaleY(2);\n    }\n    83.3% {\n      transform: translate3d(-150%, -50%, 0) scaleY(1);\n    }\n    91.7% {\n      transform: translate3d(-100%, -50%, 0) scaleX(2);\n    }\n    100% {\n      transform: translate3d(-50%, -50%, 0) scaleX(1);\n    }\n  }\n"]);

        _templateObject$2 = function _templateObject() {
          return data;
        };

        return data;
      }

      var cbox = function cbox(props) {
        return "\nposition: absolute;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);\n";
      };

      var BoxShuffleContainer = styled.div(_templateObject$2(), function (props) {
        return props['size'] || '3em';
      }, cbox, cbox, function (props) {
        return (props.colors || ['#1FBCD3', '#CBE2B4', '#F6B6CA']).map(function (color, i) {
          return "\n    .holder:nth-child(".concat(i + 1, "){\n      .box{\n        background-color: ").concat(color, ";\n        &:before{\n          background-color: ").concat(curriedDarken(0.2, color), ";\n        }\n        &:after{\n          background-color: ").concat(curriedDarken(0.1, color), ";\n        }\n      }\n    }\n  }\n");
        });
      }, cbox, cbox);
      var BoxShuffle = exports('BoxShuffle', function BoxShuffle(props) {
        var title = props.title,
            detail = props.detail;
        return /*#__PURE__*/React.createElement(BoxShuffleContainer, null, /*#__PURE__*/React.createElement("div", {
          className: "container"
        }, /*#__PURE__*/React.createElement("div", {
          className: "holder"
        }, /*#__PURE__*/React.createElement("div", {
          className: "box"
        })), /*#__PURE__*/React.createElement("div", {
          className: "holder"
        }, /*#__PURE__*/React.createElement("div", {
          className: "box"
        })), /*#__PURE__*/React.createElement("div", {
          className: "holder"
        }, /*#__PURE__*/React.createElement("div", {
          className: "box"
        }))), /*#__PURE__*/React.createElement("div", {
          className: "info"
        }, /*#__PURE__*/React.createElement("div", {
          className: "title"
        }, title), /*#__PURE__*/React.createElement("div", {
          className: "detail"
        }, detail)));
      });

      function _templateObject$3() {
        var data = _taggedTemplateLiteral(["\n  width: 200px;\n  height: 200px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  margin: auto;\n  filter: url('#gooey-loader-filter');\n  animation: rotate-move 2s ease-in-out infinite;\n\n  .dot {\n    width: 70px;\n    height: 70px;\n    border-radius: 50%;\n    background-color: #000;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: auto;\n  }\n\n  .dot-3 {\n    background-color: #f74d75;\n    animation: dot-3-move 2s ease infinite, index 6s ease infinite;\n  }\n\n  .dot-2 {\n    background-color: #10beae;\n    animation: dot-2-move 2s ease infinite, index 6s -4s ease infinite;\n  }\n\n  .dot-1 {\n    background-color: #ffe386;\n    animation: dot-1-move 2s ease infinite, index 6s -2s ease infinite;\n  }\n\n  @keyframes dot-3-move {\n    20% {\n      transform: scale(1);\n    }\n    45% {\n      transform: translateY(-18px) scale(0.45);\n    }\n    60% {\n      transform: translateY(-90px) scale(0.45);\n    }\n    80% {\n      transform: translateY(-90px) scale(0.45);\n    }\n    100% {\n      transform: translateY(0px) scale(1);\n    }\n  }\n\n  @keyframes dot-2-move {\n    20% {\n      transform: scale(1);\n    }\n    45% {\n      transform: translate(-16px, 12px) scale(0.45);\n    }\n    60% {\n      transform: translate(-80px, 60px) scale(0.45);\n    }\n    80% {\n      transform: translate(-80px, 60px) scale(0.45);\n    }\n    100% {\n      transform: translateY(0px) scale(1);\n    }\n  }\n\n  @keyframes dot-1-move {\n    20% {\n      transform: scale(1);\n    }\n    45% {\n      transform: translate(16px, 12px) scale(0.45);\n    }\n    60% {\n      transform: translate(80px, 60px) scale(0.45);\n    }\n    80% {\n      transform: translate(80px, 60px) scale(0.45);\n    }\n    100% {\n      transform: translateY(0px) scale(1);\n    }\n  }\n\n  @keyframes rotate-move {\n    55% {\n      transform: translate(-50%, -50%) rotate(0deg);\n    }\n    80% {\n      transform: translate(-50%, -50%) rotate(360deg);\n    }\n    100% {\n      transform: translate(-50%, -50%) rotate(360deg);\n    }\n  }\n\n  @keyframes index {\n    0%,\n    100% {\n      z-index: 3;\n    }\n    33.3% {\n      z-index: 2;\n    }\n    66.6% {\n      z-index: 1;\n    }\n  }\n"]);

        _templateObject$3 = function _templateObject() {
          return data;
        };

        return data;
      }
      var GooeyLoaderContainer = styled.div(_templateObject$3());

      function loadSvgFilter() {
        if (typeof window === 'undefined') {
          return;
        }

        if (document.querySelector('#GooeyLoaderSvgFilter')) {
          return;
        }

        var el = document.createElement('div');
        el.id = 'GooeyLoaderSvgFilter';
        el.innerHTML = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">\n  <defs>\n    <filter id=\"gooey-loader-filter\">\n      <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"10\" result=\"blur\" />\n      <feColorMatrix in=\"blur\" mode=\"matrix\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7\"/>\n    </filter>\n  </defs>\n</svg>\n";
        document.body.appendChild(el);
      }
      /**
       * GooeyLoader
       *
       * @see https://codepen.io/Izumenko/pen/MpWyXK
       */


      var GooeyLoader = exports('GooeyLoader', function GooeyLoader() {
        loadSvgFilter();
        return /*#__PURE__*/React.createElement(GooeyLoaderContainer, null, /*#__PURE__*/React.createElement("div", {
          className: "dot dot-1"
        }), /*#__PURE__*/React.createElement("div", {
          className: "dot dot-2"
        }), /*#__PURE__*/React.createElement("div", {
          className: "dot dot-3"
        }));
      });

      function useAsyncEffect(effect, deps) {
        var ref = useRef();
        useEffect(function () {
          effect({
            setCloser: function setCloser(v) {
              return ref.current = v;
            }
          }).then(function (v) {
            return typeof v === 'function' ? ref.current = v : null;
          })["catch"](function (e) {
            console.trace("useAsyncEffect error", deps, e);
          });
          return function () {
            var _ref$current;

            return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.call(ref);
          };
        }, deps);
      }

      /**
       * create only once
       *
       * @see https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
       * @see https://github.com/Andarist/use-constant/blob/master/src/index.ts
       */
      function useConstant(fn) {
        var ref = React.useRef();

        if (!ref.current) {
          ref.current = {
            v: fn()
          };
        }

        return ref.current.v;
      }

      function useDebounceEffect(cb, deps, wait) {
        var bounce = useMemo(function () {
          return debounce(function () {
            cb === null || cb === void 0 ? void 0 : cb();
          }, wait);
        }, [cb, wait]);
        useEffect(function () {
          bounce();
          return function () {
            return bounce.cancel();
          };
        }, deps);
      }

      function useForceRender() {
        // const [, set] = useState();
        // return () => set({});
        var _useReducer = useReducer(function (s) {
          return s + 1;
        }, 0),
            _useReducer2 = _slicedToArray(_useReducer, 2),
            forceRender = _useReducer2[1];

        return forceRender;
      }

      function useInterval(handler, interval) {
        var ref = useRef(); // const [count, setCount] = useState(0);
        // useEffect(handler, [count]);

        useEffect(function () {
          // ref.current = setInterval(() => setCount(v => v + 1), interval);
          ref.current = setInterval(handler, interval);
          return function () {
            return clearInterval(ref.current);
          };
        }, [interval]);
      }

      /**
       * 配合 nextjs 可以实现只有客户端才渲染的组件
       * @see https://github.com/zeit/next.js/blob/canary/examples/progressive-render/pages/index.js
       */

      function useMounted() {
        var _useState = useState(false),
            _useState2 = _slicedToArray(_useState, 2),
            mounted = _useState2[0],
            setMounted = _useState2[1];

        useEffect(function () {
          return setMounted(true);
        }, []);
        return mounted;
      }

      function useOnlineEffect() {
        var _window, _window$navigator;

        var _useState = useState((_window = window) === null || _window === void 0 ? void 0 : (_window$navigator = _window.navigator) === null || _window$navigator === void 0 ? void 0 : _window$navigator.onLine),
            _useState2 = _slicedToArray(_useState, 2),
            online = _useState2[0],
            setOnline = _useState2[1];

        useEffect(function () {
          var handler = function handler(e) {
            return setOnline(e.type === 'online');
          };

          window.addEventListener('online', handler);
          window.addEventListener('offline', handler);
          return function () {
            window.removeEventListener('online', handler);
            window.removeEventListener('offline', handler);
          };
        }, []);
        return online;
      }

      var NamedThemeContext = /*#__PURE__*/React.createContext(new BehaviorSubject(null));
      function NamedThemeProvider(_ref) {
        var children = _ref.children,
            initialTheme = _ref.initialTheme;
        var state = useConstant(function () {
          return new BehaviorSubject(typeof initialTheme === 'function' ? initialTheme() : initialTheme);
        });
        useEffect(function () {
          return function () {
            return state.complete();
          };
        }, []);
        return /*#__PURE__*/React.createElement(NamedThemeContext.Provider, {
          value: state
        }, children);
      }
      function useNamedTheme() {
        var state = useContext(NamedThemeContext);

        var _useState = useState(state.value),
            _useState2 = _slicedToArray(_useState, 2),
            theme = _useState2[0],
            setTheme = _useState2[1];

        useEffect(function () {
          var subscribe = state.subscribe(setTheme);
          return subscribe.unsubscribe.bind(subscribe);
        }, [state]);
        return [theme, function (v) {
          return state.next(v);
        }];
      }

      function useEffectOnce(effect) {
        React.useEffect(effect, []);
      }

      function isPromise(v) {
        return v && v.then && v["catch"];
      }

      function usePromiseEffect(v) {
        var _React$useState = React.useState(function () {
          if (isPromise(v)) {
            return {
              loading: true
            };
          }

          return {
            loading: false,
            data: v
          };
        }),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            state = _React$useState2[0],
            setState = _React$useState2[1];

        React.useEffect(function () {
          if (isPromise(v)) {
            setState(function (state) {
              return _objectSpread2(_objectSpread2({}, state), {}, {
                loading: true,
                error: undefined
              });
            });
            v.then(function (data) {
              return setState({
                loading: false,
                data: data
              });
            })["catch"](function (error) {
              return setState({
                loading: false,
                error: error
              });
            });
          } else {
            // prevent useless state change
            setState(function (state) {
              if (state.data === v) {
                return state;
              }

              return {
                loading: false,
                data: v
              };
            });
          }
        }, [v]);
        return state;
      }

      function useFetchEffect(fetcher, deps) {
        var _React$useState = React.useState(function () {
          try {
            return fetcher();
          } catch (error) {
            return Promise.reject(error);
          }
        }),
            _React$useState2 = _slicedToArray(_React$useState, 2),
            result = _React$useState2[0],
            setResult = _React$useState2[1];

        var initial = React.useRef(true);
        React.useEffect(function () {
          if (initial.current) {
            initial.current = false;
            return;
          }

          try {
            setResult(fetcher());
          } catch (error) {
            setResult(Promise.reject(error));
          }
        }, deps);
        return usePromiseEffect(result);
      }

      /*! *****************************************************************************
      Copyright (c) Microsoft Corporation.

      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.

      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */

      /* global Reflect, Promise */
      var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics(d, b);
      };

      function __extends(d, b) {
        _extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      }

      /** PURE_IMPORTS_START  PURE_IMPORTS_END */
      function isFunction(x) {
        return typeof x === 'function';
      }

      /** PURE_IMPORTS_START  PURE_IMPORTS_END */
      var _enable_super_gross_mode_that_will_cause_bad_things = false;
      var config = {
        Promise: undefined,

        set useDeprecatedSynchronousErrorHandling(value) {
          if (value) {
            var error = /*@__PURE__*/new Error();
            /*@__PURE__*/

            console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
          }

          _enable_super_gross_mode_that_will_cause_bad_things = value;
        },

        get useDeprecatedSynchronousErrorHandling() {
          return _enable_super_gross_mode_that_will_cause_bad_things;
        }

      };

      /** PURE_IMPORTS_START  PURE_IMPORTS_END */
      function hostReportError(err) {
        setTimeout(function () {
          throw err;
        }, 0);
      }

      /** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
      var empty = {
        closed: true,
        next: function next(value) {},
        error: function error(err) {
          if (config.useDeprecatedSynchronousErrorHandling) {
            throw err;
          } else {
            hostReportError(err);
          }
        },
        complete: function complete() {}
      };

      /** PURE_IMPORTS_START  PURE_IMPORTS_END */
      var isArray = /*@__PURE__*/function () {
        return Array.isArray || function (x) {
          return x && typeof x.length === 'number';
        };
      }();

      /** PURE_IMPORTS_START  PURE_IMPORTS_END */
      function isObject(x) {
        return x !== null && _typeof(x) === 'object';
      }

      /** PURE_IMPORTS_START  PURE_IMPORTS_END */
      var UnsubscriptionErrorImpl = /*@__PURE__*/function () {
        function UnsubscriptionErrorImpl(errors) {
          Error.call(this);
          this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) {
            return i + 1 + ") " + err.toString();
          }).join('\n  ') : '';
          this.name = 'UnsubscriptionError';
          this.errors = errors;
          return this;
        }

        UnsubscriptionErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
        return UnsubscriptionErrorImpl;
      }();

      var UnsubscriptionError = UnsubscriptionErrorImpl;

      var Subscription = /*@__PURE__*/function () {
        function Subscription(unsubscribe) {
          this.closed = false;
          this._parentOrParents = null;
          this._subscriptions = null;

          if (unsubscribe) {
            this._unsubscribe = unsubscribe;
          }
        }

        Subscription.prototype.unsubscribe = function () {
          var errors;

          if (this.closed) {
            return;
          }

          var _a = this,
              _parentOrParents = _a._parentOrParents,
              _unsubscribe = _a._unsubscribe,
              _subscriptions = _a._subscriptions;

          this.closed = true;
          this._parentOrParents = null;
          this._subscriptions = null;

          if (_parentOrParents instanceof Subscription) {
            _parentOrParents.remove(this);
          } else if (_parentOrParents !== null) {
            for (var index = 0; index < _parentOrParents.length; ++index) {
              var parent_1 = _parentOrParents[index];
              parent_1.remove(this);
            }
          }

          if (isFunction(_unsubscribe)) {
            try {
              _unsubscribe.call(this);
            } catch (e) {
              errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
            }
          }

          if (isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;

            while (++index < len) {
              var sub = _subscriptions[index];

              if (isObject(sub)) {
                try {
                  sub.unsubscribe();
                } catch (e) {
                  errors = errors || [];

                  if (e instanceof UnsubscriptionError) {
                    errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                  } else {
                    errors.push(e);
                  }
                }
              }
            }
          }

          if (errors) {
            throw new UnsubscriptionError(errors);
          }
        };

        Subscription.prototype.add = function (teardown) {
          var subscription = teardown;

          if (!teardown) {
            return Subscription.EMPTY;
          }

          switch (_typeof(teardown)) {
            case 'function':
              subscription = new Subscription(teardown);

            case 'object':
              if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
                return subscription;
              } else if (this.closed) {
                subscription.unsubscribe();
                return subscription;
              } else if (!(subscription instanceof Subscription)) {
                var tmp = subscription;
                subscription = new Subscription();
                subscription._subscriptions = [tmp];
              }

              break;

            default:
              {
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
              }
          }

          var _parentOrParents = subscription._parentOrParents;

          if (_parentOrParents === null) {
            subscription._parentOrParents = this;
          } else if (_parentOrParents instanceof Subscription) {
            if (_parentOrParents === this) {
              return subscription;
            }

            subscription._parentOrParents = [_parentOrParents, this];
          } else if (_parentOrParents.indexOf(this) === -1) {
            _parentOrParents.push(this);
          } else {
            return subscription;
          }

          var subscriptions = this._subscriptions;

          if (subscriptions === null) {
            this._subscriptions = [subscription];
          } else {
            subscriptions.push(subscription);
          }

          return subscription;
        };

        Subscription.prototype.remove = function (subscription) {
          var subscriptions = this._subscriptions;

          if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);

            if (subscriptionIndex !== -1) {
              subscriptions.splice(subscriptionIndex, 1);
            }
          }
        };

        Subscription.EMPTY = function (empty) {
          empty.closed = true;
          return empty;
        }(new Subscription());

        return Subscription;
      }();

      function flattenUnsubscriptionErrors(errors) {
        return errors.reduce(function (errs, err) {
          return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
        }, []);
      }

      /** PURE_IMPORTS_START  PURE_IMPORTS_END */
      var rxSubscriber = /*@__PURE__*/function () {
        return typeof Symbol === 'function' ? /*@__PURE__*/Symbol('rxSubscriber') : '@@rxSubscriber_' + /*@__PURE__*/Math.random();
      }();

      var Subscriber = /*@__PURE__*/function (_super) {
        __extends(Subscriber, _super);

        function Subscriber(destinationOrNext, error, complete) {
          var _this = _super.call(this) || this;

          _this.syncErrorValue = null;
          _this.syncErrorThrown = false;
          _this.syncErrorThrowable = false;
          _this.isStopped = false;

          switch (arguments.length) {
            case 0:
              _this.destination = empty;
              break;

            case 1:
              if (!destinationOrNext) {
                _this.destination = empty;
                break;
              }

              if (_typeof(destinationOrNext) === 'object') {
                if (destinationOrNext instanceof Subscriber) {
                  _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                  _this.destination = destinationOrNext;
                  destinationOrNext.add(_this);
                } else {
                  _this.syncErrorThrowable = true;
                  _this.destination = new SafeSubscriber(_this, destinationOrNext);
                }

                break;
              }

            default:
              _this.syncErrorThrowable = true;
              _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
              break;
          }

          return _this;
        }

        Subscriber.prototype[rxSubscriber] = function () {
          return this;
        };

        Subscriber.create = function (next, error, complete) {
          var subscriber = new Subscriber(next, error, complete);
          subscriber.syncErrorThrowable = false;
          return subscriber;
        };

        Subscriber.prototype.next = function (value) {
          if (!this.isStopped) {
            this._next(value);
          }
        };

        Subscriber.prototype.error = function (err) {
          if (!this.isStopped) {
            this.isStopped = true;

            this._error(err);
          }
        };

        Subscriber.prototype.complete = function () {
          if (!this.isStopped) {
            this.isStopped = true;

            this._complete();
          }
        };

        Subscriber.prototype.unsubscribe = function () {
          if (this.closed) {
            return;
          }

          this.isStopped = true;

          _super.prototype.unsubscribe.call(this);
        };

        Subscriber.prototype._next = function (value) {
          this.destination.next(value);
        };

        Subscriber.prototype._error = function (err) {
          this.destination.error(err);
          this.unsubscribe();
        };

        Subscriber.prototype._complete = function () {
          this.destination.complete();
          this.unsubscribe();
        };

        Subscriber.prototype._unsubscribeAndRecycle = function () {
          var _parentOrParents = this._parentOrParents;
          this._parentOrParents = null;
          this.unsubscribe();
          this.closed = false;
          this.isStopped = false;
          this._parentOrParents = _parentOrParents;
          return this;
        };

        return Subscriber;
      }(Subscription);

      var SafeSubscriber = /*@__PURE__*/function (_super) {
        __extends(SafeSubscriber, _super);

        function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
          var _this = _super.call(this) || this;

          _this._parentSubscriber = _parentSubscriber;
          var next;
          var context = _this;

          if (isFunction(observerOrNext)) {
            next = observerOrNext;
          } else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;

            if (observerOrNext !== empty) {
              context = Object.create(observerOrNext);

              if (isFunction(context.unsubscribe)) {
                _this.add(context.unsubscribe.bind(context));
              }

              context.unsubscribe = _this.unsubscribe.bind(_this);
            }
          }

          _this._context = context;
          _this._next = next;
          _this._error = error;
          _this._complete = complete;
          return _this;
        }

        SafeSubscriber.prototype.next = function (value) {
          if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;

            if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
              this.__tryOrUnsub(this._next, value);
            } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
              this.unsubscribe();
            }
          }
        };

        SafeSubscriber.prototype.error = function (err) {
          if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;

            if (this._error) {
              if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._error, err);

                this.unsubscribe();
              } else {
                this.__tryOrSetError(_parentSubscriber, this._error, err);

                this.unsubscribe();
              }
            } else if (!_parentSubscriber.syncErrorThrowable) {
              this.unsubscribe();

              if (useDeprecatedSynchronousErrorHandling) {
                throw err;
              }

              hostReportError(err);
            } else {
              if (useDeprecatedSynchronousErrorHandling) {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
              } else {
                hostReportError(err);
              }

              this.unsubscribe();
            }
          }
        };

        SafeSubscriber.prototype.complete = function () {
          var _this = this;

          if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;

            if (this._complete) {
              var wrappedComplete = function wrappedComplete() {
                return _this._complete.call(_this._context);
              };

              if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(wrappedComplete);

                this.unsubscribe();
              } else {
                this.__tryOrSetError(_parentSubscriber, wrappedComplete);

                this.unsubscribe();
              }
            } else {
              this.unsubscribe();
            }
          }
        };

        SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
          try {
            fn.call(this._context, value);
          } catch (err) {
            this.unsubscribe();

            if (config.useDeprecatedSynchronousErrorHandling) {
              throw err;
            } else {
              hostReportError(err);
            }
          }
        };

        SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
          if (!config.useDeprecatedSynchronousErrorHandling) {
            throw new Error('bad call');
          }

          try {
            fn.call(this._context, value);
          } catch (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
              parent.syncErrorValue = err;
              parent.syncErrorThrown = true;
              return true;
            } else {
              hostReportError(err);
              return true;
            }
          }

          return false;
        };

        SafeSubscriber.prototype._unsubscribe = function () {
          var _parentSubscriber = this._parentSubscriber;
          this._context = null;
          this._parentSubscriber = null;

          _parentSubscriber.unsubscribe();
        };

        return SafeSubscriber;
      }(Subscriber);

      /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
      function skip(count) {
        return function (source) {
          return source.lift(new SkipOperator(count));
        };
      }

      var SkipOperator = /*@__PURE__*/function () {
        function SkipOperator(total) {
          this.total = total;
        }

        SkipOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new SkipSubscriber(subscriber, this.total));
        };

        return SkipOperator;
      }();

      var SkipSubscriber = /*@__PURE__*/function (_super) {
        __extends(SkipSubscriber, _super);

        function SkipSubscriber(destination, total) {
          var _this = _super.call(this, destination) || this;

          _this.total = total;
          _this.count = 0;
          return _this;
        }

        SkipSubscriber.prototype._next = function (x) {
          if (++this.count > this.total) {
            this.destination.next(x);
          }
        };

        return SkipSubscriber;
      }(Subscriber);

      function n(n) {
        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; e < t; e++) {
          r[e - 1] = arguments[e];
        }

        if ("production" !== process.env.NODE_ENV) {
          var i = L[n],
              o = i ? "function" == typeof i ? i.apply(null, r) : i : "unknown error nr: " + n;
          throw Error("[Immer] " + o);
        }

        throw Error("[Immer] minified error nr: " + n + (r.length ? " " + r.join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
      }

      function t(n) {
        return !!n && !!n[G];
      }

      function r(n) {
        return !!n && (function (n) {
          if (!n || "object" != _typeof(n)) return !1;
          var t = Object.getPrototypeOf(n);
          return !t || t === Object.prototype;
        }(n) || Array.isArray(n) || !!n[B] || !!n.constructor[B] || c(n) || s(n));
      }

      function i(n, t, r) {
        void 0 === r && (r = !1), 0 === o(n) ? (r ? Object.keys : Q)(n).forEach(function (r) {
          return t(r, n[r], n);
        }) : n.forEach(function (r, e) {
          return t(e, r, n);
        });
      }

      function o(n) {
        var t = n[G];
        return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(n) ? 1 : c(n) ? 2 : s(n) ? 3 : 0;
      }

      function u(n, t) {
        return 2 === o(n) ? n.has(t) : Object.prototype.hasOwnProperty.call(n, t);
      }

      function a(n, t) {
        return 2 === o(n) ? n.get(t) : n[t];
      }

      function f(n, t) {
        return n === t ? 0 !== n || 1 / n == 1 / t : n != n && t != t;
      }

      function c(n) {
        return U && n instanceof Map;
      }

      function s(n) {
        return W && n instanceof Set;
      }

      function v(n) {
        return n.o || n.t;
      }

      function p(t, r) {
        if (void 0 === r && (r = !1), Array.isArray(t)) return t.slice();
        var e = Object.create(Object.getPrototypeOf(t));
        return i(t, function (i) {
          if (i !== G) {
            var o = Object.getOwnPropertyDescriptor(t, i),
                u = o.value;
            o.get && (r || n(1), u = o.get.call(t)), o.enumerable ? e[i] = u : Object.defineProperty(e, i, {
              value: u,
              writable: !0,
              configurable: !0
            });
          }
        }), e;
      }

      function d(n, e) {
        t(n) || h(n) || !r(n) || (o(n) > 1 && (n.set = n.add = n.clear = n["delete"] = l), Object.freeze(n), e && i(n, function (n, t) {
          return d(t, !0);
        }, !0));
      }

      function l() {
        n(2);
      }

      function h(n) {
        return null == n || "object" != _typeof(n) || Object.isFrozen(n);
      }

      function y(t) {
        var r = V[t];
        return r || n("production" !== process.env.NODE_ENV ? 18 : 19, t), r;
      }

      function m() {
        return "production" === process.env.NODE_ENV || K || n(0), K;
      }

      function _(n, t) {
        t && (y("Patches"), n.u = [], n.s = [], n.v = t);
      }

      function j(n) {
        O(n), n.p.forEach(w), n.p = null;
      }

      function O(n) {
        n === K && (K = n.l);
      }

      function g(n) {
        return K = {
          p: [],
          l: K,
          h: n,
          m: !0,
          _: 0
        };
      }

      function w(n) {
        var t = n[G];
        0 === t.i || 1 === t.i ? t.j() : t.O = !0;
      }

      function S(t, e) {
        e._ = e.p.length;
        var i = e.p[0],
            o = void 0 !== t && t !== i;
        return e.h.g || y("ES5").S(e, t, o), o ? (i[G].P && (j(e), n(4)), r(t) && (t = P(e, t), e.l || A(e, t)), e.u && y("Patches").M(i[G], t, e.u, e.s)) : t = P(e, i, []), j(e), e.u && e.v(e.u, e.s), t !== q ? t : void 0;
      }

      function P(n, t, r) {
        if (h(t)) return t;
        var e = t[G];
        if (!e) return i(t, function (i, o) {
          return M(n, e, t, i, o, r);
        }, !0), t;
        if (e.A !== n) return t;
        if (!e.P) return A(n, e.t, !0), e.t;

        if (!e.I) {
          e.I = !0, e.A._--;
          var o = 4 === e.i || 5 === e.i ? e.o = p(e.k, !0) : e.o;
          i(o, function (t, i) {
            return M(n, e, o, t, i, r);
          }), A(n, o, !1), r && n.u && y("Patches").R(e, r, n.u, n.s);
        }

        return e.o;
      }

      function M(e, i, c, s, v, p) {
        if ("production" !== process.env.NODE_ENV && v === c && n(5), t(v)) {
          var d = P(e, v, p && i && 3 !== i.i && !u(i.D, s) ? p.concat(s) : void 0);
          if (h = s, y = d, 2 === (b = o(l = c)) ? l.set(h, y) : 3 === b ? (l["delete"](h), l.add(y)) : l[h] = y, !t(d)) return;
          e.m = !1;
        }

        var l, h, y, b;

        if ((!i || !f(v, a(i.t, s))) && r(v)) {
          if (!e.h.N && e._ < 1) return;
          P(e, v), i && i.A.l || A(e, v);
        }
      }

      function A(n, t, r) {
        void 0 === r && (r = !1), n.h.N && n.m && d(t, r);
      }

      function x(n, t) {
        var r = n[G],
            e = Reflect.getOwnPropertyDescriptor(r ? v(r) : n, t);
        return e && e.value;
      }

      function z(n) {
        if (!n.P) {
          if (n.P = !0, 0 === n.i || 1 === n.i) {
            var t = n.o = p(n.t);
            i(n.p, function (n, r) {
              t[n] = r;
            }), n.p = void 0;
          }

          n.l && z(n.l);
        }
      }

      function I(n) {
        n.o || (n.o = p(n.t));
      }

      function E(n, t, r) {
        var e = c(t) ? y("MapSet").T(t, r) : s(t) ? y("MapSet").F(t, r) : n.g ? function (n, t) {
          var r = Array.isArray(n),
              e = {
            i: r ? 1 : 0,
            A: t ? t.A : m(),
            P: !1,
            I: !1,
            D: {},
            l: t,
            t: n,
            k: null,
            p: {},
            o: null,
            j: null,
            C: !1
          },
              i = e,
              o = Y;
          r && (i = [e], o = Z);
          var u = Proxy.revocable(i, o),
              a = u.revoke,
              f = u.proxy;
          return e.k = f, e.j = a, f;
        }(t, r) : y("ES5").J(t, r);
        return (r ? r.A : m()).p.push(e), e;
      }

      var J,
          K,
          $ = "undefined" != typeof Symbol && "symbol" == _typeof(Symbol("x")),
          U = "undefined" != typeof Map,
          W = "undefined" != typeof Set,
          X = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect,
          q = $ ? Symbol("immer-nothing") : ((J = {})["immer-nothing"] = !0, J),
          B = $ ? Symbol("immer-draftable") : "__$immer_draftable",
          G = $ ? Symbol("immer-state") : "__$immer_state",
          L = {
        0: "Illegal state",
        1: "Immer drafts cannot have computed properties",
        2: "This object has been frozen and should not be mutated",
        3: function _(n) {
          return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n;
        },
        4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
        5: "Immer forbids circular references",
        6: "The first or second argument to `produce` must be a function",
        7: "The third argument to `produce` must be a function or undefined",
        8: "First argument to `createDraft` must be a plain object, an array, or an immerable object",
        9: "First argument to `finishDraft` must be a draft returned by `createDraft`",
        10: "The given draft is already finalized",
        11: "Object.defineProperty() cannot be used on an Immer draft",
        12: "Object.setPrototypeOf() cannot be used on an Immer draft",
        13: "Immer only supports deleting array indices",
        14: "Immer only supports setting array indices and the 'length' property",
        15: function _(n) {
          return "Cannot apply patch, path doesn't resolve: " + n;
        },
        16: 'Sets cannot have "replace" patches.',
        17: function _(n) {
          return "Unsupported patch operation: " + n;
        },
        18: function _(n) {
          return "The plugin for '" + n + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n + "()` when initializing your application.";
        },
        19: function _(n) {
          return "plugin not loaded: " + n;
        },
        20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available"
      },
          Q = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function (n) {
        return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
      } : Object.getOwnPropertyNames,
          V = {},
          Y = {
        get: function get(n, t) {
          if (t === G) return n;
          var e = n.p;
          if (!n.P && u(e, t)) return e[t];
          var i = v(n)[t];
          if (n.I || !r(i)) return i;

          if (n.P) {
            if (i !== x(n.t, t)) return i;
            e = n.o;
          }

          return e[t] = E(n.A.h, i, n);
        },
        has: function has(n, t) {
          return t in v(n);
        },
        ownKeys: function ownKeys(n) {
          return Reflect.ownKeys(v(n));
        },
        set: function set(n, t, r) {
          if (!n.P) {
            var e = x(n.t, t);
            if (r ? f(e, r) || r === n.p[t] : f(e, r) && t in n.t) return !0;
            I(n), z(n);
          }

          return n.D[t] = !0, n.o[t] = r, !0;
        },
        deleteProperty: function deleteProperty(n, t) {
          return void 0 !== x(n.t, t) || t in n.t ? (n.D[t] = !1, I(n), z(n)) : n.D[t] && delete n.D[t], n.o && delete n.o[t], !0;
        },
        getOwnPropertyDescriptor: function getOwnPropertyDescriptor(n, t) {
          var r = v(n),
              e = Reflect.getOwnPropertyDescriptor(r, t);
          return e && (e.writable = !0, e.configurable = 1 !== n.i || "length" !== t), e;
        },
        defineProperty: function defineProperty() {
          n(11);
        },
        getPrototypeOf: function getPrototypeOf(n) {
          return Object.getPrototypeOf(n.t);
        },
        setPrototypeOf: function setPrototypeOf() {
          n(12);
        }
      },
          Z = {};

      i(Y, function (n, t) {
        Z[n] = function () {
          return arguments[0] = arguments[0][0], t.apply(this, arguments);
        };
      }), Z.deleteProperty = function (t, r) {
        return "production" !== process.env.NODE_ENV && isNaN(parseInt(r)) && n(13), Y.deleteProperty.call(this, t[0], r);
      }, Z.set = function (t, r, e) {
        return "production" !== process.env.NODE_ENV && "length" !== r && isNaN(parseInt(r)) && n(14), Y.set.call(this, t[0], r, e, t[0]);
      };

      var nn = function () {
        function e(n) {
          this.g = X, this.N = "production" !== process.env.NODE_ENV, "boolean" == typeof (null == n ? void 0 : n.useProxies) && this.setUseProxies(n.useProxies), "boolean" == typeof (null == n ? void 0 : n.autoFreeze) && this.setAutoFreeze(n.autoFreeze), this.produce = this.produce.bind(this), this.produceWithPatches = this.produceWithPatches.bind(this);
        }

        var i = e.prototype;
        return i.produce = function (t, e, i) {
          if ("function" == typeof t && "function" != typeof e) {
            var o = e;
            e = t;
            var u = this;
            return function (n) {
              var t = this;
              void 0 === n && (n = o);

              for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) {
                i[a - 1] = arguments[a];
              }

              return u.produce(n, function (n) {
                var r;
                return (r = e).call.apply(r, [t, n].concat(i));
              });
            };
          }

          var a;

          if ("function" != typeof e && n(6), void 0 !== i && "function" != typeof i && n(7), r(t)) {
            var f = g(this),
                c = E(this, t, void 0),
                s = !0;

            try {
              a = e(c), s = !1;
            } finally {
              s ? j(f) : O(f);
            }

            return "undefined" != typeof Promise && a instanceof Promise ? a.then(function (n) {
              return _(f, i), S(n, f);
            }, function (n) {
              throw j(f), n;
            }) : (_(f, i), S(a, f));
          }

          if ((a = e(t)) !== q) return void 0 === a && (a = t), this.N && d(a, !0), a;
        }, i.produceWithPatches = function (n, t) {
          var r,
              e,
              i = this;
          return "function" == typeof n ? function (t) {
            for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) {
              e[o - 1] = arguments[o];
            }

            return i.produceWithPatches(t, function (t) {
              return n.apply(void 0, [t].concat(e));
            });
          } : [this.produce(n, t, function (n, t) {
            r = n, e = t;
          }), r, e];
        }, i.createDraft = function (t) {
          r(t) || n(8);
          var e = g(this),
              i = E(this, t, void 0);
          return i[G].C = !0, O(e), i;
        }, i.finishDraft = function (t, r) {
          var e = t && t[G];
          "production" !== process.env.NODE_ENV && (e && e.C || n(9), e.I && n(10));
          var i = e.A;
          return _(i, r), S(void 0, i);
        }, i.setAutoFreeze = function (n) {
          this.N = n;
        }, i.setUseProxies = function (t) {
          X || n(20), this.g = t;
        }, i.applyPatches = function (n, r) {
          var e;

          for (e = r.length - 1; e >= 0; e--) {
            var i = r[e];

            if (0 === i.path.length && "replace" === i.op) {
              n = i.value;
              break;
            }
          }

          var o = y("Patches").U;
          return t(n) ? o(n, r) : this.produce(n, function (n) {
            return o(n, r.slice(e + 1));
          });
        }, e;
      }(),
          tn = new nn(),
          rn = tn.produce,
          en = tn.produceWithPatches.bind(tn),
          on = tn.setAutoFreeze.bind(tn),
          un = tn.setUseProxies.bind(tn),
          an = tn.applyPatches.bind(tn),
          fn = tn.createDraft.bind(tn),
          cn = tn.finishDraft.bind(tn);

      var EMPTY = Symbol();
      function createSubscriptionContainer(useHook) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          isEqual: function isEqual(a, b) {
            return a === b;
          }
        },
            isEqual = _ref.isEqual;

        var Context = /*#__PURE__*/React.createContext(EMPTY);

        function Provider(props) {
          var subject = useConstant(function () {
            var initialState = props.initialState; // type fixing

            return new BehaviorSubject(typeof initialState === 'function' ? initialState() : initialState);
          });
          var container = useConstant(function () {
            var setStateReal = function setStateReal(state) {
              var next;

              if (typeof state === 'function') {
                next = state(subject.getValue());
              } else {
                next = state;
              }

              subject.next(next);
            }; // handle change state when subscribe


            var changing = false;

            var setState = function setState(state) {
              if (changing) {
                setTimeout(function () {
                  return setState(state);
                }, 0);
                return;
              }

              changing = true;

              try {
                setStateReal(state);
              } finally {
                changing = false;
              }
            };

            var options = {
              getState: function getState() {
                return subject.getValue();
              },
              setState: setState,
              updateState: function updateState(fn) {
                // todo produced is immutable
                setState(rn(function (v) {
                  fn(v); // ensure return void
                }));
              },
              subscribe: function subscribe(cb) {
                var subscription = subject.subscribe(cb);
                return subscription.unsubscribe.bind(subscription);
              }
            };
            return useHook(options);
          });
          return /*#__PURE__*/React.createElement(Context.Provider, {
            value: {
              container: container,
              subject: subject
            }
          }, props.children);
        }

        function useContainer() {
          var context = React.useContext(Context);

          if (context === EMPTY) {
            throw new Error('Component must be wrapped with <SubscriptionContainer.Provider>');
          }

          return context.container;
        }

        function useSelector(selector) {
          var eq = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : isEqual;
          var context = React.useContext(Context);

          if (context === EMPTY) {
            throw new Error('Component must be wrapped with <SubscriptionContainer.Provider>');
          }

          var subject = context.subject;

          var _React$useState = React.useState(function () {
            return selector(subject.getValue());
          }),
              _React$useState2 = _slicedToArray(_React$useState, 2),
              state = _React$useState2[0],
              setState = _React$useState2[1];

          useEffect(function () {
            var subscription = subject.pipe(skip(1)).subscribe(function (s) {
              setState(function (old) {
                var next = selector(s);

                if (eq(old, next)) {
                  return old;
                }

                return next;
              });
            });
            return function () {
              return subscription.unsubscribe();
            };
          }, []);
          return state;
        }

        function useState() {
          return useSelector(function (v) {
            return v;
          });
        }

        function useWhenValueChange(selector, cb) {
          var eq = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : isEqual;
          var context = React.useContext(Context);

          if (context === EMPTY) {
            throw new Error('Component must be wrapped with <SubscriptionContainer.Provider>');
          }

          var subject = context.subject;
          var ref = React.useRef();
          useEffect(function () {
            ref.current = selector(subject.getValue());
            var subscription = subject.subscribe(function (s) {
              var old = ref.current;
              var next = selector(s);

              if (!eq(old, next)) {
                cb(next);
                ref.current = next;
              }
            });
            return function () {
              return subscription.unsubscribe();
            };
          }, []);
        }

        return {
          Provider: Provider,
          useContainer: useContainer,
          useSelector: useSelector,
          useState: useState,
          useWhenValueChange: useWhenValueChange
        };
      }

      /// https://github.com/jamiebuilds/unstated-next/blob/master/src/unstated-next.tsx
      var EMPTY$1 = Symbol();
      function createContainer(useHook) {
        var Context = /*#__PURE__*/React.createContext(EMPTY$1);

        function Provider(props) {
          var value = useHook(props.initialState);
          return /*#__PURE__*/React.createElement(Context.Provider, {
            value: value
          }, props.children);
        }

        function useContainer() {
          var value = React.useContext(Context);

          if (value === EMPTY$1) {
            throw new Error('Component must be wrapped with <Container.Provider>');
          }

          return value;
        }

        return {
          Provider: Provider,
          useContainer: useContainer
        };
      }
      function useContainer(container) {
        return container.useContainer();
      }

      function withProps(WrappedComponent, extra) {
        return function (props) {
          return /*#__PURE__*/React.createElement(WrappedComponent, Object.assign({}, props, extra));
        };
      }

    }
  };
});
//# sourceMappingURL=wener-ui.system.js.map
