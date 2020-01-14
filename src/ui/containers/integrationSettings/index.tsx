import React from 'react';
import { Link } from 'react-router-dom';
import { H2 } from 'components/text';
import Alert from 'components/alert';
import Singular from './singular';
import Multiple from './multiple';

export interface Props {
  systemIntegration: SystemIntegration;
  integrations: any[];
}

const IntegrationSettings = ({ systemIntegration, integrations }: Props) => {
  const breadcrumbs = (
    <H2 className="mt-0">
      <Link to="/settings">Settings</Link>
      {' > '}
      <Link to="/settings/integrations">Integrations</Link>
      {' > '}
      {systemIntegration.name}
    </H2>
  );
  if (!systemIntegration.requiresSettings) {
    return (
      <>
        {breadcrumbs}
        <Alert type="INFO">No settings avaialble for {systemIntegration.name}.</Alert>
      </>
    );
  }
  if (systemIntegration.singular) {
    return (
      <>
        {breadcrumbs}
        <Singular systemIntegration={systemIntegration} integrations={integrations} />
      </>
    );
  }
  return (
    <>
      {breadcrumbs}
      <Multiple systemIntegration={systemIntegration} integrations={integrations} />
    </>
  );
};

export default IntegrationSettings;
