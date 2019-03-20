import React, { useState } from 'react';
import { inject } from 'mobx-react';
import Button from '../button';
import Input from '../input';
import { H3 } from '../text';
import Panel from '../panel';
import Store from '../../store';

interface Props {
  store?: Store;
}

const EnterWSURL = ({ store }: Props) => {
  if (!store) return null;
  const [url, setUrl] = useState('');
  const submitUrl = () => store.setWSURL(url);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-128">
        <Panel>
          <H3>Enter the Websocket URL</H3>
          <form onSubmit={submitUrl}>
            <Input
              className="w-full"
              value={url}
              onChange={e => setUrl((e.target as HTMLInputElement).value)}
              placeholder="wss://your.url"
            />
            <Button type="primary" className="block mt-8" onClick={submitUrl}>
              Set
            </Button>
          </form>
        </Panel>
      </div>
    </div>
  );
};

export default inject('store')(EnterWSURL);
