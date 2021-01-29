import React from 'react';
import { QrCodeSiteNote } from 'src/modules/qrcode/components/QrCodeSiteNote';
import { QrCodeBuilder } from 'src/modules/qrcode/components/QrCodeBuilder';

export const QrCodeBuilderPlayground = () => {
  return (
    <div>
      <QrCodeBuilder />
      <QrCodeSiteNote />
    </div>
  );
};
