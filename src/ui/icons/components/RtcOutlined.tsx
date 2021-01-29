import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import RtcOutlinedSvg from './../svgr/RtcOutlined';
import { IconComponent, IconProps } from '../types';

const RtcOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: RtcOutlinedSvg,
    }),
  );
};

RtcOutlined.displayName = 'RtcOutlined';
export default forwardRef(RtcOutlined);
