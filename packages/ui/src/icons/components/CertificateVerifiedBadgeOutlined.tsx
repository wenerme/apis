import React, { ForwardRefRenderFunction } from 'react';
import CertificateVerifiedBadgeOutlinedSvg from '../svgs/CertificateVerifiedBadgeOutlined.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CertificateVerifiedBadgeOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: CertificateVerifiedBadgeOutlinedSvg,
    }),
  );
};

CertificateVerifiedBadgeOutlined.displayName = 'CertificateVerifiedBadgeOutlined';
export default React.forwardRef(CertificateVerifiedBadgeOutlined);
