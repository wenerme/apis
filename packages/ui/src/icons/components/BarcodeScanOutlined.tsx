import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import BarcodeScanOutlinedSvg from './../svgr/BarcodeScanOutlined'
import {IconProps,IconComponent} from '../types'

const BarcodeScanOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: BarcodeScanOutlinedSvg
  }));
};

BarcodeScanOutlined.displayName = 'BarcodeScanOutlined';
export default forwardRef(BarcodeScanOutlined);
