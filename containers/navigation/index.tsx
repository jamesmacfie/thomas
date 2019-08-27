import React, { useContext, ReactNode } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { StoreContext as DeviceViewsStoreContext } from 'stores/deviceViews';
import { StoreContext as UIStoreContext } from 'stores/ui';
import Icon from 'components/icon';
import ReactGridLayout from 'components/reactGridLayout';
import useLongPress from 'hooks/useLongPress';

const settings = {
  id: 'settings',
  href: '/settings',
  icon: 'cog',
  text: 'Settings'
};

type Item = {
  id: string;
  icon: string;
  href: string;
  text: string;
};
interface Props {
  items: Item[];
}

const Container = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

const NavigationItems = observer(({ items }: Props) => {
  const deviceViewStore = useContext(DeviceViewsStoreContext);
  const uiStore = useContext(UIStoreContext);
  const longPress = useLongPress(() => {
    uiStore.startEditMode();
  }, 500);
  const onLinkClick = (event: any) => {
    if (uiStore.editMode) {
      // We have a long press registered or we are in edit more. Don't follow the anchor
      event.preventDefault();
    }
  };
  const { asPath } = useRouter();
  const onLayoutChange = async (layout: ReactGridLayoutConfig[]) => {
    console.log('layout', layout);
    const updates = layout
      .map(l => ({
        deviceViewId: l.i,
        order: l.y
      }))
      .filter(l => l.deviceViewId !== 'settings');

    console.log('Sending updates', updates);

    await deviceViewStore.updateDeviceViews(updates);
  };

  const layout: ReactGridLayoutConfig[] = items.map((i, idx) => {
    return {
      i: i.id,
      w: 1,
      h: 1,
      x: 0,
      y: idx,
      static: i.id === 'settings'
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
          {items.map(({ id, href, icon }: Item) => {
            const isActive = asPath === href;
            const anchorClasses = cn('current-stroke w-16 h-16 flex items-center justify-center', {
              'text-white': isActive,
              'text-grey-darker hover:text-white': !isActive
            });
            const showPencil = uiStore.editMode && id !== 'settings';
            return (
              <li key={id} {...longPress} className="relative w-full">
                {showPencil && (
                  <Icon
                    icon="pencil"
                    className="w-5 h-5 absolute right-0 top-0 text-green current-stroke border border-green rounded-full p-1"
                  />
                )}
                <Link href={href}>
                  <a className={anchorClasses} onClick={onLinkClick}>
                    <Icon icon={icon} className="w-8 h-8" />
                  </a>
                </Link>
              </li>
            );
          })}
        </ReactGridLayout>
      </ul>
    </nav>
  );
});

const Navigation = observer(() => {
  const store = useContext(DeviceViewsStoreContext);

  if (store.deviceViews === null) {
    return (
      <Container>
        <NavigationItems items={[settings]} />
      </Container>
    );
  }

  console.log(toJS(Object.values(store.deviceViews)));
  const deviceViewsAsItems: Item[] = Object.values(store.deviceViews)
    .sort((a: any, b: any) => a.order - b.order)
    .map(({ id, viewId, icon, name }: DeviceView) => ({
      id,
      icon,
      href: `/p/${viewId}`,
      text: name
    }));

  return (
    <Container>
      <NavigationItems items={deviceViewsAsItems.concat(settings)} />
    </Container>
  );
});

export default Navigation;
