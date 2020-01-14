import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, Link } from 'react-router-dom';
import { H2 } from 'components/text';
import { StoreContext } from 'stores/integrations';
import IntegrationConfigForm from 'containers/integrationConfigForm';

const ExistingIntegration = observer(() => {
  const integrationsStore = useContext(StoreContext);
  if (!integrationsStore.loaded) {
    return null;
  }

  const { slug, id } = useParams();
  const systemIntegration = integrationsStore.systemIntegrations![slug!];
  const integration = integrationsStore.integrations![id!];

  return (
    <>
      <H2 className="mt-0">
        <Link to="/settings">Settings</Link>
        {' > '}
        <Link to="/settings/integrations">Integrations</Link>
        {' > '}
        <Link to={`/settings/integrations/${systemIntegration.slug}`}>{systemIntegration.name}</Link>
        {' > '}
        {integration.config.name}
      </H2>
      <IntegrationConfigForm systemIntegration={systemIntegration} integration={integration} />
    </>
  );
});

export default ExistingIntegration;
