import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Store from '../../store';
import { StoreContext } from '../../store';

interface Props {
  entity_id: string;
  title: string;
}

const Number = observer(({ entity_id, title }: Props) => {
  const store = useContext(StoreContext) as Store;
  const entity = store!.data[entity_id];

  if (typeof entity === 'undefined') {
    return <p>No such entity</p>;
  }
  return (
    <p>
      {title}: {entity.state}{' '}
    </p>
  );
});

export default Number;
