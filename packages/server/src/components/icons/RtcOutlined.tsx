import React, { ForwardRefRenderFunction } from 'react';
import RtcOutlinedSvg from '../../../public/icons/svg/rtc-outlined.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const RtcOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: RtcOutlinedSvg,
    })
  );
};

RtcOutlined.displayName = 'RtcOutlined';
export default React.forwardRef(RtcOutlined);
