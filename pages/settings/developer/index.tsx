import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import PageWrapper from 'containers/wrappers/page';
import { StoreContext } from 'stores/developer';

const DeveloperSettings = observer(() => {
  const developerStore = useContext(StoreContext);
  console.log(developerStore);

  return (
    <PageWrapper title="Developer Settings">
      <p>This is a thing</p>
    </PageWrapper>
  );
});

export default DeveloperSettings;
