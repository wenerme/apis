import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import ManTiedOutlinedSvg from './../svgr/ManTiedOutlined'
import {IconProps,IconComponent} from '../types'

const ManTiedOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: ManTiedOutlinedSvg
  }));
};

ManTiedOutlined.displayName = 'ManTiedOutlined';
export default forwardRef(ManTiedOutlined);
