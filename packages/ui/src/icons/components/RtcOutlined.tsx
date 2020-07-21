import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import RtcOutlinedSvg from './../svgr/RtcOutlined'
import {IconProps,IconComponent} from '../types'

const RtcOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: RtcOutlinedSvg
  }));
};

RtcOutlined.displayName = 'RtcOutlined';
export default forwardRef(RtcOutlined);
