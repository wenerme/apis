System.register(['react', 'antd', '@wener/utils', '@wener/ui', '@ant-design/icons'], function (exports) {
  'use strict';
  var useState, useRef, React, useEffect, Descriptions, createLazyPromise, getGlobalThis, useAsyncEffect, LoadingOutlined;
  return {
    setters: [function (module) {
      useState = module.useState;
      useRef = module.useRef;
      React = module.default;
      useEffect = module.useEffect;
    }, function (module) {
      Descriptions = module.Descriptions;
    }, function (module) {
      createLazyPromise = module.createLazyPromise;
      getGlobalThis = module.getGlobalThis;
    }, function (module) {
      useAsyncEffect = module.useAsyncEffect;
    }, function (module) {
      LoadingOutlined = module.LoadingOutlined;
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

      function getCandidates(conn) {
        var _candidatesPromise$fi;

        const candidatesPromise = createLazyPromise();
        const candidates = [];

        const handler = e => {
          if (e.candidate) {
            candidates.push(e.candidate);
          }

          if (conn.iceGatheringState === 'complete') {
            candidatesPromise.resolve(candidates);
          }
        };

        conn.addEventListener('icecandidate', handler);
        conn.addEventListener('icegatheringstatechange', handler);
        (_candidatesPromise$fi = candidatesPromise.finally) === null || _candidatesPromise$fi === void 0 ? void 0 : _candidatesPromise$fi.call(candidatesPromise, () => {
          conn.removeEventListener('icecandidate', handler);
          conn.removeEventListener('icegatheringstatechange', handler);
        });
        return candidatesPromise;
      }
      function getPeerConnectionState(conn) {
        var _conn$sctp2, _conn$sctp3, _conn$sctp3$transport;

        const {
          connectionState,
          iceGatheringState,
          iceConnectionState,
          signalingState,
          idpErrorInfo
        } = conn;
        return {
          connectionState,
          iceGatheringState,
          iceConnectionState,
          signalingState,
          idpErrorInfo,
          //
          sctpState: (_conn$sctp2 = conn.sctp) === null || _conn$sctp2 === void 0 ? void 0 : _conn$sctp2.state,
          sctpTransportState: (_conn$sctp3 = conn.sctp) === null || _conn$sctp3 === void 0 ? void 0 : (_conn$sctp3$transport = _conn$sctp3.transport) === null || _conn$sctp3$transport === void 0 ? void 0 : _conn$sctp3$transport.state
        };
      }
      function addPeerConnectionStateListener(conn, onStateChange) {
        let state = getPeerConnectionState(conn);

        const handler = e => {
          const neo = rn(state, s => {
            Object.assign(s, getPeerConnectionState(conn));
          });

          if (neo !== state) {
            state = neo;
            onStateChange(state);
          }
        };

        onStateChange(state);
        const events = ['connectionstatechange', 'icegatheringstatechange', 'signalingstatechange', 'negotiationneeded'];
        events.forEach(v => conn.addEventListener(v, handler));
        return () => {
          events.forEach(v => conn.removeEventListener(v, handler));
        };
      }

      const CandidateErrorLine = ({
        candidate
      }) => {
        const {
          url,
          errorCode,
          errorText,
          hostCandidate
        } = candidate;

        if (errorCode) {
          return /*#__PURE__*/React.createElement("div", {
            style: {
              display: 'flex',
              alignItems: 'center'
            }
          }, /*#__PURE__*/React.createElement("span", null, "\u274C"), /*#__PURE__*/React.createElement("span", null, url, " - \u9519\u8BEF\u7801 ", errorCode, " - ", errorText, " - ", hostCandidate));
        }

        return null;
      };

      const WebRTCChecker = exports('WebRTCChecker', () => {
        var _globalThis$navigator, _globalThis$navigator2, _globalThis$navigator3, _globalThis$navigator4, _connRef$current, _connRef$current$loca, _connRef$current$loca2, _connRef$current2, _connRef$current2$loc, _globalThis$navigator5, _globalThis$navigator6, _globalThis$navigator7, _globalThis$navigator8, _connRef$current3, _connRef$current3$loc, _remoteRef$current, _remoteRef$current$lo;

        const [phase, setPhase] = useState('N/A');
        const [connState, setConnState] = useState({});
        const [candidates, setCandidates] = useState([]); // https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/

        const [iceServers, setIceServers] = useState([{
          urls: ['stun:stun.wener.me']
        }, {
          urls: ['stun:stun2.wener.me']
        }]);
        const [devices, setDevices] = useState([]);
        const connRef = useRef();
        const remoteRef = useRef();
        const metaRef = useRef();
        const globalThis = getGlobalThis();
        useAsyncEffect(async () => {
          var _navigator$mediaDevic;

          if ((_navigator$mediaDevic = navigator.mediaDevices) === null || _navigator$mediaDevic === void 0 ? void 0 : _navigator$mediaDevic.enumerateDevices) {
            setDevices(await navigator.mediaDevices.enumerateDevices());
          }
        }, []);
        useAsyncEffect(async ({
          setCloser
        }) => {
          if (!globalThis.RTCPeerConnection) {
            return;
          }

          const closer = [];
          setCloser(() => closer.forEach(v => v()));
          setPhase('初始化');
          const configuration = {
            iceServers
          };
          const conn = connRef.current = new RTCPeerConnection(configuration);
          closer.push(addPeerConnectionStateListener(conn, setConnState));
          closer.push(conn.close.bind(conn));
          window['WebRTCCheckerTest'] = {
            conn
          };
          const candidates = [];
          const gatherReady = createLazyPromise();
          const connectionReady = createLazyPromise();
          conn.addEventListener('icegatheringstatechange', e => {
            if (conn.iceGatheringState === 'complete') {
              gatherReady.resolve('');
            }
          });
          conn.addEventListener('connectionstatechange', e => {
            if (['failed', 'connected'].includes(conn.connectionState)) {
              connectionReady.resolve(conn.connectionState);
            }
          });
          conn.addEventListener('icecandidate', e => {
            console.log('WebRTC Checker local candidate', e.candidate);

            if (e.candidate) {
              candidates.push(e.candidate);
              const {
                foundation,
                candidate,
                address,
                component,
                ip,
                port,
                priority,
                protocol,
                relatedAddress,
                relatedPort,
                sdpMLineIndex,
                sdpMid,
                tcpType,
                type,
                usernameFragment
              } = e.candidate;
              setCandidates(rn(s => {
                s.push({
                  url: e.url,
                  candidate,
                  address,
                  component,
                  foundation,
                  ip,
                  port,
                  priority,
                  protocol,
                  relatedAddress,
                  relatedPort,
                  sdpMLineIndex,
                  sdpMid,
                  tcpType,
                  type,
                  usernameFragment
                });
              }));
            }
          });
          conn.addEventListener('icecandidateerror', e => {
            const {
              url,
              errorCode,
              errorText,
              hostCandidate
            } = e;
            setCandidates(rn(s => {
              s.push({
                url,
                errorCode,
                errorText,
                hostCandidate
              });
            }));
          });
          const meta = metaRef.current = conn.createDataChannel('meta', {
            ordered: true
          });
          closer.push(meta.close.bind(meta));
          const offer = await conn.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
          });
          await conn.setLocalDescription(offer); //

          setPhase('等待待选信息');
          await gatherReady; //

          setPhase('应答');
          const remote = remoteRef.current = new RTCPeerConnection(configuration);
          const remoteCandidates = getCandidates(remote);
          closer.push(remote.close.bind(remote));
          await remote.setRemoteDescription(offer);
          const answer = await remote.createAnswer();
          await remote.setLocalDescription(answer);
          setPhase('添加待选信息');

          for (const candidate of candidates) {
            await remote.addIceCandidate(candidate);
          }

          setPhase('等待应答待选信息');
          await remoteCandidates;
          setPhase('接受应答');
          await conn.setRemoteDescription(answer);
          setPhase('添加应答待选信息');

          for (const candidate of await remoteCandidates) {
            await conn.addIceCandidate(candidate);
          } //


          setPhase('等待链接');
          await connectionReady;
          setPhase((await connectionReady) === 'connected' ? '已链接' : '链接失败');
        }, []);
        const ConnectionStates = [{
          label: '链接状态',
          name: 'connectionState'
        }, {
          label: 'ICE 链接状态',
          name: 'iceConnectionState'
        }, {
          label: 'ICE 收集状态',
          name: 'iceGatheringState'
        }, {
          label: '信令状态',
          name: 'signalingState'
        }, {
          label: 'SCTP 状态',
          name: 'sctpState'
        }, {
          label: 'SCTP 传输状态',
          name: 'sctpTransportState'
        }];
        const columns = useBreakpoints({
          values: [1, 2, 3]
        });
        const supportColumns = useBreakpoints({
          values: [2, 2, 4, 4]
        });
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "WebRTC \u652F\u6301"), /*#__PURE__*/React.createElement(Descriptions, {
          column: supportColumns,
          layout: "vertical",
          bordered: true
        }, /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "RTCPeerConnection"
        }, emojiOfBoolean(globalThis.RTCPeerConnection)), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "RTCDataChannel"
        }, emojiOfBoolean(globalThis.RTCDataChannel)), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "getUserMedia"
        }, emojiOfBoolean((_globalThis$navigator = globalThis.navigator) === null || _globalThis$navigator === void 0 ? void 0 : (_globalThis$navigator2 = _globalThis$navigator.mediaDevices) === null || _globalThis$navigator2 === void 0 ? void 0 : _globalThis$navigator2.getUserMedia)), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "getDisplayMedia"
        }, emojiOfBoolean((_globalThis$navigator3 = globalThis.navigator) === null || _globalThis$navigator3 === void 0 ? void 0 : (_globalThis$navigator4 = _globalThis$navigator3.mediaDevices) === null || _globalThis$navigator4 === void 0 ? void 0 : _globalThis$navigator4['getDisplayMedia']))), /*#__PURE__*/React.createElement("h3", null, "WebRTC \u94FE\u63A5 - ", phase), /*#__PURE__*/React.createElement(Descriptions, {
          className: "descriptions-table-fixed",
          column: columns,
          layout: "vertical",
          bordered: true
        }, ConnectionStates.map(({
          name,
          label
        }) => {
          var _connState$name;

          return /*#__PURE__*/React.createElement(Descriptions.Item, {
            label: label,
            key: name
          }, (_connState$name = connState[name]) !== null && _connState$name !== void 0 ? _connState$name : 'N/A');
        }), /*#__PURE__*/React.createElement(Descriptions.Item, {
          span: columns,
          label: "\u5A92\u4F53\u4FE1\u606F"
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
          className: "media"
        }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u7D22\u5F15"), /*#__PURE__*/React.createElement("th", null, "\u5A92\u4F53"), /*#__PURE__*/React.createElement("th", null, "\u7AEF\u53E3"), /*#__PURE__*/React.createElement("th", {
          className: "protocol"
        }, "\u534F\u8BAE"), /*#__PURE__*/React.createElement("th", {
          className: "format"
        }, "\u683C\u5F0F"))), /*#__PURE__*/React.createElement("tbody", null, parseMediaDescription((_connRef$current = connRef.current) === null || _connRef$current === void 0 ? void 0 : (_connRef$current$loca = _connRef$current.localDescription) === null || _connRef$current$loca === void 0 ? void 0 : _connRef$current$loca.sdp).map(({
          media,
          port,
          protocol,
          format
        }, i) => /*#__PURE__*/React.createElement("tr", {
          key: i
        }, /*#__PURE__*/React.createElement("td", null, i), /*#__PURE__*/React.createElement("td", null, media), /*#__PURE__*/React.createElement("td", null, port), /*#__PURE__*/React.createElement("td", {
          className: "protocol"
        }, protocol), /*#__PURE__*/React.createElement("td", {
          className: "format"
        }, format))))))), /*#__PURE__*/React.createElement(Descriptions.Item, {
          span: columns,
          label: "\u7F16\u7801\u683C\u5F0F"
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
          className: "encoding"
        }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u7C7B\u578B"), /*#__PURE__*/React.createElement("th", null, "\u7F16\u7801"), /*#__PURE__*/React.createElement("th", null, "\u9891\u7387"))), /*#__PURE__*/React.createElement("tbody", null, parsePayloadType((_connRef$current$loca2 = (_connRef$current2 = connRef.current) === null || _connRef$current2 === void 0 ? void 0 : (_connRef$current2$loc = _connRef$current2.localDescription) === null || _connRef$current2$loc === void 0 ? void 0 : _connRef$current2$loc.sdp) !== null && _connRef$current$loca2 !== void 0 ? _connRef$current$loca2 : '').sort(({
          type: a
        }, {
          type: b
        }) => a - b).map(({
          type,
          encodingName,
          encodingParameter,
          clockRate
        }, i) => /*#__PURE__*/React.createElement("tr", {
          key: type
        }, /*#__PURE__*/React.createElement("td", null, type), /*#__PURE__*/React.createElement("td", null, encodingName), /*#__PURE__*/React.createElement("td", null, clockRate, "/", clockRate / 1000, "Khz"))))))), /*#__PURE__*/React.createElement(Descriptions.Item, {
          span: columns,
          label: /*#__PURE__*/React.createElement("div", null, "\u94FE\u63A5\u5F85\u9009\u4FE1\u606F / candidates / ", candidates.length, connState.iceGatheringState === 'gathering' ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : null)
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
          className: "candidate"
        }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
          className: "sdp-mid"
        }, "\u5A92\u4F53"), /*#__PURE__*/React.createElement("th", {
          className: "address"
        }, "\u5730\u5740"), /*#__PURE__*/React.createElement("th", null, "\u534F\u8BAE"), /*#__PURE__*/React.createElement("th", null, "\u7C7B\u578B"), /*#__PURE__*/React.createElement("th", null, "\u7528\u6237"), /*#__PURE__*/React.createElement("th", {
          className: "priority"
        }, "Foundation"), /*#__PURE__*/React.createElement("th", {
          className: "priority"
        }, "\u4F18\u5148\u7EA7"))), /*#__PURE__*/React.createElement("tbody", null, candidates.filter(({
          errorCode
        }) => !errorCode).sort(({
          sdpMid: a
        }, {
          sdpMid: b
        }) => a - b).map(({
          ip,
          address,
          port,
          protocol,
          type,
          component,
          relatedAddress,
          relatePort,
          priority,
          foundation,
          usernameFragment,
          sdpMid
        }, i) => /*#__PURE__*/React.createElement("tr", {
          key: i
        }, /*#__PURE__*/React.createElement("td", {
          className: "sdp-mid"
        }, sdpMid), /*#__PURE__*/React.createElement("td", {
          className: "address"
        }, ip || address, ":", port), /*#__PURE__*/React.createElement("td", null, protocol), /*#__PURE__*/React.createElement("td", null, type, "/", component), /*#__PURE__*/React.createElement("td", null, usernameFragment), /*#__PURE__*/React.createElement("td", {
          className: "priority"
        }, foundation), /*#__PURE__*/React.createElement("td", {
          className: "priority"
        }, priority))))), /*#__PURE__*/React.createElement("h4", null, "\u5F02\u5E38"), candidates.filter(({
          errorCode
        }) => errorCode).map((candidate, i) => /*#__PURE__*/React.createElement(CandidateErrorLine, {
          candidate: candidate,
          key: i
        })))), /*#__PURE__*/React.createElement(Descriptions.Item, {
          span: columns,
          label: "\u8BBE\u5907\u4FE1\u606F"
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
          style: {
            tableLayout: 'auto'
          }
        }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
          style: {
            minWidth: 40
          }
        }, "\u6807\u7B7E"), /*#__PURE__*/React.createElement("th", null, "\u7C7B\u578B"), /*#__PURE__*/React.createElement("th", null, "\u5206\u7EC4ID"), /*#__PURE__*/React.createElement("th", null, "\u8BBE\u5907ID"))), /*#__PURE__*/React.createElement("tbody", null, devices.map(({
          label,
          kind,
          groupId,
          deviceId
        }, i) => /*#__PURE__*/React.createElement("tr", {
          key: i
        }, /*#__PURE__*/React.createElement("td", {
          style: {
            minWidth: 40
          }
        }, label || 'N/A'), /*#__PURE__*/React.createElement("td", null, kind), /*#__PURE__*/React.createElement("td", null, renderSummary(groupId)), /*#__PURE__*/React.createElement("td", null, renderSummary(deviceId)))))))), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u652F\u6301\u7684\u8BBE\u5907\u9650\u5236",
          span: columns
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("pre", null, JSON.stringify((_globalThis$navigator5 = globalThis === null || globalThis === void 0 ? void 0 : (_globalThis$navigator6 = globalThis.navigator) === null || _globalThis$navigator6 === void 0 ? void 0 : (_globalThis$navigator7 = _globalThis$navigator6.mediaDevices) === null || _globalThis$navigator7 === void 0 ? void 0 : (_globalThis$navigator8 = _globalThis$navigator7.getSupportedConstraints) === null || _globalThis$navigator8 === void 0 ? void 0 : _globalThis$navigator8.call(_globalThis$navigator7)) !== null && _globalThis$navigator5 !== void 0 ? _globalThis$navigator5 : {}, null, '  ')))), /*#__PURE__*/React.createElement(Descriptions.Item, {
          span: columns,
          label: "\u8BF7\u6C42\u65B9\u63CF\u8FF0\u4FE1\u606F / offer"
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            width: '100%',
            overflowX: 'scroll'
          }
        }, /*#__PURE__*/React.createElement("pre", null, (_connRef$current3 = connRef.current) === null || _connRef$current3 === void 0 ? void 0 : (_connRef$current3$loc = _connRef$current3.localDescription) === null || _connRef$current3$loc === void 0 ? void 0 : _connRef$current3$loc.sdp))), /*#__PURE__*/React.createElement(Descriptions.Item, {
          span: columns,
          label: "\u63A5\u53D7\u65B9\u63CF\u8FF0\u4FE1\u606F / answer"
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            width: '100%',
            overflowX: 'scroll'
          }
        }, /*#__PURE__*/React.createElement("pre", null, (_remoteRef$current = remoteRef.current) === null || _remoteRef$current === void 0 ? void 0 : (_remoteRef$current$lo = _remoteRef$current.localDescription) === null || _remoteRef$current$lo === void 0 ? void 0 : _remoteRef$current$lo.sdp)))), /*#__PURE__*/React.createElement("style", {
          jsx: true,
          global: true
        }, `
        @media (max-width: 576px) {
          .descriptions-table-fixed .ant-descriptions-view > table {
            table-layout: fixed !important;
          }

          table.media,
          table.candidate,
          table.encoding {
            display: block !important;
          }
        }
      `), /*#__PURE__*/React.createElement("style", {
          jsx: true
        }, `
        h3,
        h4 {
          margin-top: 16px;
          margin-bottom: 8px;
        }

        table.media,
        table.candidate,
        table.encoding {
          overflow-x: auto;
          white-space: nowrap;
          table-layout: unset;
        }

        table tr:hover {
          background-color: #edf0f4;
        }

        table.candidate td,
        table.candidate th,
        table.media td,
        table.media th,
        table.encoding td,
        table.encoding th {
          width: 70px;
          text-align: center;
        }
        .candidate td.address,
        .candidate th.address {
          white-space: nowrap;

          width: unset;
          text-align: left;
        }
        .candidate td.priority,
        .candidate th.priority {
          width: 140px;
          text-align: right;
        }
        .candidate td.sdp-mid,
        .candidate th.sdp-mid {
          width: 40px;
        }

        table.media td.format,
        table.media th.format {
          width: auto;
          text-align: left;
        }
        table.media td.protocol,
        table.media th.protocol {
          width: 200px;
        }

        pre {
          white-space: pre-wrap;
          word-break: break-word;
        }
      `));
      });

      function emojiOfBoolean(s) {
        return s ? '✅ - 支持' : '❌ - 不支持';
      }

      function parseMediaDescription(sdp) {
        return (sdp !== null && sdp !== void 0 ? sdp : '').split('\n').filter(v => v.startsWith('m=')).map(v => v.substring(2)).map(v => v.match(/^(\S+)\s+(\S+)\s+(\S+)\s+(.*)/)).map(([_, media, port, protocol, format]) => ({
          media,
          port,
          protocol,
          format
        }));
      }

      function parsePayloadType(sdp) {
        return (sdp !== null && sdp !== void 0 ? sdp : '').split('\n').filter(v => v.startsWith('a=rtpmap:')).map(v => v.substring('a=rtpmap:'.length)).map(v => v.match(/^(\S+)\s+([^/]+)[/]([^/]+)(\s+(.*))?/)).map(([_, type, encodingName, clockRate, encodingParameter]) => ({
          type,
          encodingName,
          clockRate,
          encodingParameter
        }));
      } /// https://getbootstrap.com/docs/4.1/layout/overview/
      /// xm md lg xl


      function useBreakpoints({
        breaks = [575.98, 768.98, 991.98, 1199.98],
        values = null
      } = {}) {
        const onResize = () => {
          const w = getGlobalThis()['innerWidth'] || 0;
          let i = breaks.findIndex(v => v > w);
          i = i === -1 ? breaks.length : i;
          let v = i;

          if (values) {
            if (i > values.length - 1) {
              v = values[values.length - 1];
            } else {
              v = values[i];
            }
          }

          return v;
        };

        const [val, setVal] = useState(onResize);
        useEffect(() => {
          setVal(onResize());
          window.addEventListener('resize', onResize);
          return () => window.removeEventListener('resize', onResize);
        }, []);
        return val;
      }

      function renderSummary(s) {
        if (s.length < 10) {
          return s;
        }

        return /*#__PURE__*/React.createElement("details", null, /*#__PURE__*/React.createElement("summary", {
          title: s
        }, s.substring(0, 8)), s);
      }

      var title = "WebRTC 工具";
      var description = "WebRTC浏览器兼容检测";
      var metadata = exports('metadata', {
      	title: title,
      	description: description
      });

    }
  };
});
//# sourceMappingURL=wener-apis-webrtc.system.js.map
