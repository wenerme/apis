System.register(['@ant-design/icons', 'antd', 'react'], function (exports) {
  'use strict';
  var HomeOutlined, GithubOutlined, ApiOutlined, ToolOutlined, BookOutlined, FormatPainterOutlined, RetweetOutlined, Result, Button, Row, Col, PageHeader, React;
  return {
    setters: [function (module) {
      HomeOutlined = module.HomeOutlined;
      GithubOutlined = module.GithubOutlined;
      ApiOutlined = module.ApiOutlined;
      ToolOutlined = module.ToolOutlined;
      BookOutlined = module.BookOutlined;
      FormatPainterOutlined = module.FormatPainterOutlined;
      RetweetOutlined = module.RetweetOutlined;
    }, function (module) {
      Result = module.Result;
      Button = module.Button;
      Row = module.Row;
      Col = module.Col;
      PageHeader = module.PageHeader;
    }, function (module) {
      React = module.default;
    }],
    execute: function () {

      var WenerApisWelcome = exports('WenerApisWelcome', function WenerApisWelcome(props) {
        var _props$title = props.title,
            title = _props$title === void 0 ? "Wener's APIs" : _props$title,
            _props$subTitle = props.subTitle,
            subTitle = _props$subTitle === void 0 ? '' : _props$subTitle,
            _props$icon = props.icon,
            icon = _props$icon === void 0 ? /*#__PURE__*/React.createElement(ApiOutlined, null) : _props$icon,
            children = props.children;
        return /*#__PURE__*/React.createElement(Result, {
          icon: icon,
          status: "success",
          title: title,
          subTitle: subTitle,
          extra: [/*#__PURE__*/React.createElement(Button, {
            key: "wener",
            href: "https://wener.me",
            icon: /*#__PURE__*/React.createElement(HomeOutlined, null)
          }, "Home"), /*#__PURE__*/React.createElement(Button, {
            type: "primary",
            key: "github",
            href: 'https://github.com/wenerme/apis',
            icon: /*#__PURE__*/React.createElement(GithubOutlined, null)
          }, "wenerme/apis"), /*#__PURE__*/React.createElement(Button, {
            key: "apis",
            href: "https://apis.wener.me",
            icon: /*#__PURE__*/React.createElement(ApiOutlined, null)
          }, "APIs")]
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
          span: 12
        }, /*#__PURE__*/React.createElement(PageHeader, {
          title: 'Site'
        }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Button, {
          type: "link",
          href: 'https://wener.me'
        }, "wener.me"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Button, {
          icon: /*#__PURE__*/React.createElement(GithubOutlined, null),
          type: "link",
          href: 'https://github.com/wenerme/wener'
        }, "wenerme/wener")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Button, {
          type: "link",
          href: "https://travis-ci.com/wenerme/wener"
        }, /*#__PURE__*/React.createElement("img", {
          src: "https://travis-ci.com/wenerme/wener.svg?branch=master",
          alt: ""
        }))))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Button, {
          type: "link",
          href: 'https://apis.wener.me'
        }, "apis.wener.me"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Button, {
          icon: /*#__PURE__*/React.createElement(GithubOutlined, null),
          type: "link",
          href: 'https://github.com/wenerme/apis'
        }, "wenerme/apis"))))))), /*#__PURE__*/React.createElement(Col, {
          span: 12
        }, /*#__PURE__*/React.createElement(PageHeader, {
          title: 'Library'
        }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Button, {
          icon: /*#__PURE__*/React.createElement(ToolOutlined, null),
          type: "link",
          href: 'https://www.npmjs.com/package/@wener/utils'
        }, "@wener/utils"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Button, {
          icon: /*#__PURE__*/React.createElement(BookOutlined, null),
          type: "link",
          href: "https://apis.wener.me/docs/@wener/utils/"
        }, "Document")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("img", {
          src: 'https://img.shields.io/npm/l/@wener/utils'
        }), "-", /*#__PURE__*/React.createElement("img", {
          src: 'https://img.shields.io/npm/v/@wener/utils'
        })))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Button, {
          icon: /*#__PURE__*/React.createElement(GithubOutlined, null),
          type: "link",
          href: 'https://www.npmjs.com/package/@wener/ui'
        }, "@wener/ui"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Button, {
          icon: /*#__PURE__*/React.createElement(FormatPainterOutlined, null),
          type: "link",
          href: "https://apis.wener.me/storybook/"
        }, "Storybook"), "-", /*#__PURE__*/React.createElement(Button, {
          icon: /*#__PURE__*/React.createElement(BookOutlined, null),
          type: "link",
          href: "https://apis.wener.me/docs/@wener/ui/"
        }, "Document")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("img", {
          src: 'https://img.shields.io/npm/l/@wener/ui'
        }), "-", /*#__PURE__*/React.createElement("img", {
          src: 'https://img.shields.io/npm/v/@wener/ui'
        })))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Button, {
          icon: /*#__PURE__*/React.createElement(RetweetOutlined, null),
          type: "link",
          href: 'https://www.npmjs.com/package/@wener/tinyrpc'
        }, "@wener/tinyrpc"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Button, {
          icon: /*#__PURE__*/React.createElement(BookOutlined, null),
          type: "link",
          href: "https://apis.wener.me/docs/@wener/tinyrpc/"
        }, "Document")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("img", {
          src: 'https://img.shields.io/npm/l/@wener/tinyrpc'
        }), "-", /*#__PURE__*/React.createElement("img", {
          src: 'https://img.shields.io/npm/v/@wener/tinyrpc'
        }))))))))), /*#__PURE__*/React.createElement("div", null, children));
      });

    }
  };
});
//# sourceMappingURL=wener-ui-wener.system.js.map
