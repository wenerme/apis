import React, { ForwardRefRenderFunction } from 'react';
import LightModeeFilledSvg from '../../../public/icons/svg/LightModeFilled.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const LightModeFilled: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(Icon, Object.assign({}, props, {
    ref,
    component: LightModeeFilledSvg
  }));
};

LightModeFilled.displayName = 'LightModeFilled';
export default React.forwardRef(LightModeFilled);
