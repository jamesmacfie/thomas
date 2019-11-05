import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import integrationSettings from 'thomas/integrationSettings';
import PageWrapper from 'containers/wrappers/page';
import { StoreContext } from 'stores/integrations';
import IntegrationSettingsCmp from 'containers/integrationSettings';

const IntegrationSettings = observer(() => {
  const integrationsStore = useContext(StoreContext);
  if (!integrationsStore.loaded) {
    return null;
  }

  const { query } = useRouter();
  const integrationSlug = Array.isArray(query.integration) ? query.integration[0] : query.integration;

  const systemIntegration = integrationsStore.systemIntegrations![integrationSlug];
  if (systemIntegration.settings) {
    const integrations: any = Object.values(integrationsStore.integrations).filter(
      (i: any) => i.slug === integrationSlug
    );
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
