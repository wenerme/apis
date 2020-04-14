import React, { ForwardRefRenderFunction } from 'react';
import LightModeFilledSvg from './../svgr/LightModeFilled';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const LightModeFilled: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: LightModeFilledSvg,
    }),
  );
};

LightModeFilled.displayName = 'LightModeFilled';
export default React.forwardRef(LightModeFilled);
