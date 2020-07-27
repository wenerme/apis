System.register(['antd', 'react', '@wener/ui'], function (exports) {
  'use strict';
  var Layout, Menu, React, BoxShuffle;
  return {
    setters: [function (module) {
      Layout = module.Layout;
      Menu = module.Menu;
    }, function (module) {
      React = module.default;
    }, function (module) {
      BoxShuffle = module.BoxShuffle;
    }],
    execute: function () {

      const DashLayout = exports('DashLayout', ({
        children
      }) => {
        return /*#__PURE__*/React.createElement(Layout, null, /*#__PURE__*/React.createElement(Layout, {
          hasSider: true
        }, /*#__PURE__*/React.createElement(Layout.Sider, {
          theme: 'light',
          breakpoint: "md" // onBreakpoint={setBroken}
          // collapsedWidth={broken ? 0 : 80}
          // collapsible
          // collapsed={collapse}
          // onCollapse={(v) => setCollapse(v)}
          ,
          style: {
            height: '100%'
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            height: '100%',
            overflowY: 'auto'
          }
        }, /*#__PURE__*/React.createElement(Menu, {
          theme: 'light',
          mode: "inline" // style={style}
          // style={{minHeight: '100%', paddingBottom: 48}}
          // openKeys={menuOpenKeys}
          // onOpenChange={v => dispatch(setMenuOpenKeys(v))}
          // selectedKeys={[selected]}

        }, /*#__PURE__*/React.createElement(Menu.Item, null, /*#__PURE__*/React.createElement("div", null, "Go for it"))), /*#__PURE__*/React.createElement(BoxShuffle, null))), /*#__PURE__*/React.createElement(Layout, null, /*#__PURE__*/React.createElement(Layout.Content, {
          style: {
            maxHeight: '100%',
            overflowY: 'auto'
          }
        }, children))));
      });

      var title = "公共布局组件";
      var description = "Dashboard、Layout 等组件";
      var metadata = exports('metadata', {
      	title: title,
      	description: description
      });

    }
  };
});
//# sourceMappingURL=wener-apis-dash.system.js.map
