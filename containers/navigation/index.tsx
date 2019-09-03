import React, { useContext, ReactNode, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as DeviceViewsStoreContext } from 'stores/deviceViews';
import { StoreContext as UIStoreContext } from 'stores/ui';
import ReactGridLayout from 'components/reactGridLayout';
import AddNewDeviceViewModal from 'containers/addNewDeviceViewModal';
import NavigationItem, { Props as ItemProps } from './item';

const settings = {
  id: 'settings',
  href: '/settings',
  icon: 'cog',
  text: 'Settings',
  hidePencil: true
};

const newDeviceView = {
  id: 'new',
  icon: 'addCircle',
  text: 'Add new',
  addNewClick: true,
  hidePencil: true
};

interface Props {
  items: ItemProps[];
  onAddNewClick: () => void;
}

const Container = ({ children }: { children?: ReactNode }) => {
  return <div>{children}</div>;
};

const NavigationItems = observer(({ items, onAddNewClick }: Props) => {
  const deviceViewStore = useContext(DeviceViewsStoreContext);

  const onLayoutChange = async (layout: ReactGridLayoutConfig[]) => {
    const updates = layout
      .map(l => ({
        deviceViewId: l.i,
        order: l.y,
        static: l.static
      }))
      .filter(l => !l.static);

    try {
      await deviceViewStore.updateDeviceViews(updates);
    } catch (err) {
      console.error('Error updating nav layout', err);
    }
  };

  const layout: ReactGridLayoutConfig[] = items.map((i, idx) => {
    console.log(i);
    return {
      i: i.id.toString(),
      w: 1,
      h: 1,
      x: 0,
      y: idx,
      static: !!i.hidePencil
    };
  });

  return (
    <nav className="w-20 flex-no-shrink double-border-right relative">
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
            <NavigationItem key={i.id} onAddNewClick={onAddNewClick} {...i} />
          ))}
        </ReactGridLayout>
      </ul>
    </nav>
  );
});

const Navigation = observer(() => {
  const deiviceViewsStore = useContext(DeviceViewsStoreContext);
  const UIStore = useContext(UIStoreContext);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);

  if (!deiviceViewsStore.loaded) {
    return <Container />;
  }

  let deviceViewsAsItems: ItemProps[] = Object.values(deiviceViewsStore.deviceViews)
    .sort((a: any, b: any) => a.order - b.order)
    .map(({ id, viewId, icon, name }: DeviceView) => ({
      id,
      icon,
      href: `/p/${viewId}`,
      text: name
    }));

  if (UIStore.editMode) {
    deviceViewsAsItems = deviceViewsAsItems.concat(newDeviceView);
  }
  deviceViewsAsItems = deviceViewsAsItems.concat(settings);

  return (
    <Container>
      <NavigationItems items={deviceViewsAsItems} onAddNewClick={() => setAddModalVisible(true)} />
      {addModalVisible && <AddNewDeviceViewModal onClose={() => setAddModalVisible(false)} />}
    </Container>
  );
});

export default Navigation;
