import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as ApplicationStoreContext } from 'stores/application';

interface Props {
  children: ReactNode;
}

const ApplicationWrapper = observer(({ children }: Props) => {
  const applicationStore = useContext(ApplicationStoreContext);

  if (!applicationStore.loaded) {
    return null;
  }

  if (applicationStore.error) {
    return <p>Oh no!!</p>;
  }

  return <>{children}</>;
});

export default ApplicationWrapper;
