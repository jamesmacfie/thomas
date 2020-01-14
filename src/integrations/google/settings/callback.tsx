import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../store';
import useQuery from 'hooks/useQuery';
import Alert from 'components/alert';
import Button from 'components/button';
import logger from 'utils/logger';

const GoogleCallback = observer(() => {
  const [saved, setSaved] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');
  const [redirect, setRedirect] = useState<string | null>(null);
  const store = useContext(StoreContext);
  const query = useQuery();
  const code = query.get('code');

  useEffect(() => {
    try {
      store.insert(code!).then(() => {
        setSaved(true);
        setRedirect('/settings/integrations/google');
      });
    } catch (error) {
      logger.error('Error with Google callback', { error });
      setError(`Error saving integration: ${error.message}`);
    }
  }, [code, store]);

  if (saved === null) {
    return <p>Saving... </p>;
  }

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const btn = (
    <Button href="/settings/integrations/homeassistant" color="primary" type="submit">
      Go back
    </Button>
  );

  if (error.length) {
    return (
      <>
        <Alert className="mb-3 mr-4" type="ERROR">
          {error}
        </Alert>
        {btn}
      </>
    );
  }

  return (
    <>
      <Alert className="mb-3 mr-4" type="SUCCESS">
        Saved successfully.
      </Alert>
      {btn}
    </>
  );
});

export default GoogleCallback;
