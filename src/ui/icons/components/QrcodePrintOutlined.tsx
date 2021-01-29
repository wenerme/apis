import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import QrcodePrintOutlinedSvg from './../svgr/QrcodePrintOutlined';
import { IconComponent, IconProps } from '../types';

const QrcodePrintOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: QrcodePrintOutlinedSvg,
    }),
  );
};

QrcodePrintOutlined.displayName = 'QrcodePrintOutlined';
export default forwardRef(QrcodePrintOutlined);
