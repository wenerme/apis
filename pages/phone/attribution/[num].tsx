import React from 'react'
import {NextPage} from 'next';
import unfetch from 'isomorphic-unfetch'
import {PhoneAttributionPage} from './_pages/PhoneAttributionPage';

const Page: NextPage<{ initialData }> = PhoneAttributionPage;

Page.getInitialProps = async (ctx) => {
  const {query} = ctx;
  let {num} = query;
  num = `${num}`.replace(/\..*/, '');
  const data = await unfetch(`https://wener-apis.now.sh/api/phone/attribution/${num}`).then(v => v.json());
  return {initialData: data}
};

export default Page
