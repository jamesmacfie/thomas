import React, { ReactNode } from 'react';
import { inject, observer } from 'mobx-react';
import Panel from '../panel';
import { H3, H4 } from '../text';
import Store from '../../store';

export interface Props {
  entity_id: string;
  store?: Store;
  title?: string;
  icon: (s: string | number) => ReactNode;
  subTitle: string | ((s: string) => void);
}

const Icon = ({ entity_id, store, title, subTitle, icon }: Props) => {
  const entity = store!.data[entity_id];
  let state;
  if (typeof entity === 'undefined') {
    state = 'off';
  } else {
    state = entity.state;
  }

  console.log('STATE', state);

  const cmp = icon(state);
  const subtitle = typeof subTitle === 'string' ? subTitle : subTitle(state.toString());
  return (
    <Panel fit={false} className="relative">
      {title && <H3 className="text-grey-dark">{title}</H3>}
      {subtitle && <H4 className="text-grey-light mb-4 ml-4 absolute pin-b pin-l">{subtitle}</H4>}
      <div className="absolute pin-center h-10 w-10 current-stroke text-grey-darker">{cmp}</div>
    </Panel>
  );
};

export default inject('store')(observer(Icon));
