import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../store';
import Alert from 'components/alert';
import Button from 'components/button';
import logger from 'utils/logger';

const HomeAssistantCallback = observer(() => {
  const [saved, setSaved] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');
  const store = useContext(StoreContext);
  const { query, push } = useRouter();
  const code = Array.isArray(query.code) ? query.code[0] : query.code;
  const state = Array.isArray(query.state) ? query.state[0] : query.state;
  useEffect(() => {
    try {
      const stateArr = state.split('__');
      store
        .insert({
          code,
          name: stateArr[1],
          url: decodeURIComponent(stateArr[0])
        })
        .then(() => {
          setSaved(true);
          push('/settings/integrations/homeassistant');
        });
    } catch (error) {
      logger.error('Error with HA callback', { error });
      setError(`Error saving integration: ${error.message}`);
    }
  }, [null]);

  if (saved === null) {
    return <p>Saving... </p>;
  }

  const btn = (
    <Button href="/settings/integrations/homeassistant" color="primary" type="submit">
      Go back
    </Button>
  );

  if (error.length) {
    <Alert className="mb-3 mr-4" type="ERROR">
      {error}
    </Alert>;
    {
      btn;
    }
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
