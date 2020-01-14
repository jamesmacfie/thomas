import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../store';

interface Props {
  children: ReactNode;
}

const HomeAssistantWrapper = observer(({ children }: Props) => {
  const store = useContext(StoreContext);

  if (!store.loaded) {
    return null;
  }

  return <>{children}</>;
});

export default HomeAssistantWrapper;
