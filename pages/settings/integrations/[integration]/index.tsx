import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import integrationSettings from 'thomas/integrationSettings';
import PageWrapper from 'containers/pageWrapper';
import IntegrationsStore, { StoreContext } from 'stores/integrations';
import Loader from 'components/loader';

const IntegrationSettings = observer(() => {
  const store = useContext(StoreContext) as IntegrationsStore;
  if (!store.integrations || !store.systemIntegrations) {
    return <Loader fullPage />;
  }
  const { query } = useRouter();
  const integrationSlug = Array.isArray(query.integrationSlug) ? query.integrationSlug[0] : query.integrationSlug;

  // TODO - what if there is no such integrationSlug?

  const Cmp = integrationSettings(integrationSlug);
  return <Cmp />;
});

const DynamicPage = () => {
  return (
    <PageWrapper title="">
      <IntegrationSettings />
    </PageWrapper>
  );
};

export default DynamicPage;
