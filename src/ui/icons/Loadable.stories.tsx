import loadable from '@loadable/component';
import React from 'react';
import type { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

export default {
  title: 'icons/loadable',
};

const LoadIcon = loadable<AntdIconProps>(
  (props) =>
    import(
      /* webpackInclude: /\.js$/ */
      `@ant-design/icons/${props.type}`
    ),
);

export const Demo = () => {
  return <LoadIcon type="AlertFilled" style={{ color: 'red' }} />;
};
