import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import CaCertificateOutlinedSvg from './../svgr/CaCertificateOutlined'
import {IconProps,IconComponent} from '../types'
import Icon from '@ant-design/icons';

const CaCertificateOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: CaCertificateOutlinedSvg
  }));
};

CaCertificateOutlined.displayName = 'CaCertificateOutlined';
export default forwardRef(CaCertificateOutlined);
