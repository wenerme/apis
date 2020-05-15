import {
  ApiOutlined,
  BookOutlined,
  FormatPainterOutlined,
  GithubOutlined,
  HomeOutlined,
  RetweetOutlined,
  ToolOutlined,
} from '@ant-design/icons/lib';
import { Button, Col, PageHeader, Result, Row } from 'antd';
import React from 'react';

export const WenerApisWelcome: React.FC<{ title?: string; subTitle?: string; icon?: React.ReactNode }> = (props) => {
  const { title = `Wener's APIs`, subTitle = '', icon = <ApiOutlined />, children } = props;
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
        <Button type="primary" key="github" href={'https://github.com/wenerme/apis'} icon={<GithubOutlined />}>
          wenerme/apis
        </Button>,
        <Button key="apis" href="https://apis.wener.me" icon={<ApiOutlined />}>
          APIs
        </Button>,
      ]}
    >
      <div>
        <Row>
          <Col span={12}>
            <PageHeader title={'Site'} />
            <div>
              <ul>
                <li>
                  <Button type="link" href={'https://wener.me'}>
                    wener.me
                  </Button>
                  <ul>
                    <li>
                      <Button icon={<GithubOutlined />} type="link" href={'https://github.com/wenerme/wener'}>
                        wenerme/wener
                      </Button>
                    </li>
                    <li>
                      <Button type="link" href="https://travis-ci.com/wenerme/wener">
                        <img src="https://travis-ci.com/wenerme/wener.svg?branch=master" alt="" />
                      </Button>
                    </li>
                  </ul>
                </li>
                <li>
                  <Button type="link" href={'https://apis.wener.me'}>
                    apis.wener.me
                  </Button>
                  <ul>
                    <li>
                      <Button icon={<GithubOutlined />} type="link" href={'https://github.com/wenerme/apis'}>
                        wenerme/apis
                      </Button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </Col>
          <Col span={12}>
            <PageHeader title={'Library'} />
            <div>
              <ul>
                <li>
                  <Button icon={<ToolOutlined />} type="link" href={'https://www.npmjs.com/package/@wener/utils'}>
                    @wener/utils
                  </Button>
                  <ul>
                    <li>
                      <Button icon={<BookOutlined />} type="link" href="https://apis.wener.me/docs/@wener/utils/">
                        Document
                      </Button>
                    </li>
                    <li>
                      <img src={'https://img.shields.io/npm/l/@wener/utils'} />
                      -
                      <img src={'https://img.shields.io/npm/v/@wener/utils'} />
                    </li>
                  </ul>
                </li>

                <li>
                  <Button icon={<GithubOutlined />} type="link" href={'https://www.npmjs.com/package/@wener/ui'}>
                    @wener/ui
                  </Button>
                  <ul>
                    <li>
                      <Button icon={<FormatPainterOutlined />} type="link" href="https://apis.wener.me/storybook/">
                        Storybook
                      </Button>
                      -
                      <Button icon={<BookOutlined />} type="link" href="https://apis.wener.me/docs/@wener/ui/">
                        Document
                      </Button>
                    </li>
                    <li>
                      <img src={'https://img.shields.io/npm/l/@wener/ui'} />
                      -
                      <img src={'https://img.shields.io/npm/v/@wener/ui'} />
                    </li>
                  </ul>
                </li>

                <li>
                  <Button icon={<RetweetOutlined />} type="link" href={'https://www.npmjs.com/package/@wener/tinyrpc'}>
                    @wener/tinyrpc
                  </Button>
                  <ul>
                    <li>
                      <Button icon={<BookOutlined />} type="link" href="https://apis.wener.me/docs/@wener/tinyrpc/">
                        Document
                      </Button>
                    </li>
                    <li>
                      <img src={'https://img.shields.io/npm/l/@wener/tinyrpc'} />
                      -
                      <img src={'https://img.shields.io/npm/v/@wener/tinyrpc'} />
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        {/*<PageHeader title={<div>文档</div>} backIcon={false} />
        <div>
          {docs.map(({ label, url, icon }) => (
            <div key={url}>
              <Button type="link" href={url} icon={icon}>
                {label}
              </Button>
            </div>
          ))}
        </div>*/}
        {children}
      </div>
    </Result>
  );
};
