// TODO - move

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import PageWrapper from 'containers/pageWrapper';
import IntegrationsStore, { StoreContext } from 'stores/integrations';

const Callback = observer(() => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return null;
  }

  const [saved, setSaved] = useState<boolean | null>(null);
  const store = useContext(StoreContext) as IntegrationsStore;
  const { query } = useRouter();

  useEffect(() => {
    store
      .saveNewIntegration(slug, {
        code: query.code
      })
      .then(setSaved);
  }, [null]);

  const slug = Array.isArray(query.slug) ? query.slug[0] : query.slug;

  if (saved === null) {
    return <p>Saving</p>;
  }

  if (saved === false) {
    return <p>Something went wrong</p>;
  }

  return <p>Saved! hoorah!</p>;
});

const DynamicPage = () => {
  return (
    <PageWrapper title="">
      <Callback />
    </PageWrapper>
  );
};

export default DynamicPage;
