const images: { [key: string]: string } = {
  skate: 'skate.jpg',
  coffee: 'coffee.jpg',
  clean: 'clean.jpg',
  tidy: 'tidy.jpg',
  cinema: 'movie.jpg',
  movie: 'movie.jpg',
  acupuncture: 'acupuncture.jpg',
  sharing: 'sharing.jpg',
  anzac: 'poppy.jpg',
  holiday: 'holiday.jpg',
  leave: 'holiday.jpg',
  easter: 'easter.jpg',
  chat: 'chat.jpg',
  talk: 'chat.jpg'
};

const randomImages: { [key: string]: string } = {
  blue: 'blue.jpg',
  green: 'green.jpg',
  red: 'red.jpg',
  orange: 'orange.jpg',
  yellow: 'yellow.jpg',
  purple: 'purple.jpg'
};

export const getImageUrl = (title: string): string | null => {
  const keys = Object.keys(images);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (title.toLowerCase().indexOf(key) !== -1) {
      return `/static/calendar/${images[key]}`;
    }
  }

  const randomImageKeys = Object.keys(randomImages);
  const randomImageKeyIdx = Math.floor(Math.random() * randomImageKeys.length);
  return `/static/calendar/${randomImages[randomImageKeys[randomImageKeyIdx]]}`;
};
