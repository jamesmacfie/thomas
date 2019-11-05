import { ElementType } from 'react';
import NotFound from 'components/notFound';
import TestOne from './testOne';
import TestTwo from './testTwo';

const cmp = (slug: string): ElementType => {
  switch (slug) {
    case 'one':
      return TestOne;
    case 'two':
      return TestTwo;
  }

  return NotFound;
};

export default cmp;
