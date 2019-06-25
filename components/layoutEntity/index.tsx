import React, { useContext, ReactNode } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import Panel from '../panel';
import { H4 } from '../text';
import Store from '../../store';
import { StoreContext } from '../../store';

export interface Props {
  entity_id: string;
  unitOfMeasurement?: string | null;
  unitOfMeasurementAlignment?: 'TOP' | 'BOTTOM';
  title?: string;
  height?: number;
  width?: number;
  state?: string;
  textSize?: 'SMALL' | 'MEDIUM' | 'LARGE';
  value?: (val: string) => ReactNode;
}

const dimensions: { [key: number]: string } = {
  1: '7.5rem',
  2: '15rem',
  3: '22.5rem',
  4: '30rem',
  5: '37.5rem',
  6: '45rem'
};

const LayoutEntity = observer(
  ({
    width = 1,
    height = 1,
    entity_id,
    title,
    unitOfMeasurement,
    unitOfMeasurementAlignment = 'TOP',
    state = 'state',
    textSize = 'LARGE',
    value
  }: Props) => {
    const store = useContext(StoreContext) as Store;
    const styles = {
      height: dimensions[height],
      width: dimensions[width]
    };
    if (store.status !== 'AUTHENTICATED') {
      return <Panel fit={false} className="relative" style={styles} />;
    }

    const entity = store.data[entity_id];
    let outputState;
    if (typeof entity === 'undefined' || entity[state] === 'unavailable') {
      outputState = '--';
    } else {
      outputState = entity[state];
    }

    const units =
      unitOfMeasurement !== undefined
        ? unitOfMeasurement
        : entity && entity.attributes && entity.attributes.unit_of_measurement;
    const textClasses = cn('mt-6 whitespace-no-wrap', {
      'text-xl': textSize === 'SMALL',
      'text-2xl': textSize === 'MEDIUM',
      'text-4xl': textSize === 'LARGE'
    });
    const unitOfMeasurementClasses = cn('text-base', {
      'align-top': unitOfMeasurementAlignment === 'TOP'
    });

    return (
      <Panel fit={false} className="relative" style={styles}>
        {title && <H4 className="uppercase text-grey-dark">{title}</H4>}
        <div className="absolute pin-center">
          <p className={textClasses}>
            {value ? value(outputState) : outputState}
            <span className={unitOfMeasurementClasses}>{units}</span>
          </p>
        </div>
      </Panel>
    );
  }
);

export default LayoutEntity;
