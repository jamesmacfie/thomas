import React, { useState } from 'react';
import { Icon as IIcon } from '@fortawesome/fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as brands from '@fortawesome/free-brands-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';
import Icon from 'components/icon';
import Label from 'components/label';
import Select, { components } from 'components/select';
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

const CustomMenuList = (props: any) => {
  // This toggles the CSS grid class which determines the block like layout of the icons. If there are no options
  // then we don't want the block like layout as it looks a little odd being so narrow.
  const classes = props.optionCount > 0 ? 'iconSearchHasOptions' : '';
  return (
    <div className={classes}>
      <components.MenuList {...props}>{props.children}</components.MenuList>
    </div>
  );
};

const CustomOption = ({ data, innerProps, innerRef }: any) => {
  return (
    <div ref={innerRef} {...innerProps} className="iconSearchIcon flex items-center justify-center">
      <Icon icon={data.value} className="mx-4" />
    </div>
  );
};

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
  const onIconClick = (iconName: string) => {
    setSelectedIcon(iconName);
    onSelect(iconName);
  };
  let iconNamesToShow;
  if (searchString.length) {
    iconNamesToShow = defaultIcons.filter(name => {
      const normalisedSearchString = searchString.toLowerCase().replace(' ', '');
      return name.indexOf(normalisedSearchString) !== -1 ? name : null;
    }) as string[];
  } else {
    iconNamesToShow = defaultIcons;
  }

  return (
    <div className={className}>
      {showLabel && <Label>Search</Label>}
      <div className="flex w-full">
        <Select
          isSearchable
          onInputChange={setSearchString}
          options={defaultIcons.map(o => ({ value: o, label: o }))}
          components={{
            Option: CustomOption,
            MenuList: (props: any) => <CustomMenuList {...props} optionCount={iconNamesToShow.length} />
          }}
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
