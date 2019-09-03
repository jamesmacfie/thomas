import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as ViewStoreContext } from 'stores/views';
import Icon from 'components/icon';
import { H4 } from 'components/text';
import './styles.css';

interface Props {
  onSelect: (viewId: string) => void;
}

const ViewPillList = observer(({ onSelect }: Props) => {
  const viewStore = useContext(ViewStoreContext);
  return (
    <ul className="flex flex-col border border-white rounded">
      {Object.keys(viewStore.views).map(key => {
        const view = viewStore.views[key];
        return (
          <li
            className="viewPillListPill cursor-pointer flex p-4 items-center text-white hover:text-blue"
            onClick={() => onSelect(key)}
            key={key}
          >
            <Icon className="w-8 h-8 mr-4  current-stroke" icon={view.icon} />
            <H4 margin={false} className="flex-grow text-inherit">
              {view.name}
            </H4>
          </li>
        );
      })}
    </ul>
  );
});

export default ViewPillList;
