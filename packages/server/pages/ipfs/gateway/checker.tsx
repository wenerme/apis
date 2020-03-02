import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import {GatewayChecker} from 'modules/ipfs/components/GatewayChecker';
import Head from 'next/head';
import React from 'react';
import {Alert, PageHeader} from 'antd';
import {PublicGateways} from 'libs/ipfs/gateway/gateways';
import {FileOutlined} from '@ant-design/icons';


const Page = () => {
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>IPFS 公共网关检测</title>
        </Head>
        <PageHeader
          title={
            <div>
              <FileOutlined style={{marginRight: 8}} />
              IPFS 公共网关检测
            </div>
          }
          backIcon={false}
        />

        <GatewayChecker gateways={PublicGateways} />

        <div style={{marginTop: 18}}>
          <Alert
            type="info"
            showIcon
            message={(
              <div>
                基础检测逻辑和网关列表来源于
                <a href="https://github.com/ipfs/public-gateway-checker" target="_blank">ipfs/public-gateway-checker</a>。
                扩展了部分额外的异常检测。
              </div>
            )}
          />
        </div>
      </PageContent>
    </PageLayout>
  )
};

export default Page
