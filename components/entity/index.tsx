import React from 'react';
import { inject, observer } from 'mobx-react';
import Panel from '../panel';
import { H3 } from '../text';
import Store from '../../store';

export interface Props {
  entity_id: string;
  unitOfMeasurement?: string;
  store?: Store;
  title?: string;
}

const Entity = ({ entity_id, store, title }: Props) => {
  const entity = store!.data[entity_id];
  let state;
  if (typeof entity === 'undefined') {
    state = '--';
  } else {
    state = entity.state;
  }

  const units = (entity && entity.attributes && entity.attributes.unit_of_measurement) || '';
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
};

export default inject('store')(observer(Entity));
