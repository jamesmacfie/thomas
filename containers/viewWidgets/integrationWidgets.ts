import { ElementType } from 'react';
// @ts-ignore
import integrationWidget from 'thomas/integrationWidgets';

interface Slugs {
  widgetSlug: string;
  integrationSlug: string;
}

const cmp = ({ widgetSlug, integrationSlug }: Slugs): ElementType => {
  return integrationWidget(`${integrationSlug}_${widgetSlug}`);
};

export default cmp;
