import React from 'react';

const api_url = process.env.REACT_APP_API_URL;

interface Props {
  icon: string;
  className?: string;
}

const images: { [key: string]: string } = {
  'clear-day': `${api_url}/api/static/darksky/sunny.png`,
  'clear-night': `${api_url}/api/static/darksky/sunny_night.png`,
  rain: `${api_url}/api/static/darksky/shower3.png`,
  snow: `${api_url}/api/static/darksky/snow4.png`,
  sleet: `${api_url}/api/static/darksky/sleep.png`,
  wind: `${api_url}/api/static/darksky/mist.png`,
  fog: `${api_url}/api/static/darksky/fog.png`,
  cloudy: `${api_url}/api/static/darksky/cloudy5.png`,
  'partly-cloudy-day': `${api_url}/api/static/darksky/cloudy5.png`,
  'partly-cloudy-night': `${api_url}/api/static/darksky/cloudy4_night.png`
};

const ForcastImage = ({ icon, className }: Props) => {
  const image = images[icon];
  const src = !image ? images['partly-cloudy-day'] : image;

  return <img alt={icon} src={src} className={className} />;
};

export default ForcastImage;
