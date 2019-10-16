import React, { ReactNode, useContext, useEffect } from 'react';
import Header from 'containers/header';
import { observer } from 'mobx-react-lite';
import { StoreContext as DevicesStoreContext } from 'stores/devices';
import Navigation from 'containers/navigation';
import EditModeController from 'containers/editModeController';

interface Props {
  children: ReactNode;
}

const NoNav = ({ children }: Props) => {
  return (
    <div className="flex flex-grow w-screen">
      <div className="flex-grow">
        {children}
        <EditModeController />
      </div>
    </div>
  );
};

const LeftNav = ({ children }: Props) => {
  return (
    <div className="flex flex-grow w-screen">
      <div className="w-20 flex-shrink-0">
        <Navigation />
      </div>
      <div className="flex-grow">
        {children}
        <EditModeController />
      </div>
    </div>
  );
};

const RightNav = ({ children }: Props) => {
  return (
    <div className="flex flex-grow w-screen">
      <div className="flex-grow pl-6">
        {children}
        <EditModeController />
      </div>
      <div className="w-20 flex-shrink-0">
        <Navigation />
      </div>
    </div>
  );
};

const BottomNav = ({ children }: Props) => {
  return (
    <div className="flex flex-col flex-grow w-screen">
      <div className="flex-grow px-6">
        {children}
        <EditModeController />
      </div>
      <div className="h-20 flex-shrink-0 w-full">
        <Navigation />
      </div>
    </div>
  );
};

const getNavCmp: (placement: string) => any = placement => {
  switch (placement) {
    case 'left':
      return LeftNav;
    case 'right':
      return RightNav;
    case 'bottom':
      return BottomNav;
  }

  return LeftNav;
};

const Page = observer(({ children }: Props) => {
  const devicesStore = useContext(DevicesStoreContext);
  // Define base font Size. If we have a device set, use their config ( TODO )
  let fontSize = '15px';
  useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
  }, [fontSize]);

  let Cmp: any;
  if (!devicesStore.device) {
    Cmp = NoNav;
  } else {
    fontSize = `${devicesStore.device.config.zoom + 15}px`;
    Cmp = getNavCmp(devicesStore.device.config.sideNavPlacement);
  }

  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="flex flex-col h-screen w-screen">
          <Header />
          <Cmp>{children}</Cmp>
        </div>
      </div>
    </div>
  );
});

export default Page;
