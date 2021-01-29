import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import QrcodeReadOutlinedSvg from './../svgr/QrcodeReadOutlined';
import { IconComponent, IconProps } from '../types';

const QrcodeReadOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: QrcodeReadOutlinedSvg,
    }),
  );
};

QrcodeReadOutlined.displayName = 'QrcodeReadOutlined';
export default forwardRef(QrcodeReadOutlined);
