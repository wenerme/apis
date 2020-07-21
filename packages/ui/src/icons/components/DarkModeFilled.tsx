import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import DarkModeFilledSvg from './../svgr/DarkModeFilled'
import {IconProps,IconComponent} from '../types'
import Icon from '@ant-design/icons';

const DarkModeFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: DarkModeFilledSvg
  }));
};

DarkModeFilled.displayName = 'DarkModeFilled';
export default forwardRef(DarkModeFilled);
