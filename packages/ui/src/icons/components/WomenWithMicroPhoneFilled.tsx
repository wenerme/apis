import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import WomenWithMicroPhoneFilledSvg from './../svgr/WomenWithMicroPhoneFilled'
import {IconProps,IconComponent} from '../types'

const WomenWithMicroPhoneFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: WomenWithMicroPhoneFilledSvg
  }));
};

WomenWithMicroPhoneFilled.displayName = 'WomenWithMicroPhoneFilled';
export default forwardRef(WomenWithMicroPhoneFilled);
