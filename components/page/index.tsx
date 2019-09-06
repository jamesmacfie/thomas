import React, { ReactNode, useContext, useEffect } from 'react';
import Header from 'components/header';
import { observer } from 'mobx-react-lite';
import { StoreContext as DeviceStoreContext } from 'stores/device';
import Navigation from 'containers/navigation';
import EditModeController from 'containers/editModeController';
import Drawer from 'components/drawer';

interface Props {
  children: ReactNode;
}

const Page = observer(({ children }: Props) => {
  const deviceStore = useContext(DeviceStoreContext);
  const fontSize = `${deviceStore.device!.config.zoom + 12}px`;
  useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
  }, [fontSize]);

  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="flex flex-col h-screen w-screen">
          <Header />
          <div className="flex flex-grow w-screen">
            <div className="w-20 flex-shrink-0">
              <Navigation />
            </div>
            <div className="flex-grow">
              {children}
              <EditModeController />
            </div>
          </div>
        </div>
      </div>
      <Drawer />
    </div>
  );
});

export default Page;
