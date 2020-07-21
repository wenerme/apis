import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import BarcodeReadOutlinedSvg from './../svgr/BarcodeReadOutlined'
import {IconProps,IconComponent} from '../types'
import Icon from '@ant-design/icons';

const BarcodeReadOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: BarcodeReadOutlinedSvg
  }));
};

BarcodeReadOutlined.displayName = 'BarcodeReadOutlined';
export default forwardRef(BarcodeReadOutlined);
