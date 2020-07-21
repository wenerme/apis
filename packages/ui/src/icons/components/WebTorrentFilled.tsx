import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import WebTorrentFilledSvg from './../svgr/WebTorrentFilled'
import {IconProps,IconComponent} from '../types'

const WebTorrentFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: WebTorrentFilledSvg
  }));
};

WebTorrentFilled.displayName = 'WebTorrentFilled';
export default forwardRef(WebTorrentFilled);
