import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { newPage } from 'thomas/integrationSettings';
import { H2 } from 'components/text';
import { StoreContext } from 'stores/integrations';
import IntegrationConfigForm from 'containers/integrationConfigForm';

const NewIntegration = observer(() => {
  const integrationsStore = useContext(StoreContext);
  if (!integrationsStore.loaded) {
    return null;
  }

  const { slug } = useParams();
  const systemIntegration = integrationsStore.systemIntegrations![slug!];
  const SettingsPageCmp = newPage(slug!);

  return (
    <>
      <H2 className="mt-0">
        <Link to="/settings">Settings</Link>
        {' > '}
        <Link to="/settings/integrations">Integrations</Link>
        {' > '}
        <Link to={`/settings/integrations/${systemIntegration.slug}`}>{systemIntegration.name}</Link>
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

export default NewIntegration;
