import React from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from 'containers/wrappers/page';
import { useViews } from 'stores/views/hooks';
import ViewWidgets from 'containers/viewWidgets';
import logger from 'utils/logger';
import FourOhFour from '../fourOhFour';

const Inner = () => {
  const { id } = useParams();
  const views = useViews();
  if (!views) {
    return null;
  }

  logger.debug('Loading [id] page for ', { id });
  const view = views[id!];
  if (!view) {
    logger.warn(`Cannot load [id] page. No view found for ${id}`);
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
