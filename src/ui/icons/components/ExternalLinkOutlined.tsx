import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import ExternalLinkOutlinedSvg from './../svgr/ExternalLinkOutlined'
import {IconProps,IconComponent} from '../types'

const ExternalLinkOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: ExternalLinkOutlinedSvg
  }));
};

ExternalLinkOutlined.displayName = 'ExternalLinkOutlined';
export default forwardRef(ExternalLinkOutlined);