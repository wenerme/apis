System.register(['react', 'antd', '@ant-design/icons', '@wener/utils'], function (exports) {
  'use strict';
  var useCallback, useState, React, Checkbox, Divider, Tooltip, Row, Col, Card, Button, Alert, Input, List, message, QuestionCircleOutlined, CopyOutlined, copy;
  return {
    setters: [function (module) {
      useCallback = module.useCallback;
      useState = module.useState;
      React = module.default;
    }, function (module) {
      Checkbox = module.Checkbox;
      Divider = module.Divider;
      Tooltip = module.Tooltip;
      Row = module.Row;
      Col = module.Col;
      Card = module.Card;
      Button = module.Button;
      Alert = module.Alert;
      Input = module.Input;
      List = module.List;
      message = module.message;
    }, function (module) {
      QuestionCircleOutlined = module.QuestionCircleOutlined;
      CopyOutlined = module.CopyOutlined;
    }, function (module) {
      copy = module.copy;
    }],
    execute: function () {

      function n(n) {
        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; e < t; e++) r[e - 1] = arguments[e];

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
          if (!n || "object" != typeof n) return !1;
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
        t(n) || h(n) || !r(n) || (o(n) > 1 && (n.set = n.add = n.clear = n.delete = l), Object.freeze(n), e && i(n, function (n, t) {
          return d(t, !0);
        }, !0));
      }

      function l() {
        n(2);
      }

      function h(n) {
        return null == n || "object" != typeof n || Object.isFrozen(n);
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
          if (h = s, y = d, 2 === (b = o(l = c)) ? l.set(h, y) : 3 === b ? (l.delete(h), l.add(y)) : l[h] = y, !t(d)) return;
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
          $ = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"),
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
        3: function (n) {
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
        15: function (n) {
          return "Cannot apply patch, path doesn't resolve: " + n;
        },
        16: 'Sets cannot have "replace" patches.',
        17: function (n) {
          return "Unsupported patch operation: " + n;
        },
        18: function (n) {
          return "The plugin for '" + n + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n + "()` when initializing your application.";
        },
        19: function (n) {
          return "plugin not loaded: " + n;
        },
        20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available"
      },
          Q = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function (n) {
        return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
      } : Object.getOwnPropertyNames,
          V = {},
          Y = {
        get: function (n, t) {
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
        has: function (n, t) {
          return t in v(n);
        },
        ownKeys: function (n) {
          return Reflect.ownKeys(v(n));
        },
        set: function (n, t, r) {
          if (!n.P) {
            var e = x(n.t, t);
            if (r ? f(e, r) || r === n.p[t] : f(e, r) && t in n.t) return !0;
            I(n), z(n);
          }

          return n.D[t] = !0, n.o[t] = r, !0;
        },
        deleteProperty: function (n, t) {
          return void 0 !== x(n.t, t) || t in n.t ? (n.D[t] = !1, I(n), z(n)) : n.D[t] && delete n.D[t], n.o && delete n.o[t], !0;
        },
        getOwnPropertyDescriptor: function (n, t) {
          var r = v(n),
              e = Reflect.getOwnPropertyDescriptor(r, t);
          return e && (e.writable = !0, e.configurable = 1 !== n.i || "length" !== t), e;
        },
        defineProperty: function () {
          n(11);
        },
        getPrototypeOf: function (n) {
          return Object.getPrototypeOf(n.t);
        },
        setPrototypeOf: function () {
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

              for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) i[a - 1] = arguments[a];

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
            for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) e[o - 1] = arguments[o];

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

      function u$1(t) {
        var i = useState(t),
            u = i[1];
        return [i[0], useCallback(function (n) {
          u(rn(n));
        }, [])];
      }

      const AlgorithmSelectorList = ({
        algorithms,
        onChange
      }) => {
        const isGroupPartial = v => {
          const a = v.options.filter(v => v.enabled).length;
          return a > 0 && a < v.options.length;
        };

        const isGroupChecked = v => {
          const a = v.options.filter(v => v.enabled).length;
          return a === v.options.length;
        };

        return /*#__PURE__*/React.createElement("div", null, algorithms.map(v => /*#__PURE__*/React.createElement("span", {
          key: v.value
        }, !v.options && /*#__PURE__*/React.createElement(Checkbox, {
          checked: v.enabled,
          onChange: e => {
            onChange([{
              value: v.value,
              enabled: e.target.checked
            }]);
          }
        }, v.label), v.options && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Divider, {
          orientation: 'left',
          dashed: true
        }, /*#__PURE__*/React.createElement(Checkbox, {
          checked: isGroupChecked(v),
          indeterminate: isGroupPartial(v),
          onChange: e => {
            onChange(v.options.map(({
              value: option
            }) => ({
              value: v.value,
              option,
              enabled: e.target.checked
            })));
          }
        }, v.label, v.description && /*#__PURE__*/React.createElement(Tooltip, {
          title: v.description
        }, /*#__PURE__*/React.createElement(QuestionCircleOutlined, null)))), /*#__PURE__*/React.createElement(Checkbox.Group, {
          value: v.options.filter(v => v.enabled).map(v => v.value),
          options: v.options,
          onChange: checked => {
            onChange(v.options.map(({
              value: option
            }) => ({
              value: v.value,
              option,
              enabled: checked.includes(option)
            })));
          }
        })))));
      };

      const HashContent = exports('HashContent', ({
        input,
        selector,
        onHashing,
        loading,
        result
      }) => {
        return /*#__PURE__*/React.createElement(Row, {
          gutter: 12
        }, /*#__PURE__*/React.createElement(Col, {
          span: 8
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'grid',
            gap: 12
          }
        }, /*#__PURE__*/React.createElement(Card, {
          title: '内容',
          extra: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Button, {
            loading: loading,
            onClick: onHashing,
            type: 'primary'
          }, "\u8BA1\u7B97"))
        }, input), /*#__PURE__*/React.createElement(Card, {
          title: "\u8BBE\u7F6E"
        }, /*#__PURE__*/React.createElement(Divider, null, "\u7B97\u6CD5"), selector, /*#__PURE__*/React.createElement(Divider, null, "\u8BF4\u660E"), /*#__PURE__*/React.createElement(Alert, {
          type: 'info',
          message: /*#__PURE__*/React.createElement("span", null, "crypto \u4F7F\u7528 ", /*#__PURE__*/React.createElement("a", {
            href: "https://github.com/brix/crypto-js"
          }, "brix/crypto-js"))
        })))), /*#__PURE__*/React.createElement(Col, {
          span: 16
        }, /*#__PURE__*/React.createElement(Card, {
          title: '结果'
        }, result)));
      });
      const hashAlgorithms = [{
        value: 'md5',
        label: 'MD5',
        enabled: true
      }, {
        value: 'ripemd160',
        label: 'RIPEMD-160'
      }, {
        value: 'sha1',
        label: 'SHA1'
      }, {
        value: 'sha2',
        label: 'SHA2',
        options: [{
          value: 'sha256',
          label: 'SHA256'
        }, {
          value: 'sha512',
          label: 'SHA512'
        }, {
          value: 'sha224',
          label: 'SHA224'
        }, {
          value: 'sha384',
          label: 'SHA384'
        }]
      }, {
        value: 'sha3',
        label: 'SHA3',
        description: 'Keccak[c=2d] - winner of the SHA-3 competition by NIST',
        options: [{
          value: 'sha256',
          label: 'SHA256'
        }, {
          value: 'sha512',
          label: 'SHA512'
        }, {
          value: 'sha224',
          label: 'SHA224'
        }, {
          value: 'sha384',
          label: 'SHA384'
        }]
      }];
      const HashPlayground = exports('HashPlayground', () => {
        const [state, update] = u$1({
          algorithms: hashAlgorithms,
          running: false,
          content: 'Hello World !',
          results: []
        });

        const doAlgorithmChange = opts => {
          update(s => {
            if (s.running) {
              return;
            }

            for (const {
              value,
              option,
              enabled
            } of opts) {
              let a = s.algorithms.find(v => v.value === value);

              if (option) {
                a = a.options.find(v => v.value === option);
              }

              a.enabled = enabled;
            }
          });
        };

        const doHashing = async () => {
          update(s => {
            s.running = true;
            const calcs = [];

            for (const a of s.algorithms) {
              if (a.options) {
                for (const v of a.options) {
                  if (v.enabled) {
                    calcs.push({
                      id: a.value + v.value,
                      label: a.label + '/' + v.label,
                      loading: true
                    });
                  }
                }
              } else if (a.enabled) {
                calcs.push({
                  id: a.value,
                  label: a.label,
                  loading: true
                });
              }
            }

            s.results = calcs;
          });
          const {
            default: CryptoJS
          } = await System.import('https://cdn.jsdelivr.net/npm/crypto-js@4.0.0/crypto-js.min.js');
          console.log(CryptoJS);
          const o = hash({
            CryptoJS
          });
          update(s => {
            const opts = {
              content: s.content
            };

            for (const c of s.results) {
              c.hex = String(o[c.id](opts));
              c.loading = false;
            }

            s.running = false;
          });
        };

        return /*#__PURE__*/React.createElement(HashContent, {
          loading: state.running,
          onHashing: doHashing,
          input: /*#__PURE__*/React.createElement(Input.TextArea, {
            disabled: state.running,
            value: state.content,
            onChange: v => {
              const c = v.target.value;
              update(s => {
                s.content = c;
              });
            }
          }),
          result: /*#__PURE__*/React.createElement(HashResultList, {
            value: state.results
          }),
          selector: /*#__PURE__*/React.createElement(AlgorithmSelectorList, {
            algorithms: state.algorithms,
            onChange: doAlgorithmChange
          })
        });
      });

      const HashResultList = ({
        value
      }) => {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(List, {
          itemLayout: "horizontal",
          dataSource: value,
          renderItem: item => /*#__PURE__*/React.createElement(List.Item, {
            key: item.id
          }, /*#__PURE__*/React.createElement(List.Item.Meta, {
            title: /*#__PURE__*/React.createElement("span", {
              style: {
                fontWeight: 'bold'
              }
            }, item.label),
            description: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input, {
              value: item.hex,
              onClick: e => {
                var _e$target;

                return (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target['select']();
              },
              onFocus: e => {
                var _e$target2;

                return (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2['select']();
              },
              prefix: 'HEX',
              suffix: /*#__PURE__*/React.createElement(CopyOutlined, {
                onClick: () => {
                  copy(item.hex);
                  message.success('复制成功');
                }
              })
            }))
          }))
        }));
      };

      function hash(o) {
        const {
          CryptoJS
        } = o;
        return {
          ripemd160({
            content
          }) {
            return CryptoJS.RIPEMD160(content);
          },

          md5({
            content
          }) {
            return CryptoJS.MD5(content);
          },

          sha1({
            content
          }) {
            return CryptoJS.SHA1(content);
          },

          sha2sha256({
            content
          }) {
            return CryptoJS.SHA256(content);
          },

          sha2sha512({
            content
          }) {
            return CryptoJS.SHA512(content);
          },

          sha2sha224({
            content
          }) {
            return CryptoJS.SHA224(content);
          },

          sha2sha384({
            content
          }) {
            return CryptoJS.SHA384(content);
          },

          sha3sha256({
            content
          }) {
            return CryptoJS.SHA3(content, {
              outputLength: 256
            });
          },

          sha3sha512({
            content
          }) {
            return CryptoJS.SHA3(content, {
              outputLength: 512
            });
          },

          sha3sha224({
            content
          }) {
            return CryptoJS.SHA3(content, {
              outputLength: 224
            });
          },

          sha3sha384({
            content
          }) {
            return CryptoJS.SHA3(content, {
              outputLength: 384
            });
          }

        };
      }

      var title = "加密哈希工具";
      var description = "提供常用的加密算法、哈希算法";
      var metadata = exports('metadata', {
      	title: title,
      	description: description
      });

    }
  };
});
//# sourceMappingURL=wener-apis-crypto.system.js.map
