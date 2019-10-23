import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as DevicesStoreContext } from 'stores/devices';
import { StoreContext as ViewStoreContext } from 'stores/views';
import ReactGridLayout from 'components/reactGridLayout';
import AddFirstViewWidget from 'containers/addFirstViewWidget';
import logger from 'utils/logger';
import Widget from './widget';

interface Props {
  viewId: number;
}

const ViewWidgets = observer(({ viewId }: Props) => {
  const deviceStore = useContext(DevicesStoreContext);
  const viewStore = useContext(ViewStoreContext);

  if (!deviceStore.device) {
    logger.error('<ViewWidgets />Should not get here. Trying to load view widget without a device');
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
      await viewStore.updateWidgets(viewId, updates);
    } catch (error) {
      // TODO - show error
      logger.error(`Error updating view widgets for ${viewId}`, { error });
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
    return <AddFirstViewWidget />;
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
      {widgetsForThisView.map((widget: IntegrationWidget) => {
        // TODO - there's a case where integrationStore.integrations[i.integrationId].config could return undefined
        return (
          <div key={widget.id}>
            <Widget widget={widget} />
          </div>
        );
      })}
    </ReactGridLayout>
  );
});

export default ViewWidgets;
