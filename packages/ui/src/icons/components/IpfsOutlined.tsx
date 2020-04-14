import React, { ForwardRefRenderFunction } from 'react';
import IpfsOutlinedSvg from './../svgr/IpfsOutlined';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const IpfsOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: IpfsOutlinedSvg,
    }),
  );
};

IpfsOutlined.displayName = 'IpfsOutlined';
export default React.forwardRef(IpfsOutlined);
