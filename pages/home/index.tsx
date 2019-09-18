import React, { useContext } from 'react';
import Router from 'next/router';
import { observer } from 'mobx-react-lite';
import PageWrapper from 'containers/wrappers/page';
import { StoreContext as DeviceViewsStoreContext } from 'stores/deviceViews';

const Inner = observer(() => {
  const deviceViewsStore = useContext(DeviceViewsStoreContext);

  const deviceArray = Object.values(deviceViewsStore.deviceViews);
  if (!deviceArray.length) {
    return <p>Todo - need to create the first view</p>;
  }

  const viewIdsByOrder = deviceArray.sort((a, b) => a.order - b.order);
  Router.push(`/p/${viewIdsByOrder[0].viewId}`);

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
