import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import UTorrentFilledSvg from './../svgr/UTorrentFilled';
import { IconComponent, IconProps } from '../types';

const UTorrentFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: UTorrentFilledSvg,
    }),
  );
};

UTorrentFilled.displayName = 'UTorrentFilled';
export default forwardRef(UTorrentFilled);
