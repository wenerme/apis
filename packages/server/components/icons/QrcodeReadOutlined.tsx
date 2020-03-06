import React, {ForwardRefRenderFunction} from 'react';
import QrcodeReadOutlinedSvg from '../../public/icons/svg/qrcode-read-outlined.svg'
import Icon, {IconComponentProps} from '@ant-design/icons/lib/components/Icon';

const QrcodeReadOutlined: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return React.createElement(Icon, Object.assign({}, props, {
    ref,
    component: QrcodeReadOutlinedSvg
  }));
};

QrcodeReadOutlined.displayName = 'QrcodeReadOutlined';
export default React.forwardRef(QrcodeReadOutlined);
