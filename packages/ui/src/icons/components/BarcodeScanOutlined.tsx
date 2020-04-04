import React, { ForwardRefRenderFunction } from 'react';
import BarcodeScanOutlinedSvg from '../svgs/BarcodeScanOutlined.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const BarcodeScanOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: BarcodeScanOutlinedSvg,
    }),
  );
};

BarcodeScanOutlined.displayName = 'BarcodeScanOutlined';
export default React.forwardRef(BarcodeScanOutlined);
