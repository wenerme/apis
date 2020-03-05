import React, {ForwardRefRenderFunction} from 'react';
import TorrentSolidSvg from '../../public/icons/svg/torrent-solid.svg'
import Icon, {IconComponentProps} from '@ant-design/icons/lib/components/Icon';

const TorrentSolid: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(Icon, Object.assign({}, props, {
    ref,
    component: TorrentSolidSvg
  }));
};

TorrentSolid.displayName = 'TorrentSolid';
export default React.forwardRef(TorrentSolid);
