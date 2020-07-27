System.register(['react', 'antd', '@wener/apis-boot', '@ant-design/icons'], function (exports) {
  'use strict';
  var useCallback, useState, React, useEffect, useRef, List, Skeleton, Tag, Button, Dropdown, Menu, Form, Modal, Input, notification, message, getBootService, loadImportOverrides, persistImportOverrides, SyncOutlined, UploadOutlined, EditOutlined, MinusSquareOutlined, DownOutlined, PlusSquareOutlined, ClearOutlined, ReloadOutlined;
  return {
    setters: [function (module) {
      useCallback = module.useCallback;
      useState = module.useState;
      React = module.default;
      useEffect = module.useEffect;
      useRef = module.useRef;
    }, function (module) {
      List = module.List;
      Skeleton = module.Skeleton;
      Tag = module.Tag;
      Button = module.Button;
      Dropdown = module.Dropdown;
      Menu = module.Menu;
      Form = module.Form;
      Modal = module.Modal;
      Input = module.Input;
      notification = module.notification;
      message = module.message;
    }, function (module) {
      getBootService = module.getBootService;
      loadImportOverrides = module.loadImportOverrides;
      persistImportOverrides = module.persistImportOverrides;
    }, function (module) {
      SyncOutlined = module.SyncOutlined;
      UploadOutlined = module.UploadOutlined;
      EditOutlined = module.EditOutlined;
      MinusSquareOutlined = module.MinusSquareOutlined;
      DownOutlined = module.DownOutlined;
      PlusSquareOutlined = module.PlusSquareOutlined;
      ClearOutlined = module.ClearOutlined;
      ReloadOutlined = module.ReloadOutlined;
    }],
    execute: function () {

      var ModuleMetas = [
      	{
      		id: "boot",
      		name: "@wener/apis-boot",
      		metadata: {
      			name: "@wneer/apis-boot",
      			title: "启动模块",
      			description: "控制映射模块，控制模块版本。"
      		}
      	},
      	{
      		id: "client",
      		name: "@wener/apis-client",
      		metadata: {
      			title: "RPC Client",
      			description: "远程调用客户端"
      		}
      	},
      	{
      		id: "crypto",
      		name: "@wener/apis-crypto",
      		metadata: {
      			title: "加密哈希工具",
      			description: "提供常用的加密算法、哈希算法"
      		}
      	},
      	{
      		id: "dash",
      		name: "@wener/apis-dash",
      		metadata: {
      			title: "公共布局组件",
      			description: "Dashboard、Layout 等组件"
      		}
      	},
      	{
      		id: "geo",
      		name: "@wener/apis-geo",
      		metadata: {
      			title: "定位工具",
      			description: "基于HTML技术获取定位信息"
      		}
      	},
      	{
      		id: "i18n",
      		name: "@wener/apis-i18n",
      		metadata: {
      			title: "本地化",
      			description: "提供英文翻译"
      		}
      	},
      	{
      		id: "ipfs",
      		name: "@wener/apis-ipfs",
      		metadata: {
      			title: "IPFS 工具",
      			description: "网管检测"
      		}
      	},
      	{
      		id: "lang-xml",
      		name: "@wener/apis-lang-xml",
      		metadata: {
      			title: "XML工具",
      			description: "XML格式化、JSON 转换、生成"
      		}
      	},
      	{
      		id: "langs",
      		name: "@wener/apis-langs"
      	},
      	{
      		id: "lite",
      		name: "@wener/apis-lite",
      		metadata: {
      			title: "Wener's APIs Lite version",
      			description: "APIs Lite - basic setup and configuration to bootstrap"
      		}
      	},
      	{
      		id: "mgmt",
      		name: "@wener/apis-mgmt",
      		metadata: {
      			title: "应用管理",
      			description: "模块管理，本地模块开发，模块更新发布。"
      		}
      	},
      	{
      		id: "password",
      		name: "@wener/apis-password",
      		metadata: {
      			title: "密码校验",
      			description: "Zxcvvn 密码强度检测"
      		}
      	},
      	{
      		id: "phone",
      		name: "@wener/apis-phone",
      		metadata: {
      			title: "电话号码工具",
      			description: "号码归属地查询"
      		}
      	},
      	{
      		id: "polyfill",
      		name: "@wener/apis-polyfill",
      		metadata: {
      			title: "浏览器兼容",
      			description: "添加 babel 需要的 runtime - corejs、regenerator"
      		}
      	},
      	{
      		id: "qrcode",
      		name: "@wener/apis-qrcode",
      		metadata: {
      			title: "二维码",
      			description: "二维码生成、二维码照片识别",
      			externals: {
      				pngjs: "https://cdn.jsdelivr.net/npm/pngjs@5.0.0/browser.min.js"
      			}
      		}
      	},
      	{
      		id: "root",
      		name: "@wener/apis-root",
      		metadata: {
      			title: "APIs 应用",
      			description: "菜单、路由、页面布局控制；动态加载外部组件；Single SPA root config；"
      		}
      	},
      	{
      		id: "test",
      		name: "@wener/apis-test",
      		metadata: {
      			title: "测试模块",
      			description: "测试 Ping 接口；Single SPA 测试应用"
      		}
      	},
      	{
      		id: "uri",
      		name: "@wener/apis-uri",
      		metadata: {
      			title: "URL工具",
      			description: "解析、格式化 URL"
      		}
      	},
      	{
      		id: "webrtc",
      		name: "@wener/apis-webrtc",
      		metadata: {
      			title: "WebRTC 工具",
      			description: "WebRTC浏览器兼容检测"
      		}
      	}
      ];

      function getVersionFromResolvedUrl(url) {
        const jsdelivr = 'https://cdn.jsdelivr.net/npm/';

        if (url.startsWith(jsdelivr)) {
          const m = url.substr(jsdelivr.length).match(/(^@[^/]+[/])?[^/@]+@([^/]+)/);

          if (m) {
            return m[2];
          }
        }

        return 'latest';
      }
      function getSourceFromResolvedUrl(url) {
        const jsdelivr = 'https://cdn.jsdelivr.net/npm/';

        if (url.startsWith(jsdelivr)) {
          return 'jsdelivr';
        }

        const unpkg = 'https://unpkg.com/';

        if (url.startsWith(unpkg)) {
          return 'unpkg';
        }

        if (url.startsWith(location.origin)) {
          return 'site';
        } // ignore 172


        if (/^https?:\/\/(localhost|127\.0\.0|192\.168|10\.)/.test(url)) {
          return 'localhost';
        }

        return 'unknown';
      }
      class ModuleManagementService {
        constructor() {
          this._boot = getBootService();
          this._modules = this._boot.modules;
          this.System = this._boot.System;
        }

        async addOverrideModule({
          name,
          resolved
        }) {
          this._modules.overrides[name] = resolved;
          await this.persistImportOverrides();
        }

        async removeOverrideModule({
          name
        }) {
          delete this._modules.overrides[name];
          await this.persistImportOverrides();
        }

        async resetOverrideModules() {
          this._modules.overrides = {};
          await this.persistImportOverrides();
        }

        async loadImportOverrides() {
          Object.assign(this._modules.overrides, await loadImportOverrides());
        }

        async persistImportOverrides() {
          return await persistImportOverrides(this._modules.overrides);
        }

        getModules() {
          const {
            System,
            _modules
          } = this;
          let all = [];
          all = all.concat(Object.entries(_modules.imports).map(([name, resolved]) => ({
            name,
            resolved,
            predefined: true
          })));
          {
            // 使用预先有的元数据覆盖
            const byName = keyBy(all, 'name');

            for (const v of ModuleMetas) {
              const m = byName[v.name] = byName[v.name] || {
                name: v.name,
                resolved: _modules.tryResolve(v.name)
              };
              Object.assign(m, v);
            } // 添加 override 信息


            for (const [name, resolved] of Object.entries(_modules.overrides)) {
              byName[name] = Object.assign(byName[name] || {}, {
                name,
                resolved,
                override: true
              });
            }

            all = Object.values(byName);
          }
          const byResolved = keyBy(all, 'resolved');

          for (const [url, mod] of System.entries()) {
            // maybe deleted
            if (!mod) {
              continue;
            }

            const info = byResolved[url] = byResolved[url] || {
              name: _modules.resolveName(url) || url,
              resolved: url
            };
            info.loaded = true; // load metadata

            if (_modules.isInternal(info.name)) {
              info.metadata = mod.metadata || {};
            }
          }

          all = Object.values(byResolved);
          all.forEach(v => {
            v.internal = _modules.isInternal(v.name);
            v.hasMetadata = Boolean(Object.keys(v.metadata || {}).length);
            v.source = getSourceFromResolvedUrl(v.resolved);
            v.version = getVersionFromResolvedUrl(v.resolved);
            v.dependencies = Array.from(_modules.dependencies[v.name] || []);
          });
          const dependents = {};
          all.flatMap(({
            name,
            dependencies
          }) => dependencies.map(v => [v, name])).reduce((v, [a, b]) => {
            (v[a] = v[a] || []).push(b);
            return v;
          }, dependents);
          all.forEach(v => {
            v.dependents = dependents[v.name] || [];
          });
          return all;
        }

      }

      function keyBy(o, key) {
        return Object.fromEntries(o.map(v => [v[key], v]));
      }

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

      var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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

      var numeral = createCommonjsModule(function (module) {
        /*! @preserve
         * numeral.js
         * version : 2.0.6
         * author : Adam Draper
         * license : MIT
         * http://adamwdraper.github.com/Numeral-js/
         */
        (function (global, factory) {
          if ( module.exports) {
            module.exports = factory();
          } else {
            global.numeral = factory();
          }
        })(commonjsGlobal, function () {
          /************************************
              Variables
          ************************************/
          var numeral,
              _,
              VERSION = '2.0.6',
              formats = {},
              locales = {},
              defaults = {
            currentLocale: 'en',
            zeroFormat: null,
            nullFormat: null,
            defaultFormat: '0,0',
            scalePercentBy100: true
          },
              options = {
            currentLocale: defaults.currentLocale,
            zeroFormat: defaults.zeroFormat,
            nullFormat: defaults.nullFormat,
            defaultFormat: defaults.defaultFormat,
            scalePercentBy100: defaults.scalePercentBy100
          };
          /************************************
              Constructors
          ************************************/
          // Numeral prototype object


          function Numeral(input, number) {
            this._input = input;
            this._value = number;
          }

          numeral = function (input) {
            var value, kind, unformatFunction, regexp;

            if (numeral.isNumeral(input)) {
              value = input.value();
            } else if (input === 0 || typeof input === 'undefined') {
              value = 0;
            } else if (input === null || _.isNaN(input)) {
              value = null;
            } else if (typeof input === 'string') {
              if (options.zeroFormat && input === options.zeroFormat) {
                value = 0;
              } else if (options.nullFormat && input === options.nullFormat || !input.replace(/[^0-9]+/g, '').length) {
                value = null;
              } else {
                for (kind in formats) {
                  regexp = typeof formats[kind].regexps.unformat === 'function' ? formats[kind].regexps.unformat() : formats[kind].regexps.unformat;

                  if (regexp && input.match(regexp)) {
                    unformatFunction = formats[kind].unformat;
                    break;
                  }
                }

                unformatFunction = unformatFunction || numeral._.stringToNumber;
                value = unformatFunction(input);
              }
            } else {
              value = Number(input) || null;
            }

            return new Numeral(input, value);
          }; // version number


          numeral.version = VERSION; // compare numeral object

          numeral.isNumeral = function (obj) {
            return obj instanceof Numeral;
          }; // helper functions


          numeral._ = _ = {
            // formats numbers separators, decimals places, signs, abbreviations
            numberToFormat: function (value, format, roundingFunction) {
              var locale = locales[numeral.options.currentLocale],
                  negP = false,
                  optDec = false,
                  leadingCount = 0,
                  abbr = '',
                  trillion = 1000000000000,
                  billion = 1000000000,
                  million = 1000000,
                  thousand = 1000,
                  decimal = '',
                  neg = false,
                  abbrForce,
                  // force abbreviation
              abs,
                  int,
                  precision,
                  signed,
                  thousands,
                  output; // make sure we never format a null value

              value = value || 0;
              abs = Math.abs(value); // see if we should use parentheses for negative number or if we should prefix with a sign
              // if both are present we default to parentheses

              if (numeral._.includes(format, '(')) {
                negP = true;
                format = format.replace(/[\(|\)]/g, '');
              } else if (numeral._.includes(format, '+') || numeral._.includes(format, '-')) {
                signed = numeral._.includes(format, '+') ? format.indexOf('+') : value < 0 ? format.indexOf('-') : -1;
                format = format.replace(/[\+|\-]/g, '');
              } // see if abbreviation is wanted


              if (numeral._.includes(format, 'a')) {
                abbrForce = format.match(/a(k|m|b|t)?/);
                abbrForce = abbrForce ? abbrForce[1] : false; // check for space before abbreviation

                if (numeral._.includes(format, ' a')) {
                  abbr = ' ';
                }

                format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '');

                if (abs >= trillion && !abbrForce || abbrForce === 't') {
                  // trillion
                  abbr += locale.abbreviations.trillion;
                  value = value / trillion;
                } else if (abs < trillion && abs >= billion && !abbrForce || abbrForce === 'b') {
                  // billion
                  abbr += locale.abbreviations.billion;
                  value = value / billion;
                } else if (abs < billion && abs >= million && !abbrForce || abbrForce === 'm') {
                  // million
                  abbr += locale.abbreviations.million;
                  value = value / million;
                } else if (abs < million && abs >= thousand && !abbrForce || abbrForce === 'k') {
                  // thousand
                  abbr += locale.abbreviations.thousand;
                  value = value / thousand;
                }
              } // check for optional decimals


              if (numeral._.includes(format, '[.]')) {
                optDec = true;
                format = format.replace('[.]', '.');
              } // break number and format


              int = value.toString().split('.')[0];
              precision = format.split('.')[1];
              thousands = format.indexOf(',');
              leadingCount = (format.split('.')[0].split(',')[0].match(/0/g) || []).length;

              if (precision) {
                if (numeral._.includes(precision, '[')) {
                  precision = precision.replace(']', '');
                  precision = precision.split('[');
                  decimal = numeral._.toFixed(value, precision[0].length + precision[1].length, roundingFunction, precision[1].length);
                } else {
                  decimal = numeral._.toFixed(value, precision.length, roundingFunction);
                }

                int = decimal.split('.')[0];

                if (numeral._.includes(decimal, '.')) {
                  decimal = locale.delimiters.decimal + decimal.split('.')[1];
                } else {
                  decimal = '';
                }

                if (optDec && Number(decimal.slice(1)) === 0) {
                  decimal = '';
                }
              } else {
                int = numeral._.toFixed(value, 0, roundingFunction);
              } // check abbreviation again after rounding


              if (abbr && !abbrForce && Number(int) >= 1000 && abbr !== locale.abbreviations.trillion) {
                int = String(Number(int) / 1000);

                switch (abbr) {
                  case locale.abbreviations.thousand:
                    abbr = locale.abbreviations.million;
                    break;

                  case locale.abbreviations.million:
                    abbr = locale.abbreviations.billion;
                    break;

                  case locale.abbreviations.billion:
                    abbr = locale.abbreviations.trillion;
                    break;
                }
              } // format number


              if (numeral._.includes(int, '-')) {
                int = int.slice(1);
                neg = true;
              }

              if (int.length < leadingCount) {
                for (var i = leadingCount - int.length; i > 0; i--) {
                  int = '0' + int;
                }
              }

              if (thousands > -1) {
                int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + locale.delimiters.thousands);
              }

              if (format.indexOf('.') === 0) {
                int = '';
              }

              output = int + decimal + (abbr ? abbr : '');

              if (negP) {
                output = (negP && neg ? '(' : '') + output + (negP && neg ? ')' : '');
              } else {
                if (signed >= 0) {
                  output = signed === 0 ? (neg ? '-' : '+') + output : output + (neg ? '-' : '+');
                } else if (neg) {
                  output = '-' + output;
                }
              }

              return output;
            },
            // unformats numbers separators, decimals places, signs, abbreviations
            stringToNumber: function (string) {
              var locale = locales[options.currentLocale],
                  stringOriginal = string,
                  abbreviations = {
                thousand: 3,
                million: 6,
                billion: 9,
                trillion: 12
              },
                  abbreviation,
                  value,
                  regexp;

              if (options.zeroFormat && string === options.zeroFormat) {
                value = 0;
              } else if (options.nullFormat && string === options.nullFormat || !string.replace(/[^0-9]+/g, '').length) {
                value = null;
              } else {
                value = 1;

                if (locale.delimiters.decimal !== '.') {
                  string = string.replace(/\./g, '').replace(locale.delimiters.decimal, '.');
                }

                for (abbreviation in abbreviations) {
                  regexp = new RegExp('[^a-zA-Z]' + locale.abbreviations[abbreviation] + '(?:\\)|(\\' + locale.currency.symbol + ')?(?:\\))?)?$');

                  if (stringOriginal.match(regexp)) {
                    value *= Math.pow(10, abbreviations[abbreviation]);
                    break;
                  }
                } // check for negative number


                value *= (string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2 ? 1 : -1; // remove non numbers

                string = string.replace(/[^0-9\.]+/g, '');
                value *= Number(string);
              }

              return value;
            },
            isNaN: function (value) {
              return typeof value === 'number' && isNaN(value);
            },
            includes: function (string, search) {
              return string.indexOf(search) !== -1;
            },
            insert: function (string, subString, start) {
              return string.slice(0, start) + subString + string.slice(start);
            },
            reduce: function (array, callback
            /*, initialValue*/
            ) {
              if (this === null) {
                throw new TypeError('Array.prototype.reduce called on null or undefined');
              }

              if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
              }

              var t = Object(array),
                  len = t.length >>> 0,
                  k = 0,
                  value;

              if (arguments.length === 3) {
                value = arguments[2];
              } else {
                while (k < len && !(k in t)) {
                  k++;
                }

                if (k >= len) {
                  throw new TypeError('Reduce of empty array with no initial value');
                }

                value = t[k++];
              }

              for (; k < len; k++) {
                if (k in t) {
                  value = callback(value, t[k], k, t);
                }
              }

              return value;
            },

            /**
             * Computes the multiplier necessary to make x >= 1,
             * effectively eliminating miscalculations caused by
             * finite precision.
             */
            multiplier: function (x) {
              var parts = x.toString().split('.');
              return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
            },

            /**
             * Given a variable number of arguments, returns the maximum
             * multiplier that must be used to normalize an operation involving
             * all of them.
             */
            correctionFactor: function () {
              var args = Array.prototype.slice.call(arguments);
              return args.reduce(function (accum, next) {
                var mn = _.multiplier(next);

                return accum > mn ? accum : mn;
              }, 1);
            },

            /**
             * Implementation of toFixed() that treats floats more like decimals
             *
             * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
             * problems for accounting- and finance-related software.
             */
            toFixed: function (value, maxDecimals, roundingFunction, optionals) {
              var splitValue = value.toString().split('.'),
                  minDecimals = maxDecimals - (optionals || 0),
                  boundedPrecision,
                  optionalsRegExp,
                  power,
                  output; // Use the smallest precision value possible to avoid errors from floating point representation

              if (splitValue.length === 2) {
                boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
              } else {
                boundedPrecision = minDecimals;
              }

              power = Math.pow(10, boundedPrecision); // Multiply up by precision, round accurately, then divide and use native toFixed():

              output = (roundingFunction(value + 'e+' + boundedPrecision) / power).toFixed(boundedPrecision);

              if (optionals > maxDecimals - boundedPrecision) {
                optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$');
                output = output.replace(optionalsRegExp, '');
              }

              return output;
            }
          }; // avaliable options

          numeral.options = options; // avaliable formats

          numeral.formats = formats; // avaliable formats

          numeral.locales = locales; // This function sets the current locale.  If
          // no arguments are passed in, it will simply return the current global
          // locale key.

          numeral.locale = function (key) {
            if (key) {
              options.currentLocale = key.toLowerCase();
            }

            return options.currentLocale;
          }; // This function provides access to the loaded locale data.  If
          // no arguments are passed in, it will simply return the current
          // global locale object.


          numeral.localeData = function (key) {
            if (!key) {
              return locales[options.currentLocale];
            }

            key = key.toLowerCase();

            if (!locales[key]) {
              throw new Error('Unknown locale : ' + key);
            }

            return locales[key];
          };

          numeral.reset = function () {
            for (var property in defaults) {
              options[property] = defaults[property];
            }
          };

          numeral.zeroFormat = function (format) {
            options.zeroFormat = typeof format === 'string' ? format : null;
          };

          numeral.nullFormat = function (format) {
            options.nullFormat = typeof format === 'string' ? format : null;
          };

          numeral.defaultFormat = function (format) {
            options.defaultFormat = typeof format === 'string' ? format : '0.0';
          };

          numeral.register = function (type, name, format) {
            name = name.toLowerCase();

            if (this[type + 's'][name]) {
              throw new TypeError(name + ' ' + type + ' already registered.');
            }

            this[type + 's'][name] = format;
            return format;
          };

          numeral.validate = function (val, culture) {
            var _decimalSep, _thousandSep, _currSymbol, _valArray, _abbrObj, _thousandRegEx, localeData, temp; //coerce val to string


            if (typeof val !== 'string') {
              val += '';

              if (console.warn) {
                console.warn('Numeral.js: Value is not string. It has been co-erced to: ', val);
              }
            } //trim whitespaces from either sides


            val = val.trim(); //if val is just digits return true

            if (!!val.match(/^\d+$/)) {
              return true;
            } //if val is empty return false


            if (val === '') {
              return false;
            } //get the decimal and thousands separator from numeral.localeData


            try {
              //check if the culture is understood by numeral. if not, default it to current locale
              localeData = numeral.localeData(culture);
            } catch (e) {
              localeData = numeral.localeData(numeral.locale());
            } //setup the delimiters and currency symbol based on culture/locale


            _currSymbol = localeData.currency.symbol;
            _abbrObj = localeData.abbreviations;
            _decimalSep = localeData.delimiters.decimal;

            if (localeData.delimiters.thousands === '.') {
              _thousandSep = '\\.';
            } else {
              _thousandSep = localeData.delimiters.thousands;
            } // validating currency symbol


            temp = val.match(/^[^\d]+/);

            if (temp !== null) {
              val = val.substr(1);

              if (temp[0] !== _currSymbol) {
                return false;
              }
            } //validating abbreviation symbol


            temp = val.match(/[^\d]+$/);

            if (temp !== null) {
              val = val.slice(0, -1);

              if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
                return false;
              }
            }

            _thousandRegEx = new RegExp(_thousandSep + '{2}');

            if (!val.match(/[^\d.,]/g)) {
              _valArray = val.split(_decimalSep);

              if (_valArray.length > 2) {
                return false;
              } else {
                if (_valArray.length < 2) {
                  return !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx);
                } else {
                  if (_valArray[0].length === 1) {
                    return !!_valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/);
                  } else {
                    return !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/);
                  }
                }
              }
            }

            return false;
          };
          /************************************
              Numeral Prototype
          ************************************/


          numeral.fn = Numeral.prototype = {
            clone: function () {
              return numeral(this);
            },
            format: function (inputString, roundingFunction) {
              var value = this._value,
                  format = inputString || options.defaultFormat,
                  kind,
                  output,
                  formatFunction; // make sure we have a roundingFunction

              roundingFunction = roundingFunction || Math.round; // format based on value

              if (value === 0 && options.zeroFormat !== null) {
                output = options.zeroFormat;
              } else if (value === null && options.nullFormat !== null) {
                output = options.nullFormat;
              } else {
                for (kind in formats) {
                  if (format.match(formats[kind].regexps.format)) {
                    formatFunction = formats[kind].format;
                    break;
                  }
                }

                formatFunction = formatFunction || numeral._.numberToFormat;
                output = formatFunction(value, format, roundingFunction);
              }

              return output;
            },
            value: function () {
              return this._value;
            },
            input: function () {
              return this._input;
            },
            set: function (value) {
              this._value = Number(value);
              return this;
            },
            add: function (value) {
              var corrFactor = _.correctionFactor.call(null, this._value, value);

              function cback(accum, curr, currI, O) {
                return accum + Math.round(corrFactor * curr);
              }

              this._value = _.reduce([this._value, value], cback, 0) / corrFactor;
              return this;
            },
            subtract: function (value) {
              var corrFactor = _.correctionFactor.call(null, this._value, value);

              function cback(accum, curr, currI, O) {
                return accum - Math.round(corrFactor * curr);
              }

              this._value = _.reduce([value], cback, Math.round(this._value * corrFactor)) / corrFactor;
              return this;
            },
            multiply: function (value) {
              function cback(accum, curr, currI, O) {
                var corrFactor = _.correctionFactor(accum, curr);

                return Math.round(accum * corrFactor) * Math.round(curr * corrFactor) / Math.round(corrFactor * corrFactor);
              }

              this._value = _.reduce([this._value, value], cback, 1);
              return this;
            },
            divide: function (value) {
              function cback(accum, curr, currI, O) {
                var corrFactor = _.correctionFactor(accum, curr);

                return Math.round(accum * corrFactor) / Math.round(curr * corrFactor);
              }

              this._value = _.reduce([this._value, value], cback);
              return this;
            },
            difference: function (value) {
              return Math.abs(numeral(this._value).subtract(value).value());
            }
          };
          /************************************
              Default Locale && Format
          ************************************/

          numeral.register('locale', 'en', {
            delimiters: {
              thousands: ',',
              decimal: '.'
            },
            abbreviations: {
              thousand: 'k',
              million: 'm',
              billion: 'b',
              trillion: 't'
            },
            ordinal: function (number) {
              var b = number % 10;
              return ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            },
            currency: {
              symbol: '$'
            }
          });

          (function () {
            numeral.register('format', 'bps', {
              regexps: {
                format: /(BPS)/,
                unformat: /(BPS)/
              },
              format: function (value, format, roundingFunction) {
                var space = numeral._.includes(format, ' BPS') ? ' ' : '',
                    output;
                value = value * 10000; // check for space before BPS

                format = format.replace(/\s?BPS/, '');
                output = numeral._.numberToFormat(value, format, roundingFunction);

                if (numeral._.includes(output, ')')) {
                  output = output.split('');
                  output.splice(-1, 0, space + 'BPS');
                  output = output.join('');
                } else {
                  output = output + space + 'BPS';
                }

                return output;
              },
              unformat: function (string) {
                return +(numeral._.stringToNumber(string) * 0.0001).toFixed(15);
              }
            });
          })();

          (function () {
            var decimal = {
              base: 1000,
              suffixes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            },
                binary = {
              base: 1024,
              suffixes: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
            };
            var allSuffixes = decimal.suffixes.concat(binary.suffixes.filter(function (item) {
              return decimal.suffixes.indexOf(item) < 0;
            }));
            var unformatRegex = allSuffixes.join('|'); // Allow support for BPS (http://www.investopedia.com/terms/b/basispoint.asp)

            unformatRegex = '(' + unformatRegex.replace('B', 'B(?!PS)') + ')';
            numeral.register('format', 'bytes', {
              regexps: {
                format: /([0\s]i?b)/,
                unformat: new RegExp(unformatRegex)
              },
              format: function (value, format, roundingFunction) {
                var output,
                    bytes = numeral._.includes(format, 'ib') ? binary : decimal,
                    suffix = numeral._.includes(format, ' b') || numeral._.includes(format, ' ib') ? ' ' : '',
                    power,
                    min,
                    max; // check for space before

                format = format.replace(/\s?i?b/, '');

                for (power = 0; power <= bytes.suffixes.length; power++) {
                  min = Math.pow(bytes.base, power);
                  max = Math.pow(bytes.base, power + 1);

                  if (value === null || value === 0 || value >= min && value < max) {
                    suffix += bytes.suffixes[power];

                    if (min > 0) {
                      value = value / min;
                    }

                    break;
                  }
                }

                output = numeral._.numberToFormat(value, format, roundingFunction);
                return output + suffix;
              },
              unformat: function (string) {
                var value = numeral._.stringToNumber(string),
                    power,
                    bytesMultiplier;

                if (value) {
                  for (power = decimal.suffixes.length - 1; power >= 0; power--) {
                    if (numeral._.includes(string, decimal.suffixes[power])) {
                      bytesMultiplier = Math.pow(decimal.base, power);
                      break;
                    }

                    if (numeral._.includes(string, binary.suffixes[power])) {
                      bytesMultiplier = Math.pow(binary.base, power);
                      break;
                    }
                  }

                  value *= bytesMultiplier || 1;
                }

                return value;
              }
            });
          })();

          (function () {
            numeral.register('format', 'currency', {
              regexps: {
                format: /(\$)/
              },
              format: function (value, format, roundingFunction) {
                var locale = numeral.locales[numeral.options.currentLocale],
                    symbols = {
                  before: format.match(/^([\+|\-|\(|\s|\$]*)/)[0],
                  after: format.match(/([\+|\-|\)|\s|\$]*)$/)[0]
                },
                    output,
                    symbol,
                    i; // strip format of spaces and $

                format = format.replace(/\s?\$\s?/, ''); // format the number

                output = numeral._.numberToFormat(value, format, roundingFunction); // update the before and after based on value

                if (value >= 0) {
                  symbols.before = symbols.before.replace(/[\-\(]/, '');
                  symbols.after = symbols.after.replace(/[\-\)]/, '');
                } else if (value < 0 && !numeral._.includes(symbols.before, '-') && !numeral._.includes(symbols.before, '(')) {
                  symbols.before = '-' + symbols.before;
                } // loop through each before symbol


                for (i = 0; i < symbols.before.length; i++) {
                  symbol = symbols.before[i];

                  switch (symbol) {
                    case '$':
                      output = numeral._.insert(output, locale.currency.symbol, i);
                      break;

                    case ' ':
                      output = numeral._.insert(output, ' ', i + locale.currency.symbol.length - 1);
                      break;
                  }
                } // loop through each after symbol


                for (i = symbols.after.length - 1; i >= 0; i--) {
                  symbol = symbols.after[i];

                  switch (symbol) {
                    case '$':
                      output = i === symbols.after.length - 1 ? output + locale.currency.symbol : numeral._.insert(output, locale.currency.symbol, -(symbols.after.length - (1 + i)));
                      break;

                    case ' ':
                      output = i === symbols.after.length - 1 ? output + ' ' : numeral._.insert(output, ' ', -(symbols.after.length - (1 + i) + locale.currency.symbol.length - 1));
                      break;
                  }
                }

                return output;
              }
            });
          })();

          (function () {
            numeral.register('format', 'exponential', {
              regexps: {
                format: /(e\+|e-)/,
                unformat: /(e\+|e-)/
              },
              format: function (value, format, roundingFunction) {
                var output,
                    exponential = typeof value === 'number' && !numeral._.isNaN(value) ? value.toExponential() : '0e+0',
                    parts = exponential.split('e');
                format = format.replace(/e[\+|\-]{1}0/, '');
                output = numeral._.numberToFormat(Number(parts[0]), format, roundingFunction);
                return output + 'e' + parts[1];
              },
              unformat: function (string) {
                var parts = numeral._.includes(string, 'e+') ? string.split('e+') : string.split('e-'),
                    value = Number(parts[0]),
                    power = Number(parts[1]);
                power = numeral._.includes(string, 'e-') ? power *= -1 : power;

                function cback(accum, curr, currI, O) {
                  var corrFactor = numeral._.correctionFactor(accum, curr),
                      num = accum * corrFactor * (curr * corrFactor) / (corrFactor * corrFactor);

                  return num;
                }

                return numeral._.reduce([value, Math.pow(10, power)], cback, 1);
              }
            });
          })();

          (function () {
            numeral.register('format', 'ordinal', {
              regexps: {
                format: /(o)/
              },
              format: function (value, format, roundingFunction) {
                var locale = numeral.locales[numeral.options.currentLocale],
                    output,
                    ordinal = numeral._.includes(format, ' o') ? ' ' : ''; // check for space before

                format = format.replace(/\s?o/, '');
                ordinal += locale.ordinal(value);
                output = numeral._.numberToFormat(value, format, roundingFunction);
                return output + ordinal;
              }
            });
          })();

          (function () {
            numeral.register('format', 'percentage', {
              regexps: {
                format: /(%)/,
                unformat: /(%)/
              },
              format: function (value, format, roundingFunction) {
                var space = numeral._.includes(format, ' %') ? ' ' : '',
                    output;

                if (numeral.options.scalePercentBy100) {
                  value = value * 100;
                } // check for space before %


                format = format.replace(/\s?\%/, '');
                output = numeral._.numberToFormat(value, format, roundingFunction);

                if (numeral._.includes(output, ')')) {
                  output = output.split('');
                  output.splice(-1, 0, space + '%');
                  output = output.join('');
                } else {
                  output = output + space + '%';
                }

                return output;
              },
              unformat: function (string) {
                var number = numeral._.stringToNumber(string);

                if (numeral.options.scalePercentBy100) {
                  return number * 0.01;
                }

                return number;
              }
            });
          })();

          (function () {
            numeral.register('format', 'time', {
              regexps: {
                format: /(:)/,
                unformat: /(:)/
              },
              format: function (value, format, roundingFunction) {
                var hours = Math.floor(value / 60 / 60),
                    minutes = Math.floor((value - hours * 60 * 60) / 60),
                    seconds = Math.round(value - hours * 60 * 60 - minutes * 60);
                return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
              },
              unformat: function (string) {
                var timeArray = string.split(':'),
                    seconds = 0; // turn hours and minutes into seconds and add them all up

                if (timeArray.length === 3) {
                  // hours
                  seconds = seconds + Number(timeArray[0]) * 60 * 60; // minutes

                  seconds = seconds + Number(timeArray[1]) * 60; // seconds

                  seconds = seconds + Number(timeArray[2]);
                } else if (timeArray.length === 2) {
                  // minutes
                  seconds = seconds + Number(timeArray[0]) * 60; // seconds

                  seconds = seconds + Number(timeArray[1]);
                }

                return Number(seconds);
              }
            });
          })();

          return numeral;
        });
      });

      const ModuleList = ({
        loading,
        modules,
        renderActions = v => []
      }) => {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(List, {
          loading: loading,
          itemLayout: "horizontal",
          dataSource: modules,
          renderItem: item => {
            var _item$metadata, _item$metadata2, _item$metadata3;

            return /*#__PURE__*/React.createElement(List.Item, {
              actions: [...renderActions(item)]
            }, /*#__PURE__*/React.createElement(Skeleton, {
              avatar: true,
              title: false,
              loading: item.loading,
              active: true
            }, /*#__PURE__*/React.createElement(List.Item.Meta, {
              title: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, item.name + (((_item$metadata = item.metadata) === null || _item$metadata === void 0 ? void 0 : _item$metadata.title) ? ` / ${(_item$metadata2 = item.metadata) === null || _item$metadata2 === void 0 ? void 0 : _item$metadata2.title}` : '')), /*#__PURE__*/React.createElement("span", {
                style: {
                  paddingLeft: 10
                }
              }, item.loaded && /*#__PURE__*/React.createElement(Tag, {
                color: "magenta"
              }, "\u5DF2\u52A0\u8F7D"), item.predefined && /*#__PURE__*/React.createElement(Tag, {
                color: "green"
              }, "\u9884\u5B9A\u4E49"), item.internal && /*#__PURE__*/React.createElement(Tag, {
                color: "lime"
              }, "\u5185\u90E8\u6A21\u5757"), item.hasMetadata && /*#__PURE__*/React.createElement(Tag, {
                color: "gold"
              }, "\u542B\u5143\u6570\u636E"), item.override && /*#__PURE__*/React.createElement(Tag, {
                color: "geekblue"
              }, "\u8986\u76D6"))),
              description: (_item$metadata3 = item.metadata) === null || _item$metadata3 === void 0 ? void 0 : _item$metadata3.description
            }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, item.resolved), /*#__PURE__*/React.createElement("span", {
              style: {
                paddingLeft: 8
              }
            }, /*#__PURE__*/React.createElement(Tag, null, item.version), /*#__PURE__*/React.createElement(Tag, null, item.source), item.loadingSize && /*#__PURE__*/React.createElement(Tag, {
              icon: /*#__PURE__*/React.createElement(SyncOutlined, {
                spin: true
              })
            }), item.size && /*#__PURE__*/React.createElement(Tag, null, numeral(item.size).format('0.00b')))), /*#__PURE__*/React.createElement("div", {
              style: {
                maxWidth: '30vw'
              }
            }, Boolean(item.dependencies.length) && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "\u4F9D\u8D56: ", item.dependencies.join(','))), Boolean(item.dependents.length) && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "\u88AB\u4F9D\u8D56: ", item.dependents.join(',')))))));
          }
        }));
      };

      let _svc;

      function getModuleMgmtService() {
        return _svc = _svc || new ModuleManagementService();
      }

      function getContentLength(url) {
        return fetch(url).then(v => {
          const len = v.headers.get('content-length');

          if (len) {
            return parseInt(len, 10);
          }

          return v.arrayBuffer().then(v => v.byteLength);
        });
      }

      async function refreshSize(modules, updater, all = false) {
        let list = modules.map((v, i) => [i, v]).filter(([_, v]) => !v.size);

        if (!all) {
          list = list.filter(([_, v]) => v.loaded);
        }

        const pendings = list.map(async ([i, module]) => {
          updater(s => {
            s[i].loadingSize = true;
          });
          const size = await getContentLength(module.resolved);

          try {
            updater(s => {
              s[i].size = size;
              s[i].loadingSize = false;
            });
          } catch (e) {
            console.error(`failed to get size of`, module.name, module.resolved, e);
            updater(s => {
              s[i].loadingSize = false;
            });
          }
        });
        return Promise.all(pendings);
      }

      const ModuleManagementPanel = exports('ModuleManagementPanel', () => {
        const svc = getModuleMgmtService();
        const System = getBootService().System;
        const [modules, updateModules] = u$1(() => svc.getModules().sort((a, b) => a.name.localeCompare(b.name)));
        useEffect(() => {
          refreshSize(modules, updateModules);
        }, []);

        const doRefresh = () => {
          updateModules(s => svc.getModules().sort((a, b) => a.name.localeCompare(b.name)));
        };

        const doAddLocalModule = async module => {
          await svc.addOverrideModule(module);
          doRefresh();
        };

        const doResetLocalModule = async () => {
          await svc.resetOverrideModules();
          doRefresh();
        };

        const doModuleLoad = async name => {
          updateModules(modules => {
            modules.find(v => v.name === name).loading = true;
          });

          try {
            await System.import(name);
            updateModules(modules => {
              const m = modules.find(v => v.name === name);
              m.loading = false;
              m.loaded = true; //

              m.dependencies = Array.from(getBootService().modules.dependencies[name] || []);

              for (const depName of m.dependencies) {
                const dep = modules.find(v => v.name === depName);

                if (dep && !dep.dependents.includes(name)) {
                  dep.dependents = [...dep.dependents, name];
                }
              }
            });
          } catch (e) {
            notification.error({
              message: String(e)
            });
            updateModules(modules => {
              const m = modules.find(v => v.name === name);
              m.loading = false;
              m.loaded = false;
            });
          }
        };

        const doModuleUnload = name => {
          updateModules(modules => {
            const m = modules.find(v => v.name === name);
            System.delete(m.resolved);
            m.loading = false;
            m.loaded = System.has(m.resolved);
          });
        };

        const [edit, updateEdit] = u$1({
          editing: false,
          module: undefined
        });

        const onModuleEdit = module => {
          updateEdit(s => {
            s.editing = true;
            s.module = module;
          });
        };

        const onModulePublish = module => {
          message.warn('尚未实现');
        };

        const onModuleReset = async module => {
          await svc.removeOverrideModule(module);
          doRefresh();
        };

        const onShowAllModuleSize = () => {
          return refreshSize(modules, updateModules, true);
        };

        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ModuleEditDialog, {
          visible: edit.editing,
          module: edit.module,
          onModuleChange: async v => doAddLocalModule(v),
          onVisibleChange: v => updateEdit(s => {
            s.editing = v;
          })
        }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ModuleToolBar, {
          onRefresh: doRefresh,
          onResetLocalModule: doResetLocalModule,
          onAddLocalModule: doAddLocalModule,
          onShowAllModuleSize: onShowAllModuleSize
        })), /*#__PURE__*/React.createElement(ModuleList, {
          modules: modules,
          onModuleLoad: doModuleLoad,
          onModuleUnload: doModuleUnload,
          renderActions: renderModuleActions({
            onModuleUnload: doModuleUnload,
            onModuleLoad: doModuleLoad,
            onModuleReset,
            onModuleEdit,
            onModulePublish
          })
        }));
      });

      function renderModuleActions(opts) {
        const {
          onModuleLoad,
          onModuleUnload,
          onModuleEdit,
          onModulePublish,
          onModuleReset
        } = opts;
        return item => [/*#__PURE__*/React.createElement(Button, {
          onClick: () => onModuleLoad(item.name),
          type: "link",
          key: "load",
          size: "small",
          disabled: item.loaded
        }, "\u52A0\u8F7D"), /*#__PURE__*/React.createElement(Button, {
          onClick: () => onModuleUnload(item.name),
          type: "link",
          key: "unload",
          size: "small",
          disabled: !item.loaded
        }, "\u5378\u8F7D"), /*#__PURE__*/React.createElement(Dropdown, {
          key: 'more',
          overlay: /*#__PURE__*/React.createElement(Menu, null, /*#__PURE__*/React.createElement(Menu.Item, {
            onClick: () => onModulePublish(item),
            icon: /*#__PURE__*/React.createElement(UploadOutlined, null)
          }, "\u53D1\u5E03"), /*#__PURE__*/React.createElement(Menu.Item, {
            onClick: () => onModuleEdit(item),
            icon: /*#__PURE__*/React.createElement(EditOutlined, null)
          }, "\u7F16\u8F91"), /*#__PURE__*/React.createElement(Menu.Item, {
            onClick: () => onModuleReset(item),
            disabled: !item.override,
            icon: /*#__PURE__*/React.createElement(MinusSquareOutlined, null)
          }, "\u91CD\u7F6E\u672C\u5730\u8986\u76D6"))
        }, /*#__PURE__*/React.createElement("a", {
          className: "ant-dropdown-link",
          onClick: e => e.preventDefault()
        }, "\u64CD\u4F5C ", /*#__PURE__*/React.createElement(DownOutlined, null)))];
      }

      const ModuleEditDialog = ({
        visible,
        onVisibleChange,
        module,
        onModuleChange
      }) => {
        const [form] = Form.useForm();
        const lastRef = useRef(module);
        useEffect(() => {
          if (module && lastRef.current !== module) {
            lastRef.current = module;
            form.setFieldsValue(module);
          }
        }, [module]);
        return /*#__PURE__*/React.createElement(Modal, {
          title: '模块',
          onOk: () => form.submit(),
          visible: visible,
          onCancel: () => onVisibleChange(false)
        }, /*#__PURE__*/React.createElement(Form, {
          form: form,
          labelCol: {
            span: 4
          },
          wrapperCol: {
            span: 20
          },
          initialValues: module || {},
          onFinish: v => {
            if (onModuleChange(v) !== false) {
              onVisibleChange(false);
            }
          }
        }, /*#__PURE__*/React.createElement(Form.Item, {
          name: 'name',
          label: '模块名',
          required: true,
          rules: [{
            required: true
          }]
        }, /*#__PURE__*/React.createElement(Input, null)), /*#__PURE__*/React.createElement(Form.Item, {
          name: 'resolved',
          label: '地址',
          required: true,
          rules: [{
            required: true
          }]
        }, /*#__PURE__*/React.createElement(Input, null))));
      };

      const ModuleToolBar = ({
        onRefresh,
        onResetLocalModule,
        onAddLocalModule,
        onShowAllModuleSize
      }) => {
        const [state, update] = u$1({
          editing: false,
          pendingShowAllModuleSize: false
        });

        const showAll = async () => {
          update(s => {
            s.pendingShowAllModuleSize = true;
          });

          try {
            await onShowAllModuleSize();
          } finally {
            update(s => {
              s.pendingShowAllModuleSize = false;
            });
          }
        };

        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ModuleEditDialog, {
          visible: state.editing,
          onVisibleChange: v => update(s => {
            s.editing = v;
          }),
          onModuleChange: onAddLocalModule
        }), /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            gap: 8
          }
        }, /*#__PURE__*/React.createElement(Button.Group, null, /*#__PURE__*/React.createElement(Button, {
          type: 'primary',
          icon: /*#__PURE__*/React.createElement(PlusSquareOutlined, null),
          onClick: () => update(s => {
            s.editing = true;
          })
        }, "\u672C\u5730"), /*#__PURE__*/React.createElement(Button, {
          onClick: onResetLocalModule,
          icon: /*#__PURE__*/React.createElement(ClearOutlined, null)
        }, "\u91CD\u7F6E")), /*#__PURE__*/React.createElement(Button, {
          onClick: onRefresh,
          icon: /*#__PURE__*/React.createElement(ReloadOutlined, null)
        }, "\u5237\u65B0"), /*#__PURE__*/React.createElement(Button, {
          loading: state.pendingShowAllModuleSize,
          onClick: showAll,
          icon: /*#__PURE__*/React.createElement(ReloadOutlined, null)
        }, "\u663E\u793A\u6240\u6709\u6A21\u5757\u5927\u5C0F")));
      };

      var title = "应用管理";
      var description = "模块管理，本地模块开发，模块更新发布。";
      var metadata = exports('metadata', {
      	title: title,
      	description: description
      });

    }
  };
});
//# sourceMappingURL=wener-apis-mgmt.system.js.map
