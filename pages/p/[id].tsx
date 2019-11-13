import React from 'react';
import { useRouter } from 'next/router';
import PageWrapper from 'containers/wrappers/page';
import { useViews } from 'stores/views/hooks';
import ViewWidgets from 'containers/viewWidgets';
import logger from 'utils/logger';
import FourOhFour from '../fourOhFour';

const Inner = () => {
  const { query } = useRouter();
  const views = useViews();
  if (!views) {
    return null;
  }

  const viewId = Array.isArray(query.id) ? query.id[0] : query.id;
  logger.debug('Loading [id] page for ', { query });
  const view = views[viewId];
  if (!view) {
    logger.warn(`Cannot load [id] page. No view found for ${viewId}`);
    return <FourOhFour />;
  }

  return <ViewWidgets viewId={view.id} />;
};

const DynamicPage = () => {
  return (
    <PageWrapper title="">
      <Inner />
    </PageWrapper>
  );
};

export default DynamicPage;
