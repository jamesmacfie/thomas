import React from 'react';
import Button from 'components/button';
import { Props } from '.';

const FirstTime = ({ systemIntegration }: Props) => {
  return (
    <>
      <p className="mb-4">There is nothing setup for {systemIntegration.name}.</p>
      <Button href={`/settings/integrations/${systemIntegration.slug}/new`} className="mt-4" color="primary">
        Add new
      </Button>
    </>
  );
};

const IntegrationSettingsMultiple = (props: Props) => {
  const { systemIntegration, integrations } = props;
  console.log('integrations setup count', integrations.length, `for ${systemIntegration.name}`);
  if (!integrations.length) {
    return <FirstTime {...props} />;
  }
  return <p>TODO</p>;
};

export default IntegrationSettingsMultiple;
