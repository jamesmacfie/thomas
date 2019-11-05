import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import PageWrapper from 'containers/wrappers/page';
import { StoreContext } from 'stores/integrations';
import IntegrationConfigForm from 'containers/integrationConfigForm';

const NewIntegration = observer(() => {
  const integrationsStore = useContext(StoreContext);
  if (!integrationsStore.loaded) {
    return null;
  }

  const { query } = useRouter();
  const integrationSlug = Array.isArray(query.integration) ? query.integration[0] : query.integration;

  const systemIntegration = integrationsStore.systemIntegrations![integrationSlug];

  return <IntegrationConfigForm systemIntegration={systemIntegration} />;
});

const DynamicPage = () => {
  return (
    <PageWrapper title="">
      <NewIntegration />
    </PageWrapper>
  );
};

export default DynamicPage;
