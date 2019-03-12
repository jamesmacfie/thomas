import React, { Fragment, ReactNode } from 'react';
import Head from 'next/head';

interface Props {
  title: string;
  children: ReactNode;
}

const PageWrapper = ({ title, children }: Props) => {
  return (
    <Fragment>
      <Head>Thomas - {title} </Head>
      {children};
    </Fragment>
  );
};

export default PageWrapper;
