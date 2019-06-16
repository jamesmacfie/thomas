import React from 'react';
import WeatherCloud from '../../svg/weather-cloud.svg';
import WeatherCloudNight from '../../svg/weather-night-cloudy.svg';
import QuestionCircle from '../../svg/question-circle.svg';

interface Props {
  icon: string;
}

const icons: { [key: string]: Function } = {
  'partly-cloudy-day': WeatherCloud,
  'partly-cloudy-night': WeatherCloudNight
};

const ForcastIcon = ({ icon }: Props) => {
  const classes = 'mx-auto w-16 text-white current-stroke';
  const Icon = icons[icon];
  if (!Icon) {
    console.log(icon);
    return <QuestionCircle className={classes} />;
  }

  return <Icon className={classes} />;
};

export default ForcastIcon;
