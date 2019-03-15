import React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../store';

interface Props {
  entity_id: string;
  store?: Store;
}

const Temperature = ({ entity_id, store }: Props) => {
  const temp = store!.data[entity_id];

  if (typeof temp === 'undefined') {
    return <p>No such temp</p>;
  }
  return <p>Temp: {temp.state} degrees</p>;
};

export default inject('store')(observer(Temperature));
