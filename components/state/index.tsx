import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Store from '../../store';
import { StoreContext } from '../../store';

export interface Props {
  entity_id: string;
  unitOfMeasurement?: string;
}

const State = observer(({ entity_id }: Props) => {
  const store = useContext(StoreContext) as Store;
  const entity = store.data[entity_id];
  let state;
  if (typeof entity === 'undefined') {
    state = '--';
  } else {
    state = entity.state;
  }

  const units = (entity && entity.attributes && entity.attributes.unit_of_measurement) || '';
  return (
    <span>
      {state} {units}
    </span>
  );
});

export default State;
