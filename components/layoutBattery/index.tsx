import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Panel from '../panel';
import { H4 } from '../text';
import Store from '../../store';
import { StoreContext } from '../../store';

import Low from '../../svg/charging-battery-low-1.svg';
import Lowish from '../../svg/charging-battery-low-3.svg';
import Ok from '../../svg/charging-battery-medium-1.svg';
import Full from '../../svg/charging-battery-full-1.svg';
import Unknown from '../../svg/charging-flash.svg';

export interface Props {
  entity_id: string;
  title?: string;
  height?: number;
  width?: number;
}

const dimensions: { [key: number]: string } = {
  1: '7.5rem',
  2: '15rem',
  3: '22.5rem',
  4: '30rem',
  5: '37.5rem',
  6: '45rem'
};

const LayoutBattery = observer(({ width = 1, height = 1, entity_id, title }: Props) => {
  const store = useContext(StoreContext) as Store;
  const styles = {
    height: dimensions[height],
    width: dimensions[width]
  };
  if (store.status !== 'AUTHENTICATED') {
    return <Panel fit={false} className="relative" style={styles} />;
  }

  const entity = store.data[entity_id];
  if (typeof entity === 'undefined' || entity.state === 'unavailable') {
    return (
      <Panel fit={false} className="relative" style={styles}>
        {title && <H4 className="uppercase mb-6 text-grey-dark">{title}</H4>}
      </Panel>
    );
  }

  const batt = (entity.attributes && entity.attributes.battery_level) || null;
  let Icon = <Unknown />;
  if (batt !== null) {
    if (batt < 25) {
      Icon = <Low />;
    } else if (batt < 50) {
      Icon = <Lowish />;
    } else if (batt < 75) {
      Icon = <Lowish />;
    } else if (batt < 100) {
      Icon = <Ok />;
      // Shouldn't get here, but figured if it's checking unpected values then by having this it'll sa
      // at unknown
      Icon = <Full />;
    }
  }

  return (
    <Panel fit={false} className="relative" style={styles}>
      {title && <H4 className="uppercase mb-6 text-grey-dark">{title}</H4>}
      <H4 className="text-grey-light mb-4 ml-4 absolute pin-b pin-l">{batt}</H4>
      <div className="absolute pin-center h-10 w-10 current-stroke text-grey-darker">{Icon}</div>
    </Panel>
  );
});

export default LayoutBattery;
