import React, { ForwardRefRenderFunction } from 'react';
import ManTiedOutlinedSvg from './../svgs/ManTiedOutlined.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const ManTiedOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(Icon, Object.assign({}, props, {
    ref,
    component: ManTiedOutlinedSvg
  }));
};

ManTiedOutlined.displayName = 'ManTiedOutlined';
export default React.forwardRef(ManTiedOutlined);
