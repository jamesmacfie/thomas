import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import DarkSkyStore, { StoreContext } from '../store';
import Loader from 'components/loader';

interface Props {
  children: ReactNode;
}

const DarkSkyIntegrationsWrapper = observer(({ children }: Props) => {
  const store = useContext(StoreContext) as DarkSkyStore;

  if (store.integrations === null) {
    store.getIntegrations();
    return <Loader fullPage />;
  }

  console.log('returning children');
  return <>{children}</>;
});

export default DarkSkyIntegrationsWrapper;
