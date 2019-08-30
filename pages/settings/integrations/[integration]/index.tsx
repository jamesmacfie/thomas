import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import integrationSettings from 'thomas/integrationSettings';
import PageWrapper from 'containers/pageWrapper';
import IntegrationsStore, { StoreContext } from 'stores/integrations';
import Loader from 'components/loader';
import ConfigForm from 'containers/configForm';

const IntegrationSettings = observer(() => {
  const store = useContext(StoreContext) as IntegrationsStore;
  if (!store.loaded) {
    return <Loader fullPage />;
  }

  const { query } = useRouter();
  const integrationSlug = Array.isArray(query.integration) ? query.integration[0] : query.integration;

  const systemIntegration = store.systemIntegrations[integrationSlug];
  if (systemIntegration.settings) {
    // TODO - fix this all up here
    let initialValues = {};
    if (systemIntegration.singular) {
      const integration: any = Object.values(store.integrations).find((i: any) => i.slug === integrationSlug);
      console.log(integration);
      initialValues = integration.config;
    }

    return <ConfigForm config={systemIntegration.settings} initialValues={initialValues} />;
  }

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
