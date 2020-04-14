import React, { ForwardRefRenderFunction } from 'react';
import HashLockSvg from './../svgr/HashLock';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const HashLock: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: HashLockSvg,
    }),
  );
};

HashLock.displayName = 'HashLock';
export default React.forwardRef(HashLock);
