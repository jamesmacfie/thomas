import React, { useContext, ReactNode } from "react";
import { observer } from "mobx-react-lite";
import IntegrationStore, { StoreContext } from "stores/integrations";
import Loader from "components/loader";

interface Props {
  children: ReactNode;
}

const IntegrationsWrapper = observer(({ children }: Props) => {
  const store = useContext(StoreContext) as IntegrationStore;

  if (!store.loaded) {
    return <Loader fullPage />;
  }

  return <>{children}</>;
});

export default IntegrationsWrapper;
