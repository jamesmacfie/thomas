import React, { Fragment, ReactNode, useContext } from 'react';
import cn from 'classnames';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';
import Header from '../header';
import Navigation from '../navigation';
import EnterWSURL from '../enterWsURL';
import EnterAccessToken from '../enterAccessToken';
import NowPlaying from '../../components/nowPlaying';
import { PageLoader } from '../loader';
import Store, { StoreContext } from '../../store';
import SpotifyStore, { SpotifyStoreContext } from '../../spotifyStore';
import './styles.css';

interface Props {
  title: string;
  children: ReactNode;
}

const PageWrapper = observer(({ title, children }: Props) => {
  const store = useContext(StoreContext) as Store;
  const spotifyStore = useContext(SpotifyStoreContext) as SpotifyStore;

  if (!store.wsUrl) {
    return <EnterWSURL />;
  }

  if (!store.accessToken) {
    return <EnterAccessToken />;
  }
  if (!store.hasData) {
    return <PageLoader />;
  }

  const classes = spotifyStore.currentlyPlaying ? 'page-wraper-drawer' : 'h-screen';

  return (
    <Fragment>
      <Head>
        <title>Thomas - {title} </title>
      </Head>
      <div>
        <Header />
        <div className={cn('flex w-screen', classes)}>
          <Navigation />
          <div className="flex-grow overflow-scroll">{children}</div>
        </div>
        <NowPlaying />
      </div>
    </Fragment>
  );
});

export default PageWrapper;
