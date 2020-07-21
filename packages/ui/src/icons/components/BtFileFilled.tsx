import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import BtFileFilledSvg from './../svgr/BtFileFilled'
import {IconProps,IconComponent} from '../types'

const BtFileFilled: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: BtFileFilledSvg
  }));
};

BtFileFilled.displayName = 'BtFileFilled';
export default forwardRef(BtFileFilled);
