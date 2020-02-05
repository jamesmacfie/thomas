import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as DeviceViewsStoreContext } from 'stores/deviceViews';
import { StoreContext as UIStoreContext } from 'stores/ui';
import ReactGridLayout from 'components/reactGridLayout';
import AddNewDeviceViewModal from 'containers/addNewDeviceViewModal';
import useLongPress from 'hooks/useLongPress';
import NavigationItem, { Props as ItemProps } from './item';
import logger from 'utils/logger';

const settings = {
  id: 'settings',
  href: '/settings',
  icon: 'cog',
  text: 'Settings',
  hidePencil: true
};

const newDeviceView = {
  id: 'new',
  icon: 'plus-circle',
  text: 'Add new',
  addNewClick: true,
  hidePencil: true
};

interface Props {
  items: ItemProps[];
  onAddNewClick: () => void;
}

const NavigationItems = observer(({ items, onAddNewClick }: Props) => {
  const deviceViewStore = useContext(DeviceViewsStoreContext);

  const onLayoutChange = async (layout: ReactGridLayoutConfig[]) => {
    logger.debug('Layout change', { layout });
    const updates = layout.map(l => ({
      deviceViewId: l.i,
      order: l.y
    }));

    try {
      await deviceViewStore.updateAll(updates);
    } catch (error) {
      logger.error('Error updating nav layout', error);
    }
  };

  const layout: ReactGridLayoutConfig[] = items.map((i, idx) => {
    return {
      i: i.id.toString(),
      w: 1,
      h: 1,
      x: 0,
      y: idx
    };
  });

  return (
    <nav className="w-20 flex-shrink-0 double-border-right relative h-full">
      <ul className="list-reset flex flex-col">
        <ReactGridLayout
          onLayoutChange={onLayoutChange}
          width={500}
          cols={1}
          rowHeight={60}
          layout={layout}
          isResizable={false}
        >
          {items.map(i => (
            <li key={i.id} className="relative w-full">
              <NavigationItem onAddNewClick={onAddNewClick} {...i} />
            </li>
          ))}
        </ReactGridLayout>
      </ul>
    </nav>
  );
});

const Navigation = observer(() => {
  const deiviceViewsStore = useContext(DeviceViewsStoreContext);
  const uiStore = useContext(UIStoreContext);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const longPress = useLongPress(() => {
    logger.debug('Navigation long press. Starting edit mode');
    uiStore.startEditMode();
  }, 500);

  useEffect(() => {
    // Only save the changed layout to the store once editMode changes back to false.
    // Fixes an issue with infinite rerenders and PATCH calls
    if (!uiStore.editMode && deiviceViewsStore.loaded) {
      deiviceViewsStore.commitPendingUpdates();
    }
  }, [uiStore.editMode, deiviceViewsStore.loaded]);

  if (!deiviceViewsStore.loaded) {
    return <div />;
  }

  let deviceViewsAsItems: ItemProps[] = Object.values(deiviceViewsStore.deviceViews)
    .sort((a: any, b: any) => a.order - b.order)
    .map(({ id, viewId, icon, name }: DeviceView) => ({
      id,
      icon,
      href: `/p/${viewId}`,
      text: name
    }));

  if (!uiStore.editMode) {
    deviceViewsAsItems = deviceViewsAsItems.concat(settings);
  } else {
    deviceViewsAsItems = deviceViewsAsItems.concat(newDeviceView);
  }

  return (
    <div className="h-full" {...longPress}>
      <NavigationItems items={deviceViewsAsItems} onAddNewClick={() => setAddModalVisible(true)} />
      {addModalVisible && <AddNewDeviceViewModal onClose={() => setAddModalVisible(false)} />}
    </div>
  );
});

export default Navigation;
