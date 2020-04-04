import React, { ForwardRefRenderFunction } from 'react';
import BtFileFilledSvg from '../svgs/BtFileFilled.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const BtFileFilled: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: BtFileFilledSvg,
    }),
  );
};

BtFileFilled.displayName = 'BtFileFilled';
export default React.forwardRef(BtFileFilled);
