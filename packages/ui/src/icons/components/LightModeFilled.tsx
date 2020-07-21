import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import LightModeFilledSvg from './../svgr/LightModeFilled'
import {IconProps,IconComponent} from '../types'
import Icon from '@ant-design/icons';

const LightModeFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: LightModeFilledSvg
  }));
};

LightModeFilled.displayName = 'LightModeFilled';
export default forwardRef(LightModeFilled);
