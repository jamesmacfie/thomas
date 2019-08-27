import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import GoogleStore, { StoreContext } from '../store';
import Loader from 'components/loader';

interface Props {
  children: ReactNode;
}

const GoogleIntegrationsWrapper = observer(({ children }: Props) => {
  const store = useContext(StoreContext) as GoogleStore;

  if (store.integrations === null) {
    store.getIntegrations();
    return <Loader fullPage />;
  }

  return <>{children}</>;
});

export default GoogleIntegrationsWrapper;
