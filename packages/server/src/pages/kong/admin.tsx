import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout/PageLayout';
import dynamic from 'next/dynamic';

const KongAdminUI = dynamic(
  () => import('../../modules/kong/components/KongAdminUI').then(({ KongAdminUI }) => KongAdminUI),
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
    <PageLayout
      showFooter={false}
      title="Kong 管理界面"
      description="Kong Admin GUI"
      keywords="online kong admin, kong web admin, kong react ui"
    >
      <KongAdminPageContent />
    </PageLayout>
  );
};
export default Page;
