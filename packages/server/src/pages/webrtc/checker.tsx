import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import React from 'react';
import { PageHeader } from 'antd';
import { WebRTCChecker } from 'src/modules/webrtc/components/WebRTCChecker';
import { useMounted } from '@wener/ui';
import { RtcOutlined } from '@wener/ui/icons';

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
