import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import integrationSettings from 'thomas/integrationSettings';
import { StoreContext } from 'stores/integrations';
import IntegrationSettingsCmp from 'containers/integrationSettings';

const IntegrationSettings = observer(() => {
  const integrationsStore = useContext(StoreContext);
  if (!integrationsStore.loaded) {
    return null;
  }

  const { slug } = useParams();
  const SettingsPageCmp = integrationSettings(slug!);
  const systemIntegration = integrationsStore.systemIntegrations![slug!];
  const integrations: any = Object.values(integrationsStore.integrations).filter((i: any) => i.slug === slug);

  return SettingsPageCmp ? (
    <SettingsPageCmp integrations={integrations} systemIntegration={systemIntegration} />
  ) : (
    <IntegrationSettingsCmp integrations={integrations} systemIntegration={systemIntegration} />
  );
});

export default IntegrationSettings;
