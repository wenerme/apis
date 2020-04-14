import React, { ForwardRefRenderFunction } from 'react';
import QrcodePrintOutlinedSvg from './../svgr/QrcodePrintOutlined';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const QrcodePrintOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: QrcodePrintOutlinedSvg,
    }),
  );
};

QrcodePrintOutlined.displayName = 'QrcodePrintOutlined';
export default React.forwardRef(QrcodePrintOutlined);
