import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import CertificateVerifiedFilledSvg from './../svgr/CertificateVerifiedFilled';
import { IconComponent, IconProps } from '../types';

const CertificateVerifiedFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: CertificateVerifiedFilledSvg,
    }),
  );
};

CertificateVerifiedFilled.displayName = 'CertificateVerifiedFilled';
export default forwardRef(CertificateVerifiedFilled);
