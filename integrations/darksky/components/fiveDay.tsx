import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../store';
import Panel from 'components/panel';

const Wrapper = ({ children }: { children?: ReactNode }) => <Panel fit={false}>{children}</Panel>;

const FiveDay = observer(({ integrationId }: IntegrationComponentProps) => {
  const store = useContext(StoreContext);
  const forecast = store.forecasts[integrationId];

  if (!forecast) {
    return <Wrapper />;
  }

  return (
    <Wrapper>
      <p>5 day forecast</p>
    </Wrapper>
  );
});

export default FiveDay;
