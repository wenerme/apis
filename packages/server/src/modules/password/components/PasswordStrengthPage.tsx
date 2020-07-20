import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import React from 'react';
import { Alert, PageHeader } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { PasswordStrengthPageContent } from './PasswordStrengthPageContent';

export const PasswordStrengthPage: React.FC<{ initialValue? }> = ({ initialValue }) => {
  return (
    <PageLayout title="Zxcvbn 密码强度检测">
      <PageContent>
        <PageHeader
          title={
            <div>
              <KeyOutlined style={{ marginRight: 8 }} />
              Zxcvbn 密码强度检测
            </div>
          }
          backIcon={false}
        />

        <PasswordStrengthPageContent initialValue={initialValue} />
      </PageContent>
    </PageLayout>
  );
};
