import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import MagnetOutlinedSvg from './../svgr/MagnetOutlined'
import {IconProps,IconComponent} from '../types'

const MagnetOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: MagnetOutlinedSvg
  }));
};

MagnetOutlined.displayName = 'MagnetOutlined';
export default forwardRef(MagnetOutlined);
