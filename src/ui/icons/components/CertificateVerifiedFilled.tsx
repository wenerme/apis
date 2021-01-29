import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import CertificateVerifiedFilledSvg from './../svgr/CertificateVerifiedFilled'
import {IconProps,IconComponent} from '../types'

const CertificateVerifiedFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: CertificateVerifiedFilledSvg
  }));
};

CertificateVerifiedFilled.displayName = 'CertificateVerifiedFilled';
export default forwardRef(CertificateVerifiedFilled);