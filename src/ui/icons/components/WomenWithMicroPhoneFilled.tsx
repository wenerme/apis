import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import WomenWithMicroPhoneFilledSvg from './../svgr/WomenWithMicroPhoneFilled';
import { IconComponent, IconProps } from '../types';

const WomenWithMicroPhoneFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: WomenWithMicroPhoneFilledSvg,
    }),
  );
};

WomenWithMicroPhoneFilled.displayName = 'WomenWithMicroPhoneFilled';
export default forwardRef(WomenWithMicroPhoneFilled);
