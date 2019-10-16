import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import PageWrapper from 'containers/wrappers/page';
import { StoreContext } from 'stores/developer';
import Label from 'components/label';
import Input from 'components/input';

const DeveloperSettings = observer(() => {
  const developerStore = useContext(StoreContext);

  return (
    <PageWrapper title="Developer Settings">
      <Label>Show debug logs in the console</Label>
      <div className="flex w-full">
        <Input
          type="checkbox"
          checked={developerStore.debugLogs}
          onChange={(_e: any) => developerStore.toggleDebugLogs()}
        />
      </div>
    </PageWrapper>
  );
});

export default DeveloperSettings;
