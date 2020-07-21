import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import TorrentFileFilledSvg from './../svgr/TorrentFileFilled'
import {IconProps,IconComponent} from '../types'
import Icon from '@ant-design/icons';

const TorrentFileFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: TorrentFileFilledSvg
  }));
};

TorrentFileFilled.displayName = 'TorrentFileFilled';
export default forwardRef(TorrentFileFilled);
