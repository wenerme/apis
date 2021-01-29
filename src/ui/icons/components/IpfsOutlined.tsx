import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import IpfsOutlinedSvg from './../svgr/IpfsOutlined'
import {IconProps,IconComponent} from '../types'

const IpfsOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: IpfsOutlinedSvg
  }));
};

IpfsOutlined.displayName = 'IpfsOutlined';
export default forwardRef(IpfsOutlined);