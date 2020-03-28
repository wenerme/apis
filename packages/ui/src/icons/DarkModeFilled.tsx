import React, { ForwardRefRenderFunction } from 'react';
import DarkModeFilledSvg from './svgs/DarkModeFilled.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const DarkModeFilled: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(Icon, Object.assign({}, props, {
    ref,
    component: DarkModeFilledSvg
  }));
};

DarkModeFilled.displayName = 'DarkModeFilled';
export default React.forwardRef(DarkModeFilled);
