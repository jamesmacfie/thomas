import React, { ReactNode } from 'react';
import { useSystemIntegrations } from 'stores/integrations/hooks';
import integrationWidgets from 'thomas/integrationWidgets';

interface Props {
  children: ReactNode;
}

interface SystemIntegrationWidgetWithIntegrationSlug extends SystemIntegrationWidget {
  integrationSlug: string;
}

/**
 * Recursive function that takes an array of react components that all accept `children` and renders then
 * al inside each other
 */
const renderInside: any = (rest: any[]) => {
  if (rest.length > 1) {
    const firstWidget: SystemIntegrationWidgetWithIntegrationSlug = rest[0];
    const FirstWidget = integrationWidgets(`${firstWidget.integrationSlug}_${firstWidget.slug}`);
    const newRest = rest.slice(1);
    return <FirstWidget>{renderInside(newRest)}</FirstWidget>;
  }

  return rest[0];
};

const HeadlessWidgetsWrapper = ({ children }: Props) => {
  const systemIntegrations = useSystemIntegrations();
  const headlessWidgets = Object.values(systemIntegrations)
    .map(i => {
      return i.widgets
        .filter(w => w.headless)
        .map(w => ({
          ...w,
          integrationSlug: i.slug
        }));
    })
    .reduce((acc, val) => acc.concat(val), []);

  return <>{renderInside(headlessWidgets.concat(children as any))}</>;
};

export default HeadlessWidgetsWrapper;
