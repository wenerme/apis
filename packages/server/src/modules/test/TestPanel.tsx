import React from 'react';
import { PageHeader } from 'antd';
import { TestButton } from './TestButton';

export const TestPanel: React.FC = () => {
  return (
    <div>
      <PageHeader title={'Test APP'} subTitle={'for test only'} />
      <div>
        <TestButton />
      </div>
    </div>
  );
};
