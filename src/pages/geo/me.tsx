import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { PageHeader } from 'antd';
import React from 'react';

import dynamic from 'next/dynamic';
import { EnvironmentOutlined } from '@ant-design/icons';
import { BoxShuffle } from 'src/ui';

const LocationMePageContent = dynamic<any>(
  () =>
    import('../../modules/geo/components/LocationMe').then(
      ({ LocationMe }) => LocationMe,
    ),
  {
    ssr: false,
    loading: () => <BoxShuffle title="Loading page..." />,
  },
);

const LocationMePage: React.FC = () => {
  return (
    <PageLayout title="我的定位">
      <PageContent>
        <PageHeader
          title={
            <div>
              <EnvironmentOutlined style={{ marginRight: 8 }} />
              我的定位
            </div>
          }
          backIcon={false}
        />

        <LocationMePageContent />
      </PageContent>
    </PageLayout>
  );
};

export default LocationMePage;
