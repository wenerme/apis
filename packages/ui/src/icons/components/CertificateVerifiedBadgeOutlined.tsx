import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import CertificateVerifiedBadgeOutlinedSvg from './../svgr/CertificateVerifiedBadgeOutlined'
import {IconProps,IconComponent} from '../types'

const CertificateVerifiedBadgeOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: CertificateVerifiedBadgeOutlinedSvg
  }));
};

CertificateVerifiedBadgeOutlined.displayName = 'CertificateVerifiedBadgeOutlined';
export default forwardRef(CertificateVerifiedBadgeOutlined);
