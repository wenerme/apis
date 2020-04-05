import React, { ForwardRefRenderFunction } from 'react';
import WomenWithMicroPhoneFIlledSvg from './../svgs/WomenWithMicroPhoneFIlled.svg';
import Icon, { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const WomenWithMicroPhoneFIlled: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(Icon, Object.assign({}, props, {
    ref,
    component: WomenWithMicroPhoneFIlledSvg
  }));
};

WomenWithMicroPhoneFIlled.displayName = 'WomenWithMicroPhoneFIlled';
export default React.forwardRef(WomenWithMicroPhoneFIlled);
