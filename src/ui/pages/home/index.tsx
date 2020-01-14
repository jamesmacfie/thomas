import React from 'react';
import { Redirect } from 'react-router-dom';
import PageWrapper from 'containers/wrappers/page';
import AddFirstView from 'containers/addFirstView';
import { useDeviceViews } from 'stores/deviceViews/hooks';
import logger from 'utils/logger';

const Inner = () => {
  const deviceViews = useDeviceViews();

  const deviceArray = Object.values(deviceViews);
  if (!deviceArray.length) {
    logger.info('No device views in store. Rendering <AddFirstView />');
    return <AddFirstView />;
  }

  const firstDeviceView = deviceArray.sort((a, b) => a.order - b.order)[0];
  logger.debug(`Has device views. Sorted first`, { firstDeviceView });
  return <Redirect to={`/p/${firstDeviceView.viewId}`} />;
};

const Home = () => {
  return (
    <PageWrapper title="">
      <Inner />
    </PageWrapper>
  );
};

export default Home;
