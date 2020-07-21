import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import UTorrentFilledSvg from './../svgr/UTorrentFilled'
import {IconProps,IconComponent} from '../types'
import Icon from '@ant-design/icons';

const UTorrentFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: UTorrentFilledSvg
  }));
};

UTorrentFilled.displayName = 'UTorrentFilled';
export default forwardRef(UTorrentFilled);
