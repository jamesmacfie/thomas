import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Icon from 'components/icon';
import Label from 'components/label';
import Input from 'components/input';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as brands from '@fortawesome/free-brands-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';
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
}

const IconList = ({ className }: Props) => {
  const [searchString, setSearchString] = useState('');
  const [debouncedOnSearchChange] = useDebouncedCallback(value => {
    setSearchString(value);
  }, 1000);
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
      <Label>Search</Label>
      <Input className="mb-4" onChange={(e: any) => debouncedOnSearchChange(e.target.value)} />
      <div className="iconSearchList">
        {iconNamesToShow.map((icon: any) => {
          const faIcon: any = (allIcons as any)[icon];
          return !faIcon ? null : (
            <div className="w-24 h-24 border border-white iconSearchIcon p-2 flex items-center justify-center">
              <Icon key={icon.name} className="cursor-pointer hover:text-blue iconSearchFA" icon={faIcon} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconList;
