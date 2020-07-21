import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import QrcodeReadOutlinedSvg from './../svgr/QrcodeReadOutlined'
import {IconProps,IconComponent} from '../types'
import Icon from '@ant-design/icons';

const QrcodeReadOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: QrcodeReadOutlinedSvg
  }));
};

QrcodeReadOutlined.displayName = 'QrcodeReadOutlined';
export default forwardRef(QrcodeReadOutlined);
