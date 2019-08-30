import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import integrationSettings from 'thomas/integrationSettings';
import PageWrapper from 'containers/pageWrapper';
import IntegrationsStore, { StoreContext } from 'stores/integrations';
import Loader from 'components/loader';

const IntegrationSettingsChild = observer(() => {
  const store = useContext(StoreContext) as IntegrationsStore;
  if (!store.integrations || !store.systemIntegrations) {
    return <Loader fullPage />;
  }
  const { query } = useRouter();
  const integrationSlug = Array.isArray(query.integration) ? query.integration[0] : query.integration;
  const childSlug = Array.isArray(query.child) ? query.child[0] : query.child;
  const slug = `${integrationSlug}_${childSlug}`;
  // TODO - what if there is no such integrationSlug or childSlug?

  const Cmp = integrationSettings(slug);
  return <Cmp />;
});

const DynamicPage = () => {
  return (
    <PageWrapper title="">
      <IntegrationSettingsChild />
    </PageWrapper>
  );
};

export default DynamicPage;
