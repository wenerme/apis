import { createElement, forwardRef, ForwardRefRenderFunction } from 'react';
import HashLockSvg from './../svgr/HashLock';
import { IconComponent, IconProps } from '../types';

const HashLock: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(
    IconComponent,
    Object.assign({}, props, {
      ref,
      component: HashLockSvg,
    }),
  );
};

HashLock.displayName = 'HashLock';
export default forwardRef(HashLock);
