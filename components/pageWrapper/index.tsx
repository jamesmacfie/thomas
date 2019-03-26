import React, { Fragment, ReactNode } from 'react';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';
import Header from '../header';
import EnterWSURL from '../enterWsURL';
import EnterAccessToken from '../enterAccessToken';
import NowPlaying from '../../components/nowPlaying';
import { PageLoader } from '../loader';
import Store from '../../store';
import './styles.css';

interface Props {
  title: string;
  children: ReactNode;
  store?: Store;
}

const PageWrapper = observer(({ title, children, store }: Props) => {
  console.log('Store', store);
  if (!store!.wsUrl) {
    return <EnterWSURL />;
  }

  if (!store!.accessToken) {
    return <EnterAccessToken />;
  }
  if (!store!.hasData) {
    return <PageLoader />;
  }

  return (
    <Fragment>
      <Head>
        <title>Thomas - {title} </title>
      </Head>
      <div>
        <Header />
        <div className="flex w-screen overflow-x-scroll page-wrapper">{children};</div>
        <NowPlaying />
      </div>
    </Fragment>
  );
});

export default inject('store')(PageWrapper);
