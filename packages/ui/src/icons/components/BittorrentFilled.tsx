import React, { ForwardRefRenderFunction } from 'react';
import BittorrentFilledSvg from './../svgr/BittorrentFilled';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const BittorrentFilled: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: BittorrentFilledSvg,
    }),
  );
};

BittorrentFilled.displayName = 'BittorrentFilled';
export default React.forwardRef(BittorrentFilled);
