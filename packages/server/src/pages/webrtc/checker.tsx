import { PageLayout } from '../../components/layout/PageLayout/PageLayout';
import { PageContent } from '../../components/layout/PageLayout/PageContent';
import React from 'react';
import { PageHeader } from 'antd';
import { WebRTCChecker } from '../../modules/webrtc/components/WebRTCChecker';
import { useMounted } from '@wener/utils/src/reactx/hooks/useMounted';
import RtcOutlined from '../../components/icons/RtcOutlined';

const Page = () => {
  const mounted = useMounted();
  return (
    <PageLayout title="WebRTC 浏览器检测">
      <PageContent>
        <PageHeader
          title={
            <div>
              <RtcOutlined style={{ marginRight: 8 }} />
              WebRTC 浏览器检测
            </div>
          }
          backIcon={false}
        />

        {mounted && <WebRTCChecker />}
      </PageContent>
    </PageLayout>
  );
};

export default Page;
