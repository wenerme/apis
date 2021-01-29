import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import ManTiedOutlinedSvg from './../svgr/ManTiedOutlined';
import { IconComponent, IconProps } from '../types';

const ManTiedOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: ManTiedOutlinedSvg,
    }),
  );
};

ManTiedOutlined.displayName = 'ManTiedOutlined';
export default forwardRef(ManTiedOutlined);
