import React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../store';

interface Props {
  entity_id: string;
  title: string;
  store?: Store;
}

const Number = ({ entity_id, store, title }: Props) => {
  const entity = store!.data[entity_id];

  if (typeof entity === 'undefined') {
    return <p>No such entity</p>;
  }
  return (
    <p>
      {title}: {entity.state}{' '}
    </p>
  );
};

export default inject('store')(observer(Number));
