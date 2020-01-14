const gradients: { [key: string]: string } = {
  'clear-day': 'linear-gradient(#179ee7 5%, #00c8f1)',
  'clear-night': 'linear-gradient(#2a2b45 0%, #4c5d77)',
  rain: 'linear-gradient(#179ee7 5%, #00c8f1)',
  snow: 'linear-gradient(#179ee7 5%, #00c8f1)',
  sleet: 'linear-gradient(#179ee7 5%, #00c8f1)',
  wind: 'linear-gradient(#179ee7 5%, #00c8f1)',
  fog: 'linear-gradient(#179ee7 5%, #00c8f1)',
  cloudy: 'linear-gradient(#179ee7 5%, #00c8f1)',
  'partly-cloudy-day': 'linear-gradient(#179ee7 5%, #00c8f1)',
  'partly-cloudy-night': 'linear-gradient(#2a2b45 5%, #4c5d77)'
};

const ForcastGradient = (icon: string) => {
  const gradient = gradients[icon];
  if (!gradient) {
    return gradients['partly-cloudy-day'];
  }

  return gradient;
};

export default ForcastGradient;
