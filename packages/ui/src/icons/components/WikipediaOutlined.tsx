import React, { ForwardRefRenderFunction } from 'react';
import WikipediaOutlinedSvg from './../svgr/WikipediaOutlined';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const WikipediaOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: WikipediaOutlinedSvg,
    }),
  );
};

WikipediaOutlined.displayName = 'WikipediaOutlined';
export default React.forwardRef(WikipediaOutlined);
