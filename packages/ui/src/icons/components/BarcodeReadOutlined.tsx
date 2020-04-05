import React, { ForwardRefRenderFunction } from 'react';
import BarcodeReadOutlinedSvg from '../svgs/BarcodeReadOutlined.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const BarcodeReadOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: BarcodeReadOutlinedSvg,
    }),
  );
};

BarcodeReadOutlined.displayName = 'BarcodeReadOutlined';
export default React.forwardRef(BarcodeReadOutlined);