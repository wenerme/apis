import Head from 'next/head';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import {Icon, PageHeader} from 'antd';
import React from 'react';

import dynamic from 'next/dynamic';

const LocationMePageContent = dynamic(() => import('modules/geo/components/LocationMePageContent').then(v => v.LocationMePageContent), {
  ssr: false,
  loading: () => <div>加载中...</div>
});

const LocationMePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>我的定位</title>
      </Head>
      <PageLayout>
        <PageContent>
          <PageHeader
            title={
              <div>
                <Icon type="environment" style={{marginRight: 8}} />
                我的定位
              </div>
            }
            backIcon={false}
          />

          <LocationMePageContent />

        </PageContent>
      </PageLayout>
    </>
  )
};

export default LocationMePage;