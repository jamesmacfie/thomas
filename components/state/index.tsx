import React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../store';

export interface Props {
  entity_id: string;
  unitOfMeasurement?: string;
  store?: Store;
}

const State = ({ entity_id, store }: Props) => {
  const entity = store!.data[entity_id];
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
};

export default inject('store')(observer(State));
