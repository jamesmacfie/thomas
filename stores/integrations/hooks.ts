import { useContext } from 'react';
import { useObserver } from 'mobx-react-lite';
import { StoreContext } from '.';

export const useIntegration = (id: number | null) => {
  const store = useContext(StoreContext);

  return useObserver(() => {
    if (!id) {
      return null;
    }

    return store.integrations[id];
  });
};

export const useSystemIntegration = (slug: string | null) => {
  const store = useContext(StoreContext);

  return useObserver(() => {
    if (!slug) {
      return null;
    }

    return store.systemIntegrations[slug];
  });
};

export const useSystemIntegrations = () => {
  const store = useContext(StoreContext);

  return useObserver(() => {
    return store.systemIntegrations;
  });
};
