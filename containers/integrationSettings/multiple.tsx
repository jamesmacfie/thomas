import React from 'react';
import Button from 'components/button';
import PanelIcon from 'components/panelIcon';
import { H3 } from 'components/text';
import { Props } from '.';

interface CurrrentIntegrationsProps {
  systemIntegration: SystemIntegration;
  integration: Integration;
}

const AddNew = ({ systemIntegration }: { systemIntegration: SystemIntegration }) => {
  return (
    <>
      <Button href={`/settings/integrations/${systemIntegration.slug}/new`} className="mt-4" color="primary">
        Add new
      </Button>
    </>
  );
};

const FirstTime = ({ systemIntegration }: Props) => {
  return (
    <>
      <p className="mb-4">There is nothing setup for {systemIntegration.name}.</p>
      <AddNew systemIntegration={systemIntegration} />
    </>
  );
};

const CurrentIntegrations = ({ systemIntegration, integration }: CurrrentIntegrationsProps) => {
  return (
    <div className="w-40 h-40 mr-6 text-center">
      <PanelIcon
        title={integration.config.name}
        href={`/settings/integrations/${systemIntegration.slug}/existing/${integration.id}`}
        imgSrc={`/static/${systemIntegration.slug}/logo.png`}
        imageClassName="rounded-full bg-white"
      />
    </div>
  );
};

const IntegrationSettingsMultiple = (props: Props) => {
  const { systemIntegration, integrations } = props;
  if (!integrations.length) {
    return <FirstTime {...props} />;
  }

  return (
    <>
      <H3>Current integration setups:</H3>
      <div className="flex">
        {integrations.map(i => (
          <CurrentIntegrations integration={i} systemIntegration={systemIntegration} />
        ))}
      </div>
      <AddNew systemIntegration={systemIntegration} />
    </>
  );
};

export default IntegrationSettingsMultiple;
