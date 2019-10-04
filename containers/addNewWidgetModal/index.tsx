import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as ViewsStoreContext } from 'stores/views';
import { StoreContext as IntegrationsStoreContext } from 'stores/integrations';
import { useRouter } from 'next/router';
import IntegrationSelect from 'containers/integrationSelect';
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
  const viewsStore = useContext(ViewsStoreContext);
  const integrationsStore = useContext(IntegrationsStoreContext);
  const [integrationId, setIntegrationId] = useState<number | null>(null);
  const [widgetSlug, setWidgetSlug] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { query } = useRouter();
  const integration: Integration | null = integrationId
    ? integrationsStore.integrations[integrationId.toString()]
    : null;
  const systemIntegration: SystemIntegration | null =
    integrationId && integration ? integrationsStore.systemIntegrations[integration.slug] : null;

  const create = async () => {
    const viewId = Array.isArray(query.id) ? query.id[0] : query.id;
    logger.debug('Creating new widget for view', { viewId });

    if (!systemIntegration || !integration) {
      logger.error('Either no system integration or integration selected', { systemIntegration, integration });
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
        integrationId: integrationId!,
        integrationSlug: integration.slug,
        widgetSlug,
        viewId: parseInt(viewId),
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

  const widgetCmp = !integration ? null : (
    <>
      <Label>Widget</Label>
      <SystemIntegrationWidgetSelect
        integrationSlug={integration.slug}
        className="mb-4 w-96"
        onChange={setWidgetSlug}
      />
    </>
  );

  return (
    <Modal title="Create new widget" size="sm" onClose={onClose}>
      {!!error.length && (
        <Alert type="ERROR" className="mb-4">
          {error}
        </Alert>
      )}
      <Label>Integration</Label>
      <IntegrationSelect className="mb-4 w-96" onChange={setIntegrationId} />
      {widgetCmp}
      <Button disabled={!integrationId || !widgetSlug} color="primary" onClick={create}>
        Create
      </Button>
    </Modal>
  );
});

export default NewWidget;
