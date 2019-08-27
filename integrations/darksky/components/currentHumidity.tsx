import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import Store, { StoreContext } from '../store';
import Panel from 'components/panel';

const Wrapper = ({ children }: { children?: ReactNode }) => <Panel fit={false}>{children}</Panel>;

const CurrentHumidity = observer(({ integrationId }: IntegrationComponentProps) => {
  const store = useContext(StoreContext) as Store;
  const forecast = store.forecasts[integrationId];

  if (!forecast) {
    return <Wrapper />;
  }

  return (
    <Wrapper>
      <p>Got humidity</p>
    </Wrapper>
  );
});

export default CurrentHumidity;
