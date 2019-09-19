import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as DevicesStoreContext } from 'stores/devices';
import { StoreContext as ViewStoreContext } from 'stores/views';
import { StoreContext as IntegrationStoreContext } from 'stores/integrations';
import integrationWidget from './integrationWidgets';
import ReactGridLayout from 'components/reactGridLayout';

interface Props {
  viewId: number;
}

const ViewWidgets = observer(({ viewId }: Props) => {
  const deviceStore = useContext(DevicesStoreContext);
  const viewStore = useContext(ViewStoreContext);
  const integrationStore = useContext(IntegrationStoreContext);

  if (!deviceStore.device) {
    console.error('Should not get here. Trying to load view widget without a device');
    return null;
  }
  const onLayoutChange = async (layout: ReactGridLayoutConfig[]) => {
    const updates = layout.map(l => ({
      widgetId: parseInt(l.i),
      config: {
        x: l.x,
        y: l.y,
        h: l.h,
        w: l.w
      }
    }));
    try {
      await viewStore.updateViewWidgets(viewId, updates);
    } catch (err) {
      console.error(`Error updating view widgets for ${viewId}`, err);
    }
  };

  if (!viewStore.views[viewId].widgets) {
    return <p>You need to add a widget. Todo</p>;
  }

  const widgetsForThisView = viewStore.views[viewId].widgets;

  if (!widgetsForThisView) {
    return <p>No view found</p>;
  }

  if (!widgetsForThisView.length) {
    return <p>Need to add</p>;
  }

  const deviceConfig = deviceStore.device.config;
  const layout: ReactGridLayoutConfig[] = widgetsForThisView.map(({ id, config }: IntegrationWidget) => ({
    i: id.toString(),
    w: config.w,
    h: config.h,
    x: config.x,
    y: config.y,
    minW: config.minW || 2,
    minH: config.minH || 2
  }));

  return (
    <ReactGridLayout
      onLayoutChange={onLayoutChange}
      layout={layout}
      cols={deviceConfig.columns}
      rowHeight={deviceConfig.rowHeight}
    >
      {widgetsForThisView.map((i: IntegrationWidget) => {
        const Cmp = integrationWidget(i);
        return (
          <div key={i.id}>
            <Cmp
              key={i.id}
              widgetId={i.id}
              integrationId={i.integrationId}
              widgetConfig={i.config}
              integrationConfig={integrationStore.integrations[i.integrationId].config}
            />
          </div>
        );
      })}
    </ReactGridLayout>
  );
});

export default ViewWidgets;
