import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import BarcodePrintOutlinedSvg from './../svgr/BarcodePrintOutlined'
import {IconProps,IconComponent} from '../types'
import Icon from '@ant-design/icons';

const BarcodePrintOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: BarcodePrintOutlinedSvg
  }));
};

BarcodePrintOutlined.displayName = 'BarcodePrintOutlined';
export default forwardRef(BarcodePrintOutlined);
