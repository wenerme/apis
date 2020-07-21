import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import QrcodeReadOutlinedSvg from './../svgr/QrcodeReadOutlined'
import {IconProps,IconComponent} from '../types'

const QrcodeReadOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: QrcodeReadOutlinedSvg
  }));
};

QrcodeReadOutlined.displayName = 'QrcodeReadOutlined';
export default forwardRef(QrcodeReadOutlined);
