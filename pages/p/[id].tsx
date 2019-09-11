import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import PageWrapper from 'containers/pageWrapper';
import { StoreContext as ViewStoreContext } from 'stores/views';
import ViewComponents from 'containers/viewComponents';
import Loader from 'components/loader';

const Inner = observer(() => {
  const { query } = useRouter();
  const store = useContext(ViewStoreContext);
  if (!store.views) {
    return <Loader fullPage />;
  }

  const viewId = Array.isArray(query.id) ? query.id[0] : query.id;
  const view = store.views[viewId];
  if (!view) {
    return <p>404</p>;
  }

  return <ViewComponents viewId={view.id} />;
});

const DynamicPage = () => {
  return (
    <PageWrapper title="">
      <Inner />
    </PageWrapper>
  );
};

export default DynamicPage;
