import React from 'react';

interface Props {
  icon: string;
  className?: string;
}

const images: { [key: string]: string } = {
  'clear-day': '/static/darksky/sunny.png',
  'clear-night': '/static/darksky/sunny_night.png',
  rain: '/static/darksky/shower3.png',
  snow: '/static/darksky/snow4.png',
  sleet: '/static/darksky/sleep.png',
  wind: '/static/darksky/mist.png',
  fog: '/static/darksky/fog.png',
  cloudy: '/static/darksky/cloudy5.png',
  'partly-cloudy-day': '/static/darksky/cloudy5.png',
  'partly-cloudy-night': '/static/darksky/cloudy4_night.png'
};

const ForcastImage = ({ icon, className }: Props) => {
  const image = images[icon];
  const src = !image ? images['partly-cloudy-day'] : image;

  return <img src={src} className={className} />;
};

export default ForcastImage;
