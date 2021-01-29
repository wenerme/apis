import React from 'react';
import { PageLayout } from '../components/layout/PageLayout/PageLayout';
import { WenerApisWelcome } from 'src/ui/wener';

const IndexPage: React.FC = () => {
  return (
    <PageLayout title="Wener's APIs">
      <WenerApisWelcome />
    </PageLayout>
  );
};

export default IndexPage;
