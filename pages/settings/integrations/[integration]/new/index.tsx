import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { newPage } from 'thomas/integrationSettings';
import { H2 } from 'components/text';
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

  const SettingsPageCmp = newPage(integrationSlug);
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
        {' > New'}
      </H2>
      {SettingsPageCmp ? (
        <SettingsPageCmp systemIntegration={systemIntegration} />
      ) : (
        <IntegrationConfigForm systemIntegration={systemIntegration} />
      )}
    </>
  );
});

const DynamicPage = () => {
  return (
    <PageWrapper title="">
      <NewIntegration />
    </PageWrapper>
  );
};

export default DynamicPage;
