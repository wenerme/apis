import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import BittorrentFilledSvg from './../svgr/BittorrentFilled'
import {IconProps,IconComponent} from '../types'

const BittorrentFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: BittorrentFilledSvg
  }));
};

BittorrentFilled.displayName = 'BittorrentFilled';
export default forwardRef(BittorrentFilled);
