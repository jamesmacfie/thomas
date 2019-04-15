import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Panel from '../panel';
import { H3 } from '../text';
import Store from '../../store';
import { StoreContext } from '../../store';

export interface Props {
  entity_id: string;
  unitOfMeasurement?: string;
  title?: string;
}

const Entity = observer(({ entity_id, title, unitOfMeasurement }: Props) => {
  const store = useContext(StoreContext) as Store;
  if (store.status !== 'AUTHENTICATED') {
    return <Panel fit={false} className="relative" />;
  }

  const entity = store.data[entity_id];
  let state;
  if (typeof entity === 'undefined') {
    state = '--';
  } else {
    state = entity.state;
  }

  const units = unitOfMeasurement || (entity && entity.attributes && entity.attributes.unit_of_measurement) || '';
  return (
    <Panel fit={false} className="relative">
      {title && <H3 className="mb-6 text-grey-dark">{title}</H3>}
      <div className="absolute pin-center">
        <p className="text-4xl whitespace-no-wrap">
          {state}
          <span className="text-base align-top">{units}</span>
        </p>
      </div>
    </Panel>
  );
});

export default Entity;
