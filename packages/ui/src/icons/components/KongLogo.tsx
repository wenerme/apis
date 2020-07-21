import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import KongLogoSvg from './../svgr/KongLogo'
import {IconProps,IconComponent} from '../types'

const KongLogo: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: KongLogoSvg
  }));
};

KongLogo.displayName = 'KongLogo';
export default forwardRef(KongLogo);
