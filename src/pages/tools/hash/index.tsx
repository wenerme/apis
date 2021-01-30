import { NextPage } from 'next';
import React from 'react';
import { NgPageLayout } from '../../../components/layout/ng/NgPageLayout';
import { HashTool } from '../../../modules/hash/HashTool';

const Page: NextPage = () => {
  return (
    <NgPageLayout>
      <HashTool />
    </NgPageLayout>
  );
};

export default Page;
