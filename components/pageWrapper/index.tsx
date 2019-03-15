import React, { Fragment, ReactNode, useState } from 'react';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';
import Store from '../../store';
import EnterWSURL from '../enterWsURL';
import EnterAccessToken from '../enterAccessToken';
import Loading from '../loading';

interface Props {
  title: string;
  children: ReactNode;
  store?: Store;
}

const PageWrapper = observer(({ title, children, store }: Props) => {
  if (!store!.wsUrl) {
    return <EnterWSURL />;
  }

  if (!store!.accessToken) {
    return <EnterAccessToken />;
  }

  if (!store!.hasData) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Head>
        <title>Thomas - {title} </title>
      </Head>
      {children};
    </Fragment>
  );
});

export default inject('store')(PageWrapper);
