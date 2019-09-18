import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as ApplicationStoreContext } from 'stores/application';
import Loader from 'components/loader';

interface Props {
  children: ReactNode;
}

const ApplicationWrapper = observer(({ children }: Props) => {
  const applicationStore = useContext(ApplicationStoreContext);

  if (!applicationStore.loaded) {
    return <Loader fullPage />;
  }

  if (applicationStore.error) {
    return <p>Oh no!!</p>;
  }

  return <>{children}</>;
});

export default ApplicationWrapper;
