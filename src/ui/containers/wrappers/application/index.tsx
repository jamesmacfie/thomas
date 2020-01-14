import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as ApplicationStoreContext } from 'stores/application';
import HeadlessWidgetsWrapper from '../headlessWidgets';

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

  return <HeadlessWidgetsWrapper children={children} />;
});

export default ApplicationWrapper;
