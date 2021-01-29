import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import TorrentFileFilledSvg from './../svgr/TorrentFileFilled';
import { IconComponent, IconProps } from '../types';

const TorrentFileFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: TorrentFileFilledSvg,
    }),
  );
};

TorrentFileFilled.displayName = 'TorrentFileFilled';
export default forwardRef(TorrentFileFilled);
