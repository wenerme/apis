System.register(['@wener/apis-client', 'react', 'react-query', 'antd', '@wener/apis-password'], function (exports) {
  'use strict';
  var consumeClientService, PasswordStrengthService, React, useState, usePaginatedQuery, Alert, Input, Spin, notification, Descriptions, ZxcvbnDescription$1;
  return {
    setters: [function (module) {
      consumeClientService = module.consumeClientService;
      PasswordStrengthService = module.PasswordStrengthService;
    }, function (module) {
      React = module.default;
      useState = module.useState;
    }, function (module) {
      usePaginatedQuery = module.usePaginatedQuery;
    }, function (module) {
      Alert = module.Alert;
      Input = module.Input;
      Spin = module.Spin;
      notification = module.notification;
      Descriptions = module.Descriptions;
    }, function (module) {
      ZxcvbnDescription$1 = module.ZxcvbnDescription;
    }],
    execute: function () {

      const PasswordSiteNote = () => /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 18
        }
      }, /*#__PURE__*/React.createElement(Alert, {
        type: "info",
        showIcon: true,
        message: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
          href: "https://en.wikipedia.org/wiki/Password_strength",
          target: "_blank",
          rel: "noopener noreferrer"
        }, "\u5BC6\u7801\u5F3A\u5EA6"), "\u7B97\u6CD5\u4F7F\u7528", /*#__PURE__*/React.createElement("a", {
          href: "https://blogs.dropbox.com/tech/2012/04/zxcvbn-realistic-password-strength-estimation/",
          target: "_blank",
          rel: "noopener noreferrer"
        }, "zxcvbn"), ' ', "\u3002")
      }));

      const PasswordStrength = ({
        loading,
        value,
        data,
        onChange
      }) => {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'grid',
            gap: 12
          }
        }, /*#__PURE__*/React.createElement(Input.Search, {
          disabled: loading,
          loading: loading,
          placeholder: "\u68C0\u6D4B\u5BC6\u7801",
          value: value,
          onChange: v => onChange === null || onChange === void 0 ? void 0 : onChange(v.target.value)
        }), /*#__PURE__*/React.createElement(Spin, {
          spinning: loading,
          delay: 120
        }, /*#__PURE__*/React.createElement("h4", null, "\u68C0\u6D4B\u7ED3\u679C"), data && /*#__PURE__*/React.createElement(ZxcvbnDescription$1, {
          password: value,
          result: data
        })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "\u7ED3\u679C\u5185\u5BB9"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(data, null, '  ')))), /*#__PURE__*/React.createElement(PasswordSiteNote, null));
      };

      const PasswordStrengthContent = exports('PasswordStrengthContent', ({
        password: initialPassword,
        initialData
      }) => {
        const svg = consumeClientService(PasswordStrengthService);
        const [password, setPassword] = useState(initialPassword || (initialData === null || initialData === void 0 ? void 0 : initialData.password) || '123456');
        const {
          isLoading,
          resolvedData
        } = usePaginatedQuery(['zxcvbn', password], (_, password) => svg.zxcvbn(password), {
          enabled: true,
          initialData: initialData,
          staleTime: 120,

          onError(error) {
            notification.error({
              message: `Failed to request zxcvbn: ${String(error)}`
            });
          }

        });
        return /*#__PURE__*/React.createElement(PasswordStrength, {
          loading: isLoading,
          value: password,
          onChange: setPassword,
          data: resolvedData
        });
      });

      const ZxcvbnDescription = exports('ZxcvbnDescription', ({
        password,
        result
      }) => {
        const {
          score,
          guesses,
          guesses_log10,
          feedback,
          crack_times_display: times
        } = result;
        /*
        "sequence": [
          {
            "pattern": "dictionary",
            "i": 0,
            "j": 4,
            "token": "wener",
            "matched_word": "renew",
            "rank": 5472,
            "dictionary_name": "us_tv_and_film",
            "reversed": true,
            "l33t": false,
            "base_guesses": 5472,
            "uppercase_variations": 1,
            "l33t_variations": 1,
            "guesses": 10944,
            "guesses_log10": 4.039176084376041
          }
        ],
        "calc_time": 1,
         */

        const scoreColors = ['#D50000', '#F44336', '#FF5722', '#FFC107', '#43A047'];
        const crackTimes = [{
          label: '100 个每小时',
          speedTip: '被限流的在线破解速度',
          value: times.online_throttling_100_per_hour
        }, {
          label: '10 个每秒',
          speedTip: '未被限流的在线破解速度',
          value: times.online_no_throttling_10_per_second
        }, {
          label: '10,000 个每秒',
          speedTip: '离线破解, 较慢的算法, 多核',
          value: times.offline_slow_hashing_1e4_per_second
        }, {
          label: '10亿 个每秒',
          speedTip: '离线破解, 较快的算法, 多核',
          value: times.offline_fast_hashing_1e10_per_second
        }];
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Descriptions, {
          bordered: true
        }, /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: '密码'
        }, password), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: '强度分数'
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            color: scoreColors[score]
          }
        }, score), "/4"), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: '猜测次数'
        }, /*#__PURE__*/React.createElement("div", null, guesses), /*#__PURE__*/React.createElement("div", null, guesses_log10.toFixed(6), " ", /*#__PURE__*/React.createElement("small", null, "LOG10"))), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: '建议',
          span: 3
        }, feedback.warning && /*#__PURE__*/React.createElement("div", {
          style: {
            color: scoreColors[2]
          }
        }, feedback.warning), /*#__PURE__*/React.createElement("ul", null, feedback.suggestions.map(v => /*#__PURE__*/React.createElement("li", {
          key: v
        }, v)))), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: '破解时间',
          span: 3
        }, crackTimes.map(({
          label,
          speedTip,
          value
        }) => /*#__PURE__*/React.createElement("div", {
          key: label
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 'bold'
          }
        }, label, ":"), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: '1.2rem',
            padding: '0 8px'
          }
        }, value), " (", speedTip, ")")))));
      });

      var title = "密码校验";
      var description = "Zxcvvn 密码强度检测";
      var metadata = exports('metadata', {
      	title: title,
      	description: description
      });

    }
  };
});
//# sourceMappingURL=wener-apis-password.system.js.map
