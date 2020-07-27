System.register(['antd', 'react', '@wener/apis-client', 'react-query'], function (exports) {
  'use strict';
  var Descriptions, Input, Spin, Alert, React, useState, useEffect, consumeClientService, PhoneAttributionService, useQuery;
  return {
    setters: [function (module) {
      Descriptions = module.Descriptions;
      Input = module.Input;
      Spin = module.Spin;
      Alert = module.Alert;
    }, function (module) {
      React = module.default;
      useState = module.useState;
      useEffect = module.useEffect;
    }, function (module) {
      consumeClientService = module.consumeClientService;
      PhoneAttributionService = module.PhoneAttributionService;
    }, function (module) {
      useQuery = module.useQuery;
    }],
    execute: function () {

      const PhoneAttributionDetail = ({
        data = {}
      }) => {
        const {
          prefix,
          number,
          vendor,
          province,
          city,
          zip,
          areaCode
        } = data;
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Descriptions, {
          title: "\u5F52\u5C5E\u5730\u4FE1\u606F",
          bordered: true
        }, /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u53F7\u7801",
          span: 2
        }, number), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u6709\u6548\u524D\u7F00"
        }, prefix), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u6240\u5C5E\u7701"
        }, province), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u6240\u5C5E\u5E02"
        }, city), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u8FD0\u8425\u5546"
        }, vendor), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u90AE\u7F16"
        }, zip), /*#__PURE__*/React.createElement(Descriptions.Item, {
          label: "\u533A\u53F7"
        }, areaCode)));
      };

      const PhoneAttributionContent = exports('PhoneAttributionContent', ({
        initialData,
        number: initialNumber
      }) => {
        const svc = consumeClientService(PhoneAttributionService);
        const [number, setNumber] = useState((initialData === null || initialData === void 0 ? void 0 : initialData.number) || initialNumber || '13000000000');
        const {
          isLoading,
          data,
          refetch
        } = useQuery(['phoneAttribution', number], (_, number) => svc.getAttribution({
          number
        }), {
          enabled: false,
          initialData
        });
        useEffect(() => {
          if (!initialData && number) {
            refetch();
          }
        }, []);
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          style: {
            marginTop: 18
          }
        }, /*#__PURE__*/React.createElement(Input.Search, {
          placeholder: "\u7535\u8BDD\u53F7\u7801",
          loading: isLoading,
          value: number,
          onChange: v => setNumber(v.target.value),
          onSearch: () => refetch()
        })), /*#__PURE__*/React.createElement("div", {
          style: {
            marginTop: 18
          }
        }, /*#__PURE__*/React.createElement(Spin, {
          spinning: isLoading
        }, /*#__PURE__*/React.createElement(PhoneAttributionDetail, {
          data: data
        }))), /*#__PURE__*/React.createElement("div", {
          style: {
            marginTop: 18
          }
        }, /*#__PURE__*/React.createElement("h4", null, "\u63A5\u53E3\u8FD4\u56DE\u7ED3\u679C"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(data, null, '  ')))), /*#__PURE__*/React.createElement("div", {
          style: {
            marginTop: 18
          }
        }, /*#__PURE__*/React.createElement(Alert, {
          type: "info",
          showIcon: true,
          message: /*#__PURE__*/React.createElement("div", null, "\u6570\u636E\u6765\u6E90\u4E8E", ' ', /*#__PURE__*/React.createElement("a", {
            href: "https://github.com/xluohome/phonedata",
            target: "_blank",
            rel: "noopener noreferrer"
          }, "xluohome/phonedata"), "\u3002")
        })));
      });

      var title = "电话号码工具";
      var description = "号码归属地查询";
      var metadata = exports('metadata', {
      	title: title,
      	description: description
      });

    }
  };
});
//# sourceMappingURL=wener-apis-phone.system.js.map
