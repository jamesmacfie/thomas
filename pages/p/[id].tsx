import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import PageWrapper from 'containers/wrappers/page';
import { StoreContext as ViewStoreContext } from 'stores/views';
import ViewWidgets from 'containers/viewWidgets';
import FourOhFour from '../fourOhFour';

const Inner = observer(() => {
  const { query } = useRouter();
  const store = useContext(ViewStoreContext);
  if (!store.views) {
    return null;
  }

  const viewId = Array.isArray(query.id) ? query.id[0] : query.id;
  const view = store.views[viewId];
  if (!view) {
    return <FourOhFour />;
  }

  return <ViewWidgets viewId={view.id} />;
});

const DynamicPage = () => {
  return (
    <PageWrapper title="">
      <Inner />
    </PageWrapper>
  );
};

export default DynamicPage;
