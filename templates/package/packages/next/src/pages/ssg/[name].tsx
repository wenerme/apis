import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

const Page: React.FC<{ name: string }> = ({ name }) => {
  return <div>Name is - {name}</div>;
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: { name: ctx.params?.name ?? 'no name' },
    unstable_revalidate: 3000,
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { name: 'wener' } }],
    fallback: true,
  };
};
export default Page;
