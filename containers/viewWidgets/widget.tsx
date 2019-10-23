import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as IntegrationStoreContext } from 'stores/integrations';
import integrationWidget from './integrationWidgets';

interface Props {
  widget: IntegrationWidget;
}

const Widget = observer(({ widget }: Props) => {
  const integrationStore = useContext(IntegrationStoreContext);

  // TODO - there's a case where integrationStore.integrations[i.integrationId].config could return undefined
  const Cmp = integrationWidget(widget);
  const integration = integrationStore.integrations[widget.integrationId];
  return (
    <Cmp
      key={widget.id}
      widgetId={widget.id}
      integrationId={widget.integrationId}
      widgetConfig={widget.config}
      integrationConfig={integration ? integration.config : null}
    />
  );
});

export default Widget;
