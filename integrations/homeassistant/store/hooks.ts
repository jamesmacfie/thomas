import { useContext } from 'react';
import { useObserver } from 'mobx-react-lite';
import { StoreContext } from '../store';
import logger from 'utils/logger';

export const useIntegrationEntity = (integrationId: number, entityId: string) => {
  const store = useContext(StoreContext);
  return useObserver(() => {
    try {
      const entity = store.integrationEntities[integrationId].entities[entityId];
      return entity;
    } catch (error) {
      logger.error('Error with `useIntegrationEntity', { error });
      return;
    }
  });
};
