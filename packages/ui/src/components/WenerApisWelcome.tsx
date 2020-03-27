import {
  ApiOutlined,
  FormatPainterOutlined,
  GithubOutlined,
  HomeOutlined,
  RetweetOutlined,
  ToolOutlined
} from '@ant-design/icons/lib';
import { Button, PageHeader, Result } from 'antd';
import React from 'react';

export const WenerApisWelcome: React.FC<{ title?, subTitle?, icon? }> = (props) => {
  const { title = `Wener's APIs`, subTitle = '', icon = <ApiOutlined />, children } = props;
  const docs = [
    { url: 'https://apis.wener.me/storybook/', label: '@wener/ui Storybook', icon: <FormatPainterOutlined /> },
    { url: 'https://apis.wener.me/docs/@wener/utils/', label: '@wener/utils API Document', icon: <ToolOutlined /> },
    {
      url: 'https://apis.wener.me/docs/@wener/tinyrpc/',
      label: '@wener/tinyrpc API Document',
      icon: <RetweetOutlined />
    }
  ];
  return (
    <Result
      icon={icon}
      status="success"
      title={title}
      subTitle={subTitle}
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
    >
      <div>
        <PageHeader
          title={
            <div>
              文档
            </div>
          }
          backIcon={false}
        />
        <div>
          {docs.map(({ label, url, icon }) => (
            <div key={url}>
              <Button type="link" href={url} icon={icon}>
                {label}
              </Button>
            </div>
          ))}
        </div>
        {children}
      </div>
    </Result>
  );
};
