import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import integrationSettings from 'thomas/integrationSettings';
import PageWrapper from 'containers/wrappers/page';
import IntegrationsStore, { StoreContext } from 'stores/integrations';
import IntegrationSettingsCmp from 'containers/integrationSettings';

const IntegrationSettings = observer(() => {
  const store = useContext(StoreContext) as IntegrationsStore;
  if (!store.loaded) {
    return null;
  }

  const { query } = useRouter();
  const integrationSlug = Array.isArray(query.integration) ? query.integration[0] : query.integration;

  const systemIntegration = store.systemIntegrations![integrationSlug];
  if (systemIntegration.settings) {
    const integrations: any = Object.values(store.integrations).filter((i: any) => i.slug === integrationSlug);
    return <IntegrationSettingsCmp integrations={integrations} systemIntegration={systemIntegration} />;
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
