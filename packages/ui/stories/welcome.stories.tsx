import React from 'react';
import { Button, Result } from 'antd';
import { useAntdTheme } from '@wener/apis-server/src/hooks/useAntdTheme';
import { ApiOutlined, FormatPainterOutlined, GithubOutlined, HomeOutlined } from '@ant-design/icons/lib';

export default { title: 'Welcome' };

export const WenerUi = () => {
  useAntdTheme({ theme: 'light' });
  return (
    <Result
      icon={<FormatPainterOutlined />}
      status="success"
      title="UI Toolkit for daily use"
      subTitle="React ui suites"
      extra={[
        <Button key="wener" href="https://wener.me" icon={<HomeOutlined />}>
          Home
        </Button>,
        <Button type="primary" key="github" icon={<GithubOutlined />}>
          wenerme/apis
        </Button>,
        <Button key="apis" href="https://apis.wener.me" icon={<ApiOutlined />}>
          APIs
        </Button>
      ]}
    />
  );
};
