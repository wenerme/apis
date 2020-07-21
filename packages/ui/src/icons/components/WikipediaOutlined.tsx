import {ForwardRefRenderFunction,forwardRef,createElement} from 'react';
import WikipediaOutlinedSvg from './../svgr/WikipediaOutlined'
import {IconProps,IconComponent} from '../types'
import Icon from '@ant-design/icons';

const WikipediaOutlined: ForwardRefRenderFunction<any, IconProps> = (props, ref) => {
  return createElement(IconComponent, Object.assign({}, props, {
    ref,
    component: WikipediaOutlinedSvg
  }));
};

WikipediaOutlined.displayName = 'WikipediaOutlined';
export default forwardRef(WikipediaOutlined);
