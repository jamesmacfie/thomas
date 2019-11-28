import React from 'react';
import { useNotifications } from '../store/hooks';
import CloseAll from './_closeAll';
import NotificationItem from './_notificationItem';

const NotificationWrapper = ({ children }: any) => {
  const notifications = useNotifications();

  return (
    <>
      {!!notifications.length && (
        <div className="z-50 fixed overflow-hidden mr-4 my-4 right-0 top-0 bottom-0 w-64">
          <div className="flex justify-end">
            <CloseAll />
          </div>

          {notifications.map(n => (
            <NotificationItem key={n.id} item={n} />
          ))}
        </div>
      )}
      {children}
    </>
  );
};

export default NotificationWrapper;
