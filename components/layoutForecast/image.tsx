const images: { [key: string]: string } = {
  'clear-day': '/static/weather/sun.jpg',
  'clear-night': '/static/weather/night.jpg',
  rain: '/static/weather/rain.jpg',
  snow: '/static/weather/snow.jpg',
  sleet: '/static/weather/snow.jpg',
  wind: '/static/weather/wind.jpg',
  fog: '/static/weather/fog.jpg',
  cloudy: '/static/weather/fog.jpg',
  'partly-cloudy-day': '/static/weather/sun-cloud.jpg',
  'partly-cloudy-night': '/static/weather/night-cloud.jpg'
};

const ForcastImage = (icon: string) => {
  const image = images[icon];
  if (!image) {
    return images['partly-cloudy-day'];
  }

  return image;
};

export default ForcastImage;
