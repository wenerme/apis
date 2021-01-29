import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import BittorrentFilledSvg from './../svgr/BittorrentFilled';
import { IconComponent, IconProps } from '../types';

const BittorrentFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: BittorrentFilledSvg,
    }),
  );
};

BittorrentFilled.displayName = 'BittorrentFilled';
export default forwardRef(BittorrentFilled);
