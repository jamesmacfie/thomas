import React, { Fragment, ReactNode, useContext } from 'react';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';
import Header from '../header';
import Navigation from '../navigation';
import EnterWSURL from '../enterWsURL';
import EnterAccessToken from '../enterAccessToken';
import NowPlaying from '../../components/nowPlaying';
import { PageLoader } from '../loader';
import Store from '../../store';
import { StoreContext } from '../../store';
import './styles.css';

interface Props {
  title: string;
  children: ReactNode;
}

const PageWrapper = observer(({ title, children }: Props) => {
  const store = useContext(StoreContext) as Store;
  if (!store.wsUrl) {
    return <EnterWSURL />;
  }

  if (!store.accessToken) {
    return <EnterAccessToken />;
  }
  if (!store.hasData) {
    return <PageLoader />;
  }

  return (
    <Fragment>
      <Head>
        <title>Thomas - {title} </title>
      </Head>
      <div>
        <Header />
        <div className="flex w-screen page-wrapper">
          <Navigation />
          <div className="flex-grow overflow-scroll">{children}</div>
        </div>
        <NowPlaying />
      </div>
    </Fragment>
  );
});

export default PageWrapper;
