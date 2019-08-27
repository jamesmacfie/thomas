import { ElementType } from 'react';
// @ts-ignore
import integrationComponent from 'thomas/integrationComponents';

interface Slugs {
  componentSlug: string;
  integrationSlug: string;
}

const cmp = ({ componentSlug, integrationSlug }: Slugs): ElementType => {
  return integrationComponent(`${integrationSlug}_${componentSlug}`);
};

export default cmp;
