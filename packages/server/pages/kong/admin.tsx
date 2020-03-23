import React from 'react';
import { PageLayout } from 'components/layout/PageLayout/PageLayout';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const KongAdminUI = dynamic(
  () => import('modules/kong/components/KongAdminUI').then(({ KongAdminUI }) => KongAdminUI),
  {
    loading: () => <div>Loading KongAdminUI</div>,
    ssr: false,
  }
);

const KongAdminPageContent: React.FC = () => {
  return <KongAdminUI />;
};

const Page = () => {
  return (
    <PageLayout showFooter={false}>
      <Head>
        <title>Kong 管理界面</title>
        <meta name="description" content="Kong GUI" />
        <meta name="keywords" content="online kong admin, kong web admin, kong react ui" />
      </Head>

      <KongAdminPageContent />
    </PageLayout>
  );
};
export default Page;
