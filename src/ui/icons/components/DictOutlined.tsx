import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import DictOutlinedSvg from './../svgr/DictOutlined'
import {IconProps,IconComponent} from '../types'

const DictOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: DictOutlinedSvg
  }));
};

DictOutlined.displayName = 'DictOutlined';
export default forwardRef(DictOutlined);
