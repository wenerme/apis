import React, { ForwardRefRenderFunction } from 'react';
import CertificateVerifiedFilledSvg from './../svgr/CertificateVerifiedFilled';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CertificateVerifiedFilled: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: CertificateVerifiedFilledSvg,
    }),
  );
};

CertificateVerifiedFilled.displayName = 'CertificateVerifiedFilled';
export default React.forwardRef(CertificateVerifiedFilled);
