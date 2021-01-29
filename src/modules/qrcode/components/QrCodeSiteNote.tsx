import React from 'react';
import { Alert } from 'antd';

export const QrCodeSiteNote: React.FC = () => {
  return (
    <div style={{ marginTop: 18 }}>
      <Alert
        type="info"
        showIcon
        message={
          <div>
            二维码内容规格参考
            <a href="https://github.com/zxing/zxing/wiki/Barcode-Contents">Barcode-Contents</a> <br />
            开发库参考
            <ul>
              <li>
                <a href="https://github.com/zpao/qrcode.react">qrcode.react</a>
              </li>
              <li>
                <a href="https://github.com/cozmo/jsQR">jsQR</a>
              </li>
            </ul>
          </div>
        }
      />
    </div>
  );
};
