import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import DarkModeFilledSvg from './../svgr/DarkModeFilled';
import { IconComponent, IconProps } from '../types';

const DarkModeFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: DarkModeFilledSvg,
    }),
  );
};

DarkModeFilled.displayName = 'DarkModeFilled';
export default forwardRef(DarkModeFilled);
