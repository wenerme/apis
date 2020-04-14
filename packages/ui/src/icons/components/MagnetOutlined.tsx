import React, { ForwardRefRenderFunction } from 'react';
import MagnetOutlinedSvg from './../svgr/MagnetOutlined';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const MagnetOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: MagnetOutlinedSvg,
    }),
  );
};

MagnetOutlined.displayName = 'MagnetOutlined';
export default React.forwardRef(MagnetOutlined);
