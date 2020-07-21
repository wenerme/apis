import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import HashLockSvg from './../svgr/HashLock'
import {IconProps,IconComponent} from '../types'

const HashLock: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: HashLockSvg
  }));
};

HashLock.displayName = 'HashLock';
export default forwardRef(HashLock);
