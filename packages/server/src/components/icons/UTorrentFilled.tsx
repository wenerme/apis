import React, { ForwardRefRenderFunction } from 'react';
import UTorrentFilledSvg from '../../../public/icons/svg/UTorrent-filled.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const UTorrentFilled: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: UTorrentFilledSvg,
    })
  );
};

UTorrentFilled.displayName = 'UTorrentFilled';
export default React.forwardRef(UTorrentFilled);
