import React from 'react';
import Sun from '../../svg/weather-sun.svg';
import NightClear from '../../svg/weather-night-clear.svg';
import Rain from '../../svg/weather-cloud-heavy-rain.svg';
import Snow from '../../svg/weather-cloud-snow.svg';
import Hail from '../../svg/weather-night-hail.svg';
import Wind from '../../svg/weather-cloud-sun-wind.svg';
import CloudOne from '../../svg/weather-cloud-1.svg';
import Cloud from '../../svg/weather-cloud.svg';
import NightCloud from '../../svg/weather-night-cloudy.svg';

interface Props {
  className?: string;
  icon: string;
}

// How to make this not `any`?
const icons: { [key: string]: any } = {
  'clear-day': Sun,
  'clear-night': NightClear,
  rain: Rain,
  snow: Snow,
  sleet: Hail,
  wind: Wind,
  fog: CloudOne,
  cloudy: CloudOne,
  'partly-cloudy-day': Cloud,
  'partly-cloudy-night': NightCloud
};

const ForcastIcon = ({ className, icon }: Props) => {
  const Icon = icons[icon];
  if (!Icon) {
    return <Cloud className={className} />;
  }
  ``;

  return <Icon className={className} />;
};

export default ForcastIcon;
