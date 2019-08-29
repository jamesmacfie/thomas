import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as ViewStoreContext } from 'stores/views';
import { StoreContext as IntegrationStoreContext } from 'stores/integrations';
import integrationComponent from './integrationComponents';
import ReactGridLayout from 'components/reactGridLayout';

interface Props {
  viewId: number;
}

const ViewComponents = observer(({ viewId }: Props) => {
  const viewStore = useContext(ViewStoreContext);
  const integrationStore = useContext(IntegrationStoreContext);
  const onLayoutChange = async (layout: ReactGridLayoutConfig[]) => {
    const updates = layout.map(l => ({
      componentId: parseInt(l.i),
      config: {
        x: l.x,
        y: l.y,
        h: l.h,
        w: l.w
      }
    }));
    try {
      await viewStore.updateViewComponents(viewId, updates);
    } catch (err) {
      console.error(`Error updating view components for ${viewId}`, err);
    }
  };

  if (!viewStore.views[viewId].components) {
    return <p>You need to add a component. Todo</p>;
  }

  const componentsForThisView = viewStore.views[viewId].components;

  if (!componentsForThisView) {
    return <p>No view found</p>;
  }

  if (!componentsForThisView.length) {
    return <p>Need to add</p>;
  }

  const layout: ReactGridLayoutConfig[] = componentsForThisView.map(({ id, config }: IntegrationComponent) => ({
    i: id.toString(),
    w: config.w,
    h: config.h,
    x: config.x,
    y: config.y,
    minX: 2,
    minY: 2
  }));

  return (
    <ReactGridLayout onLayoutChange={onLayoutChange} layout={layout} cols={20} rowHeight={50}>
      {componentsForThisView.map((i: IntegrationComponent) => {
        const Cmp = integrationComponent(i);
        return (
          <div key={i.id}>
            <Cmp
              key={i.id}
              componentId={i.id}
              integrationId={i.integrationId}
              componentConfig={i.config}
              integrationConfig={integrationStore.integrations[i.integrationId].config}
            />
          </div>
        );
      })}
    </ReactGridLayout>
  );
});

export default ViewComponents;
