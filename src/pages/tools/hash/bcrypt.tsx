import { NextPage } from 'next';
import React from 'react';
import { NgPageLayout } from '../../../components/layout/ng/NgPageLayout';
import { BcryptHashTool } from '../../../modules/hash/BcryptHashTool';

const Page: NextPage = () => {
  return (
    <NgPageLayout>
      <BcryptHashTool />
    </NgPageLayout>
  );
};

export default Page;
