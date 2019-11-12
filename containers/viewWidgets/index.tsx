import React, { useContext } from 'react';
import { useDevice } from 'stores/devices/hooks';
import { useViewWidgets } from 'stores/views/hooks';
import { StoreContext as ViewStoreContext } from 'stores/views';
import ReactGridLayout from 'components/reactGridLayout';
import AddFirstViewWidget from 'containers/addFirstViewWidget';
import logger from 'utils/logger';
import Widget from './widget';

interface Props {
  viewId: number;
}

const ViewWidgets = ({ viewId }: Props) => {
  const device = useDevice();
  const widgets = useViewWidgets(viewId);
  const viewStore = useContext(ViewStoreContext);

  if (!device) {
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

  if (!widgets) {
    return <p>You need to add a widget. Todo</p>;
  }

  if (!widgets.length) {
    return <AddFirstViewWidget />;
  }

  const deviceConfig = device.config;
  const layout: ReactGridLayoutConfig[] = widgets.map(({ id, config }: IntegrationWidget) => ({
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
      {widgets.map((widget: IntegrationWidget) => {
        // TODO - there's a case where integrationStore.integrations[i.integrationId].config could return undefined
        return (
          <div key={widget.id} className="relative">
            <Widget widget={widget} />
          </div>
        );
      })}
    </ReactGridLayout>
  );
};

export default ViewWidgets;
