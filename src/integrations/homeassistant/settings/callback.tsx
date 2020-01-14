import React, { useContext, useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import useQuery from 'hooks/useQuery';
import { StoreContext } from '../store';
import Alert from 'components/alert';
import Button from 'components/button';
import logger from 'utils/logger';

const HomeAssistantCallback = observer(() => {
  const [saved, setSaved] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');
  const [redirect, setRedirect] = useState<string | null>(null);
  const store = useContext(StoreContext);
  const { code } = useParams();
  const query = useQuery();
  const state = query.get('state');
  useEffect(() => {
    try {
      const stateArr = state!.split('__');
      store
        .insert({
          code: code!,
          name: stateArr[1],
          url: decodeURIComponent(stateArr[0])
        })
        .then(() => {
          setSaved(true);
          setRedirect('/settings/integrations/homeassistant');
        });
    } catch (error) {
      logger.error('Error with HA callback', { error });
      setError(`Error saving integration: ${error.message}`);
    }
  }, [code, state, store]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  if (saved === null) {
    return <p>Saving... </p>;
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

export default HomeAssistantCallback;
