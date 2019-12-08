import React from 'react';
import { useViews } from 'stores/views/hooks';
import Icon from 'components/icon';
import { H4 } from 'components/text';
import './styles.css';

interface Props {
  onSelect: (viewId: number) => void;
}

const ViewPillList = ({ onSelect }: Props) => {
  const views = useViews();
  return (
    <ul className="flex flex-col border border-white rounded">
      {Object.keys(views).map(key => {
        const view = views[key];
        return (
          <li
            className="viewPillListPill cursor-pointer flex p-4 items-center text-primary hover:text-blue"
            onClick={() => onSelect(parseInt(key))}
            key={key}
          >
            <Icon className="text-2xl mr-4 current-stroke" icon={view.icon as any} />
            <H4 margin={false} className="flex-grow text-inherit">
              {view.name}
            </H4>
          </li>
        );
      })}
    </ul>
  );
};

export default ViewPillList;
