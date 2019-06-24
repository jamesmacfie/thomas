import React, { Fragment, ReactNode, useContext } from 'react';
import cn from 'classnames';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';
import Header from '../header';
import Navigation from '../navigation';
import NowPlaying from '../../components/nowPlaying';
import SpotifyStore, { SpotifyStoreContext } from '../../spotifyStore';
import './styles.css';

interface Props {
  contentsClassName?: string;
  title: string;
  children: ReactNode;
}

const PageWrapper = observer(({ title, children, contentsClassName }: Props) => {
  const spotifyStore = useContext(SpotifyStoreContext) as SpotifyStore;
  const classes = spotifyStore.currentlyPlaying ? 'content-drawer' : 'content';
  return (
    <Fragment>
      <Head>
        <title>Thomas - {title} </title>
      </Head>
      <div className="flex flex-col h-screen w-screen">
        <Header />
        <div className={cn('flex flex-grow w-screen', classes)}>
          <Navigation />
          <div className={cn(contentsClassName, 'flex-grow overflow-scroll')}>{children}</div>
        </div>
        <NowPlaying />
      </div>
    </Fragment>
  );
});

export default PageWrapper;
