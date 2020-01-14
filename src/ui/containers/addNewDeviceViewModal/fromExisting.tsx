import React, { useState } from 'react';
import { store as deviceViewsStore } from 'stores/deviceViews';
import { useViews } from 'stores/views/hooks';
import ViewPillList from 'containers/viewPillList';
import Alert from 'components/alert';
import { H3 } from 'components/text';
import logger from 'utils/logger';

interface Props {
  onClose: () => void;
}

const NewDeviceViewFromExisting = ({ onClose }: Props) => {
  const [error, setError] = useState<String>('');
  const views = useViews();
  const add = async (viewId: number) => {
    logger.debug('Adding device view from existing', { viewId });
    const view = views[viewId];
    try {
      await deviceViewsStore.insert({
        viewId,
        name: view.name,
        icon: view.icon
      });
      onClose();
    } catch (error) {
      logger.error('Error adding device view from existing', { error });
      setError(`Error creating view from existing: ${error.message}`);
    }
  };

  return (
    <>
      {!!error.length && (
        <Alert type="ERROR" className="mb-4">
          {error}
        </Alert>
      )}
      <H3>Choose which view you want to add.</H3>
      <ViewPillList onSelect={add} />
    </>
  );
};

export default NewDeviceViewFromExisting;
