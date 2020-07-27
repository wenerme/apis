System.register(['react', '@wener/utils', 'antd'], function (exports) {
  'use strict';
  var useRef, useState, useEffect, React, getGlobalThis, isDev, Button;
  return {
    setters: [function (module) {
      useRef = module.useRef;
      useState = module.useState;
      useEffect = module.useEffect;
      React = module.default;
    }, function (module) {
      getGlobalThis = module.getGlobalThis;
      isDev = module.isDev;
    }, function (module) {
      Button = module.Button;
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

      /**
       * https://github.com/ipfs/public-gateway-checker
       */
      const CheckTextHash = 'bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m';
      const CheckTextContent = 'Hello from IPFS Gateway Checker';
      const CheckScriptHash = 'bafybeietzsezxbgeeyrmwicylb5tpvf7yutrm3bxrfaoulaituhbi7q6yi';
      const GlobalResolver = {};
      function fetchGatewayChecker(gateway, {
        hash = null,
        content = null,
        signal = null
      } = {}) {
        if (!hash) {
          hash = CheckTextHash;
          content = CheckTextContent;
        }

        const gatewayAndHash = gateway.replace(':hash', hash);
        const now = Date.now();
        const testUrl = `${gatewayAndHash}?now=${now}#x-ipfs-companion-no-redirect`;
        return fetch(testUrl, {
          signal
        }).then(res => {
          if (res.status >= 400) {
            throw new Error(`gateway ${gateway} request failed ${res.status}`);
          }

          return res;
        }).then(res => res.text()).then(text => {
          if (content) {
            const matched = content === text.trim();

            if (!matched) {
              throw new Error(`gateway ${gateway} content not match: ${text.trim()}`);
            }
          }

          return gateway;
        });
      }

      function checkCors({
        getState
      }) {
        const {
          gateway,
          signal
        } = getState();
        return fetchGatewayChecker(gateway, {
          signal
        });
      }

      async function checkOrigin({
        getState
      }) {
        const cidInSubdomain = getState().gateway.startsWith('https://:hash.ipfs.');

        if (cidInSubdomain) {
          return true;
        } else {
          throw new Error('cid not in sub-domain - expect start with "https://:hash.ipfs."');
        }
      }

      function OnScriptloaded(src) {
        try {
          const url = new URL(src);
          const index = url.searchParams.get('i');
          const resolver = GlobalResolver[index];

          if (resolver) {
            resolver();
          } else {
            console.error(`no resolver found for ${index}`);
          }
        } catch (e) {
          // this is a URL exception, we can do nothing, user is probably using Internet Explorer
          console.error(`unexpected error: ${src}`, e);
        }
      }

      async function checkStatus({
        getState
      }) {
        const {
          id,
          signal,
          gateway
        } = getState();
        const gatewayAndScriptHash = gateway.replace(':hash', CheckScriptHash); // we set a unused number as a url parameter, to try to prevent content caching
        // is it right ? ... do you know a better way ? ... does it always work ?

        const now = Date.now(); // 3 important things here
        //   1) we add #x-ipfs-companion-no-redirect to the final url (self explanatory)
        //   2) we add ?filename=anyname.js as a parameter to let the gateway guess Content-Type header
        //      to be sent in headers in order to prevent CORB
        //   3) parameter 'i' is the one used to identify the gateway once the script executes

        const src = `${gatewayAndScriptHash}?i=${id}&now=${now}&filename=anyname.js#x-ipfs-companion-no-redirect`; // 不支持 abort - 除非 先 fetch

        if (signal) {
          await fetch(src, {
            signal
          }).then(v => v.text());
        }

        return new Promise((resolve, reject) => {
          try {
            const script = document.createElement('script');
            script.src = src;
            document.body.append(script);

            script.onerror = e => {
              var _e$error;

              // we check this because the gateway could be already checked by CORS before onerror executes
              // and, even though it is failing here, we know it is UP
              reject((_e$error = e === null || e === void 0 ? void 0 : e['error']) !== null && _e$error !== void 0 ? _e$error : e);
            };

            script.onload = e => {
              setTimeout(() => reject('load script is invalid'), 500);
            };

            GlobalResolver[id] = v => {
              delete GlobalResolver[id];
              resolve(v);
            };
          } catch (e) {
            reject(e);
          }
        });
      }

      async function check(opts) {
        const {
          onStateChange,
          getState
        } = opts;
        const {
          checker,
          name,
          ...passBy
        } = opts;
        onStateChange(s => {
          const check = s[name];
          check.startTime = Date.now();
          check.status = 'running';
        });

        try {
          const result = await checker(passBy);
          onStateChange(s => {
            const check = s[name];

            if (check.status === 'running') {
              check.status = 'success';
            }

            check.result = result;
            check.endTime = Date.now();
          });
        } catch (e) {
          // const {gateway} = getState();
          // console.error(`check failed ${gateway} - ${name}`, e);
          onStateChange(s => {
            const check = s[name];

            if (check.status === 'running') {
              check.status = 'error';
            }

            check.error = e;
            check.endTime = Date.now();
          });
        }
      }

      let _uid = 0;
      function compareCheckState(a, b) {
        var _a$status, _b$status, _a$status3, _b$status2;

        if (((_a$status = a.status) === null || _a$status === void 0 ? void 0 : _a$status.status) === ((_b$status = b.status) === null || _b$status === void 0 ? void 0 : _b$status.status)) {
          var _a$status2;

          if (((_a$status2 = a.status) === null || _a$status2 === void 0 ? void 0 : _a$status2.status) === 'success') {
            return a.status.endTime - a.status.startTime - (b.status.endTime - b.status.startTime);
          }

          return 0;
        }

        if (((_a$status3 = a.status) === null || _a$status3 === void 0 ? void 0 : _a$status3.status) === 'success') {
          return -1;
        }

        if (((_b$status2 = b.status) === null || _b$status2 === void 0 ? void 0 : _b$status2.status) === 'success') {
          return 1;
        }

        return 0;
      }
      async function checkGateways(gateways, onStateChange, {
        signal = null
      } = {}) {
        let state = new Array(gateways.length);
        await Promise.all(gateways.map((v, i) => checkGateway(v, s => {
          state = rn(state, base => {
            base[i] = s;
          });
          onStateChange(state);
        })));
        return state;
      }
      async function checkGateway(gateway, onStateChange, {
        signal = null
      } = {}) {
        let state = {
          id: _uid++,
          gateway,
          hostname: gatewayHostname(new URL(gateway.replace(':hash', CheckTextHash))),
          startTime: Date.now(),
          status: {
            status: 'new'
          },
          cors: {
            status: 'new'
          },
          origin: {
            status: 'new'
          },
          signal
        };
        onStateChange(state);
        const opts = {
          getState() {
            return state;
          },

          onStateChange(update) {
            const neo = rn(state, update);

            if (neo === state) {
              return;
            }

            state = neo;
            onStateChange(state);
          }

        };
        await Promise.all([check({ ...opts,
          name: 'status',
          checker: checkStatus
        }), check({ ...opts,
          name: 'cors',
          checker: checkCors
        }), check({ ...opts,
          name: 'origin',
          checker: checkOrigin
        })]);
        opts.onStateChange(s => {
          s.endTime = Date.now();
        });
        return state;
      }

      function gatewayHostname(url) {
        if (url && url.hostname) url = url.hostname.toString();
        return url.replace(`${CheckTextHash}.ipfs.`, '') // skip .ipfs. in subdomain gateways
        .replace(`${CheckTextHash}.`, ''); // path-based
      }

      function setPreferIpfsGateway(gateway) {
        var _getGlobalThis;

        if ((_getGlobalThis = getGlobalThis()) === null || _getGlobalThis === void 0 ? void 0 : _getGlobalThis.localStorage) {
          getGlobalThis().localStorage['IPFS_PREFER_GW'] = gateway;
        } else {
          getGlobalThis()['IPFS_PREFER_GW'] = gateway;
        }
      }
      function getPreferIpfsGateway() {
        var _ref, _getGlobalThis$localS, _getGlobalThis2, _getGlobalThis2$local, _getGlobalThis3;

        // localStorage['IPFS_PREFER_GW'].replace(':hash','111')
        let gw = (_ref = (_getGlobalThis$localS = (_getGlobalThis2 = getGlobalThis()) === null || _getGlobalThis2 === void 0 ? void 0 : (_getGlobalThis2$local = _getGlobalThis2.localStorage) === null || _getGlobalThis2$local === void 0 ? void 0 : _getGlobalThis2$local['IPFS_PREFER_GW']) !== null && _getGlobalThis$localS !== void 0 ? _getGlobalThis$localS : (_getGlobalThis3 = getGlobalThis()) === null || _getGlobalThis3 === void 0 ? void 0 : _getGlobalThis3['IPFS_PREFER_GW']) !== null && _ref !== void 0 ? _ref : process.env.IPFS_PREFER_GW;
        gw = gw || (isDev() ? 'http://127.0.0.1:8080/ipfs/:hash' : 'https://ipfs.io/ipfs/:hash');
        return gw;
      }

      const PublicGateways = ['https://ipfs.io/ipfs/:hash', 'https://:hash.ipfs.dweb.link', 'https://gateway.ipfs.io/ipfs/:hash', 'https://ipfs.infura.io/ipfs/:hash', 'https://rx14.co.uk/ipfs/:hash', 'https://ninetailed.ninja/ipfs/:hash', 'https://ipfs.globalupload.io/:hash', 'https://ipfs.jes.xxx/ipfs/:hash', 'https://10.via0.com/ipfs/:hash', 'https://ipfs.eternum.io/ipfs/:hash', 'https://hardbin.com/ipfs/:hash', 'https://ipfs.wa.hle.rs/ipfs/:hash', 'https://gateway.blocksec.com/ipfs/:hash', 'https://ipfs.renehsz.com/ipfs/:hash', 'https://cloudflare-ipfs.com/ipfs/:hash', 'https://:hash.ipfs.cf-ipfs.com', 'https://ipns.co/:hash', 'https://ipfs.mrh.io/ipfs/:hash', 'https://gateway.originprotocol.com/ipfs/:hash', 'https://gateway.pinata.cloud/ipfs/:hash', 'https://ipfs.doolta.com/ipfs/:hash', 'https://ipfs.sloppyta.co/ipfs/:hash', 'https://ipfs.busy.org/ipfs/:hash', 'https://ipfs.greyh.at/ipfs/:hash', 'https://gateway.serph.network/ipfs/:hash', 'https://jorropo.ovh/ipfs/:hash', 'https://gateway.temporal.cloud/ipfs/:hash', 'https://ipfs.fooock.com/ipfs/:hash', 'https://cdn.cwinfo.net/ipfs/:hash', 'https://ipfs.privacytools.io/ipfs/:hash', 'https://ipfs.jeroendeneef.com/ipfs/:hash', 'https://permaweb.io/ipfs/:hash', 'https://ipfs.stibarc.com/ipfs/:hash', 'https://ipfs.best-practice.se/ipfs/:hash', 'https://:hash.ipfs.2read.net', 'https://ipfs.2read.net/ipfs/:hash', 'https://storjipfs-gateway.com/ipfs/:hash', 'http://127.0.0.1:8080/ipfs/:hash'];

      const GatewayChecker = exports('GatewayChecker', ({
        gateways = PublicGateways
      }) => {
        const abortRef = useRef();
        const [checks, setChecks] = useState([]);
        const [prefer, setPrefer] = useState(getPreferIpfsGateway);
        useEffect(() => {
          window['OnScriptloaded'] = OnScriptloaded;
        }, []);
        useEffect(() => {
          var _abortRef$current, _abort, _abort$signal, _abort2;

          (_abortRef$current = abortRef.current) === null || _abortRef$current === void 0 ? void 0 : _abortRef$current.abort();
          let abort = null;

          try {
            abort = new AbortController();
          } catch (e) {// ignore
          }

          abortRef.current = abort;
          (_abort = abort) === null || _abort === void 0 ? void 0 : (_abort$signal = _abort.signal) === null || _abort$signal === void 0 ? void 0 : _abort$signal.addEventListener('abort', () => {
            console.log(`Abort checking`);
          });
          checkGateways(gateways, setChecks, {
            signal: (_abort2 = abort) === null || _abort2 === void 0 ? void 0 : _abort2.signal
          }).then(v => {
            var _abort3, _abort3$signal;

            if (!((_abort3 = abort) === null || _abort3 === void 0 ? void 0 : (_abort3$signal = _abort3.signal) === null || _abort3$signal === void 0 ? void 0 : _abort3$signal.aborted)) {
              setPrefer(v[0].gateway);
            }
          });
          return () => {
            var _abort4;

            (_abort4 = abort) === null || _abort4 === void 0 ? void 0 : _abort4.abort();
          };
        }, [gateways]);
        useEffect(() => {
          if (prefer === getPreferIpfsGateway()) {
            return;
          }

          setPreferIpfsGateway(prefer);
        }, [prefer]);
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "check-status",
          style: {
            backgroundColor: '#0b3a53'
          }
        }, checks.filter(v => v.endTime).length, "/", checks.length, " \u6D4B\u8BD5"), /*#__PURE__*/React.createElement("div", {
          className: "check-status",
          style: {
            backgroundColor: '#0cb892'
          }
        }, checks.filter(v => v.status.status === 'success').length, " \u5728\u7EBF"), /*#__PURE__*/React.createElement("div", null, stateEmoji(checks.find(v => !v.endTime) ? 'running' : 'success')), /*#__PURE__*/React.createElement("div", null, "\u5F53\u524D\u504F\u597D\u7F51\u5173 ", prefer)), /*#__PURE__*/React.createElement("table", {
          className: "check-table"
        }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Online"), /*#__PURE__*/React.createElement("th", null, "CORS"), /*#__PURE__*/React.createElement("th", null, "Origin"), /*#__PURE__*/React.createElement("th", null, "Hostname / \u4E3B\u673A\u540D"), /*#__PURE__*/React.createElement("th", null, "\u0394T"))), /*#__PURE__*/React.createElement("tbody", null, Array.from(checks).sort(compareCheckState).map(({
          gateway,
          hostname,
          status,
          cors,
          origin
        }) => /*#__PURE__*/React.createElement("tr", {
          key: gateway
        }, /*#__PURE__*/React.createElement("td", {
          title: latency(cors)
        }, stateEmoji(status.status)), /*#__PURE__*/React.createElement("td", {
          title: latency(cors)
        }, stateEmoji(cors.status)), /*#__PURE__*/React.createElement("td", null, stateEmoji(origin.status)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            justifyContent: 'space-between'
          }
        }, /*#__PURE__*/React.createElement("div", null, hostname), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, gateway), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Button, {
          type: "link",
          size: "small",
          disabled: prefer === gateway,
          onClick: () => setPrefer(gateway)
        }, "\u4F7F\u7528"))))), /*#__PURE__*/React.createElement("td", null, latency(status)))))), /*#__PURE__*/React.createElement("style", {
          jsx: true
        }, `
        .check-status {
          width: 8em;
          text-align: center;
          margin: 0 0.8em;
          user-select: none;
          color: white;

          font-family: monospace;
          border-radius: 1em;
          font-size: 1.2em;
        }

        .check-table {
          font-family: monospace;
          text-align: center;
          width: 100%;
        }
        .check-table tr:hover {
          background-color: #edf0f4;
        }

        .check-table th:nth-child(1),
        .check-table th:nth-child(2),
        .check-table th:nth-child(3) {
          max-width: 30px;
        }
        .check-table td:nth-child(4),
        .check-table th:nth-child(4) {
          text-align: left;
        }
        .check-table td:nth-child(5),
        .check-table th:nth-child(5) {
          text-align: right;
        }
        .check-table th {
          min-width: 50px;
        }
      `));
      });

      function latency({
        startTime,
        endTime
      }) {
        if (endTime) {
          return ((endTime - startTime) / 1000).toFixed(2) + ' s';
        }

        return '';
      }

      function stateEmoji(s) {
        switch (s) {
          case 'new':
            return '🆕';

          case 'running':
            return '🕑';

          case 'error':
            return '❌';

          case 'success':
            return '✅';

          default:
            return s;
        }
      }

      var title = "IPFS 工具";
      var description = "网管检测";
      var metadata = exports('metadata', {
      	title: title,
      	description: description
      });

    }
  };
});
//# sourceMappingURL=wener-apis-ipfs.system.js.map
