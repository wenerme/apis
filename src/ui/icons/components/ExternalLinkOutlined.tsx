import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import ExternalLinkOutlinedSvg from './../svgr/ExternalLinkOutlined';
import { IconComponent, IconProps } from '../types';

const ExternalLinkOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: ExternalLinkOutlinedSvg,
    }),
  );
};

ExternalLinkOutlined.displayName = 'ExternalLinkOutlined';
export default forwardRef(ExternalLinkOutlined);
