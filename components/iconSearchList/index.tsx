import React, { useState } from 'react';
import cn from 'classnames';
import { useDebouncedCallback } from 'use-debounce';
import { Icon as IIcon } from '@fortawesome/fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as brands from '@fortawesome/free-brands-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';
import Icon from 'components/icon';
import Label from 'components/label';
import Input from 'components/input';
import './styles.css';

const allIcons = { ...solid, ...brands, ...regular };
delete allIcons.fas;
delete allIcons.fab;
delete allIcons.far;
delete allIcons.prefix;

const defaultIcons = [
  'faHome',
  'faBed',
  'faBookOpen',
  'faLaptop',
  'faKeyboard',
  'faTv',
  'faXbox',
  'faPlaystation',
  'faBuilding,',
  'faWarehouse,',
  'faWarehouse',
  'faCoffee',
  'faEnvelope',
  'faMarker',
  'faPencil',
  'faCar',
  'faMotorcycle',
  'faTruck',
  'faCat',
  'faDog',
  'faKiwiBird',
  'faTshirt',
  'faBaby',
  'faSmile',
  'faKiss',
  'faWheelchair',
  'faBeer',
  'faDrum',
  'faMusic',
  'faBolt'
];

export const iconNames = Object.keys(allIcons);
interface Props {
  className?: string;
  iconListClassName?: string;
  showLabel?: boolean;
  onSelect: (iconName: string) => void;
}

const IconList = ({ className, iconListClassName, showLabel = true, onSelect }: Props) => {
  const [selectedIcon, setSelectedIcon] = useState<null | IIcon>(null);
  const [searchString, setSearchString] = useState('');
  const [debouncedOnSearchChange] = useDebouncedCallback(value => {
    setSearchString(value);
  }, 1000);
  const onIconClick = (iconName: string) => {
    const icon: IIcon = (allIcons as any)[iconName];
    setSelectedIcon(icon);
    onSelect(icon.iconName);
  };
  let iconNamesToShow;
  if (searchString.length) {
    iconNamesToShow = iconNames.map(k => {
      const withoutFa = k.substring(2);
      const normalisedSearchString = searchString.toLowerCase().replace(' ', '');
      const normalisedIconName = withoutFa.toLowerCase().replace(' ', '');
      return normalisedIconName.indexOf(normalisedSearchString) !== -1 ? k : null;
    }) as string[];
  } else {
    iconNamesToShow = defaultIcons; //.map(i => i.icon);
  }

  return (
    <div className={className}>
      {showLabel && <Label>Search</Label>}
      <div className="flex w-full">
        <Input className="mb-4 w-full flex-grow" onChange={(e: any) => debouncedOnSearchChange(e.target.value)} />
        {selectedIcon && (
          <span className="mt-3 ml-4 text-sm flex">
            <Label className="mr-4 ">Selected:</Label>
            <Icon icon={selectedIcon.iconName} />
          </span>
        )}
      </div>
      <div className={cn(iconListClassName, 'iconSearchList')}>
        {iconNamesToShow.map((icon: any) => {
          const faIcon: any = (allIcons as any)[icon];

          return !faIcon ? null : (
            <div className="h-24 border border-white iconSearchIcon p-2 flex items-center justify-center">
              <Icon
                onClick={() => onIconClick(icon)}
                key={icon}
                className={cn('cursor-pointer hover:text-blue iconSearchFA', {
                  'text-blue': icon === selectedIcon
                })}
                icon={faIcon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconList;
