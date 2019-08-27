import { ElementType } from 'react';
import google from './google/settings';
import darksky from './darksky/settings';
import NotFound from 'components/notFound';

const cmp = ({ slug }: { slug: string }): ElementType => {
  switch (slug) {
    case 'google':
      return google();
    case 'darksky':
      return darksky();
  }

  return NotFound;
};

export default cmp;
