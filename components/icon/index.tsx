import React, { ReactNode, useContext } from 'react';
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
}

const Icon = observer(({ entity_id, title, subTitle, icon }: Props) => {
  const store = useContext(StoreContext) as Store;
  const entity = store!.data[entity_id];
  let state;
  if (typeof entity === 'undefined') {
    state = 'off';
  } else {
    state = entity.state;
  }

  const cmp = icon(state);
  const subtitle = typeof subTitle === 'string' ? subTitle : subTitle(state.toString());
  return (
    <Panel fit={false} className="relative">
      {title && <H3 className="text-grey-dark">{title}</H3>}
      {subtitle && <H4 className="text-grey-light mb-4 ml-4 absolute pin-b pin-l">{subtitle}</H4>}
      <div className="absolute pin-center h-10 w-10 current-stroke text-grey-darker">{cmp}</div>
    </Panel>
  );
});

export default Icon;
