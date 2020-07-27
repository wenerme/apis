System.register(['react', '@wener/utils', 'antd', 'rxjs', 'lodash'], function (exports) {
  'use strict';
  var useState, useEffect, useRef, useContext, React, useReducer, loadStyles, Menu, Layout, BehaviorSubject;
  return {
    setters: [function (module) {
      useState = module.useState;
      useEffect = module.useEffect;
      useRef = module.useRef;
      useContext = module.useContext;
      React = module.default;
      useReducer = module.useReducer;
    }, function (module) {
      loadStyles = module.loadStyles;
    }, function (module) {
      Menu = module.Menu;
      Layout = module.Layout;
    }, function (module) {
      BehaviorSubject = module.BehaviorSubject;
    }, function () {}],
    execute: function () {

      exports({
        loadAntdTheme: loadAntdTheme,
        useAntdTheme: useAntdTheme,
        useLayoutFrame: useLayoutFrame,
        useLayoutFrameOptions: useLayoutFrameOptions
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

      function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null) return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;

        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          target[key] = source[key];
        }

        return target;
      }

      function _objectWithoutProperties(source, excluded) {
        if (source == null) return {};

        var target = _objectWithoutPropertiesLoose(source, excluded);

        var key, i;

        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

          for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
          }
        }

        return target;
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

      function loadTheme(options) {
        var _ref = options !== null && options !== void 0 ? options : {},
            theme = _ref.theme,
            type = _ref.type,
            _ref$url = _ref.url,
            url = _ref$url === void 0 ? '' : _ref$url;

        var attr = "data-".concat(type, "-theme");
        var cur = document.querySelector("link[".concat(attr, "=\"").concat(theme, "\"]"));

        if (!cur) {
          if (url) {
            console.info("load theme ".concat(type, " ").concat(theme, " ").concat(url));
            return loadStyles(url, {
              attributes: _defineProperty({}, attr, theme)
            }).then(function () {
              // disable others
              var themes = document.querySelectorAll("link[".concat(attr, "]:not([").concat(attr, "=\"").concat(theme, "\"])"));
              themes.forEach(function (v) {
                return v.setAttribute('disabled', 'true');
              });
              return true;
            });
          }

          return false;
        }

        var themes = document.querySelectorAll("link[".concat(attr, "]:not([").concat(attr, "=\"").concat(theme, "\"])"));
        themes.forEach(function (v) {
          return v.setAttribute('disabled', 'true');
        });
        cur.removeAttribute('disabled');
        return true;
      } // fixme - should use current version ?


      var urls = {
        light: 'https://unpkg.com/antd/dist/antd.min.css',
        dark: 'https://unpkg.com/antd/dist/antd.dark.min.css'
      };
      function loadAntdTheme(options) {
        var _ref2 = options || {},
            _ref2$theme = _ref2.theme,
            theme = _ref2$theme === void 0 ? 'light' : _ref2$theme,
            src = _ref2.src;

        var url = src || urls[theme];

        if (!url) {
          console.error("Theme not found: ".concat(theme));
          return false;
        }

        return loadTheme({
          theme: theme,
          type: 'antd',
          url: url
        });
      }
      function useAntdTheme(options) {
        var _ref3 = options || {},
            _ref3$theme = _ref3.theme,
            theme = _ref3$theme === void 0 ? 'light' : _ref3$theme,
            src = _ref3.src;

        var _useState = useState(true),
            _useState2 = _slicedToArray(_useState, 2),
            loading = _useState2[0],
            setLoading = _useState2[1];

        useEffect(function () {
          var url = src || urls[theme];

          if (!url) {
            console.error("Theme not found: ".concat(theme));
            return;
          }

          setLoading(true);
          Promise.resolve(loadTheme({
            theme: theme,
            type: 'antd',
            url: url
          }))["finally"](function () {
            return setLoading(false);
          });
        }, [theme, src]);
        return loading;
      }

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

      var LayoutFrameContext = /*#__PURE__*/React.createContext(null);
      var useLayoutFrameSelector = exports('useLayoutFrameSelector', function useLayoutFrameSelector(selector, eq) {
        var layout = useLayoutFrame();
        var ref = useRef();

        var _useState = useState(function () {
          return ref.current = selector(layout.getState());
        }),
            _useState2 = _slicedToArray(_useState, 2),
            state = _useState2[0],
            setState = _useState2[1];

        useEffect(function () {
          return layout.subscribe(function (s) {
            var next = selector(s);

            if (eq && !eq(next, ref.current) || next !== ref.current) {
              setState(ref.current = next);
            }
          });
        }, []);
        return state;
      });
      function useLayoutFrameOptions() {
        return useContext(LayoutFrameContext).options;
      } // class LayoutFrameStore implements LayoutFrameInstance {
      //   name = 'default';
      //   context = LayoutStoreContext;
      //   store: Store<LayoutFrameState>;
      //   useSelector: TypedUseSelectorHook<LayoutFrameState>;
      //   dispatch;
      //   forceRootUpdate: () => void;
      //
      //   constructor({ forceRootUpdate, name = 'default' }) {
      //     this.forceRootUpdate = forceRootUpdate;
      //     this.name = name;
      //
      //     const slice = createLayoutFrameSlice();
      //     this.store = configureStore(slice);
      //     this.dispatch = this.store.dispatch;
      //     this.useSelector = createSelectorHook(this.context);
      //   }
      //
      //   selector = (s) => s;
      //
      //   getLayout(): LayoutFrameInstance {
      //     // const {name, store, context} = this;
      //     // return {
      //     //   name,
      //     //   dispatch: store.dispatch,
      //     //   selector: s => s,
      //     //   useSelector: createSelectorHook(context),
      //     // }
      //     return this;
      //   }
      // }

      var LayoutFrameProvider = exports('LayoutFrameProvider', function LayoutFrameProvider(_ref) {
        var layout = _ref.layout,
            options = _ref.options,
            children = _ref.children;
        return /*#__PURE__*/React.createElement(LayoutFrameContext.Provider, {
          value: {
            layout: layout,
            options: options
          }
        }, children);
      });

      function createLayoutFrame() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var initialState = options.initialState,
            _options$name = options.name,
            name = _options$name === void 0 ? 'default' : _options$name,
            current = options.current;
        var state = new BehaviorSubject(_objectSpread2({}, typeof initialState === 'function' ? initialState() : initialState !== null && initialState !== void 0 ? initialState : {}));
        var layout = {
          get name() {
            return name;
          },

          subscribe: function subscribe(consumer) {
            var s = state.subscribe(consumer);
            return s.unsubscribe.bind(s);
          },
          getState: function getState() {
            return state.value;
          },
          update: function (_update) {
            function update(_x) {
              return _update.apply(this, arguments);
            }

            update.toString = function () {
              return _update.toString();
            };

            return update;
          }(function (update) {
            if (typeof update !== 'function') {
              layout.update(function (s) {
                Object.assign(s, update);
              });
              return;
            }

            var current = state.value;
            var next = rn(current, update);

            if (current !== next) {
              state.next(next);
              console.debug("next layout state", next, current);
            }
          }),
          dispose: function dispose() {//
          }
        };
        return layout;
      }

      function useLayoutFrame(options) {
        var _useContext;

        var _ref2 = options || {},
            layout = _ref2.layout,
            _ref2$name = _ref2.name,
            name = _ref2$name === void 0 ? 'default' : _ref2$name,
            initialState = _ref2.initialState;

        var instanceRef = React.useRef();

        var _useReducer = useReducer(function (a) {
          return a + 1;
        }, 0),
            _useReducer2 = _slicedToArray(_useReducer, 2),
            forceRootUpdate = _useReducer2[1];

        var current = (_useContext = useContext(LayoutFrameContext)) === null || _useContext === void 0 ? void 0 : _useContext.layout;

        if (!instanceRef.current) {
          if (current && current.name === name) {
            instanceRef.current = current;
          } else if (layout) {
            instanceRef.current = layout;
          } else {
            // const layoutStore = new LayoutFrameStore({ forceRootUpdate, name });
            instanceRef.current = createLayoutFrame({
              name: name,
              initialState: initialState,
              current: current
            });
          }
        }

        return instanceRef.current;
      }

      var NamedThemeContext = /*#__PURE__*/React.createContext(new BehaviorSubject(null));
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

      var LayoutFrameMenu = exports('LayoutFrameMenu', function LayoutFrameMenu(_ref) {
        var children = _ref.children,
            props = _objectWithoutProperties(_ref, ["children"]);

        var _useLayoutFrameOption = useLayoutFrameOptions(),
            menus = _useLayoutFrameOption.menus,
            _useLayoutFrameOption2 = _useLayoutFrameOption.link,
            link = _useLayoutFrameOption2 === void 0 ? 'a' : _useLayoutFrameOption2,
            _useLayoutFrameOption3 = _useLayoutFrameOption.menuProps,
            menuProps = _useLayoutFrameOption3 === void 0 ? {} : _useLayoutFrameOption3;

        var _useNamedTheme = useNamedTheme(),
            _useNamedTheme2 = _slicedToArray(_useNamedTheme, 1),
            theme = _useNamedTheme2[0];

        return /*#__PURE__*/React.createElement(Menu, _extends({
          theme: theme === 'dark' ? 'dark' : 'light',
          mode: "inline"
        }, menuProps, props), renderMenus(menus, {
          link: link
        }));
      });

      function renderMenus(menus, opts) {
        return menus.map(function (v) {
          return renderMenu(v, opts);
        });
      }

      function renderMenu(menu, opts) {
        var path = menu.path,
            title = menu.title,
            iconComponent = menu.iconComponent,
            _menu$children = menu.children,
            children = _menu$children === void 0 ? [] : _menu$children;

        if (path || children.length === 0) {
          return renderMenuItem(menu, opts);
        }

        return /*#__PURE__*/React.createElement(Menu.SubMenu, {
          key: path || title,
          title: /*#__PURE__*/React.createElement("div", null, iconComponent, /*#__PURE__*/React.createElement("span", null, title))
        }, children.map(function (v) {
          return renderMenuItem(v, opts);
        }));
      }

      function renderMenuItem(menu, _ref2) {
        var Link = _ref2.link;
        var path = menu.path,
            title = menu.title,
            iconComponent = menu.iconComponent;
        return /*#__PURE__*/React.createElement(Menu.Item, {
          key: path || title
        }, /*#__PURE__*/React.createElement(Link, {
          href: path
        }, /*#__PURE__*/React.createElement("div", null, iconComponent, /*#__PURE__*/React.createElement("span", {
          style: _objectSpread2({}, iconComponent ? {
            marginLeft: 10
          } : {})
        }, title))));
      }

      var LayoutFrameSider = exports('LayoutFrameSider', function LayoutFrameSider(_ref) {
        var style = _ref.style;

        var _useState = useState(false),
            _useState2 = _slicedToArray(_useState, 2),
            broken = _useState2[0],
            setBroken = _useState2[1];

        var _useState3 = useState(true),
            _useState4 = _slicedToArray(_useState3, 2),
            collapse = _useState4[0],
            setCollapse = _useState4[1];

        var _useNamedTheme = useNamedTheme(),
            _useNamedTheme2 = _slicedToArray(_useNamedTheme, 1),
            theme = _useNamedTheme2[0];

        return /*#__PURE__*/React.createElement(Layout.Sider, {
          theme: theme === 'dark' ? 'dark' : 'light',
          breakpoint: "md",
          onBreakpoint: setBroken,
          collapsedWidth: broken ? 0 : 80,
          collapsible: true,
          collapsed: collapse,
          onCollapse: function onCollapse(v) {
            return setCollapse(v);
          },
          style: _objectSpread2({
            height: '100%'
          }, style)
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            height: '100%',
            overflowY: 'auto'
          }
        }, /*#__PURE__*/React.createElement(LayoutFrameMenu, null)));
      });

      var LayoutFrameLayout = exports('LayoutFrameLayout', function LayoutFrameLayout(props) {
        var header = props.header,
            footer = props.footer,
            children = props.children;
        var showHeader = props.showHeader,
            showFooter = props.showFooter;

        if (typeof showHeader !== 'boolean') {
          showHeader = Boolean(header);
        }

        if (typeof showFooter !== 'boolean') {
          showFooter = Boolean(footer);
        }

        var layout = useLayoutFrame();

        var _useNamedTheme = useNamedTheme(),
            _useNamedTheme2 = _slicedToArray(_useNamedTheme, 1),
            theme = _useNamedTheme2[0]; // height: '100%' 确保布局不变


        return /*#__PURE__*/React.createElement(Layout, {
          style: {
            height: '100%',
            minHeight: '100vh'
          },
          "data-layout-frame-name": layout.name
        }, header && showHeader && /*#__PURE__*/React.createElement(Layout.Header, {
          style: theme === 'light' ? {
            backgroundColor: '#fff'
          } : {}
        }, header), /*#__PURE__*/React.createElement(Layout, {
          hasSider: true
        }, /*#__PURE__*/React.createElement(LayoutFrameSider, null), /*#__PURE__*/React.createElement(Layout, null, /*#__PURE__*/React.createElement(Layout.Content, {
          style: {
            maxHeight: '100%',
            overflowY: 'auto'
          }
        }, children), footer && showFooter && /*#__PURE__*/React.createElement(Layout.Footer, null, footer))));
      });

      var LayoutFrame = exports('LayoutFrame', function LayoutFrame(props) {
        var children = props.children,
            showFooter = props.showFooter,
            showHeader = props.showHeader,
            footer = props.footer,
            header = props.header,
            name = props.name,
            menus = props.menus,
            link = props.link,
            menuProps = props.menuProps;
        var layout = useLayoutFrame(props.layout ? {
          layout: props.layout
        } : {});
        return /*#__PURE__*/React.createElement(LayoutFrameProvider, {
          layout: layout,
          options: {
            name: name,
            menus: menus,
            link: link,
            menuProps: menuProps
          }
        }, /*#__PURE__*/React.createElement(LayoutFrameLayout, {
          children: children,
          showFooter: showFooter,
          showHeader: showHeader,
          footer: footer,
          header: header
        }));
      });

      var LayoutFrameContent = exports('LayoutFrameContent', function LayoutFrameContent(_ref) {
        var children = _ref.children,
            style = _ref.style;

        var _useNamedTheme = useNamedTheme(),
            _useNamedTheme2 = _slicedToArray(_useNamedTheme, 1),
            theme = _useNamedTheme2[0];

        return /*#__PURE__*/React.createElement("div", {
          style: _objectSpread2(_objectSpread2({}, theme !== 'dark' ? {
            backgroundColor: 'white'
          } : {}), {}, {
            margin: 8,
            padding: 12,
            minHeight: 'calc(100% - 16px)'
          }, style)
        }, children);
      });

    }
  };
});
//# sourceMappingURL=wener-ui-antds.system.js.map
