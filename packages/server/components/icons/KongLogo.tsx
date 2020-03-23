import React, { ForwardRefRenderFunction } from 'react';
import KongLogoSvg from '../../public/icons/svg/kong-logo.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const KongLogo: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: KongLogoSvg,
    })
  );
};

KongLogo.displayName = 'KongLogo';
export default React.forwardRef(KongLogo);
