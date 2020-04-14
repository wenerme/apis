import React from 'react';
import { useAntdTheme } from '@wener/ui/src/antds';
import { FormatPainterOutlined } from '@ant-design/icons/lib';
import { WenerApisWelcome } from '@wener/ui/src/components/WenerApisWelcome';

export default { title: 'Welcome' };

export const WenerUi = () => {
  useAntdTheme({ theme: 'light' });
  return (
    <WenerApisWelcome icon={<FormatPainterOutlined />} title="UI Toolkit for daily use" subTitle="React ui suites" />
  );
};
