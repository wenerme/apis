import React, {ForwardRefRenderFunction} from 'react';
import MagnetOutlinedSvg from '../../public/icons/svg/magnet-outlined.svg'
import Icon, {IconComponentProps} from '@ant-design/icons/lib/components/Icon';

const MagnetOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(Icon, Object.assign({}, props, {
    ref,
    component: MagnetOutlinedSvg
  }));
};

MagnetOutlined.displayName = 'MagnetOutlined';
export default React.forwardRef(MagnetOutlined);
