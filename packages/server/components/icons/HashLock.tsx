import React, { ForwardRefRenderFunction } from 'react';
import HashLockSvg from '../../public/icons/svg/hash-lock.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const HashLock: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: HashLockSvg,
    })
  );
};

HashLock.displayName = 'HashLock';
export default React.forwardRef(HashLock);
