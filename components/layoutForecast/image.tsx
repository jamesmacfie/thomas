import React from 'react';

interface Props {
  icon: string;
  className?: string;
}

const images: { [key: string]: string } = {
  'clear-day': '/static/weather/sunny.png',
  'clear-night': '/static/weather/sunny_night.png',
  rain: '/static/weather/shower3.png',
  snow: '/static/weather/snow4.png',
  sleet: '/static/weather/sleep.png',
  wind: '/static/weather/mist.png',
  fog: '/static/weather/fog.png',
  cloudy: '/static/weather/cloudy5.png',
  'partly-cloudy-day': '/static/weather/cloudy5.png',
  'partly-cloudy-night': '/static/weather/cloudy4_night.png'
};

const ForcastImage = ({ icon, className }: Props) => {
  const image = images[icon];
  const src = !image ? images['partly-cloudy-day'] : image;

  return <img src={src} className={className} />;
};

export default ForcastImage;
