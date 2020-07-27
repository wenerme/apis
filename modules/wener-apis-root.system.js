System.register(['single-spa', 'react', 'react-dom', 'react-router-dom', '@wener/ui', '@wener/ui/antds', 'prop-types', '@ant-design/icons', '@wener/ui/icons', 'antd'], function (exports, module) {
  'use strict';
  var singleSpa, registerApplication, start, React__default, PureComponent, createElement, Fragment, ReactDOM, HashRouter, Switch, Route, Link, NamedThemeProvider, LayoutFrame, LayoutFrameContent, PropTypes, HomeOutlined, EnvironmentOutlined, PhoneOutlined, LinkOutlined, InteractionOutlined, KeyOutlined, BarcodeOutlined, PartitionOutlined, EditOutlined, BorderlessTableOutlined, ExperimentOutlined, QrcodePrintOutlined, QrcodeReadOutlined, BarcodePrintOutlined, BarcodeReadOutlined, WebTorrentFilled, CertificateVerifiedBadgeOutlined, RtcOutlined, DictOutlined, IpfsOutlined, PageHeader, Alert;
  return {
    setters: [function (module) {
      singleSpa = module;
      registerApplication = module.registerApplication;
      start = module.start;
    }, function (module) {
      React__default = module.default;
      PureComponent = module.PureComponent;
      createElement = module.createElement;
      Fragment = module.Fragment;
    }, function (module) {
      ReactDOM = module.default;
    }, function (module) {
      HashRouter = module.HashRouter;
      Switch = module.Switch;
      Route = module.Route;
      Link = module.Link;
    }, function (module) {
      NamedThemeProvider = module.NamedThemeProvider;
    }, function (module) {
      LayoutFrame = module.LayoutFrame;
      LayoutFrameContent = module.LayoutFrameContent;
    }, function (module) {
      PropTypes = module.default;
    }, function (module) {
      HomeOutlined = module.HomeOutlined;
      EnvironmentOutlined = module.EnvironmentOutlined;
      PhoneOutlined = module.PhoneOutlined;
      LinkOutlined = module.LinkOutlined;
      InteractionOutlined = module.InteractionOutlined;
      KeyOutlined = module.KeyOutlined;
      BarcodeOutlined = module.BarcodeOutlined;
      PartitionOutlined = module.PartitionOutlined;
      EditOutlined = module.EditOutlined;
      BorderlessTableOutlined = module.BorderlessTableOutlined;
      ExperimentOutlined = module.ExperimentOutlined;
    }, function (module) {
      QrcodePrintOutlined = module.QrcodePrintOutlined;
      QrcodeReadOutlined = module.QrcodeReadOutlined;
      BarcodePrintOutlined = module.BarcodePrintOutlined;
      BarcodeReadOutlined = module.BarcodeReadOutlined;
      WebTorrentFilled = module.WebTorrentFilled;
      CertificateVerifiedBadgeOutlined = module.CertificateVerifiedBadgeOutlined;
      RtcOutlined = module.RtcOutlined;
      DictOutlined = module.DictOutlined;
      IpfsOutlined = module.IpfsOutlined;
    }, function (module) {
      PageHeader = module.PageHeader;
      Alert = module.Alert;
    }],
    execute: function () {

      function e(t) {
        return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
          return typeof e;
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(t);
      }

      function t(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[t] = n, e;
      }

      function n(e, t) {
        var n = Object.keys(e);

        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          t && (o = o.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })), n.push.apply(n, o);
        }

        return n;
      }

      var o = null,
          r = {
        React: null,
        ReactDOM: null,
        rootComponent: null,
        loadRootComponent: null,
        suppressComponentDidCatchWarning: !1,
        domElements: {},
        errorBoundary: null,
        domElementGetter: null,
        parcelCanUpdate: !0
      };

      function a(e, t) {
        return e.rootComponent ? Promise.resolve() : e.loadRootComponent(t).then(function (t) {
          e.rootComponent = t;
        });
      }

      function c(e, t) {
        return new Promise(function (n, o) {
          e.suppressComponentDidCatchWarning || !function (e) {
            if (!(e && "string" == typeof e.version && e.version.indexOf(".") >= 0)) return !1;
            var t = e.version.slice(0, e.version.indexOf("."));

            try {
              return Number(t) >= 16;
            } catch (e) {
              return !1;
            }
          }(e.React) || e.errorBoundary || (e.rootComponent.prototype ? e.rootComponent.prototype.componentDidCatch || console.warn("single-spa-react: ".concat(t.name || t.appName || t.childAppName, "'s rootComponent should implement componentDidCatch to avoid accidentally unmounting the entire single-spa application.")) : console.warn("single-spa-react: ".concat(t.name || t.appName || t.childAppName, "'s rootComponent does not implement an error boundary.  If using a functional component, consider providing an opts.errorBoundary to singleSpaReact(opts).")));

          var r = function (e, t) {
            return (t = t && t.customProps ? t.customProps : t).domElement ? function () {
              return t.domElement;
            } : t.domElementGetter ? t.domElementGetter : e.domElementGetter ? e.domElementGetter : function (e) {
              var t = e.appName || e.name;
              if (!t) throw Error("single-spa-react was not given an application name as a prop, so it can't make a unique dom element container for the react application");
              var n = "single-spa-application:".concat(t);
              return function () {
                var e = document.getElementById(n);
                return e || ((e = document.createElement("div")).id = n, document.body.appendChild(e)), e;
              };
            }(t);
          }(e, t);

          if ("function" != typeof r) throw new Error("single-spa-react: the domElementGetter for react application '".concat(t.appName || t.name, "' is not a function"));

          var a = s(e, t),
              c = function (e, t) {
            var n = e(t);
            if (!n) throw new Error("single-spa-react: domElementGetter function for application '".concat(t.appName || t.name, "' did not return a valid dom element. Please pass a valid domElement or domElementGetter via opts or props"));
            return n;
          }(r, t);

          u({
            elementToRender: a,
            domElement: c,
            whenFinished: function () {
              n(this);
            },
            opts: e
          });
          e.domElements[t.name] = c;
        });
      }

      function i(e, t) {
        return Promise.resolve().then(function () {
          e.ReactDOM.unmountComponentAtNode(e.domElements[t.name]), delete e.domElements[t.name];
        });
      }

      function p(e, t) {
        return new Promise(function (n, o) {
          u({
            elementToRender: s(e, t),
            domElement: e.domElements[t.name],
            whenFinished: function () {
              n(this);
            },
            opts: e
          });
        });
      }

      function u(e) {
        var t = e.opts,
            n = e.elementToRender,
            o = e.domElement,
            r = e.whenFinished;
        return "createRoot" === t.renderType ? t.ReactDOM.createRoot(o).render(n, r) : "createBlockingRoot" === t.renderType ? t.ReactDOM.createBlockingRoot(o).render(n, r) : "hydrate" === t.renderType ? t.ReactDOM.hydrate(n, o, r) : t.ReactDOM.render(n, o, r);
      }

      function s(e, t) {
        var n = e.React.createElement(e.rootComponent, t),
            r = o ? e.React.createElement(o.Provider, {
          value: t
        }, n) : n;
        return e.errorBoundary && (e.errorBoundaryClass = e.errorBoundaryClass || function (e) {
          function t(n) {
            e.React.Component.apply(this, arguments), this.state = {
              caughtError: null,
              caughtErrorInfo: null
            }, t.displayName = "SingleSpaReactErrorBoundary(".concat(n.name, ")");
          }

          return t.prototype = Object.create(e.React.Component.prototype), t.prototype.render = function () {
            return this.state.caughtError ? e.errorBoundary(this.state.caughtError, this.state.caughtErrorInfo, this.props) : this.props.children;
          }, t.prototype.componentDidCatch = function (e, t) {
            this.setState({
              caughtError: e,
              caughtErrorInfo: t
            });
          }, t;
        }(e), r = e.React.createElement(e.errorBoundaryClass, t, r)), r;
      }

      function singleSpaReact (u) {
        if ("object" !== e(u)) throw new Error("single-spa-react requires a configuration object");

        var s = function (e) {
          for (var o = 1; o < arguments.length; o++) {
            var r = null != arguments[o] ? arguments[o] : {};
            o % 2 ? n(Object(r), !0).forEach(function (n) {
              t(e, n, r[n]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
            });
          }

          return e;
        }({}, r, {}, u);

        if (!s.React) throw new Error("single-spa-react must be passed opts.React");
        if (!s.ReactDOM) throw new Error("single-spa-react must be passed opts.ReactDOM");
        if (!s.rootComponent && !s.loadRootComponent) throw new Error("single-spa-react must be passed opts.rootComponent or opts.loadRootComponent");
        if (s.errorBoundary && "function" != typeof s.errorBoundary) throw Error("The errorBoundary opt for single-spa-react must either be omitted or be a function that returns React elements");
        !o && s.React.createContext && (o = s.React.createContext());
        var l = {
          bootstrap: a.bind(null, s),
          mount: c.bind(null, s),
          unmount: i.bind(null, s)
        };
        return s.parcelCanUpdate && (l.update = p.bind(null, s)), l;
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

      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
      }

      var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

      function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
        if (typeof reducePropsToState !== 'function') {
          throw new Error('Expected reducePropsToState to be a function.');
        }

        if (typeof handleStateChangeOnClient !== 'function') {
          throw new Error('Expected handleStateChangeOnClient to be a function.');
        }

        if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
          throw new Error('Expected mapStateOnServer to either be undefined or a function.');
        }

        function getDisplayName(WrappedComponent) {
          return WrappedComponent.displayName || WrappedComponent.name || 'Component';
        }

        return function wrap(WrappedComponent) {
          if (typeof WrappedComponent !== 'function') {
            throw new Error('Expected WrappedComponent to be a React component.');
          }

          var mountedInstances = [];
          var state;

          function emitChange() {
            state = reducePropsToState(mountedInstances.map(function (instance) {
              return instance.props;
            }));

            if (SideEffect.canUseDOM) {
              handleStateChangeOnClient(state);
            } else if (mapStateOnServer) {
              state = mapStateOnServer(state);
            }
          }

          var SideEffect = /*#__PURE__*/function (_PureComponent) {
            _inheritsLoose(SideEffect, _PureComponent);

            function SideEffect() {
              return _PureComponent.apply(this, arguments) || this;
            } // Try to use displayName of wrapped component
            // Expose canUseDOM so tests can monkeypatch it


            SideEffect.peek = function peek() {
              return state;
            };

            SideEffect.rewind = function rewind() {
              if (SideEffect.canUseDOM) {
                throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
              }

              var recordedState = state;
              state = undefined;
              mountedInstances = [];
              return recordedState;
            };

            var _proto = SideEffect.prototype;

            _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
              mountedInstances.push(this);
              emitChange();
            };

            _proto.componentDidUpdate = function componentDidUpdate() {
              emitChange();
            };

            _proto.componentWillUnmount = function componentWillUnmount() {
              var index = mountedInstances.indexOf(this);
              mountedInstances.splice(index, 1);
              emitChange();
            };

            _proto.render = function render() {
              return /*#__PURE__*/React__default.createElement(WrappedComponent, this.props);
            };

            return SideEffect;
          }(PureComponent);

          _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");

          _defineProperty(SideEffect, "canUseDOM", canUseDOM);

          return SideEffect;
        };
      }

      /* global Map:readonly, Set:readonly, ArrayBuffer:readonly */
      var hasElementType = typeof Element !== 'undefined';
      var hasMap = typeof Map === 'function';
      var hasSet = typeof Set === 'function';
      var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView; // Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

      function equal(a, b) {
        // START: fast-deep-equal es6/index.js 3.1.1
        if (a === b) return true;

        if (a && b && typeof a == 'object' && typeof b == 'object') {
          if (a.constructor !== b.constructor) return false;
          var length, i, keys;

          if (Array.isArray(a)) {
            length = a.length;
            if (length != b.length) return false;

            for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;

            return true;
          } // START: Modifications:
          // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
          //    to co-exist with es5.
          // 2. Replace `for of` with es5 compliant iteration using `for`.
          //    Basically, take:
          //
          //    ```js
          //    for (i of a.entries())
          //      if (!b.has(i[0])) return false;
          //    ```
          //
          //    ... and convert to:
          //
          //    ```js
          //    it = a.entries();
          //    while (!(i = it.next()).done)
          //      if (!b.has(i.value[0])) return false;
          //    ```
          //
          //    **Note**: `i` access switches to `i.value`.


          var it;

          if (hasMap && a instanceof Map && b instanceof Map) {
            if (a.size !== b.size) return false;
            it = a.entries();

            while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;

            it = a.entries();

            while (!(i = it.next()).done) if (!equal(i.value[1], b.get(i.value[0]))) return false;

            return true;
          }

          if (hasSet && a instanceof Set && b instanceof Set) {
            if (a.size !== b.size) return false;
            it = a.entries();

            while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;

            return true;
          } // END: Modifications


          if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
            length = a.length;
            if (length != b.length) return false;

            for (i = length; i-- !== 0;) if (a[i] !== b[i]) return false;

            return true;
          }

          if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
          if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
          if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
          keys = Object.keys(a);
          length = keys.length;
          if (length !== Object.keys(b).length) return false;

          for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false; // END: fast-deep-equal
          // START: react-fast-compare
          // custom handling for DOM elements


          if (hasElementType && a instanceof Element) return false; // custom handling for React/Preact

          for (i = length; i-- !== 0;) {
            if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
              // React-specific: avoid traversing React elements' _owner
              // Preact-specific: avoid traversing Preact elements' __v and __o
              //    __v = $_original / $_vnode
              //    __o = $_owner
              // These properties contain circular references and are not needed when
              // comparing the actual elements (and not their owners)
              // .$$typeof and ._store on just reasonable markers of elements
              continue;
            } // all other properties should be traversed as usual


            if (!equal(a[keys[i]], b[keys[i]])) return false;
          } // END: react-fast-compare
          // START: fast-deep-equal


          return true;
        }

        return a !== a && b !== b;
      } // end fast-deep-equal


      var reactFastCompare = function isEqual(a, b) {
        try {
          return equal(a, b);
        } catch (error) {
          if ((error.message || '').match(/stack|recursion/i)) {
            // warn on circular references, don't crash
            // browsers give this different errors name and messages:
            // chrome/safari: "RangeError", "Maximum call stack size exceeded"
            // firefox: "InternalError", too much recursion"
            // edge: "Error", "Out of stack space"
            console.warn('react-fast-compare cannot handle circular refs');
            return false;
          } // some other error. we should definitely know about these


          throw error;
        }
      };

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
          } // Detect buggy property enumeration order in older V8 versions.
          // https://bugs.chromium.org/p/v8/issues/detail?id=4118


          var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

          test1[5] = 'de';

          if (Object.getOwnPropertyNames(test1)[0] === '5') {
            return false;
          } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


          var test2 = {};

          for (var i = 0; i < 10; i++) {
            test2['_' + String.fromCharCode(i)] = i;
          }

          var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
            return test2[n];
          });

          if (order2.join('') !== '0123456789') {
            return false;
          } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


          var test3 = {};
          'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
            test3[letter] = letter;
          });

          if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
            return false;
          }

          return true;
        } catch (err) {
          // We don't expect any of the above to throw, but better to be safe.
          return false;
        }
      }

      var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
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

      var ATTRIBUTE_NAMES = {
        BODY: "bodyAttributes",
        HTML: "htmlAttributes",
        TITLE: "titleAttributes"
      };
      var TAG_NAMES = {
        BASE: "base",
        BODY: "body",
        HEAD: "head",
        HTML: "html",
        LINK: "link",
        META: "meta",
        NOSCRIPT: "noscript",
        SCRIPT: "script",
        STYLE: "style",
        TITLE: "title"
      };
      var VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
        return TAG_NAMES[name];
      });
      var TAG_PROPERTIES = {
        CHARSET: "charset",
        CSS_TEXT: "cssText",
        HREF: "href",
        HTTPEQUIV: "http-equiv",
        INNER_HTML: "innerHTML",
        ITEM_PROP: "itemprop",
        NAME: "name",
        PROPERTY: "property",
        REL: "rel",
        SRC: "src",
        TARGET: "target"
      };
      var REACT_TAG_MAP = {
        accesskey: "accessKey",
        charset: "charSet",
        class: "className",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        "http-equiv": "httpEquiv",
        itemprop: "itemProp",
        tabindex: "tabIndex"
      };
      var HELMET_PROPS = {
        DEFAULT_TITLE: "defaultTitle",
        DEFER: "defer",
        ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
        ON_CHANGE_CLIENT_STATE: "onChangeClientState",
        TITLE_TEMPLATE: "titleTemplate"
      };
      var HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
        obj[REACT_TAG_MAP[key]] = key;
        return obj;
      }, {});
      var SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];
      var HELMET_ATTRIBUTE = "data-react-helmet";

      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      var classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };

      var createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      var _extends = Object.assign || function (target) {
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

      var inherits = function (subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      };

      var objectWithoutProperties = function (obj, keys) {
        var target = {};

        for (var i in obj) {
          if (keys.indexOf(i) >= 0) continue;
          if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
          target[i] = obj[i];
        }

        return target;
      };

      var possibleConstructorReturn = function (self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      };

      var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
        var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (encode === false) {
          return String(str);
        }

        return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
      };

      var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
        var innermostTitle = getInnermostProperty(propsList, TAG_NAMES.TITLE);
        var innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);

        if (innermostTemplate && innermostTitle) {
          // use function arg to avoid need to escape $ characters
          return innermostTemplate.replace(/%s/g, function () {
            return Array.isArray(innermostTitle) ? innermostTitle.join("") : innermostTitle;
          });
        }

        var innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
        return innermostTitle || innermostDefaultTitle || undefined;
      };

      var getOnChangeClientState = function getOnChangeClientState(propsList) {
        return getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
      };

      var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
        return propsList.filter(function (props) {
          return typeof props[tagType] !== "undefined";
        }).map(function (props) {
          return props[tagType];
        }).reduce(function (tagAttrs, current) {
          return _extends({}, tagAttrs, current);
        }, {});
      };

      var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
        return propsList.filter(function (props) {
          return typeof props[TAG_NAMES.BASE] !== "undefined";
        }).map(function (props) {
          return props[TAG_NAMES.BASE];
        }).reverse().reduce(function (innermostBaseTag, tag) {
          if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
              var attributeKey = keys[i];
              var lowerCaseAttributeKey = attributeKey.toLowerCase();

              if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                return innermostBaseTag.concat(tag);
              }
            }
          }

          return innermostBaseTag;
        }, []);
      };

      var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
        // Calculate list of tags, giving priority innermost component (end of the propslist)
        var approvedSeenTags = {};
        return propsList.filter(function (props) {
          if (Array.isArray(props[tagName])) {
            return true;
          }

          if (typeof props[tagName] !== "undefined") {
            warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
          }

          return false;
        }).map(function (props) {
          return props[tagName];
        }).reverse().reduce(function (approvedTags, instanceTags) {
          var instanceSeenTags = {};
          instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
              var attributeKey = keys[i];
              var lowerCaseAttributeKey = attributeKey.toLowerCase(); // Special rule with link tags, since rel and href are both primary tags, rel takes priority

              if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                primaryAttributeKey = lowerCaseAttributeKey;
              } // Special case for innerHTML which doesn't work lowercased


              if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === TAG_PROPERTIES.INNER_HTML || attributeKey === TAG_PROPERTIES.CSS_TEXT || attributeKey === TAG_PROPERTIES.ITEM_PROP)) {
                primaryAttributeKey = attributeKey;
              }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
              return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
              approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
              instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
              instanceSeenTags[primaryAttributeKey][value] = true;
              return true;
            }

            return false;
          }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
          }); // Update seen tags with tags from this instance

          var keys = Object.keys(instanceSeenTags);

          for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = objectAssign({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);
            approvedSeenTags[attributeKey] = tagUnion;
          }

          return approvedTags;
        }, []).reverse();
      };

      var getInnermostProperty = function getInnermostProperty(propsList, property) {
        for (var i = propsList.length - 1; i >= 0; i--) {
          var props = propsList[i];

          if (props.hasOwnProperty(property)) {
            return props[property];
          }
        }

        return null;
      };

      var reducePropsToState = function reducePropsToState(propsList) {
        return {
          baseTag: getBaseTagFromPropsList([TAG_PROPERTIES.HREF, TAG_PROPERTIES.TARGET], propsList),
          bodyAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.BODY, propsList),
          defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
          encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
          htmlAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.HTML, propsList),
          linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
          metaTags: getTagsFromPropsList(TAG_NAMES.META, [TAG_PROPERTIES.NAME, TAG_PROPERTIES.CHARSET, TAG_PROPERTIES.HTTPEQUIV, TAG_PROPERTIES.PROPERTY, TAG_PROPERTIES.ITEM_PROP], propsList),
          noscriptTags: getTagsFromPropsList(TAG_NAMES.NOSCRIPT, [TAG_PROPERTIES.INNER_HTML], propsList),
          onChangeClientState: getOnChangeClientState(propsList),
          scriptTags: getTagsFromPropsList(TAG_NAMES.SCRIPT, [TAG_PROPERTIES.SRC, TAG_PROPERTIES.INNER_HTML], propsList),
          styleTags: getTagsFromPropsList(TAG_NAMES.STYLE, [TAG_PROPERTIES.CSS_TEXT], propsList),
          title: getTitleFromPropsList(propsList),
          titleAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.TITLE, propsList)
        };
      };

      var rafPolyfill = function () {
        var clock = Date.now();
        return function (callback) {
          var currentTime = Date.now();

          if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
          } else {
            setTimeout(function () {
              rafPolyfill(callback);
            }, 0);
          }
        };
      }();

      var cafPolyfill = function cafPolyfill(id) {
        return clearTimeout(id);
      };

      var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;
      var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;

      var warn = function warn(msg) {
        return console && typeof console.warn === "function" && console.warn(msg);
      };

      var _helmetCallback = null;

      var handleClientStateChange = function handleClientStateChange(newState) {
        if (_helmetCallback) {
          cancelAnimationFrame(_helmetCallback);
        }

        if (newState.defer) {
          _helmetCallback = requestAnimationFrame(function () {
            commitTagChanges(newState, function () {
              _helmetCallback = null;
            });
          });
        } else {
          commitTagChanges(newState);
          _helmetCallback = null;
        }
      };

      var commitTagChanges = function commitTagChanges(newState, cb) {
        var baseTag = newState.baseTag,
            bodyAttributes = newState.bodyAttributes,
            htmlAttributes = newState.htmlAttributes,
            linkTags = newState.linkTags,
            metaTags = newState.metaTags,
            noscriptTags = newState.noscriptTags,
            onChangeClientState = newState.onChangeClientState,
            scriptTags = newState.scriptTags,
            styleTags = newState.styleTags,
            title = newState.title,
            titleAttributes = newState.titleAttributes;
        updateAttributes(TAG_NAMES.BODY, bodyAttributes);
        updateAttributes(TAG_NAMES.HTML, htmlAttributes);
        updateTitle(title, titleAttributes);
        var tagUpdates = {
          baseTag: updateTags(TAG_NAMES.BASE, baseTag),
          linkTags: updateTags(TAG_NAMES.LINK, linkTags),
          metaTags: updateTags(TAG_NAMES.META, metaTags),
          noscriptTags: updateTags(TAG_NAMES.NOSCRIPT, noscriptTags),
          scriptTags: updateTags(TAG_NAMES.SCRIPT, scriptTags),
          styleTags: updateTags(TAG_NAMES.STYLE, styleTags)
        };
        var addedTags = {};
        var removedTags = {};
        Object.keys(tagUpdates).forEach(function (tagType) {
          var _tagUpdates$tagType = tagUpdates[tagType],
              newTags = _tagUpdates$tagType.newTags,
              oldTags = _tagUpdates$tagType.oldTags;

          if (newTags.length) {
            addedTags[tagType] = newTags;
          }

          if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
          }
        });
        cb && cb();
        onChangeClientState(newState, addedTags, removedTags);
      };

      var flattenArray = function flattenArray(possibleArray) {
        return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
      };

      var updateTitle = function updateTitle(title, attributes) {
        if (typeof title !== "undefined" && document.title !== title) {
          document.title = flattenArray(title);
        }

        updateAttributes(TAG_NAMES.TITLE, attributes);
      };

      var updateAttributes = function updateAttributes(tagName, attributes) {
        var elementTag = document.getElementsByTagName(tagName)[0];

        if (!elementTag) {
          return;
        }

        var helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
        var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
        var attributesToRemove = [].concat(helmetAttributes);
        var attributeKeys = Object.keys(attributes);

        for (var i = 0; i < attributeKeys.length; i++) {
          var attribute = attributeKeys[i];
          var value = attributes[attribute] || "";

          if (elementTag.getAttribute(attribute) !== value) {
            elementTag.setAttribute(attribute, value);
          }

          if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
          }

          var indexToSave = attributesToRemove.indexOf(attribute);

          if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
          }
        }

        for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
          elementTag.removeAttribute(attributesToRemove[_i]);
        }

        if (helmetAttributes.length === attributesToRemove.length) {
          elementTag.removeAttribute(HELMET_ATTRIBUTE);
        } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
          elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
        }
      };

      var updateTags = function updateTags(type, tags) {
        var headElement = document.head || document.querySelector(TAG_NAMES.HEAD);
        var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
        var oldTags = Array.prototype.slice.call(tagNodes);
        var newTags = [];
        var indexToDelete = void 0;

        if (tags && tags.length) {
          tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
              if (tag.hasOwnProperty(attribute)) {
                if (attribute === TAG_PROPERTIES.INNER_HTML) {
                  newElement.innerHTML = tag.innerHTML;
                } else if (attribute === TAG_PROPERTIES.CSS_TEXT) {
                  if (newElement.styleSheet) {
                    newElement.styleSheet.cssText = tag.cssText;
                  } else {
                    newElement.appendChild(document.createTextNode(tag.cssText));
                  }
                } else {
                  var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                  newElement.setAttribute(attribute, value);
                }
              }
            }

            newElement.setAttribute(HELMET_ATTRIBUTE, "true"); // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.

            if (oldTags.some(function (existingTag, index) {
              indexToDelete = index;
              return newElement.isEqualNode(existingTag);
            })) {
              oldTags.splice(indexToDelete, 1);
            } else {
              newTags.push(newElement);
            }
          });
        }

        oldTags.forEach(function (tag) {
          return tag.parentNode.removeChild(tag);
        });
        newTags.forEach(function (tag) {
          return headElement.appendChild(tag);
        });
        return {
          oldTags: oldTags,
          newTags: newTags
        };
      };

      var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
        return Object.keys(attributes).reduce(function (str, key) {
          var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
          return str ? str + " " + attr : attr;
        }, "");
      };

      var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
        var attributeString = generateElementAttributesAsString(attributes);
        var flattenedTitle = flattenArray(title);
        return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
      };

      var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
        return tags.reduce(function (str, tag) {
          var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === TAG_PROPERTIES.INNER_HTML || attribute === TAG_PROPERTIES.CSS_TEXT);
          }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
            return string ? string + " " + attr : attr;
          }, "");
          var tagContent = tag.innerHTML || tag.cssText || "";
          var isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
          return str + "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
        }, "");
      };

      var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
        var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return Object.keys(attributes).reduce(function (obj, key) {
          obj[REACT_TAG_MAP[key] || key] = attributes[key];
          return obj;
        }, initProps);
      };

      var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
        var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return Object.keys(props).reduce(function (obj, key) {
          obj[HTML_TAG_MAP[key] || key] = props[key];
          return obj;
        }, initAttributes);
      };

      var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
        var _initProps; // assigning into an array to define toString function on it


        var initProps = (_initProps = {
          key: title
        }, _initProps[HELMET_ATTRIBUTE] = true, _initProps);
        var props = convertElementAttributestoReactProps(attributes, initProps);
        return [/*#__PURE__*/React__default.createElement(TAG_NAMES.TITLE, props, title)];
      };

      var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
        return tags.map(function (tag, i) {
          var _mappedTag;

          var mappedTag = (_mappedTag = {
            key: i
          }, _mappedTag[HELMET_ATTRIBUTE] = true, _mappedTag);
          Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = REACT_TAG_MAP[attribute] || attribute;

            if (mappedAttribute === TAG_PROPERTIES.INNER_HTML || mappedAttribute === TAG_PROPERTIES.CSS_TEXT) {
              var content = tag.innerHTML || tag.cssText;
              mappedTag.dangerouslySetInnerHTML = {
                __html: content
              };
            } else {
              mappedTag[mappedAttribute] = tag[attribute];
            }
          });
          return /*#__PURE__*/React__default.createElement(type, mappedTag);
        });
      };

      var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
        switch (type) {
          case TAG_NAMES.TITLE:
            return {
              toComponent: function toComponent() {
                return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes);
              },
              toString: function toString() {
                return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
              }
            };

          case ATTRIBUTE_NAMES.BODY:
          case ATTRIBUTE_NAMES.HTML:
            return {
              toComponent: function toComponent() {
                return convertElementAttributestoReactProps(tags);
              },
              toString: function toString() {
                return generateElementAttributesAsString(tags);
              }
            };

          default:
            return {
              toComponent: function toComponent() {
                return generateTagsAsReactComponent(type, tags);
              },
              toString: function toString() {
                return generateTagsAsString(type, tags, encode);
              }
            };
        }
      };

      var mapStateOnServer = function mapStateOnServer(_ref) {
        var baseTag = _ref.baseTag,
            bodyAttributes = _ref.bodyAttributes,
            encode = _ref.encode,
            htmlAttributes = _ref.htmlAttributes,
            linkTags = _ref.linkTags,
            metaTags = _ref.metaTags,
            noscriptTags = _ref.noscriptTags,
            scriptTags = _ref.scriptTags,
            styleTags = _ref.styleTags,
            _ref$title = _ref.title,
            title = _ref$title === undefined ? "" : _ref$title,
            titleAttributes = _ref.titleAttributes;
        return {
          base: getMethodsForTag(TAG_NAMES.BASE, baseTag, encode),
          bodyAttributes: getMethodsForTag(ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
          htmlAttributes: getMethodsForTag(ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
          link: getMethodsForTag(TAG_NAMES.LINK, linkTags, encode),
          meta: getMethodsForTag(TAG_NAMES.META, metaTags, encode),
          noscript: getMethodsForTag(TAG_NAMES.NOSCRIPT, noscriptTags, encode),
          script: getMethodsForTag(TAG_NAMES.SCRIPT, scriptTags, encode),
          style: getMethodsForTag(TAG_NAMES.STYLE, styleTags, encode),
          title: getMethodsForTag(TAG_NAMES.TITLE, {
            title: title,
            titleAttributes: titleAttributes
          }, encode)
        };
      };

      var Helmet = function Helmet(Component) {
        var _class, _temp;

        return _temp = _class = function (_React$Component) {
          inherits(HelmetWrapper, _React$Component);

          function HelmetWrapper() {
            classCallCheck(this, HelmetWrapper);
            return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
          }

          HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !reactFastCompare(this.props, nextProps);
          };

          HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
            if (!nestedChildren) {
              return null;
            }

            switch (child.type) {
              case TAG_NAMES.SCRIPT:
              case TAG_NAMES.NOSCRIPT:
                return {
                  innerHTML: nestedChildren
                };

              case TAG_NAMES.STYLE:
                return {
                  cssText: nestedChildren
                };
            }

            throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
          };

          HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
            var _babelHelpers$extends;

            var child = _ref.child,
                arrayTypeChildren = _ref.arrayTypeChildren,
                newChildProps = _ref.newChildProps,
                nestedChildren = _ref.nestedChildren;
            return _extends({}, arrayTypeChildren, (_babelHelpers$extends = {}, _babelHelpers$extends[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _babelHelpers$extends));
          };

          HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
            var _babelHelpers$extends2, _babelHelpers$extends3;

            var child = _ref2.child,
                newProps = _ref2.newProps,
                newChildProps = _ref2.newChildProps,
                nestedChildren = _ref2.nestedChildren;

            switch (child.type) {
              case TAG_NAMES.TITLE:
                return _extends({}, newProps, (_babelHelpers$extends2 = {}, _babelHelpers$extends2[child.type] = nestedChildren, _babelHelpers$extends2.titleAttributes = _extends({}, newChildProps), _babelHelpers$extends2));

              case TAG_NAMES.BODY:
                return _extends({}, newProps, {
                  bodyAttributes: _extends({}, newChildProps)
                });

              case TAG_NAMES.HTML:
                return _extends({}, newProps, {
                  htmlAttributes: _extends({}, newChildProps)
                });
            }

            return _extends({}, newProps, (_babelHelpers$extends3 = {}, _babelHelpers$extends3[child.type] = _extends({}, newChildProps), _babelHelpers$extends3));
          };

          HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
            var newFlattenedProps = _extends({}, newProps);

            Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
              var _babelHelpers$extends4;

              newFlattenedProps = _extends({}, newFlattenedProps, (_babelHelpers$extends4 = {}, _babelHelpers$extends4[arrayChildName] = arrayTypeChildren[arrayChildName], _babelHelpers$extends4));
            });
            return newFlattenedProps;
          };

          HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
            if (process.env.NODE_ENV !== "production") {
              if (!VALID_TAG_NAMES.some(function (name) {
                return child.type === name;
              })) {
                if (typeof child.type === "function") {
                  return warn("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.");
                }

                return warn("Only elements types " + VALID_TAG_NAMES.join(", ") + " are allowed. Helmet does not support rendering <" + child.type + "> elements. Refer to our API for more information.");
              }

              if (nestedChildren && typeof nestedChildren !== "string" && (!Array.isArray(nestedChildren) || nestedChildren.some(function (nestedChild) {
                return typeof nestedChild !== "string";
              }))) {
                throw new Error("Helmet expects a string as a child of <" + child.type + ">. Did you forget to wrap your children in braces? ( <" + child.type + ">{``}</" + child.type + "> ) Refer to our API for more information.");
              }
            }

            return true;
          };

          HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
            var _this2 = this;

            var arrayTypeChildren = {};
            React__default.Children.forEach(children, function (child) {
              if (!child || !child.props) {
                return;
              }

              var _child$props = child.props,
                  nestedChildren = _child$props.children,
                  childProps = objectWithoutProperties(_child$props, ["children"]);
              var newChildProps = convertReactPropstoHtmlAttributes(childProps);

              _this2.warnOnInvalidChildren(child, nestedChildren);

              switch (child.type) {
                case TAG_NAMES.LINK:
                case TAG_NAMES.META:
                case TAG_NAMES.NOSCRIPT:
                case TAG_NAMES.SCRIPT:
                case TAG_NAMES.STYLE:
                  arrayTypeChildren = _this2.flattenArrayTypeChildren({
                    child: child,
                    arrayTypeChildren: arrayTypeChildren,
                    newChildProps: newChildProps,
                    nestedChildren: nestedChildren
                  });
                  break;

                default:
                  newProps = _this2.mapObjectTypeChildren({
                    child: child,
                    newProps: newProps,
                    newChildProps: newChildProps,
                    nestedChildren: nestedChildren
                  });
                  break;
              }
            });
            newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
            return newProps;
          };

          HelmetWrapper.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                props = objectWithoutProperties(_props, ["children"]);

            var newProps = _extends({}, props);

            if (children) {
              newProps = this.mapChildrenToProps(children, newProps);
            }

            return /*#__PURE__*/React__default.createElement(Component, newProps);
          };

          createClass(HelmetWrapper, null, [{
            key: "canUseDOM",
            // Component.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.

            /**
             * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
             * @param {Object} bodyAttributes: {"className": "root"}
             * @param {String} defaultTitle: "Default Title"
             * @param {Boolean} defer: true
             * @param {Boolean} encodeSpecialCharacters: true
             * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
             * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
             * @param {Array} meta: [{"name": "description", "content": "Test description"}]
             * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
             * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
             * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
             * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
             * @param {String} title: "Title"
             * @param {Object} titleAttributes: {"itemprop": "name"}
             * @param {String} titleTemplate: "MySite.com - %s"
             */
            set: function set$$1(canUseDOM) {
              Component.canUseDOM = canUseDOM;
            }
          }]);
          return HelmetWrapper;
        }(React__default.Component), _class.propTypes = {
          base: PropTypes.object,
          bodyAttributes: PropTypes.object,
          children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
          defaultTitle: PropTypes.string,
          defer: PropTypes.bool,
          encodeSpecialCharacters: PropTypes.bool,
          htmlAttributes: PropTypes.object,
          link: PropTypes.arrayOf(PropTypes.object),
          meta: PropTypes.arrayOf(PropTypes.object),
          noscript: PropTypes.arrayOf(PropTypes.object),
          onChangeClientState: PropTypes.func,
          script: PropTypes.arrayOf(PropTypes.object),
          style: PropTypes.arrayOf(PropTypes.object),
          title: PropTypes.string,
          titleAttributes: PropTypes.object,
          titleTemplate: PropTypes.string
        }, _class.defaultProps = {
          defer: true,
          encodeSpecialCharacters: true
        }, _class.peek = Component.peek, _class.rewind = function () {
          var mappedState = Component.rewind();

          if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = mapStateOnServer({
              baseTag: [],
              bodyAttributes: {},
              encodeSpecialCharacters: true,
              htmlAttributes: {},
              linkTags: [],
              metaTags: [],
              noscriptTags: [],
              scriptTags: [],
              styleTags: [],
              title: "",
              titleAttributes: {}
            });
          }

          return mappedState;
        }, _temp;
      };

      var NullComponent = function NullComponent() {
        return null;
      };

      var HelmetSideEffects = withSideEffect(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);
      var HelmetExport = Helmet(HelmetSideEffects);
      HelmetExport.renderStatic = HelmetExport.rewind;

      const WenerApisLayout = ({
        menus,
        showFooter,
        children,
        title,
        description,
        keywords,
        Link
      }) => {
        title = title || `Wener's APIs`;
        return /*#__PURE__*/createElement(NamedThemeProvider, {
          initialTheme: typeof window === 'undefined' ? 'light' : () => {
            return localStorage['THEME'] === 'dark' ? 'dark' : 'light';
          }
        }, /*#__PURE__*/createElement(HelmetExport, {
          key: "layout"
        }, /*#__PURE__*/createElement("title", null, title, title !== `Wener's APIs` ? ` - Wener's APIs` : ''), /*#__PURE__*/createElement("meta", {
          name: "og:title",
          property: "og:title",
          content: title
        }), description && /*#__PURE__*/createElement("meta", {
          name: "description",
          content: description
        }), description && /*#__PURE__*/createElement("meta", {
          name: "og:description",
          property: "og:description",
          content: description
        }), keywords && /*#__PURE__*/createElement("meta", {
          name: "keywords",
          content: Array.isArray(keywords) ? keywords.join(',') : keywords
        })), /*#__PURE__*/createElement(LayoutFrame, {
          menuProps: {
            mode: 'vertical'
          },
          menus: menus,
          showFooter: showFooter,
          link: Link
        }, /*#__PURE__*/createElement(Fragment, null, children)));
      };

      const menus = [{
        title: '首页',
        iconComponent: /*#__PURE__*/React__default.createElement(HomeOutlined, null),
        iconType: 'home',
        path: '/',
        content: {
          module: '@wener/ui/wener',
          name: 'WenerApisWelcome'
        }
      }, {
        title: '我的定位',
        iconComponent: /*#__PURE__*/React__default.createElement(EnvironmentOutlined, null),
        iconType: 'environment',
        path: '/geo/me',
        content: {
          module: '@wener/apis-geo',
          name: 'LocationMeLite'
        }
      }, {
        title: '电话归属地',
        iconComponent: /*#__PURE__*/React__default.createElement(PhoneOutlined, null),
        iconType: 'phone',
        path: '/phone/attribution',
        extraPaths: ['/phone/attribution/:number'],
        routes: ['/phone/attribution/[num]'],
        content: {
          module: '@wener/apis-phone',
          name: 'PhoneAttributionContent'
        }
      }, {
        title: 'URI',
        iconComponent: /*#__PURE__*/React__default.createElement(LinkOutlined, null),
        children: [{
          title: 'URL',
          path: '/uri/url',
          content: {
            module: '@wener/apis-uri',
            name: 'UrlPlayground'
          }
        }]
      }, {
        title: '语言',
        iconComponent: /*#__PURE__*/React__default.createElement(InteractionOutlined, null),
        children: [{
          title: 'INI',
          path: '/langs/ini/play',
          content: {
            module: '@wener/apis-langs',
            name: 'IniPlayground'
          }
        }, {
          title: 'Asterisk Conf',
          path: '/langs/asterisk-conf/play',
          content: {
            module: '@wener/apis-langs',
            name: 'AsteriskConfPlayground'
          }
        }, {
          title: 'HTML Entities',
          path: '/langs/html-entities/play',
          content: {
            module: '@wener/apis-langs',
            name: 'HtmlEntitiesPlayground'
          }
        }, {
          title: 'XML',
          path: '/langs/xml/play',
          content: {
            module: '@wener/apis-lang-xml',
            name: 'XmlPlayground'
          }
        }]
      }, {
        title: '密码强度检测',
        iconComponent: /*#__PURE__*/React__default.createElement(KeyOutlined, null),
        iconType: 'key',
        path: '/password/strength',
        extraPaths: ['/password/strength/:password'],
        content: {
          module: '@wener/apis-password',
          name: 'PasswordStrengthContent'
        }
      }, {
        title: '条形码',
        iconComponent: /*#__PURE__*/React__default.createElement(BarcodeOutlined, null),
        iconType: 'qrcode',
        children: [{
          title: '二维码生成',
          path: '/barcode/qrcode/builder',
          iconComponent: /*#__PURE__*/React__default.createElement(QrcodePrintOutlined, null),
          content: {
            module: '@wener/apis-qrcode',
            name: 'QrCodeBuilderPlayground'
          }
        }, {
          title: '二维码解析',
          path: '/barcode/qrcode/reader',
          iconComponent: /*#__PURE__*/React__default.createElement(QrcodeReadOutlined, null),
          content: {
            module: '@wener/apis-qrcode',
            name: 'QrCodeReaderPlayground'
          }
        }, {
          title: '条形码生成',
          path: '/barcode/linear/builder',
          iconComponent: /*#__PURE__*/React__default.createElement(BarcodePrintOutlined, null)
        }, {
          title: '条形码解析',
          path: '/barcode/linear/reader',
          iconComponent: /*#__PURE__*/React__default.createElement(BarcodeReadOutlined, null)
        }]
      }, {
        title: 'Kong网关',
        iconComponent: /*#__PURE__*/React__default.createElement(PartitionOutlined, null),
        children: [{
          title: '管理',
          path: '/kong/admin'
        }]
      }, {
        title: 'WebTorrent',
        iconComponent: /*#__PURE__*/React__default.createElement(WebTorrentFilled, null),
        children: [{
          title: '客户端',
          path: '/webtorrent/client'
        }, {
          title: 'BT文件解析',
          path: '/webtorrent/torrent/reader'
        }, {
          title: 'Bencode',
          path: '/webtorrent/bencode'
        }]
      }, {
        title: 'PKI',
        iconComponent: /*#__PURE__*/React__default.createElement(CertificateVerifiedBadgeOutlined, null),
        children: [{
          title: '证书解析',
          path: '/pki/pem/reader'
        }]
      }, {
        title: 'WebRTC',
        iconComponent: /*#__PURE__*/React__default.createElement(RtcOutlined, null),
        children: [{
          title: '浏览器检测',
          path: '/webrtc/checker',
          content: {
            module: '@wener/apis-webrtc',
            name: 'WebRTCChecker'
          }
        }]
      }, {
        title: '编辑器',
        iconComponent: /*#__PURE__*/React__default.createElement(EditOutlined, null),
        children: [{
          title: 'ProseMirror',
          path: '/editor/prosemirror'
        }, {
          title: 'Slate',
          path: '/editor/slate'
        }, {
          title: 'Simple Code Editor',
          path: '/editor/simple-code'
        }, {
          title: 'Prettier格式化',
          path: '/editor/prettier'
        }]
      }, {
        title: '搜狗词库',
        // iconComponent: <BookOutlined />,
        iconComponent: /*#__PURE__*/React__default.createElement(DictOutlined, null),
        iconType: 'book',
        children: [{
          title: '词库列表',
          path: '/scel/list'
        }, {
          title: '词库解析',
          path: '/scel/read'
        }]
      }, {
        title: 'IPFS',
        iconComponent: /*#__PURE__*/React__default.createElement(IpfsOutlined, null),
        iconType: 'file',
        children: [{
          title: '网关检测',
          path: '/ipfs/gateway/checker',
          content: {
            module: '@wener/apis-ipfs',
            name: 'GatewayChecker'
          }
        }]
      }, {
        title: '加密',
        // iconComponent: <LockOutlined />,
        iconComponent: /*#__PURE__*/React__default.createElement(BorderlessTableOutlined, null),
        iconType: 'lock',
        children: [{
          title: '哈希',
          path: `/crypto/hash`,
          content: {
            module: '@wener/apis-crypto',
            name: 'HashPlayground'
          }
        }]
      }, {
        title: '实验',
        iconComponent: /*#__PURE__*/React__default.createElement(ExperimentOutlined, null),
        children: [{
          title: '模块管理',
          path: '/lab/modules',
          content: {
            module: '@wener/apis-mgmt',
            name: 'ModuleManagementPanel'
          }
        }, {
          title: '测试 PingService',
          path: '/lab/ping',
          content: {
            module: '@wener/apis-test',
            name: 'PingServiceTest'
          }
        }]
      }];

      function flatMenus(menus) {
        const reducer = (all, cur) => {
          all.push(cur);

          if (cur.children) {
            cur.children.map(v => ({ ...cur,
              children: [],
              path: undefined,
              extraPaths: undefined,
              content: undefined,
              ...v
            })).reduce(reducer, all);
          }

          return all;
        };

        return menus.reduce(reducer, []);
      }

      function buildRoutes(menus) {
        const all = flatMenus(menus);
        return all.filter(v => v.content).filter(v => v.path).map(v => {
          return { ...v,
            path: [v.path, ...(v.extraPaths || [])]
          };
        }).map(v => v);
      }

      const routes = [...buildRoutes(menus), {
        title: 'PingServiceTest',
        path: '/test/ping',
        content: {
          module: '@wener/apis-test',
          name: 'PingServiceTest'
        }
      }];

      function createCommonjsModule(fn, basedir, module) {
      	return module = {
      	  path: basedir,
      	  exports: {},
      	  require: function (path, base) {
            return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
          }
      	}, fn(module, module.exports), module.exports;
      }

      function commonjsRequire () {
      	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
      }

      var lib = createCommonjsModule(function (module) {

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var ALL_INITIALIZERS = [];
        var READY_INITIALIZERS = [];

        function isWebpackReady(getModuleIds) {
          if ((typeof __webpack_modules__ === "undefined" ? "undefined" : _typeof(__webpack_modules__)) !== "object") {
            return false;
          }

          return getModuleIds().every(function (moduleId) {
            return typeof moduleId !== "undefined" && typeof __webpack_modules__[moduleId] !== "undefined";
          });
        }

        function load(loader) {
          var promise = loader();
          var state = {
            loading: true,
            loaded: null,
            error: null
          };
          state.promise = promise.then(function (loaded) {
            state.loading = false;
            state.loaded = loaded;
            return loaded;
          }).catch(function (err) {
            state.loading = false;
            state.error = err;
            throw err;
          });
          return state;
        }

        function loadMap(obj) {
          var state = {
            loading: false,
            loaded: {},
            error: null
          };
          var promises = [];

          try {
            Object.keys(obj).forEach(function (key) {
              var result = load(obj[key]);

              if (!result.loading) {
                state.loaded[key] = result.loaded;
                state.error = result.error;
              } else {
                state.loading = true;
              }

              promises.push(result.promise);
              result.promise.then(function (res) {
                state.loaded[key] = res;
              }).catch(function (err) {
                state.error = err;
              });
            });
          } catch (err) {
            state.error = err;
          }

          state.promise = Promise.all(promises).then(function (res) {
            state.loading = false;
            return res;
          }).catch(function (err) {
            state.loading = false;
            throw err;
          });
          return state;
        }

        function resolve(obj) {
          return obj && obj.__esModule ? obj.default : obj;
        }

        function render(loaded, props) {
          return React__default.createElement(resolve(loaded), props);
        }

        function createLoadableComponent(loadFn, options) {
          var _class, _temp;

          if (!options.loading) {
            throw new Error("react-loadable requires a `loading` component");
          }

          var opts = Object.assign({
            loader: null,
            loading: null,
            delay: 200,
            timeout: null,
            render: render,
            webpack: null,
            modules: null
          }, options);
          var res = null;

          function init() {
            if (!res) {
              res = loadFn(opts.loader);
            }

            return res.promise;
          }

          ALL_INITIALIZERS.push(init);

          if (typeof opts.webpack === "function") {
            READY_INITIALIZERS.push(function () {
              if (isWebpackReady(opts.webpack)) {
                return init();
              }
            });
          }

          return _temp = _class = function (_React$Component) {
            _inherits(LoadableComponent, _React$Component);

            function LoadableComponent(props) {
              _classCallCheck(this, LoadableComponent);

              var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

              _this.retry = function () {
                _this.setState({
                  error: null,
                  loading: true,
                  timedOut: false
                });

                res = loadFn(opts.loader);

                _this._loadModule();
              };

              init();
              _this.state = {
                error: res.error,
                pastDelay: false,
                timedOut: false,
                loading: res.loading,
                loaded: res.loaded
              };
              return _this;
            }

            LoadableComponent.preload = function preload() {
              return init();
            };

            LoadableComponent.prototype.componentWillMount = function componentWillMount() {
              this._mounted = true;

              this._loadModule();
            };

            LoadableComponent.prototype._loadModule = function _loadModule() {
              var _this2 = this;

              if (this.context.loadable && Array.isArray(opts.modules)) {
                opts.modules.forEach(function (moduleName) {
                  _this2.context.loadable.report(moduleName);
                });
              }

              if (!res.loading) {
                return;
              }

              if (typeof opts.delay === "number") {
                if (opts.delay === 0) {
                  this.setState({
                    pastDelay: true
                  });
                } else {
                  this._delay = setTimeout(function () {
                    _this2.setState({
                      pastDelay: true
                    });
                  }, opts.delay);
                }
              }

              if (typeof opts.timeout === "number") {
                this._timeout = setTimeout(function () {
                  _this2.setState({
                    timedOut: true
                  });
                }, opts.timeout);
              }

              var update = function update() {
                if (!_this2._mounted) {
                  return;
                }

                _this2.setState({
                  error: res.error,
                  loaded: res.loaded,
                  loading: res.loading
                });

                _this2._clearTimeouts();
              };

              res.promise.then(function () {
                update();
              }).catch(function (err) {
                update();
              });
            };

            LoadableComponent.prototype.componentWillUnmount = function componentWillUnmount() {
              this._mounted = false;

              this._clearTimeouts();
            };

            LoadableComponent.prototype._clearTimeouts = function _clearTimeouts() {
              clearTimeout(this._delay);
              clearTimeout(this._timeout);
            };

            LoadableComponent.prototype.render = function render() {
              if (this.state.loading || this.state.error) {
                return React__default.createElement(opts.loading, {
                  isLoading: this.state.loading,
                  pastDelay: this.state.pastDelay,
                  timedOut: this.state.timedOut,
                  error: this.state.error,
                  retry: this.retry
                });
              } else if (this.state.loaded) {
                return opts.render(this.state.loaded, this.props);
              } else {
                return null;
              }
            };

            return LoadableComponent;
          }(React__default.Component), _class.contextTypes = {
            loadable: PropTypes.shape({
              report: PropTypes.func.isRequired
            })
          }, _temp;
        }

        function Loadable(opts) {
          return createLoadableComponent(load, opts);
        }

        function LoadableMap(opts) {
          if (typeof opts.render !== "function") {
            throw new Error("LoadableMap requires a `render(loaded, props)` function");
          }

          return createLoadableComponent(loadMap, opts);
        }

        Loadable.Map = LoadableMap;

        var Capture = function (_React$Component2) {
          _inherits(Capture, _React$Component2);

          function Capture() {
            _classCallCheck(this, Capture);

            return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
          }

          Capture.prototype.getChildContext = function getChildContext() {
            return {
              loadable: {
                report: this.props.report
              }
            };
          };

          Capture.prototype.render = function render() {
            return React__default.Children.only(this.props.children);
          };

          return Capture;
        }(React__default.Component);

        Capture.propTypes = {
          report: PropTypes.func.isRequired
        };
        Capture.childContextTypes = {
          loadable: PropTypes.shape({
            report: PropTypes.func.isRequired
          }).isRequired
        };
        Loadable.Capture = Capture;

        function flushInitializers(initializers) {
          var promises = [];

          while (initializers.length) {
            var init = initializers.pop();
            promises.push(init());
          }

          return Promise.all(promises).then(function () {
            if (initializers.length) {
              return flushInitializers(initializers);
            }
          });
        }

        Loadable.preloadAll = function () {
          return new Promise(function (resolve, reject) {
            flushInitializers(ALL_INITIALIZERS).then(resolve, reject);
          });
        };

        Loadable.preloadReady = function () {
          return new Promise(function (resolve, reject) {
            // We always will resolve, errors should be handled within loading UIs.
            flushInitializers(READY_INITIALIZERS).then(resolve, resolve);
          });
        };

        module.exports = Loadable;
      });

      const WenerApisContent = ({
        title,
        icon,
        header,
        children
      }) => {
        return /*#__PURE__*/React__default.createElement(LayoutFrameContent, null, title && /*#__PURE__*/React__default.createElement(PageHeader, {
          title: /*#__PURE__*/React__default.createElement("div", null, icon, title),
          backIcon: false
        }), header, children);
      };

      const NextLink = ({
        href,
        children
      }) => {
        return /*#__PURE__*/createElement(Link, {
          to: href
        }, children);
      };

      const NotFoundSimple = ({
        detail
      }) => /*#__PURE__*/createElement("div", null, "Not Found ", /*#__PURE__*/createElement("br", null), detail);

      function ContentLoadable({
        module: module$1,
        name
      }, {
        onLoad = undefined,
        NotFound = NotFoundSimple
      } = {}) {
        return lib({
          loader: () => module.import(module$1).then(v => {
            const c = v[name] || NotFound;
            onLoad === null || onLoad === void 0 ? void 0 : onLoad(c);
            return c;
          }),
          loading: props => {
            if (props.error) {
              console.error(`Error`, props.error);
              return /*#__PURE__*/createElement("div", null, "Failed loading - ", module$1, "/", name, /*#__PURE__*/createElement("br", null), String(props.error));
            }

            if (props.timedOut) {
              return /*#__PURE__*/createElement("div", null, "Timeout loading - ", module$1, "/", name, " ... ", /*#__PURE__*/createElement("button", {
                onClick: props.retry
              }, "Retry"));
            }

            if (props.pastDelay) {
              return /*#__PURE__*/createElement("div", null, "Loading - ", module$1, "/", name);
            }

            return null;
          }
        });
      }

      const loaders = {};

      const LoadableContent = ({
        content,
        children
      }) => {
        const {
          module,
          name
        } = content;
        const key = `${module}/${name}`; // reload module works - but need upper level reload
        // const Comp = (loaders[key] = loaders[key] || ContentLoadable(content, { onLoad: (v) => (loaders[key] = v) }));

        const Comp = loaders[key] = loaders[key] || ContentLoadable(content);
        return /*#__PURE__*/createElement(Comp, null, children);
      };

      const WenerApisApp = () => {
        return /*#__PURE__*/createElement(HashRouter, null, /*#__PURE__*/createElement(WenerApisLayout, {
          Link: NextLink,
          menus: menus
        }, /*#__PURE__*/createElement(Switch, null, routes.map(({
          iconComponent,
          title,
          content,
          path
        }) => /*#__PURE__*/createElement(Route, {
          exact: true,
          path: path,
          key: path
        }, /*#__PURE__*/createElement(WenerApisContent, {
          title: title,
          icon: iconComponent
        }, /*#__PURE__*/createElement(HelmetExport, null, /*#__PURE__*/createElement("title", null, title, title !== `Wener's APIs` ? ` - Wener's APIs` : ''), /*#__PURE__*/createElement("meta", {
          name: "og:title",
          property: "og:title",
          content: title
        })), /*#__PURE__*/createElement(Alert.ErrorBoundary, null, /*#__PURE__*/createElement(LoadableContent, {
          content: content
        }))))))));
      };

      if (typeof window !== 'undefined') {
        window['singleSpa'] = singleSpa;
      }

      console.info('Initializing');
      registerApplication({
        name: 'WenerApis',
        activeWhen: ['/'],
        app: async () => singleSpaReact({
          React: React__default,
          ReactDOM,
          domElementGetter: () => document.querySelector('#WenerApis'),
          rootComponent: () => /*#__PURE__*/React__default.createElement(WenerApisApp, null, /*#__PURE__*/React__default.createElement("div", null, "Home page")),

          errorBoundary(err, info, props) {
            // Customize the root error boundary for your microfrontend here.
            return null;
          }

        })
      });
      start();

      var title = "APIs 应用";
      var description = "菜单、路由、页面布局控制；动态加载外部组件；Single SPA root config；";
      var metadata = exports('metadata', {
      	title: title,
      	description: description
      });

    }
  };
});
//# sourceMappingURL=wener-apis-root.system.js.map
