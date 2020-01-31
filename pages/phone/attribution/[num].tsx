import React from 'react'
import {NextPage} from 'next';
import {PhoneAttributionPage} from './_pages/PhoneAttributionPage';
import {fetchPhoneAttribution} from 'modules/phone/apis/fetchs';

const Page: NextPage<{ initialData }> = PhoneAttributionPage;

Page.getInitialProps = async (ctx) => {
  const {query} = ctx;
  let {num} = query;
  num = `${num}`.replace(/\..*/, '');
  const data = await fetchPhoneAttribution({number: num});
  return {initialData: data}
};

export default Page
