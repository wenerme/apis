import React, {ForwardRefRenderFunction} from 'react';
import BarcodePrintOutlinedSvg from '../../public/icons/svg/barcode-print-outlined.svg'
import Icon, {IconComponentProps} from '@ant-design/icons/lib/components/Icon';

const BarcodePrintOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(Icon, Object.assign({}, props, {
    ref,
    component: BarcodePrintOutlinedSvg
  }));
};

BarcodePrintOutlined.displayName = 'BarcodePrintOutlined';
export default React.forwardRef(BarcodePrintOutlined);
