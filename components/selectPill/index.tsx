import React from 'react';
import cn from 'classnames';
import './styles.css';

interface Props {
  value?: string;
  name: string;
  alt?: boolean;
  onSelect: (name: string, key: string) => void;
  pills: {
    value: string;
    text: string;
    className?: string;
  }[];
}

const IconPill = ({ pills, name, alt, onSelect, value }: Props) => {
  const containerClasses = alt ? 'alt border-grey-darker' : 'bg-grey-lighter bg-grey-darkest';
  const pillClasses = alt ? 'select-pill-alt text-grey-darker' : 'select-pill text-primary';
  return (
    <div
      className={`${containerClasses} text-center inline-flex rounded-sm border focus:border-grey-light mb-4 w-full`}
    >
      {pills.map(({ text, className, ...pill }) => {
        const v = pill.value;
        const isSelected = v === value;
        return (
          <div
            onClick={() => onSelect(name, v)}
            key={v}
            className={cn('cursor-pointer px-4 py-2', pillClasses, className, {
              'bg-blue text-primary': isSelected
            })}
          >
            <span
              className={`text-xs text-bold uppercase ${isSelected ? 'hover:text-grey-darkest' : 'hover:text-blue'}`}
            >
              {text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default IconPill;
