import React, { useContext } from 'react';
import Router from 'next/router';
import { observer } from 'mobx-react-lite';
import PageWrapper from 'containers/wrappers/page';
import AddFirstView from 'containers/addFirstView';
import { StoreContext as DeviceViewsStoreContext } from 'stores/deviceViews';
import logger from 'utils/logger';

const Inner = observer(() => {
  const deviceViewsStore = useContext(DeviceViewsStoreContext);

  const deviceArray = Object.values(deviceViewsStore.deviceViews);
  if (!deviceArray.length) {
    logger.info('No device views in store. Rendering <AddFirstView />');
    return <AddFirstView />;
  }

  const firstDeviceView = deviceArray.sort((a, b) => a.order - b.order)[0];
  logger.debug(`Has device views. Sorted first`, { firstDeviceView });
  Router.push(`/p/${firstDeviceView.viewId}`);

  return null;
});

const Home = () => {
  return (
    <PageWrapper title="">
      <Inner />
    </PageWrapper>
  );
};

export default Home;
