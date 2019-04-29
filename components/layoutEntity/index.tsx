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
  height?: number;
  width?: number;
}

const dimensions: { [key: number]: string } = {
  1: '9rem',
  2: '18rem',
  3: '27rem',
  4: '36rem',
  5: '45rem',
  6: '54rem'
};

const LayoutEntity = observer(({ width = 1, height = 1, entity_id, title, unitOfMeasurement }: Props) => {
  const store = useContext(StoreContext) as Store;
  const styles = {
    height: dimensions[height],
    width: dimensions[width]
  };
  if (store.status !== 'AUTHENTICATED') {
    return <Panel fit={false} className="relative" style={styles} />;
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
    <Panel fit={false} className="relative" style={styles}>
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

export default LayoutEntity;
