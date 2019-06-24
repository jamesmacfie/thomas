import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import Panel from '../panel';
import { H3, H4 } from '../text';
import Store from '../../store';
import { StoreContext } from '../../store';

export interface Props {
  entity_id: string;
  title?: string;
  icon: (s: string | number) => ReactNode;
  subTitle: string | ((s: string) => void);
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

const LayoutIcon = observer(({ width = 1, height = 1, entity_id, title, subTitle, icon }: Props) => {
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
    state = 'off';
  } else {
    state = entity.state;
  }

  const cmp = icon(state);
  const subtitle = typeof subTitle === 'string' ? subTitle : subTitle(state.toString());
  return (
    <Panel fit={false} className="relative" style={styles}>
      {title && <H4 className="uppercase mb-6 text-grey-dark">{title}</H4>}
      {subtitle && <H4 className="text-grey-light mb-4 ml-4 absolute pin-b pin-l">{subtitle}</H4>}
      <div className="absolute pin-center h-10 w-10 current-stroke text-grey-darker">{cmp}</div>
    </Panel>
  );
});

export default LayoutIcon;
