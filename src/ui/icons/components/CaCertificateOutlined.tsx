import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import CaCertificateOutlinedSvg from './../svgr/CaCertificateOutlined';
import { IconComponent, IconProps } from '../types';

const CaCertificateOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: CaCertificateOutlinedSvg,
    }),
  );
};

CaCertificateOutlined.displayName = 'CaCertificateOutlined';
export default forwardRef(CaCertificateOutlined);
