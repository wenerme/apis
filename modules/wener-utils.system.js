System.register(['lodash'], function (exports) {
  'use strict';
  var get;
  return {
    setters: [function (module) {
      get = module.get;
    }],
    execute: function () {

      exports({
        arrayOfMaybeArray: arrayOfMaybeArray,
        assert: assert,
        assertIsDefined: assertIsDefined,
        camelCase: camelCase,
        clearAsyncInterval: clearAsyncInterval,
        copy: copy,
        createLazyPromise: createLazyPromise,
        createRandom: createRandom,
        download: download,
        firstOfMaybeArray: firstOfMaybeArray,
        getFile: getFile,
        isBuffer: isBuffer,
        isClass: isClass,
        isDefined: isDefined,
        isEmptyObject: isEmptyObject,
        isPromise: isPromise,
        lastOfMaybeArray: lastOfMaybeArray,
        loadScripts: loadScripts,
        loadStyles: loadStyles,
        objectOfMaybeArray: objectOfMaybeArray,
        pascalCase: pascalCase,
        promiseOfCallback: promiseOfCallback,
        setAsyncInterval: setAsyncInterval,
        templateString: templateString,
        timeout: timeout,
        urljoin: urljoin
      });

      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }

      function _asyncToGenerator(fn) {
        return function () {
          var self = this,
              args = arguments;
          return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);

            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }

            _next(undefined);
          });
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

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
        if (superClass) _setPrototypeOf(subClass, superClass);
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

      function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf("[native code]") !== -1;
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

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _possibleConstructorReturn(self, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
          return call;
        }

        return _assertThisInitialized(self);
      }

      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();

        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived),
              result;

          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;

            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }

          return _possibleConstructorReturn(this, result);
        };
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

      function objectOfMaybeArray(o) {
        var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var picker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : firstOfMaybeArray;

        if (keys === null) {
          return Object.fromEntries(Object.entries(o).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                k = _ref2[0],
                v = _ref2[1];

            return [k, picker(v)];
          }));
        }

        return Object.fromEntries(keys.map(function (v) {
          return [v, picker(v)];
        }));
      }
      function firstOfMaybeArray(v) {
        if (Array.isArray(v)) {
          return v[0];
        }

        return v;
      }
      function lastOfMaybeArray(v) {
        if (Array.isArray(v)) {
          return v[v.length - 1];
        }

        return v;
      }
      function arrayOfMaybeArray(v) {
        if (Array.isArray(v)) {
          return v;
        }

        if (v === null || v === undefined) {
          return [];
        }

        return [v];
      }

      function createLazyPromise() {
        var holder = {
          resolve: function resolve(_) {
            throw new Error('pending resolve');
          },
          reject: function reject(_) {
            throw new Error('pending reject');
          }
        };
        return Object.assign(new Promise(function (resolve, reject) {
          holder.reject = reject;
          holder.resolve = resolve;
        }), {
          resolve: function resolve(v) {
            holder.resolve(v);
          },
          reject: function reject(v) {
            holder.resolve(v);
          }
        });
      }

      function setAsyncInterval(cb, interval) {
        var initial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : interval;
        var id;

        var handler = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return cb();

                  case 2:
                    id = setTimeout(handler, interval);

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function handler() {
            return _ref.apply(this, arguments);
          };
        }();

        id = setTimeout(handler, initial);
        return function () {
          return id;
        };
      }
      function clearAsyncInterval(v) {
        clearTimeout(v === null || v === void 0 ? void 0 : v());
      }

      var sleep = exports('sleep', function sleep(ms) {
        return new Promise(function (resolve) {
          return setTimeout(resolve, ms);
        });
      });

      function timeout(v, ms) {
        var error = new TimeoutError();
        var timeout;
        return Promise.race([v, new Promise(function (resolve, reject) {
          timeout = setTimeout(function () {
            return reject(error);
          }, ms);
        })]).then(function (v) {
          clearTimeout(timeout);
          return v;
        }, function (e) {
          clearTimeout(timeout);
          throw e;
        });
      }
      var TimeoutError = exports('TimeoutError', /*#__PURE__*/function (_Error) {
        _inherits(TimeoutError, _Error);

        var _super = _createSuper(TimeoutError);

        function TimeoutError() {
          _classCallCheck(this, TimeoutError);

          return _super.call(this, 'TimeoutError');
        }

        return TimeoutError;
      }( /*#__PURE__*/_wrapNativeSuper(Error)));

      function isPromise(v) {
        return v && (v instanceof Promise || v.then && v["catch"]);
      }

      function promiseOfCallback(fun) {
        return new Promise(function (resolve, reject) {
          try {
            fun(function (e, v) {
              if (e) {
                reject(e);
              } else {
                resolve(v);
              }
            });
          } catch (e) {
            reject(e);
          }
        });
      }

      function assert(condition, msg) {
        // if (!condition) {
        //   throw new AssertionError(msg);
        // }
        console.assert(!condition, msg);
      }
      function assertIsDefined(val) {
        // if (val === undefined || val === null) {
        //   throw new AssertionError(`Expected 'val' to be defined, but received ${val}`);
        // }
        console.assert(val === undefined || val === null, 'Expected defined');
      }

      function isDefined(v) {
        return v !== null && v !== undefined;
      }

      function isEmptyObject(o) {
        if (o === null || o === undefined) {
          return true;
        }

        return o.constructor === Object && Object.keys(o).length === 0;
      }

      function isClass(func) {
        return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
      }

      // https://github.com/sindresorhus/camelcase/blob/master/index.js
      function preserveCamelCase(string) {
        var isLastCharLower = false;
        var isLastCharUpper = false;
        var isLastLastCharUpper = false;

        for (var i = 0; i < string.length; i++) {
          var character = string[i];

          if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
            string = string.slice(0, i) + '-' + string.slice(i);
            isLastCharLower = false;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = true;
            i++;
          } else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
            string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = false;
            isLastCharLower = true;
          } else {
            isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
          }
        }

        return string;
      }

      function pascalCase(input) {
        return camelCase(input, {
          pascalCase: true
        });
      }
      function camelCase(input) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          pascalCase: false
        };

        if (!(typeof input === 'string' || Array.isArray(input))) {
          throw new TypeError('Expected the input to be `string | string[]`');
        }

        var postProcess = function postProcess(x) {
          return options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;
        };

        if (Array.isArray(input)) {
          input = input.map(function (x) {
            return x.trim();
          }).filter(function (x) {
            return x.length;
          }).join('-');
        } else {
          input = input.trim();
        }

        if (input.length === 0) {
          return '';
        }

        if (input.length === 1) {
          return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
        }

        var hasUpperCase = input !== input.toLowerCase();

        if (hasUpperCase) {
          input = preserveCamelCase(input);
        }

        input = input.replace(/^[_.\- ]+/, '').toLowerCase().replace(/[_.\- ]+(\w|$)/g, function (_, p1) {
          return p1.toUpperCase();
        }).replace(/\d+(\w|$)/g, function (m) {
          return m.toUpperCase();
        });
        return postProcess(input);
      }

      /**
       * 替换类似于 JS 的模板字符串
       *
       * @example
       * templateString('My name is ${name}',{name:'wener'})
       */

      function templateString(template, variables) {
        return template.replace(/\${(.*?)}/g, function (_, g) {
          // variables[g.trim()]
          // 支持路径 - 例如 a.b[0]
          return get(variables, g.trim());
        });
      }

      /// see https://github.com/jfromaniello/url-join
      function urljoin() {
        var resultArray = [];

        for (var _len = arguments.length, strArray = new Array(_len), _key = 0; _key < _len; _key++) {
          strArray[_key] = arguments[_key];
        }

        if (strArray.length === 0) {
          return '';
        }

        if (typeof strArray[0] !== 'string') {
          throw new TypeError('Url must be a string. Received ' + strArray[0]);
        } // If the first part is a plain protocol, we combine it with the next part.


        if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
          var first = strArray.shift();
          strArray[0] = first + strArray[0];
        } // There must be two or three slashes in the file protocol, two slashes in anything else.


        if (strArray[0].match(/^file:\/\/\//)) {
          strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
        } else {
          strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
        }

        for (var i = 0; i < strArray.length; i++) {
          var component = strArray[i];

          if (typeof component !== 'string') {
            throw new TypeError('Url must be a string. Received ' + component);
          }

          if (component === '') {
            continue;
          }

          if (i > 0) {
            // Removing the starting slashes for each component but the first.
            component = component.replace(/^[/]+/, '');
          }

          if (i < strArray.length - 1) {
            // Removing the ending slashes for each component but the last.
            component = component.replace(/[/]+$/, '');
          } else {
            // For the last component we will combine multiple slashes to a single one.
            component = component.replace(/[/]+$/, '/');
          }

          resultArray.push(component);
        }

        var str = resultArray.join('/'); // Each input component is now separated by a single slash except the possible first plain protocol part.
        // remove trailing slash before parameters or hash

        str = str.replace(/\/(\?|&|#[^!])/g, '$1'); // replace ? in parameters with &

        var parts = str.split('?');
        str = parts.shift() + (parts.length > 0 ? '?' : '') + parts.join('&');
        return str;
      }

      /// javascript pseudo random
      function createRandom() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$seed = _ref.seed,
            seed = _ref$seed === void 0 ? 0 : _ref$seed;

        if (typeof seed === 'string') {
          var s = seed;
          var sum = 0;

          for (var i = 0; i < s.length; i++) {
            sum += s.charCodeAt(i);
          }

          seed = sum;
        }

        return function () {
          var x = Math.sin(seed++) * 10000;
          return x - Math.floor(x);
        };
      }

      // https://github.com/feross/is-buffer/blob/master/index.js
      function isBuffer(obj) {
        return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
      }

      var isDev = exports('isDev', function isDev() {
        var _process, _process$env;

        return typeof process !== 'undefined' && (((_process = process) === null || _process === void 0 ? void 0 : (_process$env = _process.env) === null || _process$env === void 0 ? void 0 : _process$env.NODE_ENV) || '').startsWith('dev');
      });

      // https://gist.github.com/rproenca/64781c6a1329b48a455b645d361a9aa3
      var _copy;

      function initCopy() {
        var textArea;

        function isIOS() {
          return navigator.userAgent.match(/ipad|iphone/i);
        }

        function createTextArea(text) {
          textArea = document.createElement('textArea');
          textArea.value = text;
          document.body.appendChild(textArea);
        }

        function selectText() {
          var range, selection;

          if (isIOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();

            if (selection === null) {
              console.error("no selection");
              return;
            }

            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
          } else {
            textArea.select();
          }
        }

        function copyToClipboard() {
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        _copy = function _copy(text) {
          createTextArea(text);
          selectText();
          copyToClipboard();
        };
      }

      function copy(text) {
        var _window$navigator, _window$navigator$cli;

        if ((_window$navigator = window.navigator) === null || _window$navigator === void 0 ? void 0 : (_window$navigator$cli = _window$navigator.clipboard) === null || _window$navigator$cli === void 0 ? void 0 : _window$navigator$cli.writeText) {
          window.navigator.clipboard.writeText(text);
          return;
        }

        if (!_copy) {
          initCopy();
        }

        _copy(text);
      }

      function download(filename, data) {
        var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref$type = _ref.type,
            type = _ref$type === void 0 ? 'application/octet-stream' : _ref$type,
            _ref$raw = _ref.raw,
            raw = _ref$raw === void 0 ? false : _ref$raw;

        var a = document.createElement('a');

        var closer = function closer() {
          return null;
        };

        try {
          a.download = filename; // console.info(`downloading ${name}`, data);
          // url or data url

          if (typeof data === 'string' && /^(https?:|data:)/.test(data) && !raw) {
            a.href = data;
          } else if (typeof data === 'string') {
            data = new TextEncoder().encode(data);
          }

          if (data instanceof Uint8Array) {
            data = new Blob([data], {
              type: type
            });
          }

          if (data instanceof File || data instanceof Blob || data instanceof MediaSource) {
            a.href = URL.createObjectURL(data);

            closer = function closer() {
              return URL.revokeObjectURL(a.href);
            };
          } else {
            console.error("invalid download data", data);
            throw new Error("can not download ".concat(Object.getPrototypeOf(data)));
          }

          a.click();
        } finally {
          closer();
        }
      }

      function load(el, resolve, reject, options) {
        el.onload = resolve;

        el.onerror = function (e) {
          el.remove();
          reject(e);
        };

        var _ref = options || {},
            _ref$attributes = _ref.attributes,
            attributes = _ref$attributes === void 0 ? {} : _ref$attributes;

        Object.entries(attributes).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              k = _ref3[0],
              v = _ref3[1];

          return el.setAttribute(k, v);
        });
        document.head.appendChild(el);
      }

      function loadScripts(src, options) {
        // todo quote ?
        if (document.querySelector("script[src=\"".concat(src, "\"]"))) {
          return Promise.resolve();
        }

        return new Promise(function (resolve, reject) {
          var el = document.createElement('script');
          el.src = src;
          load(el, resolve, reject, options);
        });
      }
      function loadStyles(href, options) {
        if (document.querySelector("link[href=\"".concat(href, "\"]"))) {
          return Promise.resolve();
        }

        return new Promise(function (resolve, reject) {
          var el = document.createElement('link');
          el.rel = 'stylesheet';
          el.href = href;
          load(el, resolve, reject, options);
        });
      }

      function getFile(dataTransfer) {
        var _dataTransfer$items;

        var items = (_dataTransfer$items = dataTransfer === null || dataTransfer === void 0 ? void 0 : dataTransfer.items) !== null && _dataTransfer$items !== void 0 ? _dataTransfer$items : [];

        if (items.length >= 2 && items[0].kind === 'string' && items[1].kind === 'file') {
          var _items$1$getAsFile, _dataTransfer$files;

          var text = dataTransfer.getData('text');
          var file = (_items$1$getAsFile = items[1].getAsFile()) !== null && _items$1$getAsFile !== void 0 ? _items$1$getAsFile : (_dataTransfer$files = dataTransfer.files) === null || _dataTransfer$files === void 0 ? void 0 : _dataTransfer$files.item(0);

          if (!file) {
            console.error("no file ".concat(text), items[1]);
            return null;
          } // let type = file.type;
          // // fix type
          // type = type;
          // // NOTE paste file can not parse by libs
          // if (type !== file.type) {
          //   const blob = file.slice(0, file.size);
          //   file = new File([blob], text, {type});
          // }


          return {
            file: file,
            filename: text
          };
        } else if (items[0].kind === 'file') {
          var _file = items[0].getAsFile();

          if (!_file) {
            console.error("no file", items[0]);
            return null;
          }

          return {
            file: _file,
            filename: _file.name
          };
        } else {
          console.debug("file item not match", Array.from(items).map(function (v) {
            return {
              type: v.type,
              kind: v.kind
            };
          }));
        }

        return null;
      }

      var _this = undefined;

      /**
       * isomorphic globalThis
       *
       * globalThis supported by ff 65, chrome 71, node 12, babel
       *
       * @see https://caniuse.com/#search=globalThis
       * @see https://v8.dev/features/globalthis
       */
      var getGlobalThis = exports('getGlobalThis', function getGlobalThis() {
        if (typeof globalThis !== 'undefined') return globalThis;
        if (typeof self !== 'undefined') return self;
        if (typeof window !== 'undefined') return window;
        if (typeof global !== 'undefined') return global; // eslint-disable-next-line
        // @ts-ignore

        if (typeof _this !== 'undefined') return _this;
        throw new Error('Unable to locate global `this`');
      });

    }
  };
});
//# sourceMappingURL=wener-utils.system.js.map
