import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import WikipediaOutlinedSvg from './../svgr/WikipediaOutlined';
import { IconComponent, IconProps } from '../types';

const WikipediaOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: WikipediaOutlinedSvg,
    }),
  );
};

WikipediaOutlined.displayName = 'WikipediaOutlined';
export default forwardRef(WikipediaOutlined);
