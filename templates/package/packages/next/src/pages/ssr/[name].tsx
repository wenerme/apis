import React from 'react';
import { GetServerSideProps } from 'next';
import path from 'path';

const Page = ({ name, path }) => {
  return (
    <div>
      Name is - {name} <br /> Server Path {path}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: { name: ctx.params.name ?? 'wener', path: path.resolve('.') },
  };
};
export default Page;
