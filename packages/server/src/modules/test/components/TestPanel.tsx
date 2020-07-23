import React from 'react';
import { PageHeader } from 'antd';
import { TestButton } from './TestButton';
import { DashLayout } from 'src/modules/dash';

export const TestPanel: React.FC = () => {
  return (
    <DashLayout>
      <div>
        <PageHeader title={'Test APP'} subTitle={'for test only'} />
        <div>
          <TestButton />
        </div>
      </div>
    </DashLayout>
  );
};
