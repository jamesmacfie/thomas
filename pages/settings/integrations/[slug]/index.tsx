import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import integrationSettings from 'integrations/settings';
import PageWrapper from 'containers/pageWrapper';
import IntegrationsStore, { StoreContext } from 'stores/integrations';
import Loader from 'components/loader';
import { isArray } from 'util';

const Integrations = observer(() => {
  const store = useContext(StoreContext) as IntegrationsStore;
  if (!store.integrations || !store.systemIntegrations) {
    return <Loader fullPage />;
  }
  const { query } = useRouter();
  const slug = isArray(query.slug) ? query.slug[0] : query.slug;

  // TODO - what if there is no such slug?

  const Cmp = integrationSettings({ slug });
  return <Cmp />;
});

const DynamicPage = () => {
  return (
    <PageWrapper title="">
      <Integrations />
    </PageWrapper>
  );
};

export default DynamicPage;
