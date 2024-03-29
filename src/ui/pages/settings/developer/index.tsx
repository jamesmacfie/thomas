import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { StoreContext } from 'stores/developer';
import Label from 'components/label';
import Input from 'components/input';
import { H2 } from 'components/text';

const DeveloperSettings = observer(() => {
  const developerStore = useContext(StoreContext);

  return (
    <>
      <H2 className="mt-0">
        <Link to="/settings">Settings</Link>
        {' > '}Developer
      </H2>
      <Label>Show debug logs in the console</Label>
      <div className="flex w-full">
        <Input
          type="checkbox"
          checked={developerStore.debugLogs}
          onChange={(_e: any) => developerStore.toggleDebugLogs()}
        />
      </div>
    </>
  );
});

export default DeveloperSettings;
