// This component needs a refactor
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, Link } from 'react-router-dom';
import { store as viewsStore } from 'stores/views';
import { useIntegration, useSystemIntegration } from 'stores/integrations/hooks';
import IntegrationSelect, { IntegrationSelectChange } from 'containers/integrationSelect';
import SystemIntegrationWidgetSelect from 'containers/systemIntegrationWidgetSelect';
import Button from 'components/button';
import Modal from 'components/modal';
import Label from 'components/label';
import Alert from 'components/alert';
import logger from 'utils/logger';

interface Props {
  onClose: () => void;
}

const NewWidget = observer(({ onClose }: Props) => {
  const [integrationId, setIntegrationId] = useState<number | null>(null);
  const [integrationSlug, setIntegrationSlug] = useState<string | null>(null);
  const [noIntegrationSetup, setNoIntegrationSetup] = useState<null | boolean>(null);
  const [widgetSlug, setWidgetSlug] = useState<string>('');
  const [requiresIntegrationIdSelection, setRequiresIntegrationIdSelection] = useState<null | boolean>(null);
  const [error, setError] = useState<string>('');
  const { id } = useParams();
  const integration: Integration | null = useIntegration(integrationId);
  const systemIntegration: SystemIntegration | null = useSystemIntegration(integrationSlug);
  const onIntegrationSelectChange = (details: IntegrationSelectChange) => {
    setIntegrationId(details.integrationId);
    setIntegrationSlug(details.integrationSlug);
    setNoIntegrationSetup(details.noIntegrationSetup);
    setRequiresIntegrationIdSelection(details.requiresIntegrationIdSelection);
  };

  const create = async () => {
    logger.debug('Creating new widget for view', { id });

    if (!systemIntegration) {
      logger.error('No system integration selected', {
        systemIntegration,
        integration,
        integrationSlug,
        integrationId
      });
      setError('No integration selected');
      return;
    }
    const systemIntegrationWidget = systemIntegration.widgets.find(c => c.slug === widgetSlug);
    if (!systemIntegrationWidget) {
      logger.error('System integration does not exist in the store', { widgetSlug });
      setError('Selected integration does not exist');
      return;
    }

    try {
      viewsStore.insertWidget({
        integrationId,
        integrationSlug: integrationSlug!,
        widgetSlug,
        viewId: parseInt(id!),
        config: {
          x: 0,
          y: 0,
          h: systemIntegrationWidget.layout.initialH,
          w: systemIntegrationWidget.layout.initialW,
          minH: systemIntegrationWidget.layout.minH || null,
          minW: systemIntegrationWidget.layout.minW || null
        }
      });

      // And tidy up
      setIntegrationId(null);
      setWidgetSlug('');
      onClose();
    } catch (error) {
      logger.error('Error creating widget', { error });
      setError(`Error creating widget: ${error.message}`);
    }
  };

  // Show the widget select if the integration does not require any id selection or, if it does
  // that we actually have an integration selected
  let widgetCmp = null;
  if (integrationSlug) {
    const shouldRenderWidgetSelection = !requiresIntegrationIdSelection ? true : !!integration;
    widgetCmp = shouldRenderWidgetSelection && (
      <>
        <Label>Widget</Label>
        <SystemIntegrationWidgetSelect
          integrationSlug={integrationSlug}
          className="mb-4 w-96"
          onChange={setWidgetSlug}
        />
      </>
    );
  }

  const buttonDisabled = !requiresIntegrationIdSelection ? !widgetSlug : !integrationId || !widgetSlug;

  return (
    <Modal title="Create new widget" size="sm" onClose={onClose}>
      {!!error.length && (
        <Alert type="ERROR" className="mb-4">
          {error}
        </Alert>
      )}
      <Label>Integration</Label>
      <IntegrationSelect className="mb-4 w-96" onChange={onIntegrationSelectChange} />
      {widgetCmp}
      {noIntegrationSetup && (
        <p className="mb-4">
          This integration needs to be setup in order to be used.{' '}
          <Link className="text-blue mb-4" to={`/settings/integrations/${integrationSlug}`}>
            You can do this here.
          </Link>
        </p>
      )}
      <Button disabled={buttonDisabled} color="primary" onClick={create}>
        Create
      </Button>
    </Modal>
  );
});

export default NewWidget;
