import React, { useState } from 'react';
import Button from 'components/button';
import Input from 'components/input';
import Label from 'components/label';
import Alert from 'components/alert';
import logger from 'utils/logger';

const NewHomeAssistant = () => {
  const [url, setUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const onFormSubmit = (event: any) => {
    event.preventDefault();
    if (!url.length || !name.length) {
      setError('Please fill in all fields');
      return;
    }

    logger.debug(`Create new HA via URL ${url}`);
    const clientId = encodeURIComponent(window.location.origin);
    const redirectUri = window.location.href.replace('/new', '/callback?originUrl=${url}');
    const state = `${url}__${name}`;
    window.location.href = `${url}/auth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
  };
  return (
    <form className="pr-4 max-w-lg mx-auto" onSubmit={onFormSubmit}>
      {!!error.length && (
        <Alert type="ERROR" className="mb-4">
          {error}
        </Alert>
      )}
      <Label className="mb-2">Name</Label>
      <Input className="block mb-4 w-full" value={name} onChange={(e: any) => setName(e.target.value)} />
      <Label className="mb-2">Home Assistant URL</Label>
      <Input
        placeholder="Example: http://192.168.1.2:8123"
        className="block mb-4 w-full"
        value={url}
        onChange={(e: any) => setUrl(e.target.value)}
      />
      <Button color="primary" padding={false} type="submit">
        <span className="px-6 py-2 inline-block">Login</span>
      </Button>
    </form>
  );
};

export default NewHomeAssistant;
