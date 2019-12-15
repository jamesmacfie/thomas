import React, { useState, useEffect } from 'react';
// import Alert from 'components/alert';
import { store as gcalStore } from '../store';
import logger from 'utils/logger';

const NewGoogleCalendar = () => {
  const [url, setUrl] = useState<null | string>(null);
  const [error, setError] = useState<String>('');
  useEffect(() => {
    try {
      gcalStore.getLoginUrl().then(setUrl);
    } catch (err) {
      logger.error('Error fetching login url', { err });
      setError(`Error getting login url: ${err.message}`);
    }
  }, []);

  // TODO - log this
  console.log(error);

  if (!url) {
    return <p>Just a moment</p>;
  }

  window.location.href = url;

  return <p>Redirecting...</p>;
};

export default NewGoogleCalendar;
