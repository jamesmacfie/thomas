import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import PageWrapper from 'containers/pageWrapper';
import IntegrationsStore, { StoreContext } from 'stores/integrations';

const Inner = observer(() => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return null;
  }

  const [saved, setSaved] = useState<boolean | null>(null);
  const store = useContext(StoreContext) as IntegrationsStore;
  const { query } = useRouter();

  useEffect(() => {
    store
      .saveNewIntegration('google', {
        code: query.code
      })
      .then(setSaved);
  }, [null]);

  if (saved === null) {
    return <p>Saving</p>;
  }

  if (saved === false) {
    return <p>Something went wrong</p>;
  }

  return <p>Saved! hoorah!</p>;
});

const GoogleCallback = () => {
  return (
    <PageWrapper title="">
      <Inner />
    </PageWrapper>
  );
};

export default GoogleCallback;
