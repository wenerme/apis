System.register(['react', '@wener/ui', 'antd'], function (exports) {
  'use strict';
  var useState, React, useRef, useConstant, useAsyncEffect, Alert, Descriptions;
  return {
    setters: [function (module) {
      useState = module.useState;
      React = module.default;
      useRef = module.useRef;
    }, function (module) {
      useConstant = module.useConstant;
      useAsyncEffect = module.useAsyncEffect;
    }, function (module) {
      Alert = module.Alert;
      Descriptions = module.Descriptions;
    }],
    execute: function () {

      // import type { HookedConsole } from 'console-feed/lib/definitions/Console';

      function usePosition(options) {
        const idRef = useRef();
        useAsyncEffect(async () => {
          const {
            console = window.console,
            onPosition = () => null,
            onError = console.error,
            onInfo = console.info,
            onWarn = console.warn
          } = options;

          if (!('geolocation' in navigator)) {
            onError('无 geolocation 支持');
            return;
          }

          await new Promise((resolve, reject) => {
            if ('permissions' in navigator) {
              onInfo('有 permissions 支持');
              navigator.permissions.query({
                name: 'geolocation'
              }).then(result => {
                if (result.state === 'granted') {
                  onInfo('已授权');
                  resolve(true);
                } else if (result.state === 'prompt') {
                  onWarn('待请求授权');
                  resolve(false);
                } else {
                  onError('未授权 ' + JSON.stringify(result));
                  resolve(false);
                }
              });
            } else {
              onError('无 permissions 支持');
              resolve(false);
            }
          });
          onInfo('开始获取定位... 超时=15秒');
          let watchId;

          try {
            idRef.current = watchId = navigator.geolocation.getCurrentPosition(position => {
              onInfo('获取定位成功', position);
              onPosition(position);
              onInfo('开始进行持续定位');
              navigator.geolocation.watchPosition(position => {
                onInfo('更新定位', position);
                onPosition(position);
              }, error => {
                onWarn('持续定位失败 code:' + error.code + '  message:' + error.message, error);
              }, {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
              });
            }, error => {
              onError('获取失败 code:' + error.code + '  message:' + error.message, error);
            }, {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 0
            });
          } catch (e) {
            onError('操作失败', e);
          }

          return () => navigator.geolocation.clearWatch(watchId);
        }, []);
        return () => {
          if (idRef.current) {
            navigator.geolocation.clearWatch(idRef.current);
            idRef.current = null;
          }
        };
      }

      function createFakeConsole({
        onRecord
      }) {
        const levels = ['log', 'debug', 'info', 'warn', 'error', 'table', 'clear', 'time', 'timeEnd', 'count', 'assert'];
        const c = {};
        levels.forEach(v => c[v] = (...message) => onRecord({
          level: v,
          message
        }));
        return c;
      }

      const LocationMeLite = exports('LocationMeLite', () => {
        const [logs, setLogs] = useState([]);
        const [position, setPosition] = useState(null);
        const con = useConstant(() => createFakeConsole({
          onRecord: r => {
            console[r.level](...r.message);
            setLogs(v => [...v, r]);
          }
        }));
        usePosition({
          onPosition: setPosition,
          console: con
        });
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "\u5B9A\u4F4D\u4FE1\u606F"), position && /*#__PURE__*/React.createElement(LocationDescription, {
          position: position
        }), !position && /*#__PURE__*/React.createElement("div", null, "\u83B7\u53D6\u4E2D\u3002\u3002\u3002"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "\u65E5\u5FD7"), /*#__PURE__*/React.createElement("div", {
          style: {
            padding: 16
            /*console-feed color backgroundColor: '#242424', */

          }
        }, logs.map((v, i) => /*#__PURE__*/React.createElement(Alert, {
          style: {
            border: 'none'
          },
          showIcon: true,
          key: i,
          type: {
            info: 'info',
            warn: 'warning',
            error: 'error'
          }[v.level] || 'info',
          message: String(v.message)
        })))));
      });
      const LocationDescription = exports('LocationDescription', ({
        position
      }) => {
        if (!position) {
          return /*#__PURE__*/React.createElement("div", null, "\u83B7\u53D6\u4E2D...");
        }

        const {
          latitude,
          longitude,
          accuracy,
          altitude,
          altitudeAccuracy,
          heading,
          speed
        } = position.coords;
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Descriptions, null, /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u5750\u6807 (lat,lon)"
        }, `${latitude},${longitude}`), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u5750\u6807\u7CBE\u5EA6"
        }, accuracy, " \u7C73"), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u9AD8\u5EA6"
        }, altitude), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u9AD8\u5EA6\u7CBE\u5EA6"
        }, altitudeAccuracy, " \u7C73"), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u671D\u5411"
        }, heading), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u901F\u5EA6"
        }, speed)));
      });

      var title = "定位工具";
      var description = "基于HTML技术获取定位信息";
      var metadata = exports('metadata', {
      	title: title,
      	description: description
      });

    }
  };
});
//# sourceMappingURL=wener-apis-geo.system.js.map
