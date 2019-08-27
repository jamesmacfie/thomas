import React, { ReactNode } from 'react';
import Header from 'components/header';
import Navigation from 'containers/navigation';
import EditModeController from 'containers/editModeController';
import Drawer from 'components/drawer';

interface Props {
  children: ReactNode;
}

const Page = ({ children }: Props) => {
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
};

export default Page;
