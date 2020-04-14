import React, { ForwardRefRenderFunction } from 'react';
import ExternalLinkOutlinedSvg from './../svgr/ExternalLinkOutlined';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const ExternalLinkOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(
    Icon,
    Object.assign({}, props, {
      ref,
      component: ExternalLinkOutlinedSvg,
    }),
  );
};

ExternalLinkOutlined.displayName = 'ExternalLinkOutlined';
export default React.forwardRef(ExternalLinkOutlined);
