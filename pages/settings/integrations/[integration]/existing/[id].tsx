import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { H2 } from 'components/text';
import PageWrapper from 'containers/wrappers/page';
import { StoreContext } from 'stores/integrations';
import IntegrationConfigForm from 'containers/integrationConfigForm';

const ExistingIntegration = observer(() => {
  const integrationsStore = useContext(StoreContext);
  if (!integrationsStore.loaded) {
    return null;
  }

  const { query } = useRouter();
  const integrationSlug = Array.isArray(query.integration) ? query.integration[0] : query.integration;
  const id = Array.isArray(query.id) ? query.id[0] : query.id;

  const systemIntegration = integrationsStore.systemIntegrations![integrationSlug];
  const integration = integrationsStore.integrations![id];

  return (
    <>
      <H2 className="mt-0">
        <Link href="/settings">
          <a>Settings</a>
        </Link>
        {' > '}
        <Link href="/settings/integrations">
          <a>Integrations</a>
        </Link>
        {' > '}
        <Link href={`/settings/integrations/${systemIntegration.slug}`}>{systemIntegration.name}</Link>
        {' > '}
        {integration.config.name}
      </H2>
      <IntegrationConfigForm systemIntegration={systemIntegration} integration={integration} />
    </>
  );
});

const DynamicPage = () => {
  return (
    <PageWrapper title="">
      <ExistingIntegration />
    </PageWrapper>
  );
};

export default DynamicPage;
