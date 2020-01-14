import React from 'react';
import { store } from '../store';
import Button from 'components/button';

const NotificationItem = () => {
  return (
    <Button onClick={store.clearAll} color="secondary" className="float-right mb-4">
      Clear all
    </Button>
  );
};

export default NotificationItem;
