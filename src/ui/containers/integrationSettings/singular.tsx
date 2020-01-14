import React from 'react';
import IntegrationConfigForm from '../integrationConfigForm';
import { Props } from '.';

const IntegrationSettingsSingular = ({ systemIntegration, integrations }: Props) => {
  return <IntegrationConfigForm integration={integrations[0]} systemIntegration={systemIntegration} />;
};

export default IntegrationSettingsSingular;
