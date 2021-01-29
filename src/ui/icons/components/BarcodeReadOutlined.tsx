import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import BarcodeReadOutlinedSvg from './../svgr/BarcodeReadOutlined';
import { IconComponent, IconProps } from '../types';

const BarcodeReadOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: BarcodeReadOutlinedSvg,
    }),
  );
};

BarcodeReadOutlined.displayName = 'BarcodeReadOutlined';
export default forwardRef(BarcodeReadOutlined);
