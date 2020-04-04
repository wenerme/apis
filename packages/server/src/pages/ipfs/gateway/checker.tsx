import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { GatewayChecker } from 'src/modules/ipfs/components/GatewayChecker';
import React from 'react';
import { Alert, PageHeader } from 'antd';
import { PublicGateways } from 'src/libs/ipfs/gateway/gateways';
import { FileOutlined } from '@ant-design/icons';

const Page = () => {
  return (
    <PageLayout title="IPFS 公共网关检测">
      <PageContent>
        <PageHeader
          title={
            <div>
              <FileOutlined style={{ marginRight: 8 }} />
              IPFS 公共网关检测
            </div>
          }
          backIcon={false}
        />

        <GatewayChecker gateways={PublicGateways} />

        <div style={{ marginTop: 18 }}>
          <Alert
            type="info"
            showIcon
            message={
              <div>
                基础检测逻辑和网关列表来源于
                <a href="https://github.com/ipfs/public-gateway-checker" target="_blank" rel="noopener noreferrer">
                  ipfs/public-gateway-checker
                </a>
                。 扩展了部分额外的异常检测。
              </div>
            }
          />
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default Page;
