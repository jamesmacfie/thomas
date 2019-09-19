// TODO - what's with all the commented out code here. Also create should be in the store
import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as DevicesStoreContext } from 'stores/devices';
import { StoreContext as ViewsStoreContext } from 'stores/views';
import { StoreContext as IntegrationsStoreContext } from 'stores/integrations';
import { useRouter } from 'next/router';
import SystemIntegrationSelect from 'containers/systemIntegrationSelect';
import SystemIntegrationWidgetSelect from 'containers/systemIntegrationWidgetSelect';
import Button from 'components/button';
import Modal from 'components/modal';
import Label from 'components/label';

interface Props {
  onClose: () => void;
}

const NewWidget = observer(({ onClose }: Props) => {
  const deviceStore = useContext(DevicesStoreContext);
  const viewsStore = useContext(ViewsStoreContext);
  const integrationsStore = useContext(IntegrationsStoreContext);
  const [integrationSlug, setIntegrationSlug] = useState<string>('');
  const [widgetSlug, setWidgetSlug] = useState<string>('');
  const { query } = useRouter();
  const systemIntegration: SystemIntegration | null = integrationSlug.length
    ? integrationsStore.systemIntegrations![integrationSlug]
    : null;

  const create = async () => {
    // TODO - move to correct store
    const viewId = Array.isArray(query.id) ? query.id[0] : query.id;
    if (!systemIntegration) {
      // TODO - error message?
      return;
    }
    const systemIntegrationWidget = systemIntegration.widgets.find(c => c.slug === widgetSlug);
    if (!systemIntegrationWidget) {
      // TODO - error message?
      return;
    }

    const widget = await fetch(`/widget`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        deviceId: deviceStore.getDeviceId(),
        integrationId: 10,
        integrationSlug,
        widgetSlug,
        viewId,
        config: {
          x: 0,
          y: 0,
          h: systemIntegrationWidget.layout.initialH,
          w: systemIntegrationWidget.layout.initialW,
          minH: systemIntegrationWidget.layout.minH || null,
          minW: systemIntegrationWidget.layout.minW || null
        }
      })
    }).then(res => res.json());

    viewsStore.addWidget(viewId, widget);

    // And tidy up
    setIntegrationSlug('');
    setWidgetSlug('');
    onClose();
  };

  const widgetCmp = !systemIntegration ? null : (
    <>
      <Label>Widget</Label>
      <SystemIntegrationWidgetSelect integrationSlug={integrationSlug} className="mb-4 w-96" onChange={setWidgetSlug} />
    </>
  );

  return (
    <Modal title="Create new widget" size="sm" onClose={onClose}>
      <Label>Integration</Label>
      <SystemIntegrationSelect className="mb-4 w-96" onChange={setIntegrationSlug} />
      {widgetCmp}
      <Button disabled={!integrationSlug || !widgetSlug} color="primary" onClick={create}>
        Create
      </Button>
    </Modal>
  );
});

export default NewWidget;
