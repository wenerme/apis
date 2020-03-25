import React, { ForwardRefRenderFunction } from 'react';
import TorrentFileFilledSvg from '../../../public/icons/svg/torrent-file-filled.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const TorrentFileFilled: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: TorrentFileFilledSvg,
    })
  );
};

TorrentFileFilled.displayName = 'TorrentFileFilled';
export default React.forwardRef(TorrentFileFilled);
