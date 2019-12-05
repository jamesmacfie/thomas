import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Icon as IIcon } from '@fortawesome/fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as brands from '@fortawesome/free-brands-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';
import Icon from 'components/icon';
import Label from 'components/label';
import Select from 'components/select';
import './styles.css';

const allIcons = { ...solid, ...brands, ...regular };
delete allIcons.fas;
delete allIcons.fab;
delete allIcons.far;
delete allIcons.prefix;

const defaultIcons = [
  'home',
  'bed',
  'book-open',
  'laptop',
  'keyboard',
  'tv',
  'building',
  'warehouse',
  'coffee',
  'envelope',
  'marker',
  'car',
  'motorcycle',
  'truck',
  'cat',
  'dog',
  'kiwi-bird',
  'tshirt',
  'baby',
  'smile',
  'kiss',
  'wheelchair',
  'beer',
  'drum',
  'music',
  'bolt'
];

const customOption = ({ data, innerProps, innerRef }: any) => {
  return (
    <div ref={innerRef} {...innerProps} className="iconSearchIcon flex items-center justify-center">
      <Icon icon={data.value} className="mx-4" />
    </div>
  );
};

export const iconNames = Object.keys(allIcons);
interface Props {
  value?: IIcon;
  className?: string;
  iconListClassName?: string;
  showLabel?: boolean;
  onSelect: (iconName: string) => void;
}

const IconList = ({ className, showLabel = true, onSelect }: Props) => {
  const [selectedIcon, setSelectedIcon] = useState<null | string>(null);
  const [searchString, setSearchString] = useState('');
  const [debouncedOnSearchChange] = useDebouncedCallback(value => {
    setSearchString(value);
  }, 1000);
  console.log(debouncedOnSearchChange);
  const onIconClick = (iconName: string) => {
    console.log('clicked', iconName);
    setSelectedIcon(iconName);
    onSelect(iconName);
  };
  let iconNamesToShow;
  if (searchString.length) {
    // TODO
    iconNamesToShow = iconNames.map(k => {
      const withoutFa = k.substring(2);
      const normalisedSearchString = searchString.toLowerCase().replace(' ', '');
      const normalisedIconName = withoutFa.toLowerCase().replace(' ', '');
      return normalisedIconName.indexOf(normalisedSearchString) !== -1 ? k : null;
    }) as string[];
  } else {
    iconNamesToShow = defaultIcons;
  }

  console.log(iconNamesToShow);
  return (
    <div className={className}>
      {showLabel && <Label>Search</Label>}
      <div className="flex w-full">
        <Select
          options={defaultIcons.map(o => ({ value: o, label: o }))}
          components={{ Option: customOption }}
          className="mb-4 w-full flex-grow"
          onChange={(e: any) => onIconClick(e.value)}
        />
        <span className="mt-3 ml-4 text-sm flex">
          <Label className="mr-4 ">Selected:</Label>
          {selectedIcon ? <Icon icon={selectedIcon as any} /> : <span className="w-4" />}
        </span>
      </div>
    </div>
  );
};

export default IconList;
