import React from 'react';
import { NextPage } from 'next';

const Page: NextPage<{ value: string }> = ({ value }) => {
  return <div>Index Page - {value}</div>;
};
Page.getInitialProps = ({ req, res }) => {
  return {
    value: req?.method ?? 'invalid',
  };
};
export default Page;
