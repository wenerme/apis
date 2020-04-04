import React, { ForwardRefRenderFunction } from 'react';
import DictOutlinedSvg from '../svgs/DictOutlined.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const DictOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: DictOutlinedSvg,
    }),
  );
};

DictOutlined.displayName = 'DictOutlined';
export default React.forwardRef(DictOutlined);
