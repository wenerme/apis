export function antdIconsDynamicResolver({ type }) {
  return import(
    /* webpackInclude: /\.js$/ */
    /* webpackChunkName: "antd-icons" */
    `@ant-design/icons/${type}`
  );
}
