import React from 'react';
import { useRouter } from 'next/router';
import { useLoaded } from 'stores/integrations/hooks';
import integrationSettings from 'thomas/integrationSettings';
import PageWrapper from 'containers/wrappers/page';

const IntegrationSettingsChild = () => {
  const loaded = useLoaded();
  if (!loaded) {
    return null;
  }
  const { query } = useRouter();
  const integrationSlug = Array.isArray(query.integration) ? query.integration[0] : query.integration;
  const childSlug = Array.isArray(query.child) ? query.child[0] : query.child;
  const slug = `${integrationSlug}_${childSlug}`;

  const Cmp = integrationSettings(slug);
  return <Cmp />;
};

const DynamicPage = () => {
  return (
    <PageWrapper title="">
      <IntegrationSettingsChild />
    </PageWrapper>
  );
};

export default DynamicPage;
