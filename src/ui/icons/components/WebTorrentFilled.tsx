import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import WebTorrentFilledSvg from './../svgr/WebTorrentFilled';
import { IconComponent, IconProps } from '../types';

const WebTorrentFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: WebTorrentFilledSvg,
    }),
  );
};

WebTorrentFilled.displayName = 'WebTorrentFilled';
export default forwardRef(WebTorrentFilled);
