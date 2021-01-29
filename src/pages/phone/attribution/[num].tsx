import React from 'react';
import { NextPage } from 'next';
import { PhoneAttributionPage } from 'src/modules/phone/components/PhoneAttributionPage';
import { fetchPhoneAttribution } from 'src/modules/phone/apis/fetchs';

const Page: NextPage<{ initialData }> = PhoneAttributionPage;

Page.getInitialProps = async (ctx) => {
  const { query } = ctx;
  let { num } = query;
  num = `${num}`.replace(/\..*/, '');
  const data = await fetchPhoneAttribution({ number: num });
  return { initialData: data };
};

export default Page;
