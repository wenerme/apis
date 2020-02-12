import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import React from 'react';
import Head from 'next/head';
import {Icon, PageHeader} from 'antd';
import {WebRTCChecker} from 'modules/webrtc/components/WebRTCChecker';
import {useMounted} from 'hooks/useMounted';

const Page = () => {
  const mounted = useMounted();
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>WebRTC 浏览器检测</title>
        </Head>
        <PageHeader
          title={
            <div>
              <Icon type="retweet" style={{marginRight: 8}} />
              WebRTC 浏览器检测
            </div>
          }
          backIcon={false}
        />

        {mounted && <WebRTCChecker />}

      </PageContent>
    </PageLayout>
  )
};

export default Page
