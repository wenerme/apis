import React, { ForwardRefRenderFunction } from 'react';
import CaCertificateOutlinedSvg from './../svgr/CaCertificateOutlined';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CaCertificateOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: CaCertificateOutlinedSvg,
    }),
  );
};

CaCertificateOutlined.displayName = 'CaCertificateOutlined';
export default React.forwardRef(CaCertificateOutlined);
