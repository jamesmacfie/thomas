import React, { useState } from 'react';
import { inject } from 'mobx-react';
import Panel from '../panel';
import Store from '../../store';

interface Props {
  store?: Store;
}

const EnterWSURL = ({ store }: Props) => {
  if (!store) return null;
  const [url, setUrl] = useState('');
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Panel className="p-10">
        <label htmlFor="wsurl" className="text-xl block mb-3">
          Enter the Websocket URL
        </label>
        <input id="wsurl" value={url} onChange={e => setUrl(e.target.value)} placeholder="wss://your.url" />
        <button onClick={() => store.setWSURL(url)}>Set</button>
      </Panel>
    </div>
  );
};

export default inject('store')(EnterWSURL);
