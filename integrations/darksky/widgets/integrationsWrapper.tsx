import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import DarkSkyStore, { StoreContext } from '../store';

interface Props {
  children: ReactNode;
}

const DarkSkyIntegrationsWrapper = observer(({ children }: Props) => {
  const store = useContext(StoreContext) as DarkSkyStore;

  if (store.integrations === null) {
    store.getIntegrations();
    return null;
  }

  return <>{children}</>;
});

export default DarkSkyIntegrationsWrapper;
