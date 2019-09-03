import React from 'react';
import cn from 'classnames';
import Icon from 'components/icon';
import { H4 } from 'components/text';
import './styles.css';

interface Props {
  onSelect: (key: string) => void;
  pills: {
    key: string;
    icon: string;
    name: string;
    className?: string;
  }[];
}

const IconPill = ({ pills, onSelect }: Props) => {
  return (
    <div className="text-center">
      <div className="inline-flex border border-white rounded">
        {pills.map(({ key, icon, name, className }) => {
          return (
            <div
              onClick={() => onSelect(key)}
              key={name}
              className={cn(
                'cursor-pointer text-white hover:text-blue flex flex-col justify-center items-center iconPill w-40 h-40',
                className
              )}
            >
              <Icon icon={icon} className="w-16 h-16 current-stroke" />
              <H4 margin={false} className="pt-4 mb-0 text-inherit">
                {name}
              </H4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconPill;