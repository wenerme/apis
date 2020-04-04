import React, { ForwardRefRenderFunction } from 'react';
import WebTorrentFilledSvg from '../svgs/WebTorrentFilled.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const WebTorrentFilled: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: WebTorrentFilledSvg,
    }),
  );
};

WebTorrentFilled.displayName = 'WebTorrentFilled';
export default React.forwardRef(WebTorrentFilled);
