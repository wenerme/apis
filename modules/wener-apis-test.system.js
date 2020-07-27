System.register(['react', 'react-dom', 'lodash', 'antd', '@wener/apis-dash', '@wener/apis-client', 'react-query'], function (exports) {
  'use strict';
  var React, useState, useRef, useMemo, useEffect, ReactDOM, camelCase, Button, notification, PageHeader, Input, DashLayout, consumeClientService, PingService, useQuery, useMutation;
  return {
    setters: [function (module) {
      React = module.default;
      useState = module.useState;
      useRef = module.useRef;
      useMemo = module.useMemo;
      useEffect = module.useEffect;
    }, function (module) {
      ReactDOM = module.default;
    }, function (module) {
      camelCase = module.camelCase;
    }, function (module) {
      Button = module.Button;
      notification = module.notification;
      PageHeader = module.PageHeader;
      Input = module.Input;
    }, function (module) {
      DashLayout = module.DashLayout;
    }, function (module) {
      consumeClientService = module.consumeClientService;
      PingService = module.PingService;
    }, function (module) {
      useQuery = module.useQuery;
      useMutation = module.useMutation;
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

      const TestButton = () => {
        return /*#__PURE__*/React.createElement(Button, {
          onClick: () => notification.info({
            message: 'Hi'
          })
        }, "TestButton");
      };

      const TestPanel = () => {
        return /*#__PURE__*/React.createElement(DashLayout, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHeader, {
          title: 'Test APP',
          subTitle: 'for test only'
        }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TestButton, null))));
      };

      var title = "测试模块";
      var description = "测试 Ping 接口；Single SPA 测试应用";
      var metadata = exports('metadata', {
      	title: title,
      	description: description
      });

      const PingButton = () => {
        const svc = consumeClientService(PingService);
        const {
          isLoading,
          isError,
          refetch: ping
        } = useQuery('test.ping', () => svc.ping(), {
          enabled: false,

          onError(error) {
            notification.error({
              message: JSON.stringify(error)
            });
          },

          onSuccess(data) {
            notification.success({
              message: JSON.stringify(data)
            });
          }

        });
        return /*#__PURE__*/React.createElement(Button, {
          danger: isError,
          loading: isLoading,
          onClick: () => ping()
        }, "PING");
      };

      const HelloButton = () => {
        const svc = consumeClientService(PingService);
        const [hello, {
          isLoading,
          isError
        }] = useMutation(name => svc.hello(name), {
          onSuccess(data) {
            notification.success({
              message: JSON.stringify(data)
            });
          },

          onError(error) {
            notification.error({
              message: JSON.stringify(error)
            });
          }

        });
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input.Search, {
          loading: isLoading,
          prefix: 'Hello ',
          placeholder: 'Hello to ...',
          onSearch: v => hello(v),
          enterButton: 'Send'
        }));
      };

      function useAsyncInterval(handler, interval, {
        initialDelay = interval,
        onError = e => console.error(e)
      } = {}) {
        const ref = useRef();
        const close = useMemo(() => () => {
          clearInterval(ref.current);
          ref.current = null;
        }, []);
        useEffect(() => {
          const tick = async (...args) => {
            try {
              await handler(...args);
            } catch (e) {
              onError(e);
            }

            if (ref.current) {
              ref.current = setTimeout(tick, interval);
            }
          };

          ref.current = setTimeout(tick, initialDelay);
          return close;
        }, [interval]);
        return close;
      }

      const ServerTimeOffset = exports('ServerTimeOffset', () => {
        const [offset, setOffset] = useState({
          a: 0,
          b: 0,
          c: 0
        });
        const svc = consumeClientService(PingService);
        useAsyncInterval(async () => {
          const a = Date.now();
          const svr = await svc.now();
          const b = Date.now();
          setOffset({
            a: svr - a,
            b: b - svr,
            c: b - a
          });
        }, 1000);
        return /*#__PURE__*/React.createElement("div", null, "TimeOffset: C \u2192 S ", offset.a, "ms; S \u2192 C ", offset.b, "ms; C \u2192 S \u2192 C ", offset.c, "ms");
      });
      const PingServiceTest = exports('PingServiceTest', () => {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PingButton, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(HelloButton, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ServerTimeOffset, null));
      });

      console.log('Load test module');
      const utils = exports('utils', {
        camelCase
      });
      const lifecycles = singleSpaReact({
        React,
        ReactDOM,
        rootComponent: TestPanel,

        errorBoundary(err, info, props) {
          // Customize the root error boundary for your microfrontend here.
          return null;
        }

      });
      const {
        bootstrap,
        mount,
        unmount
      } = lifecycles; exports({ bootstrap: bootstrap, mount: mount, unmount: unmount });

    }
  };
});
//# sourceMappingURL=wener-apis-test.system.js.map
